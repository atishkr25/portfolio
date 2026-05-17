import ProjectCard from "./ProjectCard";
import { ProjectDetails } from "@/data/projectData";
import { projectTypes } from "@/types/projectTypes";
import { motion } from "motion/react"



const Projects = () => {
  return (
    <div>
      <p className="text-start text-sm text-muted-foreground mt-1">Featured</p>
      <h2 className="text-xl font-semibold text-foreground">My Projects</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 m-auto gap-4 mt-3">
        {ProjectDetails.map((el: projectTypes, index: number) => (
          <ProjectCard data={el} key={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
