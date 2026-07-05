export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}
