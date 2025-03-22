import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
import Confetti from "react-confetti";

const Boy3DModel = ({ cursorPos }) => {
  const { scene, animations } = useGLTF("/boy3.glb");
  const mixer = useRef(null);

  useEffect(() => {
    if (animations) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
    scene.rotation.y = cursorPos.x * 0.002; // Model rotates based on cursor
    scene.position.y = -1.5 + cursorPos.y * 0.001; // Moves up and down slightly
  });

  return <primitive object={scene} scale={0.05} position={[0, -1.5, 1]} />;
};

const Hero = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  // Track mouse movement
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setCursorPos({ x: clientX - centerX, y: clientY - centerY });
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-white overflow-hidden px-4"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowConfetti(true)}
      onMouseLeave={() => setShowConfetti(false)}
    >
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 3,
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between px-8">
        
        {/* Left Side: 3D Model */}
        <motion.div
          className="w-full md:w-1/2 h-[500px] flex justify-center items-center"
          animate={{ x: cursorPos.x * 0.02, y: cursorPos.y * 0.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <Boy3DModel cursorPos={cursorPos} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </motion.div>

        {/* Right Side: Animated Card Box */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left px-8 py-10 relative bg-gray-900/60 backdrop-blur-lg rounded-lg shadow-lg border border-gray-600"
          animate={{ x: cursorPos.x * 0.02, y: cursorPos.y * 0.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 165, 0, 0.8)" }}
        >
          {/* Glowing Border Animation */}
          <motion.div
            className="absolute inset-0 border-2 rounded-lg border-orange-500"
            animate={{
              opacity: [0.5, 1, 0.5],
              boxShadow: [
                "0px 0px 10px rgba(255, 165, 0, 0.6)", 
                "0px 0px 30px rgba(255, 165, 0, 1)", 
                "0px 0px 10px rgba(255, 165, 0, 0.6)"
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-5 text-orange-500"
            animate={{ x: [0, 15, -15, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            ℍ𝕚, 𝕀'𝕞 𝕍𝕚𝕡𝕦𝕝✌️
          </motion.h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            A passionate <span className="text-orange-400 font-semibold">Software Developer</span> crafting impactful solutions.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <motion.a
              href="#projects"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(0, 191, 255, 0.8)" }}
              transition={{ duration: 0.3 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#about"
              className="bg-gradient-to-r from-gray-600 to-gray-800 px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(169, 169, 169, 0.8)" }}
              transition={{ duration: 0.3 }}
            >
              About Me
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
