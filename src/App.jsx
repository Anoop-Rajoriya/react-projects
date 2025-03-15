import React, { createContext, useState } from "react";
import { FaReact } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

import RoundedButton from "./components/RoundedButton";

import Todo from "./projectsComponents/Todo";
import ProfileAndTheme from "./projectsComponents/ProfileAndTheme";
import Testimonials from "./projectsComponents/Testimonials";
import Accordions from "./projectsComponents/Accordions";
import Calculator from "./projectsComponents/Calculator";
import FormValidation from "./projectsComponents/FormValidation";
import MealApi from "./projectsComponents/MealApi";
import ProductFiltering from "./projectsComponents/ProductFiltering";

const AppContext = createContext();

const App = () => {
  const [appState, setAppState] = useState({
    isDark: true,
    currentAccent: 1,
    activeProject: null,
  });

  // handle project randering
  const randerProject = () => {
    switch (appState.activeProject) {
      case 1:
        return <Todo />;
      case 2:
        return <Testimonials />;
      case 3:
        return <Accordions />;
      case 4:
        return <FormValidation />;
      case 5:
        return <Calculator />;
      case 6:
        return <MealApi />;
      case 7:
        return <ProductFiltering />;
      default:
        return <ProfileAndTheme />;
    }
  };

  // handle back
  const handleGoBack = () => {
    setAppState((pre) => ({ ...pre, activeProject: null }));
  };

  return (
    <AppContext value={[appState, setAppState]}>
      <div
        className={`${appState.isDark && "dark"} ${
          "accent" + appState.currentAccent
        } min-h-screen bg-primaryBackground text-primaryText flex flex-col items-stretch justify-normal`}
      >
        <header
          className={`border-accent border-b-2 mb-2 p-2 px-3 md:px-4 flex items-center justify-between`}
        >
          <a
            id="logo"
            className={`text-accent text-lg md:text-xl font-bold capitalize inline-flex items-center justify-center gap-2`}
          >
            <FaReact className="size-5 md:size-6" />
            react Projects
          </a>
          {appState.activeProject !== null && (
            <RoundedButton handler={handleGoBack}>
              <IoIosArrowBack className="size-5 md:size-6" />
              <span className="hidden md:inline-block">go back</span>
            </RoundedButton>
          )}
        </header>
        <main
          className={`text-base md:text-lg text-primaryText p-2 px-3 md:px-4 w-full max-w-3xl mx-auto`}
        >
          {randerProject()}
        </main>
      </div>
    </AppContext>
  );
};

export default App;
export { AppContext };
