# Informe práctica 6

***Por: Alberto Zarza Martín (alu0101412993@ull.edu.es)***

## Introducción

  En esta práctica vamos a realizar 1 ejercicios que nos ayudará a profundizar en el uso de las clases y las interfaces en TypeScript, por otra parte también mencionar el uso de Modulos ESM como yargs o chalk. Además, vamos a desarrollar 2 ejercicios que se ha propuesto en la sesion de practicas para practicar y verficicar los conocimientos adquiridos en las clases anteriores.

## Dispositivo de trabajo

  Para el desarrollo de esta práctica he utilizado un sistema operativo Ubuntu por lo cual algunos de los pasos realizados solo estarán disponibles para los usuarios que utilicen este sistema operativo.

## Coveralls

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-AlbertoZarzaM/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-AlbertoZarzaM?branch=main)

## Ejercicio 1 - FunkoPops

En este he desarrollado una aplicación para gestionar los Funkos de los diferentes usuarios de nuestra aplicación. Para gerstionar los funkos y los usuarios que los tienen he creado 4 clases que iré explicando a continuación.


### Clase Funko

  Esta clase es la que se encarga de crear los objetos de tipo Funko, para ello he creado una clase que tiene como atributos el id, nombre, descripción, tipo, genero, franquicia, numero, exclusivo, caracteristicas especiales y valor de mercado. Además, he creado un constructor que recibe todos los atributos de la clase y los asigna a los atributos de la clase. Por último, he creado los métodos get y set para cada uno de los atributos de la clase.

  A continuación se muestra el código de la clase Funko:

``` typescript

export class Funko {
  private _id: number;
  private _nombre: string;
  private _descripcion: string;
  private _tipo: Tipo;
  private _genero: Genero;
  private _franquicia: string;
  private _numero: number;
  private _exclusivo: boolean;
  private _caracteristicasEspeciales: string;
  private _valorDeMercado: number;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    tipo: Tipo,
    genero: Genero,
    franquicia: string,
    numero: number,
    exclusivo: boolean,
    caracteristicasEspeciales: string,
    valorDeMercado: number
  ) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._tipo = tipo;
    this._genero = genero;
    this._franquicia = franquicia;
    this._numero = numero;
    this._exclusivo = exclusivo;
    this._caracteristicasEspeciales = caracteristicasEspeciales;
    this._valorDeMercado = valorDeMercado;
  }
```
 Ademas, he creado los métodos get y set para cada uno de los atributos de la clase.

 También he creado un enum para los tipos de Funko que hay en el mercado.

``` typescript
export enum Tipo {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VynilSoda = "Vynil Soda",
  VynilGold = "Vynil Gold",
}
```
 Además, he creado un enum para los géneros de Funko que hay en el mercado.

``` typescript
export enum Genero {
  Animacion = "Animación",
  PeliculasYTV = "Películas y TV",
  Videojuegos = "Videojuegos",
  Deportes = "Deportes",
  Musica = "Música",
  Anime = "Ánime",
}

```

Por otra parte he desarrollado también un metodo MostarFunko que nos muestra por pantalla los datos del Funko.

``` typescript

  mostrarFunko(): void {
    console.log(chalk.green(`ID: ${this._id}`));
    console.log(chalk.green(`Nombre: ${this._nombre}`));
    console.log(chalk.green(`Descripción: ${this._descripcion}`));
    console.log(chalk.green(`Tipo: ${this._tipo}`));
    console.log(chalk.green(`Género: ${this._genero}`));
    console.log(chalk.green(`Franquicia: ${this._franquicia}`));
    console.log(chalk.green(`Número: ${this._numero}`));
    console.log(chalk.green(`Exclusivo: ${this._exclusivo}`));
    console.log(
      chalk.green(
        `Características especiales: ${this._caracteristicasEspeciales}`
      )
    );
    if (this._valorDeMercado < 10) {
      console.log(chalk.green(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 10 && this._valorDeMercado < 30) {
      console.log(chalk.blue(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 30 && this._valorDeMercado < 50) {
      console.log(chalk.bgYellow(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 50 && this._valorDeMercado < 80) {
      console.log(chalk.red(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 80 && this._valorDeMercado < 100) {
      console.log(chalk.cyan(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else {
      console.log(chalk.magenta(`Valor de mercado: ${this._valorDeMercado}`));
    }

  }

```

