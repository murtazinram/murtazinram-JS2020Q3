export function getHeader(header) {
    header.innerHTML = '';

    const movesLabel = document.createElement('span');
    movesLabel.textContent = 'Moves: ';
    header.appendChild(movesLabel);

    const movesCount = document.createElement('span');
    movesCount.id = 'moves';
    movesCount.textContent = '000';
    header.appendChild(movesCount);

    const timeLabel = document.createElement('span');
    timeLabel.textContent = 'Time: ';
    header.appendChild(timeLabel);

    const timeCount = document.createElement('span');
    timeCount.id = 'time';
    timeCount.textContent = '00:00';
    header.appendChild(timeCount);
}
