import React, { useContext } from "react";
import Profile from "../components/Profile";
import Theme from "../components/Theme";
import TextCard from "../components/TextCard";
import data from "../jsonDB/projectCardsData.json";
import { AppContext } from "../App";

const ProfileAndTheme = () => {
  const [appState, setAppState] = useContext(AppContext);

  // handle project switching state
  const handleTextCardClick = (event) => {
    const id = parseInt(event.currentTarget.id);
    setAppState((pre) => ({ ...pre, activeProject: id }));
  };

  return (
    <>
      <Profile />
      <Theme />
      <section className="py-4 grid md:grid-cols-2 gap-4 justify-center">
        {data.map(({ title, description, id }) => (
          <TextCard
            handler={handleTextCardClick}
            id={id}
            key={id}
            heading={title}
          >
            {description}
          </TextCard>
        ))}
      </section>
    </>
  );
};

export default ProfileAndTheme;
