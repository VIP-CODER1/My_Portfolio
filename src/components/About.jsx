import React from "react";
import myImage from "../assets/vip.jpg"; // Ensure the path and filename are correct

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col items-center text-center">
        <img
          src={myImage} // Use the imported variable here
          alt="Vipul Kumar"
          className="w-40 h-40 rounded-full mb-6 border-4 border-white shadow-[0_4px_6px_0_rgba(255,165,0,0.7)]" // Orange shadow
        />
        <h2 className="text-4xl font-bold mb-4 text-orange-500">About Me</h2>
        <p className="text-lg mb-6 max-w-3xl">
          Hi, I'm <span className="font-semibold">Vipul Kumar</span>, a passionate student at 
          <span className="font-semibold"> Indian Institute of Information Technology, Senapati, Manipur</span>. 
          I specialize in developing efficient and scalable solutions with a strong foundation in C++ and modern technologies like React.js.
          <br />
          I am driven by my enthusiasm to learn, adapt, and grow in dynamic environments. Over the years, I have worked on projects involving 
          algorithm optimization, full-stack development, and software design. My core strengths lie in problem-solving, attention to detail, 
          and delivering user-centric solutions.
          <br />
          Beyond coding, I enjoy exploring new technologies and contributing to impactful projects. I believe in maintaining a 
          <span className="font-semibold"> "never-give-up" attitude</span> and constantly challenging myself to grow both personally and professionally.
        </p>
        <p className="text-lg">
          Let's connect and create something amazing together!
        </p>
      </div>
    </section>
  );
};

export default About;
