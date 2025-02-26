import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SaveFile } from "../domain/use-cases/save-file.use-cases";

interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
  name: string;
  destination: string;
}

export class ServerApp {
  //metodo run para saber que mi servidor esta corriendo
  static run({ base, limit, show, name, destination }: RunOptions) {
    console.log("Server running...");

    const table = new CreateTable().execute({ base, limit });

    const wasCreate = new SaveFile().execute({
      fileContent: table,
      fileDestination: destination,
      fileName: name,
    });

    if (show) {
      console.log(table);
    }

    wasCreate
      ? console.log("File created!")
      : console.error("File not created!");
  }
}
