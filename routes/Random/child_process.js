
process.on('message', data => {
    let res = foo(Number(data))
    process.send(res)
})


const foo = (num) => {
    let arr = []
    let repetidos = {}
    for (let i = 1; i <= num; i++) {
        let random = Math.floor(Math.random() * (num - 1) + 1)
        arr.push(random)
    }
    arr.forEach(ele => {
        repetidos[ele] = (repetidos[ele] || 0) + 1;
    })
    return repetidos;
}