Como se puede observar en el código anterior, si el valor de mercado del Funko es menor que 10, el valor de mercado se mostrará en verde, si es mayor o igual que 10 y menor que 30, el valor de mercado se mostrará en azul, si es mayor o igual que 30 y menor que 50, el valor de mercado se mostrará en amarillo, si es mayor o igual que 50 y menor que 80, el valor de mercado se mostrará en rojo, si es mayor o igual que 80 y menor que 100, el valor de mercado se mostrará en cyan y si es mayor o igual que 100, el valor de mercado se mostrará en magenta. Esto lo he hecho para cumplir con los requisitos de la práctica.

### Clase FunkoCollection

  Esta clase es la que se encarga de crear los objetos de tipo FunkoCollection, que son los que contienen los objetos de tipo Funko. Esta clase tiene un atributo privado de tipo Funko[] que es donde se almacenan los objetos de tipo Funko. Además, tiene un atributo privado de tipo string que es el nombre del propietario de la colección de Funkos.

  A continuación se muestra el código de la clase FunkoCollection:

``` typescript

export class FunkoCollection {
  private _funkos: Funko[];
  private owner: string;

  constructor(owner: string) {
    this._funkos = [];
    this.owner = owner;
      // Crea el directorio si no existe
      let archivos = [] as string[];
      try {
        // Lee el directorio
        archivos = fs
          .readdirSync("./data/" + this.owner + "/", { withFileTypes: true })
          .filter((dirent) => dirent.isFile())
          .map((dirent) => dirent.name);
      } catch (err) {
        if (err.code === "ENOENT") {
          // Si el error es porque el directorio no existe
          console.log(`El directorio  no existe. Creando directorio...`);
          fs.mkdirSync("./data/" + this.owner);
          console.log(`Directorio  creado exitosamente.`);
        } else {
          // Si el error no es porque el directorio no existe, lanza una excepción
          throw err;
        }
      }

      /**
       * Lee los archivos JSON y los convierte en objetos de tipo Funko
       * y los agrega al arreglo de Funkos
       *
       */
      for (let i = 0; i < archivos.length; i++) {
        const funko = new Funko(
          0,
          "",
          "",
          Tipo.Pop,
          Genero.Animacion,
          "",
          0,
          false,
          "",
          0
        );
        const funkoJSON = fs.readFileSync(
          "./data/" + this.owner + "/" + archivos[i],
          "utf-8"
        );
        const funkoLeido = JSON.parse(funkoJSON);
        Object.assign(funko, funkoLeido);
        this._funkos.push(funko);
      }
    
  }
 
  get Owner(): string {
    return this.owner;
  }

  get funkos(): Funko[] {
    return this._funkos;
  }

  setfunkos(funkos: Funko[]) {
    this._funkos = funkos;
  }

  addFunko(funko: Funko): void {

    const funkoJSON = JSON.stringify(funko);
    fs.writeFileSync(
      "./data/" + this.owner + "/funko" + funko.id + ".json",
      funkoJSON
    );
    this._funkos.push(funko);
  }

  removeFunko(id: number): void {

    const funko = this.getFunko(id);
    fs.unlinkSync("./data/" + this.owner + "/funko" + funko.id + ".json");
    this._funkos = this._funkos.filter((funko) => funko.id !== id);
  }

  getFunko(id: number): Funko {
    return this._funkos.find((funko) => funko.id === id) as Funko;
  }
}

```

