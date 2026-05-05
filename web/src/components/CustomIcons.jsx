import React from 'react';

/**
 * Custom Tie Icon matching the provided "Jobs" image.
 */
export const TieIcon = ({ className, style, size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Top part of the tie */}
        <path d="M12 2.5L8.5 6L12 9L15.5 6L12 2.5Z" />
        {/* Body of the tie */}
        <path d="M12 9L7.5 21L12 23.5L16.5 21L12 9Z" />
    </svg>
);

/**
 * Custom Bookmark Icon matching the provided "Save" image with adaptable colors.
 */
export const BookmarkIcon = ({ className, style, size = 24, fill = "none" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
);
