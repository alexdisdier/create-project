[![npm](https://img.shields.io/npm/v/create-project)](https://www.npmjs.com/package/@alexdisdier/create-project)
[![CircleCI](https://circleci.com/gh/alexdisdier/create-project.svg?style=svg)](https://circleci.com/gh/alexdisdier/create-project)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

### 🚧 cli commands:

These commands should be executed inside your new project folder.

For now, the installation will use yarn.

- create (this will prompt you with the following questions)

  - template: CRA TS, CRA JS, lib TS, lib JS, Utils TS
  - project-name: ''.
  - git init: y/n
  - install dependencies: y/n

- create --skip (this will use default settings)

  - template: CRA TS
  - new-project
  - init git repo
  - dependencies automatically installed

  ```
  // e.g
  npx @alexdisdier/create lib-ts my-new-library
  ```
