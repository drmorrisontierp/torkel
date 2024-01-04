let level = 4; //difficulty level
let timerHeight = 1; //timer is represented by a bar that starts at 1% and ends att 75%
let timerLength = 4050; //
let preLevelEleven = 4050;
let n = -9;

let currentProduct = "";
let expression = "";

let answerFlag = true;
let startFlag = true;

let horizontal = []; //array to hold ids of horizontal colored table cells
let vertical = []; //array to hold ids of vertical colored table cells
let crossover = []; //array to hold id of cell that is in both vertical and horizontal arrays
let pressedButton = []; //array to hold ids of pressed table buttons
let products = [];
let productValues = [];

let state = {
  level: 4,
  timerHeight: 1,
  timerLength: 4050,
  products: []
};

const buttons = {
  b7: "7",
  b8: "8",
  b9: "9",
  b4: "4",
  b5: "5",
  b6: "6",
  b3: "3",
  b2: "2",
  b1: "1",
  bdel: "del",
  b0: "0"
};

for (const [_id, input] of Object.entries(buttons)) {
  drawButton(_id, input);
}

loadState();
growTable();

// Read the state values from the state object and assign them to global variables
function readState() {
  if (state) {
    timerHeight = state.timerHeight;
    timerLength = state.timerLength;
    level = state.level;
    products = state.products;
  }
}

// Save the current state object to local storage
function saveState() {
  if (state) {
    let save = JSON.stringify(state);
    localStorage.setItem("klingberg", save);
  }
}

// Clear the state from local storage
function clearMemory() {
  localStorage.removeItem("klingberg");
}

// Load the state from local storage or set default values if not found
function loadState() {
  try {
    let load = localStorage.getItem("klingberg");
    if (load) {
      state = JSON.parse(load);
    } else {
      // Set default state values
      state = {
        level: 4,
        timerHeight: 1,
        timerLength: 4050,
        products: []
      };
    }
  } catch (e) {
    console.error("Error loading state:", e);
    // Handle the error appropriately, e.g., provide a fallback state
    state = {
      level: 4,
      timerHeight: 1,
      timerLength: 4050,
      products: []
    };
  }
}


// Add event listener on keydown
document.addEventListener(
  "keydown",
  (event) => {
    const name = event.key;
    let _id = "";
    if ("1234567890".includes(name)) {
      _id = "b" + name;
      enter(false, name);
    } else if (name == "Enter") {
      _id = "benter";
      check(false);
    } else if (name == "Delete" || name == "Backspace") {
      _id = "bdel";
      del(false);
    } else if (name == " ") {
      _id = "bstart";
      start(false);
    } else if (name == "t") {
      enter(false, name);
      return 0;
    } else if (name == "l") {
      enter(false, name);
      return 0;
    } else if (name == "c") {
      enter(false, name);
      return 0;
    } else {
      return 0;
    }
    buttonDown(_id);
  },
  false
);

// Add event listener on keyup
document.addEventListener(
  "keyup",
  (event) => {
    const name = event.key;
    let _id = "";
    if ("1234567890".includes(name)) {
      _id = "b" + name;
    } else if (name == "Enter") {
      _id = "benter";
    } else if (name == "Delete" || name == "Backspace") {
      _id = "bdel";
    } else if (name == " ") {
      _id = "bstart";
    } else {
      return 0;
    }
    buttonUp(_id);
  },
  false
);

// Function to dynamically create a multiplication table and append it to the DOM
function growTable() {
  const rows = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  let n = 0;

  for (let i = 0; i < 10; i++) {
    let row = document.getElementById(rows[i]);
    n += 10;
    let x = 0;

    for (let e = 0; e < 10; e++) {
      if (e === 0 || i === 0) {
        let input = (e + 1) * (i + 1);
        let div = document.createElement("div");
        let y = n + x;
        let _id = i === 0 ? "v" + y : "h" + y;
        div.setAttribute("id", _id);
        div.setAttribute("class", "table-button");
        if (input !== 1) {
          div.onclick = () => {
            tableRow(_id);
          };
        }
        row.appendChild(div);
        drawButton(_id, input);
      } else {
        let input = (e + 1) * (i + 1);
        let div = document.createElement("div");
        let y = n + x;
        let _id = "t" + y;
        div.setAttribute("id", _id);
        div.setAttribute("class", "table-sign");
        row.appendChild(div);
        drawButton(_id, input);
      }
      x += 1;
    }
  }
}

