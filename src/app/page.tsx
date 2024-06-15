import { DogSectionClient } from "@/components/dog-section-client";

export default async function Home() {
  return (
    <div className="h-full">
      <div className="max-w-5xl mx-auto h-full p-4">
        <DogSectionClient />
      </div>
    </div>
  );
}
