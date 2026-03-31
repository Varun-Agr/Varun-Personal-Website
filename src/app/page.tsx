import Masthead from "./components/broadsheet/Masthead";
import Hero from "./components/broadsheet/Hero";
import Projects from "./components/broadsheet/Projects";
import ConnectForm from "./components/broadsheet/ConnectForm";
import BroadsheetFooter from "./components/broadsheet/BroadsheetFooter";

const page = () => {
  return (
    <div className="broadsheet">
      <main>
        <Masthead />
        <Hero />
        <Projects />
        <ConnectForm />
      </main>
      <BroadsheetFooter />
    </div>
  );
};

export default page;
