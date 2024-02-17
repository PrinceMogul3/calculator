$(document).ready(function() {
  var $keys = $('.calculator button');
  var $screen = $('.screen');
  var decimalAdded = false;
  var operators = ['+', '-', 'x', '÷'];
  var deletePressed = false;

  $keys.click(function() {
    var keyVal = $(this).data('val');
    var output = $screen.html();
    handleKeyInput(keyVal, output);
  });

  function handleKeyInput(keyVal, output) {
    deletePressed = false;

    switch(keyVal) {
      case 'clear':
        $screen.html('');
        decimalAdded = false;
        break;
      case '=':
        output = output.replace(/x/g, '*').replace(/÷/g, '/');
        try {
          var result = eval(output);
          $screen.html(result);
          decimalAdded = output.includes('.');
        } catch (e) {
          $screen.html('Error');
        }
        break;
      case '.':
        if (!decimalAdded) {
          $screen.html(output + keyVal);
          decimalAdded = true;
        }
        break;
      case 'backspace':
        backspaceKeyFunction();
        break;
      case 'delete':
        deleteKeyFunction();
        break;
      default:
        if (operators.includes(keyVal)) {
          if (output && !operators.includes(output.slice(-1))) {
            $screen.html(output + keyVal);
          }
        } else {
          $screen.html(output + keyVal);
        }
    }
  }

  function backspaceKeyFunction() {
    var currentVal = $screen.html();
    $screen.html(currentVal.slice(0, -1));
    decimalAdded = false;
  }

  function deleteKeyFunction() {
    $screen.html('');
    decimalAdded = false;
  }

  $(window).keydown(function(e) {
    var key = mapKeycodeToValue(e.which);
    if (key) {
      e.preventDefault();
      handleKeyInput(key, $screen.html());
    }
  });

  function mapKeycodeToValue(keyCode) {
    const keycodeMappings = {
      8: 'backspace', 46: 'delete', 13: '=', 110: '.', 190: '.', // Period and Delete
      107: '+', 187: '+', 109: '-', 189: '-', 106: 'x', 111: '÷', 191: '÷'
    };
    // Numbers on main keyboard (48-57) and numpad (96-105)
    if (keyCode >= 48 && keyCode <= 57) return String.fromCharCode(keyCode);
    if (keyCode >= 96 && keyCode <= 105) return String(keyCode - 96);
    return keycodeMappings[keyCode] || null;
  }

  function autoEnterMogul() {
    // Sequence "Mogul" translates to "12345"
    const mogulSequence = '66485';
    mogulSequence.split('').forEach(digit => {
      handleKeyInput(digit, $screen.html());
    });
  }

  // Automatically enter "Mogul" sequence upon initialization
  autoEnterMogul();
});
