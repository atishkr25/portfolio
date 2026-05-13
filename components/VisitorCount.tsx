// components/VisitorCount.tsx
// Tailwind CSS version

'use client';

import { useEffect, useState } from 'react';

type VisitorStats = {
    visitors: number;
    pageviews: number;
    bounceRate: number;
    visitDuration: number;
};

const VisitorCounter = () => {
    const [stats, setStats] = useState<VisitorStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchVisitorCount();
    }, []);

    const fetchVisitorCount = async () => {
        try {
            const response = await fetch('/api/visitors', { cache: 'no-store' });

            if (!response.ok) throw new Error('Failed to load visitor stats');

            const data = (await response.json()) as Partial<VisitorStats>;
            if (typeof data.visitors !== 'number') throw new Error('Invalid stats payload');

            setStats({
                visitors: data.visitors,
                pageviews: data.pageviews ?? 0,
                bounceRate: data.bounceRate ?? 0,
                visitDuration: data.visitDuration ?? 0,
            });
        } catch (err) {
            console.error('Error fetching visitor count:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getOrdinal = (n: number) => {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    };

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    if (error) {
        return null;
    }

    return (
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl shadow-sm">


            <span className={`text-gray-700 ${loading ? 'animate-pulse' : ''}`}>
                {loading ? (
                    'Loading visitors...'
                ) : (
                    <>

                        <span className="font-semibold dark:text-gray-200 text-gray-700">
                            {formatNumber(stats?.visitors ?? 0)}
                            <sup className="text-xs">
                                {getOrdinal(stats?.visitors ?? 0)}
                            </sup>
                        </span>{' '}
                        visitors
                    </>
                )}
            </span>
        </div>
    );
};

export default VisitorCounter;
