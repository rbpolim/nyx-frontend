"use client";

import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  range: z.string().min(1).max(50),
});

export function DogSectionClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [rangeLifeSpan, setRangeLifeSpan] = useState<DogProps[]>([]);
  const [data, setData] = useState<DogProps[]>([]);
  const [filtered, setFiltered] = useState<DogProps[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      range: "",
    },
  });

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

  const ranges = data.map((item: any) =>
    item.breeds.map((breed: any) => breed.life_span)
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    setRangeLifeSpan(
      data.filter((item) =>
        item.breeds.some((breed) => breed.life_span === values.range)
      )
    );
    setFiltered(rangeLifeSpan);
  }

  return (
    <section>
      <h2 className="text-2xl font-medium text-neutral-700 text-center">
        Look at these cute dogs! <span>🐶</span>
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-4"
        >
          <FormField
            control={form.control}
            name="range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Range life span</FormLabel>
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
                    {ranges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {isLoading && <p>Loading...</p>}

      {data && (
        <ul className="grid grid-cols-5 gap-6 mt-6">
          {data.map((dog) => (
            <li
              key={dog.id}
              className="p-2 border shadow-md rounded-md bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="random dog image"
                src={dog.url}
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

      {filtered && (
        <ul className="grid grid-cols-5 gap-6 mt-6">
          {filtered.map((dog) => (
            <li
              key={dog.id}
              className="p-2 border shadow-md rounded-md bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="random dog image"
                src={dog.url}
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
    </section>
  );
}
