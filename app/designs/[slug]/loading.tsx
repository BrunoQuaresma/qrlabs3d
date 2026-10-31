import Link from "next/link";

export default function LoadingDesign() {
  return (
    <main className="design-loading">
      <Link href="/designs">← Todas as opções</Link>
      <p role="status">Preparando esta direção de design…</p>
    </main>
  );
}
