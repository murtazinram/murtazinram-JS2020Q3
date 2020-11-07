import {getBoard} from './getBoard.js'
import {checkResult} from './checkResult.js'
import {moveCell} from './moveCell.js'
import {getHeader} from './getHeader.js'
import {getTime} from './getTime.js'
import {getButtons} from './getButtons.js'


export class GemPuzzle {
    constructor(_moves, _startTime, _time, _size) {
        this._moves = _moves
        this._startTime = _startTime
        this._time = _time
        this._size = _size
    }

    getHeader() {
        getHeader(this.header)
    }

    getButtons() {
        getButtons(this.buttons)
    }

    getBoard(size = this._size) {
        return getBoard(size, this.board)
    }

    getTime(startTime = this._startTime) {
        getTime(startTime)
    }

    startDuration() {
        this._time = setInterval(this.getTime, 1000, this._startTime);
    }

    getMoves() {
        const moves = document.querySelector('#moves');
        moves.textContent = this._moves.toString().padStart(3, '0');
    }

    checkResult() {
        if (checkResult(this._size, this.getArrayOfCells())) {
            let time = document.querySelector('#time');
            let timeArr = time.innerHTML.split(':');

            setTimeout(() =>
                alert(`Ура! Вы решили головоломку за ${timeArr[0]}:${timeArr[1]} и ${this._moves} ходов`,), 250,);
        }
    }

    getArrayOfCells() {
        return document.querySelectorAll('.cell')
    }

    saveGame() {
        if (confirm('Save game ?')) {
            const saveObj = new GemPuzzle(this._moves, this._startTime, this._time, this._size)
            let saveBoard = document.querySelector('.board').innerHTML

            localStorage.setItem('saveObj', JSON.stringify(saveObj))
            localStorage.setItem('saveBoard', JSON.stringify(saveBoard))
        }
    }


    loadGame() {
        if (confirm('Load game?')) {
            const loadObj = JSON.parse(localStorage.getItem('saveObj'))
            console.log(loadObj)

            this._moves = loadObj._moves
            this._startTime = loadObj._startTime
            this._time = loadObj._time
            this._size = loadObj._size
            this.getMoves()
            this.board.innerHTML = JSON.parse(localStorage.getItem('saveBoard'))
            this._startTime = Date.now() - this._time * 1000;
            this.startDuration()
        }
    }

    addListeners() {
        document.querySelector('#btn-newGame').addEventListener('click', () => this.getBoard())
        document.querySelector('#btn-save').addEventListener('click', () => this.saveGame())
        document.querySelector('#btn-load').addEventListener('click', () => this.loadGame())

        const listOfSize = document.querySelectorAll(".btn-size");

        for (let i = 0; i < listOfSize.length; i++) {
            console.log(i + 3)
            listOfSize[i].addEventListener("click", () => this.getBoard(i + 3));

        }

        this.board.addEventListener('click', (e) => {
            moveCell(e.target)
            this.checkResult()
            this._moves++
            this.getMoves()
            this._startTime = new Date
            if (this._moves === 1) this.startDuration()
        });
    }

    init() {
        document.body.innerHTML = ''

        this.wrapper = document.createElement('main');
        this.board = document.createElement('div');
        this.header = document.createElement('div');
        this.buttons = document.createElement('div');

        this.wrapper.classList.add('wrapper');
        this.board.classList.add('board');
        this.header.classList.add('header');
        this.buttons.classList.add('buttons')

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.board);
        this.wrapper.appendChild(this.buttons)

        document.body.appendChild(this.wrapper);
        console.log(this.board)
    }
}


window.addEventListener('DOMContentLoaded', () => {
    const gemPuzzle = new GemPuzzle(0, 0, null, 4);

    gemPuzzle.init();
    gemPuzzle.getBoard()
    gemPuzzle.getButtons()
    gemPuzzle.getHeader()
    gemPuzzle.addListeners()
});
