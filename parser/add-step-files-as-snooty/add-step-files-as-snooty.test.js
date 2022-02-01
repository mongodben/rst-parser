const converter = require("./add-step-files-as-snooty");

const testRst = `{+service+} provides a configurable and dynamic rules engine that enables you to
run a MongoDB query from client applications while transparently preventing
unauthorized reads and writes. Rules are defined for entire collections in a
linked MongoDB Atlas cluster and apply to individual documents in the collection
dynamically based on the :doc:\`application user </authentication>\` that issued a
query.

.. include:: /includes/data-lake-rules-note.rst

The rules engine handles incoming queries with the following 4-step
process:

.. include:: /includes/steps/mdb-rules-process.rst`;

function test(inputStr, stepFilesDir) {
  const res = converter(inputStr, stepFilesDir);
  console.log(res);
}

test(testRst, "/Users/ben.p/projects/docs-realm/source/includes");
