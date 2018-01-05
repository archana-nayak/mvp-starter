import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : ''
    };
    this.search = this.search.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(event) {
    this.setState({text: event.target.value});
  }

  search() {
    this.props.search(this.state.text);
  }

  render() {
    return (
      <div>
        <span>
          Search Within
          <select>
            <option>5 miles</option>
            <option>10 miles</option>
          </select>
        </span>
        <span>
          of zipcode
          <input name="zipcode" placeholder="zipcode" value={this.state.texts} onChange={this.changeHandler}/>
        </span>
        <span>  
          <button onClick={this.search}>Go</button>
        </span>
      </div>
    );
  }
}

export default Search;