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
  bajada: {
    term: "Bajada",
    status: "machine",
    definitionMd:
      'Es el golpe de ataque más directo del pádel: golpear la bola por encima de la cabeza con fuerza, normalmente después de un globo mal ejecutado del rival, buscando terminar el punto o forzar un error. También se le llama simplemente "remate".',
  },
  contrapared: {
    term: "Contrapared",
    status: "machine",
    definitionMd:
      "Es la devolución de una bola después de que bote en la pared del fondo de tu pista. La clave está en dejar que la bola bote primero en el suelo y después en la pared (o al revés, según la trayectoria) antes de devolverla, aprovechando el bote en vez de huir de él.",
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
  x3: {
    term: "X3",
    status: "machine",
    definitionMd:
      "X3 es un patrón de posicionamiento táctico en el que los cuatro jugadores (las dos parejas) tienden a subir a la red casi al mismo tiempo, creando un intercambio directo entre ambas parejas en esa zona. Es un concepto que se trabaja a menudo en los entrenamientos para mejorar reflejos y posicionamiento en la red.",
  },
  manos: {
    term: "Manos",
    status: "machine",
    definitionMd:
      "Se refiere a los intercambios rápidos de voleas junto a la red, cuando ambas parejas están una frente a la otra muy cerca. Exige reflejos rápidos y la pala bien colocada delante del cuerpo, más que fuerza.",
  },
};
