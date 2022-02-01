// unconvertable rst regex
const REF_LIKE = /:[^\s]+:`.*<[^\s]+>`/g; // like: :smthn:`text blah blah <text-no-spaces>`
const SOURCE_CONSTANT_LIKE = /{\+[^\s]+\+}/g; // like: {+TEXT_NO_SPACES+}
const SUBSTITUTION_LIKE = /\|[^\s]+\|/g;
const STEP_FILE_INCLUDE = /\.\. include:: \/includes\/steps\/(.*)\.rst/g;
const INCLUDE = /\.\. include:: \/includes\/(.*)/g;
const LITERAL_INCLUDE = /\.\. literalinclude:: \/includes\/(.*)/g;
module.exports = {
  REF_LIKE,
  SOURCE_CONSTANT_LIKE,
  SUBSTITUTION_LIKE,
  STEP_FILE_INCLUDE,
  INCLUDE,
  LITERAL_INCLUDE,
};
