import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Heading from "../components/Heading";

const MealApiProject = () => {
  const [mealCardInfo, setMealCardInfo] = useState(null);
  const [mealIngrediants, setMealIngrediants] = useState(null);
  const [mealInstructions, setMealInstructions] = useState(null);
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState("a");

  useEffect(() => {
    function dataOrganizer(data) {
      const obj = data[Math.floor(Math.random() * data.length)];

      setMealCardInfo({
        title: obj.strMeal,
        url: obj.strMealThumb,
        category: obj.strCategory,
        area: obj.strArea,
      });

      // extracting all ingrediants key values
      const ing = Object.keys(obj)
        .filter((key) => key.includes("strIngredient") && obj[key]?.trim())
        .map((key) => obj[key]);
      setMealIngrediants([...ing]);

      const ins = obj.strInstructions
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/^\.\s*/, "") // Remove leading dots
        .replace(/\d+\.\s*/g, "") // Remove numbered steps (e.g., 2. or 3.)
        .replace(/\r\n|\n|\r/g, " ") // Replace line breaks with spaces
        .split(/(?<=[.?!])\s+/) // Split into sentences by punctuation
        .filter((sentence) => sentence.trim().length > 0); // Remove empty sentences
      setMealInstructions(ins);
      console.log(obj.strInstructions);
    }
    // handling data fetching from api point
    async function fetchData(url) {
      setError("");
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // parsing json response
        dataOrganizer(data.meals);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      }
    }

    fetchData(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`
    );
  }, [userInput]);

  const userInputHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const query = data.get("userQuery");
    setUserInput(query.length ? query : "a");
  };

  return (
    <section>
      <Heading>Meal Menu (Meal Api)</Heading>
      <div className="w-full grid gap-2 md:grid-cols-2 mt-4">
        {/* handling user inputs  */}
        <form
          onSubmit={userInputHandler}
          action=""
          className=" bg-complimentaryBackground rounded-lg flex items-center text-secondaryText font-bold md:col-span-2"
        >
          <input
            name="userQuery"
            type="search"
            placeholder="search meal"
            className="bg-transparent p-2 md:p-3 pl-3 md:pl-6 text-lg outline-none flex-1 placeholder:capitalize"
          />
          <button className="p-2 md:p-3 pr-3 md:pr-6 self-stretch rounded-lg">
            <FaSearch className="size-5" />
          </button>
        </form>

        {/* handling errors  */}
        {error && (
          <p className="p-2 rounded-lg bg-errorTransparent text-error border-2 border-error md:col-span-2 text-center font-semibold">
            {error}
          </p>
        )}

        {/* meal card component */}
        <section
          id="Meal-card"
          className={`${
            mealCardInfo ? "" : "shimmer-effect"
          } flex items-center justify-center bg-complimentaryBackground w-full min-h-36 p-2 rounded-lg md:col-span-1`}
        >
          {mealCardInfo && (
            <>
              <img
                className=" w-1/2 rounded-lg"
                src={mealCardInfo.url}
                alt=""
              />
              <section className=" flex-1 p-2 pl-6">
                <h1 className="capitalize text-primaryText text-lg md:text-xl font-bold mb-2 ">
                  {mealCardInfo.title}
                </h1>
                <h2 className="text-base md:text-lg capitalize py-1 text-secondaryText font-semibold ">
                  <span>category: </span> {mealCardInfo.category}
                </h2>
                <h3 className="text-base md:text-lg capitalize py-1 text-secondaryText font-semibold ">
                  <span>area: </span>
                  {mealCardInfo.area}
                </h3>
              </section>
            </>
          )}
        </section>

        {/* meal ingrediants component  */}
        <section
          id="ingredients"
          className={`${
            !mealIngrediants ? "shimmer-effect" : ""
          } bg-complimentaryBackground p-2 rounded-lg min-h-40 md:col-span-1`}
        >
          <h2 className="text-lg md:text-xl font-bold capitalize mb-2 text-primaryText">
            Meal ingrediants
          </h2>
          <ul className=" w-full grid grid-cols-2 items-start justify-between gap-2 text-secondaryText font-semibold">
            {mealIngrediants?.map((ingredients, index) => (
              <li key={index} className="text-base md:text-lg">
                {index + 1}. {ingredients}
              </li>
            ))}
          </ul>
        </section>
        {/* meal instruction component  */}
        <section
          className={`${
            !mealInstructions ? "shimmer-effect" : ""
          } bg-complimentaryBackground p-2 md:p-3 rounded-lg md:col-span-2`}
        >
          <h2 className="text-primaryText capitalize font-bold text-lg md:text-xl mb-3">
            meal instructions
          </h2>

          <ul className="text-secondaryText space-y-2 text-base md:text-lg font-semibold">
            {mealInstructions?.map((instruction, index) => (
              <li key={index}>
                {index + 1}. {instruction}.
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default MealApiProject;
