// variables
const startButton = document.querySelector('#start-game')
const header = document.querySelector('#title')
const statusContainer = document.querySelector('.status-container')
const statusBars = document.querySelectorAll('.status-bar')
const buttons = document.querySelector('.buttons')
const body = document.querySelector('body')

let feedButton,
  walkButton,
  playButton,
  sleepButton,
  rewardButton,
  petButton,
  timer

// classes and objects
class Dog {
  constructor() {
    this.name = 'Connor'
    this.health = 50
    this.hunger = 50
    this.happiness = 50
    this.energy = 50
    this.isSick = false
    this.ranAway = false
    this.poisoned = false
    this.destructive = false
  }
  feed() {}
  play() {}
  sleep() {}
  pet() {}
  walk() {}
  reward() {}
  treat() {}
  checkStatus() {}
}

class Owner {
  constructor() {
    this.payable = 100
    this.tipAmount = 0
  }
  pickUp() {
    console.log('works')
  }
  slap() {}
  tip() {}
  sue() {}
}

class Sitter {
  constructor() {
    this.bankAccount = 300
  }
  forgive() {}
  sue() {}
  chase() {}
  whistle() {}
}

// main function
const startGame = () => {
  console.log('game started')
  startingSettings()
  decreaseStatus()
  createButtons()
  countdown()
}

// functions definitions
const startingSettings = () => {
  header.style.marginBottom = '0px'
  header.style.visibility = 'hidden'
  startButton.style.visibility = 'hidden'
  statusContainer.style.marginTop = '34px'
  statusContainer.style.visibility = 'visible'
  timer = document.createElement('h1')
  timer.setAttribute('class', 'headers')
  body.appendChild(timer)
  timer.style.position = 'absolute'
  timer.style.top = '40%'
  timer.style.left = '3%'
  timer.textContent = "Let's Play!"
}

const decreaseStatus = () => {
  let statusBars = document.querySelectorAll('.status-bar')
  statusBars.forEach((bar) => {
    let width = 150
    let duration = 10000 // make it 150000
    let interval = 10
    let decreaseAmount = width / (duration / interval)

    let timer = setInterval(() => {
      if (width <= 120) {
        bar.style.backgroundColor = 'rgb(145, 190, 23)'
      }
      if (width <= 90) {
        bar.style.backgroundColor = 'rgb(215, 195, 45)'
      }
      if (width <= 30) {
        bar.style.backgroundColor = 'rgb(215, 127, 45)'
      }
      if (width <= 10) {
        bar.style.backgroundColor = 'rgb(238, 33, 33)'
      }

      if (width <= 0) {
        clearInterval(timer)
      } else {
        width -= decreaseAmount
        bar.style.width = width + 'px'
      }
    }, interval)

    setTimeout(() => clearInterval(timer), duration)
  })
}

const createButtons = () => {
  feedButton = document.createElement('button')
  feedButton.setAttribute('id', 'feed')
  feedButton.setAttribute('class', 'clickable')
  feedButton.textContent = 'Feed'
  buttons.appendChild(feedButton)

  walkButton = document.createElement('button')
  walkButton.setAttribute('id', 'walk')
  walkButton.setAttribute('class', 'clickable')
  walkButton.textContent = 'Walk'
  buttons.appendChild(walkButton)

  playButton = document.createElement('button')
  playButton.setAttribute('id', 'play')
  playButton.setAttribute('class', 'clickable')
  playButton.textContent = 'Play'
  buttons.appendChild(playButton)

  sleepButton = document.createElement('button')
  sleepButton.setAttribute('id', 'sleep')
  sleepButton.setAttribute('class', 'clickable')
  sleepButton.textContent = 'Sleep'
  buttons.appendChild(sleepButton)

  rewardButton = document.createElement('button')
  rewardButton.setAttribute('id', 'reward')
  rewardButton.setAttribute('class', 'clickable')
  rewardButton.textContent = 'Reward'
  buttons.appendChild(rewardButton)

  petButton = document.createElement('button')
  petButton.setAttribute('id', 'pet')
  petButton.setAttribute('class', 'clickable')
  petButton.textContent = 'Pet'
  buttons.appendChild(petButton)
}

const countdown = () => {
  // https://community.testmuai.com/t/how-can-i-create-a-simple-javascript-countdown-timer/31822/2
  let time = 120 // make it 300 for 5 mins

  const clock = setInterval(() => {
    if (time <= 0) {
      clearInterval(clock)
    }

    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    timer.style.left = '7%'
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

    time--
  }, 1000)
}

// event listeners
startButton.addEventListener('click', startGame)
