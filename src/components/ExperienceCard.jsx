import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useReducedMotionSafe from "../hooks/useReducedMotionSafe";

const ExperienceCard = ({ entry, index }) => {
  const isLeft = index % 2 === 0;
  const nodeRef = useRef(null);
  const reduce = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start 0.85", "start 0.4"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1.15, 1.15] : [0.6, 1.15]
  );
  const bg = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["#ff6b35", "#ff6b35"] : ["#374151", "#ff6b35"]
  );
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    reduce
      ? ["0 0 24px rgba(255,107,53,0.7)", "0 0 24px rgba(255,107,53,0.7)"]
      : ["0 0 0px rgba(255,107,53,0)", "0 0 24px rgba(255,107,53,0.7)"]
  );

  const Icon = entry.icon;

  const card = (
    <motion.div
      className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-5 hover:border-orange-400 transition-colors flex flex-col min-h-[220px] sm:min-h-[240px] md:min-h-[260px]"
      initial={reduce ? false : { opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-orange-400 font-semibold text-[11px] sm:text-xs uppercase tracking-wide">
          {entry.period}
        </span>
        {entry.kind === "edu" && (
          <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            Education
          </span>
        )}
      </div>
      <h4 className="text-base sm:text-lg font-bold text-white leading-tight break-words">{entry.role}</h4>
      <p className="text-yellow-400 text-sm font-medium mb-0.5 break-words">{entry.org}</p>
      <p className="text-gray-400 text-xs mb-3 break-words">{entry.location}</p>
      <ul className="space-y-1.5 flex-1">
        {entry.bullets.map((b, i) => (
          <li key={i} className="text-gray-300 text-xs sm:text-sm leading-relaxed flex gap-2">
            <span className="text-orange-400 mt-0.5 select-none">•</span>
            <span className="break-words">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-[48px_1fr] md:grid-cols-[1fr_48px_1fr] gap-4 md:gap-8 items-center py-6">
      {/* Desktop left slot */}
      <div className="hidden md:flex justify-end">
        {isLeft && card}
      </div>

      {/* Node — mobile col 1, desktop col 2 */}
      <div
        ref={nodeRef}
        className="relative z-10 flex justify-center self-center"
      >
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-gray-900 flex items-center justify-center"
          style={{ scale, backgroundColor: bg, boxShadow: shadow }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      {/* Right slot: mobile always, desktop only when !isLeft */}
      <div>
        <div className="md:hidden">{card}</div>
        <div className="hidden md:block">{!isLeft && card}</div>
      </div>
    </div>
  );
};

export default ExperienceCard;
