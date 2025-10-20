import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function WaveBackground({ className, children }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('relative overflow-hidden rounded-[48px] bg-wave-gradient text-white shadow-reef', className)}>
            <div className="pointer-events-none absolute inset-0 opacity-80">
                <svg className="h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        fill="url(#heroWave)"
                        d="M0,64L40,101.3C80,139,160,213,240,229.3C320,245,400,203,480,181.3C560,160,640,160,720,154.7C800,149,880,139,960,165.3C1040,192,1120,256,1200,282.7C1280,309,1360,299,1400,293.3L1440,288L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
                    />
                    <defs>
                        <linearGradient id="heroWave" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(242, 196, 109, 0.35)" />
                            <stop offset="50%" stopColor="rgba(209, 230, 255, 0.25)" />
                            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}
