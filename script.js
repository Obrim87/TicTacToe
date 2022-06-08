const entireGame = (() => {

  let player = (name, symbol, turn) => {
    return {
      name,
      symbol,
      turn
    };
  }

  let winner = null;

  let count = 0;

  // const gameOver = (x) => {
  //   if (x) {
  //     console.log('in function true')
  //     return true;
  //   } else if (!x) {
  //     console.log('in function false')
  //     return false;
  //   }
  // }

  // const displayController = (p1Name, p2Name) => {
  //   const playerX = player(p1Name, 'X', true);
  //   const playerO = player(p2Name, 'O', false);
  //   let currentPlayer = playerX;
  //   let playerOneDisplay = document.querySelector('.playerOneDisplay');
  //   let playerTwoDisplay = document.querySelector('.playerTwoDisplay');

  //   playerOneDisplay.textContent = playerX.name;
  //   playerTwoDisplay.textContent = playerO.name;
    
  //   gameBoard.board.addEventListener('click', (e) => {
  //     let positionName = e.path[0].className;
  //     let position = document.querySelector('.' + positionName);
  //     let positionNum = e.target.attributes["data-position"].nodeValue;
  //     console.log('in event ' + gameOver())
  //     if (gameBoard.gridArea[positionNum] === '' && gameOver() == false) {
  //       gameBoard.gridArea.splice(positionNum, 1, currentPlayer.symbol);
  //       position.textContent = currentPlayer.symbol;
  //       game(currentPlayer);
  //       if (currentPlayer.symbol == 'X')  {
  //         currentPlayer = playerO;
  //       } else {
  //         currentPlayer = playerX;
  //       }
  //     };
  //   })
  // };

  const displayController = (p1Name, p2Name) => {
    const playerX = player(p1Name, 'X', true);
    const playerO = player(p2Name, 'O', false);
    let playerOneDisplay = document.querySelector('.playerOneDisplay');
    let playerTwoDisplay = document.querySelector('.playerTwoDisplay');

    playerOneDisplay.textContent = playerX.name;
    playerTwoDisplay.textContent = playerO.name;
    
    gameBoard.board.addEventListener('click', (e) => {
      count++
      if (count >= 9 && winner == null) {
        if (playerX.turn) {
          e.target.textContent = playerX.symbol;
        } else if (playerO.turn) {
          e.target.textContent = playerO.symbol;
        };
        tieDisplay(true);
        winner = true;
      } else if (playerX.turn && e.target.textContent === '' && winner == null) {
        gameBoard.gridArea.splice(e.target.attributes["data-position"].nodeValue, 1, playerX.symbol);
        e.target.textContent = playerX.symbol;
        game(playerX);
        playerX.turn = false;
        playerO.turn = true;
      } else if (playerO.turn && e.target.textContent === '' && winner == null) {
        gameBoard.gridArea.splice(e.target.attributes["data-position"].nodeValue, 1, playerO.symbol);
        e.target.textContent = playerO.symbol;
        game(playerO);
        playerO.turn = false;
        playerX.turn = true;
      } 
    })
  };

  const winnerDisplay = (toggle) => {
    const winnerDisplay = document.querySelector('.winnerDisplay');
    if (toggle) {
      winnerDisplay.style.display = 'block';
    } else if (!toggle) {
      winnerDisplay.style.display = 'none';
    }
  }

  const tieDisplay = (toggle) => {
    const tieDisplay = document.querySelector('.tieDisplay');
    if (toggle) {
      tieDisplay.style.display = 'block';
    } else if (!toggle) {
      tieDisplay.style.display = 'none';
    }
  }

  const nameModal = () => {
    const modal = document.querySelector('.modal');
    const submitNames = document.querySelector('#submitNames');
    const p1 = document.querySelector('#playerOne');
    const p2 = document.querySelector('#playerTwo');

    modal.style.display = 'block';

    submitNames.addEventListener('click', () => {
      modal.style.display = 'none';
      displayController(p1.value, p2.value);
    });

    document.addEventListener('keypress', (e) => {
      if (e.key == 'Enter') {
        modal.style.display = 'none';
        displayController(p1.value, p2.value);
      }
    });
  };

  const game = (currentPlayer) => {
    let winnerName = document.querySelector('.winnerName');
    if ([0,3,6].map(i => gameBoard.gridArea[i]).join('') === 'XXX' ||
        [0,3,6].map(i => gameBoard.gridArea[i]).join('') === 'OOO' ||
        [1,4,7].map(i => gameBoard.gridArea[i]).join('') === 'XXX' ||
        [1,4,7].map(i => gameBoard.gridArea[i]).join('') === 'OOO' ||
        [2,5,8].map(i => gameBoard.gridArea[i]).join('') === 'XXX' ||
        [2,5,8].map(i => gameBoard.gridArea[i]).join('') === 'OOO' ||
        [0,1,2].map(i => gameBoard.gridArea[i]).join('') === 'XXX' ||
        [0,1,2].map(i => gameBoard.gridArea[i]).join('') === 'OOO' ||
        [3,4,5].map(i => gameBoard.gridArea[i]).join('') === 'XXX' ||
        [3,4,5].map(i => gameBoard.gridArea[i]).join('') === 'OOO' ||
        [6,7,8].map(i => gameBoard.gridArea[i]).join('') === 'XXX' ||
        [6,7,8].map(i => gameBoard.gridArea[i]).join('') === 'OOO' ||
        [0,4,8].map(i => gameBoard.gridArea[i]).join('') === 'XXX' ||
        [0,4,8].map(i => gameBoard.gridArea[i]).join('') === 'OOO' ||
        [2,4,6].map(i => gameBoard.gridArea[i]).join('') === 'XXX' ||
        [2,4,6].map(i => gameBoard.gridArea[i]).join('') === 'OOO' ) {
      winnerDisplay(true);
      winnerName.textContent = currentPlayer.name;
      winner = true;
    }
  };

  const reset = () => {
    let boardChildren = gameBoard.board.children;
    gameBoard.gridArea = Array(9).fill('');
    for (let i = 0; i < boardChildren.length; i++) {
      boardChildren[i].textContent = '';
    }
    winnerDisplay(false);
    tieDisplay(false);
    winner = null;
    count = 0;
  }

  const gameBoard = (() => {
    let gridArea = Array(9).fill('');
    const board = document.querySelector('.board');
    const resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', () => reset());
    nameModal();
    return {
      gridArea,
      board
    }
    })();

})();