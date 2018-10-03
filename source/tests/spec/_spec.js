/* eslint-env jasmine */
/* eslint no-undef: 0 */

describe('Calculator', () => {
  // before every test reset te value of current value
  beforeEach(() => {
    Calculator.current = 0;
    Calculator.equation = "";
  });
  

  describe('When clicking on buttons', () => {
    it('should count current value of equation in Calculator.value', () => {
      
      button.nine();
      button.nine();
      button.plus();
      button.nine();
     expect(Calculator.value()).toBe(108);
      
     Calculator.equation = "";
     button.seven();
     button.plus();
     button.six();
     expect(Calculator.value()).toBe(13);
     button.plus();
     button.four()
     expect(Calculator.value()).toBe(17);
       
    });

    it('should inform if its incorrect equation in Calculator.value', () => {
    button.nine()   
    expect(Calculator.value()).toBe(9);
      
    button.nine();
    button.plus();
    
    expect(Calculator.value()).toBe("Input correct equation");
   });


         
  });
});


describe('Buttons', () => {
  describe('Buttons from 0 to 9', () => {
    beforeEach(() => {
      button.userNumber = '';
      Calculator.equation = '';
    });

    it('should return their value', () => {
      expect(button.one()).toBe(1);
    });

    it('should join together in equation', () => {
      button.one();
      expect(Calculator.equation).toBe('1');
      button.one();
      expect(Calculator.equation).toBe('11');
      button.three();
      expect(Calculator.equation).toBe('113');
      button.nine();
      expect(Calculator.equation).toBe('1139');
    });
  });


  describe('Buttons operators', () => {
    it('should return their value', () => {
      expect(button.plus()).toBe('+');
    });
    it('should add themselves to the end of equation', () => {
     
      button.plus();
      let str = Calculator.equation;
      let last_character = str[str.length-1];
      expect( last_character).toBe('+');
      
      button.plus();
      str = Calculator.equation;
      last_character = str[str.length-2];
      expect( last_character).not.toBe('+');

    });

    it('button del should delete last string', () => {
      Calculator.equation=0;
      
      button.nine()
      button.del();
      let str = Calculator.equation;
      let last_character = str[str.length-1];
      expect( last_character).toBe('0');
      
      
      button.seven();
      button.six();
      button.del();
      str = Calculator.equation;
      last_character = str[str.length-1];
      expect( last_character).toBe('7');

    });
    
    it('Button C should clear equation', () => { 
      
      button.nine();
      button.four();
      button.plus();

      button.c();
     expect(Calculator.equation).toBe("");
       

    });
    // it('minus operator should have possibility to be added twice', () => {
    //   button.minus();
    //   let str = Calculator.equation;
    //   let last_character = str[str.length-1];
    //   expect( last_character).toBe('-');
      
    //   button.minus();
    //   str = Calculator.equation;
    //   last_character = str[str.length-2];
    //   expect( last_character).toBe('-');
      
    //   button.minus();
    //   str = Calculator.equation;
    //   last_character = str[str.length-2];
    //   expect( last_character).not.toBe('-');

    // });
   
  });
});
