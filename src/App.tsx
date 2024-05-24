
import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
// import Icon from 'react-native-vector-icons/FontAwesome'
function App(): JSX.Element {
  //isCross is a state variable that is used to check if the player is cross or not
  // setIsCross is a function that is used to set the value of isCross
  // useState is a hook that is used to declare a state variable
  // and a function that is used to set the value of the state variable
  const [isCross, setIsCross] = useState<boolean>(false)
  // gameWinner is a state variable that is used to check the winner of the game
  // setGameWinner is a function that is used to set the value of gameWinner

  const [gameWinner, setGameWinner] = useState<string>('')
  // gameState is a state variable that is used to check the state of the game
  // setGameState is a function that is used to set the value of gameState
  //new Array(9).fill('empty', 0, 9) is used to create an array of 9 elements
  // and fill it with the value 'empty'

  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))
  // reloadGame is a function that is used to reload the game

  const reloadGame = () => {
    // set isCross to false
    // set gameWinner to an empty string
    // set gameState to an array of 9 elements filled with the value 'empty'
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }
// checkIsWinner is a function that is used to check the winner of the game
  const checkIsWinner = () => {
    // if the first row of the game is not empty
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      // set the gameWinner to the player who won the game
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    }
    // else if the second row of the game is not empty
    // and the second row is equal to the third row
    // and the second row is equal to the first row 
    else if (

      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    }
    // else if the third row of the game is not empty
    // and the third row is equal to the second row 
    else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    }
    // else if the first column of the game is not empty 
    else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    }
    // else if the second column of the game is not empty 
    else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } 
    // else if the third column of the game is not empty
    else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } 
    // else if the first diagonal of the game is not empty
    
    else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    }
    // else if the second diagonal of the game is not empty
    else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    }
    //else if the game state does not include the value 'empty'
    else if (!gameState.includes('empty', 0)) {
      // set the gameWinner to 'Draw game... ⌛️'
      setGameWinner('Draw game... ⌛️');
    }
  }
  // onChangeItem is a function that is used to change the item of the game
  // itemNumber is a parameter that is used to get the number of the item

  const onChangeItem = (itemNumber: number) => {
    // if the gameWinner is not an empty string
    // return a snackbar with the text 'gameWinner'
    if (gameWinner) {
      // return a snackbar with the text 'gameWinner'
      // and the background color '#000000'
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: "#FFFFFF"
      })
    }
    // if the gameState at the itemNumber is equal to 'empty'
    // set the gameState at the itemNumber to 'cross' or 'circle'
    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross': 'circle'
      setIsCross(!isCross)
    } else {
      // else return a snackbar with the text 'Position is already filled'

      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF",
        duration: Snackbar.LENGTH_SHORT,
      })
    }
    // set the gameState to the new gameState
    
    checkIsWinner()
  }
// return a SafeAreaView with a StatusBar
  return (
    <SafeAreaView >
      <StatusBar />
      
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>

      ) : (
        <View
        style={[
          styles.playerInfo,
          isCross ? styles.playerX : styles.playerO
        ]}
        >
          <Text style={styles.gameTurnTxt}>
            Player {isCross? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item, index}) => (
        <Pressable
        key={index}
        style={styles.card}
        onPress={() => onChangeItem(index)}
        >
          <Icons name={item} />
        </Pressable>
      )}
      />
      {/* game action */}
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Restart the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
//above is the code for the game
//below is the styling for the game
//flatlist is used to display the game grid
//pressable is used to make the game grid clickable
//text is used to display the text
//view is used to display the view
//safeareaview is used to display the safe area view
//scrollview is used to display the scroll view
//statusbar is used to display the status bar
//stylesheet is used to display the style sheet
//logic for pressing the game grid is written in the onChangeItem function
//logic for checking the winner of the game is written in the checkIsWinner function
//logic for reloading the game is written in the reloadGame function
//the game is displayed in the App function
const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
    color: '#FFFFFF',
    borderColor:'#2C3E50',
    
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: '#2C3E50',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    marginVertical: 12,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
