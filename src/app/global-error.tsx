"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center font-sans">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-neutral-500">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
