import React from "react";
import "./accordion.css";
class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: ["Section1", "Section2", "Section3"],
      btn: null,
      toggle: false
    };
    this.acc = React.createRef();
  }

  componentDidMount() {
    console.log((this.acc.current.nextElementSibling.style.display = ""));
    this.setState({ btn: this.acc.current });
  }
  handleActive() {
    console.log(this.state.btn);
    let panel = this.state.btn.nextElementSibling;
    console.log(panel);
    if (panel.style.display == "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    return (
      <div>
        <button
          className={`accordion ${this.state.toggle ? "active" : ""}`}
          ref={this.acc}
          onClick={this.handleActive.bind(this)}
        >
          {this.props.title || "Click Me"}
        </button>
        <div className="panel">{this.props.children}</div>
      </div>
    );
  }
}

export default Accordion;
