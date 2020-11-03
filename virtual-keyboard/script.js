// https://github.com/rolling-scopes-school/tasks/blob/master/tasks/ready-projects/virtual-keyboard.md

const Keyboard = {
    keyLayoutEng: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
        "shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "voice", "lang", "space", "<", ">"
    ],
    keyShiftEng: [
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
        "caps", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
        "shift", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter",
        "done", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "/",
        "voice", "lang", "space", "<", ">"
    ],
    keyLayoutRus: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "caps", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        "shift", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter",
        "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
        "voice", "lang", "space", "<", ">"
    ],
    keyShiftRus: [
        "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
        "caps", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
        "shift", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter",
        "done", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "\,",
        "voice", "lang", "space", "<", ">"
    ],

    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        isEnglish: true,
        currentCursor: 0,
    },
    insertLineBreakEng: ["backspace", "]", "Enter", "?"],
    insertLineBreakEngShift: ["backspace", "}", "Enter", "/"],
    insertLineBreakRus: ["backspace", "Ъ", "Enter", "."],
    insertLineBreakRusShift: ["backspace", "Ъ", "Enter", ","],

    init: function () {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
            element.addEventListener("click", () => {
                element.selectionStart = this.properties.currentCursor;
                element.selectionEnd = this.properties.currentCursor;
            });
        });
    },

    _createKeys: function () {
        const fragment = document.createDocumentFragment();
        let keyLayout = this.keyLayoutEng
        let insertLineBreakLayout = this.insertLineBreakEng

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = insertLineBreakLayout.indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key", 'key');

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable")
                    keyElement.textContent = 'Shift'

                    keyElement.addEventListener('click', () => {
                        this._toggleShift()
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift)
                    });
                    break

                case "Enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = setTextToTextArea(this.properties.value,
                            this.properties.currentCursor, 0, '\n');
                        this.properties.currentCursor += 1;
                        this._triggerEvent("oninput");
                        let element = document.querySelector("#textArea");
                        element.selectionStart = this.properties.currentCursor;
                        element.selectionEnd = this.properties.currentCursor;
                        element.focus();
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = setTextToTextArea(this.properties.value,
                            this.properties.currentCursor, 0, ' ');
                        this.properties.currentCursor += 1;
                        this._triggerEvent("oninput");
                        let element = document.querySelector("#textArea");
                        element.selectionStart = this.properties.currentCursor;
                        element.selectionEnd = this.properties.currentCursor;
                        element.focus();
                    });
                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case 'voice':
                    // todo
                    break

                case 'lang':
                    keyElement.textContent = this.properties.isEnglish ? 'en' : 'rus';

                    keyElement.addEventListener('click', () => {
                        this.properties.isEnglish = !this.properties.isEnglish
                        this._toggleLanguage()
                    })
                    break

                case '<':
                    keyElement.textContent = key;
                    keyElement.id = "<";
                    keyElement.addEventListener("click", () => {
                        this.setCaretPosition("textArea", -1);
                    });
                    break

                case '>':
                    keyElement.textContent = key;
                    keyElement.id = ">";
                    keyElement.addEventListener("click", () => {
                        this.setCaretPosition("textArea", 1);
                    });
                    break

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value = setTextToTextArea(this.properties.value,
                            this.properties.currentCursor, 0, keyElement.textContent);
                        this.properties.currentCursor += 1;
                        this._triggerEvent("oninput");
                        let element = document.querySelector("#textArea");
                        element.selectionStart = this.properties.currentCursor;
                        element.selectionEnd = this.properties.currentCursor;
                        element.focus();
                    });
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this._changeButtons()
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift
        this._changeButtons()
    },

    _toggleLanguage() {
        this._changeButtons()
    },

    _changeButtons() {
        const arr = [
            "backspace",
            "caps",
            "shift",
            "Enter",
            "done",
            "voice",
            "lang",
            "space",
            "<",
            ">"
        ]
        let keyLayout = this.keyLayoutEng;
        if (this.properties.shift && this.properties.isEnglish) {
            keyLayout = this.keyShiftEng;
        } else if (this.properties.shift && !this.properties.isEnglish) {
            keyLayout = this.keyShiftRus;
        } else if (!this.properties.shift && !this.properties.isEnglish) {
            keyLayout = this.keyLayoutRus;
        }
        let i = 0
        for (const key of this.elements.keys) {
            if (arr.indexOf(keyLayout[i]) === -1) {
                key.textContent = keyLayout[i]
                if (this.properties.capsLock) {
                    key.textContent = key.textContent.toUpperCase();
                }
            }
            if (keyLayout[i] === "lang") {
                key.textContent = this.properties.isEnglish ? "en" : "rus";
            }
            i++
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    },

    setCaretPosition(elemId, caretPos) {
        let element = document.getElementById(elemId);
        element.focus();
        let position = element.selectionStart;

        element.selectionStart = position + caretPos;
        element.selectionEnd = position + caretPos;
        this.properties.currentCursor = position + caretPos;

    }
};


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

