import React, { Component } from 'react';
import {
    App,
    AppRegistry,
    Window,
    Text,
    View,
    TouchableOpacity,
} from 'proton-native';




class CircleButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: this.props.backgroundColor,
                    borderRadius: 40,
                    height: 80,
                    width: this.props.width || 80,
                    alignItems: this.props.start ? 'flex-start' : 'center',
                    justifyContent: 'center',
                }}
                onPress={this.props.onPress}
            >
                <Text
                    style={{
                        color: this.props.color,
                        fontSize: this.props.size,
                        marginLeft: this.props.start ? 25 : 0,
                    }}
                >
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    }
}

const buttonStyle = {
    primary: {
        backgroundColor: '#FC9E34',
        color: 'white',
        size: 40,
    },
    secondary: {
        backgroundColor: '#A4A4A4',
        color: '#010101',
        size: 30,
    },
    number: {
        backgroundColor: '#363636',
        color: 'white',
        size: 40,
    },
};

class Keypad extends Component {
    state = {
        secondary: 0,
        primary: 0,
        operator: '',
        justChanged: false,
        decimal: false,
        products: [...this.props.originalProducts]
    };
    getButtons() {
        // this can't be an instance variable or else it won't get hot reloaded
        return [
            
            [
                {
                    text: '7',
                    type: 'number',
                    onPress: () => this.addDigit(7),
                },
                {
                    text: '8',
                    type: 'number',
                    onPress: () => this.addDigit(8),
                },
                {
                    text: '9',
                    type: 'number',
                    onPress: () => this.addDigit(9),
                },
            ],
            [
                {
                    text: '4',
                    type: 'number',
                    onPress: () => this.addDigit(4),
                },
                {
                    text: '5',
                    type: 'number',
                    onPress: () => this.addDigit(5),
                },
                {
                    text: '6',
                    type: 'number',
                    onPress: () => this.addDigit(6),
                },
                
            ],
            [
                {
                    text: '1',
                    type: 'number',
                    onPress: () => this.addDigit(1),
                },
                {
                    text: '2',
                    type: 'number',
                    onPress: () => this.addDigit(2),
                },
                {
                    text: '3',
                    type: 'number',
                    onPress: () => this.addDigit(3),
                },
                
            ],
            [
                {
                    text: 'del',
                    type: 'number',
                    onPress: () => this.setState({ decimal: true }),
                },
                {
                    text: '0',
                    type: 'number',
                    //width: 185,
                    //start: true,
                    onPress: () => this.addDigit(0),
                },
                
                {
                    text: 'AC',
                    type: 'primary',
                    onPress: () => this.changeOperator('+'),
                },
            ],
        [
            {
                text: 'check',
                type: 'primary',
                width: 240,
                onPress: () => this.changeOperator('+'),
            },
        ]
        ];
    }

    addDigit(new_digit) {
        if (this.state.justChanged) {
            if (this.state.decimal) {
                this.setState({
                    secondary: this.state.primary,
                    primary: new_digit / 10,
                    justChanged: false,
                });
            } else {
                this.setState({
                    secondary: this.state.primary,
                    primary: new_digit,
                    justChanged: false,
                });
            }
        } else if (!this.state.decimal) {
            this.setState({
                primary: 10 * this.state.primary + new_digit,
            });
        } else if (this.state.decimal) {
            if (this.state.primary.toString().indexOf('.') == -1) {
                this.setState({
                    primary: parseFloat(
                        this.state.primary.toString() + '.' + new_digit.toString()
                    ),
                });
            } else {
                this.setState({
                    primary: parseFloat(
                        this.state.primary.toString() + new_digit.toString()
                    ),
                });
            }
        }
    }

    changeOperator(new_operator) {
        if (this.state.operator === '+') {
            this.setState({
                secondary: 0,
                primary: this.state.secondary + this.state.primary,
                operator: new_operator,
                justChanged: true,
            });
        } else if (this.state.operator === '-') {
            this.setState({
                secondary: 0,
                primary: this.state.secondary - this.state.primary,
                operator: new_operator,
                justChanged: true,
            });
        } else if (this.state.operator === '/') {
            this.setState({
                secondary: 0,
                primary: this.state.secondary / this.state.primary,
                operator: new_operator,
                justChanged: true,
            });
        } else if (this.state.operator === '*') {
            this.setState({
                secondary: 0,
                primary: this.state.secondary * this.state.primary,
                operator: new_operator,
                justChanged: true,
            });
        } else {
            this.setState({ operator: new_operator, justChanged: true });
        }
    }
    randomChoice(list) {
        const randomIndex = Math.round(Math.random()*list.length);
        return list[randomIndex]
    }
    render() {
        return (
            <View
                style={{
                    width: '50%',
                    height: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                    <View
                        style={{
                            width: '50%',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 80,
                                textAlign: 'left',
                                marginRight: 35,
                                marginBottom: 15,
                                fontWeight: 200,
                            }}
                        >
                            {this.randomChoice(this.state.products)}
                        </Text>

                    </View>

                    <View
                        style={{
                            width: '50%',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 80,
                                textAlign: 'right',
                                marginRight: 35,
                                marginBottom: 15,
                                fontWeight: 200,
                            }}
                        >
                            {this.state.primary.toString().length >= 7
                                ? this.state.primary.toExponential(4)
                                : this.state.primary}
                        </Text>

                    </View>
                </View>
                {this.getButtons().map((buttonGroup, index1) => (
                    <View
                        key={index1.toString()}
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {buttonGroup.map((button, index2) => (
                            <CircleButton
                                key={index1.toString() + index2.toString()}
                                {...buttonStyle[button.type]}
                                onPress={button.onPress}
                                width={button.width}
                                start={button.start}
                            >
                                {button.text}
                            </CircleButton>
                        ))}
                    </View>
                ))}

            </View>
        );
    }
}

export default Keypad