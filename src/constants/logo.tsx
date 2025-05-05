// Dynamic Logo Component
import React from "react";

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
    alt?: string;
    backgroundColor?: string;
    mainColor?: string;
    glow1Opacity?: number;
    glow2Opacity?: number;
}

export default function LogoComponent({ 
    className, 
    width = 40, 
    height = 40, 
    alt = "Logo",
    backgroundColor = "black", 
    mainColor = "#FF9500",
    glow1Opacity = 0.6,
    glow2Opacity = 0.5
}: LogoProps) {
    return (
        <svg 
            className={className}
            width={width} 
            height={height}
            viewBox="0 0 512 512" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-label={alt}
        >
            <g clipPath="url(#clip0_399_1494)">
                <rect width="512" height="512" rx="250" fill={backgroundColor}/>
                <g opacity={glow1Opacity} filter="url(#filter0_f_399_1494)">
                    <ellipse cx="471" cy="596.5" rx="283" ry="280.5" fill={mainColor}/>
                </g>
                <g opacity={glow2Opacity} filter="url(#filter1_f_399_1494)">
                    <ellipse cx="-12" cy="-95.5" rx="283" ry="280.5" fill={mainColor}/>
                </g>
                <path d="M339.3 153C349.7 185.6 357.1 217.9 361.5 249.9C365.9 281.7 368 319.4 367.8 363H321V351C321 316.2 320.2 288 318.6 266.4C317 244.6 314.1 222.8 309.9 201C301.7 224.2 295.1 244.5 290.1 261.9C285.1 279.3 279.5 302 273.3 330H236.7C231.1 302.4 225.9 279.9 221.1 262.5C216.5 245.1 210.1 224.8 201.9 201.6C197.7 224 194.7 246.7 192.9 269.7C191.3 292.5 190.2 323.6 189.6 363H144C144.6 318.6 147 280.5 151.2 248.7C155.6 216.9 162.7 185 172.5 153H224.1C233.7 179 240.5 198.6 244.5 211.8C248.5 224.8 251.9 238.9 254.7 254.1C258.3 238.9 262.2 224.7 266.4 211.5C270.8 198.3 277.9 178.8 287.7 153H339.3Z" fill={mainColor}/>
            </g>
            <defs>
                <filter id="filter0_f_399_1494" x="-312" y="-184" width="1566" height="1561" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_399_1494"/>
                </filter>
                <filter id="filter1_f_399_1494" x="-795" y="-876" width="1566" height="1561" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_399_1494"/>
                </filter>
                <clipPath id="clip0_399_1494">
                    <rect width="512" height="512" rx="250" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}