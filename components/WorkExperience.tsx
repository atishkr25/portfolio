"use client"

import { companies } from '@/data/companiesData'
import Image from 'next/image'
import Link from 'next/link'

const WorkExperience = ({ showAll = false }: { showAll?: boolean }) => {
    const displayedCompanies = showAll ? companies : companies.slice(0, 2);

    return (
        <div className='w-full'>
            <div className='text-start mb-6'>
                <h3 className='text-sm text-muted-foreground'>Featured</h3>
                <h1 className='text-2xl font-semibold text-foreground'>Experience</h1>
            </div>

            <div className='flex flex-col gap-10 mt-3'>
                {displayedCompanies.map((item, index) => (
                    <div key={index} className="flex flex-col gap-4 pb-10 border-b border-border dark:border-white/5 last:border-0 last:pb-0">
                        
                        {/* Header: Logo, Name, Role, Dates */}
                        <div className='flex flex-col sm:flex-row sm:justify-between items-start w-full gap-4 sm:gap-0'>
                            <div className='flex items-center gap-4'>
                                <div className="shrink-0">
                                    {item.link ? (
                                        <Link href={item.link} target="_blank" rel="noopener noreferrer" className='block hover:opacity-80 transition-opacity'>
                                            <Image src={item.image} alt={item.name} width={40} height={40} className='w-10 h-10 rounded-lg object-cover' />
                                        </Link>
                                    ) : (
                                        <Image src={item.image} alt={item.name} width={40} height={40} className='w-10 h-10 rounded-lg object-cover' />
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <div className="flex items-center gap-2">
                                        <h1 className='text-base font-semibold'>{item.name}</h1>
                                    </div>
                                    <p className='text-sm text-muted-foreground mt-0.5'>{item.role}</p>
                                </div>
                            </div>
                            
                            <div className='flex flex-col sm:items-end text-sm text-muted-foreground'>
                                <p>{item.joinning_date} - {item.end_date}</p>
                                <p>{item.location}</p>
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="mt-2">
                            <p className='text-xs sm:text-sm font-bold text-foreground mb-3'>Technologies</p>
                            <div className='flex flex-wrap gap-2.5'>
                                {item.tools.map((tool, index) => (
                                    <div key={index} className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-black/5 dark:bg-[#2E2E2E] border border-dashed border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-[#3A3A3A] hover:border-black/40 dark:hover:border-white/40 hover:scale-[1.02] transition-all duration-200 cursor-pointer text-foreground">
                                        <div className='w-4 h-4 flex items-center justify-center'> <tool.icon /></div>
                                        <span className='text-xs sm:text-[13px] font-semibold leading-none mt-0.5'>{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div className='flex flex-col mt-3 space-y-0'>
                            {item.description.map((desc: string, ind: number) => (
                                <p className='text-base text-muted-foreground leading-relaxed' key={ind}>
                                    <span className='text-muted-foreground/50 mr-1.5'>▪</span>
                                    {desc}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {!showAll && (
                <div className="flex justify-center mt-8">
                    <Link href="/experience" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-secondary/20 hover:bg-secondary/40 text-foreground border border-border/50 hover:border-border">
                        Show all work experiences
                        <span className="text-lg leading-none">→</span>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default WorkExperience