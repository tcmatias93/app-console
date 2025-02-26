import { SaveFile } from "../../../../src/domain/use-cases/save-file.use-cases";
import fs from "fs";

describe("Save file use-cases", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs/file-destination",
    fileName: "cutmon-table-name",
  };
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach(() => {
    // Clean up, borrar de forma recursiva la carpera de outputs
    const exist = fs.existsSync("outputs");
    if (exist) fs.rmSync("outputs", { recursive: true });
    const existCustomFolder = fs.existsSync(customOptions.fileDestination);
    if (existCustomFolder)
      fs.rmSync(customOptions.fileDestination, { recursive: true });
  });

  test("Should save file with default values", () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: "Test content",
    };
    const result = saveFile.execute(options);
    const filePath = "outputs/table.txt";

    expect(result).toBe(true);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {
      encoding: "utf-8",
    });

    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);

    const checkFile = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("should return false if directory could not be create", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });
    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);

    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be create", () => {
    const saveFile = new SaveFile();

    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom writeing error message from testing");
      });

    const result = saveFile.execute({ fileContent: "Hola" });

    expect(result).toBe(false);
    writeFileSpy.mockRestore();
  });
});
