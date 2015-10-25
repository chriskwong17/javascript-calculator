$(document).ready(function() { 
  var inputDisplayText = $( "#displaytext" );
  var acButton = $('#acButton');
  var ceButton = $('#ceButton');
  var numberButton = $('#zeroButton, #oneButton, #twoButton, #threeButton, #fourButton, #fiveButton, #sixButton, #sevenButton, #eightButton, #nineButton');
  var decimalButton = $('#decimalButton');
  var operationButton = $('#addButton, #minusButton, #multiplyButton, #divideButton, #modButton, #equalButton');
  
  var CalculationSemantic = {
     inputNumbers : [],
     inputOperations : [],
     recentlyCalculated : false,
     total : 0.0,
    
     ResetInputs : function (){
        this.inputNumbers = [];
        this.inputOperations = [];
        this.ResetTotal();
     },
    
     ResetTotal : function(){
       this.total = 0.0;
     },
    
     AddValueOperation : function (value, operator){
       this.inputNumbers.push(value);
       this.inputOperations.push(operator);
     },

     CalculateTotal : function() { 
       this.ResetTotal();
       
       if(this.inputNumbers.length === 0){
         return this.total;
       }
       else if(this.inputNumbers.length === 1){
         this.total = this.inputNumbers[0];
         this.recentlyCalculated = true;
         return this.total;
       }
       else{
         this.total = this.inputNumbers[0];
         for(var i = 0; i < this.inputOperations.length; i++){
            
            if(this.inputOperations[i] === '+'){
              this.total = this.total + this.inputNumbers[i+1];
            }
            else if(this.inputOperations[i] === '-'){
              this.total = this.total - this.inputNumbers[i+1];
            }
            else if(this.inputOperations[i] === '*'){
              this.total = this.total * this.inputNumbers[i+1];
            }
            else if(this.inputOperations[i] === '/'){
              this.total = this.total / this.inputNumbers[i+1];
            }
            else if(this.inputOperations[i] === '%'){
              this.total = this.total % this.inputNumbers[i+1];
            }
            else if(this.inputOperations[i] === '='){
              if(isNaN(this.total)){
                this.recentlyCalculated = true;
                return "Error!";
              }
              else{
                this.recentlyCalculated = true;
                return this.total;
              }
            }
            else{
              this.recentlyCalculated = true;
              return "Error!";
            }
          }
        }
       this.recentlyCalculated = true;
       return "Error";
     }
  }

  numberButton.click(function () {
    if(CalculationSemantic.recentlyCalculated ){
      CalculationSemantic.recentlyCalculated = false;
      clearInputField();
    }
    if (this.id == 'oneButton') {
        numberButtonPressed("1");
    }
    else if (this.id == 'twoButton') {
        numberButtonPressed("2");
    }
    else if (this.id == 'threeButton') {
        numberButtonPressed("3");
    }
    else if (this.id == 'fourButton') {
        numberButtonPressed("4");
    }
    else if (this.id == 'fiveButton') {
        numberButtonPressed("5");
    }
    else if (this.id == 'sixButton') {
        numberButtonPressed("6");
    }
    else if (this.id == 'sevenButton') {
        numberButtonPressed("7");
    }
    else if (this.id == 'eightButton') {
        numberButtonPressed("8");
    }
    else if (this.id == 'nineButton') {
        numberButtonPressed("9");
    }
    else if (this.id == 'zeroButton') {
        numberButtonPressed("0");
    }
  });
  
  function numberButtonPressed(input){
    if(verifyInputMaxlength()){    
      inputDisplayText.val(inputDisplayText.val() + input);
    }
  }
  
  decimalButton.click(function(){
    if(inputDisplayText.val().indexOf('.') === -1){
      inputDisplayText.val( inputDisplayText.val() + '.' );
    }
  });
  
  operationButton.click(function(){
    if(!CalculationSemantic.recentlyCalculated ){
      var inputValue = parseFloat(inputDisplayText.val());
      if (this.id == 'addButton') {
        CalculationSemantic.AddValueOperation(inputValue, "+");
        clearInputField();
      }
      else if (this.id == 'minusButton') {
        CalculationSemantic.AddValueOperation(inputValue, "-");
        clearInputField();
      }
      else if (this.id == 'multiplyButton') {
        CalculationSemantic.AddValueOperation(inputValue, "*");
        clearInputField();
      }
      else if (this.id == 'divideButton') {
        CalculationSemantic.AddValueOperation(inputValue, "/");
        clearInputField();
      }
      else if (this.id == 'modButton') {
        CalculationSemantic.AddValueOperation(inputValue, "%");
        clearInputField();
      }
      else if (this.id == 'equalButton') {
        CalculationSemantic.AddValueOperation(inputValue, "=");
        inputDisplayText.val(CalculationSemantic.CalculateTotal());
        CalculationSemantic.ResetInputs();
      }
    }
  });

  acButton.click(function(){
    CalculationSemantic.ResetInputs();
    clearInputField();
  });
 
  ceButton.click(function(){
    clearInputField();
  });
       
  function clearInputField(){
    inputDisplayText.val('');
  }
  function verifyInputMaxlength(){
    return (inputDisplayText.val().length < 10);
  }
});