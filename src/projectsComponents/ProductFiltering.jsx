import React, { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import UseFetch from "../UseFetch";

import Heading from "../components/Heading";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Loader from "../components/Loader";

const ECommersePage = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQueary, setSearchQueary] = useState("");
  const [filterQueary, setFilterQueary] = useState({
    price: null,
    rating: null,
    category: null,
  });

  UseFetch(
    "https://fakestoreapi.com/products",
    [],
    [setResult, setError, setLoading]
  );

  // handle data fetching and error detections
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setError("");
  //       setLoaderState(true);
  //       const result = await fetch("https://fakestoreapi.com/products");
  //       if (!result.ok) {
  //         throw new Error("Fetch Network Error");
  //       }
  //       setLoaderState(false);
  //       const data = await result.json();
  //       // console.log(data);
  //       setData(data);
  //     } catch (error) {
  //       console.log("Fetch Error: " + error.message);
  //       setLoaderState(false);
  //       setError(error.message);
  //     }
  //   })();
  // }, []);

  // update search Queary
  const updateSearchQuery = (event) => {
    setSearchQueary(event.target.value.trim());
  };

  // update filter Queary
  const updateFilterTags = (selectedOption, key) => {
    setFilterQueary((pre) => ({ ...pre, [key]: selectedOption }));
  };

  // handle to remove filter
  const clearAllFilter = () => {
    setSearchQueary("");
    setFilterQueary({
      price: null,
      rating: null,
      category: null,
    });
  };

  // handle prodcuts filtering
  const getFilteredProducts = (callback) => {
    if (!result) return [];
    let products = [...result];
    const customFilter = (result, callback) => result.filter(callback);

    // filter products by search queary
    if (searchQueary) {
      products = customFilter(result, ({ title }) =>
        title.toLowerCase().includes(searchQueary.toLowerCase())
      );
    }

    // filter products by filter queary
    if (filterQueary.price) {
      switch (filterQueary.price) {
        case "under 99":
          products = customFilter(products, ({ price }) => price < 99);
          break;
        case "99-499":
          products = customFilter(
            products,
            ({ price }) => price > 99 && price < 499
          );
          break;
        case "over 499":
          products = customFilter(products, ({ price }) => price > 499);
          break;
      }
    }
    if (filterQueary.rating) {
      switch (filterQueary.rating) {
        case "under 2":
          products = customFilter(products, ({ rating }) => rating.rate < 2);
          break;
        case "2-3":
          products = products = customFilter(
            products,
            ({ rating }) => rating.rate >= 2 && rating.rate <= 3
          );
          break;
        case "3-4":
          products = products = customFilter(
            products,
            ({ rating }) => rating.rate >= 3 && rating.rate <= 4
          );
          break;
        case "over 4":
          products = customFilter(products, ({ rating }) => rating.rate > 4);
          break;
      }
    }
    if (filterQueary.category) {
      switch (filterQueary.category) {
        case "men's clothing":
          products = customFilter(
            products,
            ({ category }) => category.toLowerCase() == "men's clothing"
          );
          break;
        case "jewelery":
          products = customFilter(
            products,
            ({ category }) => category.toLowerCase() == "jewelery"
          );
          break;
        case "electronics":
          products = customFilter(
            products,
            ({ category }) => category.toLowerCase() == "electronics"
          );
          break;
        case "women's clothing":
          products = customFilter(
            products,
            ({ category }) => category.toLowerCase() == "women's clothing"
          );
          break;
      }
    }

    return products.map(callback);
  };

  return (
    <section id="e-commerse-page" className="w-full border-secondaryText">
      <Heading>filter products (product api)</Heading>
      <nav className="w-full grid grid-cols-4 gap-2 py-4 mt-4 border-y-2 border-secondaryText">
        <Input
          handler={updateSearchQuery}
          value={searchQueary}
          type="search"
          label="search products"
          labelBg={null}
          placeholder="type here"
          className=" col-span-4 md:col-span-3"
        />
        <button
          onClick={clearAllFilter}
          className={`border-2 rounded-lg text-secondaryText capitalize border-secondaryText p-2 px-3 hover:bg-hoverFocusBackground col-span-2 md:col-span-1`}
        >
          clear filter
        </button>
        <Dropdown
          className="col-span-2 md:col-span-1"
          options={["under 99", "99-499", "over 499", "default"]}
          placeholder="price"
          value={filterQueary.price}
          onSelect={updateFilterTags}
        ></Dropdown>
        <Dropdown
          className="col-span-2 md:col-span-1"
          options={["under 2", "2-3", "3-4", "over 4", "default"]}
          placeholder="rating"
          value={filterQueary.rating}
          onSelect={updateFilterTags}
        ></Dropdown>
        <Dropdown
          className="col-span-2"
          options={[
            "men's clothing",
            "jewelery",
            "electronics",
            "women's clothing",
            "default",
          ]}
          placeholder="category"
          value={filterQueary.category}
          onSelect={updateFilterTags}
        ></Dropdown>
      </nav>
      {loading && <Loader />}
      {!loading && error ? (
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
          {getFilteredProducts((cardinfo) => {
            return (
              <div
                id="card"
                key={cardinfo.id}
                className="bg-complimentaryBackground rounded-lg flex items-center gap-2"
              >
                <section className="w-[40%] h-full shrink-0 bg-white">
                  <img
                    className="w-full h-full object-contain object-center aspect-square"
                    src={cardinfo.image}
                    alt={cardinfo.title}
                  />
                </section>
                <section className="p-2 py-3 flex flex-col items-start justify-start h-full">
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
            );
          })}
        </section>
      )}
    </section>
  );
};

export default ECommersePage;
