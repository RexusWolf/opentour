#language: es
Característica: Crear usuarios

  Antecedentes:
    Dado que estoy logueado como administrador

  Escenario: Crear usuarios
    Dado que estoy en la página de creación de usuarios
    Cuando relleno el formulario con los siguientes datos:
      | email            | input  | i23aldo@uco.es |
      | roles               | select | Administrador  |
      | plainPassword       | input  | password       |
      | plainPasswordRepeat | input  | password       |
    Y pulso guardar
    Entonces estoy en la página de edición del usuario "i23aldo@uco.es"
