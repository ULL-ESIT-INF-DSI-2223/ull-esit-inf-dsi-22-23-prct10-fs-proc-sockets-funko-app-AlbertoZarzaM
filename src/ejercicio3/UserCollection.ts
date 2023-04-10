import * as fs from "fs";
import { User } from "./User.js";

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

  /**
   *  Devuelve el usuario con el nombre indicado
   * @param name Nombre del usuario
   * @returns  Devuelve el usuario con el nombre indicado
   */
  getUserByName(name: string): User {
    return this._users.find((user) => user.nombre === name) as User;
  }

  /**
   *  Agrega un usuario al arreglo de usuarios
   * @param user Usuario a agregar
   */
  addUser(user: User): void {
    this._users.push(user);
  }

  /**
   *  Elimina un usuario del arreglo de usuarios
   * @param name Nombre del usuario a eliminar
   */
  removeUserbyName(name: string): void {
    //borro el directorio
    fs.rmdirSync(`./data/${name}`, { recursive: true });
    this._users = this._users.filter((user) => user.nombre !== name);
  }

  /**
   * Devuelve el arreglo de usuarios
   * @returns {User[]} Arreglo de usuarios
   */
  get users(): User[] {
    return this._users;
  }

  /**
   *  Asigna el arreglo de usuarios
   * @param users Arreglo de usuarios
   */
  setusers(users: User[]) {
    this._users = users;
  }
}
