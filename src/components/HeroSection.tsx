"use client";
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";
import { motion } from "framer-motion";
import { Sparkles, Brain } from "lucide-react";

function HeroSection() {
  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 w-full h-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2] bg-[size:50px_50px]" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 relative z-10 w-full text-center max-w-7xl mx-auto mt-44 md:mt-44" // Adjusted top margin
      >
        <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 mb-8 border border-zinc-800 rounded-full bg-zinc-900/50 backdrop-blur-md">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-zinc-300">AI-Powered Life Guidance</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-4xl md:text-7xl font-bold"
        >
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            Explore your life&#39;s patterns
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-base md:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed"
        >
          Life is a journey of ever-changing experiences. Our AI partner helps you
          navigate the unique patterns of your life, offering personalized insights
          and support in relationships, career, and personal growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link href="/chat">
            <Button
              borderRadius="1.75rem"
              className="group bg-white dark:bg-zinc-900 text-black dark:text-white border-neutral-200 dark:border-zinc-800"
            >
              <span className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
                Start Your Journey
              </span>
            </Button>
          </Link>

          <Link href="/about">
            <button className="text-zinc-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-zinc-900/50">
              Learn more →
            </button>
          </Link>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-4" // Adjusted margin-top
        >
          {["Personal Growth", "Career Guidance", "Relationship Insights"].map((feature, index) => (
            <div
              key={index}
              className="px-4 py-1.5 rounded-full text-sm border border-zinc-800 bg-zinc-900/50 text-zinc-400"
            >
              {feature}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;