import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";

const Boy3DModel = () => {
  const { scene, animations } = useGLTF("/boy3.glb");
  const mixer = useRef(null);
  const [isDancing, setIsDancing] = useState(false);

  // Initialize animation mixer for animation control
  useEffect(() => {
    if (animations) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }
  }, [animations, scene]);

  // Update the animation mixer on each frame
  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  // Jump and Dance actions
  const toggleDance = () => {
    setIsDancing(!isDancing);
  };

  return (
    <primitive
      object={scene}
      scale={0.05}
      position={[0, -1.5, 1]}
      onClick={toggleDance}
    />
  );
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-screen bg-gray-900 text-white flex items-center justify-center overflow-hidden px-4"
    >
      {/* 3D Background */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Boy Model with jumping and dancing */}
        <Boy3DModel />

        {/* OrbitControls */}
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Foreground Content */}
      <motion.div
        className="text-center relative z-10 max-w-lg mx-auto transform -translate-x-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Moving Text */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-5 text-orange-500 "
          animate={{ x: [0, 20, -20, 0] }} // Moves back and forth
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          Hi, I'm Vipul
        </motion.h1>
        <p className="text-lg md:text-xl mb-6">
          A passionate software developer, creating impactful solutions.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#projects"
            className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-700 transition block sm:inline-block"
          >
            View My Work
          </a>
          <a
            href="#about"
            className="bg-gray-500 px-6 py-3 rounded-lg hover:bg-gray-600 transition block sm:inline-block"
          >
            About Me
          </a>
         
          

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
