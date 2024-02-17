$(document).ready(function() {
  var $keys = $('.calculator button');
  var $screen = $('.screen');
  var $history = $('.history'); // Assuming a div for history is present in the HTML
  var decimalAdded = false;

  $keys.click(function() {
    var keyVal = $(this).data('val');
    var output = $screen.html();
    if (keyVal === '=') {
      var result = handleCalculation(output);
      if (output) { // Only update history if there is an expression to evaluate
        updateHistory(output, result);
      }
      $screen.html(result);
      decimalAdded = false; // Reset decimal flag after calculation
    } else if (keyVal === 'clear') {
      $screen.html('');
      decimalAdded = false;
    } else {
      handleKeyInput(keyVal, output);
    }
  });

  function handleKeyInput(keyVal, output) {
    if (keyVal === '.') {
      if (!decimalAdded) {
        $screen.html(output + keyVal);
        decimalAdded = true;
      }
    } else {
      $screen.html(output + keyVal);
    }
  }

  function handleCalculation(expression) {
    expression = expression.replace(/x/g, '*').replace(/÷/g, '/');
    try {
      return eval(expression);
    } catch (e) {
      return 'Error';
    }
  }

  $(window).keydown(function(e) {
    var key = mapKeycodeToValue(e.which);
    if (key) {
      e.preventDefault();
      if (key === 'backspace') {
        backspaceKeyFunction();
      } else if (key === 'delete') {
        $screen.html('');
        decimalAdded = false;
      } else {
        $keys.filter(`[data-val="${key}"]`).click();
      }
    }
  });

  function backspaceKeyFunction() {
    var currentVal = $screen.html();
    $screen.html(currentVal.slice(0, -1));
    decimalAdded = currentVal.slice(-1) === '.' ? false : decimalAdded;
  }

  function mapKeycodeToValue(keyCode) {
    const keycodeMappings = {
      8: 'backspace',
      13: '=',
      46: 'delete',
      110: '.', 190: '.', // Decimal
      107: '+', 187: (e.shiftKey ? '+' : '='),
      109: '-', 189: '-',
      106: 'x',
      111: '÷', 191: '÷',
    };
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) { // Numbers
      return String(keyCode >= 96 ? keyCode - 96 : String.fromCharCode(keyCode));
    }
    return keycodeMappings[keyCode] || null;
  }
});
