import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrinterHero from "../../components/printer-hero";
import { concepts, references } from "../concepts";

const instagram = "https://www.instagram.com/qrlabs3d/";
const whatsapp = `https://wa.me/5581982742579?text=${encodeURIComponent("Olá! Vim pelo site da QRLabs 3D e gostaria de um orçamento para um projeto personalizado.")}`;
const projects = [
  { name: "Decoração do seu jeito", text: "Peças únicas para dar vida à sua decoração.", image: "cogumelo", illustration: "decoracao", alt: "Cogumelo vermelho com bolinhas brancas em uma decoração de festa", post: "DdbqKmrjhpa" },
  { name: "Miniaturas e presentes", text: "Pequenas peças para decorar e presentear.", image: "miniatura", illustration: "miniaturas", alt: "Miniaturas de uma vassoura e uma varinha em suportes pretos", post: "DeYzJYmFoVh" },
  { name: "Peças para sua marca", text: "Criações sob medida para o seu negócio.", image: "display-qr", illustration: "personalizados", alt: "Displays personalizados com QR code em branco e azul", post: "DeYzcX5ur5C" },
];
const steps = [
  ["Conte sua ideia", "Mande uma mensagem pelo WhatsApp. Pode ser uma referência, um rascunho ou aquela ideia que ainda está só na cabeça."],
  ["A gente combina os detalhes", "Conversamos sobre a peça, as possibilidades e o orçamento. Tudo alinhado antes de começar."],
  ["A ideia ganha forma", "Com tudo combinado, a impressão começa. Camada por camada, sua ideia vira uma peça de verdade."],
];

