const screens = document.querySelectorAll<HTMLDivElement>('.screen')
const choose_insect_btns = document.querySelectorAll<HTMLButtonElement>('.choose-insect-btn')
const start_btn = document.getElementById('start-btn') as HTMLButtonElement
const game_container = document.getElementById('game-container') as HTMLDivElement
const timeEl = document.getElementById('time') as HTMLHeadingElement
const scoreEl = document.getElementById('score') as HTMLHeadingElement
const messageEl = document.getElementById('message') as HTMLHeadingElement

let seconds: number = 0
let score: number = 0
let selected_insect = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector<HTMLButtonElement>('img')
        const src = img?.getAttribute('src')
        const alt = img?.getAttribute('alt')
        selected_insect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m: number = Math.floor(seconds / 60)
    let s: number = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div') as HTMLDivElement
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width: number = window.innerWidth
    const height: number = window.innerHeight
    const x: number = Math.random() * (width - 200) + 100
    const y: number = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchInsect() {
    increaseScore()
    this.classList.add('caugth')
    setTimeout(() => this.remove(), 1000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        messageEl.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}