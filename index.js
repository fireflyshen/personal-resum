#!/usr/bin/env node

import download from "download-git-repo";
import ora from "ora";
import path from "path";

// const fs = require("fs"); // 如果需要使用 fs 模块，可以取消注释
const repo = "github:fireflyshen/personal-resum";

// eslint-disable-next-line no-undef
const target = process.argv[2] || "resume";

const spinner = ora("Downloading template...").start();

download(repo, target, (err) => {
  if (err) {
    spinner.fail("Failed to download template");
    console.error(err);
  } else {
    spinner.succeed("Template downloaded successfully");
    console.log(`Project has been created in ${path.resolve(target)}`);
  }
});