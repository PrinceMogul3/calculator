$(document).ready(function() {
  var $keys = $('.calculator button');
  var $screen = $('.screen');
  var $history = $('.history'); // Assuming a div for history
  var decimalAdded = false;
  var deletePressed = false;

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
    deletePressed = false;
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
    var key = mapKeycodeToValue(e.which);
    if (key === 'backspace') {
      e.preventDefault();
      backspaceKeyFunction();
    } else if (key) {
      e.preventDefault();
      var output = $screen.html();
      if (key === '=') {
        var result = handleCalculation(output);
        updateHistory(output, result);
        $screen.html(result);
      } else {
        handleKeyInput(key, output);
      }
    }
  });

  function backspaceKeyFunction() {
    var currentVal = $screen.html();
    $screen.html(currentVal.slice(0, -1));
    decimalAdded = currentVal.slice(-1) === '.' ? false : decimalAdded;
  }

  function mapKeycodeToValue(keyCode) {
    // Implement keycode mapping here
  }

  // Automatically entering a sequence or any other initial setup can be added here
});
