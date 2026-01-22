import { useState, useEffect } from "react";

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface LoopLogoProps {
  size?: LogoSize;
  className?: string;
  animate?: boolean;
  autoAnimate?: boolean;
  autoAnimateDelay?: number;
}

const sizeConfig = {
  xs: {
    fontSize: 30,
    rectW: 35,
    rectH: 16,
    border: 3,
    overlap: 1,
    marginBottom: 4,
  },
  sm: {
    fontSize: 48,
    rectW: 55,
    rectH: 24,
    border: 4,
    overlap: 1,
    marginBottom: 6,
  },
  md: {
    fontSize: 80,
    rectW: 100,
    rectH: 40,
    border: 6,
    overlap: 1,
    marginBottom: 10,
  },
  lg: {
    fontSize: 120,
    rectW: 180,
    rectH: 60,
    border: 10,
    overlap: 1,
    marginBottom: 15,
  },
  xl: {
    fontSize: 160,
    rectW: 220,
    rectH: 80,
    border: 13,
    overlap: 1,
    marginBottom: 20,
  },
  "2xl": {
    fontSize: 200,
    rectW: 300,
    rectH: 100,
    border: 14,
    overlap: 1,
    marginBottom: 25,
  },
};

export default function LoopLogo({
  size = "xl",
  className = "",
  animate = false,
  autoAnimate = false,
  autoAnimateDelay = 500,
}: LoopLogoProps) {
  const config = sizeConfig[size];
  const [activeAnimation, setActiveAnimation] = useState(false);

  useEffect(() => {
    if (autoAnimate) {
      const timer = setTimeout(() => {
        setActiveAnimation(true);
      }, autoAnimateDelay);

      return () => clearTimeout(timer);
    }
  }, [autoAnimate, autoAnimateDelay]);

  const shouldAnimate = animate || activeAnimation;

  const animatedWidth = config.rectW * 1.05;
  const animatedShadow = `0 0 ${config.border * 2}px rgba(23,74,174,0.4)`;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-baseline font-sans font-bold text-[#004aad] tracking-tighter">
        <span style={{ fontSize: `${config.fontSize}px`, lineHeight: "1" }}>
          L
        </span>

        <span style={{ fontSize: `${config.fontSize}px`, lineHeight: "1" }}>
          o
        </span>

        <div
          style={{
            width: shouldAnimate ? `${animatedWidth}px` : `${config.rectW}px`,
            height: `${config.rectH}px`,
            border: `${config.border}px solid #004aad`,
            borderRadius: `999px`,
            marginLeft: `${config.overlap}px`,
            marginRight: `${config.overlap}px`,
            marginBottom: `${config.marginBottom}px`,
            zIndex: 1,
            boxShadow: shouldAnimate ? animatedShadow : "none",
            transition: "all 0.8s ease-out",
          }}
          className={shouldAnimate ? "animate-loop-pulse" : ""}
        />

        <span style={{ fontSize: `${config.fontSize}px`, lineHeight: "1" }}>
          p
        </span>
      </div>
    </div>
  );
}
