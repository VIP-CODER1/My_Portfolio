import { Briefcase, Shield, Recycle, Globe, GraduationCap } from "lucide-react";

export const experience = [
  {
    kind: "work",
    org: "Refold AI",
    role: "SDE Intern",
    period: "Jan 2026 – June 2026",
    location: "Bengaluru, Karnataka, India",
    icon: Briefcase,
    bullets: [
      "Developed scalable backend services and REST APIs for Kantata, enabling seamless ERP integrations across systems like NetSuite, Oracle, and Sage Intacct.",
      "Developed optimized and interactive frontend interfaces using React.js, TypeScript, Next.js and Lottie React, enhancing animations, performance, and overall user experience.",
      "Built and integrated a connectors-based workflow automation and MCP server to automate Slack notifications, send Google Calendar invites, and persist structured booking data into Google Sheets.",
    ],
  },
  {
    kind: "work",
    org: "Patrol 6",
    role: "Software Developer Intern",
    period: "Sept 2025 – Oct 2025",
    location: "Greater Seattle Area, US (Remote)",
    icon: Shield,
    bullets: [
      "Designed and implemented the Patrol 6 patrol-report feature and its user interface using TypeScript, React.js, Node.js, and PostgreSQL.",
      "Diagnosed and resolved authentication and authorization issues, ensuring secure and seamless user access.",
    ],
  },
  {
    kind: "work",
    org: "M-Core Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "May 2025 – Aug 2025",
    location: "Hyderabad, Telangana, India",
    icon: Recycle,
    bullets: [
      "Built user-friendly interfaces for the M-Core waste management platform using JavaScript, React.js, Node.js, Express.js, and MongoDB, reducing navigation issues by 70%.",
      "Integrated real-time metal pricing APIs and optimized backend workflows, improving pricing accuracy and reducing response time by 30%.",
    ],
  },
  {
    kind: "work",
    org: "INDOLIKE",
    role: "Web Developer Intern",
    period: "Jan 2025 – Feb 2025",
    location: "Remote",
    icon: Globe,
    bullets: [
      "Designed and maintained responsive web pages using JavaScript and React.js, improving the user experience.",
      "Refined website load times by optimizing CSS and JavaScript, resulting in a 20% improvement in page speed.",
    ],
  },
  {
    kind: "edu",
    org: "Indian Institute of Information Technology Senapati, Manipur",
    role: "B.Tech, Computer Science",
    period: "July 2022 – May 2026",
    location: "Senapati, Manipur, India",
    icon: GraduationCap,
    bullets: ["CGPA: 7.85",
       "Languages: Java, C, C++, Python, JavaScript, TypeScript, SQL",
       "Core CS Fundamentals: Data Structures, Algorithms, OOPs, DBMS, OS, CN, Systems Design, Generative AI",
       "Tools & Platforms: Git, GitHub, Claude, Cursor, VS Code, Linux, AWS, Docker, Render, Postman, MCP",
        "Web Development: React.js, Node.js, Express.js, Next.js, Tailwind CSS, MongoDB, MySQL, PostgreSQL",


    ],
  },
];
