$(document).ready(function() {
  var $keys = $('.calculator button');
  var $screen = $('.screen');
  var decimalAdded = false;
  var operators = ['+', '-', 'x', '÷'];
  var deletePressed = false; // Flag to track if delete was pressed once

  $keys.click(function() {
    var keyVal = $(this).data('val');
    var output = $screen.html();
    handleKeyInput(keyVal, output);
  });

  function handleKeyInput(keyVal, output) {
    deletePressed = false; // Reset deletePressed flag on any key input

    if (keyVal === 'clear') {
      $screen.html('');
      decimalAdded = false;
    } else if (keyVal === '=') {
      output = output.replace(/x/g, '*').replace(/÷/g, '/');
      try {
        var result = eval(output);
        $screen.html(result);
        decimalAdded = output.includes('.');
      } catch (e) {
        $screen.html('Error');
      }
    } else if (operators.includes(keyVal)) {
      if (!output || operators.includes(output.slice(-1))) return;
      $screen.html(output + keyVal);
      decimalAdded = false;
    } else if (keyVal === '.') {
      if (!decimalAdded) {
        $screen.html(output + keyVal);
        decimalAdded = true;
      }
    } else {
      $screen.html(output + keyVal);
    }
  }

  function backspaceKeyFunction() {
    var currentVal = $screen.html();
    if (currentVal.length > 0) {
      $screen.html(currentVal.slice(0, -1));
      decimalAdded = currentVal.slice(-1) === '.' ? false : decimalAdded;
    }
  }

  function deleteKeyFunction() {
    $screen.html('');
    decimalAdded = false;
    deletePressed = !deletePressed;
    if (!deletePressed) setTimeout(() => deletePressed = false, 2000); // Reset after 2 seconds
  }

  $(window).keydown(function(e) {
    var key = mapKeycodeToValue(e.which);
    if (key) {
      e.preventDefault(); // Prevent the default action for the key
      handleKeyInput(key, $screen.html());
    }
  });

  function mapKeycodeToValue(keyCode) {
    const keycodeMappings = {
      8: 'backspace', // Backspace
      46: 'delete', // Delete
      13: '=', // Enter
      110: '.', 190: '.', // Period (main keyboard and numpad)
      107: '+', 187: '+', // Plus (main keyboard and numpad)
      109: '-', 189: '-', // Minus (main keyboard and numpad)
      106: 'x', // Multiply (numpad)
      111: '÷', 191: '÷', // Divide (main keyboard and numpad)
    };
    // Numbers on main keyboard (48-57) and numpad (96-105)
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
      return String.fromCharCode(keyCode >= 96 ? keyCode - 48 : keyCode);
    }
    if (keyCode === 8) backspaceKeyFunction(); // Handle backspace separately
    else if (keyCode === 46) deleteKeyFunction(); // Handle delete separately

    return keycodeMappings[keyCode] || null;
  }
});
