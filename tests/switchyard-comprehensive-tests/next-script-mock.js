// Mock for next/script - renders a <script> element
const React = require('react');

function Script(props) {
  const { children, src, id, strategy, ...rest } = props;
  const attrs = { ...rest };
  if (src) attrs.src = src;
  if (id) attrs.id = id;
  if (children) {
    return React.createElement('script', attrs, children);
  }
  return React.createElement('script', attrs);
}

module.exports = Script;
module.exports.default = Script;
