'use client';

import { motion } from 'framer-motion';
import { booksData } from '@/data/personalData';

const BooksPage = () => {
  return (
    <main className='max-w-4xl mx-auto px-4 py-12 sm:py-16'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='space-y-2 mb-12'
      >
        <h1 className='text-4xl font-bold text-foreground'>Books</h1>
        <p className='text-muted-foreground text-lg'>
          Books that have influenced my thinking and growth.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {booksData.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className='p-6 rounded-lg border border-border/30 bg-secondary/20 hover:bg-secondary/40 hover:border-border/60 transition-all duration-300 group'
          >
            <h3 className='text-lg font-semibold text-foreground mb-1 group-hover:text-foreground/90 transition-colors'>
              {book.title}
            </h3>
            <p className='text-sm text-muted-foreground mb-3'>{book.author}</p>
            <p className='text-xs text-muted-foreground/70'>{book.year}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default BooksPage;
