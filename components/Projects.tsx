import ProjectCard from "./ProjectCard";
import Link from 'next/link';
import { ProjectDetails } from "@/data/projectData";
import { projectTypes } from "@/types/projectTypes";
import { motion } from "motion/react"


const Projects = ({ showAll = false }: { showAll?: boolean }) => {
  const displayedProjects = showAll ? ProjectDetails : ProjectDetails.slice(0, 2);

  return (
    <div>
      <p className="text-start text-sm text-muted-foreground mt-1">Featured</p>
      <h2 className="text-2xl font-semibold text-foreground">Projects</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 m-auto gap-5 mt-4">
        {displayedProjects.map((el: projectTypes, index: number) => (
          <ProjectCard data={el} key={index} />
        ))}
      </motion.div>
      
      {!showAll && (
        <div className="flex justify-center mt-8">
            <Link href="/projects" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-secondary/20 hover:bg-secondary/40 text-foreground border border-border/50 hover:border-border">
                View all projects
                <span className="text-lg leading-none">→</span>
            </Link>
        </div>
      )}
    </div>
  );
};

export default Projects;
