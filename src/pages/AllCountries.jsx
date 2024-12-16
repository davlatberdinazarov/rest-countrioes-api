import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function AllCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryName, setCountryName] = useState("");
  const [regionName, setRegionName] = useState("");

  // Fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Filtered countries based on search input and selected region
  const filteredData = countries.filter((country) => {
    const matchesCountryName = country.name.common
      .toLowerCase()
      .includes(countryName.toLowerCase());
    const matchesRegion = regionName
      ? country.region.toLowerCase().includes(regionName.toLowerCase())
      : true; // If no region selected, allow all regions
    return matchesCountryName && matchesRegion;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="blue" size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Search and Filter Section */}
      <main className="flex justify-between items-center my-8 bg-slate-200 dark:bg-gray-600 sticky w-full top-16 p-4 z-50 shadow-md rounded-md">
        <div className="flex items-center bg-white shadow-sm rounded-md h-10 gap-3 px-5 border border-slate-500">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            id="searchInput"
            placeholder="Search for a country..."
            className="focus:outline-none text-lg w-full"
            type="text"
            value={countryName}
            onChange={({ target }) => setCountryName(target.value)}
          />
        </div>
        <select
          onChange={({ target }) => setRegionName(target.value)}
          id="selectedRegion"
          className="h-10 px-4 py-2 border border-slate-400 rounded-md bg-white"
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </main>

      {/* Countries Display Section */}
      <section
        id="countries-wrapper"
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        {filteredData.length > 0 ? (
          filteredData.map((country) => (
            <Link
              to={`/country/${country.name.common}`}
              key={country.cca3}
              className="card hover:scale-105 transition-all duration-500 dark:text-white bg-white dark:bg-slate-700 shadow-md hover:shadow-xl rounded-md overflow-hidden"
            >
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-full h-40 object-cover border-2 border-slate-400"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {country.name.common}
                </h2>
                <p>
                  <strong>Population:</strong>{" "}
                  <span className="text-gray-600 dark:text-gray-50">{country.population}</span>
                </p>
                <p>
                  <strong>Region:</strong>{" "}
                  <span className="text-gray-600 dark:text-gray-50">{country.region}</span>
                </p>
                <p>
                  <strong>Capital:</strong>{" "}
                  <span className="text-gray-600 dark:text-gray-50">
                    {country.capital ? country.capital[0] : "N/A"}
                  </span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-2xl font-semibold">
            No countries match your search.
          </div>
        )}
      </section>
    </div>
  );
}
