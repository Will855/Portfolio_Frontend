import Glitch from "./../components/animations/glitchPresentation"
import MagneticBtn from "./../components/buttons/magneticBtn"

export const Home = () => {
    return (
        <>
            <div className="min-h-screen p-4 grid md:grid-rows-[50%_auto]  gap-16">
                <div className="mx-auto self-end">
                    <Glitch title="Hi I'm Wilmer" subtitle="Web Developer"/>
                </div>
                <div className="mx-auto self-start">
                    <MagneticBtn iconName="cube-outline" subtitle="Informacion"/>
                </div>
            </div>
        </>
    )
}