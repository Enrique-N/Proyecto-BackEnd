# Proyecto-BackEnd

![image](./gift/gif.gif)

## Acerca del Proyecto:

Login y agregado de productos de manera instantanea. Pueden Logearse y agregarse productos de forma simultanea desde dos paginas a la misma vez.

### Herramientas Utilizadas:

- JavaScript.
- BootsTrap.
- HTML5/CSS.
- FireBase.
- Heroku
- NodeJS
- Express
- EJS

### Instalación del Proyecto:

1. Debe clonar el repositorio utlizando git clone https://github.com/Enrique-N/Proyecto-BackEnd.git
2. Luego deberá instalar todas las dependencias del proyecto, para eso deberá ejecutar npm install (también puede utilizar npm i)
3. Por último, puede ejecutar el proyecto y realizar las pruebas utilizando npm start. Si no desea instalar el proyecto, puede utilizarlo ingresando al siguiente enlace: https://appcoder1.herokuapp.com/signin.

## Funcionalidad del Proyecto: 

### SignIn:

- Muestra dos inputs para ingresar el username y el password.
- Muetra dos botones: Registro y Login
- Si el usuario o contraseña no son correctos te envia al registro.

### Registro:

- Muestra un form para ingresar los datos del usuario.
- Tiene un input tipo File para subir una imagen para su avatar.
- Si el usuario ya esta registrado te va enviar a la pagina usuario ya registrado.
- El input de Phone tiene una lista despeglable para buscar el codigo de nacionalidad.
- Tiene un boton para verificar el numero del usuario y ponerle el codigo de nacionalidad.
- Si el registro tiene exito entras al home de la app.

### Login:

- Dentro de la app nos muetra 3 inputs para añadir los productos en forma de tabla.
- Los inputs son 2 de texto y uno de imagen.
- El boton de agregar estará desabilitado hasta que se llenen los campos.
- Los productos se añadiran de forma instantanea.

### NavBar

- En el NavBar aparece la foto de tu avatar que escogiste en el registro, UserName y el boton de LogOut.
- El boton de LogOut te enviara a la pantalla de SignIn.


