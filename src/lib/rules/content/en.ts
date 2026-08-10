import type { RuleContent } from "../types";

// Original content (never copied from the official regulation) — see PROJECT.md §1.2/§6.2.
// Status "machine": not yet reviewed by anyone with padel expertise.
export const en: Record<string, RuleContent> = {
  scoring: {
    title: "How a game, set, and match are scored",
    status: "machine",
    bodyMd: `Padel counts points the same way tennis does: the first point is worth 15, the second 30, the third 40, and the fourth wins the game — as long as the lead is at least two points.

If both teams reach 40-40, it's called **deuce**. From there the regulation allows three ways of deciding the game, and each tournament picks one:

- **Classic advantage**: whoever wins the next point takes the advantage; winning again closes the game, losing sends it back to deuce.
- **Star point**: advantages are played until the score comes back to deuce for the third time; the next point then decides the game.
- **Golden point**: instead of successive advantages, a single deciding point is played. Whoever wins it wins the game. This is the most common format in professional padel today, because it keeps game length predictable.

On the deciding point — golden or star — two rules cause a lot of arguing on court:

- It is the **receiving pair** who choose which side to receive on, but the two of them **can't switch positions** with each other to do it.
- In mixed events, the player receiving the deciding point must be **the same sex as the server**.

A team wins a **set** by reaching 6 games, with a lead of at least 2. If the score reaches 6-6, a **tie-break** is played (a points shootout, not games) up to 7 points, with a 2-point margin.

The usual **match** format is winning 2 of 3 sets, but the regulation allows alternatives an event can adopt: short sets of 4 games, an ordinary tie-break in place of a third set, or a **10-point super tie-break** instead of a third set — the last of these is now routine in amateur competition.`,
  },
  "the-serve": {
    title: "The serve: how every point starts",
    status: "machine",
    bodyMd: `Unlike tennis, the serve in padel is always hit underarm.

Main rules:

- The server must keep at least one foot behind the service line, in the space between the imaginary prolongation of the center line and the side wall — and must stay there until the serve has been struck.
- The ball must be bounced on the ground before it is hit, and that bounce has to happen inside the box the serve is being played from. The ball may not cross the service line or the center line before contact.
- Contact must happen **at or below waist height**, with at least one foot touching the ground at that moment.
- The ball must cross the net diagonally and land inside the opponent's service box, on the opposite side.
- Each team gets two attempts per point (first and second serve) — if both fail, the point is lost.
- The first serve of every game is played from the right-hand side of the server's court, and the side alternates on every point after that.`,
  },
  "let-and-net-serve": {
    title: '"Let" and net serve: when a serve gets replayed',
    status: "machine",
    bodyMd: `Not every awkward serve is a fault — in some situations the point simply gets replayed, with no penalty for the server.

**Net serve.** If the ball touches the net or the posts and still lands inside the correct service box, the serve is replayed — **but only if it doesn't then touch the metal fencing before the second bounce**. If it does, that's a fault, not a replay. It's a distinction that gets settled on court every week and that plenty of players have never heard of.

The serve is also replayed if the ball, after clipping the net or the posts, hits the receiver or anything they're carrying.

**"Let" on a point.** The point is replayed from scratch when the receiver wasn't ready, when something that isn't part of the game comes onto the court (a ball from the next court, for example), or when any unexpected event outside the players' control interrupts the match.

Two practical conditions catch people out: a "let" has to be claimed **immediately** — carry on playing and you've given up the right to it — and the call belongs to the umpire, who can turn the claim down and award the point against you if it wasn't warranted.

If the replay happens on the first serve, the server keeps both attempts. If it happens on the second serve, only that second attempt is repeated.`,
  },
  "out-of-court-play": {
    title: "Playing outside the court: the rule that makes padel unique",
    status: "machine",
    bodyMd: `One of padel's most distinctive features is that, on courts built for it, players are allowed to leave the enclosed court to chase the ball. But the shot isn't on in every direction, and that's where almost everyone gets it wrong.

Once the ball has bounced correctly on your side, what happens next depends on **where** it leaves the court:

- **Over the back wall**: the point is lost. There's nothing to chase, even on a court with a safety zone.
- **Through the side or through the door**: here you (or your partner) can go out of the enclosure and play it from outside — as long as the court has a "safety zone" around it (a minimum obstacle-free space) that allows this to be done safely. The play ends the moment the ball bounces a second time or touches anything unrelated to the court.

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
    bodyMd: `A padel ball looks like a tennis ball, but it has specifications of its own — suited to a game played inside an enclosed court with lots of wall bounces.

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
- The hitting surface is perforated with cylindrical holes, any number of them. In the **center area** each hole must measure between 9 and 13 mm. Within a band of up to 4 cm from the edge, holes may be larger or a different shape, up to a maximum of 20 mm.
- A safety cord attached to the handle and worn around the wrist is mandatory — it stops the racket from flying off during play.
- It may not carry any visible or audible device that communicates information to the player during play.`,
  },
  times: {
    title: "Timing and breaks during a match",
    status: "machine",
    bodyMd: `Padel sets clear time limits to keep the game moving:

- **Between points**: 20 seconds maximum.
- **When changing sides**: up to 90 seconds (except after the first game of each set and during the tie-break, when there's no break).
- **At the end of each set**: up to 120 seconds.
- **Before starting**: a 3-minute warm-up rally between both teams is mandatory.

If a team isn't ready to play 10 minutes after the official start time, they can lose the match by "walkover" (W.O.), barring force majeure.

**Medical attention.** For a treatable injury, each player gets one 3-minute medical break. The limit is the part that usually gets missed: attention can only be given **once per player and once per treatable condition**, and it can't be passed on to their partner.

Two further situations are handled separately from an ordinary injury: if something happens that isn't caused by the game — fainting, an allergic reaction, dizziness, breathing difficulty — the umpire can allow up to 15 minutes; and for an unusual circumstance, such as an accidental fall or a ball striking a player, up to 5 minutes to recover.

*A note on the tie-break*: the regulation carries two provisions that don't sit together — one says play is continuous during a tie-break with no rest at the change of ends, the other grants 20 seconds for that change. In practice, the 20 seconds are what gets used.`,
  },
  "player-positions": {
    title: "Where players position themselves",
    status: "machine",
    bodyMd: `On every point, one team has a server and a partner standing by; the other team has a receiver (positioned diagonally opposite the server) and a partner standing by.

The receiver can stand anywhere on their side of the court — they don't have to stay inside the service box. The same goes for both partners not directly involved in the serve: they can position themselves wherever they like on their side of the net.`,
  },
  "choice-of-sides": {
    title: "The toss: who serves first and from which side",
    status: "machine",
    bodyMd: `Before the match starts, a coin toss (or similar) decides who chooses first. The team that wins the toss can pick one of three options:

- Serve or receive first (in which case the other team chooses the side).
- Choose which side to start on (the other team then chooses to serve or receive).
- Ask the opponents to choose first.

Once decided, both teams tell the umpire who will serve and receive first.`,
  },
  "changes-of-sides": {
    title: "Changing sides",
    status: "machine",
    bodyMd: `Teams change sides after the 1st, 3rd, and every subsequent odd game within a set (that is, whenever the total games played in the set is odd).

During a tie-break, sides change every 6 points.

If a team forgets to change sides, it's corrected as soon as the mistake is noticed, following the correct order from then on — points already won still count. There's one practical consequence worth remembering: if the mistake only comes to light after a first serve has been faulted, the server is left with the second serve only.`,
  },
  "serve-fault": {
    title: "When a serve is a fault",
    status: "machine",
    bodyMd: `A serve counts as a fault in situations such as:

- Breaking the position, contact-height, or trajectory rules described in "The serve".
- The server missing the ball entirely while trying to serve it.
- The ball landing outside the opponent's service box (the lines count as good).
- The ball touching the server, their partner, or anything they're wearing or carrying.
- The ball landing in the correct service box but then touching the metal fencing before the second bounce.
- The ball landing in the correct service box and then going straight out through the door, on a court with no safety zone and therefore no out-of-court play authorized.

A fault on the first serve earns you a second. Two faults in a row lose the point — and there are cases where the server starts with only one serve, such as when a change-of-ends mistake is corrected late.`,
  },
  "return-of-serve": {
    title: "How the serve is received",
    status: "machine",
    bodyMd: `The receiver has to let the ball bounce inside their service box and return it before it bounces a second time.

In the first game of each set, the receiving team decides which player receives first — that order stays fixed for the whole set (it can only change at the start of the next set). If the order gets swapped by mistake mid-game, play continues that way until the end of that game or tie-break, then reverts to the original order.

If the ball touches one of the receiving players (or their racket) before it bounces, the point automatically goes to the serving team.`,
  },
  interference: {
    title: "Interference between players",
    status: "machine",
    bodyMd: `Interference happens when a player — deliberately or not — gets in the way of an opponent making a shot.

- If it's **deliberate**, the point automatically goes to the opposing team.
- If it's **unintentional**, the point is replayed ("let").
- If the same team causes a second unintentional interference, they lose the point in dispute.`,
  },
  "ball-in-play": {
    title: 'When the ball is "in play"',
    status: "machine",
    bodyMd: `The ball is in play from the moment a valid serve is struck until the point is decided (either by a "let" or a clear outcome).

One important detail: once the ball has bounced on your side of the court, it stays in play even if it then touches a wall, the metal fencing, the net, or the posts — all of these are part of the playing area, just like the floor.

The second bounce on the ground is what ends the rally. But it isn't the only way to lose the point while the ball is in play — see "The most common ways to lose a point" for the rest.`,
  },
  "point-lost": {
    title: "The most common ways to lose a point",
    status: "machine",
    bodyMd: `The regulation lists many specific scenarios, but the most common ones in everyday play are:

- The ball bounces twice on your side before you return it.
- You, your racket, or something you're wearing touches the net, the posts, the tension cable, or the opponent's court while the ball is in play.
- After you hit the ball, it touches the metal fencing or the ground on your own side, instead of going to the opponent's court.
- You hit the ball twice in a row (a double hit).
- Both players on the same team hit the ball, whether at the same time or one after the other — only one of you may play it. **Note**: it doesn't count as a double hit when both of you go for it and one hits the ball while the other hits their partner's racket.
- The ball, while in play, touches you, your partner, or something you're wearing — whether or not you tried to return it, and even if it was already on its way out of the court.
- You serve two consecutive faults.
- You drop your racket, or your safety cord breaks, during the point.

This list isn't exhaustive — see the official regulation for the complete text.`,
  },
  "correct-return": {
    title: "What counts as a valid return",
    status: "machine",
    bodyMd: `A return is valid in situations that sometimes surprise padel beginners.

In these cases the ball stays inside the enclosure and the rally goes on — the opponent has to return it before its second bounce:

- The ball bounces on the floor on your side, comes off your own wall, and *that* is where you hit it — sending it over to the opponent's court. Mind the order: **floor first, wall second**. You can't drive the ball into your own wall to make it clear the net; that's squash, not padel.
- The ball touches the net or the posts and still lands correctly in the opponent's court.
- The ball lands exactly in the corner where the wall meets the floor.

One more case works differently, and it's the one that usually gets told wrong: the ball bounces correctly in the opponent's court and only then leaves the enclosure, hitting the ceiling, the lights, or another element unrelated to the game. **Your return was valid** — but that doesn't mean the rally continues. What happens next depends on whether the court allows out-of-court play and on where the ball left; see "Playing outside the court" and "The most common ways to lose a point".`,
  },
  "point-won": {
    title: "Less obvious ways to win a point",
    status: "machine",
    bodyMd: `Besides the opponent failing to return the ball, there are two padel-specific situations where a point is won outright:

- After correctly bouncing in the opponent's court, the ball goes out through a hole in the metal fencing or gets stuck in it.
- The ball gets stuck on the flat surface on top of the wall, after correctly bouncing in the opponent's court.`,
  },
  "change-of-balls": {
    title: "Changing balls during a tournament",
    status: "machine",
    bodyMd: `Before each competition, organizers must announce in advance: the brand and type of balls, how many will be used per match (usually 2 or 3), and the ball-change policy, if any.

When a change is scheduled, it typically happens:

- After a pre-agreed odd number of games. For that count, the warm-up counts as **two games** and a tie-break as **one**.
- At the start of a set.
- Never right at the start of a tie-break — in that case, the change is pushed to the start of the second game of the following set.

If a ball is lost or damaged mid-match, it's replaced as soon as possible, and which ball goes in depends on how recently the last change happened: during the **first two games** after a change it's replaced with a new ball; after that, with a used ball of similar wear, so nobody gains an advantage.

Play cannot continue with **only one ball** available to the players. With two, in a three-ball match, play carries on as normal.`,
  },
};
