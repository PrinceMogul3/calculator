$(document).ready(function() {
  var $keys = $('.calculator button');
  var $screen = $('.screen');
  var $history = $('.history'); // Assuming a div for history
  var decimalAdded = false;

  function updateHistory(expression, result) {
    var entry = $("<div>").addClass("history-entry");
    entry.html(`${expression} = ${result}`);
    $history.prepend(entry); // Add new entry to the top
    if ($history.children().length > 5) { // Limit history entries
      $history.children().last().remove();
    }
  }

  $keys.click(function() {
    var keyVal = $(this).data('val');
    var output = $screen.html();
    if (keyVal === '=') {
      var result = handleCalculation(output);
      updateHistory(output, result);
      $screen.html(result);
    } else {
      handleKeyInput(keyVal, output);
    }
  });

  function handleKeyInput(keyVal, output) {
    if (keyVal === 'clear') {
      $screen.html('');
      decimalAdded = false;
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
    var key = mapKeycodeToValue(e.which, e);
    if (key) {
      e.preventDefault();
      if (key === 'backspace') {
        backspaceKeyFunction();
      } else {
        var output = $screen.html();
        if (key === '=') {
          var result = handleCalculation(output);
          updateHistory(output, result);
          $screen.html(result);
        } else {
          handleKeyInput(key, output);
        }
      }
    }
  });

  function backspaceKeyFunction() {
    var currentVal = $screen.html();
    $screen.html(currentVal.slice(0, -1));
    decimalAdded = currentVal.slice(-1) === '.' ? false : decimalAdded;
  }

  function mapKeycodeToValue(keyCode, event) {
    const keycodeMappings = {
      8: 'backspace', // Backspace for Mac and others
      13: '=', // Enter key or Return key
      46: 'clear', // Delete key for Mac (acts as 'clear' in this context)
    };
    // Special case for dot (.)
    if (keyCode === 190 || keyCode === 110) return '.';
    // Number keys from top row and Numpad
    if ((keyCode >= 48 && keyCode <= 57 && !event.shiftKey) || (keyCode >= 96 && keyCode <= 105)) {
      return String.fromCharCode(keyCode >= 96 ? keyCode - 48 : keyCode);
    }
    // Operator keys (with shift key for +)
    if (keyCode === 107 || (keyCode === 187 && event.shiftKey)) return '+';
    if (keyCode === 109 || keyCode === 189) return '-';
    if (keyCode === 106 || (keyCode === 56 && event.shiftKey)) return 'x';
    if (keyCode === 111 || keyCode === 191) return '÷';
    return keycodeMappings[keyCode] || null;
  }
});
