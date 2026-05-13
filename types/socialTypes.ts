import { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

export type SocialLink = {
  icon: LucideIcon;
  label: string;
  href: string;
  previewImg: StaticImageData;
};
