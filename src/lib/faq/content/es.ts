import type { FaqContent } from "../types";

// Contenido original, escrito a partir de conocimiento general y establecido del pádel
// (nunca copiado de blogs ni canales existentes — ver PROJECT.md §3/§4).
// Estado "machine": todavía no revisado por nadie con conocimiento de pádel.
export const es: Record<string, FaqContent> = {
  "how-many-players": {
    question: "¿Cuántas personas hacen falta para jugar al pádel?",
    status: "machine",
    answerMd:
      "Cuatro: el pádel se juega por parejas, dos a cada lado de la red. Existen pistas de individuales, más estrechas, pero el juego de competición y el reglamento oficial son de parejas.\n\nPor eso casi todo en pádel acaba siendo una cuestión de coordinación: dónde está tu pareja, quién cubre el centro, quién sube a la red. En una pista cerrada y pequeña, dos jugadores desalineados dejan huecos que el rival encuentra enseguida.",
  },
  "padel-vs-tennis": {
    question: "¿En qué se diferencia el pádel del tenis?",
    status: "machine",
    answerMd:
      "La puntuación es idéntica. Casi todo lo demás cambia:\n\n- **Las paredes forman parte del juego.** La bola puede rebotar en el cristal y seguir viva — en tenis sería punto perdido.\n- **La pista es cerrada y más pequeña**, y siempre se juega por parejas.\n- **El saque es por debajo**, botando la bola en el suelo antes de golpearla. No hay saques directos a 200 km/h.\n- **La pala es rígida y sin cuerdas**, perforada y más corta que una raqueta.\n\nEl resultado práctico: los puntos duran más y se ganan con posición y paciencia, no con potencia.",
  },
  "need-tennis-experience": {
    question: "¿Necesito saber jugar al tenis para empezar en pádel?",
    status: "machine",
    answerMd:
      "No. El pádel es uno de los deportes de raqueta más fáciles de empezar: la pista es pequeña, la pala es corta y las paredes te dan una segunda oportunidad en bolas que en otro deporte ya estarían perdidas.\n\nVenir del tenis ayuda a leer la bola, pero trae dos hábitos que estorban: **movimientos de brazo demasiado largos** — en pádel no hay espacio para ellos — y **retroceder cuando la bola va alta**, en lugar de esperarla junto a la red y responder con una bandeja. Quien nunca ha jugado al tenis no tiene esos hábitos que deshacer.",
  },
  "which-side": {
    question: "¿Debo jugar en el lado derecho o en el izquierdo?",
    status: "machine",
    answerMd:
      "Es una convención, no una regla — puedes jugar en cualquier lado. En la práctica, las parejas suelen repartirlo así:\n\n- **Derecha:** quien da continuidad al punto, con juego regular y pocos errores.\n- **Izquierda:** quien cierra los puntos, porque muchas bolas altas caen a ese lado y de ahí suelen salir los remates.\n\nSi estás empezando, juega en los dos. Solo después de unas semanas entenderás en qué lado eres más útil — y esa respuesta cambia según la pareja con la que juegues.",
  },
  scoring: {
    question: "¿Cómo se cuenta el resultado en pádel?",
    status: "machine",
    answerMd:
      "Exactamente igual que en tenis. Los puntos van 15, 30, 40 y juego, con dos puntos de diferencia a partir del 40-40. Los juegos forman sets: gana el set quien llegue a seis juegos con dos de ventaja, y al 6-6 se juega un tie-break. Los partidos son normalmente al mejor de tres sets.\n\nLa regla completa, con el artículo oficial de la FIP, está en la sección de Reglas.",
  },
  "walls-in-play": {
    question: "¿Puedo jugar la bola después de que toque la pared?",
    status: "machine",
    answerMd:
      "Sí — siempre que la bola haya botado primero en el suelo de tu pista. El orden importa y no se puede invertir: **suelo y después pared**. Si la bola golpea tu pared directamente sin tocar el suelo, el punto es del rival.\n\nTras ese primer bote la bola puede tocar el cristal, la malla, o ambos, y sigue en juego hasta que bote una segunda vez en el suelo. Aprender a esperar ese rebote en lugar de huir de él es la diferencia más visible entre quien empezó ayer y quien lleva unos meses jugando.",
  },
  "ball-out-of-court": {
    question: "¿Puede la bola salir de la pista y seguir el punto?",
    status: "machine",
    answerMd:
      "Puede. Si la bola sale del recinto después de botar en tu pista, tienes derecho a salir por la puerta lateral, jugarla desde fuera y devolverla dentro — siempre que no haya botado una segunda vez en el suelo.\n\nEs uno de los momentos más espectaculares del pádel y depende de la pista: solo es posible donde hay aperturas laterales. En pistas totalmente cerradas, la bola que sale es punto ganado para quien la mandó.",
  },
  "first-equipment": {
    question: "¿Qué material necesito para la primera clase?",
    status: "machine",
    answerMd:
      "Menos de lo que se piensa:\n\n- **Pala** — la mayoría de los clubes prestan o alquilan las primeras veces. No compres antes de saber si te gusta.\n- **Bolas** — normalmente incluidas en la clase.\n- **Zapatillas** — las de tenis o de pádel sirven; lo que importa es una suela con agarre lateral. Las de running son la elección equivocada, porque su suela está hecha para ir hacia delante y el pádel está hecho de frenadas laterales.\n- **Ropa deportiva cómoda** y agua.\n\nEl orden correcto de compra es zapatillas primero, pala después.",
  },
  "choosing-first-racket": {
    question: "¿Cómo elijo mi primera pala?",
    status: "machine",
    answerMd:
      "Para empezar, busca una pala **redonda**. La forma determina dónde está el punto dulce:\n\n- **Redonda** — punto dulce en el centro y más grande, perdona los golpes descentrados. Es la forma indicada para quien empieza.\n- **Lágrima** — equilibrio entre control y potencia.\n- **Diamante** — punto dulce alto y pequeño, da más potencia pero castiga cualquier imprecisión. No es una pala para las primeras semanas.\n\nBusca también una pala más ligera y con núcleo blando: cansa menos el brazo y es más cómoda en el impacto. Las dimensiones máximas están fijadas en el reglamento oficial, así que ninguna pala a la venta te da ventaja ilegal — la diferencia está en la forma, el peso y los materiales.",
  },
  "padel-balls": {
    question: "¿Las bolas de pádel son iguales que las de tenis?",
    status: "machine",
    answerMd:
      "Lo parecen, pero no lo son. La bola de pádel tiene menos presión interna, lo que le da un bote más bajo y un juego más controlado — esencial en una pista pequeña donde además rebota en las paredes.\n\nJugar con bolas de tenis en una pista de pádel hace el juego demasiado rápido e impredecible. Las tolerancias de peso, diámetro y bote están definidas en el reglamento oficial.",
  },
};
