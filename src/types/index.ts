export type BreedProps = {
  id: number;
  name: string;
  life_span: string;
  breed_group: string;
  bred_for: string;
};

export type DogProps = {
  id: string;
  url: string;
  breeds: BreedProps[];
};
