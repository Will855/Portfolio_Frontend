import React from "react"
import Grid from "../components/cards/components_Grid.tsx"
import Footer from "../components/footer/footer"

export const Proyects = () => {
    return <>
        <div className="h-screen overflow-scroll sm:overflow-auto p-8 pt-32">
            <Grid/>
        </div>
        <Footer/>
    </>
}
