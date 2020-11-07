import {getBoard} from './getBoard.js'
import {checkResult} from './checkResult.js'
import {moveCell} from './moveCell.js'
import {getHeader} from './getHeader.js'
import {getTime} from './getTime.js'
import {getButtons} from './getButtons.js'
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

    getButtons(){
        getButtons(this.buttons)
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
            let time = document.querySelector('#time');
            let timeArr = time.innerHTML.split(':');

            setTimeout(() =>
                alert(`Ура! Вы решили головоломку за ${timeArr[0]}:${timeArr[1]} и ${this._moves} ходов`,), 250,);
        }
    }

    getArrayOfCells() {
        return document.querySelectorAll('.cell')
    }

    addListeners() {
        document.querySelector('#btn-newGame').addEventListener('click', ()=> this.getBoard())

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
    }
}


window.addEventListener('DOMContentLoaded', () => {
    const gemPuzzle = new GemPuzzle();

    gemPuzzle.init();
    gemPuzzle.getBoard()
    gemPuzzle.getButtons()
    gemPuzzle.getHeader()
    gemPuzzle.addListeners()
});