Como podemos observar en el código anterior, el constructor de la clase FunkoCollection recibe como parámetro el nombre del propietario de la colección de Funkos. En el constructor se crea un arreglo de tipo Funko[] que es donde se almacenan los objetos de tipo Funko. Además, se crea un atributo privado de tipo string que es el nombre del propietario de la colección de Funkos.

  En el constructor se crea un directorio llamado data, que es donde se almacenan los archivos JSON de los objetos de tipo Funko. Además, se crea un directorio con el nombre del propietario de la colección de Funkos, que es donde se almacenan los archivos JSON de los objetos de tipo Funko. Si el directorio ya existe, no se crea.

  En el constructor se lee el directorio del propietario de la colección de Funkos y se almacenan los nombres de los archivos JSON en un arreglo de tipo string. Luego, se lee cada archivo JSON y se convierte en un objeto de tipo Funko, que se agrega al arreglo de tipo Funko[].

  Estas acciones se realizan en el constructor para que al crear un objeto de tipo FunkoCollection, se carguen los objetos de tipo Funko que se encuentran en el directorio del propietario de la colección de Funkos. De esta forma, al crear un objeto de tipo FunkoCollection, se cargan los objetos de tipo Funko que se encuentran en el directorio del propietario de la colección de Funkos. Utilizando para ello el modulo fs, de manera que se pueda leer y escribir archivos JSON de forma sincrónica.

  El método get Owner() retorna el nombre del propietario de la colección de Funkos.

  El método get funkos() retorna el arreglo de tipo Funko[].

  El método setfunkos recibe como parámetro un arreglo de tipo Funko[] y lo asigna al atributo privado de tipo Funko[].

  El método addFunko recibe como parámetro un objeto de tipo Funko y lo agrega al arreglo de tipo Funko[] y al directorio del propietario de la colección de Funkos.

  El método removeFunko recibe como parámetro el id de un objeto de tipo Funko y lo elimina del arreglo de tipo Funko[] y del directorio del propietario de la colección de Funkos.

  El método getFunko recibe como parámetro el id de un objeto de tipo Funko y lo retorna.

### Clase User 

La clase User representa a un usuario de la aplicación. Cada usuario tiene un nombre y una colección de Funkos. La clase User tiene los siguientes atributos:

  * nombre: string
  * ownerOf: FunkoCollection

  A continuación se muestra el código de la clase User:


``` typescript	

export class User {
  private _nombre: string;
  private _ownerOf: FunkoCollection;

  constructor(nombre: string) {
    this._nombre = nombre;
    if (nombre !== "prueba") {
      this._ownerOf = new FunkoCollection(this.nombre);
    }
    else {
      this._ownerOf = new FunkoCollection("prueba");
    }
  }
  get nombre(): string {
    return this._nombre;
  }
  setnombre(nombre: string) {
    this._nombre = nombre;
  }
  get ownerOf(): FunkoCollection {
    return this._ownerOf;
  }
  setownerOf(ownerOf: FunkoCollection) {
    this._ownerOf = ownerOf;
  }
}

```

Como se puede ver es una clase sencilla, que tiene un atributo privado de tipo string que es el nombre del usuario y un atributo privado de tipo FunkoCollection que es la colección de Funkos del usuario.

  El constructor recibe como parámetro el nombre del usuario y crea un objeto de tipo FunkoCollection, que es la colección de Funkos del usuario. Si el nombre del usuario es prueba, se crea un objeto de tipo FunkoCollection con el nombre prueba, de lo contrario se crea un objeto de tipo FunkoCollection con el nombre del usuario.

  El método get nombre() retorna el nombre del usuario.

  El método setnombre recibe como parámetro el nombre del usuario y lo asigna al atributo privado de tipo string.

  El método get ownerOf() retorna la colección de Funkos del usuario.

  El método setownerOf recibe como parámetro la colección de Funkos del usuario y lo asigna al atributo privado de tipo FunkoCollection.

### Clase UserCollection

La clase UserCollection representa a la colección de usuarios de la aplicación. La clase UserCollection tiene los siguientes atributos:

  * _users: User[]

  A continuación se muestra el código de la clase UserCollection:

