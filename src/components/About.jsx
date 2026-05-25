import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import myImage from "../assets/vipul-adi.jpeg";

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

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-clip">
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

      </div>
    </section>
  );
};

export default About;
