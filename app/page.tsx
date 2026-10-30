import Image from "next/image";
import PrinterHero from "./components/printer-hero";

const instagram = "https://www.instagram.com/qrlabs3d/";
const whatsapp = `https://wa.me/5581982742579?text=${encodeURIComponent("Olá! Vim pelo site da QRLabs 3D e gostaria de um orçamento para um projeto personalizado.")}`;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M40 7v66M7 40h66M17 17l46 46M17 63l46-46" />
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
    name: "Um toque de fantasia",
    type: "DECORAÇÃO",
    image: "cogumelo",
    alt: "Cogumelo vermelho com bolinhas brancas em uma decoração de festa",
    url: "DdbqKmrjhpa",
    color: "peach",
  },
  {
    name: "Magia nos detalhes",
    type: "MINIATURAS",
    image: "miniatura",
    alt: "Miniaturas de uma vassoura e uma varinha em suportes pretos",
    url: "DeYzJYmFoVh",
    color: "lilac",
  },
  {
    name: "A cara do seu negócio",
    type: "PERSONALIZADOS",
    image: "display-qr",
    alt: "Displays personalizados em branco e azul com QR code para Ribs Buffet",
    url: "DeYzcX5ur5C",
    color: "yellow",
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
                <a
                  className="button"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vamos criar sua peça? <Arrow diagonal />
                </a>
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
              <p>
                Um pouco do que ganha forma por aqui.
                <br />A próxima ideia pode ser a sua.
              </p>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <a
                  className={`project ${project.color}`}
                  key={project.image}
                  href={`https://www.instagram.com/qrlabs3d/p/${project.url}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} — ver projeto no Instagram (nova aba)`}
                >
                  <div className="project-image">
                    <Image
                      src={`/images/${project.image}.jpg`}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 650px) 90vw, 360px"
                    />
                    <span className="project-tag">{project.type}</span>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <div className="project-caption">
                    <h3>{project.name}</h3>
                    <span className="project-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <a
              className="text-link instagram-link"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mais criações e bastidores no @qrlabs3d <Arrow diagonal />
            </a>
          </section>
          <section
            className="process-section"
            id="como-funciona"
            aria-labelledby="process-title"
          >
            <div className="wrap section-space">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">DO PRIMEIRO “OI” À SUA PEÇA</p>
                  <h2 id="process-title">
                    Tudo começa com
                    <br />
                    uma boa <em>conversa.</em>
                  </h2>
                </div>
                <span className="handwritten process-note">
                  Pode chegar com uma ideia
                  <br />
                  ou só uma inspiração! <span aria-hidden="true">↙</span>
                </span>
              </div>
              <ol className="steps">
                <li>
                  <span className="step-number peach">01</span>
                  <h3>Conta sua ideia</h3>
                  <p>
                    Chama no WhatsApp e conta o que você imaginou. Uma foto,
                    referência ou desenho já ajuda.
                  </p>
                </li>
                <li>
                  <span className="step-number lilac">02</span>
                  <h3>A gente pensa junto</h3>
                  <p>
                    Conversamos sobre as possibilidades, os detalhes da peça e o
                    orçamento do seu projeto.
                  </p>
                </li>
                <li>
                  <span className="step-number yellow">03</span>
                  <h3>A ideia ganha forma</h3>
                  <p>
                    Com tudo combinado, é hora de transformar a ideia em uma
                    peça do seu jeitinho.
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
                src="/images/atelie.jpg"
                alt="Registro do início da QRLabs 3D, com a caixa da impressora 3D"
                width={640}
                height={854}
                sizes="(max-width: 650px) 90vw, 380px"
              />
              <span className="photo-label handwritten">
                um começo cheio de ideias ♡
              </span>
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
                diferente.
              </p>
              <p>
                Por aqui, a tecnologia encontra o gosto por criar e
                personalizar. Cada novo projeto é uma oportunidade de
                experimentar e dar vida a algo especial.
              </p>
              <a
                className="text-link"
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Vem acompanhar nossa história <Arrow diagonal />
              </a>
            </div>
            <Spark className="about-spark" />
          </section>
          <section className="contact-section" aria-labelledby="contact-title">
            <div className="wrap contact-inner">
              <Spark className="contact-spark" />
              <p className="eyebrow">VAMOS TIRAR ESSA IDEIA DO PAPEL?</p>
              <h2 id="contact-title">
                Você imagina.
                <br />A gente dá <em>forma.</em>
              </h2>
              <p>Conta pra gente o que você quer criar.</p>
              <a
                className="button button-dark"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir orçamento pelo WhatsApp <Arrow diagonal />
              </a>
              <span className="contact-doodle" aria-hidden="true">
                ✳
              </span>
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
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              Instagram <Arrow diagonal />
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp <Arrow diagonal />
            </a>
          </div>
          <span className="footer-note">Feito de ideias e afeto.</span>
        </footer>
      </div>
    </>
  );
}
