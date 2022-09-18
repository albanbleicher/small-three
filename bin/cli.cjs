#! /usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (e) {
    console.error(`Failed to execute command ${command}`, e)
    return false
  }
  return true
}
const repoName = process.argv[2]
console.clear()
const gitCheckoutCommand = `git clone --depth 1 https://github.com/albanbleicher/small-three.git ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`
console.log('\x1b[36m☁️  Cloning \x1b[95msmall-three \x1b[90m')
const checkedOut = runCommand(gitCheckoutCommand)
if (!checkedOut) process.exit(-1)
console.log('\x1b[36m☁️  Installing dependencies ... \x1b[90m')
const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) process.exit(-1)
console.log("\x1b[93m🎉 Woop woop ! Everything worked out well, you're good to go! \n")
console.log('\x1b[36mStart coding by using :')
console.log(`cd \x1b[95m${repoName} \x1b[36m&& pnpm dev \x1b[90m// npm run dev | yarn dev \x1b[97m`)

const newReadme = `
# ${repoName} 🌈

## Setup 🌱

    pnpm install

## Dev 🧑🏽‍💻

    pnpm dev

## Build 🧱

    pnpm build`
const readme = path.join(process.cwd(), repoName, 'README.md')
fs.writeFile(readme, newReadme, (err) => {
  if (err) {
    console.error('An error occured', err)
    process.exit(-1)
  }
})
const index = path.join(process.cwd(), repoName, 'index.html')

fs.readFile(index, 'utf8', function (err, data) {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  const result = data.replace(/%title%/g, repoName)

  fs.writeFile(index, result, 'utf8', function (err) {
    if (err) {
      console.error(err)
      process.exit(-1)
    }
  })
})