// Function to create an SVG element with a given tag
function createSVGElement(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

// Function to set attributes on an HTML or SVG element
function setAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}


// Function to dynamically create and draw a button within an SVG element
function drawButton(id, input) {
  let label = input;
  let size = "8.2vh";
  let fontSize = "2em";
  let color = "silver";
  let textColor = "darkgray";
  let textStroke = "black";
  let fill = "url(#TableNormal)";

  // Check the id to customize button appearance
  if (id[0] === "b") {
    size = "100%";
    fontSize = "3em";
    color = "black";
    textColor = "white";
    textStroke = "black";
    fill = "url(#Bob)";
  }
  if (id[0] === "h" || id[0] === "v") {
    color = "black";
    textColor = "white";
    textStroke = "black";
    fill = "url(#Bob)";
  }

  // Create SVG and its elements
  let svg = createSVGElement("svg");
  let shadow = createSVGElement("rect");
  let base = createSVGElement("rect");
  let front = createSVGElement("rect");
  let text = createSVGElement("text");
  let mask = createSVGElement("rect");
  let node = document.createTextNode(label);
  text.appendChild(node);

  // Set attributes for SVG and its elements
  setAttributes(svg, {
    width: "100%",
    height: "100%",
  });
  setAttributes(shadow, {
    rx: "5%",
    ry: "5%",
    x: "0%",
    y: "6%",
    width: "94%",
    height: "94%",
    fill: "#00000037"
  });
  setAttributes(base, {
    rx: "5%",
    ry: "5%",
    x: "4%",
    y: "4%",
    width: "92%",
    height: "92%",
    fill: color
  });
  setAttributes(front, {
    rx: "5%",
    ry: "5%",
    x: "8%",
    y: "4%",
    width: "86%",
    height: "86%",
    fill: fill
  });
  setAttributes(text, {
    x: "50%",
    y: "62%",
    fill: textColor,
    stroke: textStroke,
    "text-anchor": "middle",
    "font-size": fontSize
  });
  setAttributes(mask, {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "transparent"
  });

  // Customize button appearance if its id is "bdel"
  if (id == "bdel") {
    base.setAttribute("fill", "#621a10");
  }

  // Append elements to the SVG and then to the HTML element with the specified id
  svg.appendChild(shadow);
  svg.appendChild(base);
  svg.appendChild(front);
  svg.appendChild(text);
  svg.appendChild(mask);
  document.getElementById(id).appendChild(svg);
}

// Function to handle button press (mousedown) events and change button appearance
function buttonDown(id) {
  let color = "black";

  // Customize color for the "bdel" button
  if (id === "bdel") {
    color = "#621a10";
  }

  // Get the SVG and its child elements by their IDs
  let svg = document.getElementById(id).children[0];
  let shadow = svg.children[0];
  let base = svg.children[1];
  let front = svg.children[2];
  let text = svg.children[3];

  // Customize appearance for specific buttons ("benter" and "bstart")
  if (id === "benter" || id === "bstart") {
    setAttributes(shadow, {
      fill: "transparent"
    });
    setAttributes(base, {
      transform: "translate(-2 , 2)"
    });
    setAttributes(front, {
      transform: "translate(-3 , 2) scale(1.01, 1.02)"
    });
    setAttributes(text, {
      transform: id === "bstart" ? "translate(-2 , 2) rotate(90) scale(1, 2)" : "translate(-2 , 2)"
    });
    return 0;
  }

  // Customize appearance for other buttons
  setAttributes(base, {
    x: "0%",
    y: "7%",
    width: "93%",
    height: "90%",
    fill: color
  });
  setAttributes(shadow, {
    fill: "transparent"
  });
  setAttributes(front, {
    x: "1%",
    y: "7%",
    width: "90%",
    height: "88%"
  });
  setAttributes(text, {
    x: "48%",
    y: "65%"
  });
}

