export type SocialProfileId =
  | 'facebook'
  | 'instagram'
  | 'threads'
  | 'locket'
  | 'cake'
  | 'tiktok'
  | 'linkedin'
  | 'github'
  | 'email';

export interface SocialProfile {
  id: SocialProfileId;
  label: string;
  handle: string;
  href?: string;
  accent: string;
}

export const socialProfiles: SocialProfile[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    handle: '@phamhungtien1404',
    href: 'https://www.facebook.com/phamhungtien1404',
    accent: '#1877f2'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@phamhungtien1404',
    href: 'https://www.instagram.com/phamhungtien1404/',
    accent: '#d62976'
  },
  {
    id: 'threads',
    label: 'Threads',
    handle: '@phamhungtien1404',
    href: 'https://www.threads.net/@phamhungtien1404',
    accent: 'var(--text)'
  },
  {
    id: 'locket',
    label: 'Locket',
    handle: '@phamhungtien',
    href: 'https://locket.cam/phamhungtien',
    accent: '#d99b00'
  },
  {
    id: 'cake',
    label: 'Cake',
    handle: 'cake.me/me/phamhungtien',
    href: 'https://www.cake.me/me/phamhungtien',
    accent: '#6c63ff'
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@phamhungtien14',
    href: 'https://www.tiktok.com/@phamhungtien14',
    accent: '#ee1d52'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Phạm Hùng Tiến',
    href: 'https://www.linkedin.com/in/ph%E1%BA%A1m-h%C3%B9ng-ti%E1%BA%BFn-a1b405327/',
    accent: '#0a66c2'
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: '@PhamHungTien',
    href: 'https://github.com/PhamHungTien',
    accent: 'var(--text)'
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'contact@phamhungtien.com',
    href: 'mailto:contact@phamhungtien.com',
    accent: '#08785f'
  }
];

export const publicProfileUrls = socialProfiles
  .map((profile) => profile.href)
  .filter((href): href is string => Boolean(href?.startsWith('https://')));
