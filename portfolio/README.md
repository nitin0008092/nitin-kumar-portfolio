# Nitin Kumar — Premium Developer Portfolio & COA Lab

Production-quality personal digital identity and interactive Computer Organization & Architecture (COA) demonstration platform built for **Nitin Kumar**, a B.E. Computer Science and Engineering (AI) student at Chandigarh University.

---

## 🌟 Key Features & Highlights

- 🎨 **Refined Dark Technical Aesthetic**: Custom editorial palette (`#0B0D10` background, `#12161C` surface, `#7AA2FF` accent) with typography hierarchy using `Inter` and `Fira Code`.
- ⚙️ **COA Lab Tool #1 — Instruction Set Simulator**:
  - Validates arithmetic expressions in real time.
  - Implements Dijkstra's **Shunting-Yard Algorithm** for infix-to-postfix conversion.
  - Generates assembly code sequences for **3-Address Code (3AC)**, **2-Address Code (2AC)**, **1-Address Code (1AC)**, and **0-Address Code (0AC)**.
  - Displays instruction counts and provides 1-click code copying.
  - Contextual link to the official repository [coa-project](https://github.com/nitin0008092/coa-project).
- 🔢 **COA Lab Tool #2 — Number System Converter**:
  - Full conversion engine for **Binary (2)**, **Octal (8)**, **Decimal (10)**, and **Hexadecimal (16)**.
  - Supports **Integers** (with `BigInt` precision) and **Fractional numbers** (e.g., `10.625`, `1010.101`).
  - Optional step-by-step mathematical breakdown panel.
  - Swap bases, copy result, and error validation for illegal radix digits.
- 📱 **Fully Responsive & Accessible**: Semantic HTML5, visible keyboard focus rings, `prefers-reduced-motion` queries, mobile drawer navigation.
- 🔒 **Non-Fabrication Policy Compliant**: Strict adherence to supplied credentials (Chandigarh University B.E. CSE (AI) 2025–2029, CGPA 8.0, AI-900 & AZ-900 certifications, exact LinkedIn URL `https://www.linkedin.com/in/nitin-kumar-11630336a/`). Honest empty states for unsupplied assets.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+) & npm

### Step 1: Install Dependencies
```bash
cd "/Users/nitinmishra/coa project/portfolio"
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```
Open your browser at: 👉 `http://localhost:3000`

---

## 🧪 Running Automated Tests

Run the unit test suite verifying both COA logic engines:

```bash
npm test
```

Test output:
- `tests/issEngine.test.js`: Verifies validation rules, infix-to-postfix conversion, 3AC/2AC/1AC/0AC code generation, and instruction counts.
- `tests/numberConverter.test.js`: Verifies integer and fractional base conversions across all 12 base pairs, negative numbers, invalid input rejection, and step generation.

---

## 📦 Building for Production

Compile optimized static production assets:

```bash
npm run build
```

Production output will be generated in `dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Directory Structure

```text
portfolio/
├── index.html                  # HTML5 entry point with SEO & OpenGraph tags
├── package.json                # npm configuration & scripts
├── vite.config.js              # Vite build setup
├── README.md                   # Setup & documentation
├── tests/
│   ├── issEngine.test.js       # ISS unit tests
│   ├── numberConverter.test.js # Converter unit tests
│   └── runTests.js             # Test runner script
└── src/
    ├── main.js                 # Application entry point
    ├── router.js               # Client-side SPA router
    ├── data/
    │   ├── profile.js          # Verified profile info, bio, contact details
    │   ├── projects.js         # Projects data (vulnEye, RAG Chatbot, ISS)
    │   ├── skills.js           # Confirmed & supplied technical skills
    │   ├── education.js        # Chandigarh University degree & CGPA 8.0
    │   ├── certifications.js   # AI-900 & AZ-900 certifications
    │   └── navigation.js       # Route navigation configuration
    ├── lib/
    │   ├── issEngine.js        # Instruction set simulator engine
    │   └── numberConverter.js  # Number system converter engine
    ├── styles/
    │   ├── main.css            # Dark technical tokens & global styles
    │   └── components.css      # Component styles & monospace blocks
    ├── components/
    │   ├── Navbar.js           # Responsive header navbar
    │   ├── Footer.js           # Footer with social links & dynamic year
    │   ├── ProjectCard.js      # Project showcase card
    │   ├── Toast.js            # User notification toast
    │   └── SectionHeader.js    # Editorial section header
    └── pages/
        ├── Home.js             # Hero & highlights
        ├── About.js            # Editorial background
        ├── Projects.js         # Projects archive
        ├── CoaLab.js           # COA Lab Hub landing page
        ├── IssPage.js          # ISS Interactive tool
        ├── ConverterPage.js   # Number Converter Interactive tool
        ├── Skills.js           # Skills matrix
        ├── Education.js        # Academic timeline
        ├── Certifications.js   # Certifications
        ├── EmptyStatePage.js   # Honest empty states (Resume, Gallery, Achievements)
        └── Contact.js          # Direct mailto contact form & social links
```

---

## ✏️ How to Add Missing Assets Later

1. **Resume PDF**:
   - Place your resume PDF in the `public/` directory (e.g. `public/resume.pdf`).
   - Open `src/data/profile.js` and set `profileData.assets.resumeUrl = '/resume.pdf'`.

2. **Profile / Gallery Photos**:
   - Place image files in `public/` or `src/assets/`.
   - Update `profileData.assets.avatar` in `src/data/profile.js`.

3. **Updating Projects or Social Links**:
   - All social links, contact info, and project metadata are centralized in `src/data/`. Simply edit `profile.js` or `projects.js`.
