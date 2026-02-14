<div align="center">

# 🚀 HackOverflow 4.0 – Participant Check-in System

### Next-gen QR check-in & digital boarding pass portal for national hackathons

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0+-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)

**🌐 [Visit Check-in Portal](https://hackoverflow4.tech/checkin)** • [Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation)

</div>

## 🚀 Features
- **Rapid QR Check-in**: Scan participant QR codes for instant identity verification.
- **Digital Boarding Pass**: Provides participants with essential event data (WiFi, Room No, Table No) in a premium, glassmorphic UI.
- **Manual Credentials**: Support for manual entry using Participant and Team IDs.
- **Live Event Status**: Real-time check-in and check-out tracking powered by Supabase.
- **Optimized for Mobile**: A sleek, mobile-first design tailored for on-ground event volunteers.

## 🛠️ Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Logic**: Type-safe TypeScript 5.0

## 📂 Project Structure
```text
src/
├── app/
│   ├── api/             # Backend endpoints for QR lookup and check-in
│   ├── manual/         # Main check-in interface
│   ├── participant/     # Digital Boarding Pass portal (renamed from portal)
│   └── qr/              # QR redirection logic
├── components/          # Reusable UI (Boarding Pass)
└── lib/                 # Supabase configuration
```

## � Installation

### 1. Prerequisites
- Node.js 18+
- Supabase account with the required `participants` table.

### 2. Setup
```bash
# Install dependencies
npm install

# Set up environment variables (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Run development server
npm run dev
```

## 📖 Documentation
The system is built as a specialized subdomain for participant check-in. It integrates with Supabase for real-time data management. For detailed database schema and API documentation, refer to the internal technical docs.

---
**© 2026 HackOverflow Organizing Committee**