function setTextToTextArea(value, start, delCount, newSubStr) {
    return value.slice(0, start) + newSubStr + value.slice(start + Math.abs(delCount));
}

addEventListener("keydown", (elem) => {
    for (const key of Keyboard.elements.keys) {
        if (elem.key === key.textContent) {
            key.classList.add("keyboard__key--lighting")
        }
        if (elem.key === 'Enter') {
            if (key.textContent === 'keyboard_return') {
                key.classList.add("keyboard__key--lighting")
            }
        }
        if (elem.key === 'Shift') {
            if (key.textContent === 'Shift') {
                Keyboard._toggleShift()
                key.classList.add("keyboard__key--lighting")
            }
        }
        if (elem.key === 'CapsLock') {
            if (key.textContent === 'keyboard_capslock') {
                Keyboard._toggleCapsLock()
                key.classList.toggle("keyboard__key--lighting", Keyboard.properties.capsLock)
            }
        }
        if (elem.key === 'Backspace') {
            if (key.textContent === 'backspace') {
                key.classList.add("keyboard__key--lighting")
            }
        }
        if (elem.key === ' ') {
            if (key.textContent === 'space_bar') {
                key.classList.add("keyboard__key--lighting")
            }
        }
        if (elem.keyCode === 37) {  //<
            if (key.textContent === '<') {
                key.classList.add("keyboard__key--lighting")
            }
        }
        if (elem.keyCode === 39) {  //>
            if (key.textContent === '>') {
                key.classList.add("keyboard__key--lighting")
            }
        }
    }

});
addEventListener("keyup", (elem) => {
    for (const key of Keyboard.elements.keys) {
        if (elem.key === key.textContent && elem.key !== 'Shift') {
            key.classList.remove("keyboard__key--lighting")
        }
        if (elem.key === 'Enter') {
            if (key.textContent === 'keyboard_return') {
                key.classList.remove("keyboard__key--lighting")
            }
        }
        if (elem.key === 'Backspace') {
            if (key.textContent === 'backspace') {
                key.classList.remove("keyboard__key--lighting")
            }
        }
        if (elem.key === ' ') {
            if (key.textContent === 'space_bar') {
                key.classList.remove("keyboard__key--lighting")
            }
        }
        if (elem.keyCode === 37) {  //<
            if (key.textContent === '<') {
                key.classList.remove("keyboard__key--lighting")
            }
        }
        if (elem.keyCode === 39) {  //>
            if (key.textContent === '>') {
                key.classList.remove("keyboard__key--lighting")
            }
        }
        if (elem.key === 'Shift') {
            if (key.textContent === 'Shift') {
                Keyboard._toggleShift();
                key.classList.remove("keyboard__key--lighting")
            }
        }
    }
});

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.shiftKey && e.altKey) {
        Keyboard.properties.isEnglish = !Keyboard.properties.isEnglish
        Keyboard._toggleLanguage()
    }
    return true;
}
