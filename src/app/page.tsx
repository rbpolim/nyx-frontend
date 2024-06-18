import { fetchDogs } from "@/actions/fetch-dogs";
import { DogSectionClient } from "@/components/dog-section-client";

export default async function Home() {
  const dogs = await fetchDogs();

  if (!dogs) {
    return (
      <p className="text-center text-rose-700 text-lg pt-20">
        Hey, something went wrong! Please try again later. 😢
      </p>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="max-w-5xl mx-auto h-full px-4">
        <DogSectionClient data={dogs} />
      </div>
    </div>
  );
}
