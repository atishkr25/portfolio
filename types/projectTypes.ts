export interface projectTypes {
  id: number;
  name: string;
  description: string;
  tech: skillTypes[]
  live_link: string;
  github_link: string;
  img: any;
  video?: any;
}


export interface skillTypes {
  id: number;
  name: string;
  icon: React.ComponentType;
}