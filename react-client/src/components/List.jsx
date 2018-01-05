import React from 'react';
import ListItem from './ListItem.jsx';

const List = ({items}) => (
 
  <div>
    <h4> List Component </h4>
    There are {items.length } items.
    { items.length ? items.map((item, id) => <ListItem item={item} key={id}/>) : null}
  </div>
)

export default List;