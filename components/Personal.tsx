'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Personal = () => {
  const items = [
    {
      title: 'Books',
      description: 'Books that have influenced my thinking and growth.',
      href: '/books',
    },
    {
      title: 'Movies',
      description: 'Films and shows that have inspired and entertained me.',
      href: '/movies',
    },
  ];

  return (
    <section>
      <p className="text-start text-muted-foreground mt-2">Insights</p>
      <h2 className="text-xl font-semibold">Personal</h2>

      <div className='space-y-3 mt-4'>
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link href={item.href}>
              <div className='p-4 rounded-lg border border-border/70 bg-card hover:bg-accent/40 hover:border-border transition-all duration-300 group cursor-pointer dark:border-border/30 dark:bg-secondary/20 dark:hover:bg-secondary/40 dark:hover:border-border/60'>
                <h3 className='text-lg font-semibold text-foreground mb-1 group-hover:text-foreground/90'>
                  {item.title}
                </h3>
                <p className='text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors'>
                  {item.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Personal;
