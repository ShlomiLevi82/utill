// utillity function

function shuffle() {
  for (let i = 1; i < 66; i++) {
    gNums[i] = i;
  }
  const shuffledArray = gNums.sort((a, b) => 0.5 - Math.random());
  return shuffledArray;
}

function findIndex(array, index) {
  array.findIndex(function (item) {
    return item === index;
  });
}
//----------------------------------------------------------------------
let randomColor = Math.floor(Math.random()*16777215).toString(16);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomInt(min, max) {
 min = Math.ceil(min)
 max = Math.floor(max)
 return Math.floor(Math.random() * (max - min + 1)) + min 
 //The maximum is inclusive and the minimum is inclusive
}
//-------------------------------------------------------------------
function createBoard() {
  let board = [];
  let num = 0;
  gNums = shuffle();
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      board[i][j] = gNums[num++];
    }
  }
  return board;
}

function renderBoard(board) {
  // console.table(board)
  let strHTML = '';

  for (let i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (let j = 0; j < board[0].length; j++) {
      let currCell = board[i][j];

      strHTML += `<td class=""
                            onclick="onCellClicked(${i},${j},this)"
                            data-i="${i}" data-j="${j}">
                                  ${currCell}
                        </td>`;
    }

    strHTML += '</tr>';
  }
  // console.log('strHTML:', strHTML)
  const elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;
}
//------------------------------------------------------------
function countNegs(mat, rowIdx, colIdx) {
 let count = 0
 for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
  if (i < 0 || i > mat.length - 1) continue
  for (let j = colIdx - 1; j <= colIdx + 1; j++) {
   if (j < 0 || j > mat[0].length - 1) continue
   if (i === rowIdx && j === colIdx) continue
   let currCell = mat[i][j]
   if (currCell.content === '$') count++
  }
 }
 return count
}
//-------------------------------------------------------
function renderTimer() {
 let gElTimer = document.querySelector('.timer')

 let stopWatch = +gTimer.toFixed(2)
 gElTimer.innerText = stopWatch
}

function startTimer() {
 gIntervalId = setInterval(() => {
  gTimer += 0.01
  renderTimer()
 }, 10)
}
//--------------------------------------------------------
function findEmptyPos() {
  let emptyPoss = [];
  // let emptyPoss = [{i:0,j:0} , {i:0,j:1}]
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 12; j++) {
      let cell = gBoard[i][j];
      // console.log('cell:', cell)
      if (!cell) {
        let pos = {
          i: i,
          j: j,
        };
        // console.log('pos:', pos)
        emptyPoss.push(pos);
      }
    }
  }
  console.log('emptyPoss:', emptyPoss);
  const randIdx = getRandomInt(0, emptyPoss.length);
  console.log('randIdx:', randIdx);
  const randPos = emptyPoss[randIdx];
  return randPos;
}
//-------------------------------------------
function findBestPos(board) {
  var maxFoodCount = 0;
  var bestPos = null;

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === FOOD) continue;
      var count = countFoodAround(board, i, j);
      if (count > maxFoodCount) {
        maxFoodCount = count;
        bestPos = { i: i, j: j };
      }
    }
  }
  return bestPos;
}
//-------------------------------------------
//sortin Array
Array.sort((p1, p2) => a1.score - a2.score)

Array.sort((p1, p2) => p1.name.localeCompare(p2.name))
//----------------------------------------------------
function hanoi(n, from, to, via) {
  if (n === 0) return
  hanoi(n - 1, from, via, to)
  moveDisk(from, to)
  hanoi(n - 1, via, to, from)
}

function moveDisk(from, to) {
  console.log(`Moving a Disk from: ${from} to ${to}`)
}
//----------------------------------------------------------
function getFibonacciNumMemoization(idx) {
	if (idx === 0 || idx === 1) return 1

	var num1 = fiboMap[idx-1]
	if (!num1) {
		num1 = getFibonacciNumMemoization(idx-1)
		fiboMap[idx-1] = num1
	}
	var num2 = fiboMap[idx-2]
	if (!num2) {
		num2 = getFibonacciNumMemoization(idx-2)
		fiboMap[idx-2] = num2
	}
	const sum = num1 + num2
	fiboMap[idx] = sum
	return sum
}

function factorialRecursion1(n) {
    if (n === 1) return 1
    else return factorialRecursion(n - 1) * n
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.classList.toggle(value);
}
//--------------------------------------------------------------------
//  <label id="minutes">00</label>:<label id="seconds">00</label>

let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString;
  }
}

//--------------------Diagonals-------------------------------

function countInSecondaryDiagonal(board, symbol) {
    var count = 0

    for (var i = 0; i < board.length; i++) {
        var cell = board[i][board.length - 1 - i]
        if (cell === symbol) count++

    }
    return count
}

function countInPrimaryDiagonal(board, symbol) {
    var count = 0

    for (var i = 0; i < board.length; i++) {
        var cell = board[i][i]
        if (cell === symbol) count++

    }
    return count
}

function countInCol(board, colIdx, symbol) {
    var count = 0

    for (var i = 0; i < board.length; i++) {
        var cell = board[i][colIdx]
        if (cell === symbol) count++
    }
    return count
}

function countInRow(board, rowIdx, symbol) {
    var count = 0

    for (var i = 0; i < board[0].length; i++) {
        var cell = board[rowIdx][i]
        if (cell === symbol) count++
    }
    return count
}
//------------------------------------------------------------------
