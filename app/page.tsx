import Image from "next/image";
import type { Metadata } from "next";
import PrinterHero from "./components/printer-hero";
import ScrollReveals from "./components/scroll-reveals";
import TrackedLink from "./components/tracked-link";
import { businessStructuredData, site } from "./lib/site";

const { instagram, whatsapp } = site;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    url: "/",
    locale: "pt_BR",
    type: "website",
  },
};

function PrintDecoration({ item, className }: { item: string; className: string }) {
  return (
    <span className={`print-decoration ${className}`} aria-hidden="true">
      <span className="print-decoration-motion">
        <Image
          src={`/images/decorations/${item}.png`}
          alt=""
          fill
          sizes="(max-width: 650px) 96px, (max-width: 800px) 112px, 176px"
          draggable={false}
        />
      </span>
    </span>
  );
}
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.5a9 9 0 0 1-13.3 7.9L3 20.5l1.1-4.2a9 9 0 1 1 16.4-4.8Z" />
      <path d="m8.6 7.2-1 .4c-.4.2-.6.5-.6 1 0 3.8 3 6.8 6.8 6.8.5 0 .8-.2 1-.6l.4-1-2.3-1.1-.8 1a6.7 6.7 0 0 1-3.8-3.8l1-.8-1.1-2.3Z" />
    </svg>
  );
}
function QuoteButton({ location }: { location: "hero" | "contact" }) {
  return (
    <TrackedLink event={{ name: "whatsapp_click", params: { location } }} className="button button-primary" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Pedir orçamento pelo WhatsApp (nova aba)">
      <WhatsAppIcon />
      <span>Pedir orçamento</span>
    </TrackedLink>
  );
}
function InstagramLink({ className = "", revealOrder, location }: { className?: string; revealOrder?: number; location: "portfolio" | "about" }) {
  return (
    <TrackedLink event={{ name: "instagram_click", params: { location } }} className={`button button-outline ${className}`} data-reveal={revealOrder !== undefined || undefined} data-reveal-order={revealOrder} href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Ver Instagram da QRLabs 3D (nova aba)">
      <InstagramIcon />
      <span>Ver Instagram</span>
    </TrackedLink>
  );
}
function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="QRLabs 3D — início">
      <Image src="/images/logo.jpg" alt="" width={48} height={48} />
      <span>
        QRLabs <span className="brand-3d">3D</span>
      </span>
    </a>
  );
}
const projects = [
  {
    name: "Decoração do seu jeito",
    description: "Decoração personalizada em 3D para festas e ambientes, como este cogumelo vermelho e branco.",
    illustration: "decoracao",
    image: "cogumelo",
    alt: "Cogumelo vermelho com bolinhas brancas impresso em 3D pela QRLabs 3D para decoração de festa",
    url: "DdbqKmrjhpa",
  },
  {
    name: "Miniaturas e presentes",
    description: "Miniaturas impressas em 3D para decorar e dar um presente com a cara de quem recebe.",
    illustration: "miniaturas",
    image: "miniatura",
    alt: "Miniaturas de uma vassoura e uma varinha em suportes pretos",
    url: "DeYzJYmFoVh",
  },
  {
    name: "Peças para sua marca",
    description: "Displays com QR code e peças personalizadas em 3D para apresentar sua marca.",
    illustration: "personalizados",
    image: "display-qr",
    alt: "Displays personalizados em branco e azul com QR code para Ribs Buffet",
    url: "DeYzcX5ur5C",
  },
];

