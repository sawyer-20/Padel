import type { SituationContent } from "../types";

// Original content (never copied from the official regulation) — see PROJECT.md §1.2/§6.2.
// Status "machine": not yet reviewed by anyone with padel expertise.
export const en: Record<string, SituationContent> = {
  "wall-bounce-still-in-play": {
    question: "The ball hit the wall on my side after bouncing on the ground — can I still return it?",
    status: "machine",
    answerMd:
      "Yes. In padel, once the ball has bounced on your side, it stays in play even if it then hits a wall or the metal fencing around the court — the walls are part of the playing area, just like the floor. You only lose the point if the ball bounces a **second time** before you return it.",
  },
  "net-touch-on-serve": {
    question: "The serve touched the net and still landed in the correct box — is that a fault?",
    status: "machine",
    answerMd:
      "No. If the ball touches the net or the posts during the serve and still lands inside the correct service box, it doesn't count as a fault — the serve is simply replayed, with no penalty for the server.",
  },
  "ball-out-over-end-wall": {
    question: "After correctly bouncing on my side, the ball went out over the back wall — is the point already decided?",
    status: "machine",
    answerMd:
      "Not necessarily. If the court has a safety zone and allows out-of-court play, the opponent can still chase the ball outside and return it. The point is only decided if the ball goes out where out-of-court play isn't authorized, or if, once outside, it bounces a second time or touches something unrelated to the game.",
  },
  "return-from-outside-court": {
    question: "A player left the court to return the ball and succeeded — is the point valid?",
    status: "machine",
    answerMd:
      'Yes, as long as the court allows out-of-court play (see "Playing outside the court"). It\'s one of padel\'s most distinctive rules: with enough space and an opening, players can run out through the side, return the ball, and come back into play.',
  },
  "ball-touches-player": {
    question: "The ball touched me before I could return it — do I always lose the point?",
    status: "machine",
    answerMd:
      "It depends on when it happens. If it was while receiving a serve, the point automatically goes to the server. During normal play (outside the serve), whoever gets touched by the ball always loses the point, even if the ball was already headed out of the court.",
  },
  "serve-lands-outside-box": {
    question: "The serve landed outside the correct box — is that a fault?",
    status: "machine",
    answerMd:
      "Yes. The serve must bounce inside the opponent's service box, on the correct side (the lines count as good). If it lands outside, it's a fault — and as with any serve, there's a second attempt before the point is lost.",
  },
  "double-hit": {
    question: "I accidentally hit the ball twice in a row — what happens?",
    status: "machine",
    answerMd:
      "You lose the point — it's considered a \"double hit\". There's one exception: if you and your partner both go for the ball at the same time and one of you hits the ball while it also touches your partner's racket, that doesn't count as a double hit.",
  },
  "ball-splits": {
    question: "The ball split apart in the middle of the point — what happens?",
    status: "machine",
    answerMd:
      'The point is replayed from scratch ("let"), with no penalty for either team. The same applies if something unrelated to the game unexpectedly interrupts the point.',
  },
};
