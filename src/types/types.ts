import type { CardRow, InfoSectionRow, CertificateRow } from './supabase';

export interface CertificateProps extends Omit<CertificateRow, 'image_path' | 'created_at' | 'updated_at'> {
  img: string;
}

export interface CardProps extends Omit<CardRow, 'image_path' | 'button_text' | 'code_url' | 'demo_url' | 'bg_image_path' | 'created_at' | 'updated_at'> {
  img: string;
  buttonText?: string;
  codeUrl?: string;
  demoUrl?: string;
  bgImage?: string;
}

export interface SkillGroup extends Omit<InfoSectionRow, 'section_type' | 'order' | 'created_at' | 'updated_at'> {
  items: string[];
}

export interface CareerItem {
  title: string;
  body: string;
}

export interface CareerGroup extends Omit<InfoSectionRow, 'section_type' | 'order' | 'created_at' | 'updated_at'> {
  items: CareerItem[];
}