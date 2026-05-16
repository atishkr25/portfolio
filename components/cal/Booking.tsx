import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { getCalApi } from "@calcom/embed-react";
import { calconfig } from '@/config/calconfig';
import Image from 'next/image';
import atishProfile from '../../public/atishprofilepic.jpg';

const Booking = () => {

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "15min" });
            cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])

    return (
        <div className='w-full'>
            {/* Main booking section */}
            <div className='rounded-lg py-8 px-5 flex flex-col items-center justify-center space-y-5 border border-dashed border-black/15 -mt-4 dark:border-muted-foreground/25' >
                <p className='text-base sm:text-lg text-muted-foreground text-center'>Hey, you scrolled this far, let&apos;s talk.</p>
                
                <Button
                    data-cal-namespace={calconfig.namespace}
                    data-cal-link={calconfig.link}
                    data-cal-config={JSON.stringify(calconfig.config)}
                    className='group flex items-center gap-2 bg-background hover:bg-accent text-foreground rounded-full px-4 py-3 text-base transition-all duration-500 rounded-2xl border border-dashed border-black/20 shadow-sm hover:shadow dark:bg-[#2F2F2F] dark:hover:bg-[#3A3A3A] dark:text-foreground dark:border-muted-foreground/25 dark:shadow-none'
                >
                    <span className='flex items-center gap-2'>
                        <span className='w-6 h-6 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/10 flex-shrink-0'>
                            <Image
                                src={atishProfile}
                                alt='Atish profile'
                                width={24}
                                height={24}
                                className='w-full h-full object-cover'
                            />
                        </span>

                        <span className='max-w-0 opacity-0 overflow-hidden group-hover:max-w-20 group-hover:opacity-100 transition-all duration-500 ease-out'>
                            <span className='flex items-center gap-2'>
                                <span className='text-base leading-none'>+</span>
                                <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/10 text-[11px] font-medium text-foreground/80 flex-shrink-0 dark:bg-white/10'>You</span>
                            </span>
                        </span>
                    </span>
                    <span className='font-semibold text-foreground/90'>Book a Meeting</span>
                </Button>
            </div>
        </div>
    )
}

export default Booking