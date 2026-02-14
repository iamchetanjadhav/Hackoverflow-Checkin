<div align="center">

# 🚀 HackOverflow 4.0 – Official Website

### A Next.js powered hackathon website with stunning animations and modern design

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Educational_Use-green?style=for-the-badge)](LICENSE)

**🌐 [Visit Live Website](https://hackoverflow4.tech/)** • [Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation)

</div>

---

## 📖 About

**HackOverflow 4.0** is a national-level hackathon organized by **PHCET**. This repository contains the official event website built with cutting-edge web technologies.

🌐 **Live Site:** [https://hackoverflow4.tech/](https://hackoverflow4.tech/)

### Highlights:

- 🎨 Stunning gradient backgrounds and glow effects
- ⚡ Buttery-smooth animations powered by Framer Motion
- 📱 Fully responsive design (mobile-first approach)
- 🎯 Type-safe codebase with TypeScript
- ⚙️ Optimized performance with Next.js App Router
- 🎭 Interactive components with modern UI patterns

---

## ✨ Features

### 🎨 Design & UI
- **Custom Theme Animations** – Pulsing glow effects, shimmer animations, and floating elements
- **Gradient Overlays** – Multi-layered background effects with opacity controls
- **Countdown Timer** – Real-time event countdown with styled number displays
- **Mobile-Optimized** – Responsive breakpoints at 768px and 480px
- **Typography** – Google Fonts integration (Poppins family)

### 🧩 Components
- `Hero` – Landing section with dynamic visuals
- `Navbar` – Sticky navigation with smooth scrolling
- `About` – Event information and mission
- `Theme` – Hackathon themes with countdown
- `Schedule` – Event timeline and agenda
- `FAQ` – Collapsible question/answer sections
- `Gallery` – Image showcase grid
- `Sponsor` – Partner and sponsor logos
- `Statistics` – Live participant/project stats
- `Teams` – Organizer and team member profiles
- `Footer` – Contact info and social links

### 🛠️ Technical Highlights
- **App Router** – Next.js 14+ server/client components
- **Framer Motion** – Page transitions and micro-interactions
- **Lucide Icons** – Lightweight SVG icon library
- **PostCSS** – Advanced CSS processing
- **ESLint** – Code quality enforcement

---

## 🧱 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript 5.0+ |
| **Styling** | Tailwind CSS 3.0, PostCSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Font** | Google Fonts (Poppins) |
| **Tooling** | ESLint, npm/pnpm |

---

## 🚀 Installation

### Prerequisites
- **Node.js** 18 or higher
- **npm**, **yarn**, or **pnpm**

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-org/HackOverflow-Website.git
cd HackOverflow-Website

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Run development server
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📂 Project Structure

```
HackOverflow-Website/
├── .next/                    # Build output (auto-generated)
├── node_modules/             # Dependencies
├── public/                   # Static assets (images, videos)
├── src/
│   ├── app/
│   │   ├── favicon.ico       # Site favicon
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout wrapper
│   │   └── page.tsx          # Homepage
│   └── components/
│       ├── About.tsx         # About section
│       ├── FAQ.tsx           # Frequently asked questions
│       ├── Footer.tsx        # Site footer
│       ├── Gallery.tsx       # Image gallery
│       ├── Gridscan.tsx      # Grid animation effect
│       ├── Hero.tsx          # Hero/landing section
│       ├── KeyDates.tsx      # Important dates timeline
│       ├── Navbar.tsx        # Navigation bar
│       ├── Overview.tsx      # Event overview
│       ├── Schedule.tsx      # Event schedule
│       ├── SectionHeader.tsx # Reusable section headers
│       ├── Special.tsx       # Special announcements
│       ├── Sponsor.tsx       # Sponsor showcase
│       ├── Statistics.tsx    # Live statistics
│       ├── Teams.tsx         # Team members
│       └── Theme.tsx         # Hackathon themes
├── .gitignore
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── README.md                 # This file
└── tsconfig.json             # TypeScript configuration
```

---

## 🎨 Color Palette

The website uses a carefully crafted color scheme:

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary Orange** | `#E85D24` | Accent, CTAs, glow effects |
| **Primary Gold** | `#FCB216` | Highlights, borders, gradients |
| **Primary Purple** | `#63205F` | Background glows, secondary accent |
| **Background Dark** | `#0F0F0F` | Main background |
| **Text White** | `#FFFFFF` | Primary text |
| **Text Muted** | `rgba(255, 255, 255, 0.5)` | Secondary text |

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Key Configuration Files

- **`next.config.ts`** – Next.js configuration
- **`tailwind.config.js`** – Tailwind CSS customization
- **`tsconfig.json`** – TypeScript compiler options
- **`eslint.config.mjs`** – Code style rules

---

## 🏗️ Build & Deployment

```bash
# Production build
npm run build

# The build generates static files in .next/
# Deploy to Vercel, Netlify, or any Node.js hosting
npm start
```

### Deployment Platforms
- **Vercel** (recommended) – Zero-config deployment
- **Netlify** – Automated builds from Git
- **AWS / DigitalOcean** – Custom server deployment

---

## 📋 Best Practices

This project follows industry-standard best practices:

✅ **Component-Driven Architecture** – Modular, reusable components  
✅ **Type Safety** – Full TypeScript coverage  
✅ **Performance Optimization** – Next.js Image optimization, code splitting  
✅ **Accessibility** – Semantic HTML, ARIA labels  
✅ **SEO-Friendly** – Meta tags, OpenGraph support  
✅ **Clean Code** – ESLint enforcement, consistent formatting  
✅ **Version Control** – Git with meaningful commits  

---

## 🎯 Key Features Breakdown

### Theme Section (`Theme.tsx`)
The theme section showcases hackathon tracks with:
- Announcement box with shimmer animation
- Floating icon with pulse rings
- Countdown timer (days, hours, minutes, seconds)
- Participant note with custom styling

**Key CSS Classes:**
- `.themes-section` – Main container with dark background
- `.glow-bg-themes` – Animated background glow effects
- `.announcement-box` – Content card with border and fade-in
- `.countdown-container` – Flexbox layout for timer
- `.notify-button` – Interactive CTA button

### Animation System
- **Fade In Up** – Elements slide up with opacity transition
- **Pulse Glow** – Background elements expand/contract
- **Float** – Smooth vertical movement
- **Shimmer** – Horizontal light sweep effect
- **Pulse Ring** – Expanding border rings

---

## 🔒 Security & Performance

- ✅ No hardcoded secrets or API keys
- ✅ Environment variables for sensitive data
- ✅ Image optimization with Next.js `<Image>` component
- ✅ Code splitting for faster initial loads
- ✅ CSP headers for XSS protection
- ✅ HTTPS enforcement in production

---

## 📚 Documentation

### Component API
Each component is self-contained with clear prop interfaces. Example:

```typescript
// Theme.tsx
export default function Theme() {
  // Countdown logic
  // Animation triggers
  // Responsive breakpoints
}
```

### Styling Guidelines
- Use Tailwind utility classes for consistency
- Custom CSS in `globals.css` for global styles
- Component-scoped styles use CSS modules or styled-jsx
- Mobile-first responsive design (min-width breakpoints)

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing patterns and conventions
- Run `npm run lint` before committing
- Write meaningful commit messages
- Test on multiple screen sizes

---

## 📬 Contact & Support

**HackOverflow 4.0 Organizing Team**

📧 Email: [hackoverflow@mes.ac.in](mailto:hackoverflow@mes.ac.in)  
🌐 Website: [https://hackoverflow4.tech/](https://hackoverflow4.tech/)  
💬 Discord: [Join our community](https://discord.gg/Pha3qubw)  
📷 Instagram: [@hackoverflow.tech](https://www.instagram.com/hackoverflow.tech)  

For technical issues or feature requests, please open an issue on GitHub.

---

## 📄 License

**© 2026 HackOverflow 4.0 – HackOverflow Organizing Committee**

This project is open source for educational and non-commercial use.

### ✅ Permitted Use
- Personal learning and experimentation
- Academic use by students and educational institutions
- Portfolio and skill-development projects
- Non-commercial forks with attribution

### ❌ Restricted Use
- Commercial deployment or monetization
- Enterprise or organizational use without permission
- Redistribution as part of paid products or services
- White-labeling or resale

### 🏢 Commercial & Enterprise Use
Organizations and companies must obtain written permission before commercial use.

📧 Permission requests: [hackoverflow@mes.ac.in](mailto:hackoverflow@mes.ac.in)

---

## 🙏 Acknowledgments

- **Next.js Team** – For the incredible React framework
- **Tailwind Labs** – For the utility-first CSS framework
- **Framer** – For the animation library
- **[react-bits](https://github.com/DavidHDev/react-bits)** – Gridscan background component (camera features removed)
- **PHCET** – For hosting and organizing HackOverflow 4.0
- **Parth Bhoir** – System engineering and server configuration (hosted on home server)
- **Nirav Thakur** – Design and frontend UI development
- **Chetan Jadhav** – Stable build creation and maintenance
- **All Contributors** – For their time and expertise

---

<div align="center">

### Built by the HackOverflow Team

**[⬆ Back to Top](#-hackoverflow-40--official-website)**

</div>