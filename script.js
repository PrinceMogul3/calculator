$(document).ready(function() {
  var $keys = $('.calculator button');
  var $screen = $('.screen');
  var decimal = false;
  var operators = ['+', '-', 'x', '÷'];
  var deletePressed = false; // Track if delete was pressed once

  $keys.click(function() {
    var keyVal = $(this).data('val');
    var output = $screen.html();

    // Reset deletePressed flag on button click
    deletePressed = false;

    // Handle clear, equal, operators, decimal, and numbers
    handleKeyInput(keyVal, output);
  });

  $(window).keydown(function(e) {
    var key;
    var output = $screen.html();

    // Map key codes to calculator button values or functions
    switch (e.which) {
      case 8: // Backspace
        e.preventDefault(); // Prevent the default backspace action
        backspaceKeyFunction();
        return;
      case 46: // Delete
        e.preventDefault(); // Prevent the default delete action
        deleteKeyFunction();
        return;
      case 13: // Enter
        key = '=';
        break;
      case 110:
      case 190: // Period
        key = '.';
        break;
      default:
        // Handle numeric and operator keys
        if (e.which >= 48 && e.which <= 57) { // Main keyboard numbers
          key = String.fromCharCode(e.which);
        } else if (e.which >= 96 && e.which <= 105) { // Numpad numbers
          key = String(e.which - 96);
        }
        // Map other operator keys from numpad and main keyboard
        break;
    }

    // Trigger button click if key is mapped
    if (key !== undefined) {
      var $button = $('[data-val="' + key + '"]');
      $button.addClass('active').click();
      setTimeout(function() { $button.removeClass('active'); }, 100);
    }
  });

  // Function to handle clear, equal, operators, decimal, and numbers
  function handleKeyInput(keyVal, output) {
    // Reset deletePressed flag on any key input
    deletePressed = false;

    // Logic for clear, operators, decimal, and number handling
    // Similar to your existing logic inside $keys.click()
  }

  // Function for backspace key behavior
  function backspaceKeyFunction() {
    var currentVal = $screen.html();
    if (currentVal.length > 1) {
      $screen.html(currentVal.substring(0, currentVal.length - 1));
    } else {
      $screen.html('');
    }
  }

  // Function for delete key behavior
  function deleteKeyFunction() {
    if (deletePressed) {
      // Reset calculator if delete was already pressed once
      $screen.html('');
      decimal = false;
      deletePressed = false;
    } else {
      // Clear screen on first delete press
      $screen.html('');
      deletePressed = true;
      setTimeout(function() { deletePressed = false; }, 2000); // Reset flag after 2 seconds
    }
  }
});
