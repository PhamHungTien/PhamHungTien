import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

const ADMIN_EMAIL = 'phamhungtien.contact@gmail.com';

const testEnv = await initializeTestEnvironment({
  projectId: 'demo-phtv',
  firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 }
});

const anon = testEnv.unauthenticatedContext().firestore();
const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.com', email_verified: true }).firestore();
const mallory = testEnv.authenticatedContext('mallory', { email: 'mallory@example.com', email_verified: true }).firestore();
const admin = testEnv.authenticatedContext('adm', { email: ADMIN_EMAIL, email_verified: true }).firestore();
// Same admin address, but the token says the address was never verified.
const fakeAdmin = testEnv.authenticatedContext('fake', { email: ADMIN_EMAIL, email_verified: false }).firestore();

const baseQuestion = (over = {}) => ({
  authorId: 'alice', author: 'Alice', content: 'xin chào', timestamp: Date.now(),
  replies: [], likedBy: [], isPinned: false, isReported: false, isLocked: false,
  viewCount: 0, isAdmin: false, label: 'general', ...over
});

async function seed(id, data) {
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'questions', id), baseQuestion(data));
  });
}
async function seedNotif(id, data) {
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'notifications', id), {
      recipientId: 'alice', senderName: 'Bob', type: 'like', questionId: 'q1',
      content: 'x', timestamp: Date.now(), isRead: false, ...data
    });
  });
}

let pass = 0, fail = 0;
async function check(name, fn) {
  await testEnv.clearFirestore();
  try { await fn(); console.log(`  ✓ ${name}`); pass++; }
  catch (e) { console.log(`  ✗ ${name}\n      ${String(e.message).slice(0, 130)}`); fail++; }
}

console.log('\n── Đọc ──');
await check('ai cũng đọc được questions', async () => {
  await seed('q1', {});
  await assertSucceeds(getDoc(doc(anon, 'questions', 'q1')));
});

console.log('\n── Tạo bài ──');
await check('khách không tạo được bài', async () =>
  assertFails(setDoc(doc(anon, 'questions', 'q1'), baseQuestion())));

await check('user tạo được bài của chính mình', async () =>
  assertSucceeds(setDoc(doc(alice, 'questions', 'q1'), baseQuestion({ authorId: 'alice' }))));

await check('KHÔNG mạo danh authorId người khác', async () =>
  assertFails(setDoc(doc(mallory, 'questions', 'q1'), baseQuestion({ authorId: 'alice' }))));

await check('KHÔNG tự phong isAdmin: true', async () =>
  assertFails(setDoc(doc(mallory, 'questions', 'q1'), baseQuestion({ authorId: 'mallory', isAdmin: true }))));

await check('KHÔNG tạo bài đã ghim sẵn', async () =>
  assertFails(setDoc(doc(mallory, 'questions', 'q1'), baseQuestion({ authorId: 'mallory', isPinned: true }))));

console.log('\n── Xoá (client không hề guard) ──');
await check('người lạ KHÔNG xoá được bài người khác', async () => {
  await seed('q1', {});
  await assertFails(deleteDoc(doc(mallory, 'questions', 'q1')));
});
await check('chủ bài xoá được bài mình', async () => {
  await seed('q1', {});
  await assertSucceeds(deleteDoc(doc(alice, 'questions', 'q1')));
});
await check('admin xoá được bài bất kỳ', async () => {
  await seed('q1', {});
  await assertSucceeds(deleteDoc(doc(admin, 'questions', 'q1')));
});
await check('admin email CHƯA xác minh thì KHÔNG có quyền', async () => {
  await seed('q1', {});
  await assertFails(deleteDoc(doc(fakeAdmin, 'questions', 'q1')));
});

console.log('\n── Kiểm duyệt ──');
await check('người thường KHÔNG ghim được bài', async () => {
  await seed('q1', {});
  await assertFails(updateDoc(doc(mallory, 'questions', 'q1'), { isPinned: true }));
});
await check('người thường KHÔNG khoá được bài', async () => {
  await seed('q1', {});
  await assertFails(updateDoc(doc(mallory, 'questions', 'q1'), { isLocked: true }));
});
await check('admin ghim được', async () => {
  await seed('q1', {});
  await assertSucceeds(updateDoc(doc(admin, 'questions', 'q1'), { isPinned: true }));
});

console.log('\n── viewCount ──');
await check('khách tăng được viewCount đúng +1', async () => {
  await seed('q1', { viewCount: 0 });
  await assertSucceeds(updateDoc(doc(anon, 'questions', 'q1'), { viewCount: 1 }));
});
await check('khách KHÔNG bơm viewCount lên 9999', async () => {
  await seed('q1', { viewCount: 0 });
  await assertFails(updateDoc(doc(anon, 'questions', 'q1'), { viewCount: 9999 }));
});
await check('khách KHÔNG sửa content qua đường viewCount', async () => {
  await seed('q1', { viewCount: 0 });
  await assertFails(updateDoc(doc(anon, 'questions', 'q1'), { viewCount: 1, content: 'hacked' }));
});

