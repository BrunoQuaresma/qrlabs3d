import Image from "next/image";
import Link from "next/link";
import { concepts, references } from "./concepts";

export default function Designs() {
  return (
    <main className="design-index">
      <header className="index-header">
        <Link href="/" className="index-brand"><Image src="/images/logo.jpg" alt="" width={38} height={38} /> QRLabs 3D</Link>
        <Link href="/" className="index-original">Ver página atual ↗</Link>
      </header>
      <section className="index-intro">
        <p className="index-label">ESTUDO DE DIREÇÃO VISUAL · OUTUBRO 2026</p>
        <h1>A mesma essência.<br /><span>Oito novos jeitos.</span></h1>
        <div className="index-intro-bottom"><p>Explore oito interpretações da QRLabs 3D. A mesma estrutura, as mesmas peças reais e diferentes formas de contar essa história.</p><a href="#referencias">Conheça as referências <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className="concept-grid" aria-label="Oito opções de design">
        {concepts.map((c) => (
          <article className="concept-card" key={c.slug}>
            <Link href={`/designs/${c.slug}`} className="concept-preview" aria-label={`Explorar opção ${c.number}: ${c.name}`} style={{ background: c.color, color: c.ink }}>
              <Image className="concept-screenshot" src={`/images/designs/${c.number}.webp`} alt={`Prévia da página ${c.name}`} fill sizes="(max-width: 700px) 90vw, 45vw" />
            </Link>
            <div className="concept-card-title"><div><span>{c.number}</span><h2><Link href={`/designs/${c.slug}`}>{c.name}</Link></h2></div><Link href={`/designs/${c.slug}`} aria-label={`Abrir ${c.name}`} className="concept-open">↗</Link></div>
            <p className="concept-mood">{c.mood}</p>
            <p className="concept-description">{c.description}</p>
            <p className="concept-references">Referências: {c.references.map((r, i) => <span key={r}>{i > 0 && " + "}<a href={references[r].url} target="_blank" rel="noreferrer">{references[r].name}</a></span>)}</p>
          </article>
        ))}
      </section>
      <section id="referencias" className="reference-section">
        <div className="reference-heading"><p className="index-label">BRASIL & MUNDO</p><h2>Olhar para fora.<br />Criar do nosso jeito.</h2><p>Concorrentes de impressão personalizada no Brasil e referências internacionais de fabricação e design de objetos. As propostas são interpretações próprias; fotos, textos e promessas comerciais desses sites não foram copiados.</p></div>
        <div className="reference-list">{references.map((r) => <a key={r.name} href={r.url} target="_blank" rel="noreferrer"><div><span>{r.region} · {r.kind}</span><h3>{r.name} ↗</h3><p>{r.lesson}</p></div></a>)}</div>
      </section>
      <footer className="index-footer"><span>QRLabs 3D · Explorações de design</span><p>Cada opção mantém hero, projetos, processo, ateliê e convite para conversar.</p></footer>
    </main>
  );
}
