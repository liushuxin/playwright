#!/usr/bin/env node

const { program } = require("commander");
const merge = require("../index");
const cherry = require("../cherry");

// merge
program
  .command("merge")
  .description("merge 分支")
  .action(function (option) {
    console.log("merge");
    merge();
  });
// cherry
program
  .command("cherry")
  .description("cherry 分支")
  .action(function (option) {
    console.log("cherry");
    cherry();
  });

program.version("0.0.1").parse(process.argv);
