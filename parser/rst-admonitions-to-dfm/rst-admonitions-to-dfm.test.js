const rstToMd = require("../rst-to-md");
const testRst = `  .. seealso::
     
     - :ref:\`schemas\`
     - :ref:\`enforce-a-schema\`
`;

async function test(rstIn) {
  const testMd = await rstToMd(rstIn);
  console.log(testMd);
}

test(testRst);
