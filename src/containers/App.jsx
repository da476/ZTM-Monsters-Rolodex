import React, { Component } from 'react';
import './App.css';
import CardList from "../components/CardList.jsx";
import SearchBox from "../components/SearchBox.jsx";
import Scroll from "../components/Scroll.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      kitties: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.cypress.io/users')
      .then(response => response.json())
      .then(users => this.setState({ kitties: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { kitties, searchfield } = this.state;
    const filteredKitties = kitties.filter(kitty => {
      return kitty.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !kitties.length ?
      <h1>Loading...</h1> :
      (
        <div className="tc">
          <h1 className="f1">KittyFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList kitties={filteredKitties} />
          </Scroll>
        </div>
      );
    }
}

export default App
