

"use client";
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";
import { motion } from "framer-motion";
import { Sparkles, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function HeroSection() {
  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary))"
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 relative z-10 w-full text-center max-w-7xl mx-auto mt-44 md:mt-44"
      >
        <Card className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 mb-8 bg-secondary/50 backdrop-blur-md border-muted">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Life Guidance</span>
        </Card>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-4xl md:text-7xl font-bold"
        >
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Explore your life&#39;s patterns
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
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
              className="group bg-primary text-primary-foreground border-primary/10"
            >
              <span className="flex items-center gap-2">
                <Brain className="w-5 h-5 group-hover:text-primary-foreground/90 transition-colors" />
                Start Your Journey
              </span>
            </Button>
          </Link>

          <Link href="/about">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Learn more →
            </Button>
          </Link>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          {["Personal Growth", "Career Guidance", "Relationship Insights"].map((feature, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-4 py-1.5 rounded-full text-sm bg-secondary/50 text-secondary-foreground"
            >
              {feature}
            </Badge>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;