// Function to handle button release (mouseup) events and reset button appearance
function buttonUp(id) {
  let color = "black";

  // Customize color for the "bdel" button
  if (id === "bdel") {
    color = "#621a10";
  }

  // Get the SVG and its child elements by their IDs
  let svg = document.getElementById(id).children[0];
  let shadow = svg.children[0];
  let base = svg.children[1];
  let front = svg.children[2];
  let text = svg.children[3];

  // Customize appearance for the "benter" button
  if (id === "benter") {
    setAttributes(shadow, {
      fill: "#00000037"
    });
    setAttributes(base, {
      transform: ""
    });
    setAttributes(front, {
      transform: ""
    });
    setAttributes(text, {
      transform: ""
    });
    return 0;
  }

  // Customize appearance for the "bstart" button
  if (id === "bstart") {
    setAttributes(shadow, {
      fill: "#00000037"
    });
    setAttributes(front, {
      transform: ""
    });
    setAttributes(text, {
      transform: "rotate(90) scale(1, 2)"
    });

    // Toggle the "start" and "stop" labels and button colors
    if (!startFlag) {
      text.innerHTML = "stop";
      setAttributes(base, {
        transform: "",
        fill: "#621a10"
      });
    } else {
      text.innerHTML = "start";
      setAttributes(base, {
        transform: "",
        fill: "darkgreen"
      });
    }
    return 0;
  }

  // Customize appearance for other buttons
  setAttributes(base, {
    x: "4%",
    y: "4%",
    width: "92%",
    height: "92%",
    fill: color
  });
  setAttributes(shadow, {
    fill: "#00000037"
  });
  setAttributes(front, {
    x: "8%",
    y: "4%",
    width: "86%",
    height: "86%"
  });
  setAttributes(text, {
    x: "50%",
    y: "62%"
  });
}

// Function to handle button press events and append a digit to the result display
function enter(flag, event) {
  if (startFlag) return 0;
  if (flag) {
    buttonDown("b" + event);
    setTimeout(() => {
      buttonUp("b" + event);
    }, 150);
  }
  if (expression.length > 2) {
    return 0;
  }
  let target = document.getElementById("result");
  let digit = event;
  expression += digit;
  target.innerHTML += digit;
}

// Function to handle button press events and remove the last digit from the result display
function del(flag, event) {
  if (startFlag) return 0;
  if (flag) {
    buttonDown(event);
    setTimeout(() => {
      buttonUp(event);
    }, 150);
  }
  let oldString = document.getElementById("result").innerHTML;
  let newString = oldString.slice(0, -1);
  document.getElementById("result").innerHTML = newString;
  expression = newString;
}


// Function to check the user's input and update the game state
function check(flag, event) {
  if (startFlag) return 0;

  // Handle button press animation
  if (flag) {
    buttonDown(event);
    setTimeout(() => {
      buttonUp(event);
    }, 150);
  }

  let answerField = document.getElementById("answer-field");
  let questionField = document.getElementById("question-field");

  if (expression.includes("c")) {
    // Clear game state
    clearMemory();
    level = 4;
    timerHeight = 1;
    timerLength = 4050;
    products = [];
    generateProducts();
    currentProduct = [];
    saveState();
    start(true, "bstart");
    expression = "";
    document.getElementById("result").innerHTML = "";
    return 0;
  }

  if (expression.includes("t")) {
    // Adjust timer length based on input
    if (expression == "t5") {
      timerLength = 2025;
    } else if (expression == "t10") {
      timerLength = 4050;
    } else if (expression == "t15") {
      timerLength = 6075;
    } else if (expression == "t20") {
      timerLength = 8100;
    } else {
      expression = "";
      document.getElementById("result").innerHTML = "";
      return 0;
    }
    preLevelEleven = timerLength;
    expression = "";
    document.getElementById("result").innerHTML = "";
    products = [];
    generateProducts();
    start(true, "bstart");
    return 0;
  }

  if (expression.includes("l")) {
    // Adjust the game level based on input
    let newLevel = expression.substring(1, expression.length);
    if (newLevel.includes("l") || newLevel.includes("t")) {
      expression = "";
      document.getElementById("result").innerHTML = "";
      return 0;
    }
    if (newLevel != 0) {
      level = newLevel;
    } else {
      level = 1;
    }
    expression = "";
    document.getElementById("result").innerHTML = "";
    timerHeight = 1;
    products = [];
    generateProducts();
    start(true, "bstart");
    return 0;
  }

  if (expression == currentProduct[1]) {
    // Handle correct answer
    answerFlag = true;
    setAttributes(answerField, {
      fill: "green"
    });
    setAttributes(questionField, {
      fill: "green"
    });
    setTimeout(() => {
      setAttributes(answerField, {
        fill: "cyan"
      });
      setAttributes(questionField, {
        fill: "cyan"
      });
    }, 150);
    if (products.length < 3) {
      level++;
      timerHeight = 0;
      generateProducts();
      document.getElementById("level").innerHTML = level;
      start(true, "bstart");
      return 0;
    }
    chooseProduct();
    if (level > 10) {
      timerHeight = 0;
    }
    moveProductBar();
    expression = "";
    document.getElementById("result").innerHTML = expression;
    document.getElementById("expression").innerHTML = currentProduct[0];
  } else {
    // Handle incorrect answer
    setAttributes(answerField, {
      fill: "red"
    });
    setAttributes(questionField, {
      fill: "red"
    });
    setTimeout(() => {
      setAttributes(answerField, {
        fill: "cyan"
      });
      setAttributes(questionField, {
        fill: "cyan"
      });
    }, 150);
    expression = "";
    document.getElementById("result").innerHTML = expression;
    if (answerFlag) {
      answerFlag = !answerFlag;
      return 0;
    } else {
      products.push(currentProduct[0]);
      products.push(currentProduct[1]);
      products.push(currentProduct[0]);
      products.push(currentProduct[1]);
      answerFlag = !answerFlag;
      if (products.length > 100) {
        if (level > 1) {
          level -= 1;
        } else {
          level = 1;
        }
        products = [];
        generateProducts();
        start(true, "bstart");
        return 0;
      }
      currentProduct = [];
      chooseProduct();
      moveProductBar();
      document.getElementById("expression").innerHTML = currentProduct[0];
    }
  }
}

