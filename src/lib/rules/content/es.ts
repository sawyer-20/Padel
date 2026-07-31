import type { RuleContent } from "../types";

// Contenido original (nunca copiado del reglamento oficial) — ver PROJECT.md §1.2/§6.2.
// Estado "machine": todavía no revisado por nadie con conocimiento de pádel.
export const es: Record<string, RuleContent> = {
  scoring: {
    title: "Cómo se cuenta un juego, un set y un partido",
    status: "machine",
    bodyMd: `El pádel cuenta los puntos igual que el tenis: el primer punto vale 15, el segundo 30, el tercero 40, y el cuarto gana el juego — siempre que la diferencia sea de al menos dos puntos.

Si ambas parejas llegan a 40-40, se llama **iguales** (deuce). A partir de ahí hay dos formas de decidir el juego, y cada torneo elige una en su reglamento:

- **Ventaja clásica**: quien gana el siguiente punto se pone por delante; si gana otra vez, cierra el juego, si pierde se vuelve a iguales.
- **Punto de oro (golden point)**: en vez de ventajas sucesivas, se juega un único punto decisivo. Quien lo gana, gana el juego. Es el formato más usado hoy en día en el pádel profesional, porque hace que la duración de los juegos sea más previsible.

Una pareja gana un **set** al llegar a 6 juegos, con al menos 2 de diferencia. Si el marcador llega a 6-6, se juega un **tie-break** (desempate por puntos, no por juegos) hasta 7 puntos, con 2 de ventaja.

Un **partido** se gana venciendo 2 de los 3 sets.`,
  },
  "the-serve": {
    title: "El saque: cómo empieza cada punto",
    status: "machine",
    bodyMd: `A diferencia del tenis, el saque en pádel siempre se golpea por debajo.

Reglas principales:

- Quien saca debe tener al menos un pie detrás de la línea de saque, sin pisarla ni sobrepasar la línea central imaginaria.
- La bola debe botar en el suelo y golpearse por debajo de la altura de la cintura, con al menos un pie en contacto con el suelo en el momento del impacto.
- La bola debe cruzar la red en diagonal y caer dentro del cuadro de saque del rival, en el lado opuesto.
- Cada pareja tiene derecho a dos intentos por punto (primer y segundo saque) — si ambos fallan, se pierde el punto.
- El lado desde el que se saca alterna en cada punto: primero se saca hacia la izquierda del rival, luego hacia la derecha, y así sucesivamente.`,
  },
  "let-and-net-serve": {
    title: '"Let" y saque de red: cuándo se repite un saque',
    status: "machine",
    bodyMd: `No todo saque que sale mal es una falta — en ciertas situaciones el punto simplemente se repite, sin penalización para quien saca.

- **Saque de red**: si la bola toca la red o los postes y, aun así, cae dentro del cuadro de saque correcto, no se considera falta — se repite.
- **"Let" (repetición)**: si el rival no estaba listo para recibir, o algo ajeno al juego interrumpe el punto (por ejemplo, una bola de otra pista que entra en juego), el punto se repite desde cero.

Si la repetición ocurre en el primer saque, quien saca mantiene el derecho a los dos intentos. Si ocurre en el segundo saque, solo se repite ese segundo intento.`,
  },
  "out-of-court-play": {
    title: "Jugar fuera de la pista: la regla que hace único al pádel",
    status: "machine",
    bodyMd: `Una de las características más distintivas del pádel es que, en pistas preparadas para ello, los jugadores pueden salir del recinto cerrado para ir a por la bola.

Después de que la bola bote en tu lado, tú (o tu pareja) podéis salir por la apertura lateral de la pista y devolverla desde fuera, siempre que la bola siga en juego y la pista tenga una "zona de seguridad" alrededor (un espacio mínimo libre de obstáculos) que permita hacerlo con seguridad.

No está permitido en todas las pistas — depende de que haya suficiente espacio y aperturas alrededor. Cuando sí lo está, da lugar a algunos de los puntos más espectaculares del pádel: ver a un jugador salir corriendo de la pista, devolver la bola por encima de la red y volver a entrar en juego.`,
  },
  "court-dimensions": {
    title: "Dimensiones de la pista",
    status: "machine",
    bodyMd: `La pista de pádel es un rectángulo de **10 metros de ancho por 20 metros de largo** (medidas interiores), dividido por la mitad por una red.

- La red mide 88 cm de altura en el centro, subiendo hasta 92 cm junto a los postes laterales.
- Las líneas de saque están a 6,95 metros de la red, a cada lado.
- La pista está totalmente cerrada — parte de pared (cristal o material sólido) y parte de malla metálica, con una altura total de unos 4 metros en los fondos.
- La altura libre mínima sobre la pista es de 6 metros (se recomiendan 8 metros en instalaciones nuevas), sin obstáculos como focos de luz.

Estas medidas garantizan que el bote de la bola en las paredes sea previsible — esa previsibilidad es lo que permite los peloteos contra el cristal tan característicos del pádel.`,
  },
  "the-ball": {
    title: "La bola",
    status: "machine",
    bodyMd: `La bola de pádel se parece a la de tenis pero es ligeramente más pequeña, más ligera y con menos presión interna — adaptada a un juego que se desarrolla en una pista cerrada, con muchos botes en las paredes.

- Diámetro entre 6,35 y 6,77 cm.
- Peso entre 56,0 y 59,4 gramos.
- Una bola nueva, soltada desde 2,54 metros de altura sobre una superficie dura, debe botar entre 135 y 145 cm.
- En altitudes superiores a 1000 metros, se permite usar bolas con un bote más bajo (entre 121,92 y 135 cm), porque el aire más enrarecido hace que la bola bote más.`,
  },
  "the-racket": {
    title: "La pala",
    status: "machine",
    bodyMd: `La pala de pádel no tiene cuerdas — es una superficie sólida y perforada, muy distinta de una raqueta de tenis.

- Longitud total (cabeza más mango) de hasta 45,5 cm.
- Anchura máxima de 26 cm y grosor máximo de 38 mm.
- La superficie de golpeo está perforada por agujeros circulares, normalmente de entre 9 y 13 mm de diámetro en la zona central.
- Es obligatorio el uso de un cordón de seguridad sujeto al mango y alrededor de la muñeca — sirve para evitar que la pala salga despedida durante el juego.
- No puede llevar ningún dispositivo electrónico visible o sonoro que comunique información al jugador durante el juego.`,
  },
  times: {
    title: "Tiempos y pausas durante el partido",
    status: "machine",
    bodyMd: `El pádel tiene límites de tiempo definidos para mantener el ritmo del juego:

- **Entre puntos**: máximo 20 segundos.
- **Al cambiar de lado**: hasta 90 segundos (excepto después del primer juego de cada set y durante el tie-break, cuando no hay pausa).
- **Al final de cada set**: hasta 120 segundos.
- **Antes de empezar**: es obligatorio un peloteo de calentamiento de 3 minutos entre ambas parejas.

Si una pareja no está lista para jugar 10 minutos después de la hora oficial de inicio, puede perder el partido por "walkover" (W.O.), salvo casos de fuerza mayor.

En caso de lesión tratable, cada jugador tiene derecho a una pausa médica de 3 minutos, que puede repetirse en los dos cambios de lado siguientes, siempre dentro del tiempo reglamentario.`,
  },
  "player-positions": {
    title: "Posición de los jugadores en la pista",
    status: "machine",
    bodyMd: `En cada punto, una pareja tiene un jugador que saca y otro que acompaña; la pareja rival tiene un jugador que recibe (colocado en la diagonal de quien saca) y otro que acompaña.

El jugador que recibe puede colocarse en cualquier parte de su lado de la pista — no está obligado a quedarse dentro del cuadro de saque. Lo mismo vale para los dos compañeros que no están directamente implicados en el saque: pueden estar donde quieran, en su lado de la red.`,
  },
  "choice-of-sides": {
    title: "Sorteo: quién saca primero y de qué lado",
    status: "machine",
    bodyMd: `Antes de empezar el partido, se decide al azar (normalmente por sorteo o cara o cruz) quién elige primero. La pareja que gana el sorteo puede elegir entre tres opciones:

- Sacar o recibir primero (en ese caso, la otra pareja elige el lado de la pista).
- Elegir el lado de la pista para el primer juego (la otra pareja elige entonces si saca o recibe).
- Pedir a los rivales que elijan primero.

Una vez decidido, ambas parejas informan al árbitro de quién saca y quién recibe primero.`,
  },
  "changes-of-sides": {
    title: "Cambio de lado de la pista",
    status: "machine",
    bodyMd: `Las parejas cambian de lado de la pista después del 1º, del 3º, y de cada juego impar siguiente dentro de un set (es decir, siempre que la suma de juegos jugados en el set sea impar).

En el tie-break, el cambio de lado ocurre cada 6 puntos.

Si las parejas se olvidan de cambiar, se corrige en cuanto se detecta el error, siguiendo después el orden correcto — los puntos ya ganados hasta ese momento siguen siendo válidos.`,
  },
  "serve-fault": {
    title: "Cuándo el saque es falta",
    status: "machine",
    bodyMd: `El saque se considera falta en situaciones como:

- No cumplir las reglas de posición, altura de golpeo o trayectoria descritas en "El saque".
- El jugador falla completamente la bola al intentar sacarla.
- La bola cae fuera del cuadro de saque del rival (las líneas cuentan como buenas).
- La bola toca a quien saca, a su compañero, o a algo que lleven puesto o consigo.
- La bola bota en el cuadro de saque correcto pero después toca la malla metálica antes del segundo bote.

Como en cualquier saque, siempre hay derecho a un segundo intento antes de perder el punto.`,
  },
  "return-of-serve": {
    title: "Cómo se recibe el saque",
    status: "machine",
    bodyMd: `Quien recibe tiene que esperar a que la bola bote dentro de su cuadro de saque y devolverla antes del segundo bote en el suelo.

En el primer juego de cada set, la pareja que recibe decide qué jugador recibe primero — ese orden se mantiene durante todo el set (solo puede cambiar al principio del set siguiente). Si el orden se cambia por error a mitad de un juego, se sigue así hasta el final de ese juego o tie-break, volviendo después al orden inicial.

Si la bola toca a uno de los jugadores que recibe (o a su pala) antes de botar, el punto es automáticamente para la pareja que saca.`,
  },
  interference: {
    title: "Interferencia entre jugadores",
    status: "machine",
    bodyMd: `La interferencia ocurre cuando un jugador — de forma deliberada o involuntaria — estorba al rival mientras ejecuta un golpe.

- Si es **deliberada**, el punto va automáticamente para la pareja rival.
- Si es **involuntaria**, se repite el punto ("let").
- Si la misma pareja provoca una segunda interferencia involuntaria, pierde el punto en disputa.`,
  },
  "ball-in-play": {
    title: 'Cuándo la bola está "en juego"',
    status: "machine",
    bodyMd: `La bola está en juego desde el momento en que se ejecuta un saque válido hasta que se decide el punto (por "let" o por un resultado claro).

Un detalle importante: una vez que la bola ha botado en tu lado de la pista, sigue en juego aunque después toque una pared, la malla metálica, la red o los postes — todos estos elementos forman parte del área de juego, igual que el suelo. Solo se pierde el punto si la bola bota una segunda vez antes de devolverla.`,
  },
  "point-lost": {
    title: "Formas más comunes de perder un punto",
    status: "machine",
    bodyMd: `El reglamento enumera muchas situaciones específicas, pero las más comunes en el día a día son:

- La bola bota dos veces en tu lado antes de devolverla.
- Tú, tu pala, o algo que lleves puesto toca la red, los postes, el cable de tensión o la pista del rival mientras la bola está en juego.
- Después de golpear la bola, esta toca la malla metálica o el suelo de tu propio lado, en vez de ir hacia la pista rival.
- Golpeas la bola dos veces seguidas (doble golpe).
- La bola te toca a ti, a tu compañero, o a algo que llevéis puesto, después de haber intentado devolverla.
- Sacas y fallas dos veces seguidas.
- Se te cae la pala o se rompe el cordón de seguridad durante el punto.

Esta lista no es exhaustiva — para el texto completo, consulta el reglamento oficial.`,
  },
  "correct-return": {
    title: "Qué cuenta como devolución válida",
    status: "machine",
    bodyMd: `Una devolución es válida en situaciones que a veces sorprenden a quien empieza a jugar al pádel, como:

- La bola golpea primero en la pared de tu propio lado y solo después va hacia la pista rival.
- La bola toca la red o los postes y aun así cae correctamente en la pista rival.
- Después de botar correctamente en la pista rival, la bola sale de la pista, golpea el techo, las luces u otro elemento ajeno al juego — el punto sigue en curso.
- La bola bota exactamente en la esquina donde la pared se une al suelo.

En todos estos casos, el punto continúa y el rival debe devolver la bola antes del segundo bote.`,
  },
  "point-won": {
    title: "Formas menos obvias de ganar un punto",
    status: "machine",
    bodyMd: `Además de que el rival falle la devolución, hay dos situaciones específicas del pádel en las que se gana el punto de forma inmediata:

- La bola, después de botar correctamente en la pista rival, sale por un agujero de la malla metálica o se queda atascada en él.
- La bola se queda atascada en la superficie plana de la parte superior de la pared, después de botar correctamente en la pista rival.`,
  },
  "change-of-balls": {
    title: "Cambio de bolas durante el torneo",
    status: "machine",
    bodyMd: `Antes de cada competición, la organización debe anunciar con antelación: la marca y el tipo de bolas, cuántas se usarán por partido (normalmente 2 o 3), y la política de cambio, si la hay.

Cuando hay un cambio programado, suele ocurrir:

- Después de un número impar de juegos acordado de antemano.
- Al principio de cada set.
- Nunca justo al principio de un tie-break — en ese caso, el cambio se retrasa hasta el principio del segundo juego del set siguiente.

Si una bola se pierde o se daña a mitad de un partido, se sustituye de inmediato — el juego nunca continúa con menos bolas de las acordadas.`,
  },
};
