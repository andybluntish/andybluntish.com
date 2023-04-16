#!/usr/bin/env node

const dotenv = require("dotenv");
const CheckIn = require("../lib/beer/check-in.js");
const path = require("path");
const fs = require("fs");

dotenv.config();

CheckIn.fetchAll().then((checkins) => {
  const data = JSON.stringify({ checkins }, null, 2);
  const fileName = path.join(__dirname, "../src/beer/check-ins/check-ins.json");

  fs.writeFileSync(fileName, data);
});
