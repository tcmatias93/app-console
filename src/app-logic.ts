import fs from "node:fs";
import { yarg } from "./config/plugin/args.plugin";

let outputMessage = "";
const numberTable: number = yarg.b;
const headerMessage = `
=====================
    tabla del ${numberTable}
=====================\n
`;

const tabla = (base: number, limit: number): string => {
  let acumulador = "";
  for (let i = 1; i <= limit; i++) {
    let resultado = base * i;
    acumulador = acumulador + `5 x ${i} = ${resultado} \n`;
  }
  return acumulador;
};

outputMessage = headerMessage + tabla(numberTable, yarg.l);

if (yarg.s) {
  console.log(outputMessage);
}

const outputPath = `outputs/`;

//Creo la carpeta con esto
fs.mkdirSync(outputPath, { recursive: true });
//Escribo la carpeta
fs.writeFileSync(`${outputPath}/tabla-${numberTable}.txt`, outputMessage);
