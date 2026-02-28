import Glitch from "../components/animations/glitchPresentation";
import CircleProfile from "../components/CircleProfile";
import Footer from "../components/footer/footer";
import WordCloud from "../components/animations/WordCloud";
import { useHeroContent } from "../hooks/useHeroContent";

const Home = () => {
    const { hero } = useHeroContent();
    return (
        <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14 lg:space-y-16 mt-16 sm:mt-20">
            <section className="text-center space-y-4 sm:space-y-10 md:space-y-8 w-full max-w-md sm:max-w-lg md:max-w-2xl">
                <CircleProfile
                    src={hero.profile_image_url}
                    alt={hero.title}
                    size="xl"
                    ring={false}
                />
                <Glitch title={hero.title} subtitle={hero.subtitle} />
            </section>
            <WordCloud />
            <Footer />
        </div>
    );
};

export default Home;