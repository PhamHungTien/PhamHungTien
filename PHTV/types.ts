import { LucideIcon } from 'lucide-react';

export interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

export interface NavLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

export interface TerminalCommandProps {
  command: string;
  label?: string;
  output?: string;
}