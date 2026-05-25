export interface CardProps {
  id: string;
  title: string;
  description: string;
  img: string;
  problem_solved: string;
  architectural_doc: string;
  category: string;
  tags: string[];
  buttonText?: string;
  codeUrl?: string;
  demoUrl?: string;
  bgImage?: string;
  order?: number;
}