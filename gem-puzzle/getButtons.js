export function getButtons(buttons) {
    buttons.innerHTML = ''

    const btnNewGame = document.createElement('button')
    btnNewGame.textContent = 'New game'
    btnNewGame.id = 'btn-newGame'
    btnNewGame.classList.add('btn', 'btn')
    buttons.appendChild(btnNewGame)

    const btnSave = document.createElement('button')
    btnSave.textContent = 'Save'
    btnSave.id = 'btn-save'
    btnSave.classList.add('btn', 'btn')
    buttons.appendChild(btnSave)

    const btnLoad = document.createElement('button')
    btnLoad.textContent = 'Load'
    btnLoad.id = 'btn-load'
    btnLoad.classList.add('btn', 'btn')
    buttons.appendChild(btnLoad)

    for (let i = 3; i < 9; i++) {
        const btn = document.createElement('button');
        btn.id = i.toString();
        btn.classList.add('btn', 'btn-size');
        btn.textContent = `${i}x${i}`;
        buttons.appendChild(btn);
    }
}
