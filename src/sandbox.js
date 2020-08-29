const {Category} = require("./category");

const category = new Category();
category.categorizeFile('./src/sandbox.js').then(data => console.log(data));