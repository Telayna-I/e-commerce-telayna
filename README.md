# WorkShop React Js.

## Desarrollo.

A lo largo del proyecto se emplearon diversas herramientas provistas por react, react-rooter-dom y firebase entre otras, como por ejemplo:

** React **

- useEffect para poder detectar cambios en las propiedades o estados de un componente.
- useState para poder efectyuar cambios en los distintos estados repartidos por la aplicacion.
- useContext para poder envolver mi aplicacion en contextos que facilitan el llamado a funciones relacionadas con ciertos componentes.

** React-router-dom **

- useParams para obtener la ruta en la que estamos parados y asi poder filtrar.
- useNavigate para poder redireccionar luego de ciertas acciones.
- link para poder acceder a ciertas rutas establecidas (suplantando a la etiqueta a ).
- navlink para las rutas del nav.
- Outlet para poder establecer rutas privadas las cuales se pueden acceder luego del registro o logueo de usuario.

** React-hook-form **

- useForm para poder implementar los formularios de registro, logueo y de finalizacion de compra.

** Firebase **

- collection.
- getDocs.
- query.
- where.
- getFirestore.
- doc.
- getDoc.
- createUserWithEmailAndPassword.
- signInWithEmailAndPassword.
- GoogleAuthProvider.
- signInWithPopup.

Para poder gestionar todo lo que tiene que ver con la base de datos y gestion de usuarios en Firebase.


## Descripcion.

Ecommerce desarrollado con ReactJs, que cuenta con funciones de logeo y registro de usuarios. Ademas permite visualizar un listado total de productos, filtrar por categorias a dichos productos con la posibilidad de ver en detalle las caracteristicas del producto, en donde podremos agregar al carrito de compra la cantidad deseada de productos. Ya en el carrito permite hacer modificaciones de las cantidades de los items sumados, vaciar el carro por completo, seguir comprando o confirmar la compra.

## Funcionamiento.

[![unknown-2022-03-25-05-03-1.gif](https://i.postimg.cc/YCx1MZ69/unknown-2022-03-25-05-03-1.gif)](https://postimg.cc/XrpZg2DS)

## ¿Cómo usar?

### Requisito fundamental: Tener instalado Node.

### Clonar repositorio.

```sh
git clone https://github.com/Telayna-I/e-commerce-telayna.git
```


Creamos la carpeta donde queremos que se clone el proyecto y desde la terminal nos paramos en ella, introducimos el comando git clone https://github.com/Telayna-I/e-commerce-telayna.git


### Inicializar NPM.

```sh
npm init -y
```

Introducimos el comando npm init -y ,se activara la inicializacion del proyecto donde se agregaran los archivos package.json los cuales permitiran instalar todas las dependencias del proyecto.

### Instalar librerias y dependencias.

```sh
npm install
```

Introducimos el comando npm install, al ejecutar este comando se instalaran todas las dependencias para que el proyecto funcione correctamente.

### Correr en local.

```sh
npm start
```

Si ejecutamos el comando npm start se abrira automaticamente nuestro navegador en la url de http://localhost:3000/ que sera la que nos permitira visualizar la aplicacion.

## Librerias Instaladas.

### React.

Libreria de JavaScript con la que se desarrollo la aplicacion.

### React-router-dom.

Esta libreria la utilice para poder establecer rutas dentro de la aplicacion.

### React-icons.

Libreria que provee de una gran cantidad de inconos, los cuales se utilizaron para la aplicacion.

### SweetAlert 2.

Esta fue utilizada para la utilizacion de un Toast luego de que se agrega un producto al carrito o cuando dicho producto no posee stock suficiente para poder comprar.

### React-loader-spinner.

Nos proporciona una gran lista de spinners de la cual elegi uno y lo utilice en el proyecto.

### React-hook-form.

Utilizada para la creacion y validacion de formularios.

### Firebase.

Utilizado como base de datos y procesos de autenticacion de usuarios para el logueo y registro de usuarios.

## Configuracion de Firebase para utilizar el proyecto.


### Google analitics.

Al momento de crear un nuevo proyecto en Firebase desactivar la opcion de [Habilitar google analitics].

### Agrega una app para comenzar.

Al momento de tener que agregar una app, seleccionamos el icono de </>

[![agregar-app.png](https://i.postimg.cc/dVWkZWP4/agregar-app.png)](https://postimg.cc/K1MvdDYM)


Introducimos el nombre desado pero desactivamos la opcion de Firebase Hosting

[![firebase-Hosting.png](https://i.postimg.cc/XJXwGhYg/firebase-Hosting.png)](https://postimg.cc/hzWJN2xJ)

Y por ultimo damos click en registrar app.

### Agregar SDK a nuestro proyecto.

[![inicializacion-de-firebase.png](https://i.postimg.cc/4dkQqGvF/inicializacion-de-firebase.png)](https://postimg.cc/cKh3tVbQ)

Luego de registrarnos podremos visualizar esta pantalla que nos proporciona los datos para la conexion con firebase, donde tendremos que presionar [Ir a la consola] para finalizar.



### Configurar variables de entorno.

Dentro de la carpeta raiz de nuestro proyecto debemos crear un archivo con el nombre de .env
Dentro debemos configurar nuestras variables de entorno de la siguiente manera:

[![variables-de-entorno.png](https://i.postimg.cc/NMs2JhgR/variables-de-entorno.png)](https://postimg.cc/gw70jTL0)

Luego del simbolo de = hay que completar con los datos obtenidos del SDK de Firebase sin las comillas.

Esto permitira que se pueda establecer la conexion con firebase.

En el caso de que no funcione cancelar la ejecucion y volver a utilizar el comando

```sh
npm start
```

### Estructura de archivos.

Dentro de Firebase acceder a Cloud Firestore, una vez dentro presionar en [ + iniciar coleccion].

En el campo ID de la coleccion tendremos que introducir la palabra [products] como ID.


Luego, dentro de la coleccion products tendremos que agregar nuestros productos clickeando en [ + Agregar documento]

Dentro, para nuestros productos, eligiremos un id aleatorio proporcionado por Firebase.

Y luego debemos respetar esta estructura de producto.

[![estructura-producto-1.png](https://i.postimg.cc/SKBgtFVT/estructura-producto-1.png)](https://postimg.cc/VSF9dhxn)

Una vez cargado el producto clickeamos en la opcion guardar.

Por ultimo, deberiamos crear una coleccion llamada categories y dentro de ella crear cada categoria de producto que podamos llegar a tener en nuestra base de datos de productos.

[![categorias.png](https://i.postimg.cc/tCMr1y5Y/categorias.png)](https://postimg.cc/HVb0KqFg)

Al finalizar, deberia quedarnos asi:

[![fianalizar.png](https://i.postimg.cc/65zQCWbL/fianalizar.png)](https://postimg.cc/dLkvYYYL)


Una vez terminada la carga de productos y generadas las categorias recien ahi podremos visualizarlos en nuestra aplicacion.



### Google Auth.

Para que Nuestro usuario pueda registrarse, loguearse e iniciar sesion con Goole debemos tener activados estos 2 proveedores de acceso.

[![auth.png](https://i.postimg.cc/7Ypr06Td/auth.png)](https://postimg.cc/TpqsXT0J)



## Hasta este paso la aplicacion ya deberia estar funcionando con normalidad.