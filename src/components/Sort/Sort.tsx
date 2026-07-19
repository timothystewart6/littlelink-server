import React from 'react';

interface SortableElement {
  props: {
    order?: number;
  };
}

// this will sort in descending order because data is reverse sorted before it is rendered
const Sort = ({ children }: { children?: React.ReactNode }) => {
  const sorted = React.Children.toArray(children).sort((a, b) => {
    const aEl = a as SortableElement;
    const bEl = b as SortableElement;
    return (bEl.props.order ?? -Infinity) - (aEl.props.order ?? -Infinity);
  });

  return <>{sorted}</>;
};

export default Sort;
