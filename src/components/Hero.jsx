import React, { useEffect, useRef, useState } from "react"; 
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
// import bgGif from "./assets/bg.gif"; // ✅ Correctly Import the GIF

const Boy3DModel = () => {
  const { scene, animations } = useGLTF("/boy3.glb");
  const mixer = useRef(null);
  const [isDancing, setIsDancing] = useState(false);

  useEffect(() => {
    if (animations) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

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
      className="relative h-screen text-white flex items-center justify-center overflow-hidden px-4"
      style={{
        background: "linear-gradient(blue, white, orange)", 
      }}
    >
      {/* ✅ Background GIF */}
{/*       <div
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: `url(${bgGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1, 
        }}
      ></div> */}

      {/* ✅ 3D Model Canvas */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Boy3DModel />
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* ✅ Foreground Content */}
      <motion.div
        className="text-center relative z-10 max-w-lg mx-auto transform -translate-x-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-5 text-orange-500"
          animate={{ x: [0, 20, -20, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          ℍ𝕚, 𝕀'𝕞 𝕍𝕚𝕡𝕦𝕝✌️
        </motion.h1>
        <p className="text-lg md:text-xl mb-6">
          A passionate <span className="text-orange-400 font-semibold">Software Developer</span>, creating impactful solutions.
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
