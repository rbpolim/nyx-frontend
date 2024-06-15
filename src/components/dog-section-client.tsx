"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type BreedProps = {
  id: number;
  name: string;
  life_span: string;
};

type DogProps = {
  id: string;
  url: string;
  breeds: BreedProps[];
};

export function DogSectionClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DogProps[]>([]);

  async function fetch() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10&api_key=live_e6m9v6Q6Ohm5Pb9YlnvlSMeAJkt3YRSIR06mkSkT1MOzscAZYEI4ffjPwGCh31eH"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  // // iterate over the data.breeds array and return a list of life spans
  // const breeds = data.map((dog: any) =>
  //   dog.breeds.map((breed: any) => breed.life_span)
  // );
  // console.log(breeds);

  return (
    <div className="">
      <h1 className="text-2xl font-medium text-neutral-700 text-center">
        Look at these cute dogs! <span>🐶</span>
      </h1>

      {isLoading && <p>Loading...</p>}

      {data && (
        <ul className="grid grid-cols-5 gap-6 mt-14">
          {data.map((dog) => (
            <li
              key={dog.id}
              className="p-2 border shadow-md rounded-md bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dog.url}
                alt="dog"
                className="w-full h-40 bg-cover rounded-md"
              />
              {dog.breeds.map((breed) => (
                <div key={breed.id}>
                  <p key={breed.id}>{breed.name}</p>
                  <p>{breed.life_span}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
