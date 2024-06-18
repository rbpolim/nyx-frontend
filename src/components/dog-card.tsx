import Image from "next/image";

import { DogProps } from "@/types";
import { Badge } from "@/components/ui/badge";

type Props = {
  data: DogProps;
};

export function DogCard({ data }: Props) {
  return (
    <li key={data.id} className="p-2 border shadow-sm rounded-2xl bg-white">
      <div className="relative aspect-video w-full h-32">
        <Image
          src={data.url}
          alt="random dog image"
          fill
          className="bg-cover rounded-lg"
        />
      </div>
      {data.breeds.map((breed) => (
        <div key={breed.id} className="mt-2 space-y-2 text-center">
          <p className="text-sm font-medium">{breed.name}</p>
          {breed.breed_group && (
            <Badge variant="primary">{breed.breed_group}</Badge>
          )}
          <p className="text-xs text-muted-foreground">{breed.life_span}</p>
        </div>
      ))}
    </li>
  );
}
