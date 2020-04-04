import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export default class App extends React.Component {
  state = {
    gameState: ['', '', '', '', '', '', '', '', ''],
    playerTurn: 'X',
    gameOver: false,
  }

  handleButtonPress = (index: number) => {
    if (this.state.gameOver) return false;

    const newGameState = [...this.state.gameState];
    newGameState[index] = this.state.playerTurn;

    this.setState({ gameState: newGameState}, () => {
      this.changePlayerTurn();
      this.checkWinCondition();
    });
  }

  checkWinCondition = () => {
    winningConditions.map(condition => {
      let gameState = this.state.gameState;

      let a = gameState[condition[0]];
      let b = gameState[condition[1]];
      let c = gameState[condition[2]];

      if (a === '' || b === '' || c == '') {
        return false;
      }

      if (a === b && b === c) {
        this.setState({ gameOver: true });

        Alert.alert(
          `Game Over!`,
          `${this.state.playerTurn} wins the game!`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Restart", onPress: this.resetGame }
          ],
          { cancelable: false }
        );
      }
    }) 

    if (!this.state.gameState.includes('')) {
      this.setState({ gameOver: true });

        Alert.alert(
          `Game Over!`,
          `The game was a draw!`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Restart", onPress: this.resetGame }
          ],
          { cancelable: false }
        );
    }
  }

  changePlayerTurn = () => this.setState({ playerTurn: this.state.playerTurn === 'X' ? 'O' : 'X' })

  resetGame = () => {
    this.setState({
      gameState: ['', '', '', '', '', '', '', '', ''],
      playerTurn: 'X',
      gameOver: false,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Katara's Tic Tac Toe</Text>
        {
          [0, 3, 6].map(row => (

            <View style={[styles.gridRow, this.state.gameOver ? styles.gameDisabled : null]} key={row}>
              {
                this.state.gameState.slice(row, row + 3).map((cell, index) => (
                  <View style={styles.gridCell} key={row + index}>
                    <TouchableHighlight 
                      onPress={() => this.handleButtonPress((row + index))} 
                      underlayColor="white"
                      style={styles.gridButton}
                    >
                      <Text style={styles.cellText}>
                        { cell }
                      </Text>
                    </TouchableHighlight>
                  </View>
                ))
              }
            </View>
          ))

        }

        { this.state.gameOver && <Text style={styles.gameOverWarning}>The game is over. Click restart to play again.</Text> }

        { this.state.gameOver && <TouchableHighlight onPress={this.resetGame}>
          <Text style={styles.restartButton}>Restart Game</Text>
        </TouchableHighlight> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCell: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    height: 150,
  },
  gridButton: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 90,
  },
  restartButton:  {
    backgroundColor: 'steelblue',
    padding: 20,
    borderRadius: 50,
    color: 'white',
    width: 220,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  gameDisabled: {
    backgroundColor: 'lightgray',
  },
  gameOverWarning: {
    color: 'red',
  }
});
