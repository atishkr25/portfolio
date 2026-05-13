import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Social = () => {
  return (
    <div className="flex gap-4 mb-10">
      <div>
        <Link href={"https://www.linkedin.com/in/hemant-prajapatii/"}>
          <Linkedin />
        </Link>
      </div>
      <div>
        <Link href={"https://www.instagram.com/hemant_069/"}>
          <Instagram />
        </Link>
      </div>
      <div>
        <Link href={"https://github.com/atishkr25"}>
          <Github />
        </Link>
      </div>
    </div>
  );
};

export default Social;
