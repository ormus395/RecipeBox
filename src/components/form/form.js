import React from "react";
import "./form.css";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    let formObj = {};
    let { recipe } = this.props;
    for (let prop in recipe) {
      if (typeof recipe[prop] == "object") {
        for (let value of recipe[prop]) {
          formObj[value] = value;
        }
      } else {
        formObj[prop] = recipe[prop];
      }
    }
    this.setState({ ...formObj });
  }

  // componentDidUpdate()

  handleChange = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    return this.props.handleSave(this.state);
  };

  render() {
    let { recipe } = this.props;
    let inputs = [];
    let i = 0;
    for (let field in this.state) {
      i++;
      console.log(field);
      inputs.push(
        <label key={field + i} htmlFor={field}>
          {field === "title" || field === "id" ? field : "Ingredient"}
          <input
            key={field}
            type="text"
            onChange={this.handleChange}
            name={field}
            value={this.state[field]}
          />
        </label>
      );
    }
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {inputs}
        <button>Save</button>
      </form>
    );
  }
}

export default Form;
