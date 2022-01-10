// unconvertable rst regex
const REF_LIKE = /:[^\s]+:`.*<[^\s]+>`/; // like: :smthn:`text blah blah <text-no-spaces>`
const SOURCE_CONSTANT_LIKE = /{\+[^\s]+\+}/g; // like: {+TEXT_NO_SPACES+}
const SUBSTITUTION_LIKE = /\|[^\s]+\|/;

module.exports = { REF_LIKE, SOURCE_CONSTANT_LIKE, SUBSTITUTION_LIKE };
