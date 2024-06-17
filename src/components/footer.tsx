import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex items-center justify-center p-6 border-t shadow-md bg-white">
      <p className="text-sm text-neutral-600 font-medium">
        Create with 💛 by{" "}
        <Link
          href="https://github.com/rbpolim"
          className="border-b text-muted-foreground/80 hover:text-primary"
        >
          Rodrigo Polim
        </Link>
      </p>
    </footer>
  );
}
