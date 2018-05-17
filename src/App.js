import React, { Component } from "react";
import RecipeList from "./components/RecipeList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <RecipeList />
      </div>
    );
  }
}

export default App;
