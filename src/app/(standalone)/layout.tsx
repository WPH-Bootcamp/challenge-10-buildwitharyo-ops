export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-neutral-50">{children}</div>
  );
}
