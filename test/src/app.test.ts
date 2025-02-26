import { ServerApp } from "../../src/presentation/server-app";
describe("App", () => {
  test("Should call Server.run with values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      "node",
      "app.ts",
      "-b",
      "10",
      "-l",
      "10",
      "-s",
      "-n",
      "test",
      "-d",
      "test",
    ];

    await import("../../src/app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 10,
      show: true,
      name: "test",
      destination: "test",
    });
  });
});
