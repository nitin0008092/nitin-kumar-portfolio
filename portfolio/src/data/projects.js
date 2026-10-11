export const projectsData = [
  {
    id: "instruction-set-simulator",
    title: "Instruction Set Simulator (ISS)",
    tagline: "COA CPU Architecture Simulation & Assembly Code Generator",
    description: "Built a full-stack simulator converting arithmetic expressions into Three-, Two-, One-, and Zero-Address CPU instruction formats. Implemented a Shunting-Yard based infix-to-postfix engine with real-time syntax validation, standalone C++17 CLI backend, and instruction-count comparison.",
    category: "Computer Architecture",
    technologies: ["C++17", "React", "JavaScript", "Computer Organization & Architecture", "Shunting-Yard"],
    repository: "https://github.com/nitin0008092/coa-project",
    featured: true,
    isLabTool: true,
    labRoute: "/coa-lab/instruction-set-simulator",
    status: "Completed / Live Tool"
  },
  {
    id: "vulneye",
    title: "vulnEye – Website Vulnerability Scanner",
    tagline: "Client-side OWASP Top 10 Web Vulnerability Scanner",
    description: "Built a client-side web vulnerability scanner testing against OWASP Top 10 vulnerability categories. Categorized findings by severity (Critical to Low) with exportable JSON and CSV reports, designed with a responsive, accessible interface with real-time scan progress tracking.",
    category: "Cybersecurity & Web",
    technologies: ["HTML5", "CSS3", "JavaScript", "OWASP Top 10", "Web Security"],
    repository: "https://github.com/nitin0008092",
    featured: true,
    isLabTool: false,
    status: "Completed"
  },
  {
    id: "bank-management-system",
    title: "Bank Management System",
    tagline: "Console-Based Core Banking Application with Persistent File Storage",
    description: "Developed a console-based banking application in C implementing core account operations – create, deposit, withdraw, and transfer. Applied file handling for persistent data storage without an external database, with structured error handling and robust input validation.",
    category: "Systems & DSA",
    technologies: ["C", "File I/O", "Structured Programming", "Data Structures", "Algorithms"],
    repository: "https://github.com/nitin0008092",
    featured: true,
    isLabTool: false,
    status: "Completed"
  },
  {
    id: "rag-pdf-chatbot",
    title: "RAG PDF Chatbot",
    tagline: "Retrieval-Augmented Generation for Document Intelligence",
    description: "An AI-powered document query system utilizing Retrieval-Augmented Generation (RAG) to process, index, and answer queries accurately from uploaded PDF documents using modern LLM pipelines.",
    category: "Artificial Intelligence",
    technologies: ["Python", "AI/ML", "RAG", "LLM", "Prompt Engineering"],
    repository: "https://github.com/nitin0008092",
    featured: true,
    isLabTool: false,
    status: "In Development"
  }
];
