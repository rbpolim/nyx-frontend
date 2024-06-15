import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 border-t shadow-md">
      <p className="text-sm text-neutral-600">
        Criado com 🤎 por{" "}
        <Link href="https://github.com/rbpolim">Rodrigo Polim</Link>
      </p>
    </footer>
  );
}
