let current = 1

const getGameBoard = () => {
  let topBoard = [...document.getElementsByClassName('top')]
  let midBoard = [...document.getElementsByClassName('mid')]
  let bottomBoard = [...document.getElementsByClassName('bottom')]
  let gameBoard = {
    top: [],
    mid: [],
    bottom: []
  }

  topBoard.forEach((item, i) => {
    gameBoard.top.push(item.textContent)
  });

  midBoard.forEach((item, i) => {
    gameBoard.mid.push(item.textContent)
  });

  bottomBoard.forEach((item, i) => {
    gameBoard.bottom.push(item.textContent)
  });

  return gameBoard;
}

console.log(getGameBoard())

let cells = [...document.getElementsByClassName('cell')]

cells.forEach((cell, i) => {
  cell.onclick = (e) => {
    if (!e.target.textContent) {
      if (current % 2 === 0) {
        e.target.textContent = "0"
        e.target.style.color = "green"
        e.target.style.fontSize = "3em"
      } else {
        e.target.textContent = "X"
        e.target.style.color = "red"
        e.target.style.fontSize = "3em"
      }


      if (isFinished() && !winer()) {
      	alert("Match is draw!")
        reset()
      }

      if (winer()) {
        setTimeout(() => {
          alert(`Player ${winer()} has won the game`)
          reset()
          current = 1
        }, 300)
      } else {
        current += 1
      }
    }
  }
});

const won = (player) => {
  const board = getGameBoard()

  for (let key in board) {
    let flag = true
    for (let i = 0; i < board[key].length; i++) {
      if (board[key][i] !== player) {
        flag = false
      }
    }

    if (flag) {
      return true
    }
  }

  for (let i = 0; i < board['top'].length; i++) {
    if (board.top[i] === player && board.mid[i] === player && board.bottom[i] === player) {
      return true
    }
  }

  if (board.top[0] === player && board.mid[1] === player && board.bottom[2] === player) {
    return true
  } else if (board.bottom[0] === player && board.mid[1] === player && board.top[2] === player) {
    return true
  }

  return false
}

const winer = () => {
  if (won('X')) {
    return "X"
  } else if (won('0')) {
    return "0"
  } else {
    return null
  }
}


const reset = () => {
  let cells = [...document.getElementsByClassName('cell')]

  cells.forEach((item, i) => {
    item.innerText = ''
  })
}

const gameBoardArray = () => {
	let board = getGameBoard()
	let boardArray = []

	for (let key in board) {
		boardArray.push(board[key])
	}

	return boardArray
}

const isFinished = () => {
	let board = gameBoardArray()
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '') {
        return false
      }
    }
	}

	return true
}
