import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
    this.search = this.search.bind(this);
    this.getByZipCode = this.getByZipCode.bind(this);
  }

  search(code) {
    console.log('searching for', code);
    $.ajax({
      url: '/cafes',
      type: 'POST',
      data: JSON.stringify({zipcode: code}),
      contentType: 'application/json',
      sucess: (data) => {
        console.log('in success');
        console.log('data');
      },
      error: (err) => {
        console.error(err);
      }
    }).done((data) => {
      console.log('data ', data);
      console.log(data.zipcode);
      this.getByZipCode(data.zipcode);
    });
  }
  getByZipCode(code) {
    //should get data stored in server
    $.ajax({
      url: '/cafes', 
      type: 'GET',
      data: {zipcode: code},
      // contentType: 'application/json',
      success: (data) => {
      },
      error: (err) => {
        console.log('err', err);
      }
    }).done((data) => {
      this.setState({
        items: data
      });
    });
  }
  

  render () {
    return (<div>
      <Search search={this.search}/>
      <h1>Item List</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));