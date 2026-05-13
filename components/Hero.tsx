"use client"
import Image from 'next/image'
import myimg from "../public/atishprofilepic.jpg";
import minecreaft from "../public/banner/himalaya4.jpg";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { socialLinks } from '@/data/socialLinks';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

const Hero = () => {
    const [copied, setCopied] = useState(false);
    const [resumePos, setResumePos] = useState({ x: 0, y: 0 });
    const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
    const [nameText, setNameText] = useState('Atish Kumar');
    const email = "atish1816@gmail.com";
    const scrambleFrameRef = useRef<number | null>(null);
    const scrambleStartRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const targetName = 'Atish Kumar';
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distX = (x - centerX) / centerX;
        const distY = (y - centerY) / centerY;
        const limit = 8;
        setter({
            x: Math.max(-limit, Math.min(limit, distX * 15)),
            y: Math.max(-limit, Math.min(limit, distY * 15))
        });
    };

    const handleMouseLeave = (setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
        setter({ x: 0, y: 0 });
    };

    const runScramble = () => {
        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        scrambleStartRef.current = 0;

        const duration = 800;
        const animate = (timestamp: number) => {
            if (!scrambleStartRef.current) scrambleStartRef.current = timestamp;

            const elapsed = timestamp - scrambleStartRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const revealCount = Math.floor(easedProgress * targetName.length);

            const nextText = targetName
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < revealCount) return targetName[index];
                    return randomChars[Math.floor(Math.random() * randomChars.length)];
                })
                .join('');

            setNameText(nextText);

            if (progress < 1) {
                scrambleFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            setNameText(targetName);
            isAnimatingRef.current = false;
            scrambleFrameRef.current = null;
        };

        scrambleFrameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        return () => {
            if (scrambleFrameRef.current) {
                cancelAnimationFrame(scrambleFrameRef.current);
            }
        };
    }, []);

    return (
        <div>

            <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='relative w-full'>
                    {/* Banner Image */}
                    <Image
                        className='w-full h-[10px] sm:h-[200px] md:h-[250px] lg:h-[290px] object-cover rounded-lg'
                        src={minecreaft}
                        width={1240}
                        height={900}
                        alt='Mountain landscape banner'
                        priority
                    />

                </div>

                {/* Profile Image - positioned below banner */}
                <motion.div
                    className='relative -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16'
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Image
                        className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover rounded-full shadow-lg ring-4 ring-background'
                        src={myimg}
                        alt='Atish profile picture'
                        width={500}
                        height={500}
                    />
                </motion.div>
            </motion.div>

            {/* Name and Social Links */}
            <motion.div
                className='flex flex-col  sm:flex-row mt-4 sm:mt-6 gap-4 sm:items-center sm:justify-between'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <div className='text-start'>
                    <div className='flex items-center gap-3'>
                        <h1
                            onMouseEnter={runScramble}
                            className='relative inline-block dark:overflow-hidden text-xl sm:text-2xl lg:text-2xl font-semibold text-foreground'
                        >
                            {nameText}
                            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 -skew-x-12 animate-glass-flash pointer-events-none" />
                        </h1>
                    </div>
                    <p className='text-xs sm:text-sm text-muted-foreground'>Frontend Developer building full-stack apps | Exploring DSA & CP</p>
                </div>

                {/* Social Icons */}
                <div className='flex items-center gap-2 sm:gap-3'>
                    <TooltipProvider delayDuration={0.95}>
                        {socialLinks.filter((link) => link.label !== 'Mail').map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                >
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center cursor-pointer 
                                                          bg-muted/50 hover:bg-primary hover:text-primary-foreground
                                                          rounded-lg p-1.5 sm:p-2 
                                                          hover:scale-110 transition-all duration-200"
                                            >
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{link.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </motion.div>
                            );
                        })}
                    </TooltipProvider>
                </div>
            </motion.div >

            {/* Bio */}
            < motion.div
                className='text-start mt-4 sm:mt-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <p className='text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground'>
                    I build full-stack applications using <span className='font-semibold font-mono'>React.js, JavaScript, Node.js, Express.js, MongoDB, Firebase </span>
                    from pixel-perfect UIs to scalable backends. I don't just write code; I craft experiences that users love, contribute to open source, and constantly push myself to learn and grow as a developer.
                </p>
            </motion.div >

            {/* Action Buttons */}
            <motion.div
                className='flex flex-wrap gap-3 mt-6 sm:mt-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <motion.div
                    onMouseMove={(e) => handleMouseMove(e, setResumePos)}
                    onMouseLeave={() => handleMouseLeave(setResumePos)}
                    animate={{ x: resumePos.x, y: resumePos.y }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    <Link
                        href="https://drive.google.com/file/d/1fbKyijdS5fY0U8oCOrHF_lJhnpddYyOj/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-foreground bg-transparent hover:bg-secondary/50 text-foreground text-sm transition-all duration-300'
                    >
                        <svg viewBox="0 0 256 256" className='w-4 h-4 flex-shrink-0'>
                            <path fill="currentColor" d="M210.78,39.25l-130.25-23A16,16,0,0,0,62,29.23l-29.75,169a16,16,0,0,0,13,18.53l130.25,23h0a16,16,0,0,0,18.54-13l29.75-169A16,16,0,0,0,210.78,39.25ZM178.26,224h0L48,201,77.75,32,208,55ZM89.34,58.42a8,8,0,0,1,9.27-6.48l83,14.65a8,8,0,0,1-1.39,15.88,8.36,8.36,0,0,1-1.4-.12l-83-14.66A8,8,0,0,1,89.34,58.42ZM83.8,89.94a8,8,0,0,1,9.27-6.49l83,14.66A8,8,0,0,1,174.67,114a7.55,7.55,0,0,1-1.41-.13l-83-14.65A8,8,0,0,1,83.8,89.94Zm-5.55,31.51A8,8,0,0,1,87.52,115L129,122.29a8,8,0,0,1-1.38,15.88,8.27,8.27,0,0,1-1.4-.12l-41.5-7.33A8,8,0,0,1,78.25,121.45Z" />
                        </svg>
                        Resume / CV
                    </Link>
                </motion.div>
                <motion.div
                    onMouseMove={(e) => handleMouseMove(e, setTouchPos)}
                    onMouseLeave={() => handleMouseLeave(setTouchPos)}
                    animate={{ x: touchPos.x, y: touchPos.y }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    <Link
                        href="mailto:atish1816@gmail.com"
                        className='inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground hover:bg-foreground/90 text-background text-sm transition-all duration-300 font-semibold'
                    >
                        <svg viewBox="0 0 256 256" className='w-4 h-4 flex-shrink-0'>
                            <path fill="currentColor" d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" />
                        </svg>
                        Get in touch
                    </Link>
                </motion.div>
            </motion.div>

            {/* Email Display */}
            <motion.div
                className='flex items-center gap-2 mt-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <span className='text-sm text-muted-foreground'>•</span>
                <span className='text-sm text-muted-foreground'>{email}</span>
                <button
                    onClick={handleCopyEmail}
                    className='ml-2 p-1 hover:bg-secondary rounded transition-colors'
                    title="Copy email"
                >
                    {copied ? (
                        <Check className='w-4 h-4 text-green-500' />
                    ) : (
                        <Copy className='w-4 h-4 text-muted-foreground hover:text-foreground' />
                    )}
                </button>
            </motion.div>
        </div >
    )
}

export default Hero
