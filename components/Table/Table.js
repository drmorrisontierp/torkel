import React, { Component } from 'react';
import {
    App,
    AppRegistry,
    Window,
    Text,
    View,
    TouchableOpacity,
} from 'proton-native';




class TableButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: this.props.backgroundColor,
                    borderRadius: 10,
                    height: 60,
                    width: 60,
                    alignItems: this.props.start ? 'flex-start' : 'center',
                    justifyContent: 'center',
                    
                }}
                onPress={this.props.onPress}
                dataId={this.props.dataId}
                
            >
                <Text
                    style={{
                        color: this.props.color,
                        fontSize: this.props.size,
                        marginLeft: 0,
                    }}
                >
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    }
}

const buttonStyle = {
    button: {
        backgroundColor: '#A4A4A4',
        color: '#010101',
        size: 30,
    },
    norm: {
        backgroundColor: '#363636',
        color: 'white',
        size: 30,
    },
};

const changeTable = () => {

}

class Table extends Component {
    state = {
        secondary: 0,
        primary: 0,
        operator: '',
        justChanged: false,
        decimal: false,
        refs: {},
    };
 //   changeTable() {
  //      let level = props.level

   // }
    getButtons() {
        // this can't be an instance variable or else it won't get hot reloaded
        let table = []
        for (let y = 10; y > 0; y--) {
            let row = [];
            for (let x = 1; x < 11; x++) {
                let element = { text: '', type: '', dataId: '', onPress: null };
                element.dataId = `${x}${y}`
                element.text = (x * y).toString();
                refs[element.dataId] = React.createRef()
                if (x == 1 || y == 1) {
                    element.type = 'button';
                    element.onPress = () => { console.log('yes', element.dataId) }
                } else {
                    element.type = 'norm';
                    element.onPress = () => {};
                }
                if (x == 1 && y == 1) {
                    element.type = 'button';
                    element.onPress = () => {};
                }
                row.push(element)              
            }        
            table.push(row)

        }
        console.log(table)
        console.log(refs)
        return table;
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
                            <TableButton
                                key={index1.toString() + index2.toString()}
                                dataId={button.dataId}
                                {...buttonStyle[button.type]}
                                onPress={button.onPress}
                                width={button.width}
                                start={button.start}
                                ref={this.state.refs[dataId]}
                            >
                                {button.text}
                            </TableButton>
                        ))}
                    </View>
                ))}

            </View>
        );
    }
}

export default Table