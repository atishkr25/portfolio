import { SocialLink } from "@/types/socialTypes";
import { Github, Instagram, Linkedin, Mail, Twitter, NotebookTabs } from "lucide-react";
import githubPreview from "../public/preview-images/github-preview.webp";
import linkedinPreview from "../public/preview-images/linkedin-preview.webp";
import twitterPreview from "../public/preview-images/twitter-preview.webp";
import instagramPreview from "../public/preview-images/instagram.png";
import MailPreview from "../public/preview-images/mailpreview.png";
import Resume from "../public/preview-images/resume.png"

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/atishkr25",
    previewImg: githubPreview,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/atishkrs",
    previewImg: linkedinPreview,
  },
  {
    icon: Mail,
    label: "Mail",
    href: "mailto:atish1816@gmail.com",
    previewImg: MailPreview,
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://x.com/atishkr25",
    previewImg: twitterPreview,
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/4tish_ig/",
    previewImg: instagramPreview,
  },

];