``` typescript	

export class UserCollection {
  private _users: User[];

  constructor() {
    this._users = [];

    const directorios = fs
      .readdirSync("./data", { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (let i = 0; i < directorios.length; i++) {
      const user = new User(directorios[i]);
      this._users.push(user);
    }
  }
  getUserByName(name: string): User {
    return this._users.find((user) => user.nombre === name) as User;
  }
  addUser(user: User): void {
    this._users.push(user);
  }
  removeUserbyName(name: string): void {
    //borro el directorio
    fs.rmdirSync(`./data/${name}`, { recursive: true });
    this._users = this._users.filter((user) => user.nombre !== name);
  }
  get users(): User[] {
    return this._users;
  }
  setusers(users: User[]) {
    this._users = users;
  }
}

```

Como podemos observar en el código anterior, el constructor de la clase UserCollection no recibe ningún parámetro. En el constructor se crea un arreglo de tipo User[] que es donde se almacenan los objetos de tipo User.

  En el constructor se lee el directorio data y se almacenan los nombres de los directorios en un arreglo de tipo string. Luego, se crea un objeto de tipo User por cada directorio y se agrega al arreglo de tipo User[].

  Estas acciones se realizan en el constructor para que al crear un objeto de tipo UserCollection, se carguen los objetos de tipo User que se encuentran en el directorio data. De esta forma, al crear un objeto de tipo UserCollection, se cargan los objetos de tipo User que se encuentran en el directorio data. Utilizando para ello el modulo fs, de manera que se pueda leer y escribir archivos JSON de forma sincrónica.

  El método getUserByName recibe como parámetro el nombre de un usuario y retorna el objeto de tipo User que tiene ese nombre.

  El método addUser recibe como parámetro un objeto de tipo User y lo agrega al arreglo de tipo User[].

  El método removeUserByName recibe como parámetro el nombre de un usuario y lo elimina del arreglo de tipo User[] y del directorio data.

  El método get users() retorna el arreglo de tipo User[].

  El método setusers recibe como parámetro un arreglo de tipo User[] y lo asigna al atributo privado de tipo User[].

### FunkoPopAPP 

En el archivo FunkoPopAPP.ts se encuentra el uso de todo el sistema completo mediante el modulo Yargs. Dentro de el vamos a encontrar los siguientes comandos:

  * add
  * remove
  * update
  * list
  * read

Cada uno de ellos realiza operaciones con los objetos de tipo Funko y los objetos de tipo User.

  * add: Agrega un Funko a la colección de un usuario. Si no existe el usuario, lo crea.

  * remove: Elimina un Funko de la colección de un usuario.  

  * update: Actualiza un Funko de la colección de un usuario. Si no existe el usuario, no hace nada.

  * list: Lista los Funkos de la colección de un usuario.

  * read: Muestra la información de un Funko de la colección de un usuario.


## Ejercicio PE102

Para este ejercicio de practicas hemos desarrollado una clase MapReduceAlgorithm que implementa un patrón de diseño Themplate Method, donde la clases derivadas de esta clase, implementan los métodos abstractos que se encuentran en la clase padre. En este caso, las clases derivadas son las clases AddMapReduceAlgorithm, ProdMapReduceAlgorithm, DivideMapReduceAlgorithm y SubMapReduceAlgorithm. Estas clases implementan los métodos abstractos de la clase padre, de manera que se pueda realizar la operación correspondiente a cada una de ellas.


### Clase MapReduceAlgorithm

La clase MapReduceAlgorithm es la clase padre de las clases AddMapReduceAlgorithm, ProdMapReduceAlgorithm, DivideMapReduceAlgorithm y SubMapReduceAlgorithm. La clase MapReduceAlgorithm tiene los siguientes atributos:

  * data: number[]

  * result: number

  A continuación se muestra el código de la clase MapReduceAlgorithm:

``` typescript

export abstract class MapReduceAlgotitm {
   protected data: number[];
   protected result: number;
    constructor(data: number[]) {
        this.data = data;
    }
    public execute(funcionMap: (item: number) => number) {
        this.beforeMap();
        this.map(funcionMap);
        this.afterMap();
        this.beforeReduce();
        this.result = this.reduce();
        this.afterReduce();
        return this.result;
    }
    protected length(): number{
      let length = 0;
      while(this.data[length] !== undefined){
        length++;
      }
      return length;
    }
    protected get(index: number): number{
      return this.data[index];
    }
    protected map(f: (item: number) => number): void {
        
      const newList: number[] = [];
      for(let i = 0; i < this.length(); i++){
          newList.push(f(this.get(i)));
      }
      this.data = newList;
    }
    protected abstract reduce(): number;
    //Hook methods
    protected abstract afterMap(): void;
    protected abstract afterReduce(): void;
    protected abstract beforeMap(): void;
    protected abstract beforeReduce(): void;

}

```

