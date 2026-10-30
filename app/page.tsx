import Image from "next/image";
import PrinterHero from "./components/printer-hero";

const instagram = "https://www.instagram.com/qrlabs3d/";
const whatsapp = `https://wa.me/5581982742579?text=${encodeURIComponent("Olá! Vim pelo site da QRLabs 3D e gostaria de um orçamento para um projeto personalizado.")}`;

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
function QuoteButton() {
  return (
    <a className="button button-primary" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Pedir orçamento pelo WhatsApp (nova aba)">
      <WhatsAppIcon />
      <span>Pedir orçamento</span>
    </a>
  );
}
function InstagramLink({ className = "" }: { className?: string }) {
  return (
    <a className={`button button-ghost ${className}`} href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Ver Instagram da QRLabs 3D (nova aba)">
      <InstagramIcon />
      <span>Ver Instagram</span>
    </a>
  );
}
function StepIcon({ kind }: { kind: "conversation" | "details" | "piece" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === "conversation" ? (
        <>
          <path d="M7 17H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6l-5 4v-4Z" />
          <path d="M7 8h10M7 12h6" />
        </>
      ) : kind === "details" ? (
        <>
          <path d="M3 6h4m4 0h10M3 12h10m4 0h4M3 18h4m4 0h10" />
          <circle cx="9" cy="6" r="2" />
          <circle cx="15" cy="12" r="2" />
          <circle cx="9" cy="18" r="2" />
        </>
      ) : (
        <>
          <path d="m12 3 9 5v9l-9 5-9-5V8l9-5Z" />
          <path d="m3 8 9 5 9-5M12 13v9M7.5 5.5l9 5" />
        </>
      )}
    </svg>
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
    description: "Peças únicas para dar vida à sua decoração.",
    illustration: "decoracao",
    image: "cogumelo",
    alt: "Cogumelo vermelho com bolinhas brancas em uma decoração de festa",
    url: "DdbqKmrjhpa",
  },
  {
    name: "Miniaturas e presentes",
    description: "Pequenas peças para decorar e presentear.",
    illustration: "miniaturas",
    image: "miniatura",
    alt: "Miniaturas de uma vassoura e uma varinha em suportes pretos",
    url: "DeYzJYmFoVh",
  },
  {
    name: "Peças para sua marca",
    description: "Criações sob medida para o seu negócio.",
    illustration: "personalizados",
    image: "display-qr",
    alt: "Displays personalizados em branco e azul com QR code para Ribs Buffet",
    url: "DeYzcX5ur5C",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="site-shell" id="inicio">
        <main id="conteudo">
          <section className="hero wrap" aria-labelledby="hero-title">
            <div className="hero-copy">
              <Brand />
              <h1 id="hero-title">
                Da sua ideia.
                <br />
                Do seu{" "}
                <span className="serif-word">
                  jeitinho.
                  <svg viewBox="0 0 410 22" fill="none" aria-hidden="true">
                    <path
                      d="M4 14C108 0 278 0 405 10M28 20C168 10 288 10 376 16"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="hero-description">
                Impressão 3D personalizada, feita em Recife.
              </p>
              <div className="hero-actions">
                <QuoteButton />
              </div>
            </div>
            <PrinterHero />
          </section>
          <section
            className="portfolio wrap section-space"
            id="criacoes"
            aria-labelledby="creations-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">JÁ SAIU DA IMAGINAÇÃO</p>
                <h2 id="creations-title">
                  Pequenas peças.
                  <br />
                  Grandes <em>possibilidades.</em>
                </h2>
              </div>
              <InstagramLink className="portfolio-social" />
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <a
                  className={`project project-${project.illustration}`}
                  key={project.image}
                  href={`https://www.instagram.com/qrlabs3d/p/${project.url}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} — ver projeto no Instagram (nova aba)`}
                >
                  <div className="project-image">
                    <Image
                      className="project-image-backdrop"
                      src={`/images/${project.image}.jpg`}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 900px) 560px, 360px"
                    />
                    <Image
                      className="project-image-photo"
                      src={`/images/${project.image}.jpg`}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 900px) 560px, 360px"
                    />
                  </div>
                  <div className="project-caption">
                    <Image
                      className="project-illustration"
                      src={`/images/services/${project.illustration}.png`}
                      alt=""
                      width={112}
                      height={112}
                      sizes="(max-width: 1100px) 88px, 112px"
                    />
                    <div className="project-copy">
                      <h3>
                        <span className="project-title-base">{project.name}</span>
                        <span className="project-title-hover" aria-hidden="true">
                          {project.name}
                        </span>
                      </h3>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
          <section
            className="process-section"
            id="como-funciona"
            aria-labelledby="process-title"
          >
            <div className="wrap section-space">
              <div className="section-heading process-heading">
                <div>
                  <p className="eyebrow">DO PRIMEIRO “OI” À SUA PEÇA</p>
                  <h2 id="process-title">
                    Tudo começa com
                    <br />
                    uma boa <em>conversa.</em>
                  </h2>
                </div>
                <p className="process-note">
                  Pode chegar com uma ideia ou só uma inspiração.
                </p>
              </div>
              <ol className="steps">
                <li>
                  <div className="step-header">
                    <span className="step-number" aria-hidden="true">01</span>
                    <StepIcon kind="conversation" />
                  </div>
                  <h3>Conta sua ideia</h3>
                  <p>
                    Conta o que você imaginou. Uma foto, desenho ou referência
                    já ajuda a começar a conversa.
                  </p>
                </li>
                <li>
                  <div className="step-header">
                    <span className="step-number" aria-hidden="true">02</span>
                    <StepIcon kind="details" />
                  </div>
                  <h3>A gente pensa junto</h3>
                  <p>
                    A gente combina as possibilidades, os detalhes e o orçamento
                    para criar uma peça do seu jeito.
                  </p>
                </li>
                <li>
                  <div className="step-header">
                    <span className="step-number" aria-hidden="true">03</span>
                    <StepIcon kind="piece" />
                  </div>
                  <h3>A ideia ganha forma</h3>
                  <p>
                    Com tudo combinado, a impressão começa. Camada por camada,
                    sua ideia vira uma peça de verdade.
                  </p>
                </li>
              </ol>
            </div>
          </section>
          <section
            className="about wrap section-space"
            id="sobre"
            aria-labelledby="about-title"
          >
            <div className="about-photo">
              <Image
                src="/images/atelie-portrait-v2.png"
                alt="Retrato de apresentação da QRLabs 3D, com uma caixa Bambu Lab ao fundo"
                width={1448}
                height={1086}
                sizes="(max-width: 650px) 90vw, 380px"
              />
              <span className="photo-label handwritten">
                um começo cheio de ideias ♡
              </span>
              <PrintDecoration item="filament-spool" className="print-spool" />
            </div>
            <div className="about-copy">
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
              <InstagramLink className="about-social" />
            </div>
          </section>
          <section className="contact-section" aria-labelledby="contact-title">
            <div className="wrap contact-inner">
              <PrintDecoration item="logo-keychain" className="print-keychain" />
              <p className="eyebrow">VAMOS TIRAR ESSA IDEIA DO PAPEL?</p>
              <h2 id="contact-title">
                Você imagina.
                <br />A gente dá <em>forma.</em>
              </h2>
              <p>Conta pra gente o que você quer criar.</p>
              <QuoteButton />
              <PrintDecoration item="printed-boat" className="print-boat" />
            </div>
          </section>
        </main>
        <footer className="site-footer wrap">
          <Brand />
          <p>
            Impressão 3D com personalidade.
            <br />
            <span>Recife, Pernambuco.</span>
          </p>
          <div>
            <a className="text-link" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da QRLabs 3D (nova aba)">
              <InstagramIcon /> Instagram
            </a>
            <a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da QRLabs 3D (nova aba)">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
          <span className="footer-note">Feito de ideias e afeto.</span>
        </footer>
      </div>
    </>
  );
}
