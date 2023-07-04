const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

// Function to handle the key press event
function handleKeyPress(event) {
  const keyValue = event.key;
  handleInput(keyValue);
}

// Function to handle the input value
function handleInput(value) {
  if (value === "Clear") {
    input = "";
    display_input.innerHTML = "";
    display_output.innerHTML = "";
  } else if (value === "Backspace") {
    input = input.slice(0, -1);
    display_input.innerHTML = CleanInput(input);
  } else if (value === "=" || value === "Enter") {
    let result = eval(PrepareInput(input));
    display_output.innerHTML = CleanOutput(result);
  } else if (value === "(" || value === ")") {
    if (
      value === "(" ||
      (value === ")" && input.indexOf("(") !== -1 && input.lastIndexOf("(") > input.lastIndexOf(")"))
    ) {
      input += value;
    }
    display_input.innerHTML = CleanInput(input);
  } else {
    if (ValidateInput(value)) {
      input += value;
      display_input.innerHTML = CleanInput(input);
    }
  }
}

// Add event listeners to handle mouse clicks
for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    handleInput(value);
  });
}

// Add event listener to handle key presses
document.addEventListener("keydown", handleKeyPress);

function CleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] === "*") {
      input_array[i] = ` <span class="operator">x</span> `;
    } else if (input_array[i] === "/") {
      input_array[i] = ` <span class="operator">÷</span> `;
    } else if (input_array[i] === "+") {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] === "-") {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] === "(") {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] === ")") {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] === "%") {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }

  return input_array.join("");
}

function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value === "." && last_input === ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PrepareInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] === "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}
