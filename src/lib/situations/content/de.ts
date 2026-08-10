import type { SituationContent } from "../types";

// Originalinhalt (nie aus dem offiziellen Regelwerk kopiert) — siehe PROJECT.md §1.2/§6.2.
// Status "machine": noch nicht von jemandem mit Padel-Kenntnissen geprüft.
export const de: Record<string, SituationContent> = {
  "wall-bounce-still-in-play": {
    question: "Der Ball hat nach dem Aufspringen die Wand auf meiner Seite getroffen — darf ich ihn noch zurückspielen?",
    status: "machine",
    answerMd:
      "Ja. Beim Padel bleibt der Ball im Spiel, sobald er auf deiner Seite aufgesprungen ist — auch wenn er danach eine Wand oder den Maschendraht rund um den Platz trifft. Die Wände gehören genau wie der Boden zur Spielfläche. Was den Ballwechsel beendet, ist das **zweite** Aufspringen auf dem Boden, bevor du den Ball zurückspielst.",
  },
  "net-touch-on-serve": {
    question: "Der Aufschlag hat das Netz berührt und ist trotzdem im richtigen Feld gelandet — ist das ein Fehler?",
    status: "machine",
    answerMd:
      "Nein, solange der Ball nicht vor dem zweiten Aufspringen den Maschendraht berührt. Berührt er beim Aufschlag das Netz oder die Pfosten, landet im richtigen Aufschlagfeld und bleibt dort, wird der Aufschlag ohne Nachteil für den Aufschläger wiederholt. Geht er nach dem Aufspringen im Feld aber noch vor dem zweiten Aufspringen in den Maschendraht, ist es ein Fehler — und keine Wiederholung.",
  },
  "ball-out-over-end-wall": {
    question: "Nachdem der Ball korrekt auf meiner Seite aufgesprungen ist, flog er über die hintere Wand hinaus — ist der Punkt damit schon entschieden?",
    status: "machine",
    answerMd:
      "Ja, er ist entschieden: Du hast den Punkt verloren. Der Weg **über die hintere Wand** ist genau der Fall, in dem das Regelwerk kein Spiel außerhalb des Platzes erlaubt, auch wenn der Platz eine Sicherheitszone hat — da ist nichts mehr zu holen.\n\nAnders liegt es, wenn der Ball **seitlich oder durch die Öffnung** hinausfliegt: Auf einem Platz mit Sicherheitszone darfst dann **du** hinauslaufen und ihn von außen zurückspielen, denn der Ball ist auf deiner Seite aufgesprungen und der Rückschlag gehört dir. Dieser Ballwechsel endet, sobald der Ball ein zweites Mal aufspringt oder etwas Spielfremdes berührt.",
  },
  "return-from-outside-court": {
    question: "Ein Spieler hat den Platz verlassen, um den Ball zurückzuspielen, und es geschafft — zählt der Punkt?",
    status: "machine",
    answerMd:
      'Ja, sofern der Platz Spiel außerhalb des Platzes erlaubt (siehe "Spiel außerhalb des Platzes"). Das ist eine der charakteristischsten Regeln im Padel: Bei ausreichend Platz und einer Öffnung dürfen Spieler seitlich hinauslaufen, den Ball zurückspielen und wieder hereinkommen.',
  },
  "ball-touches-player": {
    question: "Der Ball hat mich getroffen, bevor ich ihn zurückspielen konnte — verliere ich immer den Punkt?",
    status: "machine",
    answerMd:
      "Das hängt vom Zeitpunkt ab. War es beim Return eines Aufschlags, geht der Punkt automatisch an den Aufschläger. Im normalen Spielverlauf (außerhalb des Aufschlags) verliert immer, wer vom Ball getroffen wird — selbst wenn der Ball bereits auf dem Weg aus dem Platz war.",
  },
  "serve-lands-outside-box": {
    question: "Der Aufschlag landete außerhalb des richtigen Feldes — ist das ein Fehler?",
    status: "machine",
    answerMd:
      "Ja. Der Aufschlag muss im gegnerischen Aufschlagfeld auf der richtigen Seite aufspringen (die Linien zählen als gültig). Landet er außerhalb, ist das ein Fehler. War es der erste Aufschlag, hast du noch einen zweiten; war es bereits der zweite, ist der Punkt verloren.",
  },
  "double-hit": {
    question: "Ich habe den Ball versehentlich zweimal hintereinander getroffen — was passiert?",
    status: "machine",
    answerMd:
      'Du verlierst den Punkt — das gilt als "Doppelberührung". Eine Ausnahme gibt es: Gehen du und dein Partner beide zum Ball, und einer von euch trifft den Ball, während der andere den Schläger des Partners trifft, zählt das nicht als Doppelberührung.',
  },
  "ball-splits": {
    question: "Der Ball ist mitten im Punkt aufgeplatzt — was passiert dann?",
    status: "machine",
    answerMd:
      'Der Punkt wird komplett neu gespielt ("Let"), ohne Nachteil für eines der beiden Teams. Dasselbe gilt, wenn etwas Spielfremdes den Punkt unerwartet unterbricht.',
  },
};
