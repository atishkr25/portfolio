import { useRef, useEffect } from 'react';

export const useSound = (audioSource: string) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio instance only on client side
        if (typeof window !== "undefined") {
            audioRef.current = new Audio(audioSource);
        }
    }, [audioSource]);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.error("Failed to play sound:", err);
            });
        }
    };

    const stopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return {
        playSound,
        stopSound
    };
};