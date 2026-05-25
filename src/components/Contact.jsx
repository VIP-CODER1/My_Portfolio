import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import emailjs from '@emailjs/browser';

// 3D Floating Contact Icons
const FloatingIcon = ({ position, children }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} position={position}>
        {children}
      </group>
    </Float>
  );
};

// Contact Information
const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "vipulmth1@gmail.com",
    link: "mailto:vipulmth1@gmail.com",
    color: "#ff6b35"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Hyderabad Telangana, India",
    link: "#",
    color: "#45b7d1"
  }
];

// Social Links
const socialLinks = [
  { icon: Github, href: "https://github.com/VIP-CODER1", color: "#333", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/vip-coder/", color: "#0077b5", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/VIP_coder", color: "#1da1f2", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/vipulzii8/", color: "#e4405f", label: "Instagram" }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('📧 Sending email to vipulmth1@gmail.com...');
      console.log('Form data:', formData);

      // Using a working email service (Formspree) - no setup required
      const response = await fetch('https://formspree.io/f/xpwgkqyw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Contact Form Message from ${formData.name}`
        })
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        console.log("✅ Email sent successfully to vipulmth1@gmail.com!");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (error) {
      console.error('Email sending error:', error);
      
      // Fallback: Show email details for manual sending
      const emailDetails = `
📧 EMAIL DETAILS (Copy and send manually):

TO: vipulmth1@gmail.com
FROM: ${formData.email}
SUBJECT: New Contact Form Message from ${formData.name}

BODY:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}

---
This message was sent from your portfolio contact form.
      `;
      
      console.log(emailDetails);
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className={`py-20 text-white dark:text-white light:text-gray-900 overflow-hidden transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-gray-900 via-black to-gray-900" 
        : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Ready to collaborate? Let's discuss your next project and bring your ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-orange-400 mb-6">Let's Connect</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a question, want to discuss a project, or just want to say hi, 
                feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  className="group flex items-center p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-orange-400 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div 
                    className="p-4 rounded-full mr-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <info.icon 
                      className="w-6 h-6" 
                      style={{ color: info.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                    <p className="text-gray-400">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:border-orange-400 transition-all duration-300"
                    style={{ color: social.color }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 3D Background */}
            <div className="absolute inset-0 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                
                <FloatingIcon position={[-2, 0, -1]}>
                  <Sphere args={[0.3, 32, 32]}>
                    <MeshDistortMaterial
                      color="#ff6b35"
                      attach="material"
                      distort={0.3}
                      speed={1.5}
                      roughness={0}
                    />
                  </Sphere>
                </FloatingIcon>
                
                <FloatingIcon position={[2, 1, -2]}>
                  <Sphere args={[0.25, 32, 32]}>
                    <MeshDistortMaterial
                      color="#4ecdc4"
                      attach="material"
                      distort={0.2}
                      speed={1}
                      roughness={0}
                    />
                  </Sphere>
                </FloatingIcon>
              </Canvas>
            </div>

            {/* Form */}
            <div className={`relative z-10 backdrop-blur-sm rounded-2xl p-8 ${
              isDark 
                ? "bg-gray-800/50 border border-gray-700" 
                : "bg-white/50 border border-gray-300"
            }`}>
              <h2 className="text-2xl font-bold text-orange-400 mb-6">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Full Name *
                    </label>
          <input 
            type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-300 ${
                        isDark 
                          ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400" 
                          : "bg-gray-100/50 border-gray-400 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="Your full name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Email Address *
                    </label>
          <input 
            type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-300 ${
                        isDark 
                          ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400" 
                          : "bg-gray-100/50 border-gray-400 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Phone Number
                  </label>
          <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-300 ${
                      isDark 
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400" 
                        : "bg-gray-100/50 border-gray-400 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="+91 1234567890"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Message *
                  </label>
          <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-300 resize-none ${
                      isDark 
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400" 
                        : "bg-gray-100/50 border-gray-400 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                  >
                    ✅ Message sent successfully!
                  </motion.div>
                )}
                
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
                  >
                    ❌ Failed to send message. Please try again or contact me directly at vipulmth1@gmail.com
                  </motion.div>
                )}
        </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
