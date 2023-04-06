import { UserCollection } from "./UserCollection.js";
import { User } from "./User.js";
import { Funko, Tipo, Genero } from "./Funko.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

function estaEnEnum(valor: string, enumObj: object): boolean {
  return Object.values(enumObj).includes(valor);
}
const users = new UserCollection();

yargs(hideBin(process.argv))
  .command(
    "add",
    "Adds a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Funko Name",
        type: "string",
        demandOption: true,
      },
      description: {
        description: "Funko Description",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Funko Type",
        type: "string",
        demandOption: true,
      },
      gender: {
        description: "Funko Gender",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Funko Franchise",
        type: "string",
        demandOption: true,
      },
      number: {
        description: "Funko Number",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Funko Exclusive",
        type: "boolean",
        demandOption: true,
      },
      specialFeatures: {
        description: "Funko Special Features",
        type: "string",
        demandOption: true,
      },
      marketValue: {
        description: "Funko Market Value",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const tipo = argv.type;
      const gender = argv.gender;

      if (estaEnEnum(tipo, Tipo)) {
        console.log(chalk.green("Tipo correcto"));
      } else {
        console.error(chalk.red("Tipo incorrecto"));
        process.exit(1);
      }

      if (estaEnEnum(gender, Genero)) {
        console.log(chalk.green("Género correcto"));
      } else {
        console.error(chalk.red("Género incorrecto"));
        process.exit(1);
      }
      if (
        users.getUserByName(argv.user).ownerOf.getFunko(argv.id) === undefined
      ) {
        const FunkoToAdd = new Funko(
          argv.id,
          argv.name,
          argv.description,
          tipo as Tipo,
          gender as Genero,
          argv.franchise,
          argv.number,
          argv.exclusive,
          argv.specialFeatures,
          argv.marketValue
        );
        if (users.getUserByName(argv.user) === undefined) {
          console.log(chalk.red("User not found"));
          console.log(chalk.yellow("Creating user..."));
          users.addUser(new User(argv.user));
          users.getUserByName(argv.user).ownerOf.addFunko(FunkoToAdd);
        } else {
          users.getUserByName(argv.user).ownerOf.addFunko(FunkoToAdd);
        }
        console.log(
          chalk.green(
            "Funko " +
              argv.name +
              " añadido al usuario " +
              argv.user +
              " correctamente"
          )
        );
      } else {
        console.log(chalk.red("Funko already exists on user " + argv.user));
      }
    }
  )
  .command(
    "read",
    "read a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (
        users.getUserByName(argv.user).ownerOf.getFunko(argv.id) === undefined
      ) {
        console.log(chalk.red("Funko not found"));
      } else {
        users.getUserByName(argv.user).ownerOf.getFunko(argv.id).mostrarFunko();
      }
    }
  )
  .command(
    "list",
    "list a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      if (users.getUserByName(argv.user) === undefined) {
        console.error(chalk.red("User not found"));
        process.exit(1);
      } else {
        users.getUserByName(argv.user).ownerOf.funkos.forEach((funko) => {
          funko.mostrarFunko();
          console.log(
            chalk.yellow("--------------------------------------------------")
          );
        });
      }
    }
  )
  .command(
    "update",
    "Update a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Funko Name",
        type: "string",
        demandOption: true,
      },
      description: {
        description: "Funko Description",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Funko Type",
        type: "string",
        demandOption: true,
      },
      gender: {
        description: "Funko Gender",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Funko Franchise",
        type: "string",
        demandOption: true,
      },
      number: {
        description: "Funko Number",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Funko Exclusive",
        type: "boolean",
        demandOption: true,
      },
      specialFeatures: {
        description: "Funko Special Features",
        type: "string",
        demandOption: true,
      },
      marketValue: {
        description: "Funko Market Value",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const tipo = argv.type;
      const gender = argv.gender;

      if (estaEnEnum(tipo, Tipo)) {
        console.log(chalk.green("Tipo correcto"));
      } else {
        console.error(chalk.red("Tipo incorrecto"));
        process.exit(1);
      }

      if (estaEnEnum(gender, Genero)) {
        console.log(chalk.green("Género correcto"));
      } else {
        console.error(chalk.red("Género incorrecto"));
        process.exit(1);
      }
      const FunkoToAdd = new Funko(
        argv.id,
        argv.name,
        argv.description,
        tipo as Tipo,
        gender as Genero,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.specialFeatures,
        argv.marketValue
      );
      if (users.getUserByName(argv.user) === undefined) {
        console.log(chalk.red("User not found"));
        console.log(chalk.yellow("Creating user..."));
        users.addUser(new User(argv.user));
        users.getUserByName(argv.user).ownerOf.addFunko(FunkoToAdd);
      } else {
        users.getUserByName(argv.user).ownerOf.addFunko(FunkoToAdd);
      }
      console.log(
        chalk.green(
          "Funko " +
            argv.name +
            " añadido al usuario " +
            argv.user +
            " correctamente"
        )
      );
    }
  )
  .command(
    "remove",
    "Delete a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (
        users.getUserByName(argv.user).ownerOf.getFunko(argv.id) === undefined
      ) {
        console.log(chalk.red("Funko not found"));
      } else {
        users.getUserByName(argv.user).ownerOf.removeFunko(argv.id);
        console.log(chalk.green("Funko " + argv.id + " deleted successfully"));
      }
    }
  )
  .help().argv;
