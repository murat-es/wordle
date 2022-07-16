const fs = require('fs');

const array = fs.readFileSync('../wordList.txt').toString().split("\n");
for (const a of array) {
    console.log("mura", a);
}