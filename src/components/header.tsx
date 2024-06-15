import Image from "next/image";

export function Header() {
  return (
    <header className="h-20 flex items-center justify-center p-4 bg-yellow-200 border-b shadow-md">
      <div className="relative h-14 w-14">
        <Image fill src="/dog.png" alt="icon dog" />
      </div>
    </header>
  );
}
