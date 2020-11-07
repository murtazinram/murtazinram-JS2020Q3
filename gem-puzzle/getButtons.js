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
}
