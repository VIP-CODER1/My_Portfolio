import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { 
  Code2, 
  Database, 
  Smartphone, 
  Globe, 
  Cpu, 
  Zap,
  GraduationCap,
  Award,
  Users,
  Calendar
} from "lucide-react";
import myImage from "../assets/vipul imgn.png";

// Animated 3D Sphere for skills
const AnimatedSphere = ({ position, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

// Skills data
const skills = [
  { name: "Frontend", icon: Code2, color: "#ff6b35", level: 90 },
  { name: "Backend", icon: Database, color: "#4ecdc4", level: 85 },
  { name: "DSA", icon: Smartphone, color: "#45b7d1", level: 75 },
  { name: "OOPS, DBMS, OS, CN", icon: Globe, color: "#f9ca24", level: 70 },
  { name: "AI/ML", icon: Cpu, color: "#6c5ce7", level: 35 },
  { name: "MS Tools", icon: Zap, color: "#ff7675", level: 80 }
];

// Timeline data
const timeline = [
  {
    year: "2025",
    title: "Current Studies",
    description: "Pursuing Computer Science at IIIT Manipur",
    icon: GraduationCap
  },
  {
    year: "2024",
    title: "Full-Stack Projects",
    description: "Developed multiple MERN stack applications & Practiced DSA in C++",
    icon: Code2
  },
  {
    year: " 2023",
    title: "Problem Solving",
    description: "Competitive programming and algorithm optimization",
    icon: Award
  },
  {
    year: "2022",
    title: "Learning Journey",
    description: "Started exploring modern web technologies",
    icon: Users
  }
];

// Tech stack data
const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#68a063" },
  { name: "MongoDB", color: "#4db33d" },
  { name: "Python", color: "#3776ab" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Express", color: "white" },
  { name: "Three.js", color: "red" },
  { name: "Tailwind", color: "yellow" },
  { name: "Version Control", color: "#f05032" },
  { name: "AWS", color: "#ff9900" },
  { name: "Git Github", color: "yellow" }
];

const About = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10">
              <motion.img
                src={myImage}
          alt="Vipul Kumar"
                className="w-80 h-80 rounded-full mx-auto border-4 border-orange-400 shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* 3D Background Sphere */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedSphere position={[0, 0, -2]} color="#ff6b35" />
              </Canvas>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-orange-400">
                Hi, I'm <span className="text-yellow-400">Vipul Kumar</span>
              </h3>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  A passionate <span className="text-orange-400 font-semibold">Computer Science student</span> at 
                  <span className="text-yellow-400 font-semibold"> Indian Institute of Information Technology, Senapati, Manipur</span>.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                 I specialize in developing <span className="text-orange-400 font-semibold">efficient and scalable solutions</span> with a strong foundation in 
<span className="text-blue-400 font-semibold"> C++</span>, 
<span className="text-green-400 font-semibold"> Data Structures & Algorithms</span>, and modern technologies like 
<span className="text-cyan-400 font-semibold"> React.js</span>, 
<span className="text-purple-400 font-semibold"> MERN Stack</span>, and 
<span className="text-pink-400 font-semibold"> Next.js</span>.

                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                 Driven by enthusiasm to learn, adapt, and grow in dynamic environments. My core strengths lie in 
<span className="text-green-400 font-semibold"> problem-solving</span>, 
<span className="text-purple-400 font-semibold"> Data Structures & Algorithms</span>, 
<span className="text-cyan-400 font-semibold"> full-stack development</span>, and delivering 
<span className="text-pink-400 font-semibold"> user-centric solutions</span>.

                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-orange-400">
            Skills & Expertise
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                onHoverStart={() => setHoveredSkill(index)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <div className="relative p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 group-hover:border-orange-400 transition-all duration-300 cursor-pointer">
                  <div className="text-center">
                    <motion.div
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <skill.icon 
                        className="w-8 h-8 text-orange-400" 
                        style={{ color: hoveredSkill === index ? skill.color : "#ff6b35" }}
                      />
                    </motion.div>
                    <h4 className="font-semibold text-white mb-2">{skill.name}</h4>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 1.8 + index * 0.1 }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 mt-1">{skill.level}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-orange-400">
            Tech Stack
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 2.2 + index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div 
                  className="px-6 py-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 group-hover:border-opacity-50 transition-all duration-300 cursor-pointer"
                  style={{ 
                    borderColor: `${tech.color}40`,
                    boxShadow: `0 0 20px ${tech.color}20`
                  }}
                >
                  <span 
                    className="font-medium text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-orange-400">
            Journey So Far
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-yellow-500 rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 2.6 + index * 0.2 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <motion.div
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-orange-400 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-3`}>
                        <item.icon className="w-6 h-6 text-orange-400" />
                        <span className="text-orange-400 font-bold text-lg">{item.year}</span>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-300">{item.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-4 h-4 bg-orange-400 rounded-full border-4 border-gray-900"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
