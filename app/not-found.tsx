import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 lattice-bg flex flex-col items-center justify-center text-center px-4 min-h-screen">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold mb-2" style={{ color: "var(--accent)" }}>404</h1>
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--fg)" }}>Page Not Found</h2>
        <p className="mb-10" style={{ color: "var(--muted)" }}>
          The requested resource does not exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-2 border rounded-md transition-colors hover:bg-[var(--accent-muted)]"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
