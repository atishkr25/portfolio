import { StaticImageData } from "next/image";
import { skillTypes } from "./projectTypes";

export interface companiesTypes {
  name: string;
  image: StaticImageData | string;
  joinning_date: string;
  end_date: string;
  role: string;
  location: string;
  tools: skillTypes[]
  description: string[];
  status: boolean;
  link?: string;
}
