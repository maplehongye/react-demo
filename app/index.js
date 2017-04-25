import React from 'react';
import ReactDOM from 'react-dom';


// hello
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

// list
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>{number*2}</li>
);

// form input
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'A'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    document.getElementById('inputValue1').innerHTML = this.state.value;
    document.getElementById('inputValue2').innerHTML = this.state.value;
    document.getElementById('inputValue3').innerHTML = this.state.value;
  }
  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
    document.getElementById('inputValue1').innerHTML = this.state.value;
    document.getElementById('inputValue2').innerHTML = event.target.value.toUpperCase();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  componentDidUpdate(){
    document.getElementById('inputValue3').innerHTML = this.state.value;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <div>handleChange事件里获取input值(通过this.state.value)：<span id="inputValue1"></span></div>
        <div>handleChange事件里获取input值(通过event.target.value)：<span id="inputValue2"></span></div>
        <div>componentDidUpdate函数里获取input值(通过this.state.value)：<span id="inputValue3"></span></div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// form textarea
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// form select
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// form 多个表单标签
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

// 计算器
class Calculate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator-display">
          <div className="auto-scaling-text">0</div>
        </div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear">AC</button>
              <button className="calculator-key key-sign">±</button>
              <button className="calculator-key key-percent">%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0">0</button>
              <button className="calculator-key key-dot">●</button>
              <button className="calculator-key key-1">1</button>
              <button className="calculator-key key-2">2</button>
              <button className="calculator-key key-3">3</button>
              <button className="calculator-key key-4">4</button>
              <button className="calculator-key key-5">5</button>
              <button className="calculator-key key-6">6</button>
              <button className="calculator-key key-7">7</button>
              <button className="calculator-key key-8">8</button>
              <button className="calculator-key key-9">9</button>
            </div>
          </div>
          <div className="operator-keys">
            <button className="calculator-key key-divide">÷</button>
            <button className="calculator-key key-multiply">×</button>
            <button className="calculator-key key-subtract">−</button>
            <button className="calculator-key key-add">+</button>
            <button className="calculator-key key-equals">=</button>
          </div>
        </div>
      </div>
    );
  }

}

ReactDOM.render(
  <Calculate />,
  document.getElementById('root')
);

