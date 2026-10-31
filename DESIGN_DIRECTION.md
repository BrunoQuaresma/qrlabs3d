# QRLabs 3D design direction

Last updated: October 31, 2026.

The website should make custom 3D printing feel tangible, creative, and approachable, then invite visitors to request a quote through WhatsApp. This document records the current design decisions and the areas still open for exploration. Business facts, contact details, and unconfirmed service capabilities live in [BUSINESS_CONTEXT.md](./BUSINESS_CONTEXT.md).

The gallery uses an editorial layout, with the owner's decisions recorded below.

## Hero and page structure

- Keep the 3D printing animation as the main hero visual and use the actual QRLabs 3D logo.
- Use a simple top bar: logo and brand on the left, “Recife, Pernambuco” on the right, without navigation links.
- Preserve the hero composition: an introductory eyebrow, the large serif “Da sua ideia. Do seu jeitinho.” slogan, supporting copy and quote action beside the printer. The SEO update uses “Impressão 3D personalizada em Recife” as the visible eyebrow and semantic H1; the slogan remains a styled paragraph. Supporting copy names personalized gifts, miniatures, decoration, and pieces for a brand. Stack the copy and printer on mobile. Omit the hero's bottom strip, creations link, and caption beneath the printer.
- Align the hero to the same content container as the other sections. Improve text and printer proportions within that width rather than widening the hero independently.
- Give the headline, supporting text, and button label enough visual weight. Button text should remain proportionate to its surrounding padding on mobile as well as desktop.

## Color and typography

Build on the logo's violet, magenta, turquoise, cyan, coral, and warm orange tones. Use soft brand-colored surfaces, darker readable text, and stronger gradients for primary actions.

Primary buttons use a violet-to-magenta gradient, shifting toward teal and violet on hover or keyboard focus. Selected emphasized words in section headings retain their italic styling with a brand gradient. This heading treatment is distinct from the gallery title interaction described below.

Keep colors and gradients centralized in the semantic tokens in `app/globals.css`. Exact token values remain implementation details; avoid copying a second palette into this document.

## 3D imagery and motion

Use real project photos to show completed work, supported by tactile 3D illustrations. Overlapping illustrations and printing-related objects are part of the desired visual language. The rejected prototype designs do not constitute a rejection of 3D styling.

Decorative objects should be recognizable and connected to the business. The current selection is a printed boat and a keychain based on the QRLabs 3D logo. The filament decoration has been removed from the founder portrait. These replaced generic stars and an unsuccessful painting-tools illustration.

Keep decorative parallax noticeable on desktop and clear of text and actions. Preserve the existing reduced-motion behavior, keyboard focus states, and printer image fallback when changing the design. The printer scene's playback and fallback behavior are documented in [README.md](./README.md#website).

## Actions and links

| Role | Visible label | Treatment |
| --- | --- | --- |
| Primary quote action | Pedir orçamento | Brand-gradient button with WhatsApp icon |
| Instagram profile | Ver Instagram | Ghost button with Instagram icon |

Use these labels and treatments consistently wherever the same action appears. Buttons use a fully rounded shape, including its outlined WhatsApp icon for quote actions. Keep hover and keyboard focus feedback clear, and maintain readable labels across gradient states. The short quote label refines the earlier suggested wording in the business brief; the destination remains WhatsApp.

## Gallery direction and provisional layout

The gallery should connect real work to customization possibilities. Keep the photographed objects sharp and recognizable, and crop them to fill their frames without blurred image padding.

Recent requests established these presentation preferences:

- Remove category badges, item numbers, and external-link icons.
- Use concise, business-related headings and descriptions with balanced visual weight across items.
- Keep gallery titles neutral at rest, with a gradient on hover or focus, and retain photo zoom feedback.
- Use the Instagram ghost button near the section heading instead of duplicated introductory copy and a second promotional link below the gallery.

Use a serif section heading and straightforward captions beneath the photos, while retaining the current brand colors. The three desktop cards have equal widths and aligned image and caption edges. Use square, filled photo frames to limit excessive cropping of the existing images. Omit caption dividers, overlapping illustrations, staggered positions, and mobile offsets. Stack the cards evenly on smaller screens.

The current headings are “Decoração do seu jeito,” “Miniaturas e presentes,” and “Peças para sua marca.” They describe the current examples; they do not settle the business's full service offering or target audience.

## Process and atelier introduction

Instagram buttons use a neutral outline and subtle neutral hover fill. The founder portrait has a white printed-photo border and a soft layered shadow for depth, while retaining its slight rotation.

On desktop (above 900px), floating print decorations travel from -64px to +64px and rotate from -6° to +6° as they scroll through the viewport. Keep the smaller-screen motion restrained and respect reduced-motion preferences.

Present “DO PRIMEIRO ‘OI’ À SUA PEÇA” as an open sequence of steps, without individual card backgrounds or borders. Keep the introduction integrated with the section rather than using a tilted italic note and decorative arrow.

Before the contact section, use native disclosure rows for ordering FAQs. Keep answers server-rendered, with restrained rules and existing typography. They explain customization, quote information, and how to discuss fulfillment without promising unconfirmed services.

Use an editorial process layout and copy: a serif “Começa com uma conversa.” heading with the introductory sentence alongside it, three equal columns with large italic step numbers, thin rules, and text below. On mobile, stack the steps with numbers beside the copy. Retain the current section background gradient.

Use an equal-column atelier layout, serif heading, and existing one-paragraph description. Keep the portrait free of the filament spool decoration. The photo caption reads “Paula Ribeiro - Fundadora de QRLabs 3D”. The current portrait is generated from five owner-provided identity references, with natural lighting and a quiet creative atelier background. Preserve previous portraits and keep the prompt and provenance in `design/paula-founder-portrait.json`.

## Exploration history

The eight subsequent design alternatives and their comparison gallery were removed after the selected editorial direction was incorporated into the homepage. The current design is described above without depending on those prototypes.

- All six alternative site prototypes and their comparison gallery were removed at the owner's request. No detailed explanation of their failure was established; do not infer a general prohibition on bold or dimensional design.
- Process cards were tried and then explicitly removed. Use the open layout as the current direction.
- The painting-tools decoration was rejected. An articulated dragon was proposed, then superseded by the owner's choice of a branded keychain.
- Always-on gallery title gradients and title underlines were superseded by the current hover/focus gradient treatment.

## Sources and remaining decisions

This direction consolidates the October 30, 2026 chats “Align site colors with logo,” “Create six bold 3D site versions,” and “Add QR Labs business context doc,” plus the owner's clarification in “Review chats for design docs” that the gallery layout is uncertain.

Asset sources and generation records:

- [Image sources](./public/images/SOURCES.md)
- [Service illustrations](./design/service-illustrations.json)
- [Printing decorations](./design/printing-decorations.json)
- [Atelier portrait](./design/atelier-portrait.json)

The reasons behind the six earlier rejected prototypes remain open. Customer priorities, fulfillment, materials, and other service promises remain the business questions listed in the business brief.
