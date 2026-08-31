import {
  ArrowUpRight,
  AtSign,
  Cake,
  Camera,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music2,
  type LucideIcon
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { socialProfiles, type SocialProfileId } from '../data/socials';

interface ContactSectionProps {
  t: (key: string) => string;
}

const icons: Record<SocialProfileId, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  threads: AtSign,
  locket: Camera,
  cake: Cake,
  tiktok: Music2,
  linkedin: Linkedin,
  github: Github,
  email: Mail
};

export function ContactSection({ t }: ContactSectionProps) {
  return (
    <section className="contact-directory" id="contact">
      <div className="contact-directory__header">
        <h2>{t('home.contact.title')}</h2>
      </div>

      <div className="contact-grid">
        {socialProfiles.map((profile, index) => {
          const Icon = icons[profile.id];
          const content = (
            <>
              <span className="contact-card__icon" aria-hidden="true">
                <Icon size={19} />
              </span>
              <span className="contact-card__copy">
                <strong>{profile.label}</strong>
                <small>{profile.handle}</small>
              </span>
              {profile.href ? (
                <ArrowUpRight className="contact-card__arrow" size={17} aria-hidden="true" />
              ) : (
                <span className="contact-card__hint">{t('home.contact.username')}</span>
              )}
            </>
          );
          const style = { '--social-accent': profile.accent, '--contact-delay': `${index * 28}ms` } as CSSProperties;

          return profile.href ? (
            <a
              className="contact-card"
              href={profile.href}
              key={profile.id}
              style={style}
              target={profile.href.startsWith('https://') ? '_blank' : undefined}
              rel={profile.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
              aria-label={`${profile.label}: ${profile.handle}`}
            >
              {content}
            </a>
          ) : (
            <div className="contact-card contact-card--static" key={profile.id} style={style}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
