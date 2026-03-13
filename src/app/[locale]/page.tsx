import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { ProjectsTimeline } from "@/components/sections/projects-timeline";
import { BlogCarousel } from "@/components/sections/blog-carousel";
import { ContactWizard } from "@/components/sections/contact-wizard";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";
import { LoadingScreen } from "@/components/layout/loading-screen";

export default function HomePage() {
    return (
        <>
            <LoadingScreen />
            <div className="relative">
                <section id="hero">
                    <HeroSection />
                </section>

                <RetroDivider />

                <section id="services">
                    <ServicesSection />
                </section>

                <RetroDivider />

                <section id="projects">
                    <ProjectsTimeline />
                </section>

                <RetroDivider />

                <section id="blog">
                    <BlogCarousel />
                </section>

                <RetroDivider />

                <section id="contact">
                    <ContactWizard />
                </section>

                <RetroDivider />

                <Footer />
            </div>
        </>
    );
}
