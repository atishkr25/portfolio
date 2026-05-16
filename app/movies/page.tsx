'use client';

import { motion } from 'framer-motion';
import { moviesData } from '@/data/personalData';

const MoviesPage = () => {
  return (
    <main className='max-w-4xl mx-auto px-4 py-10 sm:py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='space-y-1.5 mb-8'
      >
        <h1 className='text-3xl font-bold text-foreground'>Movies</h1>
        <p className='text-muted-foreground text-base'>
          Films and shows that have inspired and entertained me.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {moviesData.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className='p-4 rounded-lg border border-border/30 bg-secondary/20 hover:bg-secondary/40 hover:border-border/60 transition-all duration-300 group cursor-pointer'
          >
            <h3 className='text-base font-semibold text-foreground group-hover:text-foreground/90 transition-colors line-clamp-2'>
              {movie.title}
            </h3>
            <p className='text-sm text-muted-foreground/70 mt-2'>{movie.year}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default MoviesPage;
