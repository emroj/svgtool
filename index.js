#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
  .usage("Usage: -n <name>")
  .option("x", {
    alias: "x",
    describe: "x coordinate",
    type: "string",
    demandOption: true,
  })
  .option("y", {
    alias: "y",
    describe: "y coordinate",
    type: "string",
    demandOption: true,
  })
  .option("w", {
    alias: "width",
    describe: "width",
    type: "string",
    demandOption: true,
  })
  .option("h", {
    alias: "height",
    describe: "Height",
    type: "string",
    demandOption: true,
  })
  .option("i", {
    alias: "input",
    describe: "Input file",
    type: "string",
    demandOption: true,
  })
  .option("o", {
    alias: "output",
    describe: "Output file",
    type: "string",
    demandOption: true,
  }).argv;

const { parse, stringify } = require("svgson");

var fs = require("fs");

fs.readFile(options.i, "utf8", async function (err, data) {
  if (err) throw err;

  let svgObject = await parse(data);

  if (svgObject.attributes.viewBox) {
    svgObject.attributes.viewBox = `${options.x} ${options.y} ${options.w} ${options.h}`;
  }

  let svgString = stringify(svgObject);
  fs.writeFile(options.o, svgString, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });
});

// -------------------------------
// Convert JSON AST back to SVG
// -------------------------------

/* returns the SVG as string */
