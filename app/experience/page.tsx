'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import WorkExperience from '@/components/WorkExperience';

const ExperiencePage = () => {
  return (
    <main className='max-w-3xl mx-auto px-4 py-10 sm:py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8'
      >
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <span className="text-lg leading-none rotate-180">→</span>
          Back to Home
        </Link>
      </motion.div>

      <WorkExperience showAll={true} />
    </main>
  );
};

export default ExperiencePage;
