# Nitin Kumar — Personal Portfolio & COA Lab

![Nitin Kumar Portfolio](public/assets/profile.jpg)

> A modern developer portfolio and interactive **Computer Organization & Architecture (COA) Lab** for **Nitin Kumar**, a B.E. Computer Science and Engineering (Artificial Intelligence) student at **Chandigarh University × Microsoft Bytexl**.

🌐 **Live Deployed Portfolio**: [https://falak-portfolio-eight.vercel.app/](https://falak-portfolio-eight.vercel.app/)  
📦 **GitHub Repository**: [https://github.com/nitin0008092/nitin-kumar-portfolio](https://github.com/nitin0008092/nitin-kumar-portfolio)  
🔗 **LinkedIn**: [https://www.linkedin.com/in/nitin-kumar-11630336a/](https://www.linkedin.com/in/nitin-kumar-11630336a/)  
💻 **GitHub Profile**: [https://github.com/nitin0008092](https://github.com/nitin0008092)  

---

## 🎨 Visual Design System

- **Palette**: **Obsidian Graphite** (`#0A0C10`), **Electric Violet** (`#8B5CF6`), and **Soft Cyan** (`#06B6D4`).
- **Typography**: Editorial headings paired with modern sans-serif (`Plus Jakarta Sans`) and code typography (`JetBrains Mono`).
- **Interactive Light & Dark Theme**: Toggle button (🌙 / ☀️) in the navigation bar with `localStorage` persistence.
- **Responsive Layout**: Designed for mobile, tablet, and widescreen desktop displays.

---

## 🌟 Key Features & Sections

### 1. Interactive COA Lab
- **Instruction Set Simulator (ISS)**:
  - Parses arithmetic expressions using Dijkstra's **Shunting-Yard algorithm**.
  - Generates equivalent assembly code across **3-Address (3AC)**, **2-Address (2AC)**, **1-Address (1AC)**, and **0-Address (0AC)** formats.
  - Side-by-side architecture comparison, instruction count analysis, and 1-click code copying.
  - Repository: [nitin0008092/coa-project](https://github.com/nitin0008092/coa-project)
- **Number System Converter**:
  - Full conversion across **Binary (Base 2)**, **Octal (Base 8)**, **Decimal (Base 10)**, and **Hexadecimal (Base 16)**.
  - Supports both **integers** and **fractional values** (e.g., `10.625` ↔ `1010.101`).
  - Step-by-step mathematical breakdown.

### 2. Personal Assets & Resume Integration
- **Profile Portrait**: Integrated into the Hero and About sections with a gradient portrait frame.
- **Resume Downloads**:
  - 📥 **PDF Format**: [`Nitin_Kumar_Resume.pdf`](public/assets/Nitin_Kumar_Resume.pdf)
  - 📝 **Word Document (.docx)**: [`Nitin_Kumar_Resume.docx`](public/assets/Nitin_Kumar_Resume.docx)
  - 👁 **Interactive Web CV**: Comprehensive experience, coursework, projects, and skills summary.
- **Verified Microsoft Certifications**:
  - **Microsoft Certified: Azure AI Fundamentals (AI-900)** — Code `4vJU-XMpE`, Issued April 28, 2026.
  - **Microsoft Certified: Azure Fundamentals (AZ-900)** — Code `LdKX-sF7K`, Issued November 19, 2025.
  - Direct Certiport verification links and certificate image previews.

### 3. Featured Projects
1. **Instruction Set Simulator (ISS)** — C++17, React, JavaScript, Computer Organization & Architecture.
2. **vulnEye – Website Vulnerability Scanner** — Client-side scanner testing against OWASP Top 10 vulnerabilities with exportable JSON/CSV reports.
3. **Bank Management System** — Console-based core banking application in C with persistent file storage and structured error handling.
4. **RAG PDF Chatbot** — Retrieval-Augmented Generation for intelligent PDF document querying using modern LLM pipelines.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/nitin0008092/nitin-kumar-portfolio.git
cd nitin-kumar-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at `http://localhost:3000/`.

---

## 🧪 Running Automated Tests

Run the test suite verifying both the ISS engine and the Number System converter:

```bash
npm test
```

---

## 📦 Production Build

```bash
npm run build
```

Production static bundle will be built in the `dist/` directory.

Preview production build:
```bash
npm run preview
```

---

## 📁 Directory Structure

```text
portfolio/
├── public/
│   └── assets/
│       ├── Nitin_Kumar_Resume.docx # Official Word Resume
│       ├── Nitin_Kumar_Resume.pdf  # Official PDF Resume
│       ├── profile.jpg             # Profile portrait
│       ├── cert-ai900.png          # AI-900 certificate
│       └── cert-az900.png          # AZ-900 certificate
├── src/
│   ├── components/                 # Navbar, Footer, ProjectCard, Toast, SectionHeader
│   ├── data/                       # profile, projects, skills, education, certifications
│   ├── lib/                        # issEngine.js, numberConverter.js
│   ├── pages/                      # Home, About, Projects, CoaLab, Skills, Education, Certs, Resume, Contact
│   ├── styles/                     # main.css, components.css
│   ├── main.js                     # App bootstrap
│   └── router.js                   # Client-side hash routing
├── tests/                          # Automated tests for COA tools
├── package.json
└── vite.config.js
```

---

## 📄 License

Created by **Nitin Kumar** (2026). All rights reserved.
