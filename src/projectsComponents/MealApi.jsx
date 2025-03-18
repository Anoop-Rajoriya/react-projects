import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Loader from "../components/Loader";

const MealApiProject = () => {
  const [searchQuery, setSearchQuery] = useState("milk");
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // handle searing
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };

  // handle data fetching
  useEffect(() => {
    (async () => {
      setError(null);
      setLoading(true);
      setMeal(null);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const res = await response.json();
        setMeal(res?.meals[0]);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setMeal(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchQuery]);

  const getIngrediants = () => {
    if (meal && Object.keys(meal).length < 0) return [];
    return Object.keys(meal)
      .filter((key) => key.includes("strIngredient") && meal[key].length)
      .map((key) => meal[key]);
  };

  const getInstruction = () => {
    if (meal && Object.keys(meal).length < 0) return [];
    return meal.strInstructions
      .replace(/\s{2,}/g, " ") // Remove extra spaces
      .replace(/^\.\s*/, "") // Remove leading dots
      .replace(/\d+\.\s*/g, "") // Remove numbered steps (e.g., 2. or 3.)
      .replace(/\r\n|\n|\r/g, " ") // Replace line breaks with spaces
      .split(/(?<=[.?!])\s+/) // Split into sentences by punctuation
      .filter((sentence) => sentence.trim().length > 0); // Remove empty sentences
  };

  return (
    <section>
      <Heading>Meal Menu (Meal Api)</Heading>
      <div className="w-full mt-4">
        <Input
          handler={handleSearch}
          value={searchQuery}
          label={"search here"}
          placeholder="search here"
          type="search"
          required={true}
          errorLabel={error}
        />
        {/* handleing no data found  */}
        {loading == false && !meal && (
          <p className="text-secondaryText capitalize text-center p-2 py-5">
            no data found
          </p>
        )}
        {/* handle loading  */}
        {error == null && loading && <Loader />}
        {/* main ui */}

        {meal && (
          <section className="pt-6 space-y-4">
            <section className="flex flex-col md:flex-row items-center justify-center gap-6 bg-complimentaryBackground rounded-lg p-2">
              <div className="size-40 md:size-60 rounded-full border-accent border-4 overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center aspect-square"
                  src={meal.strMealThumb}
                  alt=""
                />
              </div>
              <div className="flex flex-col items-center md:items-start justify-center">
                <h2 className="text-primaryText font-bold text-xl md:text-2xl capitalize pb-2">
                  {meal.strMeal}
                </h2>
                <p className="text-secondaryText capitalize font-semibold">
                  {meal.strCategory} meal , from {meal.strArea}
                </p>
              </div>
            </section>
            <h2 className="capitalize font-bold md:text-2xl text-xl">
              meal ingrediants:
            </h2>
            <ul className="flex items-start justify-center p-2 bg-complimentaryBackground rounded-lg gap-2 flex-wrap">
              {getIngrediants().length &&
                getIngrediants().map((ins, index) => (
                  <li key={index}>
                    {index + 1}. {ins}
                  </li>
                ))}
            </ul>
            <h2 className="capitalize font-bold md:text-2xl text-xl">
              meal instructions:
            </h2>
            <ul className="flex flex-col p-2 py-4  bg-complimentaryBackground rounded-lg gap-2 flex-wrap">
              {getInstruction().length &&
                getInstruction().map((ins, index) => (
                  <li key={index}>
                    {index + 1}. {ins}
                  </li>
                ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
};

export default MealApiProject;
