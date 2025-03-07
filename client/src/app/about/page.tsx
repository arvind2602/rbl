"use client";
import React from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import TeamMemberCard from "@/components/TeamCard";

const teamMembers = [
  {
    name: "Arvind Gupta",
    role: "Software Developer",
    imageUrl: "/assets/arvind.jpg",
    Xurl: "",
    instagramUrl: "https://www.instagram.com/arvind_gupta__",
    linkedinUrl: "https://www.linkedin.com/in/arvind-gupta-/",
  },
  {
    name: "Deepak Bagati",
    role: "Software Developer",
    Xurl: "https://twitter.com/BagatiDeepak",
    imageUrl: "/assets/deepak.jpg",
    instagramUrl: "https://www.instagram.com/deepakbagati_27/",
    linkedinUrl: "https://www.linkedin.com/in/deepakbagati/",
  },
  {
    name: "Chetan Kaul",
    role: "AI Engineer",
    imageUrl: "/assets/chetan.jpg",
    Xurl: "https://twitter.com/ChetanKaul2",
    instagramUrl: "https://www.instagram.com/chetan_kaul/",
    linkedinUrl: "https://www.linkedin.com/in/chetan-kaul-35a681143/",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-32">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Why Lumina Section */}
        <section className="mb-32">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 bg-clip-text text-transparent mb-8">
              Why WisdomAI?
            </h2>
            <p className="text-xl leading-relaxed text-gray-300">
            WISDOM AI is an innovative, AI-powered counseling platform that leverages student data from ERP systems to provide personalized guidance and answers. Our intelligent assistant helps students navigate academic challenges, explore career paths, and access resources, all tailored to their unique needs. With WISDOM AI, students gain instant support, empowering them to make informed decisions and enhance their educational experience. Join us in redefining student success through smart, data-driven insights!
            </p>
          </div>
        </section>

        {/* Leader Profile Section */}
        <section className="mb-32">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative h-[600px] w-full">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="/assets/anilbg.png"
                  alt="Dr. Anil Vasoya"
                  layout="fill"
                  objectFit="cover"
                  className="transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="space-y-2">
                <span className="text-purple-400 text-sm uppercase tracking-wider">
                  Associate Professor
                </span>
                <h3 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Dr. Anil Vasoya
                </h3>
              </div>
              <blockquote className="text-lg text-gray-300 italic border-l-4 border-purple-500 pl-4">
                As an educator for more than 15 years, I have witnessed the transformative
                power of guidance and support. Lumina was born from a desire to make
                these resources more accessible to everyone. Witnessing the dedication
                and creativity of my students, including the brilliant minds behind this
                platform, has been incredibly rewarding. Together, we are building a
                future where AI empowers individuals to reach their full potential.
              </blockquote>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.name}
                {...member}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;