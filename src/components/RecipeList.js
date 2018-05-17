import React from "react";
import Accordion from "./ui/accordion/accordion";
import Modal from "./ui/modal/modal";
import Form from "./form/form";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeBox: [
        {
          id: 0,
          title: "Chicken Parm",
          ingredients: ["Chicken", "Pasta", "Parmesan Cheese", "Sauce"]
        },
        {
          id: 1,
          title: "Mac & Cheese",
          ingredients: ["Pasta", "Cream", "Cheese"]
        }
      ],
      showModal: false
    };
    this.panelRef = React.createRef();
  }

  handleClick = () => {
    console.log(this);
  };

  handleDelete = id => {
    let selectedRecipe = this.state.recipeBox.find(recipe => recipe.id === id);
    let newRecipeBox = [...this.state.recipeBox];
    this.setState({
      recipeBox: newRecipeBox.filter(recipe => recipe.id !== selectedRecipe.id)
    });
  };

  handleEdit = id => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleSave = formValue => {
    console.log(formValue);
  };

  render() {
    let i = 0;
    let recipeList = this.state.recipeBox.map(recipe => {
      i++;
      return (
        <Accordion key={"accordion" + i} title={recipe.title}>
          <Modal
            key={"modal" + i}
            show={this.state.showModal}
            handleClose={this.handleClose}
          >
            <Form recipe={recipe} handleSave={this.handleSave} />
          </Modal>
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
    return <div>{recipeList}</div>;
  }
}

export default RecipeList;
