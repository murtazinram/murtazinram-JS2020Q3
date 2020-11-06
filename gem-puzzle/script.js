import {getBoard} from './getBoard.js'
import {checkResult} from './checkResult.js'
import {moveCell} from './moveCell.js'

// import getButtons from './getButtons'
class GemPuzzle {
    constructor() {
        this._moves = 0;
        this._time = 0;
        this._size = 4;
        this._mixed = false;
        this._save = localStorage.getItem('save');
    }

    getHeader(){

    }


    getBoard() {
        return getBoard(this._size, this.board)
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
        });
    }

    init() {
        document.body.innerHTML = ''

        this.wrapper = document.createElement('main');
        this.board = document.createElement('div');

        this.wrapper.classList.add('wrapper');
        this.board.classList.add('board');

        this.wrapper.appendChild(this.board);

        document.body.appendChild(this.wrapper);

    }
}


window.addEventListener('DOMContentLoaded', () => {
    const gemPuzzle = new GemPuzzle();

    gemPuzzle.init();
    gemPuzzle.getBoard()
    gemPuzzle.addListeners()

});
