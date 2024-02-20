$(document).ready(function() {
  var $keys = $('.calculator button');
  var $screen = $('.screen');
  var $history = $('.history');
  var decimalAdded = false;
  var calculationCompleted = false; // Flag to track if the last action was a calculation

  function updateHistory(expression, result) {
    var entry = $("<div>").addClass("history-entry");
    entry.html(`${expression} = ${result}`);
    $history.prepend(entry);
    if ($history.children().length > 5) {
      $history.children().last().remove();
    }
  }

  $keys.click(function() {
    var keyVal = $(this).data('val');
    var output = $screen.html();
    
    if (calculationCompleted && !isNaN(keyVal)) {
      output = "0"; // Clear the screen if the last action was a calculation
    }
    
    calculationCompleted = false; // Reset the flag for every key except '='

    if (keyVal === '=') {
      var result = handleCalculation(output);
      updateHistory(output, result);
      $screen.html(result);
      calculationCompleted = true; // Set the flag as calculation is done
    } else {
      handleKeyInput(keyVal, output);
    }
  });

  function handleKeyInput(keyVal, output) {
    if (keyVal === 'clear') {
      $screen.html('0');
      decimalAdded = false;
    } else if (output === "0" || calculationCompleted) {
      $screen.html(keyVal === 'clear' ? '0' : keyVal);
      calculationCompleted = false; // Reset the flag if a number or operator is pressed
    } else {
      $screen.html(output + keyVal);
    }
  }

  function handleCalculation(expression) {
    expression = expression.replace(/x/g, '*').replace(/÷/g, '/');
    try {
      var result = eval(expression);
      return +result.toFixed(2); // Round the result to two decimal places
    } catch (e) {
      return 'Error';
    }
  }

  $(window).keydown(function(e) {
    var key = mapKeycodeToValue(e.which, e);
    if (key) {
      e.preventDefault();
      if (key === 'backspace') {
        backspaceKeyFunction();
      } else if (key === 'esc') {
        handleEscFunctionality();
      } else {
        var output = $screen.html();
        if (calculationCompleted && !isNaN(key)) {
          output = "0";
        }
        
        calculationCompleted = false; // Reset the flag for keyboard input as well

        if (key === '=') {
          var result = handleCalculation(output);
          updateHistory(output, result);
          $screen.html(result);
          calculationCompleted = true;
        } else {
          handleKeyInput(key, output);
        }
      }
    }
  });

  function backspaceKeyFunction() {
    var currentVal = $screen.html();
    if (currentVal.length <= 1 || calculationCompleted) {
      $screen.html('0');
      calculationCompleted = false;
    } else {
      $screen.html(currentVal.slice(0, -1));
    }
    decimalAdded = currentVal.slice(-1) === '.' ? false : decimalAdded;
  }

  function handleEscFunctionality() {
    var currentTime = new Date().getTime();
    if (currentTime - escPressedTime < 500) {
      $history.empty();
    } else {
      $screen.html('0');
    }
    escPressedTime = currentTime;
    calculationCompleted = false; // Reset the flag for ESC functionality as well
  }

  function mapKeycodeToValue(keyCode, event) {
    const keycodeMappings = {
      8: 'backspace',
      13: '=',
      27: 'esc',
      46: 'clear',
    };
    if (keyCode === 190 || keyCode === 110) return '.';
    if ((keyCode >= 48 && keyCode <= 57 && !event.shiftKey) || (keyCode >= 96 && keyCode <= 105)) {
      return String.fromCharCode(keyCode >= 96 ? keyCode - 48 : keyCode);
    }
    if (keyCode === 107 || (keyCode === 187 && event.shiftKey)) return '+';
    if (keyCode === 109 || keyCode === 189) return '-';
    if (keyCode === 106 || (keyCode === 56 && event.shiftKey)) return 'x';
    if (keyCode === 111 || keyCode === 191) return '÷';
    return keycodeMappings[keyCode] || null;
  }
});
