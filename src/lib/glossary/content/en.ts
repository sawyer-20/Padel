import type { GlossaryContent } from "../types";

// Original content, written from general, well-established padel knowledge (never
// copied from blogs or existing channels — see PROJECT.md §3/§4).
// Status "machine": not yet reviewed by anyone with padel expertise.
export const en: Record<string, GlossaryContent> = {
  bandeja: {
    term: "Bandeja",
    status: "machine",
    definitionMd:
      "The bandeja is a controlled, defensive overhead shot, usually played to answer an opponent's lob. Instead of going for a hard smash, you hit the ball with a softer, controlled motion and hold your position at the net instead of retreating. It's one of padel's most distinctive shots, with no direct tennis equivalent.",
  },
  vibora: {
    term: "Víbora",
    status: "machine",
    definitionMd:
      'The víbora is a more aggressive variant of the bandeja: instead of a controlled motion, you put sidespin on the ball with more pace, producing a lower, harder-to-return trajectory. The name means "snake" in Spanish, after the sideways arm motion.',
  },
  chiquita: {
    term: "Chiquita",
    status: "machine",
    definitionMd:
      "The chiquita is a soft, low shot aimed deliberately at an opponent's feet when they're near the net. It forces them into an upward defensive volley, buying you time to move into the net with the advantage.",
  },
  globo: {
    term: "Lob",
    status: "machine",
    definitionMd:
      "The lob is a high, deep shot played over opponents standing at the net, forcing them back or buying you (and your partner) time to reach the net yourselves. It's probably padel's most-used tactical shot — poorly executed, it hands the opponent an easy bandeja; well executed, it flips the point's momentum.",
  },
  bajada: {
    term: "Smash",
    status: "machine",
    definitionMd:
      "Padel's most direct attacking shot: hitting the ball overhead with power, usually after an opponent's weak lob, trying to end the point or force an error. In Spanish it's often called \"bajada\".",
  },
  contrapared: {
    term: "Contrapared",
    status: "machine",
    definitionMd:
      "Returning a ball after it bounces off the back wall on your side. The key is letting the ball hit the floor first and then the wall (or vice versa, depending on the trajectory) before you return it, using the bounce rather than fighting it.",
  },
  "salida-de-pared": {
    term: "Salida de pared",
    status: "machine",
    definitionMd:
      "The technique for returning a ball that comes straight off the side or back wall without being caught off guard. Rather than attacking, the usual goal is a controlled, high return that lets you reset your position in the point.",
  },
  "net-positioning": {
    term: "Net positioning",
    status: "machine",
    definitionMd:
      "The net is padel's dominant position — whoever holds it has more attacking options and cuts down the opponent's angles. Good positioning means staying close to the net without leaving gaps behind you or drifting out of sync with your partner, so you cover the court together.",
  },
  x3: {
    term: "X3",
    status: "machine",
    definitionMd:
      "X3 is a tactical positioning pattern where all four players (both pairs) tend to line up at the net at roughly the same time, creating a direct exchange between the two teams in that zone. It's a concept commonly drilled in training to sharpen reflexes and net positioning.",
  },
  manos: {
    term: "Manos",
    status: "machine",
    definitionMd:
      "Refers to fast volley exchanges at the net, when both pairs are facing each other at close range. It rewards quick reflexes and a racket held well in front of the body more than raw power.",
  },
};
