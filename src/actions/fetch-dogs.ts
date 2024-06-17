import axios from "axios";

import { DogProps } from "@/types";

export async function fetchDogs() {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10&api_key=${process.env.API_KEY}`
    );

    return response.data as DogProps[];
  } catch (error) {
    console.error(error);
  }
}
