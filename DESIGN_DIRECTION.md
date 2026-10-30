# QRLabs 3D design direction

Last updated: October 30, 2026.

The website should make custom 3D printing feel tangible, creative, and approachable, then invite visitors to request a quote through WhatsApp. This document records the current design decisions and the areas still open for exploration. Business facts, contact details, and unconfirmed service capabilities live in [BUSINESS_CONTEXT.md](./BUSINESS_CONTEXT.md).

The gallery layout is provisional. Its current arrangement is an implementation to evaluate, not an approved template for future work.

## Hero and page structure

- Keep the 3D printing animation as the main hero visual and use the actual QRLabs 3D logo.
- Keep the current direction without a navbar.
- Align the hero to the same content container as the other sections. Improve text and printer proportions within that width rather than widening the hero independently.
- Give the headline, supporting text, and button label enough visual weight. Button text should remain proportionate to its surrounding padding on mobile as well as desktop.

## Color and typography

Build on the logo's violet, magenta, turquoise, cyan, coral, and warm orange tones. Use soft brand-colored surfaces, darker readable text, and stronger gradients for primary actions.

Primary buttons use a violet-to-magenta gradient, shifting toward teal and violet on hover or keyboard focus. Selected emphasized words in section headings retain their italic styling with a brand gradient. This heading treatment is distinct from the gallery title interaction described below.

Keep colors and gradients centralized in the semantic tokens in `app/globals.css`. Exact token values remain implementation details; avoid copying a second palette into this document.

## 3D imagery and motion

Use real project photos to show completed work, supported by tactile 3D illustrations. Overlapping illustrations and printing-related objects are part of the desired visual language. The rejected prototype designs do not constitute a rejection of 3D styling.

Decorative objects should be recognizable and connected to the business. The current selection is a filament spool, a printed boat, and a keychain based on the QRLabs 3D logo. These replaced generic stars and an unsuccessful painting-tools illustration.

Keep decorative parallax subtle and clear of text and actions. Preserve the existing reduced-motion behavior, keyboard focus states, and printer image fallback when changing the design. The printer scene's playback and fallback behavior are documented in [README.md](./README.md#website).

## Actions and links

| Role | Visible label | Treatment |
| --- | --- | --- |
| Primary quote action | Pedir orçamento | Brand-gradient button with WhatsApp icon |
| Instagram profile | Ver Instagram | Ghost button with Instagram icon |

Use these labels and treatments consistently wherever the same action appears. Keep hover and keyboard focus feedback clear, and maintain readable labels across gradient states. The short quote label refines the earlier suggested wording in the business brief; the destination remains WhatsApp.

## Gallery direction and provisional layout

The gallery should connect real work to customization possibilities. Keep the photographed objects sharp and recognizable, crop carefully, and use a blurred version of the photo to fill unused image space where appropriate.

Recent requests established these presentation preferences:

- Remove category badges, item numbers, and external-link icons.
- Use concise, business-related headings and descriptions with balanced visual weight across items.
- Keep gallery titles neutral at rest, with a gradient on hover or focus, and retain photo zoom feedback.
- Use the Instagram ghost button near the section heading instead of duplicated introductory copy and a second promotional link below the gallery.

**The spatial arrangement remains undecided.** The current implementation places an overlapping illustration on the left and a title and description to its right, beneath each photo. It aims for one-line titles and balanced two-line descriptions with a shared text-column width. These are characteristics of the current experiment, not fixed requirements. Future proposals may change placement, overlap, proportions, and line counts.

The current headings are “Decoração do seu jeito,” “Miniaturas e presentes,” and “Peças para sua marca.” They describe the current examples; they do not settle the business's full service offering or target audience.

## Process and atelier introduction

Present “DO PRIMEIRO ‘OI’ À SUA PEÇA” as an open sequence of steps, without individual card backgrounds or borders. Keep the introduction integrated with the section rather than using a tilted italic note and decorative arrow.

Keep the atelier description as one paragraph. The current portrait is an AI-edited version of the original photo, with a Bambu Lab shipping box replacing an inaccurate generated printer. Preserve original assets and keep edit provenance in the source records.

## Rejected explorations

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

The gallery composition needs further review. The reasons behind the six rejected prototypes remain open. Customer priorities, fulfillment, materials, and other service promises remain the business questions listed in the business brief.
