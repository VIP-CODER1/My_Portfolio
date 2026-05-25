import React, { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, ContactShadows, Environment } from "@react-three/drei";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Download, Github, Linkedin, Mail, Code } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

// Complex 4D-like Shape Component
const ComplexShape = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={meshRef}>
        {/* Main Complex Shape */}
        <mesh position={[0, 0, 0]}>
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color="#ff6b35" 
            emissive="#ff6b35" 
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
            wireframe={false}
          />
        </mesh>
        
        {/* Inner rotating shape */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#4ecdc4" 
            emissive="#4ecdc4" 
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
            wireframe={true}
          />
        </mesh>
        
        {/* Orbiting smaller shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh 
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 6) * 2.5,
              Math.sin((i * Math.PI * 2) / 6) * 0.5,
              Math.sin((i * Math.PI * 2) / 6) * 2.5
            ]}
          >
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial 
              color={["#ff6b35", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#ff7675"][i]}
              emissive={["#ff6b35", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#ff7675"][i]}
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// 3D Background Scene for Right Side
const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-8, -8, -3]} color="#ff6b35" intensity={1} />
      <pointLight position={[8, -8, -3]} color="#4ecdc4" intensity={1} />
      <pointLight position={[0, 8, 3]} color="#45b7d1" intensity={0.8} />
      <pointLight position={[0, 0, 5]} color="#f9ca24" intensity={0.6} />
      
      <ComplexShape />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.5}
        scale={10}
        blur={2.5}
        far={4}
        color="#ff6b35"
      />
      <Environment preset="city" />

      <Sparkles count={100} scale={20} size={4} speed={0.8} color="#ff6b35" />
      <Sparkles count={60} scale={12} size={2} speed={0.4} color="#4ecdc4" />
      <Sparkles count={40} scale={8} size={1} speed={0.2} color="#45b7d1" />
    </>
  );
};

// Particle System
const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles loaded", container);
  };

  const options = useMemo(() => ({
    background: { opacity: 0 },
    particles: {
      number: { value: 80 },
      color: { value: ["#ff6b35", "#4ecdc4", "#45b7d1", "#f9ca24"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        outModes: { default: "out" }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.2,
        width: 1
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" }
      }
    }
  }), []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0"
      />
    );
  }

  return null;
};

const Hero = () => {
  const { isDark } = useTheme();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center text-white dark:text-white light:text-gray-900 overflow-hidden transition-colors duration-300"
      style={{
        background: isDark 
          ? "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)" 
          : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)"
      }}
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Content - Split Layout */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-8 sm:py-10 lg:py-20">
            
            {/* Left Side - Content */}
            <motion.div
              className="space-y-3 sm:space-y-4 lg:space-y-6 lg:pr-8 order-2 lg:order-1 ml-2 sm:ml-4 lg:ml-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Greeting */}
      <motion.div
                initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span className="text-lg md:text-xl text-orange-400 font-medium">
                  Hello, I'm
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { delayChildren: 0.9, staggerChildren: 0.045 } },
                }}
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                  aria-label="Vipul Kumar"
                >
                  {"Vipul Kumar".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={{
                        hidden: { y: "100%", opacity: 0, rotate: -8 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          rotate: 0,
                          transition: { type: "spring", damping: 14, stiffness: 200 },
                        },
                      }}
                      aria-hidden="true"
                    >
                      {char === " " ? " " : char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h1>

              {/* Tagline */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light">
                  <span className="text-gray-300 dark:text-gray-300 light:text-gray-600">I'm a </span>
                  <span className="text-orange-400 font-semibold">Full-Stack Developer</span>
                  <br />
                  <span className="text-gray-300 dark:text-gray-300 light:text-gray-600">& </span>
                  <span className="text-yellow-400 font-semibold">Problem Solver</span>
                </h2>
                
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
                  Passionate about creating <span className="text-orange-400">innovative digital experiences</span> and 
                  <span className="text-yellow-400"> solving complex problems</span> with modern technologies
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-2 sm:gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <motion.button
                  onClick={() => scrollToSection("experience")}
                  className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-black font-bold text-sm sm:text-base overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Code className="w-4 h-4" />
            Experience &amp; Education
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className="group px-4 sm:px-6 py-2 sm:py-3 border-2 border-orange-400 rounded-full text-orange-400 font-bold text-sm sm:text-base hover:bg-orange-400 hover:text-black transition-all duration-300 shadow-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Get In Touch
                  </span>
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                {[
                  { icon: Github, href: "https://github.com/VIP-CODER1", label: "GitHub", color: "#333" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/vip-coder/", label: "LinkedIn", color: "#0077b5" },
                  { icon: Mail, href: "mailto:vipulmth1@gmail.com", label: "Email", color: "#ff6b35" },
                  { icon: Download, href: "#", label: "Resume", color: "#4ecdc4" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-full bg-gray-800/30 dark:bg-gray-800/30 light:bg-gray-200/30 backdrop-blur-sm border border-gray-700 dark:border-gray-700 light:border-gray-300 hover:border-orange-400 hover:bg-orange-400/10 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20, scale: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <social.icon 
                      className="w-4 h-4 text-gray-400 dark:text-gray-400 light:text-gray-600 group-hover:text-orange-400 transition-colors duration-300" 
                      style={{ color: social.color }}
                    />
                  </motion.a>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.9 }}
              >
                {[
                  { number: "20+", label: "Projects", color: "text-orange-400" },
                  { number: "3+", label: "Years", color: "text-yellow-400" },
                  { number: "100%", label: "Passion", color: "text-orange-400" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-2 sm:p-3 bg-gray-800/20 dark:bg-gray-800/20 light:bg-gray-200/20 backdrop-blur-sm border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg hover:border-orange-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -3 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.1 + index * 0.1 }}
                  >
                    <div className={`text-lg sm:text-xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
                    <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Shape */}
            <motion.div
              className="relative h-64 sm:h-80 md:h-96 lg:h-full flex items-center justify-center order-1 lg:order-2 px-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="w-full h-full max-w-sm sm:max-w-md lg:max-w-lg">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1.2} />
                  <pointLight position={[-10, -10, -5]} color="#ff6b35" intensity={0.8} />
                  <pointLight position={[10, -10, -5]} color="#4ecdc4" intensity={0.8} />
                  <pointLight position={[0, 10, 5]} color="#45b7d1" intensity={0.6} />
                  
                  <Suspense fallback={
                    <mesh>
                      <boxGeometry args={[1, 1, 1]} />
                      <meshStandardMaterial color="#ff6b35" />
                    </mesh>
                  }>
                    <Scene3D />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
                  </Suspense>
                </Canvas>
        </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-orange-400 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
