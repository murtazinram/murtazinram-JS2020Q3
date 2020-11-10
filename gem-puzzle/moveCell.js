
export function moveCell(target) {
    // console.log('click=' + target.innerHTML)
    let targetPos = target.id.split('-');
    let targetPosI = Number(targetPos[1]);
    let targetPosJ = Number(targetPos[2]);

    console.log('clickPosition=' + targetPos)
    let empty = document.querySelector('.empty');
    let emptyPosition = empty.id.split('-');
    let i = Number(emptyPosition[1]);
    let j = Number(emptyPosition[2]);

    console.log('emptyPosition=' + emptyPosition)

    if (targetPosI === i || targetPosJ === j) {
        if (targetPosI === i + 1 || targetPosI === i - 1
            || targetPosJ === j + 1 || targetPosJ === j - 1) {
            empty.id = `cell-${emptyPosition[1]}-${emptyPosition[2]}`
            empty.classList.remove('empty')
            empty.classList.remove('number')
            empty.classList.add('light')
            empty.classList.add('number')
            empty.innerHTML = `${target.innerHTML}`

            target.id = `cell-${targetPosI}-${targetPosJ}`
            target.classList.remove('light')
            target.classList.add('empty')
            target.innerHTML = ''
            return true
        }
    }
}
