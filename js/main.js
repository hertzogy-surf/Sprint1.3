console.log('minesweeper')

const IMG_FLAG = `<img src="img/flag.png">`
const IMG_MINE = `<img src="img/mine.jpeg">`

const gLevel = {
    SIZE: 4,
    MINES: 2
}

const gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gInterval = null

var gBoard


function onInit(size) {

    gLevel.SIZE = size ** 0.5
    gGame.isOn = true
    gGame.secsPassed = 0
    if (gInterval) {
        clearInterval(gInterval)
        gInterval = null
    }

    gGame.markedCount = 0
    console.log('hi')
    gBoard = buildBoard(gLevel.SIZE)
    console.log(gBoard)

    var elTdMines = document.querySelector('#mines')
    elTdMines.innerText = gLevel.MINES

    var elTdTimer = document.querySelector('#timer')
    elTdTimer.innerText = 0

    setMinesNegsCount()
    renderBoard()


}

function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i].push(createGameObject())
        }
    }
    board[1][3].isMine = true
    board[2][2].isMine = true



    return board
}

function createGameObject() {
    return { minesAroundCount: 4, isRevealed: false, isMine: false, isMarked: false }
}

function setMinesNegsCount() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            var currCell = gBoard[i][j]
            if (currCell.isMine) continue
            currCell.minesAroundCount = 0

            for (var k = i - 1; k <= i + 1; k++) {
                if (k < 0 || k === gBoard.length) continue
                for (var l = j - 1; l <= j + 1; l++) {
                    if (l < 0 || l === gBoard[0].length) continue
                    if (gBoard[k][l].isMine) currCell.minesAroundCount++


                }
            }

        }
    }

}

function renderBoard() {

    var elBody = document.querySelector('.body')
    var strHtml = ``

    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < gLevel.SIZE; j++) {
            strHtml += `<td class="cell unrevealed" onclick="onCellClicked(this, event, ${i}, ${j})">${gBoard[i][j].minesAroundCount}</td>`
        }
        strHtml += `</tr>`

    }
    elBody.innerHTML = strHtml
    console.log(elBody)

}

function setTimer() {

    gGame.secsPassed++
    console.log(gGame.secsPassed)
    var elTimer = document.querySelector('#timer')
    elTimer.innerText = gGame.secsPassed
}

function onCellClicked(elCell, ev, i, j) {
    if (!gGame.isOn) return

    if (!gInterval) {
        gInterval = setInterval(setTimer, 1000)

    }


    if (ev.ctrlKey) {
        markCell(elCell, i, j)
    }
    else {
        revealCell(elCell, i, j)
    }
}

function markCell(elCell, i, j) {
    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true
        gGame.markedCount++
        elCell.innerHTML = IMG_FLAG
    } else {
        gBoard[i][j].isMarked = false
        gGame.markedCount--
        elCell.innerHTML = ''
    }

    var elMines = document.querySelector('#mines')
    elMines.innerText = gLevel.MINES - gGame.markedCount
}

function revealCell(elCell, i, j) {

    gBoard[i][j].isRevealed = true
    gGame.revealedCount++
    elCell.classList.remove('unrevealed')
    if (gBoard[i][j].minesAroundCount !== 0) {

        elCell.classList.add('revealed')
    }
    else {
        elCell.classList.add('revealed-zero')
    }
    if (gBoard[i][j].isMine) {
        elCell.innerHTML = IMG_MINE
        clearInterval(gInterval)
        gInterval = null
        gGame.isOn = false
    }


}

function checkGameOver() {

}

function expandReveal(elCell, i, j) {

}