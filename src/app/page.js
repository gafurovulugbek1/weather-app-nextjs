"use client";

import Image from "next/image";
import axios from "axios";

import sun from "../../public/sun.svg";
import cloud_sun from "../../public/cloud_sun.svg";
import cloud_snow from "../../public/cloud_snow.svg";
import cloud_rain from "../../public/cloud_rain.svg";
import cloudy from "../../public/cloudy.svg";
import rainy from "../../public/rainy.svg";
import snowy from "../../public/snowy.svg";
import windy from "../../public/windy.svg";
import clearly from "../../public/clearly.svg";
import humidity from "../../public/humidity.svg";
import weather from "../../public/weather.svg";
import { API_KEY } from "@/utils/apiKey";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name === "") {
        return;
      }
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
      );
      setData(data);
      setName("");
    } catch (error) {
      setData(null);
      alert("not found");
    }
  };

  const handleWeatherType = (main) => {
    console.log(main);
    switch (main) {
      case "Snow":
        return snowy;
      case "Rain":
        return rainy;
      case "Clouds":
        return cloudy;
      case "Clear":
        return clearly;
      default:
        return weather;
    }
  };

  return (
    <div class="flex justify-center items-center mt-20 pb-20">
      <div class="max-w-6xl rounded-2xl overflow-hidden shadow-lg text-white bg-black-500  bg-opacity-80 backdrop-filter backdrop-blur-lg ">
        {/* Navbar */}
        <div className="flex items-center gap-4">
          <Image width={80} height={80} src={sun} alt="sun" />
          <Image width={80} height={80} src={cloud_sun} alt="cloud_sun" />
          <h1 className="font-bold text-2xl">Weather</h1>
          <Image width={80} height={80} src={cloud_snow} alt="cloud_snow" />
          <Image width={80} height={80} src={cloud_rain} alt="cloud_rain" />
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit} class="max-w-md mx-auto">
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter City Name..."
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="mt-5 flex items-center gap-4 justify-center flex-col">
          <h1 className="text-4xl text-white text-center">
            {data ? Math.floor(data?.main?.temp) - 273 : 0}{" "}
            <sup className="font-semibold text-2xl">0</sup>
            <b className="text-4xl">C</b>
          </h1>
          <h2 className="text-5xl">{data ? data?.name : ""}</h2>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Image
              src={handleWeatherType(data?.weather[0]?.main)}
              alt="cloudy"
            ></Image>
            <span>{data ? data?.weather[0]?.main : "weather"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image width={60} height={60} src={windy} alt="cloudy"></Image>
            <span>{data ? data?.wind?.speed : 0}</span>m/s
          </div>
          <div className="flex items-center gap-1">
            <Image width={70} height={70} src={humidity} alt="humidity"></Image>
            <span>{data ? data?.main?.humidity : 0}</span>%
          </div>
        </div>
      </div>
    </div>
  );
}
