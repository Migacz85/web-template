let Calculator = {
  current: 0,
  operator: "",
  button_value: 0,
  equation: "",
  
  value() {
    let message;
    // if (typeof(eval(this.equation))=='number') {
    //   message=eval(this.equation);
    // } else 
    // { message= "Input correct equation"; }
    
    try { message=(eval(this.equation)) } catch { message= "Input correct equation";}
    
    if (message==undefined) {message="" }

    return message;
  },
  reset() {
    this.current = 0;
    this.button_value = 0;
    this.button_operator = "";
  },
  buttonReset() {
    //this.current = 0;
    this.button_value = "";
    this.button_operator = "";

  },
  
  showValue() {
    document.getElementById('equation').innerText = Calculator.equation;
    //document.getElementById('operator').innerText = Calculator.operator;
    
    document.getElementById('value').innerText = Calculator.value();

  },

};


const button = {
  
  one() {
    Calculator.equation = Calculator.equation += '1';
    return 1
  },
  two() {
    Calculator.equation = Calculator.equation += '2';
    return 2
  },
  three() {
    Calculator.equation = Calculator.equation += '3';
    return 3;
  },
  four() {
    Calculator.equation = Calculator.equation += '4';
    return 4
  },
  five() {
    Calculator.equation = Calculator.equation += '5';
    return 5
  },
  six() {
    Calculator.equation = Calculator.equation += '6';
    return 6
  },
  seven() {
    Calculator.equation = Calculator.equation += '7';
    return 7
  },
  eight() {
    Calculator.equation = Calculator.equation += '8';
    return 8
  },
  nine() {
    Calculator.equation = Calculator.equation += '9';
    return 9
  },
  zero() {
    Calculator.equation = Calculator.equation += '0';
    return 0;
  },
  leftCali() {
    Calculator.equation = Calculator.equation += '(';
    return 0;
  },
  rightCali() {
    Calculator.equation = Calculator.equation += ')';
    return 0;
  },
  plus() {
    let str = Calculator.equation;
    let last_character = str[str.length - 1];
    if (last_character != "+") { Calculator.equation += "+";}
    return "+"
  },
  multi() {
    let str = Calculator.equation;
    let last_character = str[str.length - 1];
    if (last_character != "*") Calculator.equation += "*";
    return "*"
  },
  divide() {
    let str = Calculator.equation;
    let last_character = str[str.length - 1];
    if (last_character != "/") Calculator.equation += "/";
    return "/"
  },
  minus() {
    let str = Calculator.equation;
    let last_character = str[str.length - 1];
    if (last_character != "-") Calculator.equation += "-";
    return "-"
  },
  del() {
    
   Calculator.equation=Calculator.equation.slice(0, -1);
  },
  c() {
    Calculator.equation="";
  }

}



