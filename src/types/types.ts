export interface CardProps {
  id: string;
  title: string;
  description: string;
  img: string;
  buttonText?: string;
  codeUrl?: string;
  demoUrl?: string;
  bgImage?: string;
  order?: number;
}