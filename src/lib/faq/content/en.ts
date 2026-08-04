import type { FaqContent } from "../types";

// Original content, written from general, well-established padel knowledge (never
// copied from blogs or existing channels — see PROJECT.md §3/§4).
// Status "machine": not yet reviewed by anyone with padel expertise.
export const en: Record<string, FaqContent> = {
  "how-many-players": {
    question: "How many people do you need to play padel?",
    status: "machine",
    answerMd:
      "Four: padel is played in pairs, two on each side of the net. Narrower singles courts exist, but competitive play and the official rules are for doubles.\n\nThat's why almost everything in padel comes down to coordination: where your partner is, who covers the middle, who moves to the net. On a small enclosed court, two players out of sync leave gaps the opposition finds fast.",
  },
  "padel-vs-tennis": {
    question: "How is padel different from tennis?",
    status: "machine",
    answerMd:
      "The scoring is identical. Almost everything else changes:\n\n- **The walls are part of the game.** The ball can rebound off the glass and stay alive — in tennis that would be a lost point.\n- **The court is enclosed and smaller**, and you always play doubles.\n- **The serve is underarm**, bouncing the ball on the ground before you hit it. There are no 200 km/h aces.\n- **The racket is solid and stringless**, perforated and shorter than a tennis racket.\n\nThe practical result: points last longer and are won with positioning and patience, not power.",
  },
  "need-tennis-experience": {
    question: "Do I need to play tennis before starting padel?",
    status: "machine",
    answerMd:
      "No. Padel is one of the easiest racket sports to pick up: the court is small, the racket is short, and the walls give you a second chance on balls that would already be gone in another sport.\n\nA tennis background helps you read the ball, but it brings two habits that get in the way: **swings that are far too long** — there's no room for them in padel — and **backing up when the ball goes high**, instead of waiting for it near the net and answering with a bandeja. Someone who has never played tennis has neither habit to unlearn.",
  },
  "which-side": {
    question: "Should I play the right side or the left side?",
    status: "machine",
    answerMd:
      "It's a convention, not a rule — you can play either side. In practice, pairs tend to split it like this:\n\n- **Right:** the player who keeps the point alive, with steady play and few errors.\n- **Left:** the player who closes points out, because many high balls land on that side and that's where the smashes usually come from.\n\nIf you're starting out, play both. Only after a few weeks will you work out which side you're more useful on — and that answer changes depending on who you're partnered with.",
  },
  scoring: {
    question: "How does scoring work in padel?",
    status: "machine",
    answerMd:
      "Exactly as in tennis. Points go 15, 30, 40 and game, needing a two-point margin from 40-40. Games make up sets: you win a set by reaching six games with a two-game lead, and at 6-6 you play a tie-break. Matches are normally best of three sets.\n\nThe full rule, with the official FIP article, is in the Rules section.",
  },
  "walls-in-play": {
    question: "Can I play the ball after it hits the wall?",
    status: "machine",
    answerMd:
      "Yes — as long as the ball bounced on your side of the court first. The order matters and can't be reversed: **ground, then wall**. If the ball hits your wall directly without touching the ground, the point goes to your opponents.\n\nAfter that first bounce the ball can hit the glass, the fence, or both, and stays in play until it bounces a second time on the ground. Learning to wait for that rebound rather than running away from it is the most visible difference between someone who started yesterday and someone who has played for a few months.",
  },
  "ball-out-of-court": {
    question: "Can the ball leave the court and the point carry on?",
    status: "machine",
    answerMd:
      "It can. If the ball leaves the enclosure after bouncing on your side, you're entitled to go out through the side opening, play it from outside and send it back in — as long as it hasn't bounced a second time on the ground.\n\nIt's one of padel's most spectacular moments and it depends on the court: it's only possible where side openings exist. On fully enclosed courts, a ball that leaves is a point won by whoever hit it.",
  },
  "first-equipment": {
    question: "What kit do I need for my first lesson?",
    status: "machine",
    answerMd:
      "Less than you'd think:\n\n- **A racket** — most clubs lend or rent one for the first few sessions. Don't buy before you know you like the sport.\n- **Balls** — usually included in the lesson.\n- **Shoes** — tennis or padel shoes both work; what matters is a sole with lateral grip. Running shoes are the wrong choice, because their sole is built to go forwards and padel is built out of sideways braking.\n- **Comfortable sportswear** and water.\n\nThe right buying order is shoes first, racket later.",
  },
  "choosing-first-racket": {
    question: "How do I choose my first racket?",
    status: "machine",
    answerMd:
      "To start with, look for a **round** racket. The shape determines where the sweet spot sits:\n\n- **Round** — sweet spot in the centre and larger, forgiving of off-centre hits. This is the shape for beginners.\n- **Teardrop** — a balance between control and power.\n- **Diamond** — sweet spot high and small, more power but it punishes any imprecision. Not a racket for your first weeks.\n\nAlso look for something lighter with a soft core: it tires the arm less and is more comfortable on impact. Maximum dimensions are fixed by the official rules, so no racket on sale gives you an illegal advantage — the difference is all in shape, weight and materials.",
  },
  "padel-balls": {
    question: "Are padel balls the same as tennis balls?",
    status: "machine",
    answerMd:
      "They look the same, but they aren't. A padel ball has lower internal pressure, which gives it a lower bounce and a more controlled game — essential on a small court where the ball also rebounds off the walls.\n\nPlaying with tennis balls on a padel court makes the game too fast and unpredictable. Weight, diameter and bounce tolerances are set out in the official rules.",
  },
  "national-ranking": {
    question: "Where can I see the Portuguese national ranking?",
    status: "machine",
    answerMd:
      "The national ranking belongs to the Portuguese Padel Federation and lives on the platform the federation uses to run its competitions. You reach it from the [FPP rankings page](https://fppadel.pt/rankings/).\n\n**We don't reproduce it here**, for a concrete reason: that platform expressly reserves the rights to its data under Article 4 of the EU directive on text and data mining. It's a written refusal, and we respect it.\n\nWhat you'll find on this site is the international professional tour ranking (FIP) — a different thing. A Portuguese player appears there by world position, which is not the same as their national ranking position.",
  },
  "amateur-tournaments": {
    question: "Where do I find amateur tournaments in Portugal?",
    status: "machine",
    answerMd:
      "Not on this site, and it's worth explaining why.\n\nThe calendar here is the international professional tour, including the events held in Portugal. Club tournaments run elsewhere:\n\n- **[PadelTeams](https://padelteams.pt)** — the platform many Portuguese clubs use to run and publish their competitions.\n- **[FPP tournaments](https://fppadel.pt/sobre-a-federacao/torneios/)** — the federated events.\n- **Club social media**, where many tournaments are announced and nowhere else.\n\nWe don't copy those calendars here because the platforms hosting them don't allow it. We send you to them instead, which seems fair — and saves you searching blind.",
  },
};
