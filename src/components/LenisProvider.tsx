// Lenis removed — it intercepts wheel events and causes scroll lag on
// trackpad and mouse wheel. The reference design uses native scroll only.
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
