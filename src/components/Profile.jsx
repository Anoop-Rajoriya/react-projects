import React from "react";

const Profile = ({ className }) => {
  return (
    <section className="py-2">
      <section className="flex items-stretch justify-start gap-6">
        <div
          id="profile"
          className="size-24 md:size-44 rounded-full overflow-hidden border-2 border-accent"
        >
          <img
            src="https://avatars.githubusercontent.com/u/147984549?v=4"
            alt=""
          />
        </div>
        <div className="grow flex flex-col items-cetner justify-center">
          <h1 className="text-2xl md:text-5xl capitalize font-semibold">
            anoop rajoriya
          </h1>
          <a className="text-lg md:text-2xl font-light text-secondaryText hover:text-accent transition-colors mt-2 cursor-pointer">
            Anoop-Rajoriys
          </a>
        </div>
      </section>
      <p className="text-secondaryText font-semibold pt-4 md:text-xl">
        Static and Dynamic Web Developer | 2end Year Student in BCA SMS Adersh
        Science Collage
      </p>
    </section>
  );
};

export default Profile;
