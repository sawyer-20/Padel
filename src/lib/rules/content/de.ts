import type { RuleContent } from "../types";

// Originalinhalt (nie aus dem offiziellen Regelwerk kopiert) — siehe PROJECT.md §1.2/§6.2.
// Status "machine": noch nicht von jemandem mit Padel-Kenntnissen geprüft.
export const de: Record<string, RuleContent> = {
  scoring: {
    title: "Wie ein Spiel, ein Satz und ein Match gezählt werden",
    status: "machine",
    bodyMd: `Beim Padel wird genauso gezählt wie beim Tennis: Der erste Punkt zählt 15, der zweite 30, der dritte 40, und der vierte gewinnt das Spiel — solange der Vorsprung mindestens zwei Punkte beträgt.

Stehen beide Teams bei 40:40, heißt das **Einstand** (Deuce). Von dort an entscheiden Turniere auf eine von zwei Arten:

- **Klassischer Vorteil**: Wer den nächsten Punkt gewinnt, hat Vorteil; gewinnt dasselbe Team erneut, ist das Spiel beendet, verliert es, geht es zurück zum Einstand.
- **Golden Point**: Statt aufeinanderfolgender Vorteile wird ein einziger entscheidender Punkt gespielt. Wer ihn gewinnt, gewinnt das Spiel. Das ist heute das gängigste Format im Profi-Padel, weil es die Spieldauer besser vorhersehbar macht.

Ein Team gewinnt einen **Satz**, sobald es 6 Spiele mit mindestens 2 Spielen Vorsprung erreicht. Steht es 6:6, wird ein **Tiebreak** gespielt (ein Punkte-, kein Spielevorteil) bis 7 Punkte, mit 2 Punkten Vorsprung.

Ein **Match** gewinnt, wer 2 von 3 Sätzen für sich entscheidet.`,
  },
  "the-serve": {
    title: "Der Aufschlag: So beginnt jeder Punkt",
    status: "machine",
    bodyMd: `Anders als beim Tennis wird der Aufschlag im Padel immer von unten geschlagen.

Die wichtigsten Regeln:

- Der Aufschläger muss mindestens einen Fuß hinter der Aufschlaglinie halten, ohne sie zu berühren oder die gedachte Mittellinie zu überschreiten.
- Der Ball muss auf dem Boden aufspringen und unterhalb der Hüfthöhe getroffen werden, wobei beim Kontakt mindestens ein Fuß den Boden berührt.
- Der Ball muss das Netz diagonal überqueren und im gegnerischen Aufschlagfeld auf der gegenüberliegenden Seite landen.
- Jedes Team hat zwei Versuche pro Punkt (erster und zweiter Aufschlag) — scheitern beide, ist der Punkt verloren.
- Die Aufschlagseite wechselt bei jedem Punkt: zuerst nach links vom Gegner, dann nach rechts, und so weiter.`,
  },
  "let-and-net-serve": {
    title: '"Let" und Netzaufschlag: Wann ein Aufschlag wiederholt wird',
    status: "machine",
    bodyMd: `Nicht jeder missglückte Aufschlag ist ein Fehler — in bestimmten Situationen wird der Punkt einfach wiederholt, ohne Nachteil für den Aufschläger.

- **Netzaufschlag**: Berührt der Ball das Netz oder die Pfosten und landet trotzdem im richtigen Aufschlagfeld, zählt das nicht als Fehler — der Aufschlag wird wiederholt.
- **"Let" (Wiederholung)**: War der Rückschläger nicht bereit, oder unterbricht etwas Spielfremdes den Punkt (zum Beispiel ein Ball von einem anderen Platz), wird der Punkt von vorn gespielt.

Passiert die Wiederholung beim ersten Aufschlag, behält der Aufschläger beide Versuche. Passiert sie beim zweiten Aufschlag, wird nur dieser zweite Versuch wiederholt.`,
  },
  "out-of-court-play": {
    title: "Spiel außerhalb des Platzes: die Regel, die Padel einzigartig macht",
    status: "machine",
    bodyMd: `Eines der markantesten Merkmale von Padel ist, dass Spieler auf dafür gebauten Plätzen den umschlossenen Bereich verlassen dürfen, um den Ball zu erreichen.

Nachdem der Ball auf deiner Seite aufgesprungen ist, dürfen du (oder dein Partner) durch die seitliche Öffnung aus dem Platz laufen und den Ball von außen zurückspielen — vorausgesetzt, der Ball ist noch im Spiel und der Platz verfügt ringsum über eine "Sicherheitszone" (einen hindernisfreien Mindestraum), die das sicher ermöglicht.

Das ist nicht auf jedem Platz erlaubt — es hängt davon ab, ob genug Platz und Öffnungen vorhanden sind. Wo es erlaubt ist, entstehen dadurch einige der spektakulärsten Ballwechsel im Padel: ein Spieler sprintet aus dem Platz, spielt den Ball übers Netz zurück und läuft wieder hinein.`,
  },
  "court-dimensions": {
    title: "Platzmaße",
    status: "machine",
    bodyMd: `Ein Padelplatz ist ein Rechteck von **10 Metern Breite und 20 Metern Länge** (Innenmaße), durch ein Netz in zwei Hälften geteilt.

- Das Netz ist in der Mitte 88 cm hoch und steigt an den seitlichen Pfosten auf 92 cm.
- Die Aufschlaglinien liegen auf jeder Seite 6,95 Meter vom Netz entfernt.
- Der Platz ist vollständig umschlossen — teils durch Wände (Glas oder festes Material), teils durch Maschendraht, mit einer Gesamthöhe von rund 4 Metern an den Enden.
- Die minimale lichte Höhe über dem Platz beträgt 6 Meter (bei Neubauten werden 8 Meter empfohlen), frei von Hindernissen wie Scheinwerfern.

Diese Maße sorgen für einen vorhersehbaren Ballabsprung von den Wänden — genau diese Vorhersehbarkeit ermöglicht die für Padel typischen Ballwechsel über die Glaswände.`,
  },
  "the-ball": {
    title: "Der Ball",
    status: "machine",
    bodyMd: `Ein Padelball sieht aus wie ein Tennisball, ist aber etwas kleiner, leichter und hat weniger Innendruck — passend zu einem Spiel, das in einem umschlossenen Platz mit vielen Wandabsprüngen stattfindet.

- Durchmesser zwischen 6,35 und 6,77 cm.
- Gewicht zwischen 56,0 und 59,4 Gramm.
- Ein neuer Ball muss, aus 2,54 Metern Höhe auf eine harte Oberfläche fallen gelassen, zwischen 135 und 145 cm hoch abspringen.
- Über 1000 Metern Höhe dürfen Bälle mit niedrigerem Absprung (zwischen 121,92 und 135 cm) verwendet werden, da die dünnere Luft den Ball weiter springen lässt.`,
  },
  "the-racket": {
    title: "Der Schläger",
    status: "machine",
    bodyMd: `Der Padelschläger hat keine Bespannung — er besteht aus einer massiven, perforierten Fläche und unterscheidet sich damit deutlich vom Tennisschläger.

- Gesamtlänge (Kopf plus Griff) bis zu 45,5 cm.
- Maximale Breite von 26 cm und maximale Dicke von 38 mm.
- Die Schlagfläche ist mit runden Löchern perforiert, meist zwischen 9 und 13 mm Durchmesser im mittleren Bereich.
- Eine am Griff befestigte und ums Handgelenk getragene Sicherheitsschlaufe ist Pflicht — sie verhindert, dass der Schläger während des Spiels wegfliegt.
- Er darf kein sichtbares oder hörbares elektronisches Gerät tragen, das dem Spieler während des Spiels Informationen übermittelt.`,
  },
};
