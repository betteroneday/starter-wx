#!/usr/bin/env node

import inquirer from 'inquirer';
import degit from 'degit';
import { templates } from './config/template.js';

inquirer
  .prompt([
    {
      type: "list",
      name: "template",
      message: "请选择要使用的模板",
      choices: Object.keys(templates),
    },
    {
      type: "input",
      name: "appName",
      message: "请输入要创建的应用名",
    },
  ])
  .then((answers) => {
    const emitter = degit(templates[answers.template], {
      // 如果设置为true，degit会在本地缓存仓库，以便在未来更快地克隆。如果设置为false，degit将不会缓存仓库，每次都会从远程仓库克隆新的副本
      cache: false,
      // 如果设置为true，degit将会覆盖目标目录中的任何现有文件。如果设置为false，当目标目录中存在同名文件时，degit将会停止克隆并显示错误。
      force: false,
      //如果设置为true，degit将会打印出详细的克隆过程信息。如果设置为false，degit只会在出错时打印错误信息。
      verbose: false,
    });

    emitter
      .clone(answers.appName)
      .then(() => {
        console.log("项目创建成功！");
      })
      .catch((err) => {
        console.error("项目创建失败：", err);
      });
  });
