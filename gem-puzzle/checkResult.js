export function checkResult(size, array) {
    const temp = []
    const items = []
    for (let i = 1; i < Math.pow(size, 2); i++) {
        temp.push(i + '')
    }
    temp.push('')
    for (const item of array) {
        items.push(item.innerText + '')
    }
    return JSON.stringify(temp) === JSON.stringify(items)
}
