"use client";
import { githubConfig } from '@/config/Github';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { Button } from './ui/button';
import Link from 'next/link';
import { GithubIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ActivityCalendar = dynamic(
    () => import('react-activity-calendar').then((mod) => mod.ActivityCalendar),
    { ssr: false }
);
type ContributionItem = {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
};



// Helper function to filter contributions to past year
function filterLastYear(contributions: ContributionItem[]): ContributionItem[] {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return contributions.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= oneYearAgo;
    });
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

const Github = () => {

    const [contributions, setContributions] = useState<ContributionItem[]>([]);
    const [totalContributions, setTotalContributions] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${githubConfig.apiUrl || 'https://github-contributions-api.jogruber.de/v4'}/${githubConfig.username}?y=last`
                );
                const data: { contributions?: ContributionItem[] } = await response.json();

                if (data?.contributions && Array.isArray(data.contributions)) {
                    const validContributions = data.contributions
                        .filter(
                            (item): item is ContributionItem =>
                                typeof item === 'object' &&
                                item !== null &&
                                'date' in item &&
                                'count' in item &&
                                'level' in item
                        )
                        .map((item) => ({
                            date: String(item.date),
                            count: Number(item.count || 0),
                            level: Number(item.level || 0) as ContributionItem['level'],
                        }));

                    if (validContributions.length > 0) {
                        // Calculate total contributions
                        const total = validContributions.reduce(
                            (sum, item) => sum + item.count,
                            0,
                        );
                        setTotalContributions(total);

                        // Filter to show only the past year
                        const filteredContributions = filterLastYear(validContributions);
                        setContributions(filteredContributions);
                    } else {
                        setHasError(true);
                    }
                } else {
                    setHasError(true);
                }
            } catch (err) {
                console.error('Failed to fetch GitHub contributions:', err);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);
    return (
        <div className="w-full">
            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
                        <p className="text-muted-foreground text-sm">
                            {githubConfig.loadingState.description}
                        </p>
                    </div>
                </div>
            ) : hasError || contributions.length === 0 ? (
                <div className="text-muted-foreground border-border rounded-lg border p-8 text-center bg-secondary dark:bg-white/5">
                    <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                        <GithubIcon className="h-8 w-8" />
                    </div>
                    <p className="mb-2 font-medium">{githubConfig.errorState.title}</p>
                    <p className="mb-4 text-sm">
                        {githubConfig.errorState.description}
                    </p>
                    <Button variant="outline" asChild>
                        <Link
                            href={`https://github.com/${githubConfig.username}`}
                            className="inline-flex items-center gap-2"
                        >
                            <GithubIcon className="h-4 w-4" />
                            {githubConfig.errorState.buttonText}
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="w-full mt-6">
                    <TooltipProvider delayDuration={0}>
                        <div className="w-full">
                            <div className="[&_text]:fill-muted-foreground [&_text]:text-sm [&_svg]:max-w-full [&_svg]:h-auto flex flex-col justify-center">
                                <ActivityCalendar
                                    data={contributions}
                                    blockSize={12}
                                    blockMargin={4}
                                    blockRadius={2}
                                    fontSize={14}
                                    theme={githubConfig.theme}
                                    colorScheme={(resolvedTheme as 'light' | 'dark') || 'dark'}
                                    showColorLegend={false}
                                    showTotalCount={false}
                                    showWeekdayLabels={false}
                                    labels={{
                                        months: githubConfig.months,
                                    }}
                                    renderBlock={(block, activity) => (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                {block}
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-primary text-primary-foreground border-none px-3 py-1.5 rounded-md text-xs shadow-lg">
                                                {activity.count} contributions on {formatDate(activity.date)}
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                />
                                
                                {/* Custom Footer */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 gap-3 sm:gap-0 text-sm text-muted-foreground w-full">
                                    <div>
                                        {totalContributions} contributions in the last year on <Link href={`https://github.com/${githubConfig.username}`} target="_blank" className="underline decoration-muted-foreground/50 underline-offset-4 hover:text-foreground transition-colors">GitHub</Link>.
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <span>Less</span>
                                            <div className="flex gap-1">
                                                <div className="w-3 h-3 rounded-sm bg-black/5 dark:bg-white/5"></div>
                                                <div className="w-3 h-3 rounded-sm bg-black/15 dark:bg-white/15"></div>
                                                <div className="w-3 h-3 rounded-sm bg-black/30 dark:bg-white/30"></div>
                                                <div className="w-3 h-3 rounded-sm bg-black/60 dark:bg-white/60"></div>
                                                <div className="w-3 h-3 rounded-sm bg-black/90 dark:bg-white/90"></div>
                                            </div>
                                            <span>More</span>
                                        </div>
                                        {/* Cat Graphic */}
                                        <div className="hidden sm:block ml-2">
                                           <Image 
                                             src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" 
                                             alt="Running Cat" 
                                             width={32} 
                                             height={32} 
                                             className="opacity-70 dark:invert-0 invert select-none pointer-events-none"
                                             unoptimized
                                           />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TooltipProvider>
                </div>
            )}
        </div>
    )
}

export default Github