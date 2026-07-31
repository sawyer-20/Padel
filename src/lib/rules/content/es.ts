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
};
