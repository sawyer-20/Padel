import type { FaqContent } from "../types";

// Originalinhalt, geschrieben auf Basis allgemeinen, gesicherten Padel-Wissens
// (nie von Blogs oder bestehenden Kanälen kopiert — siehe PROJECT.md §3/§4).
// Status „machine": noch von niemandem mit Padel-Kenntnis geprüft.
export const de: Record<string, FaqContent> = {
  "how-many-players": {
    question: "Wie viele Personen braucht man für Padel?",
    status: "machine",
    answerMd:
      "Vier: Padel wird im Doppel gespielt, zwei auf jeder Seite des Netzes. Es gibt schmalere Einzel-Courts, aber der Wettkampfsport und das offizielle Regelwerk sind auf das Doppel ausgelegt.\n\nDeshalb läuft im Padel fast alles auf Abstimmung hinaus: wo dein Partner steht, wer die Mitte deckt, wer ans Netz geht. Auf einem kleinen, geschlossenen Court lassen zwei unabgestimmte Spieler Lücken, die der Gegner schnell findet.",
  },
  "padel-vs-tennis": {
    question: "Worin unterscheidet sich Padel vom Tennis?",
    status: "machine",
    answerMd:
      "Die Zählweise ist identisch. Fast alles andere ändert sich:\n\n- **Die Wände gehören zum Spiel.** Der Ball darf vom Glas abprallen und bleibt im Spiel — im Tennis wäre der Punkt verloren.\n- **Der Court ist geschlossen und kleiner**, und gespielt wird immer im Doppel.\n- **Der Aufschlag erfolgt von unten**, wobei der Ball vor dem Schlag auf dem Boden aufspringt. Es gibt keine Asse mit 200 km/h.\n- **Der Schläger ist starr und ohne Saiten**, perforiert und kürzer als ein Tennisschläger.\n\nDie praktische Folge: Ballwechsel dauern länger und werden mit Stellungsspiel und Geduld gewonnen, nicht mit Kraft.",
  },
  "need-tennis-experience": {
    question: "Muss ich Tennis können, um mit Padel anzufangen?",
    status: "machine",
    answerMd:
      "Nein. Padel ist eine der am leichtesten zugänglichen Rückschlagsportarten: Der Court ist klein, der Schläger kurz, und die Wände geben dir eine zweite Chance bei Bällen, die anderswo längst verloren wären.\n\nTennis-Erfahrung hilft beim Lesen des Balls, bringt aber zwei störende Gewohnheiten mit: **viel zu lange Armbewegungen** — dafür ist im Padel kein Platz — und **zurückweichen, wenn der Ball hoch kommt**, statt ihn am Netz zu erwarten und mit einer Bandeja zu beantworten. Wer nie Tennis gespielt hat, muss sich keine davon abgewöhnen.",
  },
  "which-side": {
    question: "Soll ich auf der rechten oder der linken Seite spielen?",
    status: "machine",
    answerMd:
      "Das ist Konvention, keine Regel — du kannst auf beiden Seiten spielen. In der Praxis teilen Paare es meist so auf:\n\n- **Rechts:** wer den Ballwechsel am Leben hält, mit konstantem Spiel und wenigen Fehlern.\n- **Links:** wer die Punkte beendet, denn viele hohe Bälle landen auf dieser Seite und von dort kommen meist die Schmetterbälle.\n\nWenn du anfängst, spiele beide Seiten. Erst nach ein paar Wochen merkst du, wo du nützlicher bist — und die Antwort ändert sich je nachdem, mit wem du spielst.",
  },
  scoring: {
    question: "Wie wird im Padel gezählt?",
    status: "machine",
    answerMd:
      "Genau wie im Tennis. Die Punkte gehen 15, 30, 40 und Spiel, ab 40-40 mit zwei Punkten Abstand. Spiele bilden Sätze: Den Satz gewinnt, wer sechs Spiele mit zwei Vorsprung erreicht, bei 6-6 folgt ein Tie-Break. Matches gehen normalerweise über zwei Gewinnsätze.\n\nDie vollständige Regel, mit dem offiziellen FIP-Artikel, steht im Bereich Regeln.",
  },
  "walls-in-play": {
    question: "Darf ich den Ball spielen, nachdem er die Wand berührt hat?",
    status: "machine",
    answerMd:
      "Ja — sofern der Ball zuerst auf deinem Boden aufgesprungen ist. Die Reihenfolge zählt und lässt sich nicht umkehren: **Boden, dann Wand**. Trifft der Ball deine Wand direkt, ohne den Boden zu berühren, geht der Punkt an die Gegner.\n\nNach diesem ersten Aufsprung darf der Ball das Glas, das Gitter oder beides berühren und bleibt im Spiel, bis er ein zweites Mal auf dem Boden aufkommt. Auf diesen Abpraller zu warten, statt vor ihm wegzulaufen, ist der sichtbarste Unterschied zwischen jemandem, der gestern angefangen hat, und jemandem, der seit ein paar Monaten spielt.",
  },
  "ball-out-of-court": {
    question: "Darf der Ball den Court verlassen und der Punkt weitergehen?",
    status: "machine",
    answerMd:
      "Ja. Verlässt der Ball nach dem Aufsprung auf deiner Seite die Umzäunung, darfst du durch die seitliche Öffnung hinausgehen, ihn von außen spielen und zurückschlagen — solange er nicht ein zweites Mal auf dem Boden aufgekommen ist.\n\nDas ist einer der spektakulärsten Momente im Padel und hängt vom Court ab: Es geht nur dort, wo seitliche Öffnungen vorhanden sind. Auf vollständig geschlossenen Courts ist ein Ball, der hinausgeht, ein gewonnener Punkt für den, der ihn geschlagen hat.",
  },
  "first-equipment": {
    question: "Welche Ausrüstung brauche ich für die erste Stunde?",
    status: "machine",
    answerMd:
      "Weniger, als man denkt:\n\n- **Ein Schläger** — die meisten Clubs verleihen oder vermieten für die ersten Male einen. Kaufe nicht, bevor du weißt, ob dir der Sport liegt.\n- **Bälle** — normalerweise in der Stunde enthalten.\n- **Schuhe** — Tennis- oder Padelschuhe funktionieren beide; entscheidend ist eine Sohle mit seitlichem Grip. Laufschuhe sind die falsche Wahl, weil ihre Sohle fürs Geradeauslaufen gebaut ist und Padel aus seitlichen Bremsbewegungen besteht.\n- **Bequeme Sportkleidung** und Wasser.\n\nDie richtige Kaufreihenfolge: erst Schuhe, dann Schläger.",
  },
  "choosing-first-racket": {
    question: "Wie wähle ich meinen ersten Schläger?",
    status: "machine",
    answerMd:
      "Für den Anfang: ein **runder** Schläger. Die Form bestimmt, wo der Sweetspot liegt:\n\n- **Rund** — Sweetspot mittig und größer, verzeiht außermittige Treffer. Das ist die Form für Einsteiger.\n- **Tropfen** — ein Kompromiss zwischen Kontrolle und Power.\n- **Diamant** — Sweetspot hoch und klein, mehr Power, bestraft aber jede Ungenauigkeit. Kein Schläger für die ersten Wochen.\n\nAchte außerdem auf ein leichteres Modell mit weichem Kern: Es ermüdet den Arm weniger und ist im Treffmoment angenehmer. Die Maximalmaße legt das offizielle Regelwerk fest — kein käuflicher Schläger verschafft dir also einen unerlaubten Vorteil. Der Unterschied liegt allein in Form, Gewicht und Material.",
  },
  "padel-balls": {
    question: "Sind Padelbälle dasselbe wie Tennisbälle?",
    status: "machine",
    answerMd:
      "Sie sehen gleich aus, sind es aber nicht. Der Padelball hat einen geringeren Innendruck, was ihm einen niedrigeren Absprung und ein kontrollierteres Spiel gibt — auf einem kleinen Court, auf dem er zusätzlich von den Wänden abprallt, ist das entscheidend.\n\nMit Tennisbällen auf einem Padelcourt wird das Spiel zu schnell und unberechenbar. Toleranzen für Gewicht, Durchmesser und Absprung sind im offiziellen Regelwerk festgelegt.",
  },
  "national-ranking": {
    question: "Wo sehe ich die portugiesische nationale Rangliste?",
    status: "machine",
    answerMd:
      "Die nationale Rangliste gehört dem portugiesischen Padelverband und liegt auf der Plattform, über die der Verband seine Wettbewerbe organisiert. Man erreicht sie über die [Ranglisten-Seite der FPP](https://fppadel.pt/rankings/).\n\n**Wir geben sie hier nicht wieder**, und zwar aus einem konkreten Grund: Diese Plattform behält sich die Rechte an ihren Daten ausdrücklich vor, nach Artikel 4 der EU-Richtlinie zum Text- und Data-Mining. Das ist eine schriftliche Absage, und wir respektieren sie.\n\nWas du auf dieser Seite findest, ist die Rangliste der internationalen Profitour (FIP) — etwas anderes. Eine portugiesische Spielerin steht dort mit ihrer Weltposition, und die ist nicht dieselbe wie ihr Platz in der nationalen Rangliste.",
  },
  "amateur-tournaments": {
    question: "Wo finde ich Amateurturniere in Portugal?",
    status: "machine",
    answerMd:
      "Nicht auf dieser Seite, und es lohnt sich zu erklären, warum.\n\nDer Kalender hier ist der der internationalen Profitour, einschließlich der Turniere in Portugal. Clubturniere laufen woanders:\n\n- **[PadelTeams](https://padelteams.pt)** — die Plattform, über die viele portugiesische Clubs ihre Wettbewerbe organisieren und veröffentlichen.\n- **[FPP-Turniere](https://fppadel.pt/sobre-a-federacao/torneios/)** — die Verbandsturniere.\n- **Die sozialen Netzwerke der Clubs**, wo viele Turniere angekündigt werden und sonst nirgends.\n\nWir kopieren diese Kalender nicht hierher, weil die Betreiber es nicht erlauben. Wir schicken dich stattdessen zu ihnen — das scheint uns fair und erspart dir die blinde Suche.",
  },
};
