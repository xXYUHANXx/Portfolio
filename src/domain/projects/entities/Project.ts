export type Project = {
  id: number;
  name: string;
  description: string;
  html_url?: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  private: boolean;
  imageUrl?: string;
  homepageUrl?: string;
};