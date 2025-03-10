'use client';
import React from 'react';
import '../App.css';
import Footer from '../components/footer/footer';
import { motion } from "framer-motion";
import { SkillsSection, ProjectsSection, EducationAndCTASection } from "../components/about/informationContent"

// Componente principal que renderiza el fondo
const Information: React.FC = () => {
  return (
    <motion.section
      className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-4xl"
      initial="hidden"
      animate="visible"
    >
      <motion.div className="p-6 sm:p-8 lg:p-10 text-slate-50 flex flex-col gap-8 sm:gap-12 backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300">
        <SkillsSection />
        <ProjectsSection />
        <EducationAndCTASection />
      </motion.div>
      <Footer />
    </motion.section>
  );
};

export default Information;