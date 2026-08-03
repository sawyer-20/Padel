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
  remate: {
    term: "Smash (remate)",
    status: "machine",
    definitionMd:
      "The smash is the overhead attacking shot, hit hard to try to close out the point. Unlike in tennis, a padel smash rarely ends the point outright: the ball rebounds off the walls and comes back into play. The decision that matters isn't how to smash but when — often a bandeja or a víbora is worth more, because it keeps you at the net instead of pushing you back.",
  },
  bajada: {
    term: "Bajada",
    status: "machine",
    definitionMd:
      "The bajada is the shot you play on a ball after it rebounds off the back wall on your side, hitting it downwards, flat and with pace. It's the aggressive answer to a smash or to a lob that has gone over your head: instead of sending back another defensive lob, you use the wall rebound to take the initiative away from your opponents. Not to be confused with the smash — a bajada is defined by the wall, not by power.",
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
  contrapared: {
    term: "Contrapared",
    status: "machine",
    definitionMd:
      "In a contrapared you deliberately hit the ball against a wall on your own side of the court, so that it travels over the net and lands on the opponents' side. It's an emergency shot: you use it when the ball has already gone past you and there's no way to play it over the net directly. It rarely wins the point — it keeps you in it.",
  },
  manos: {
    term: "Manos (touch)",
    status: "machine",
    definitionMd:
      "Manos means touch: the ability to control the ball with feel rather than force — absorbing a fast ball, dropping a chiquita at an opponent's feet, changing the rhythm of a point. A player is said to have good hands when they solve these balls with softness and precision. In padel it counts for more than power.",
  },
};
