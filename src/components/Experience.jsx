import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ExperienceThread from "./ExperienceThread";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-clip"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-orange-400">
            Experience &amp; Education
          </h3>
          <ExperienceThread />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