const questions = [
  {
    question: "O que posso encomendar com impressão 3D?",
    answer:
      "Nosso portfólio inclui decoração de festa, miniaturas para presentear e displays com QR code para negócios. Tem uma ideia de presente personalizado, lembrancinha ou outra peça? Envie uma referência para avaliarmos as possibilidades de impressão e personalização.",
  },
  {
    question: "Preciso ter um arquivo 3D pronto?",
    answer:
      "Você pode começar a conversa com uma foto de referência, um rascunho ou uma descrição da ideia. Se já tiver um arquivo 3D, envie também. A gente avalia o projeto e combina o que será necessário antes de iniciar a produção.",
  },
  {
    question: "Posso personalizar nome, cor ou tamanho?",
    answer:
      "Conte quais detalhes gostaria de mudar: nome, cores, tamanho, tema ou identidade da sua marca. As opções dependem da peça e são combinadas durante o orçamento.",
  },
  {
    question: "Quanto custa uma peça personalizada em 3D?",
    answer:
      "O orçamento é feito para cada projeto. Pelo WhatsApp, envie sua referência, o tamanho aproximado, a quantidade desejada e quando precisa da peça. Com esses detalhes, conversamos sobre as possibilidades, o valor e o prazo antes de começar.",
  },
  {
    question: "Como recebo minha encomenda em Recife?",
    answer:
      "A QRLabs 3D é um ateliê em Recife, Pernambuco. Informe seu bairro e a data em que precisa da peça na conversa pelo WhatsApp para consultar as opções de recebimento e os prazos disponíveis para seu pedido.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="site-shell" id="inicio">
        <header className="site-topbar wrap">
          <Brand />
          <span className="site-location">Recife, Pernambuco</span>
        </header>
        <ScrollReveals>
          <section className="hero wrap" aria-labelledby="hero-title">
            <div className="hero-copy">
              <h1 id="hero-title" className="eyebrow hero-eyebrow" data-reveal="intro">
                Impressão 3D personalizada em Recife
              </h1>
              <p className="hero-title" data-reveal="intro" data-reveal-order="1">
                <span>Da sua ideia.</span>
                <span className="hero-title-accent">Do seu jeitinho.</span>
              </p>
              <p className="hero-description" data-reveal="intro" data-reveal-order="2">
                Presentes personalizados, miniaturas, decoração e peças para
                sua marca. Feitos em Recife, a partir da sua ideia.
              </p>
              <div className="hero-actions" data-reveal="intro" data-reveal-order="3">
                <QuoteButton location="hero" />
              </div>
            </div>
            <div className="hero-stage">
              <PrinterHero />
            </div>
          </section>
          <section
            className="portfolio wrap section-space"
            id="criacoes"
            aria-labelledby="creations-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow" data-reveal>JÁ SAIU DA IMAGINAÇÃO</p>
                <h2 id="creations-title" data-reveal data-reveal-order="1">
                  Pequenas peças.
                  <br />
                  Grandes <em>possibilidades.</em>
                </h2>
              </div>
              <InstagramLink location="portfolio" className="portfolio-social" revealOrder={2} />
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <TrackedLink
                  event={{
                    name: "select_content",
                    params: {
                      content_type: "project",
                      content_id: project.illustration,
                      content_name: project.name,
                      location: "portfolio",
                    },
                  }}
                  className={`project project-${project.illustration}`}
                  key={project.image}
                  href={`https://www.instagram.com/qrlabs3d/p/${project.url}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} — ver projeto no Instagram (nova aba)`}
                >
                  <div className="project-image" data-reveal data-reveal-order={index}>
                    <Image
                      className="project-image-photo"
                      src={`/images/${project.image}.jpg`}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 900px) 560px, 360px"
                    />
                  </div>
                  <div className="project-caption">
                    <div className="project-copy">
                      <h3 data-reveal data-reveal-order={index}>
                        <span className="project-title-base">{project.name}</span>
                        <span className="project-title-hover" aria-hidden="true">
                          {project.name}
                        </span>
                      </h3>
                      <p data-reveal data-reveal-order={index + 1}>{project.description}</p>
                    </div>
                  </div>
                </TrackedLink>
              ))}
            </div>
          </section>
          <section
            className="process-section"
            id="como-funciona"
            aria-labelledby="process-title"
          >
            <div className="wrap section-space">
              <div className="section-heading process-heading" data-reveal>
                <div>
                  <p className="eyebrow">DO PRIMEIRO “OI” À SUA PEÇA</p>
                  <h2 id="process-title">
                    Começa com
                    <br />
                    uma <em>conversa.</em>
                  </h2>
                </div>
                <p className="process-note">
                  Você não precisa entender de impressão 3D.
                  <br />
                  Só precisa de uma ideia para começar.
                </p>
              </div>
              <ol className="steps">
                <li data-reveal>
                  <span className="step-number" aria-hidden="true">01</span>
                  <div className="step-copy">
                    <h3>Conte sua ideia</h3>
                    <p>
                      Mande uma mensagem pelo WhatsApp. Pode ser uma referência,
                      um rascunho ou aquela ideia que ainda está só na cabeça.
                    </p>
                  </div>
                </li>
                <li data-reveal data-reveal-order="1">
                  <span className="step-number" aria-hidden="true">02</span>
                  <div className="step-copy">
                    <h3>A gente combina os detalhes</h3>
                    <p>
                      Conversamos sobre a peça, as possibilidades e o orçamento.
                      Combinamos cada detalhe antes de começar a impressão.
                    </p>
                  </div>
                </li>
                <li data-reveal data-reveal-order="2">
                  <span className="step-number" aria-hidden="true">03</span>
                  <div className="step-copy">
                    <h3>A ideia ganha forma</h3>
                    <p>
                      Com tudo combinado, a impressão começa. Camada por camada,
                      sua ideia ganha forma e vira uma peça feita para você.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>
          <section
            className="about wrap section-space"
            id="sobre"
            aria-labelledby="about-title"
          >
            <div className="about-photo" data-reveal="image">
              <Image
                src="/images/paula-ribeiro-founder-v2.png"
                alt="Paula Ribeiro, fundadora da QRLabs 3D, sorrindo em um ateliê criativo"
                width={1355}
                height={1160}
                sizes="(max-width: 700px) 90vw, (max-width: 1280px) 45vw, 535px"
              />
              <span className="photo-label">
                Paula Ribeiro - Fundadora de QRLabs 3D
              </span>
            </div>
            <div className="about-copy" data-reveal data-reveal-order="1">
              <p className="eyebrow">PRAZER, QRLABS 3D</p>
              <h2 id="about-title">
                Tecnologia nas peças.
                <br />
                <em>Carinho</em> nos detalhes.
              </h2>
              <p>
                Somos um pequeno ateliê de impressão 3D em Recife, começando uma
                história cheia de cor, criatividade e vontade de fazer
                diferente. Por aqui, a tecnologia encontra o gosto por criar e
                personalizar. Cada novo projeto é uma oportunidade de
                experimentar e dar vida a algo especial.
              </p>
              <InstagramLink location="about" className="about-social" />
            </div>
          </section>
          <section className="faq wrap section-space" id="duvidas" aria-labelledby="faq-title">
            <div className="faq-heading">
              <p className="eyebrow">ANTES DE PEDIR SEU ORÇAMENTO</p>
              <h2 id="faq-title">Como encomendar sua <em>peça personalizada.</em></h2>
              <p className="faq-intro">Da primeira ideia aos últimos detalhes, a gente te ajuda a começar.</p>
            </div>
            <div className="faq-list">
              {questions.map(({ question, answer }) => (
                <details key={question}>
                  <summary>
                    <span>{question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M5 12h14" />
                        <path className="faq-toggle-vertical" d="M12 5v14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-answer">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
          <section className="contact-section" id="contato" aria-labelledby="contact-title">
            <div className="wrap contact-inner">
              <PrintDecoration item="logo-keychain" className="print-keychain" />
              <p className="eyebrow" data-reveal>VAMOS TIRAR ESSA IDEIA DO PAPEL?</p>
              <h2 id="contact-title" data-reveal data-reveal-order="1">
                Você imagina.
                <br />A gente dá <em>forma.</em>
              </h2>
              <p data-reveal data-reveal-order="2">Conta pra gente o que você quer criar.</p>
              <div data-reveal data-reveal-order="3"><QuoteButton location="contact" /></div>
              <PrintDecoration item="printed-boat" className="print-boat" />
            </div>
          </section>
        </ScrollReveals>
        <footer className="site-footer wrap">
          <Brand />
          <p>
            Impressão 3D personalizada.
            <br />
            <span>Recife, Pernambuco.</span>
          </p>
          <div>
            <TrackedLink event={{ name: "instagram_click", params: { location: "footer" } }} className="text-link" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da QRLabs 3D (nova aba)">
              <InstagramIcon /> Instagram
            </TrackedLink>
            <TrackedLink event={{ name: "whatsapp_click", params: { location: "footer" } }} className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da QRLabs 3D (nova aba)">
              <WhatsAppIcon /> WhatsApp: (81) 98274-2579
            </TrackedLink>
          </div>
          <span className="footer-note">Feito de ideias e afeto.</span>
        </footer>
      </div>
    </>
  );
}
