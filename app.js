import React, { Component } from "react"; // import from react

import { Window, App } from "proton-native"; // import the proton-native components
import Keypad from "./components/Calculator/Keypad"
import Table from "./components/Table/Table"

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 4,
      levelAttempts: true,
      started: false,
      product: '',
      originalProducts: [
        '5 × 9',
        '5 × 8',
        '4 × 7',
        '2 × 2',
        '2 × 3',
        '2 × 4',
        '2 × 5',
        '2 × 6',
        '2 × 7',
        '2 × 8',
        '2 × 9',
        '2 × 10',
        '3 × 3',
        '3 × 4',
        '3 × 5',
        '3 × 6',
        '3 × 7',
        '3 × 8',
        '3 × 9',
        '4 × 4',
        '4 × 5',
        '4 × 6',
        '4 × 8',
        '4 × 9',
        '4 × 10',
        '5 × 5',
        '5 × 6',
        '5 × 7',
        '5 × 10',
        '6 × 6',
        '6 × 7',
        '6 × 8',
        '6 × 9',
        '6 × 10',
        '7 × 7',
        '7 × 8',
        '7 × 9',
        '7 × 10',
        '8 × 8',
        '8 × 9',
        '8 × 10',
        '9 × 9',
        '9 × 10',
        '10 × 10',
      ],
      products: [],
      digits: '',
      timerFlag: 'stop',
      timerRate: 5,
    };
  };


  render() {
    // all Components must have a render method
    return (
      <App>
        {/* you must always include App around everything */}
        <Window style={{ width: 1400, height: 700, backgroundColor: "black", flexDirection: "row" }}>
          {/* all your other components go here*/}
          <Table level={this.state.level}></Table>
          <Keypad originalProducts={this.state.originalProducts}></Keypad>
        </Window>
      </App>
    );
  }
}
