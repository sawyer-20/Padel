import type { RuleContent } from "../types";

// Originalinhalt (nie aus dem offiziellen Regelwerk kopiert) — siehe PROJECT.md §1.2/§6.2.
// Status "machine": noch nicht von jemandem mit Padel-Kenntnissen geprüft.
export const de: Record<string, RuleContent> = {
  scoring: {
    title: "Wie ein Spiel, ein Satz und ein Match gezählt werden",
    status: "machine",
    bodyMd: `Beim Padel wird genauso gezählt wie beim Tennis: Der erste Punkt zählt 15, der zweite 30, der dritte 40, und der vierte gewinnt das Spiel — solange der Vorsprung mindestens zwei Punkte beträgt.

Stehen beide Teams bei 40:40, heißt das **Einstand** (Deuce). Von dort an sieht das Regelwerk drei Wege vor, und jedes Turnier legt sich auf einen fest:

- **Klassischer Vorteil**: Wer den nächsten Punkt gewinnt, hat Vorteil; gewinnt dasselbe Team erneut, ist das Spiel beendet, verliert es, geht es zurück zum Einstand.
- **Sternpunkt** (*Punto estrella*): Es wird mit Vorteilen gespielt, bis zum dritten Mal Einstand erreicht ist — dann entscheidet der nächste Punkt das Spiel.
- **Golden Point**: Statt aufeinanderfolgender Vorteile wird ein einziger entscheidender Punkt gespielt. Wer ihn gewinnt, gewinnt das Spiel. Das ist heute das gängigste Format im Profi-Padel, weil es die Spieldauer besser vorhersehbar macht.

Beim entscheidenden Punkt — Golden Point wie Sternpunkt — sorgen zwei Regeln regelmäßig für Diskussionen auf dem Platz:

- Das **rückschlagende Team** wählt, auf welcher Seite es den Punkt annimmt, aber die beiden Spieler dürfen dafür **nicht die Positionen untereinander tauschen**.
- In Mixed-Wettbewerben muss der Rückschläger des entscheidenden Punkts **dasselbe Geschlecht** haben wie der Aufschläger.

Ein Team gewinnt einen **Satz**, sobald es 6 Spiele mit mindestens 2 Spielen Vorsprung erreicht. Steht es 6:6, wird ein **Tiebreak** gespielt (ein Punkte-, kein Spielevorteil) bis 7 Punkte, mit 2 Punkten Vorsprung.

Am verbreitetsten ist das **Match** über 2 Gewinnsätze von 3, das Regelwerk lässt aber Alternativen zu, für die sich eine Veranstaltung entscheiden kann: kurze Sätze bis 4 Spiele, ein normaler Tiebreak anstelle des dritten Satzes, oder ein **Super-Tiebreak bis 10 Punkte** statt des dritten Satzes — Letzteres ist im Amateurbereich heute gängig.`,
  },
  "the-serve": {
    title: "Der Aufschlag: So beginnt jeder Punkt",
    status: "machine",
    bodyMd: `Anders als beim Tennis wird der Aufschlag im Padel immer von unten geschlagen.

Die wichtigsten Regeln:

- Der Aufschläger muss mindestens einen Fuß hinter der Aufschlaglinie halten, ohne sie zu berühren, und zwar im Bereich zwischen der gedachten Verlängerung der Mittellinie und der Seitenwand — dort muss er bleiben, bis der Aufschlag ausgeführt ist.
- Der Ball muss vor dem Schlag auf dem Boden aufspringen, und dieses Aufspringen muss innerhalb des Feldes erfolgen, aus dem aufgeschlagen wird. Vor dem Treffpunkt darf der Ball weder die Aufschlaglinie noch die Mittellinie überschreiten.
- Getroffen wird **auf Hüfthöhe oder darunter**, wobei beim Kontakt mindestens ein Fuß den Boden berührt.
- Der Ball muss das Netz diagonal überqueren und im gegnerischen Aufschlagfeld auf der gegenüberliegenden Seite landen.
- Jedes Team hat zwei Versuche pro Punkt (erster und zweiter Aufschlag) — scheitern beide, ist der Punkt verloren.
- Der erste Aufschlag jedes Spiels erfolgt von der rechten Seite des Aufschlägers; danach wechselt die Seite mit jedem Punkt.`,
  },
  "let-and-net-serve": {
    title: '"Let" und Netzaufschlag: Wann ein Aufschlag wiederholt wird',
    status: "machine",
    bodyMd: `Nicht jeder missglückte Aufschlag ist ein Fehler — in bestimmten Situationen wird der Punkt einfach wiederholt, ohne Nachteil für den Aufschläger.

**Netzaufschlag.** Berührt der Ball das Netz oder die Pfosten und landet trotzdem im richtigen Aufschlagfeld, wird der Aufschlag wiederholt — **aber nur, wenn er nicht vor dem zweiten Aufspringen den Maschendraht berührt**. Tut er das, ist es ein Fehler und keine Wiederholung. Diese Unterscheidung wird auf dem Platz jede Woche entschieden, und kaum jemand kennt sie.

Wiederholt wird auch, wenn der Ball nach der Berührung von Netz oder Pfosten den Rückschläger trifft oder etwas, das dieser bei sich trägt.

**"Let" (Wiederholung des Punkts).** Der Punkt wird von vorn gespielt, wenn der Rückschläger nicht bereit war, wenn etwas Spielfremdes auf den Platz kommt (zum Beispiel ein Ball von einem anderen Platz) oder wenn ein anderer Zwischenfall außerhalb der Spieler die Partie unterbricht.

Zwei praktische Bedingungen, die viele unvorbereitet treffen: Das "Let" muss **sofort** reklamiert werden — wer weiterspielt, verliert das Recht darauf —, und die Entscheidung liegt beim Schiedsrichter, der den Antrag ablehnen und den Punkt als verloren werten kann.

Passiert die Wiederholung beim ersten Aufschlag, behält der Aufschläger beide Versuche. Passiert sie beim zweiten Aufschlag, wird nur dieser zweite Versuch wiederholt.`,
  },
  "out-of-court-play": {
    title: "Spiel außerhalb des Platzes: die Regel, die Padel einzigartig macht",
    status: "machine",
    bodyMd: `Eines der markantesten Merkmale von Padel ist, dass Spieler auf dafür gebauten Plätzen den umschlossenen Bereich verlassen dürfen, um den Ball zu erreichen. Erlaubt ist das aber nicht in jede Richtung — und genau hier irren sich fast alle.

Nachdem der Ball korrekt auf dem Boden deiner Seite aufgesprungen ist, hängt alles davon ab, **wo** er hinausfliegt:

- **Über die hintere Wand**: Der Punkt ist verloren. Da ist nichts mehr zu holen, auch wenn der Platz eine Sicherheitszone hat.
- **Seitlich oder durch die Öffnung**: Hier darfst du — oder dein Partner — aus dem Platz laufen und den Ball von außen zurückspielen — vorausgesetzt, der Platz verfügt ringsum über eine "Sicherheitszone" (einen hindernisfreien Mindestraum), die das sicher ermöglicht. Der Ballwechsel endet, sobald der Ball ein zweites Mal aufspringt oder etwas Spielfremdes berührt.

Das ist nicht auf jedem Platz erlaubt — es hängt davon ab, ob genug Raum und Öffnungen vorhanden sind. Wo es erlaubt ist, entstehen dadurch einige der spektakulärsten Ballwechsel im Padel: ein Spieler sprintet aus dem Platz, spielt den Ball übers Netz zurück und läuft wieder hinein.`,
  },
  "court-dimensions": {
    title: "Platzmaße",
    status: "machine",
    bodyMd: `Ein Padelplatz ist ein Rechteck von **10 Metern Breite und 20 Metern Länge** (Innenmaße), durch ein Netz in zwei Hälften geteilt.

- Das Netz ist in der Mitte 88 cm hoch und steigt an den seitlichen Pfosten auf 92 cm.
- Die Aufschlaglinien liegen auf jeder Seite 6,95 Meter vom Netz entfernt.
- Der Platz ist vollständig umschlossen — teils durch Wände (Glas oder festes Material), teils durch Maschendraht, mit einer Gesamthöhe von rund 4 Metern an den Enden.
- Die minimale lichte Höhe über dem Platz beträgt 6 Meter (bei Neubauten werden 8 Meter empfohlen), frei von Hindernissen wie Scheinwerfern.

Diese Maße sorgen für einen vorhersehbaren Abprall von den Wänden — genau diese Vorhersehbarkeit ermöglicht die für Padel typischen Ballwechsel über die Glaswände.`,
  },
  "the-ball": {
    title: "Der Ball",
    status: "machine",
    bodyMd: `Ein Padelball sieht aus wie ein Tennisball, hat aber eigene Vorgaben — abgestimmt auf ein Spiel, das in einem umschlossenen Platz mit vielen Wandabprallern stattfindet.

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
- Die Schlagfläche ist mit zylindrischen Löchern perforiert, deren Zahl frei ist. Im **mittleren Bereich** muss jedes Loch zwischen 9 und 13 mm messen. In einem bis zu 4 cm breiten Streifen ab dem Rand dürfen die Löcher größer sein oder eine andere Form haben, bis höchstens 20 mm.
- Eine am Griff befestigte und ums Handgelenk getragene Sicherheitsschlaufe ist Pflicht — sie verhindert, dass der Schläger während des Spiels wegfliegt.
- Er darf kein sichtbares oder hörbares Gerät tragen, das dem Spieler während des Spiels Informationen übermittelt.`,
  },
  times: {
    title: "Zeiten und Pausen während des Matches",
    status: "machine",
    bodyMd: `Padel legt klare Zeitgrenzen fest, damit das Spiel im Fluss bleibt:

- **Zwischen den Punkten**: maximal 20 Sekunden.
- **Beim Seitenwechsel**: bis zu 90 Sekunden (außer nach dem ersten Spiel jedes Satzes und während des Tiebreaks, wo durchgespielt wird).
- **Am Ende jedes Satzes**: bis zu 120 Sekunden.
- **Vor Spielbeginn**: ein 3-minütiges Einspielen zwischen beiden Teams ist Pflicht.

Ist ein Team 10 Minuten nach der offiziellen Startzeit nicht spielbereit, kann es das Match per "Walkover" (W.O.) verlieren, außer bei höherer Gewalt.

**Medizinische Hilfe.** Bei einer behandelbaren Verletzung hat jeder Spieler Anspruch auf eine 3-minütige medizinische Pause, die bei den beiden folgenden Seitenwechseln wiederholt werden kann, immer innerhalb der regulären Zeit. Übersehen wird meist die Grenze: Die Behandlung steht jedem Spieler nur **einmal pro behandelbarem Zustand** zu und ist nicht auf den Partner übertragbar.

Davon zu unterscheiden sind zwei Fälle, die nicht die gewöhnliche Verletzung sind: Bei einem Unfall, der nicht aus dem Spiel entsteht — eine Ohnmacht, eine allergische Reaktion, ein Schwindelanfall, eine Atemnot —, kann der Schiedsrichter bis zu 15 Minuten gewähren; bei einem ungewöhnlichen Umstand, etwa einem unfreiwilligen Sturz oder einem Ball, der einen Spieler trifft, sind bis zu 5 Minuten zur Erholung möglich.

*Hinweis zum Tiebreak*: Das Regelwerk enthält hier zwei Bestimmungen, die nicht zueinander passen — die eine sagt, im Tiebreak werde durchgespielt und beim Seitenwechsel gebe es keine Pause, die andere gewährt für diesen Wechsel 20 Sekunden. In der Praxis gelten die 20 Sekunden.`,
  },
  "player-positions": {
    title: "Position der Spieler auf dem Platz",
    status: "machine",
    bodyMd: `Bei jedem Punkt hat ein Team einen Aufschläger und einen begleitenden Partner; das gegnerische Team hat einen Rückschläger (diagonal zum Aufschläger positioniert) und einen begleitenden Partner.

Der Rückschläger darf sich überall auf seiner Platzseite positionieren — er muss nicht im Aufschlagfeld bleiben. Dasselbe gilt für die beiden Partner, die nicht direkt am Aufschlag beteiligt sind: Sie dürfen sich frei auf ihrer Netzseite positionieren.`,
  },
  "choice-of-sides": {
    title: "Der Münzwurf: Wer schlägt zuerst auf und von welcher Seite",
    status: "machine",
    bodyMd: `Vor Matchbeginn entscheidet meist ein Münzwurf, wer zuerst wählen darf. Das Team, das den Wurf gewinnt, kann aus drei Optionen wählen:

- Zuerst aufschlagen oder returnieren (dann wählt das andere Team die Seite).
- Die Seite für das erste Spiel wählen (dann wählt das andere Team Aufschlag oder Return).
- Die Gegner zuerst wählen lassen.

Nach der Entscheidung teilen beide Teams dem Schiedsrichter mit, wer zuerst aufschlägt und returniert.`,
  },
  "changes-of-sides": {
    title: "Seitenwechsel",
    status: "machine",
    bodyMd: `Die Teams wechseln die Seite nach dem 1., dem 3. und jedem weiteren ungeraden Spiel innerhalb eines Satzes (also immer, wenn die Gesamtzahl der gespielten Spiele im Satz ungerade ist).

Im Tiebreak wird alle 6 Punkte die Seite gewechselt.

Vergessen die Teams den Seitenwechsel, wird das korrigiert, sobald der Fehler bemerkt wird — anschließend folgt man der richtigen Reihenfolge. Bereits gewonnene Punkte bleiben gültig. Eine praktische Folge sollte man kennen: Fällt der Fehler erst auf, nachdem ein erster Aufschlag misslungen ist, bleibt dem Aufschläger nur noch der zweite Aufschlag.`,
  },
  "serve-fault": {
    title: "Wann ein Aufschlag ein Fehler ist",
    status: "machine",
    bodyMd: `Ein Aufschlag gilt unter anderem in folgenden Fällen als Fehler:

- Verstoß gegen die in "Der Aufschlag" beschriebenen Regeln zu Position, Trefferhöhe oder Flugbahn.
- Der Aufschläger verfehlt den Ball beim Aufschlagversuch komplett.
- Der Ball landet außerhalb des gegnerischen Aufschlagfelds (die Linien zählen als gültig).
- Der Ball berührt den Aufschläger, seinen Partner oder etwas, das sie tragen oder bei sich haben.
- Der Ball landet im richtigen Aufschlagfeld, berührt danach aber vor dem zweiten Aufspringen den Maschendraht.
- Der Ball landet im richtigen Aufschlagfeld und fliegt direkt durch die Öffnung hinaus — auf einem Platz ohne Sicherheitszone und damit ohne erlaubtes Spiel außerhalb des Platzes.

Ein Fehler beim ersten Aufschlag gibt Anspruch auf einen zweiten. Zwei Fehler hintereinander kosten den Punkt — und es gibt Fälle, in denen dem Aufschläger von vornherein nur ein Aufschlag bleibt, etwa wenn ein Seitenwechselfehler zu spät korrigiert wird.`,
  },
  "return-of-serve": {
    title: "Wie der Aufschlag returniert wird",
    status: "machine",
    bodyMd: `Der Rückschläger muss den Ball im eigenen Aufschlagfeld aufspringen lassen und ihn vor dem zweiten Aufspringen zurückspielen.

Im ersten Spiel jedes Satzes entscheidet das returnierende Team, welcher Spieler zuerst returniert — diese Reihenfolge bleibt für den gesamten Satz fest (sie kann erst zu Beginn des nächsten Satzes geändert werden). Wird die Reihenfolge mitten in einem Spiel versehentlich vertauscht, spielt man so bis zum Ende dieses Spiels oder Tiebreaks weiter und kehrt danach zur ursprünglichen Reihenfolge zurück.

Berührt der Ball einen der Rückschläger (oder dessen Schläger), bevor er aufspringt, geht der Punkt automatisch an das aufschlagende Team.`,
  },
  interference: {
    title: "Behinderung zwischen Spielern",
    status: "machine",
    bodyMd: `Von Behinderung spricht man, wenn ein Spieler — absichtlich oder unabsichtlich — einen Gegner bei der Ausführung eines Schlags stört.

- Ist sie **absichtlich**, geht der Punkt automatisch an das gegnerische Team.
- Ist sie **unabsichtlich**, wird der Punkt wiederholt ("Let").
- Verursacht dasselbe Team eine zweite unabsichtliche Behinderung, verliert es den umstrittenen Punkt.`,
  },
  "ball-in-play": {
    title: 'Wann der Ball "im Spiel" ist',
    status: "machine",
    bodyMd: `Der Ball ist ab dem Moment eines gültigen Aufschlags im Spiel, bis der Punkt entschieden ist (durch ein "Let" oder ein eindeutiges Ergebnis).

Ein wichtiges Detail: Sobald der Ball auf deiner Platzseite aufgesprungen ist, bleibt er im Spiel, auch wenn er danach eine Wand, den Maschendraht, das Netz oder die Pfosten berührt — all diese Elemente gehören genau wie der Boden zur Spielfläche.

Was den Ballwechsel beendet, ist das zweite Aufspringen auf dem Boden. Es ist aber nicht die einzige Art, den Punkt zu verlieren, solange der Ball im Spiel ist — die übrigen stehen unter "Die häufigsten Arten, einen Punkt zu verlieren".`,
  },
  "point-lost": {
    title: "Die häufigsten Arten, einen Punkt zu verlieren",
    status: "machine",
    bodyMd: `Das Regelwerk listet viele konkrete Fälle auf, die häufigsten im Alltag sind aber:

- Der Ball springt auf deiner Seite zweimal auf, bevor du ihn zurückspielst.
- Du, dein Schläger oder etwas, das du trägst, berührt das Netz, die Pfosten, das Spannkabel oder den gegnerischen Platz, während der Ball im Spiel ist.
- Nach deinem Schlag berührt der Ball den Maschendraht oder den Boden auf deiner eigenen Seite, statt zum gegnerischen Platz zu fliegen.
- Du triffst den Ball zweimal hintereinander (Doppelberührung).
- Beide Spieler desselben Teams schlagen den Ball, gleichzeitig oder nacheinander — nur einer darf ihn spielen. **Achtung**: Keine Doppelberührung liegt vor, wenn beide zum Ball gehen, einer den Ball trifft und der andere den Schläger des Partners.
- Der Ball im Spiel berührt dich, deinen Partner oder etwas, das ihr tragt — egal ob du versucht hast, ihn zurückzuspielen oder nicht, und selbst wenn er ohnehin aus dem Platz geflogen wäre.
- Du machst zwei Aufschlagfehler in Folge.
- Dir fällt der Schläger herunter, oder deine Sicherheitsschlaufe reißt, während des Punkts.

Diese Liste ist nicht vollständig — den kompletten Text findest du im offiziellen Regelwerk.`,
  },
  "correct-return": {
    title: "Was als gültiger Rückschlag zählt",
    status: "machine",
    bodyMd: `Ein Rückschlag ist in Situationen gültig, die Padel-Einsteiger manchmal überraschen.

In diesen Fällen bleibt der Ball im Platz und der Ballwechsel läuft weiter — der Gegner muss ihn vor dem zweiten Aufspringen zurückspielen:

- Der Ball springt auf deiner Seite am Boden auf, kommt von deiner eigenen Wand zurück, und *dort* schlägst du ihn — hinüber zum gegnerischen Platz. Achte auf die Reihenfolge: **erst der Boden, dann die Wand**. Du darfst den Ball nicht gegen deine eigene Wand spielen, um ihn übers Netz zu befördern; das ist Squash, nicht Padel.
- Der Ball berührt das Netz oder die Pfosten und landet trotzdem korrekt im gegnerischen Feld.
- Der Ball landet genau in der Ecke, wo die Wand auf den Boden trifft.

Ein weiterer Fall wird häufig falsch bewertet: Der Ball springt korrekt im gegnerischen Feld auf und verlässt erst danach den Platz, wobei er die Decke, die Beleuchtung oder ein anderes spielfremdes Element trifft. **Dein Rückschlag war gültig** — das heißt aber nicht, dass der Ballwechsel weitergeht. Was dann passiert, hängt davon ab, ob der Platz Spiel außerhalb erlaubt und wo der Ball hinausgeflogen ist; siehe "Spiel außerhalb des Platzes" und "Die häufigsten Arten, einen Punkt zu verlieren".`,
  },
  "point-won": {
    title: "Weniger offensichtliche Arten, einen Punkt zu gewinnen",
    status: "machine",
    bodyMd: `Neben einem verfehlten Rückschlag des Gegners gibt es zwei padel-typische Situationen, in denen ein Punkt direkt gewonnen wird:

- Der Ball springt korrekt im gegnerischen Feld auf und fliegt danach durch ein Loch im Maschendraht hinaus oder bleibt darin stecken.
- Der Ball bleibt auf der flachen Fläche oben auf der Wand stecken, nachdem er korrekt im gegnerischen Feld aufgesprungen ist.`,
  },
  "change-of-balls": {
    title: "Wechsel der Bälle während des Turniers",
    status: "machine",
    bodyMd: `Vor jedem Wettbewerb muss der Veranstalter im Voraus bekannt geben: Marke und Typ der Bälle, wie viele pro Match verwendet werden (meist 2 oder 3), und die Regelung zum Wechsel der Bälle, falls vorhanden.

Ist ein Wechsel vorgesehen, geschieht er üblicherweise:

- Nach einer vorher festgelegten ungeraden Anzahl von Spielen. Für diese Zählung gilt das Einspielen als **zwei Spiele** und der Tiebreak als **eines**.
- Zu Beginn eines Satzes.
- Nie direkt zu Beginn eines Tiebreaks — in diesem Fall verschiebt sich der Wechsel auf den Beginn des zweiten Spiels im folgenden Satz.

Geht ein Ball während des Matches verloren oder wird er beschädigt, wird er sofort ersetzt; womit, hängt davon ab, wie lange der letzte Wechsel zurückliegt: In den **ersten beiden Spielen** danach kommt ein neuer Ball herein, ab da ein gebrauchter mit vergleichbarer Abnutzung, damit niemand einen Vorteil bekommt.

Weitergespielt wird nicht mit **nur einem Ball**. Mit zweien geht es, auch wenn eigentlich drei vorgesehen sind, normal weiter.`,
  },
};
