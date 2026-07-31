import type { RuleContent } from "../types";

// Original content (never copied from the official regulation) — see PROJECT.md §1.2/§6.2.
// Status "machine": not yet reviewed by anyone with padel expertise.
export const en: Record<string, RuleContent> = {
  scoring: {
    title: "How a game, set, and match are scored",
    status: "machine",
    bodyMd: `Padel counts points the same way tennis does: the first point is worth 15, the second 30, the third 40, and the fourth wins the game — as long as the lead is at least two points.

If both teams reach 40-40, it's called **deuce**. From there, tournaments use one of two ways to decide the game:

- **Classic advantage**: whoever wins the next point takes the advantage; winning again closes the game, losing sends it back to deuce.
- **Golden point**: instead of successive advantages, a single deciding point is played. Whoever wins it wins the game. This is the most common format in professional padel today, because it keeps game length predictable.

A team wins a **set** by reaching 6 games, with a lead of at least 2. If the score reaches 6-6, a **tie-break** is played (a points shootout, not games) up to 7 points, with a 2-point margin.

A **match** is won by taking 2 of 3 sets.`,
  },
  "the-serve": {
    title: "The serve: how every point starts",
    status: "machine",
    bodyMd: `Unlike tennis, the serve in padel is always hit underarm.

Main rules:

- The server must keep at least one foot behind the service line, without stepping on it or crossing the imaginary center line.
- The ball must be bounced on the ground and struck below waist height, with at least one foot touching the ground at contact.
- The ball must cross the net diagonally and land inside the opponent's service box, on the opposite side.
- Each team gets two attempts per point (first and second serve) — if both fail, the point is lost.
- The serving side alternates every point: first to the opponent's left, then to their right, and so on.`,
  },
  "let-and-net-serve": {
    title: '"Let" and net serve: when a serve gets replayed',
    status: "machine",
    bodyMd: `Not every awkward serve is a fault — in some situations the point simply gets replayed, with no penalty for the server.

- **Net serve**: if the ball touches the net or the posts and still lands inside the correct service box, it doesn't count as a fault — it's replayed.
- **"Let" (replay)**: if the receiver wasn't ready, or something unrelated to the game interrupts the point (for example, a ball from another court rolling in), the point is replayed from scratch.

If the replay happens on the first serve, the server keeps both attempts. If it happens on the second serve, only that second attempt is repeated.`,
  },
  "out-of-court-play": {
    title: "Playing outside the court: the rule that makes padel unique",
    status: "machine",
    bodyMd: `One of padel's most distinctive features is that, on courts built for it, players are allowed to leave the enclosed court to chase the ball.

After the ball bounces on your side, you (or your partner) may run out through the court's side opening and return it from outside, as long as the ball is still in play and the court has a "safety zone" around it (a minimum obstacle-free space) that allows this to be done safely.

It isn't allowed on every court — it depends on there being enough space and openings around it. When it is, it produces some of padel's most spectacular points: a player sprinting off court, returning the ball over the net, and running back in.`,
  },
  "court-dimensions": {
    title: "Court dimensions",
    status: "machine",
    bodyMd: `A padel court is a rectangle **10 meters wide by 20 meters long** (interior measurements), split in half by a net.

- The net is 88 cm high at the center, rising to 92 cm at the side posts.
- The service lines sit 6.95 meters from the net on each side.
- The court is fully enclosed — part wall (glass or solid material), part metal fencing, with a total height of around 4 meters at the ends.
- The minimum clear height above the court is 6 meters (8 meters recommended for new facilities), with no obstructions like spotlights.

These dimensions keep the ball's bounce off the walls predictable — that predictability is what makes padel's signature glass-wall rallies possible.`,
  },
  "the-ball": {
    title: "The ball",
    status: "machine",
    bodyMd: `A padel ball looks like a tennis ball but is slightly smaller, lighter, and has lower internal pressure — suited to a game played inside an enclosed court with lots of wall bounces.

- Diameter between 6.35 and 6.77 cm.
- Weight between 56.0 and 59.4 grams.
- A new ball, dropped from 2.54 meters onto a hard surface, must bounce between 135 and 145 cm.
- At altitudes above 1000 meters, balls with a lower bounce (between 121.92 and 135 cm) may be used, since thinner air makes the ball bounce higher.`,
  },
  "the-racket": {
    title: "The racket",
    status: "machine",
    bodyMd: `A padel racket has no strings — it's a solid, perforated surface, quite different from a tennis racket.

- Total length (head plus handle) up to 45.5 cm.
- Maximum width of 26 cm and maximum thickness of 38 mm.
- The hitting surface is perforated with circular holes, typically 9 to 13 mm in diameter in the center area.
- A safety cord attached to the handle and worn around the wrist is mandatory — it stops the racket from flying off during play.
- It may not carry any visible or audible electronic device that communicates information to the player during play.`,
  },
};
