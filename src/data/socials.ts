import { SITE } from './site';

export type SocialProfileId = 'email' | 'github' | 'youtube' | 'linkedin' | 'tiktok' | 'facebook';

export interface SocialProfile {
  id: SocialProfileId;
  label: string;
  handle: string;
  href: string;
}

export const socialProfiles = [
  {
    id: 'email',
    label: 'Email',
    handle: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'PhamHungTien',
    href: SITE.github,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@phamhungtien14',
    href: SITE.youtube,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Phạm Hùng Tiến',
    href: SITE.linkedin,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@phamhungtien14',
    href: SITE.tiktok,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: '@phamhungtien1404',
    href: SITE.facebook,
  },
] as const satisfies readonly SocialProfile[];
