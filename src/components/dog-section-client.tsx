"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DogCard } from "@/components/dog-card";

import { DogProps } from "@/types";

const formSchema = z.object({
  rangeLifeSpan: z.string().min(1).max(50),
});

const dogLifeSpans = [
  "8 - 10 years",
  "10 - 12 years",
  "10 - 13 years",
  "10 - 14 years",
  "12 - 15 years",
  "12 - 16 years",
  "14 - 16 years",
];

export function DogSectionClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [dogs, setDogs] = useState<DogProps[]>([]);
  const [dogsFiltered, setDogsFiltered] = useState<DogProps[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rangeLifeSpan: "",
    },
  });

  async function fetch() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10&api_key=live_e6m9v6Q6Ohm5Pb9YlnvlSMeAJkt3YRSIR06mkSkT1MOzscAZYEI4ffjPwGCh31eH"
      );
      setDogs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const filteredDogs = dogs.filter((dog) => {
      const lifeSpan = dog.breeds[0].life_span;

      const [min, max] = values.rangeLifeSpan.split(" - ");
      const [minYears, maxYears] = [parseInt(min), parseInt(max)];

      const [minLifeSpan, maxLifeSpan] = lifeSpan.split(" - ");
      const [minLifeSpanYears, maxLifeSpanYears] = [
        parseInt(minLifeSpan),
        parseInt(maxLifeSpan),
      ];

      return minLifeSpanYears >= minYears && maxLifeSpanYears <= maxYears;
    });

    setDogsFiltered(filteredDogs);
  }

  return (
    <section className="mt-4 mb-12">
      <h2 className="text-lg lg:text-3xl font-bold text-neutral-700 text-center mb-6">
        Look at these cute dogs! <span>🐶</span>
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col md:flex-row justify-center md:items-end md:gap-x-4"
        >
          <FormField
            control={form.control}
            name="rangeLifeSpan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select the range of life span of the dog</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dogLifeSpans.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline" disabled={isLoading}>
            Filter dogs
          </Button>
        </form>
      </Form>

      {isLoading && <p>Loading...</p>}

      {dogs && !dogsFiltered && (
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
          {dogs.map((dog) => (
            <DogCard key={dog.id} data={dog} />
          ))}
        </ul>
      )}

      {dogsFiltered && (
        <ul className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6 mt-6">
          {dogsFiltered.map((dog) => (
            <DogCard key={dog.id} data={dog} />
          ))}
        </ul>
      )}

      {dogsFiltered && dogsFiltered.length === 0 && (
        <p className="text-center mt-6 text-muted-foreground">
          No dogs found with the selected range of life span 😭
        </p>
      )}
    </section>
  );
}
