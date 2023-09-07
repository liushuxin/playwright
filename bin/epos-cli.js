#!/usr/bin/env node

const { program } = require("commander");
const { spawn } = require("node:child_process");

const merge = require("../index");
const cherry = require("../cherry");

// setup program
program
  .command("init")
  .description("初始化项目")
  .action(function (option) {});

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
