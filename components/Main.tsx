"use client";
import Hero from "./Hero";
import Github from "./Github";
import WorkExperience from "./WorkExperience";
import Projects from "./Projects";
import AboutMe from "./AboutMe";
import Personal from "./Personal";
import { Contact } from "./Contact";
import Footer from "./Footer";


const Main = () => {


  return (
    <div className='space-y-16 sm:space-y-20 w-full pt-4 sm:pt-6'>
      <section className='w-full'>
        <Hero />
      </section>
      <section className='w-full'>
        <Github />
      </section>
      <section className='w-full'>
        <WorkExperience />
      </section>
      <section className='w-full'>
        <Projects />
      </section>
      <section className='w-full'>
        <AboutMe />
      </section>
      <section className='w-full'>
        <Contact />
      </section>
      <section className='w-full'>
        <Personal />
      </section>
      <section className='w-full'>
        <Footer />
      </section>
    </div>
  );
};

export default Main;
