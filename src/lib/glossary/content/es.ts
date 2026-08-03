import type { GlossaryContent } from "../types";

// Contenido original, escrito a partir de conocimiento general y establecido del pádel
// (nunca copiado de blogs ni canales existentes — ver PROJECT.md §3/§4).
// Estado "machine": todavía no revisado por nadie con conocimiento de pádel.
export const es: Record<string, GlossaryContent> = {
  bandeja: {
    term: "Bandeja",
    status: "machine",
    definitionMd:
      "La bandeja es un golpe de defensa/control ejecutado por encima de la cabeza, normalmente para responder a un globo del rival. En vez de intentar un remate con fuerza, golpeas la bola con un gesto más suave y controlado, manteniendo tu posición cerca de la red en lugar de retroceder. Es uno de los golpes más característicos del pádel, sin equivalente directo en el tenis.",
  },
  vibora: {
    term: "Víbora",
    status: "machine",
    definitionMd:
      "La víbora es una variante más agresiva de la bandeja: en vez de un gesto controlado, le das a la bola un efecto lateral (cortado), con más velocidad y una trayectoria más rasa y difícil de devolver. El nombre viene de la serpiente, por el movimiento lateral del brazo.",
  },
  chiquita: {
    term: "Chiquita",
    status: "machine",
    definitionMd:
      "La chiquita es un golpe suave y bajo, jugado a propósito a los pies del rival cuando está cerca de la red. Le obliga a devolver la bola de abajo hacia arriba (volea defensiva), lo que te da tiempo para acercarte a la red con ventaja.",
  },
  globo: {
    term: "Globo",
    status: "machine",
    definitionMd:
      "El globo es un golpe alto y profundo, jugado por encima de los rivales que están junto a la red, para obligarlos a retroceder o para que tú (o tu pareja) ganéis tiempo para llegar a la red. Es probablemente el golpe táctico más usado en pádel: mal ejecutado, regala una bandeja fácil al rival; bien ejecutado, cambia la dinámica del punto.",
  },
  remate: {
    term: "Remate",
    status: "machine",
    definitionMd:
      "El remate es el golpe de ataque por encima de la cabeza, golpeado con fuerza para intentar cerrar el punto. A diferencia del tenis, en pádel rara vez acaba el punto a la primera: la bola rebota en las paredes y vuelve a estar en juego. La decisión que importa no es cómo rematar, sino cuándo — muchas veces la bandeja o la víbora valen más, porque te dejan en la red en lugar de empujarte atrás.",
  },
  bajada: {
    term: "Bajada",
    status: "machine",
    definitionMd:
      "La bajada es el golpe que juegas a la bola después de que rebote en la pared del fondo de tu pista, golpeándola de arriba abajo, rasa y con ritmo. Es la respuesta agresiva a un remate o a un globo que te ha pasado por encima: en lugar de devolver otro globo defensivo, aprovechas el rebote de la pared para quitarle la iniciativa al rival. No confundir con el remate — la bajada se define por la pared, no por la fuerza.",
  },
  "salida-de-pared": {
    term: "Salida de pared",
    status: "machine",
    definitionMd:
      "Es la técnica para devolver una bola que viene directamente de la pared lateral o del fondo, sin dejarte sorprender. En vez de intentar atacar, el objetivo habitual es devolver la bola de forma controlada y alta, para recuperar la posición en el punto.",
  },
  "net-positioning": {
    term: "Posicionamiento en la red",
    status: "machine",
    definitionMd:
      "En pádel, la red es la posición dominante: quien está allí tiene más opciones de ataque y reduce los ángulos del rival. Un buen posicionamiento significa mantenerse cerca de la red sin dejar huecos detrás ni desalinearte de tu pareja, para cubrir la pista juntos.",
  },
  contrapared: {
    term: "Contrapared",
    status: "machine",
    definitionMd:
      "En la contrapared golpeas la bola a propósito contra una pared de tu propia pista, para que pase por encima de la red y caiga en el campo contrario. Es un recurso de emergencia: se usa cuando la bola ya te ha pasado y no hay forma de jugarla directamente por encima de la red. Rara vez gana el punto — te mantiene en él.",
  },
  manos: {
    term: "Manos (toque)",
    status: "machine",
    definitionMd:
      "Manos es el toque: la capacidad de controlar la bola con sensibilidad en lugar de fuerza — amortiguar una bola rápida, dejar una chiquita a los pies del rival, cambiar el ritmo del punto. Se dice que un jugador tiene buenas manos cuando resuelve estas bolas con suavidad y precisión. En pádel cuenta más que la potencia.",
  },
};