function Icon({ kind }: { kind: "whatsapp" | "instagram" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{kind === "whatsapp" ? <><path d="M20.5 11.5a9 9 0 0 1-13.3 7.9L3 20.5l1.1-4.2a9 9 0 1 1 16.4-4.8Z" /><path d="m8.6 7.2-1 .4c-.4.2-.6.5-.6 1 0 3.8 3 6.8 6.8 6.8.5 0 .8-.2 1-.6l.4-1-2.3-1.1-.8 1a6.7 6.7 0 0 1-3.8-3.8l1-.8-1.1-2.3Z" /></> : <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>}</svg>;
}
function Quote() { return <a className="explore-quote" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Pedir orçamento pelo WhatsApp (nova aba)"><Icon kind="whatsapp" />Pedir orçamento</a>; }
function Instagram() { return <a className="explore-instagram" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Ver Instagram da QRLabs 3D (nova aba)"><Icon kind="instagram" />Ver Instagram</a>; }
function Brand() { return <a href="#inicio" className="explore-brand" aria-label="QRLabs 3D — início"><Image src="/images/logo.jpg" alt="" width={46} height={46} /><span>QRLabs <b>3D</b></span></a>; }

export function generateStaticParams() { return concepts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = concepts.find((c) => c.slug === slug);
  return { title: concept ? `${concept.number} · ${concept.name} — QRLabs 3D` : "Design não encontrado" };
}

export default async function DesignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = concepts.find((c) => c.slug === slug);
  if (!c) notFound();
  const next = concepts[Number(c.number) % concepts.length];
  const previous = concepts[(Number(c.number) + concepts.length - 2) % concepts.length];
  return (
    <div className={`exploration direction-${c.number}`} id="inicio">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <main id="conteudo">
        <section className="explore-hero explore-wrap" aria-labelledby="hero-title">
          <div className="explore-brand-row"><Brand /><span className="explore-location">Recife, Pernambuco</span></div>
          <div className="explore-hero-copy"><p className="explore-eyebrow">{c.kicker}</p><h1 id="hero-title">{c.headline.map((line, i) => <span key={line} className={i === c.headline.length - 1 ? "headline-accent" : undefined}>{line}</span>)}</h1><p className="explore-description">Impressão 3D personalizada, feita em Recife.<br />Conte sua ideia. Vamos criar juntos.</p><Quote /></div>
          <div className="explore-stage"><div className="stage-halo" aria-hidden="true" /><PrinterHero /><span className="stage-caption">Da imaginação à primeira camada.</span><Image className="stage-decoration stage-spool" src="/images/decorations/filament-spool.png" alt="" width={140} height={140} /><Image className="stage-decoration stage-boat" src="/images/decorations/printed-boat.png" alt="" width={140} height={140} /></div>
          <div className="explore-hero-bottom"><span>Feito de ideias e possibilidades.</span><a href="#criacoes">Conheça nossas criações <span aria-hidden="true">↓</span></a></div>
        </section>
        <div className="explore-ribbon" aria-hidden="true"><span>IDEIA</span><span>FORMA</span><span>COR</span><span>PERSONALIDADE</span></div>
        <section className="explore-projects explore-wrap explore-section" id="criacoes" aria-labelledby="creations-title">
          <div className="explore-section-heading"><div><p className="explore-eyebrow">Já saiu da imaginação</p><h2 id="creations-title">Pequenas peças.<br />Grandes <em>possibilidades.</em></h2></div><Instagram /></div>
          <div className="explore-project-grid">{projects.map((p) => <a className="explore-project" href={`https://www.instagram.com/qrlabs3d/p/${p.post}/`} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} — ver projeto no Instagram (nova aba)`} key={p.image}>
            <div className="explore-project-photo"><Image className="explore-photo-backdrop" src={`/images/${p.image}.jpg`} alt="" fill sizes="(max-width: 700px) 90vw, 700px" /><Image className="explore-photo" src={`/images/${p.image}.jpg`} alt={p.alt} fill sizes="(max-width: 700px) 90vw, 700px" /></div>
            <div className="explore-project-caption"><Image src={`/images/services/${p.illustration}.png`} className="explore-illustration" width={100} height={100} alt="" /><div><h3>{p.name}</h3><p>{p.text}</p></div></div>
          </a>)}</div>
        </section>
        <section className="explore-process" id="como-funciona" aria-labelledby="process-title"><div className="explore-wrap explore-section"><div className="explore-section-heading"><div><p className="explore-eyebrow">Do primeiro “oi” à sua peça</p><h2 id="process-title">Começa com<br />uma <em>conversa.</em></h2></div><p className="explore-process-intro">Você não precisa entender de impressão 3D.<br />Só precisa de uma ideia para começar.</p></div><ol className="explore-steps">{steps.map(([title, text], i) => <li key={title}><span className="explore-step-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
        <section className="explore-about explore-wrap explore-section" aria-labelledby="about-title"><div className="explore-about-photo"><Image src="/images/atelie-portrait-v2.png" alt="Retrato de apresentação da QRLabs 3D, com uma caixa Bambu Lab ao fundo" width={1448} height={1086} sizes="(max-width: 700px) 90vw, 560px" /><span>Um começo cheio de ideias.</span></div><div className="explore-about-copy"><p className="explore-eyebrow">Prazer, QRLabs 3D</p><h2 id="about-title">Tecnologia nas peças.<br /><em>Carinho</em> nos detalhes.</h2><p>Somos um pequeno ateliê de impressão 3D em Recife, começando uma história cheia de cor, criatividade e vontade de fazer diferente. Por aqui, a tecnologia encontra o gosto por criar e personalizar. Cada novo projeto é uma oportunidade de experimentar e dar vida a algo especial.</p><Instagram /></div></section>
        <section className="explore-contact" aria-labelledby="contact-title"><div className="explore-wrap"><p className="explore-eyebrow">Vamos tirar essa ideia do papel?</p><h2 id="contact-title">Você imagina.<br />A gente dá <em>forma.</em></h2><p>Conta pra gente o que você quer criar.</p><Quote /><Image src="/images/decorations/logo-keychain.png" className="contact-object" alt="" width={220} height={220} /></div></section>
      </main>
      <footer className="explore-footer explore-wrap"><Brand /><p>Impressão 3D com personalidade.<br />Recife, Pernambuco.</p><Instagram /></footer>
      <aside className="design-notes"><div><span className="index-label">DIREÇÃO {c.number} / {c.name}</span><p>{c.layout}</p><span>Referências: {c.references.map((r, i) => <span key={r}>{i > 0 && " · "}<a href={references[r].url} target="_blank" rel="noreferrer">{references[r].name} ↗</a></span>)}</span></div><Link href="/designs">Comparar as 8 opções ↗</Link></aside>
      <nav className="design-review-nav" aria-label="Navegar pelas opções de design"><Link href={`/designs/${previous.slug}`} aria-label={`Opção anterior: ${previous.name}`}>←</Link><Link href="/designs" className="review-all">Todas as opções</Link><span>{c.number} / 08 <b>{c.name}</b></span><Link href={`/designs/${next.slug}`} aria-label={`Próxima opção: ${next.name}`}>→</Link></nav>
    </div>
  );
}
