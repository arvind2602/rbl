'use client'
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { motion } from "framer-motion";

const testimonials = [
    {
      quote:
        'As a final year engineering student, I was confused about my career path. The AI counselor helped me understand my strengths and guided me towards data science. Now I\'m working at a top tech company in Bangalore.',
      name: 'Priya Sharma',
      title: 'Software Engineer, Bangalore'
    },
    {
      quote:
        "Coming from a tier-2 city, I had many doubts about my career choices. This platform provided personalized guidance that helped me prepare for interviews and improve my soft skills. It's been a game-changer!",
      name: 'Rahul Patel',
      title: 'Product Manager, Mumbai'
    },
    {
      quote:
        "The AI counselor helped me navigate through my career transition from teaching to UX design. The personalized roadmap and emotional support were invaluable during this challenging phase.",
      name: 'Anjali Deshmukh',
      title: 'UX Designer, Pune'
    },
    {
      quote:
        'Being the first in my family to enter the tech industry was overwhelming. The platform helped me overcome imposter syndrome and build confidence. Now I\'m mentoring others like me.',
      name: 'Suresh Kumar',
      title: 'Tech Lead, Hyderabad'
    },
    {
      quote:
        'The relationship counseling module helped me understand my partner better. The AI provided unbiased perspectives and practical communication strategies that really improved our relationship.',
      name: 'Neha Verma',
      title: 'HR Professional, Delhi'
    },
    {
      quote:
        'Starting up was emotionally challenging. The AI counselor helped me maintain work-life balance and manage stress effectively. Its 24/7 availability was particularly helpful during crucial times.',
      name: 'Arjun Reddy',
      title: 'Startup Founder, Chennai'
    },
    {
      quote:
        'The career transition guidance was exceptional. From banking to data analytics, the AI counselor provided a structured learning path and helped me stay motivated throughout the journey.',
      name: 'Meera Rajesh',
      title: 'Data Analyst, Kolkata'
    }
];

function TestimonialsSection() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 mb-8 rounded-full border border-zinc-700/50 bg-zinc-800/50 backdrop-blur-md">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-sm text-zinc-300">Real Success Stories</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
          Transforming Lives Across India
        </h2>
        
        {/* Subheading */}
        <p className="text-zinc-400 text-center mb-8 max-w-2xl">
          Discover how our AI counseling platform is helping individuals across the country achieve personal and professional growth.
        </p>

        {/* Testimonials carousel */}
        <div className="flex justify-center w-full overflow-hidden">
          <div className="w-full max-w-6xl">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
        
        {/* Trust indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {[
            '1000+ Success Stories',
            'Pan-India Impact',
            '24/7 Support',
            'Personalized Guidance'
          ].map((tag, index) => (
            <div
              key={index}
              className="px-4 py-1.5 rounded-full text-sm border border-zinc-800 bg-zinc-900/50 text-zinc-400"
            >
              {tag}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TestimonialsSection;