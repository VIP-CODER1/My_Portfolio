import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/VIP-CODER1", label: "GitHub", color: "#333" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vip-coder/", label: "LinkedIn", color: "#0077b5" },
    { icon: Twitter, href: "https://x.com/VIP_coder", label: "Twitter", color: "#1da1f2" },
    { icon: Instagram, href: "https://www.instagram.com/vipulzii8/", label: "Instagram", color: "#e4405f" },
    { icon: Mail, href: "mailto:vipulmth1@gmail.com", label: "Email", color: "#ff6b35" }
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Vipul Kumar
              </span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              A passionate Full-Stack Developer creating innovative digital experiences 
              with modern technologies and creative problem-solving approaches.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:border-orange-400 transition-all duration-300"
                  style={{ color: social.color }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-orange-400 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-orange-400 mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <a 
                  href="mailto:vipulmth1@gmail.com"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                >
                  vipulmth1@gmail.com
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <a 
                  href="tel:+91 6204252002"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                >
                  +91 6204252002
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-gray-400"
              >
                Hydrabad Telangana, India
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>&copy; {currentYear} Vipul Kumar. All rights reserved.</span>
          </div>
          
          <motion.div
            className="flex items-center space-x-2 text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500" />
            </motion.div>
            <span>using React & Three.js</span>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 opacity-50"></div>
      </div>
    </footer>
  );
};

export default Footer;
