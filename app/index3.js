import React from 'react';
import ReactDOM from 'react-dom';


// list
const functionKeys = ['AC', '±', '%'];
const digitKeys = ['0', '●', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operatorKeys = ['÷', 'x', '-', '+', '='];
const priorityValue = {'+': 0, '-': 0, '*': 1, '/': 1};

const functionItems = functionKeys.map((currKey) =>
  <button key={currKey} className="calculator-key">{currKey}</button>
);
const digitItems = digitKeys.map((currKey) =>
  <button key={currKey} className="calculator-key">{currKey}</button>
);
const operatorItems = operatorKeys.map((currKey) =>
  <button key={currKey} className="calculator-key">{currKey}</button>
);

// 计算器
class Calculate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruler: '',
      value: 0,
      operator: null,
      displayValue: 0,
      numberMap: [],
      operatorMap: [],
      waitForOperand: false
    };

    this.inputDigit = this.inputDigit.bind(this);
  }

  // 输入数字
  inputDigit(number){
    // waitForOperand为true时，表示开始输入一个新的操作数
    if(this.state.waitForOperand){
      if(number == '.'){
        this.setState({
          displayValue: '0.',
          waitForOperand: false
        });
      }else{
        this.setState({
          displayValue: number,
          waitForOperand: false
        });
      }
    }else{
      // 替换默认的0
      if(this.state.displayValue === 0 && number != '.'){
        this.setState({
          displayValue: number
        });
      }else{
        // 判断是不是重复输入小数点
        if(!(/\./.test(this.state.displayValue) && number==".")){
          this.setState({
            displayValue: this.state.displayValue + number.toString()
          });
        }
      }
    }
  }

  countPercent(){
    let v = parseFloat(this.state.displayValue) / 100;
    this.setState({
      displayValue: v
    });
  }

  // 清零
  clearAll(){
    this.setState({
      value: 0,
      operator: null,
      displayValue: 0,
      numberMap: [],
      operatorMap: [],
      waitForOperand: false,
    });
  }

  // 四则混合运算
  mathCount(num1,num2,op){
    let result;
    switch(op){
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
    };

    return result;
  }

  count(currOperate){
    let operatorMap = this.state.operatorMap,
        numberMap = this.state.numberMap,
        opLength = operatorMap.length,
        nmLength = numberMap.length,
        currNumber = parseFloat(this.state.displayValue);

    if(opLength > 0){
      let lastOperate = operatorMap[opLength - 1];

      // 优先级高于之前的运算符
      if(priorityValue[currOperate] - priorityValue[lastOperate] > 0){
        operatorMap.push(currOperate);
        numberMap.push(currNumber);
      }else{
        let result = this.mathCount(numberMap[nmLength - 1] , currNumber , lastOperate);
        operatorMap[opLength - 1] = currOperate;
        numberMap[nmLength - 1] = result;
        this.setState({displayValue: result});
      }

    }else{
      operatorMap.push(currOperate);
      numberMap.push(currNumber);
    }
    this.setState({waitForOperand: true});
  }

  countAll(){
    let operatorMap = this.state.operatorMap,
        numberMap = this.state.numberMap,
        opLength = operatorMap.length,
        nmLength = numberMap.length,
        result;

    if(opLength == 0){
      result = numberMap[0];
      numberMap.pop();
      return result;
    }else{
        let v = this.mathCount(numberMap[nmLength - 2] , numberMap[nmLength - 1] , operatorMap[opLength - 1]);
        numberMap[nmLength - 2] = v;
        operatorMap.pop();
        numberMap.pop();
        return this.countAll();
    }
  }
  // 算结果
  countEqual(){
    let operatorMap = this.state.operatorMap,
        numberMap = this.state.numberMap,
        opLength = operatorMap.length,
        nmLength = numberMap.length,
        currNumber = parseFloat(this.state.displayValue);


    if(opLength > 0 && nmLength > 0){
      numberMap.push(currNumber);
      let v = this.countAll();

      this.setState({
        displayValue: v,
        numberMap: [],
        operatorMap: [],
        waitForOperand: true
      });     
    }

  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator-display">
          <div className="auto-scaling-text">{this.state.ruler}</div>
          <div className="auto-scaling-text">{this.state.displayValue}</div>
        </div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button onClick={() => this.clearAll()} className="calculator-key key-clear">AC</button>
              <button className="calculator-key key-sign">±</button>
              <button className="calculator-key key-percent" onClick={() => this.countPercent()}>%</button>
            </div>
            <div className="digit-keys">
              <button onClick={() => this.inputDigit(0)} className="calculator-key key-0">0</button>
              <button onClick={() => this.inputDigit('.')} className="calculator-key key-dot">●</button>
              <button onClick={() => this.inputDigit(1)} className="calculator-key key-1">1</button>
              <button onClick={() => this.inputDigit(2)} className="calculator-key key-2">2</button>
              <button onClick={() => this.inputDigit(3)} className="calculator-key key-3">3</button>
              <button onClick={() => this.inputDigit(4)} className="calculator-key key-4">4</button>
              <button onClick={() => this.inputDigit(5)} className="calculator-key key-5">5</button>
              <button onClick={() => this.inputDigit(6)} className="calculator-key key-6">6</button>
              <button onClick={() => this.inputDigit(7)} className="calculator-key key-7">7</button>
              <button onClick={() => this.inputDigit(8)} className="calculator-key key-8">8</button>
              <button onClick={() => this.inputDigit(9)} className="calculator-key key-9">9</button>
            </div>
          </div>
          <div className="operator-keys">
            <button onClick={() => this.count('/')} className="calculator-key key-divide">÷</button>
            <button onClick={() => this.count('*')} className="calculator-key key-multiply">×</button>
            <button onClick={() => this.count('-')} className="calculator-key key-subtract">−</button>
            <button onClick={() => this.count('+')} className="calculator-key key-add">+</button>
            <button onClick={() => this.countEqual()} className="calculator-key key-equals">=</button>
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

