export function checkResult(size, array){
    let count = 0
    for (const item of array) {
        console.log(item.innerText)
        if (Number(item.innerText) !== count++){
            return false
        }
    }
    return true
}
