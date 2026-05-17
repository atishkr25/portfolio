"use client"

import { companies } from '@/data/companiesData'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useState } from 'react'

const WorkExperience = () => {
    const [openItems, setOpenItems] = useState<string[]>(["item-0"])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='w-full'>
            <div className='text-start'>
                <h3 className='text-sm text-muted-foreground mt-1'>Featured</h3>
                <h1 className='text-xl font-semibold text-foreground'>Experience</h1>
            </div>

            <div className='mt-3'>
                <Accordion
                    type="multiple"
                    className="w-full"
                    value={openItems}
                    onValueChange={setOpenItems}
                >
                    {companies.map((item, index) => (
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
                                <div className='space-y-3 pt-1'>
                                    <div>
                                        <p className='text-xs sm:text-sm font-medium text-foreground mb-3'>Technologies & Tools</p>
                                        <TooltipProvider delayDuration={0} skipDelayDuration={300}>
                                            <div className='flex flex-wrap gap-3'>
                                                {
                                                    item.tools.map((tool, index) => (
                                                        <Tooltip key={index}>
                                                            <TooltipTrigger asChild>
                                                                <div className="flex items-center justify-center w-7 h-7 rounded bg-black/5 dark:bg-white/5 border border-dashed border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/40 dark:hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer text-foreground">
                                                                    <div className='w-[14px] h-[14px]'> <tool.icon /></div>
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="bottom" sideOffset={6}>
                                                                <span className='text-xs'>{tool.name}</span>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    ))
                                                }
                                            </div>
                                        </TooltipProvider>
                                    </div>
                                    <div className='space-y-2'>
                                        {item.description.map((desc: string, ind: number) => (
                                            <div className='flex gap-2 items-start' key={ind}>
                                                <span className='text-muted-foreground'>▪</span>
                                                <p className='text-sm sm:text-base text-muted-foreground'>{desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                    
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </motion.div>
    )
}

export default WorkExperience