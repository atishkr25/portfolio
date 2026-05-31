"use client"

import { companies } from '@/data/companiesData'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useState } from 'react'

const WorkExperience = ({ showAll = false }: { showAll?: boolean }) => {
    const [openItems, setOpenItems] = useState<string[]>(["item-0"])
    const displayedCompanies = showAll ? companies : companies.slice(0, 2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='w-full'>
            <div className='text-start'>
                <h3 className='text-sm text-muted-foreground mt-1'>Featured</h3>
                <h1 className='text-[22px] font-bold text-foreground'>Experience</h1>
            </div>

            <div className='mt-3'>
                <Accordion
                    type="multiple"
                    className="w-full"
                    value={openItems}
                    onValueChange={setOpenItems}
                >
                    {displayedCompanies.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="hover:no-underline">
                                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center w-full sm:pr-4 gap-1 sm:gap-0'>
                                    <div className='flex items-center gap-2'>
                                        <div>
                                            {item.link ? (
                                                <Link href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className='block hover:opacity-80 transition-opacity'>
                                                    <Image src={item.image} alt={item.name} width={50} height={50} className='w-10 h-10 ring-1 ring-gray-500 rounded-lg' />
                                                </Link>
                                            ) : (
                                                <Image src={item.image} alt={item.name} width={50} height={50} className='w-10 h-10 ring-1 ring-gray-500 rounded-lg' />
                                            )}
                                        </div>
                                        <div className='text-left'>
                                            <h1 className='text-sm sm:text-base font-semibold '>{item.name}</h1>
                                            <p className='text-xs sm:text-sm text-muted-foreground mt-1'>{item.role}</p>
                                        </div>


                                    </div>
                                    <div className='text-left sm:text-right'>
                                        <p className='text-xs sm:text-sm font-medium text-foreground'>{item.joinning_date} - {item.end_date}</p>
                                        <p className='text-xs text-muted-foreground'>{item.location}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='space-y-4 pt-4'>
                                    <div>
                                        <p className='text-xs sm:text-sm font-bold text-foreground mb-3'>Technologies</p>
                                        <div className='flex flex-wrap gap-2.5'>
                                            {
                                                item.tools.map((tool, index) => (
                                                    <div key={index} className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-black/5 dark:bg-[#2E2E2E] border border-dashed border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-[#3A3A3A] hover:border-black/40 dark:hover:border-white/40 hover:scale-[1.02] transition-all duration-200 cursor-pointer text-foreground">
                                                        <div className='w-4 h-4 flex items-center justify-center'> <tool.icon /></div>
                                                        <span className='text-xs sm:text-[13px] font-semibold leading-none mt-0.5'>{tool.name}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-3'>
                                        {item.description.map((desc: string, ind: number) => (
                                            <p className='text-sm sm:text-base text-muted-foreground' key={ind}>
                                                <span className='text-muted-foreground/70 mr-1.5'>•</span>
                                                {desc}
                                            </p>
                                        ))}
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                {!showAll && (
                    <div className="flex justify-center mt-6">
                        <Link href="/experience" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-secondary/20 hover:bg-secondary/40 text-foreground border border-border/50 hover:border-border">
                            View all experience
                            <span className="text-lg leading-none">→</span>
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default WorkExperience