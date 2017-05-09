import React from 'react';
import ReactDOM from 'react-dom';

const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'];

function ResultUl(props) {
  let dataList = props.datalist;
  let listItems = dataList.map((item) =>
    <li key={item.toString()}>
      {item}
    </li>
  );
  return (
    <ul className="result-list">{listItems}</ul>
  );
}

class Suggester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filterdata: letters
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
  }
  handleChange(event) {
    let inputWords = event.target.value.toLowerCase();
    let filterArray = letters.filter(function(element){
        return element.indexOf(inputWords) >= 0;
    });

    this.setState({
      value: inputWords,
      filterdata: filterArray
    });
  }

  componentDidUpdate(){
  }

  render() {
    return (
      <div>
      <input type="text" id="searchInput" value={this.state.value} onChange={this.handleChange} />
      <ResultUl datalist={this.state.filterdata}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Suggester />,
  document.getElementById('root')
);

