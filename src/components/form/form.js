import React from "react";
import "./form.css";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      ingredients: [""]
    };
  }

  componentDidMount() {
    this.setState({ ...this.props.recipe });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.recipe === prevProps.recipe) {
      return;
    } else {
      this.setState({ ...this.props.recipe });
    }
  }

  componentWillUnmount() {
    this.setState({ title: "", ingredients: [""] });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSave({ ...this.state });
    this.setState({ title: "", ingredients: [""] });
  };

  handleNewIngredient = e => {
    const { ingredients } = this.state;
    this.setState({ ingredients: [...ingredients, ""] });
  };

  handleChangeIng = e => {
    const index = Number(e.target.name.split("-")[1]);
    const ingredients = this.state.ingredients.map(
      (ing, i) => (i === index ? e.target.value : ing)
    );
    this.setState({ ingredients });
  };

  render() {
    const { title, ingredients } = this.state;
    let inputs = ingredients.map((ing, i) => (
      <div key={`ingredients-${i}`}>
        <label htmlFor="">
          {i + 1}.
          <input
            type="text"
            name={`ingredients-${i}`}
            value={ing}
            size={45}
            autoComplete="off"
            placeholder={"Ingredient"}
            onChange={this.handleChangeIng}
          />
        </label>
      </div>
    ));
    console.log("updating");
    return (
      <div>
        <label htmlFor="">
          Tittle
          <input
            type="text"
            key="title"
            name="title"
            value={title}
            size={42}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </label>
        {inputs}
        <button onClick={this.handleNewIngredient}>+</button>
        <button onClick={this.handleSubmit} type="submit">
          Save
        </button>
      </div>
    );
  }
}

export default Form;
