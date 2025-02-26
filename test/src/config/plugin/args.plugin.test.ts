const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import("../../../../src/config/plugin/args.plugin");

  return yarg;
};

describe("Test arg.pluginn.ts", () => {
  const originalArvg = process.argv;

  beforeEach(() => {
    process.argv = originalArvg;
    jest.resetModules();
  });

  test("Should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  test("should retrun configuration with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "10",
      "-l",
      "5",
      "-s",
      "-n",
      "tabla-del-2",
      "-d",
      "tablas",
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 5,
        s: true,
        n: "tabla-del-2",
        d: "tablas",
      })
    );
  });
});