console.log('\n── Like ──');
await check('user like được bằng uid của mình', async () => {
  await seed('q1', { likedBy: [] });
  await assertSucceeds(updateDoc(doc(mallory, 'questions', 'q1'), { likedBy: ['mallory'] }));
});
await check('user KHÔNG nhét uid người khác vào likedBy', async () => {
  await seed('q1', { likedBy: [] });
  await assertFails(updateDoc(doc(mallory, 'questions', 'q1'), { likedBy: ['alice'] }));
});
await check('user KHÔNG xoá like của người khác', async () => {
  await seed('q1', { likedBy: ['alice'] });
  await assertFails(updateDoc(doc(mallory, 'questions', 'q1'), { likedBy: [] }));
});

console.log('\n── Sửa nội dung ──');
await check('người lạ KHÔNG sửa được bài người khác', async () => {
  await seed('q1', {});
  await assertFails(updateDoc(doc(mallory, 'questions', 'q1'), { content: 'hacked' }));
});
await check('chủ bài sửa được bài mình', async () => {
  await seed('q1', {});
  await assertSucceeds(updateDoc(doc(alice, 'questions', 'q1'), { content: 'đã sửa' }));
});
await check('bài bị khoá thì chủ bài KHÔNG sửa được', async () => {
  await seed('q1', { isLocked: true });
  await assertFails(updateDoc(doc(alice, 'questions', 'q1'), { content: 'lách khoá' }));
});

console.log('\n── Thông báo (riêng tư) ──');
await check('user đọc được thông báo của mình', async () => {
  await seedNotif('n1', { recipientId: 'alice' });
  await assertSucceeds(getDoc(doc(alice, 'notifications', 'n1')));
});
await check('user KHÔNG đọc được thông báo người khác', async () => {
  await seedNotif('n1', { recipientId: 'alice' });
  await assertFails(getDoc(doc(mallory, 'notifications', 'n1')));
});
await check('KHÔNG liệt kê toàn bộ notifications', async () =>
  assertFails(getDocs(collection(mallory, 'notifications'))));
await check('query lọc theo recipientId của mình thì được', async () => {
  await seedNotif('n1', { recipientId: 'mallory' });
  await assertSucceeds(getDocs(query(collection(mallory, 'notifications'), where('recipientId', '==', 'mallory'))));
});
await check('user đánh dấu đã đọc thông báo của mình', async () => {
  await seedNotif('n1', { recipientId: 'alice' });
  await assertSucceeds(updateDoc(doc(alice, 'notifications', 'n1'), { isRead: true }));
});
await check('user KHÔNG sửa nội dung thông báo', async () => {
  await seedNotif('n1', { recipientId: 'alice', content: 'gốc' });
  await assertFails(updateDoc(doc(alice, 'notifications', 'n1'), { content: 'đã đổi', isRead: true }));
});

console.log('\n── Trả lời (replies là mảng lồng) ──');
await check('user đăng nhập thêm được reply', async () => {
  await seed('q1', { replies: [] });
  await assertSucceeds(updateDoc(doc(mallory, 'questions', 'q1'), {
    replies: [{ id: '1', authorId: 'mallory', author: 'M', content: 'hi', timestamp: 1, isAdmin: false, likedBy: [] }]
  }));
});
await check('khách KHÔNG thêm được reply', async () => {
  await seed('q1', { replies: [] });
  await assertFails(updateDoc(doc(anon, 'questions', 'q1'), {
    replies: [{ id: '1', authorId: 'x', author: 'X', content: 'spam', timestamp: 1, isAdmin: false, likedBy: [] }]
  }));
});
await check('bài bị khoá thì user thường KHÔNG reply được', async () => {
  await seed('q1', { replies: [], isLocked: true });
  await assertFails(updateDoc(doc(mallory, 'questions', 'q1'), {
    replies: [{ id: '1', authorId: 'mallory', author: 'M', content: 'hi', timestamp: 1, isAdmin: false, likedBy: [] }]
  }));
});
await check('admin vẫn xoá được reply trên bài đã khoá', async () => {
  await seed('q1', {
    isLocked: true,
    replies: [{ id: '1', authorId: 'mallory', author: 'M', content: 'spam', timestamp: 1, isAdmin: false, likedBy: [] }]
  });
  await assertSucceeds(updateDoc(doc(admin, 'questions', 'q1'), { replies: [] }));
});
await check('user đăng nhập báo cáo được bài', async () => {
  await seed('q1', {});
  await assertSucceeds(updateDoc(doc(mallory, 'questions', 'q1'), { isReported: true }));
});
await check('khách KHÔNG báo cáo được bài', async () => {
  await seed('q1', {});
  await assertFails(updateDoc(doc(anon, 'questions', 'q1'), { isReported: true }));
});

await testEnv.cleanup();
console.log(`\n${fail === 0 ? '✅' : '❌'}  ${pass} đạt, ${fail} hỏng`);
process.exit(fail ? 1 : 0);
