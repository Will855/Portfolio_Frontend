export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  profile_image_path: string;
  updated_at: string;
}

export interface CardRow {
  id: string;
  title: string;
  description: string;
  button_text: string;
  image_path: string;
  code_url: string;
  demo_url: string;
  bg_image_path: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectMetaRow {
  id: string;
  bg_image_path: string;
  code_url: string;
  demo_url: string;
  order: number;
  updated_at: string;
}

export interface ContentBlockRow {
  id: string;
  key: string;
  content: string;
  type: 'html' | 'json';
  updated_at: string;
}

export interface ContactSubmissionRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

export interface ProjectContentRow {
  id: string;
  project_id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  caption: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface InfoSectionRow {
  id: string;
  section_type: 'skill' | 'knowledge';
  title: string;
  color: 'blue' | 'purple' | 'green';
  items: string[];
  order: number;
  created_at: string;
  updated_at: string;
}

export const STORAGE_BUCKET = 'portfolio-assets';