// Function to start or stop the game
function start(flag, event) {
  if (flag) {
    buttonDown(event);
    setTimeout(() => {
      buttonUp(event);
    }, 150);
  }

  if (startFlag) {
    // Start the game
    currentProduct = [];
    changeTable();
    readState();

    // Generate products if the product list is empty
    if (products.length == 0) generateProducts();

    chooseProduct();
    answerFlag = true;
    moveProductBar();
    document.getElementById("expression").innerHTML = currentProduct[0];
    document.getElementById("level").innerHTML = level;

    if (level > 10) {
      preLevelEleven = timerLength;
      timerLength = 10000 / (level * (level));
    }

    if (level < 11) {
      timerLength = preLevelEleven;
    }

    timerMove();
  } else {
    // Stop the game
    try {
      clearInterval(newTimer);
    } catch (e) {}

    // Clear the table
    let rows = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten"
    ];

    for (row of rows) {
      document.getElementById(row).innerHTML = "";
    }

    n = -9;
    growTable();
    document.getElementById("expression").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    expression = "";

    // Add the current product back to the product list
    products.push(currentProduct[0]);
    products.push(currentProduct[1]);
    currentProduct = [];

    // Update the game state and save it
    state.products = products;
    state.level = level;
    state.timerHeight = timerHeight;
    state.timerLength = timerLength;
    saveState();
  }

  startFlag = !startFlag;
}


// Function to handle table row clicks and toggle cell colors
function tableRow(event) {
  buttonDown(event);

  // Check if the clicked row is already pressed
  for (let id of pressedButton) {
    if (id === event) {
      if (id[0] === "v") {
        for (let id of vertical) _recolor(id, "silver", "darkgray");
        vertical = [];
      } else {
        for (let id of horizontal) _recolor(id, "silver", "darkgray");
        horizontal = [];
      }
      for (let id of crossover) _recolor(id, "goldenrod", "darkred");
      crossover = [];
      _recolor(id, "black", "white");
      let index = pressedButton.indexOf(id);
      pressedButton.splice(index, 1);
      buttonUp(event);
      return 0;
    }
  }

  // Check if any other rows of the same type are pressed and unpress them
  for (let id of pressedButton) {
    if (event[0] === id[0]) {
      let index = pressedButton.indexOf(id);
      pressedButton.splice(index, 1);
      _recolor(id, "black", "white");
      buttonUp(id);
    }
  }

  // Add the clicked row to the list of pressed rows and change its color
  pressedButton.push(event);
  _recolor(event, "darkred", "white");

  if (event[0] === "v") {
    for (let id of vertical) _recolor(id, "silver", "darkgray");
    for (let id of crossover) _recolor(id, "goldenrod", "darkred");
    vertical = [];
    crossover = [];
    let x = parseInt(event.substr(1, event.length));
    let y = x + 10;
    let z = y + 90;
    for (y; y < z; y += 10) {
      _id = "t" + y;
      vertical.push(_id);
    }
    for (let id of vertical) _recolor(id, "goldenrod", "darkred");
  }

  if (event[0] === "h") {
    for (let id of horizontal) _recolor(id, "silver", "darkgray");
    for (let id of crossover) _recolor(id, "goldenrod", "darkred");
    horizontal = [];
    crossover = [];
    let x = parseInt(event.substr(1, event.length));
    let y = x + 1;
    let z = y + 9;
    for (y; y < z; y++) {
      _id = "t" + y;
      horizontal.push(_id);
    }
    for (let id of horizontal) _recolor(id, "goldenrod", "darkred");
  }

  // Check for crossover cells and change their color
  for (let hid of horizontal) {
    for (let vid of vertical) {
      if (vid === hid) {
        _recolor(hid, "gold", "red");
        crossover.push(hid);
      }
    }
  }
}


