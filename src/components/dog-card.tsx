import { DogProps } from "@/types";

import { Badge } from "@/components/ui/badge";

type Props = {
  data: DogProps;
};

export function DogCard({ data }: Props) {
  return (
    <li key={data.id} className="p-2 border shadow-md rounded-lg bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="random dog image"
        src={data.url}
        className="w-full h-32 bg-cover rounded-lg"
      />
      {data.breeds.map((breed) => (
        <div key={breed.id} className="mt-2 space-y-2 text-center">
          <p key={breed.id} className="text-sm font-medium">
            {breed.name}
          </p>
          {breed.breed_group && (
            <Badge variant="primary">{breed.breed_group}</Badge>
          )}
          <p className="text-xs text-muted-foreground">{breed.life_span}</p>
        </div>
      ))}
    </li>
  );
}
