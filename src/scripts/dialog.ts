/**
 * Native <dialog> helpers shared by the donate dialog and the image lightbox: a
 * click on the backdrop closes it, and focus returns to whatever opened it.
 */
export function enhanceDialog(dialog: HTMLDialogElement) {
  let opener: HTMLElement | null = null;

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside || dialog.classList.contains('dialog--fullscreen')) dialog.close();
  });

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('has-dialog');
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });

  return {
    open(from?: HTMLElement | null) {
      opener = from ?? (document.activeElement as HTMLElement | null);
      dialog.showModal();
      document.documentElement.classList.add('has-dialog');
    },
  };
}
