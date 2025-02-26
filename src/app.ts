import { yarg } from "./config/plugin/args.plugin";
import { ServerApp } from "./presentation/server-app";

//Funcion anonima auto envocada, se ejecuta tan pronto se ejecute app.ts
(async () => {
  await main();
})();

async function main() {
  const { b: base, l: limit, s: show, n: name, d: destination } = yarg;

  ServerApp.run({ base, limit, show, name, destination });
}
