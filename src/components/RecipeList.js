import React from "react";
import Accordion from "./ui/accordion/accordion";
import Modal from "./ui/modal/modal";
import Form from "./form/form";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeBox: [],
      showModal: false,
      selectedRecipe: {
        id: null,
        title: "",
        ingredients: [""]
      },
      isEdit: false,
      id: 0
    };
    this.panelRef = React.createRef();
  }

  componentDidMount() {
    let newRecipes = localStorage.getItem("recipes")
      ? JSON.parse(localStorage.getItem("recipes"))
      : [];
    let id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id"))
      : 0;
    this.setState({ recipeBox: newRecipes, id: id });
  }

  handleEdit = id => {
    let recipe = this.state.recipeBox.find(recipe => recipe.id === id);
    console.log(recipe);
    this.handleShow();
    this.setState({
      selectedRecipe: recipe,
      isEdit: true
    });
  };

  handleDelete = id => {
    console.log(id);
    let selectedRecipe = this.state.recipeBox.find(recipe => recipe.id === id);
    let newRecipeBox = [...this.state.recipeBox].filter(
      recipe => recipe.id !== selectedRecipe.id
    );
    localStorage.setItem("recipes", JSON.stringify(newRecipeBox));
    this.setState({
      recipeBox: newRecipeBox
    });
  };

  handleShow = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      selectedRecipe: { title: "", ingredients: [""] },
      isEdit: false
    });
  };

  handleSave = formValue => {
    if (this.state.isEdit) {
      let edit = { ...formValue, id: this.state.selectedRecipe.id };
      let changedRecipes = this.state.recipeBox.map(recipe => {
        if (recipe.id === edit.id) {
          recipe = edit;
          return recipe;
        } else {
          return recipe;
        }
      });
      console.log(changedRecipes);
      localStorage.setItem("recipes", JSON.stringify(changedRecipes));
      this.setState({ recipeBox: changedRecipes, isEdit: false });
    } else {
      let newRecipe = { ...formValue, id: this.state.id };
      let newRecipes = [...this.state.recipeBox];
      newRecipes.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(newRecipes));
      this.setState({ recipeBox: newRecipes, id: this.state.id + 1 });
    }
  };

  render() {
    let i = 0;
    let recipeList = this.state.recipeBox.map(recipe => {
      i++;
      return (
        <Accordion key={"accordion" + i} title={recipe.title}>
          <ul key={"list" + i}>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <button
            className="btn danger"
            onClick={() => this.handleDelete(recipe.id)}
          >
            Delete
          </button>
          <button className="btn" onClick={() => this.handleEdit(recipe.id)}>
            Edit
          </button>
        </Accordion>
      );
    });
    return (
      <div className="container">
        <Modal
          key={"modal" + i}
          show={this.state.showModal}
          handleClose={this.handleClose}
        >
          <Form
            recipe={this.state.selectedRecipe}
            handleSave={this.handleSave}
          />
        </Modal>
        {recipeList}
        <button className="btn" onClick={this.handleShow}>
          Add Recipe
        </button>
      </div>
    );
  }
}

export default RecipeList;
