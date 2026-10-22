import React from 'react';

interface SortableElement {
  props: {
    order?: number;
    // Custom buttons are wrapped in a <div>, which cannot take a custom `order` prop in TSX,
    // so Home passes their position as `data-order` instead.
    'data-order'?: number;
  };
}

const orderOf = (el: SortableElement): number =>
  el.props.order ?? el.props['data-order'] ?? -Infinity;

// this will sort in descending order because data is reverse sorted before it is rendered
const Sort = ({ children }: { children?: React.ReactNode }) => {
  const sorted = React.Children.toArray(children).sort((a, b) => {
    const aEl = a as SortableElement;
    const bEl = b as SortableElement;
    return orderOf(bEl) - orderOf(aEl);
  });

  return <>{sorted}</>;
};

export default Sort;
