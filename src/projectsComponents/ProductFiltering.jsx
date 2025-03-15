import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";
import Heading from "../components/Heading";
const ECommersePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loaderState, setLoaderState] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [priceFilterValue, setPriceFilterValue] = useState("default");
  const [priceFilterDropDownState, setPriceFilterDropDownState] =
    useState(false);
  const [ratingFilterValue, setRatingFilterValue] = useState("default");
  const [ratingFilterDropDownState, setRatingFilterDropDownState] =
    useState(false);
  const [categoryFilterValue, setCategoryFilterValue] = useState("default");
  const [categoryFilterDropDownState, setCategoryFilterDropDownState] =
    useState(false);

  // handle data fetching and error detections
  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoaderState(true);
        const result = await fetch("https://fakestoreapi.com/products");
        if (!result.ok) {
          throw new Error("Fetch Network Error");
        }
        setLoaderState(false);
        const data = await result.json();
        // console.log(data);
        setData(data);
      } catch (error) {
        console.log("Fetch Error: " + error.message);
        setLoaderState(false);
        setError(error.message);
      }
    })();
  }, []);

  // utility function
  const resetOpenMenu = (current) => {
    [
      setPriceFilterDropDownState,
      setRatingFilterDropDownState,
      setCategoryFilterDropDownState,
    ].map((methods) => {
      if (methods !== current) methods(false);
    });
  };
  // search handler
  const handleSearch = (event) => setSearchInput(event.target.value.trim());
  // price dropDownHandler
  const handlePriceDropDownClick = () => {
    resetOpenMenu(setPriceFilterDropDownState);
    setPriceFilterDropDownState((pre) => !pre);
  };
  const handlePriceDropDownSelection = (event, price) => {
    event.stopPropagation();
    setPriceFilterValue(price);
    setPriceFilterDropDownState(false);
  };
  // rating dropDownHandler
  const handleRatingDropDownClick = () => {
    resetOpenMenu(setRatingFilterDropDownState);
    setRatingFilterDropDownState((pre) => !pre);
  };
  const handleRatingDropDownSelection = (event, price) => {
    event.stopPropagation();
    setRatingFilterValue(price);
    setRatingFilterDropDownState(false);
  };
  // category dropDownHandler
  const handleCategoryDropDownClick = () => {
    resetOpenMenu(setCategoryFilterDropDownState);
    setCategoryFilterDropDownState((pre) => !pre);
  };
  const handleCategoryDropDownSelection = (event, price) => {
    event.stopPropagation();
    setCategoryFilterValue(price);
    setCategoryFilterDropDownState(false);
  };
  // handle all click
  const handleAllClick = () => {
    setPriceFilterValue("default");
    setPriceFilterDropDownState(false);
    setRatingFilterValue("default");
    setRatingFilterDropDownState(false);
    setCategoryFilterValue("default");
    setCategoryFilterDropDownState(false);
  };

  // handle products filtering based on search query or dropdown selection
  const filteredProduct = (callback) => {
    let newData = [];
    const customFilter = (data, callback) => data.filter(callback);

    // handling search filtering
    if (searchInput) {
      newData = customFilter(data, ({ title }) =>
        title.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      newData = [...data];
    }
    // handle price filtering
    if (priceFilterValue && priceFilterValue !== "default") {
      newData = customFilter(newData, ({ price }) => {
        if (priceFilterValue.toLowerCase() === "under 99") return price <= 99;
        if (priceFilterValue.toLowerCase() === "99-499")
          return price >= 99 && price <= 299;
        if (priceFilterValue.toLowerCase() === "over 499") return price >= 499;
      });
    }
    // handling rating filtering
    if (ratingFilterValue && ratingFilterValue !== "default") {
      newData = customFilter(newData, ({ rating }) => {
        if (ratingFilterValue.toLowerCase() === "under 2")
          return rating.rate <= 2;
        if (ratingFilterValue.toLowerCase() === "2-3")
          return rating.rate >= 2 && rating.rate <= 3;
        if (ratingFilterValue.toLowerCase() === "3-4")
          return rating.rate >= 3 && rating.rate <= 4;
        if (ratingFilterValue.toLowerCase() === "over 4")
          return rating.rate >= 4;
      });
    }
    // handle category filtering
    if (categoryFilterValue && categoryFilterValue !== "default") {
      newData = customFilter(newData, ({ category }) => {
        if (categoryFilterValue.toLowerCase() == "men's clothing")
          return category == "men's clothing";
        if (categoryFilterValue.toLowerCase() == "jewelery")
          return category == "jewelery";
        if (categoryFilterValue.toLowerCase() == "electronics")
          return category == "electronics";
        if (categoryFilterValue.toLowerCase() == "women's clothing")
          return category == "women's clothing";
      });
    }

    return newData.map(callback);
  };

  return (
    <section id="e-commerse-page" className="w-full border-secondaryText">
      <Heading>filter products (product api)</Heading>
      <nav className="w-full flex items-center flex-wrap gap-2 py-3 mt-4 border-y-2 border-secondaryText">
        <label
          id="search-component"
          className="border-2 border-secondaryText rounded-lg flex items-center hover:bg-hoverFocusBackground md:w-full md:max-w-md flex-grow"
        >
          <input
            onChange={handleSearch}
            value={searchInput}
            type="search"
            placeholder="search"
            className="bg-transparent outline-none border-none text-inherit p-1 pl-2 flex-1"
          />
          <FaSearch className="text-secondaryText size-5 mr-2 shrink-0" />
        </label>
        <button
          id="all"
          className="border-secondaryText border-2 rounded-lg text-secondaryText p-1 px-4 capitalize font-semibold flex min-w-20 items-center justify-center gap-2 flex-grow hover:bg-hoverFocusBackground"
          onClick={handleAllClick}
        >
          all
        </button>
        <button
          id="price-drop-down"
          className="border-secondaryText border-2 rounded-lg text-secondaryText p-1 px-4 capitalize font-semibold min-w-40 md:min-w-48 flex items-center justify-center gap-2 flex-grow hover:bg-hoverFocusBackground relative"
          onClick={handlePriceDropDownClick}
        >
          {priceFilterValue == "default" ? "filter by price" : priceFilterValue}
          <IoIosArrowDown
            className={
              priceFilterDropDownState &&
              "rotate-180 transition-all duration-200"
            }
          />
          <ul
            className={`absolute bg-complimentaryBackground p-2 rounded-lg w-full top-full translate-y-2 border-2 border-secondaryText space-y-2 z-50 ${
              !priceFilterDropDownState && "hidden"
            }`}
          >
            {["under 99", "99-499", "over 499", "default"].map(
              (liName, index) => (
                <li
                  value={liName}
                  onClick={(e) => handlePriceDropDownSelection(e, liName)}
                  className="hover:bg-hoverFocusBackground active:bg-hoverFocusBackground py-1"
                  key={index + "-price"}
                >
                  {liName}
                </li>
              )
            )}
          </ul>
        </button>
        <button
          id="rating-drop-down"
          className="border-secondaryText border-2 rounded-lg text-secondaryText p-1 px-4 capitalize font-semibold flex items-center justify-center min-w-40 md:min-w-48 gap-2 flex-grow hover:bg-hoverFocusBackground relative"
          onClick={handleRatingDropDownClick}
        >
          {ratingFilterValue == "default"
            ? "filter by rating"
            : ratingFilterValue}{" "}
          <IoIosArrowDown
            className={
              ratingFilterDropDownState &&
              "rotate-180 transition-all duration-200"
            }
          />
          <ul
            className={`absolute bg-complimentaryBackground p-2 rounded-lg w-full top-full translate-y-2 border-2 border-secondaryText space-y-2 z-50 ${
              !ratingFilterDropDownState && "hidden"
            }`}
          >
            {["under 2", "2-3", "3-4", "over 4", "default"].map(
              (liName, index) => (
                <li
                  value={liName}
                  onClick={(e) => handleRatingDropDownSelection(e, liName)}
                  className="hover:bg-hoverFocusBackground active:bg-hoverFocusBackground py-1"
                  key={index + "-price"}
                >
                  {liName}
                </li>
              )
            )}
          </ul>
        </button>
        <button
          id="category-drop-down"
          className="border-secondaryText border-2 rounded-lg text-secondaryText p-1 px-4 capitalize font-semibold min-w-40 md:min-w-48 flex items-center justify-center gap-2 flex-grow hover:bg-hoverFocusBackground relative"
          onClick={handleCategoryDropDownClick}
        >
          {categoryFilterValue == "default"
            ? "filter by category"
            : categoryFilterValue}
          <IoIosArrowDown
            className={
              categoryFilterDropDownState &&
              "rotate-180 transition-all duration-200"
            }
          />
          <ul
            className={`absolute bg-complimentaryBackground p-2 rounded-lg w-full top-full translate-y-2 border-2 border-secondaryText space-y-2 z-50 ${
              !categoryFilterDropDownState && "hidden"
            }`}
          >
            {[
              "men's clothing",
              "jewelery",
              "electronics",
              "women's clothing",
              "default",
            ].map((liName, index) => (
              <li
                value={liName}
                onClick={(e) => handleCategoryDropDownSelection(e, liName)}
                className="hover:bg-hoverFocusBackground active:bg-hoverFocusBackground py-1"
                key={index + "-price"}
              >
                {liName}
              </li>
            ))}
          </ul>
        </button>
      </nav>
      {loaderState && !error && (
        <BiLoaderCircle className="size-10 mx-auto mt-12 animate-spin text-secondaryText" />
      )}
      {error ? (
        <>
          <p className="bg-errorTransparent border-error border-2 rounded-lg text-center text-error p-2 mt-4 capitalize">
            {error}
          </p>
          <button
            onClick={() => location.reload()}
            className=" text-secondaryText flex items-center justify-center gap-2 capitalize font-bold p-2 mx-auto border-2 border-secondaryText rounded-lg mt-2 hover:bg-hoverFocusBackground active:bg-hoverFocusBackground"
          >
            <IoReload className="size-5 md:size-7" />
            refresh
          </button>
        </>
      ) : (
        <section className="pt-3 grid md:grid-cols-2 items-stretch justify-center gap-2">
          {filteredProduct((cardinfo) => (
            <div
              id="card"
              key={cardinfo.id}
              className="bg-complimentaryBackground rounded-lg flex items-center gap-2 max-h-60"
            >
              <section className="h-full flex-1 bg-white">
                <img
                  className="object-contain w-full h-full"
                  src={cardinfo.image}
                  alt={cardinfo.title}
                />
              </section>
              <section className="w-1/2 p-2 h-full">
                <h2 className="capitalize font-bold">{cardinfo.title}</h2>
                <p className="text-secondaryText capitalize">
                  <span className="pr-2">category: </span>
                  {cardinfo.category}
                </p>
                <p className="text-secondaryText capitalize">
                  <span className="pr-2">price: </span>
                  {cardinfo.price}
                </p>
                <p className="text-secondaryText capitalize">
                  <span className="pr-2">rating: </span>
                  {cardinfo.rating.rate}
                </p>
                <p className="text-secondaryText capitalize">
                  <span className="pr-2">views: </span>
                  {cardinfo.rating.count}
                </p>
              </section>
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default ECommersePage;
