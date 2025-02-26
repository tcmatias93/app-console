import fs from "fs";

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor /** Repository: StorageRepository */() {}

  execute({
    fileContent,
    fileDestination = "outputs",
    fileName = "table",
  }: SaveFileOptions): boolean {
    try {
      //Creo la carpeta con esto
      fs.mkdirSync(fileDestination, { recursive: true });
      //Escribo la carpeta
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
