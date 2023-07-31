#!/usr/bin/env node

const { program } = require("commander");
const merge = require("../index");

// 初始化环境
program
  .command("merge")
  .description("merge 分支")
  .action(function (option) {
    console.log("merge");
    merge();
  });

program.version("0.0.1");
