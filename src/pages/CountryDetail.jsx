import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

export default function CountryDetail() {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error)
        setLoading(false);
      });
  }, [name]);

  if (loading) return <div className="text-center text-4xl font-bold">Loading...</div>

  return (
    <section className=" container mt-12 lg:mt-20">
      <div>
        <button
          onClick={() => history.back()}
          className=" bg-white dark:bg-black dark:text-white shadow-xl px-4 py-3 rounded flex gap-4 items-center justify-around hover:shadow-sm active:shadow-2xl active:scale-105 hover:bg-slate-300 transition-all duration-300 text-lg w-32"
        >
          <FaArrowLeft /> <span>Back</span>
        </button>
      </div>

      {country?.map((item) => {
        let nativename = Object.values(item.name.nativeName)[0].official;
        let currency = Object.values(item.currencies)[0];
        let language = Object.values(item.languages)[0];

        return (
          <main className="detail-country  dark:text-gray-50 mt-9 flex lg:flex-row flex-col gap-8">
            <img
              loading="lazy"
              className=" lg:w-1/2 h-[300px] md:h-[400px] border-2 border-slate-400"
              src={item.flags.svg}
              alt="img"
            />

            <div className=" lg:w-1/2">
              <h1 className="text-2xl font-semibold mb-5">{item.name.common}</h1>

              <figure className=" flex flex-col sm:flex-row max-w-[540px] gap-12 justify-between">
                <figcaption className=" text-xl">
                  <ul className=" flex-col flex gap-3 ">
                    <li>
                      <span className=" font-bold mr-3 ">Native Name:</span>
                      {nativename}
                    </li>
                    <li>
                      <span className=" font-bold mr-3 ">Population:</span>
                      {item.population}
                    </li>
                    <li>
                      <span className=" font-bold mr-3 ">Region:</span>
                      {item.region}
                    </li>
                    <li>
                      <span className=" font-bold mr-3 ">Sub Region:</span>
                      {item.subregion}
                    </li>
                    <li>
                      <span className=" font-bold mr-3 ">Capital:</span>
                      {item.capital}
                    </li>
                  </ul>
                </figcaption>

                <figcaption className=" text-xl">
                  <ul className=" flex-col flex gap-3">
                    <li>
                      <span className=" font-bold mr-3 ">Top Level Domain:</span>
                      {item.tld.join(", ")}
                    </li>
                    <li>
                      <span className=" font-bold mr-3 ">Currency:</span>
                      {currency.name}, {currency.symbol}
                    </li>
                    <li>
                      <span className=" font-bold mr-3 ">Languages:</span>
                      {language}
                    </li>
                  </ul>
                </figcaption>
              </figure>

              <div className=" my-12 flex flex-wrap items-center gap-5">
                <h1 className=" text-black dark:text-white font-semibold text-xl">
                  Border countries:{" "}
                </h1>
                {item.borders?.map((item) => {
                  return (
                    <button className=" bg-white dark:bg-black shadow-xl px-4 py-3 rounded flex gap-4 items-center justify-around hover:shadow-sm active:shadow-2xl active:scale-105 hover:bg-slate-300 transition-all duration-300 text-lg w-32">
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </main>
        );
      })}
    </section>
  );
}
