export default function getMessage(): string {
  return `
    <p>Hola!</p>
    <p>Una de las competiciones en la que te inscribiste acaba de comenzar. Puedes entrar a la página de la competición pulsando el botón más abajo.</p>
    <p style="font-size: 14px; margin: 10px 0px 30px 5px;display: block; text-align:center">
    <a
      href="${''}"
      style="color: white;text-decoration: none;border: 1px solid #3F88C5;
      background-color: #3F88C5;padding: 8px;border-radius: 3px;
      box-shadow: 0 0 3px rgba(0, 0, 0, .5), inset 0 0 1px white; margin-right: 16px;">
      Ver competición
    </a>
    </p>
    <p>¡A jugar!</p>
    `;
}
