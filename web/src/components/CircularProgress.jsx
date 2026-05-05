import React, { useEffect, useState } from 'react';

const CircularProgress = ({
    percentage,
    size = 60,
    strokeWidth = 6,
    primaryColor = 'var(--color-primary)',
    secondaryColor = 'var(--color-surface-2)',
    textColor = 'var(--color-text-primary)'
}) => {
    const [offset, setOffset] = useState(0);
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - percentage) / 100) * circumference;
        setOffset(progressOffset);
    }, [percentage, circumference]);

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={secondaryColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="transition-all duration-500 ease-in-out"
                />
                {/* Progress Circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={primaryColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    style={{
                        filter: 'drop-shadow(0 0 2px var(--color-primary))'
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                    className="text-sm font-black tracking-tighter"
                    style={{ color: textColor }}
                >
                    {percentage}%
                </span>
            </div>
        </div>
    );
};

export default CircularProgress;
