export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  size: 'small' | 'medium' | 'large' | 'tall'; // Sistem sizing dinamis
  link?: string;
}