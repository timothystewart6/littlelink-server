// Mock for next/image - renders an <img> element
const React = require('react');

function Image(props) {
  const { src, alt, width, height, fill, priority, ...rest } = props;
  const attrs = { ...rest };
  if (src) attrs.src = src;
  if (alt) attrs.alt = alt;
  if (width) attrs.width = width;
  if (height) attrs.height = height;
  return React.createElement('img', attrs);
}

module.exports = Image;
module.exports.default = Image;
