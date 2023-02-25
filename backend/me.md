1. npm init --y
2. npm i express @types/express @types/node morgan @types/morgan typescript mysql @types/mysql
3. npx tsc --init
4. change rootDir and outDir
5. add these to `package.json`
```json
{
    "scripts": {
        "dev": "ts-node-dev --respawn --watch \"src/**\" src/index.ts",
        "build": "tsc -p .",
        "start": "node dist/index.js"
  }
}
```