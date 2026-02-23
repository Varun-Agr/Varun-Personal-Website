import AboutMe from "./components/home/about-me"
import Contact from "./components/home/contact"
import EducationSkills from "./components/home/education-skills"
import ExperienceSec from "./components/home/experience-sec"
import HeroSection from "./components/home/hero-section"
import ContactBar from "./components/home/hero-section/contact-bar"
import HiringForm from "./components/home/hiring-form"
import LatestWork from "./components/home/latest-work"

const page = () => {
  return (
    <>
      <main>
        <HeroSection />
        <ContactBar />
        <HiringForm />
        <LatestWork />
        {/* <AboutMe /> */}
        <ExperienceSec />
        {/* <EducationSkills /> */}
        <Contact />
      </main>
    </>
  )
}

export default page