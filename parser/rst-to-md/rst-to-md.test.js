const parser = require("./rst-to-md");

const testRst = "Retrieve a `service </realm/services#std-label-services>`_.";

async function test(rst) {
  const res = await parser(rst);
  console.log(res);
}

test(testRst);
