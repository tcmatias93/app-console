import exp from "constants";
import { CreateTable } from "../../../src/domain/use-cases/create-table.use-cases";
import { SaveFile } from "../../../src/domain/use-cases/save-file.use-cases";
import { ServerApp } from "../../../src/presentation/server-app";

describe("Server-app", () => {
  const options = {
    base: 2,
    limit: 10,
    show: false,
    name: "test-fileName",
    destination: "test-destination",
  };

  test("should crearte ServerApp instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);
    //Cuantos log veo
    expect(logSpy).toHaveBeenCalledTimes(2);
    //Que contiene un log
    expect(logSpy).toHaveBeenCalledWith("Server running...");
    expect(logSpy).toHaveBeenCalledWith("File created!");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      //Espera cualquier string
      fileContent: expect.any(String),
      fileDestination: options.destination,
      fileName: options.name,
    });
  });

  test("should run with custom values mocked", () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 X 2 = 2");
    const saveFileMock = jest.fn().mockReturnValue(true);

    global.console.log = logMock;
    global.console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenLastCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.destination,
      fileName: options.name,
    });
    expect(logErrorMock).not.toHaveBeenCalled();
  });
});
