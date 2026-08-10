import type { SituationContent } from "../types";

// Contenido original (nunca copiado del reglamento oficial) — ver PROJECT.md §1.2/§6.2.
// Estado "machine": todavía no revisado por nadie con conocimiento de pádel.
export const es: Record<string, SituationContent> = {
  "wall-bounce-still-in-play": {
    question: "La bola tocó la pared de mi lado después de botar en el suelo — ¿todavía puedo devolverla?",
    status: "machine",
    answerMd:
      "Sí. En pádel, una vez que la bola ha botado en tu lado, sigue en juego aunque después toque una pared o la malla metálica que rodea la pista — las paredes forman parte del área de juego, igual que el suelo. Lo que termina la jugada es que la bola bote una **segunda vez** en el suelo antes de que la devuelvas.",
  },
  "net-touch-on-serve": {
    question: "El saque tocó la red y aun así cayó en el cuadro correcto — ¿es falta?",
    status: "machine",
    answerMd:
      "No, siempre que la bola no toque la malla metálica antes del segundo bote. Si toca la red o los postes, cae dentro del cuadro correcto y se queda ahí, el saque simplemente se repite, sin penalización para quien saca. Pero si, después de botar en el cuadro, se va a la malla metálica antes de botar por segunda vez, entonces sí es falta — y no repetición.",
  },
  "ball-out-over-end-wall": {
    question: "Después de botar correctamente en mi campo, la bola salió por encima de la pared del fondo — ¿el punto ya está decidido?",
    status: "machine",
    answerMd:
      "Sí, está decidido: has perdido el punto. La salida **por encima de la pared del fondo** es el caso en que el reglamento no autoriza el juego exterior, aunque la pista tenga zona de seguridad — no hay nada que ir a buscar.\n\nEs distinto si la bola sale **por el lateral o por la puerta**: ahí sí, en una pista con zona de seguridad, eres **tú** quien puede salir corriendo y devolverla desde fuera, porque la bola botó en tu lado y la devolución es tuya. Esa jugada termina si la bola bota una segunda vez o toca algo ajeno a la pista.",
  },
  "return-from-outside-court": {
    question: "Un jugador salió de la pista para devolver la bola y lo consiguió — ¿el punto es válido?",
    status: "machine",
    answerMd:
      'Sí, siempre que la pista permita jugar fuera de ella (ver "Jugar fuera de la pista"). Es una de las reglas más características del pádel: con suficiente espacio y apertura, los jugadores pueden salir por el lateral, devolver la bola y volver a entrar en juego.',
  },
  "ball-touches-player": {
    question: "La bola me tocó antes de poder devolverla — ¿pierdo siempre el punto?",
    status: "machine",
    answerMd:
      "Depende del momento. Si fue al recibir un saque, el punto es automáticamente para quien saca. En una jugada normal (fuera del saque), quien sea tocado por la bola pierde siempre el punto, aunque la bola ya estuviera saliendo de la pista.",
  },
  "serve-lands-outside-box": {
    question: "El saque cayó fuera del cuadro correcto — ¿es falta?",
    status: "machine",
    answerMd:
      "Sí. El saque debe botar dentro del cuadro de saque del rival, en el lado correcto (las líneas cuentan como válidas). Si cae fuera, es falta. Si fue en el primer saque, tienes derecho a un segundo; si ya era el segundo, pierdes el punto.",
  },
  "double-hit": {
    question: "Golpeé la bola dos veces seguidas sin querer — ¿qué pasa?",
    status: "machine",
    answerMd:
      'Pierdes el punto — se considera "doble golpe". Hay una excepción: si tú y tu pareja vais a por la bola a la vez y uno golpea la bola mientras el otro golpea la pala del compañero, eso no cuenta como doble golpe.',
  },
  "ball-splits": {
    question: "La bola se rompió a mitad del punto — ¿qué se hace?",
    status: "machine",
    answerMd:
      'El punto se repite desde cero ("let"), sin penalización para ninguna pareja. Lo mismo ocurre si algo ajeno al juego interrumpe el punto de forma inesperada.',
  },
};
