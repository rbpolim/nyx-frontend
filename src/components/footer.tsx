import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 border-t shadow-md bg-white">
      <p className="text-sm text-neutral-600">
        Create with 💛 by{" "}
        <Link
          href="https://github.com/rbpolim"
          className="underline text-muted-foreground hover:text-primary"
        >
          Rodrigo Polim
        </Link>
      </p>
    </footer>
  );
}
