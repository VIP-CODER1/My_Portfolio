import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "../data/experience";
import ExperienceCard from "./ExperienceCard";
import useReducedMotionSafe from "../hooks/useReducedMotionSafe";

function buildSerpentinePath(count, width, height, isMobile) {
  if (count < 2 || width === 0 || height === 0) {
    return `M ${(width || 1) / 2} 0 V ${height || 1}`;
  }

  if (isMobile) {
    // Mobile: straight vertical line at center of the 48px gutter column
    return `M 24 0 V ${height}`;
  }

  const cx = width / 2;
  const stepY = height / count;
  const bow = Math.min(width * 0.22, 180);

  // Start at first node anchor (vertical middle of first card row)
  let d = `M ${cx} ${stepY / 2}`;

  for (let i = 1; i < count; i++) {
    const y0 = stepY * (i - 0.5);
    const y1 = stepY * (i + 0.5);
    // Alternate bow direction so the thread weaves left/right between nodes
    const ctrlX = cx + (i % 2 === 1 ? bow : -bow);
    const cy = (y0 + y1) / 2;
    d += ` Q ${ctrlX} ${cy} ${cx} ${y1}`;
  }

  return d;
}

const ExperienceThread = () => {
  const outerRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotionSafe();

  useLayoutEffect(() => {
    const update = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
      setIsMobile(window.innerWidth < 768);
    };
    update();
    // Re-measure after a tick to catch late layout from fonts/images
    const t = setTimeout(update, 120);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start 0.9", "end 0.4"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pathD = buildSerpentinePath(
    experience.length,
    size.w || 800,
    size.h || 1000,
    isMobile
  );

  return (
    <div ref={outerRef} className="relative">
      {/* SVG thread spans full container height, sits behind cards */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${size.w || 800} ${size.h || 1000}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="thread-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#f9ca24" />
          </linearGradient>
        </defs>
        <motion.path
          d={pathD}
          stroke="url(#thread-gradient)"
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={reduce ? { pathLength: 1 } : { pathLength }}
        />
      </svg>

      {/* Cards in natural flow */}
      <div className="relative">
        {experience.map((entry, index) => (
          <ExperienceCard
            key={`${entry.org}-${index}`}
            entry={entry}
            index={index}
            total={experience.length}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceThread;
