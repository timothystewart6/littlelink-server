import React from 'react';

interface SortableElement {
  props: {
    order?: number;
  };
}

/**
 * Sort rendered button children into display order.
 *
 * This sorts descending because the data is reverse sorted before rendering.
 * Exported so alternative layouts can consume the same ordering without
 * duplicating the rule.
 */
export function sortNodes(children?: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).sort((a, b) => {
    const aEl = a as SortableElement;
    const bEl = b as SortableElement;
    return (bEl.props.order ?? -Infinity) - (aEl.props.order ?? -Infinity);
  });
}

const Sort = ({ children }: { children?: React.ReactNode }) => {
  return <>{sortNodes(children)}</>;
};

export default Sort;
