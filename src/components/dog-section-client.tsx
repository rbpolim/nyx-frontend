"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

type Props = {
  data: DogProps[];
};

export function DogSectionClient({ data }: Props) {
  const [dogsFiltered, setDogsFiltered] = useState<DogProps[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rangeLifeSpan: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const filteredDogs = data.filter((dog) => {
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
      <h2 className="text-lg lg:text-3xl font-bold text-neutral-700 text-center mb-6 mt-10">
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
          <Button type="submit" variant="outline">
            Filter dogs
          </Button>
        </form>
      </Form>

      {data && !dogsFiltered && (
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
          {data.map((dog) => (
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
