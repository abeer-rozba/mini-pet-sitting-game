// variables
const startButton = document.querySelector('#start-game')
const header = document.querySelector('#title')
const statusContainer = document.querySelector('.status-container')
const statusBars = document.querySelectorAll('.status-bar')
const buttons = document.querySelector('.buttons')
const body = document.querySelector('body')
const dialogue = document.querySelector('#dialogue')

// regular buttons + timer
let feedButton,
  walkButton,
  playButton,
  sleepButton,
  rewardButton,
  petButton,
  timer

// random events buttons
let treatButton1, treatButton2, treatButton3, reactionsDiv

const healthyFood = [
  'chicken',
  'bread',
  'broccoli',
  'carrot',
  'egg',
  'peanut butter'
]

const unhealthyFood = [
  'onion',
  'whole apple',
  'garlic',
  'grapes',
  'milk',
  'coffee'
]

const chocolate = [
  "Connor just ate 6 ounces of Peanut M&Ms. He seems a bit restless, you're worried that he's poisoned. What do you do?",
  "Connor just ate one Hershey's milk chocolate bar. He seems fine but you're still worried he's poisoned. What do you do?"
]

const sickPet = () => {
  dialogue.textContent =
    'You noticed Connor is lethargic, refuses to eat, and is breathing with difficulty. He appears to be sick. What do you do? '

  reactionsDiv = document.createElement('div')
  reactionsDiv.style.height = '200px'
  reactionsDiv.style.display = 'flex'
  reactionsDiv.style.flexDirection = 'column'
  reactionsDiv.style.justifyContent = 'space-evenly'
  dialogue.appendChild(reactionsDiv)

  treatButton1 = document.createElement('button')
  treatButton1.setAttribute('id', 'home-remedy')
  treatButton1.setAttribute('class', 'clickable reactions')
  treatButton1.textContent = 'Home remedies are the solution'
  reactionsDiv.appendChild(treatButton1)

  treatButton2 = document.createElement('button')
  treatButton2.setAttribute('id', 'vet')
  treatButton2.setAttribute('class', 'clickable reactions')
  treatButton2.textContent = 'Take him to the vet'
  reactionsDiv.appendChild(treatButton2)

  treatButton3 = document.createElement('button')
  treatButton3.setAttribute('id', 'hope')
  treatButton3.setAttribute('class', 'clickable reactions')
  treatButton3.textContent = 'Do nothing and hope for the best'
  reactionsDiv.appendChild(treatButton3)
}

const ateChocolate = () => {
  let index = Math.floor(Math.random() * chocolate.length)
  dialogue.textContent = chocolate[index]
}

const escaped = () => {
  dialogue.textContent =
    'Oh no! Connor is nowhere to be found, he must have escaped while you were playing Minecraft! What do you do?'
}

const ruinedCouch = () => {
  dialogue.textContent =
    'You walk into the living room and find your expensive couch torn apart... Connor destroyed it.. What do you do?'
}

const events = [sickPet, ateChocolate, escaped, ruinedCouch] // https://stackoverflow.com/questions/3592468/can-i-store-javascript-functions-in-arrays, https://www.geeksforgeeks.org/javascript/array-of-functions-in-javascript/

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
  sue() {
    console.log("I'll sue you")
  }
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
  randomEvent()
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

const randomEvent = () => {
  // let index = Math.floor(Math.random() * events.length)
  // events[index]()
  events[0]()
}

// event listeners
startButton.addEventListener('click', startGame)
