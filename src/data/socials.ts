export type SocialProfileId = 'email' | 'github' | 'youtube' | 'linkedin';

export interface SocialProfile {
  id: SocialProfileId;
  label: string;
  handle: string;
  href: string;
}

/** Only professional channels are published: email for support, GitHub, YouTube tutorials and LinkedIn. */
export const socialProfiles: SocialProfile[] = [
  {
    id: 'email',
    label: 'Email',
    handle: 'contact@phamhungtien.com',
    href: 'mailto:contact@phamhungtien.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'PhamHungTien',
    href: 'https://github.com/PhamHungTien',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@phamhungtien14',
    href: 'https://www.youtube.com/@phamhungtien14',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Phạm Hùng Tiến',
    href: 'https://www.linkedin.com/in/ph%E1%BA%A1m-h%C3%B9ng-ti%E1%BA%BFn-a1b405327/',
  },
];
