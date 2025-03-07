'use client';
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const instructors = [
  {
    id: 1,
    name: 'Dr. Anil Vasoya',
    designation: 'Associate Professor',
    image: '/assets/anilsm.jpg'
  },
  {
    id: 2,
    name: 'Chetan Kaul',
    designation: 'AI Engineer',
    image: '/assets/cs.jpg'
  },
  {
    id: 3,
    name: 'Deepak Bagati',
    designation: 'Software Developer',
    image: '/assets/ds.jpg',
  },
  {
    id: 4,
    name: 'Arvind Gupta',
    designation: 'Software Developer',
    image: '/assets/arvs.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function Instructors() {
  return (
    <div className="relative h-[80vh] overflow-hidden flex items-center justify-center">
      <WavyBackground 
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full"
        containerClassName="bg-zinc-900"
        blur={10}
        speed="slow"
        opacity={0.5}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full px-4"
        >
          {/* Decorative badge */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-8 inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full border border-zinc-700/50 bg-zinc-800/50 backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-zinc-300">Expert Team</span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-6"
          >
            Meet the Creators
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-zinc-300 text-center mb-12 max-w-2xl mx-auto"
          >
            Meet our talented professionals who are passionate about using AI to transform lives and provide meaningful guidance on your journey.
          </motion.p>

          {/* Team members */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center mb-10 w-full"
          >
            <AnimatedTooltip items={instructors} />
          </motion.div>

          {/* Additional info badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {['AI Experts', 'Software Engineers', 'Academic Excellence'].map((tag, index) => (
              <div
                key={index}
                className="px-4 py-1.5 rounded-full text-sm border border-zinc-800 bg-zinc-900/50 text-zinc-400"
              >
                {tag}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </WavyBackground>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent pointer-events-none" />
    </div>
  );
}

export default Instructors;