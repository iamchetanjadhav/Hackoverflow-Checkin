"use client";

import { motion, Variants } from "framer-motion";
import { QrCode, ArrowRight, Smartphone, IdCard, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const steps = [
    {
      icon: <IdCard className="w-6 h-6" />,
      title: "Locate QR Code",
      desc: "Find the QR code on your participant ID card",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Scan with Camera",
      desc: "Open your phone camera and point at the QR code",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Complete Check-in",
      desc: "Confirm your details and you're all set!",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-start px-4 py-12 md:py-20 overflow-hidden relative">
      {/* dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-purple-600/10 rounded-full blur-[100px]" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_70%)] opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center mb-12"
      >
        <div className="relative mb-8 group">
          <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
          <Image
            src="/images/HO 4.0 Logo.svg"
            alt="HackOverflow 4.0 Logo"
            width={120}
            height={120}
            className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_15px_rgba(232,93,36,0.3)]"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent italic">
          HACKOVERFLOW <span className="text-orange-500">4.0</span>
        </h1>

        <div className="px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">Check-in System</span>
        </div>
      </motion.div>

      {/* Main Interactive Card */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-2xl"
      >
        <motion.div
          variants={item}
          className="relative rounded-[2.5rem] bg-[#111111]/80 backdrop-blur-2xl border border-white/5 p-8 md:p-12 overflow-hidden shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px]" />

          <div className="relative flex flex-col items-center text-center mb-12">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-8 shadow-xl shadow-orange-500/20 group hover:scale-110 transition duration-500">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to Check In?</h2>
            <p className="text-lg text-white/40 font-medium">Scan the unique QR on your ID card</p>
            <p className="mt-4 text-sm text-white/30 max-w-sm leading-relaxed">
              Position your camera over the code to automatically load your participant profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 text-white shadow-lg`}>
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold mb-2 text-white/80">{step.title}</h3>
                <p className="text-xs text-white/30 leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex justify-center w-full">
          <Link
            href="/manual"
            className="group relative px-8 py-5 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-orange-500/30 transition-all duration-500 w-full md:w-auto"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col items-start md:items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-orange-500/50 transition-colors">Alternative Method</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white/70 group-hover:text-white transition-colors">Manual Check-in</span>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-auto pt-10 text-white/10 text-[10px] font-bold uppercase tracking-[0.5em]"
      >
        Designed for Excellence
      </motion.div>
    </main>
  );
}
