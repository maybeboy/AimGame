const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let score = 0
const colors = ['red','green','purple','yellow','blue','orange','pink','grey','red','green','purple','yellow','blue','orange','pink','grey']


startBtn.addEventListener('click', (event) =>{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) =>{
    if (event.target.classList.contains('time-btn')){
    time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event=>{
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
        removeColor(event.target)
    }
})
    //debug
   // startGame()
    //
function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}
function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет<span class="primary">: ${score}</span></h1>`
}

function decreaseTime(){
    if (time === 0){
    finishGame()
    }else{
        let current = --time
        if (current<10){
            current = `0${current}`
        }
        setTime(current)
    }

}
function setTime(value){
    timeEl.innerHTML = `00:${value}`
}
function setColor(element){
    const color = getColors()
    element.style.color = color
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 8px ${color}`
}
function removeColor(element){
    element.style.backgroundColor = 'linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)'
    element.style.boxShadow = `0 0 2px #000`
}

function getColors(){
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10,60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width =  `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setColor(circle)
    board.append(circle)
}

function getRandomNumber(min,max){
    return Math.round(Math.random()*(max-min) +min)
}