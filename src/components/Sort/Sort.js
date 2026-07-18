import React from 'react';

// this will sort in descending order because data is reverse sorted before it is rendered
const Sort = ({ children }) => {
  const sorted = React.Children.toArray(children).sort((a, b) => {
    return b.props.order - a.props.order;
  });

  return sorted;
};

export default Sort;
