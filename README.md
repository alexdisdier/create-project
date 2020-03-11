[![npm](https://img.shields.io/npm/v/create-project)](https://www.npmjs.com/package/@alexdisdier/create-project)

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