Como podemos observar en el código anterior, el constructor de la clase MapReduceAlgorithm recibe como parámetro un arreglo de tipo number[].

  El método execute recibe como parámetro una función de tipo (item: number) => number y ejecuta los métodos abstractos de la clase padre, de manera que se pueda realizar la operación correspondiente a cada una de las clases derivadas.

  El método length retorna la longitud del arreglo de tipo number[].

  El método get recibe como parámetro un índice y retorna el elemento del arreglo de tipo number[] que se encuentra en ese índice.

  El método map recibe como parámetro una función de tipo (item: number) => number y aplica la función a cada elemento del arreglo de tipo number[].

  El método abstracto reduce no recibe ningún parámetro y retorna un número.

  Los métodos abstractos afterMap, afterReduce, beforeMap y beforeReduce no reciben ningún parámetro.

  El método abstracto reduce no recibe ningún parámetro y retorna un número.

  Los métodos abstractos afterMap, afterReduce, beforeMap y beforeReduce no reciben ningún parámetro.

### Clase AddMapReduceAlgorithm

Dado que el funcionamiento en las clases AddMapReduceAlgorithm, ProdMapReduceAlgorithm, DivideMapReduceAlgorithm y SubMapReduceAlgorithm es el mismo, solo se muestra el código de la clase AddMapReduceAlgorithm.

``` typescript

export class AddMapReduce extends MapReduceAlgotitm {

    constructor(data: number[]) {
        super(data);
    }
    protected afterMap(): void {
        console.log('After map');
        console.log(this.data);
    }
    protected afterReduce(): void {
        console.log('After reduce');
        console.log(this.data);
    }
    protected beforeMap(): void {
        console.log('Before map');
        console.log(this.data);
    }
    protected beforeReduce(): void {
        console.log('Before reduce');
        console.log(this.data);
    }
    protected reduce(): number {
        let sum = 0;
        for(let i = 0; i < this.length(); i++){
            sum += this.get(i);
        }
      return sum;
    }
}

```
La clase AddMapReduceAlgorithm es una clase derivada de la clase MapReduceAlgorithm. La clase AddMapReduceAlgorithm tiene los siguientes atributos:

  * data: number[]

  * result: number

  A continuación se muestra el código de la clase AddMapReduceAlgorithm:

  El constructor de la clase AddMapReduceAlgorithm recibe como parámetro un arreglo de tipo number[].

  Los métodos afterMap, afterReduce, beforeMap y beforeReduce no reciben ningún parámetro. Estos métodos se encargan de mostrar por consola el estado del arreglo de tipo number[] antes y después de aplicar la función map y la función reduce.


  El método reduce no recibe ningún parámetro y retorna un número. Este método en este caso en particular se encarga de sumar todos los elementos del arreglo de tipo number[]. En las otras clases derivadas de la clase MapReduceAlgorithm, este método se encarga de realizar la operación correspondiente a cada una de ellas.


## Conclusiones

Gracias a la propuesta de estos ejercicios he podido ampliar mis conocimientos en gran medida sobre el lenguaje de programación TypeScript, ya que he podido aplicar los conocimientos adquiridos en la asignatura de DSI, y he podido aprender a utilizar el patrón de diseño Themplate Method, que es un patrón de diseño muy útil para la programación orientada a objetos. Además, he podido aprender el uso de los modulos de Node.js (chalk y yargs), que son muy útiles para la programación de aplicaciones web. Por otra parte, he intentado cubrir todos los casos posibles de uso de los metodos que he creado, por lo que he intentado cubrir todos los casos de error posibles.



