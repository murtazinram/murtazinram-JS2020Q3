export function getBoard(size, board) {
    board.innerHTML = '';
    let count = 0;
    // let arr = []
    let arr =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 12, 13, 14, 11, 15]

    // for (let i = 0; i < 16; i++) {
    //     arr.push(i);
    // }
    // console.log(arr)
    // mixedArray(arr)
    console.log(arr)
    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            const cell = document.createElement('div');
            cell.id = `cell-${i}-${j}`;
            cell.classList.add('cell');

            if (count !== Math.pow(size, 2)) {
                if (arr[count] !== 0) {
                    cell.classList.add('light')
                }
                cell.classList.add('number');
                cell.innerHTML = arr[count]
            }
            if (arr[count] === 0) {
                cell.innerHTML = ''
                cell.classList.add('empty');
            }
            count++
            board.appendChild(cell);
        }
    }
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

function mixedArray(arr) {
    let randIndex;
    for (let i in arr) {
        let x = arr[i];
        randIndex = Math.floor(Math.random() * arr.length);
        arr[i] = arr[randIndex];
        arr[randIndex] = x;
    }
    return arr
}
