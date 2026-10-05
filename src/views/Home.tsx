'use client';

import Glitch from "../modules/profile/components/GlitchPresentation";
import CircleProfile from "../shared/components/CircleProfile";
import Footer from "../core/components/footer/Footer";
import { GithubActivity } from "../modules/profile/components/GithubActivity";
import { HeroCTA } from "../shared/components/HeroCTA";
import { useHeroContent } from "../modules/profile/hooks/useHeroContent";
import { SkillSection } from "../modules/projects/components/InformationContent";
import { CertificatesSection } from "../modules/projects/components/CertificatesSection";
import { FeaturedProjects } from "../modules/projects/components/FeaturedProjects";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
    const { hero } = useHeroContent();
    const infoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (infoRef.current) {
            gsap.fromTo(
                infoRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14 lg:space-y-16 mt-16 sm:mt-20">
            <section className="text-center space-y-4 sm:space-y-10 md:space-y-8 w-full max-w-md sm:max-w-lg md:max-w-2xl">
                <CircleProfile
                    src={hero.profile_image_url}
                    alt={hero.title}
                    size="xl"
                    ring={false}
                    fallbackSrc="/profile.jpeg"
                />
                <Glitch title={hero.title} subtitle={hero.subtitle} />
                <HeroCTA />
            </section>
            <GithubActivity username="Will855" />

            <section
                ref={infoRef}
                className="mx-auto w-full max-w-4xl opacity-0"
            >
                <div className="p-6 sm:p-8 lg:p-10 text-slate-50 flex flex-col gap-8 sm:gap-12 bg-slate-900/75 border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300">
                    <SkillSection />
                </div>
            </section>

            <CertificatesSection />

            <FeaturedProjects />
            
            <Footer />
        </div>
    );
};

export default Home;
