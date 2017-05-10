import React from 'react';
import ReactDOM from 'react-dom';

// dropdown demo
const names = [
  'Noah','Liam','Mason','Jacob','William','Ethan','James',
  'Alexander','Michael','Benjamin','Elijah','Daniel','Aiden',
  'Logan','Matthew','Lucas','Jackson','David','Oliver','Jayden',
  'Joseph','Gabriel','Samuel','Carter','Anthony','John','Dylan',
  'Luke','Henry','Andrew','Isaac','Christopher','Joshua','Wyatt',
  'Sebastian','Owen','Caleb','Nathan','Ryan','Jack','Hunter','Levi',
  'Christian','Jaxon','Julian','Landon','Grayson','Jonathan','Isaiah',
  'Charles','Thomas','Aaron','Eli','Connor','Jeremiah','Cameron','Josiah',
  'Adrian','Colton','Jordan','Brayden','Nicholas','Robert','Angel','Hudson',
  'Lincoln','Evan','Dominic','Austin','Gavin','Nolan','Parker','Adam','Chase',
  'Jace','Ian','Cooper','Easton','Kevin','Jose','Tyler','Brandon','Asher',
  'Jaxson','Mateo','Jason','Ayden','Zachary','Carson','Xavier','Leo','Ezra',
  'Bentley','Sawyer','Kayden','Blake','Ryder','Theodore','Elias','Tristan',
  'Roman','Leonardo','Camden','Brody','Luis','Miles','Micah','Vincent',
  'Justin','Greyson','Declan','Maxwell','Juan','Cole','Damian','Carlos',
  'Max','Harrison','Weston','Brantley','Braxton','Axel','Diego','Abel',
  'Wesley','Santiago','Jesus','Silas','Giovanni','Bryce','Jayce','Bryson',
  'Alex','Everett','George','Eric','Ivan','Emmett','Kaiden','Ashton','Kingston',
  'Jonah','Jameson','Kai','Maddox','Timothy','Ezekiel','Ryker','Emmanuel','Hayden',
  'Antonio','Bennett','Steven','Richard','Jude','Luca','Edward','Joel','Victor',
  'Miguel','Malachi','King','Patrick','Kaleb','Bryan','Alan','Marcus','Preston',
  'Abraham','Calvin','Colin','Bradley','Jeremy','Kyle','Graham','Grant','Jesse',
  'Kaden','Alejandro','Oscar','Jase','Karter','Maverick','Aidan','Tucker','Avery',
  'Dexter','Braylen','Armando','Braden','Corey','Kolton','Gerardo','Ace','Ellis'
];

// function ResultUl(props) {
//   let dataList = props.datalist;
//   let listItems = dataList.map((item) =>
//     <li key={item.toString()}>
//       {item}
//     </li>
//   );
//   return (
//     <ul className="result-list">{listItems}</ul>
//   );
// }
// class Suggester extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: '',
//       filterdata: names
//     };

//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     let inputWords = event.target.value.toLowerCase();
//     let filterArray = names.filter(function(element){
//         return element.indexOf(inputWords) >= 0;
//     });

//     this.setState({
//       value: inputWords,
//       filterdata: filterArray
//     });
    
//   }

//   render() {
//     return (
//       <div id="Suggester">
//       <input type="text" id="searchInput" value={this.state.value} onChange={this.handleChange} />
//       <ResultUl datalist={this.state.filterdata}/>
//       </div>
//     );
//   }
// }

// function ResultUl(props) {
//   let dataList = props.datalist;
//   let listItems = dataList.map((item) =>
//     <li key={item.toString()}>
//       {item}
//     </li>
//   );
//   return (
//     <ul className="result-list">{listItems}</ul>
//   );
// }
function getFilterData(searchKeys){
  let filterArray = names.filter(function(element){
      return element.indexOf(searchKeys) >= 0;
  });

  // 当查询结果多余一条时给ul填充数据
  return (filterArray.length > 1 ? filterArray : []);
}

class ResultUl extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
      this.props.onSelectChanged(event.currentTarget.innerHTML);
  }

  render(){
    return(
      <ul className="result-list">
        {this.props.datalist.map(d => {
          return(
            <li key={d.toString()} onClick={this.handleClick}>{d}</li>
          )}
        )}
      </ul>
    );
  }
}


class Suggester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filterdata: names
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(event) {
    let inputWords = event.target.value.toLowerCase();
    let filterArray = getFilterData(inputWords);

    this.setState({
      value: inputWords,
      filterdata: filterArray
    });
  }

  handleSelectChange(selectedValue) {
    let inputWords = selectedValue.toLowerCase();
    let filterArray = getFilterData(inputWords);

    this.setState({
      value: inputWords,
      filterdata: filterArray
    });
  }

  render() {
    return (
      <div id="Suggester">
        <input type="text" id="searchInput" value={this.state.value} onChange={this.handleChange}/>
        <ResultUl datalist={this.state.filterdata} onSelectChanged={this.handleSelectChange}/>
      </div>
    );
  }
}


// 以下是温度计demo
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// class Calculator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {temperature: ''};
//   }

//   handleChange(e) {
//     this.setState({temperature: e.target.value});
//   }

//   render() {
//     const temperature = this.state.temperature;
//     return (
//       <fieldset>
//         <legend>Enter temperature in Celsius:</legend>
//         <input
//           value={temperature}
//           onChange={this.handleChange} />
//         <BoilingVerdict
//           celsius={parseFloat(temperature)} />
//       </fieldset>
//     );
//   }
// }

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

// class TemperatureInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {temperature: ''};
//   }

//   handleChange(e) {
//     this.setState({temperature: e.target.value});
//   }

//   render() {
//     const temperature = this.state.temperature;
//     const scale = this.props.scale;
//     return (
//       <fieldset>
//         <legend>Enter temperature in {scaleNames[scale]}:</legend>
//         <input value={temperature}
//                onChange={this.handleChange} />
//       </fieldset>
//     );
//   }
// }

// class Calculator extends React.Component {
//   render() {
//     return (
//       <div>
//         <TemperatureInput scale="c" />
//         <TemperatureInput scale="f" />
//       </div>
//     );
//   }
// }


function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Suggester />,
  document.getElementById('root')
);

