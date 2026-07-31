import type { SituationContent } from "../types";

// Originalinhalt (nie aus dem offiziellen Regelwerk kopiert) — siehe PROJECT.md §1.2/§6.2.
// Status "machine": noch nicht von jemandem mit Padel-Kenntnissen geprüft.
export const de: Record<string, SituationContent> = {
  "wall-bounce-still-in-play": {
    question: "Der Ball hat nach dem Aufspringen die Wand auf meiner Seite getroffen — darf ich ihn noch zurückspielen?",
    status: "machine",
    answerMd:
      "Ja. Beim Padel bleibt der Ball im Spiel, sobald er auf deiner Seite aufgesprungen ist — auch wenn er danach eine Wand oder den Maschendraht rund um den Platz trifft. Die Wände gehören genau wie der Boden zur Spielfläche. Du verlierst den Punkt nur, wenn der Ball ein **zweites Mal** aufspringt, bevor du ihn zurückspielst.",
  },
  "net-touch-on-serve": {
    question: "Der Aufschlag hat das Netz berührt und ist trotzdem im richtigen Feld gelandet — ist das ein Fehler?",
    status: "machine",
    answerMd:
      "Nein. Berührt der Ball beim Aufschlag das Netz oder die Pfosten und landet trotzdem im richtigen Aufschlagfeld, zählt das nicht als Fehler — der Aufschlag wird einfach wiederholt, ohne Nachteil für den Aufschläger.",
  },
  "ball-out-over-end-wall": {
    question: "Nachdem der Ball korrekt auf meiner Seite aufgesprungen ist, flog er über die hintere Wand hinaus — ist der Punkt damit schon entschieden?",
    status: "machine",
    answerMd:
      "Nicht unbedingt. Verfügt der Platz über eine Sicherheitszone und erlaubt Spiel außerhalb des Platzes, kann der Gegner den Ball noch draußen erreichen und zurückspielen. Der Punkt ist erst entschieden, wenn der Ball dort hinausfliegt, wo Spiel außerhalb nicht erlaubt ist, oder wenn er draußen ein zweites Mal aufspringt oder etwas Spielfremdes berührt.",
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
      "Ja. Der Aufschlag muss im gegnerischen Aufschlagfeld auf der richtigen Seite aufspringen (die Linien zählen als gültig). Landet er außerhalb, ist das ein Fehler — wie bei jedem Aufschlag gibt es vor dem Punktverlust noch einen zweiten Versuch.",
  },
  "double-hit": {
    question: "Ich habe den Ball versehentlich zweimal hintereinander getroffen — was passiert?",
    status: "machine",
    answerMd:
      'Du verlierst den Punkt — das gilt als "Doppelberührung". Eine Ausnahme gibt es: Gehen du und dein Partner gleichzeitig zum Ball, und einer trifft den Ball, während er auch den Schläger des Partners berührt, zählt das nicht als Doppelberührung.',
  },
  "ball-splits": {
    question: "Der Ball ist mitten im Punkt aufgeplatzt — was passiert dann?",
    status: "machine",
    answerMd:
      'Der Punkt wird komplett neu gespielt ("Let"), ohne Nachteil für eines der beiden Teams. Dasselbe gilt, wenn etwas Spielfremdes den Punkt unerwartet unterbricht.',
  },
};
