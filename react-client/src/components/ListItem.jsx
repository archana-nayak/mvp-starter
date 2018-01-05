import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.showDescription = this.showDescription.bind(this);
  }

  showDescription() {

  }

  render() {
    return(
    <div onClick={this.showDescription}>{this.props.item.store_name } </div>
    );
  }
}

export default ListItem;