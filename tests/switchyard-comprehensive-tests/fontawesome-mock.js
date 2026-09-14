const React = require('react');

module.exports = {
  FontAwesomeIcon: class extends React.Component {
    render() {
      return React.createElement('i', { className: 'fa' });
    }
  }
};
