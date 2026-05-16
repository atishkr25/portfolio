"use client";
import Projects from "./Projects";
import { Contact } from "./Contact";
import Hero from "./Hero";
import WorkExperience from "./WorkExperience";
import Github from "./Github";
import Booking from "./cal/Booking";
import Personal from "./Personal";


const Main = () => {


  return (
    <div className='space-y-10 w-full'>
      <section className='w-full'>
        <Hero />
      </section>
      <section className='w-full'>
        <WorkExperience />
      </section>
      <section className='w-full'>
        <Projects />
      </section>
      <section className='w-full'>
        <Github />
      </section>
      <section className='w-full'>
        <Booking />
      </section>
      <section className='w-full'>
        <Personal />
      </section>
      <section className='w-full'>
        <Contact />
      </section>

    </div>
  );
};

export default Main;
