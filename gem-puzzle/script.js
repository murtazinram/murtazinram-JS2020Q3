import {getBoard} from './getBoard.js'
import {checkResult} from './checkResult.js'
import {moveCell} from './moveCell.js'
import {getHeader} from './getHeader.js'
import {getTime} from './getTime.js'

// import getButtons from './getButtons'
class GemPuzzle {
    constructor() {
        this._moves = 0;
        this._startTime = 0;
        this._time = null;
        this._size = 4;
        this._mixed = false;
        this._save = localStorage.getItem('save');
    }

    getHeader() {
        getHeader(this.header)
    }

    getBoard() {
        return getBoard(this._size, this.board)
    }

    getTime(startTime = this._startTime) {
        getTime(startTime)
    }

    startDuration() {
        this._time = setInterval(this.getTime, 1000, this._startTime);
    }

    clearDuration() {
        clearInterval(this._time);
    }

    getMoves() {
        const moves = document.querySelector('#moves');
        moves.textContent = this._moves.toString().padStart(3, '0');
    }

    checkResult() {
        if (checkResult(this._size, this.getArrayOfCells())) {
            setTimeout(() =>
                alert(`You Win`,), 250,);
        }
    }

    getArrayOfCells() {
        return document.querySelectorAll('.cell')
    }

    addListeners() {
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

        this.wrapper.classList.add('wrapper');
        this.board.classList.add('board');
        this.header.classList.add('header');

        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.board);

        document.body.appendChild(this.wrapper);
    }
}


window.addEventListener('DOMContentLoaded', () => {
    const gemPuzzle = new GemPuzzle();

    gemPuzzle.init();
    gemPuzzle.getBoard()
    gemPuzzle.getHeader()
    gemPuzzle.addListeners()
});