// Function to change the table by updating cell masks
function changeTable() {
  let rows = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
  ];

  let max = level;

  // Limit the maximum level to 10
  if (level > 10) max = 10;

  for (let i = 1; i < max; i++) {
    let row = document.getElementById(rows[i]);
    for (let e = 1; e < max; e++) {
      let _id = row.children[e].id;
      let svg = document.getElementById(_id).children[0];
      let mask = svg.children[4];

      // Update the cell mask's fill color
      setAttributes(mask, {
        fill: "black"
      });
    }
  }
}

// Function to recolor an SVG element
function _recolor(id, fillColor, textColor) {
  let svg = document.getElementById(id).children[0];
  let base = svg.children[1];
  let text = svg.children[3];

  // Update the base and text element's fill and stroke colors
  setAttributes(base, {
    fill: fillColor
  });

  setAttributes(text, {
    fill: textColor,
    stroke: "black"
  });
}

// Function to generate products in text form and the integer solution and add them to the products array
function generateProducts() {
  let a = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  let b = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (let x of a) {
    for (let y of b) {
      let text = x + " • " + y;
      let alt = y + " • " + x;
      let product = x * y;

      // Check if the product or its alternate representation is already in the products array
      if (!products.includes(text) && !products.includes(alt)) {
        products.push(text);
        products.push(product);
      }
    }
  }
}

// Function to choose a product from the products array
function chooseProduct() {
  currentProduct = [];
  let productText;
  let product;

  if (products.length > 2) {
    let index = Math.round(Math.random() * (products.length - 2));

    // Ensure that the index is even to get the product in text form and not its integer solution
    if (index % 2 > 0) index -= 1;

    productText = products[index];
    product = products[index + 1];
    products.splice(index, 2);
  } else {
    productText = products[0];
    product = products[1];
    products = [];
  }

  currentProduct = [productText, product];
}

// Function to move the product bar by updating SVG attributes
function moveProductBar() {
  let base = document.getElementById("productsBarFill");
  let shadow = document.getElementById("productsBarShadow");

  // Calculate the height of the product bar based on the number of products
  let heightPercentage = String(75 - (75 * products.length) / 100) + "%";
  setAttributes(base, {
    x: "58%",
    y: "4%",
    width: "30%",
    height: heightPercentage
  });
  setAttributes(shadow, {
    x: "58%",
    y: "4%",
    width: "30%",
    height: heightPercentage
  });
}


// Function to move the timer bar and update the timer
function timerMove() {
  let base = document.getElementById("timerBarFill");
  let shadow = document.getElementById("timerBarShadow");

  // Create a new timer interval
  newTimer = setInterval(() => {
    setAttributes(base, {
      x: "15%",
      y: "4%",
      width: "30%",
      height: String(75 - timerHeight) + "%"
    });

    setAttributes(shadow, {
      x: "15%",
      y: "4%",
      width: "30%",
      height: String(75 - timerHeight) + "%"
    });

    timerHeight += 0.5;

    if (timerHeight > 75) {
      if (level > 10) {
        level -= 1;
        document.getElementById("level").innerHTML = level;
      }
      timerHeight = 1;
      start(true, "bstart");
    }
  }, timerLength);
}