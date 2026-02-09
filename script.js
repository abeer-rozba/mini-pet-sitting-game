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
let treatButton1, treatButton2, treatButton3, reactionsDiv, chocolateType

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
  treatButton1.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton1)
  })

  treatButton2 = document.createElement('button')
  treatButton2.setAttribute('id', 'vet')
  treatButton2.setAttribute('class', 'clickable reactions')
  treatButton2.textContent = 'Take him to the vet'
  reactionsDiv.appendChild(treatButton2)
  treatButton2.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton2)
  })

  treatButton3 = document.createElement('button')
  treatButton3.setAttribute('id', 'hope')
  treatButton3.setAttribute('class', 'clickable reactions')
  treatButton3.textContent = 'Do nothing and hope for the best'
  reactionsDiv.appendChild(treatButton3)
  treatButton3.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton3)
  })
}

const ateChocolate = () => {
  let index = Math.floor(Math.random() * chocolate.length)
  dialogue.textContent = chocolate[index]
  chocolateType = index

  reactionsDiv = document.createElement('div')
  reactionsDiv.style.height = '200px'
  reactionsDiv.style.display = 'flex'
  reactionsDiv.style.flexDirection = 'column'
  reactionsDiv.style.justifyContent = 'space-evenly'
  dialogue.appendChild(reactionsDiv)

  treatButton1 = document.createElement('button')
  treatButton1.setAttribute('id', 'poison-control')
  treatButton1.setAttribute('class', 'clickable reactions')
  treatButton1.textContent = 'Call animal poison control center'
  reactionsDiv.appendChild(treatButton1)
  treatButton1.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton1)
  })

  treatButton2 = document.createElement('button')
  treatButton2.setAttribute('id', 'hydrogen-peroxide')
  treatButton2.setAttribute('class', 'clickable reactions')
  treatButton2.textContent = 'Induce vomiting with hydrogen peroxide'
  reactionsDiv.appendChild(treatButton2)
  treatButton2.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton2)
  })

  treatButton3 = document.createElement('button')
  treatButton3.setAttribute('id', 'do-nothing')
  treatButton3.setAttribute('class', 'clickable reactions')
  treatButton3.textContent = "It's just chocolate, he'll be fine"
  reactionsDiv.appendChild(treatButton3)
  treatButton3.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton3)
  })
}

const escaped = () => {
  dialogue.textContent =
    'Oh no! Connor is nowhere to be found, he must have escaped while you were playing Minecraft! What do you do?'

  reactionsDiv = document.createElement('div')
  reactionsDiv.style.height = '200px'
  reactionsDiv.style.display = 'flex'
  reactionsDiv.style.flexDirection = 'column'
  reactionsDiv.style.justifyContent = 'space-evenly'
  dialogue.appendChild(reactionsDiv)

  treatButton1 = document.createElement('button')
  treatButton1.setAttribute('id', 'chase')
  treatButton1.setAttribute('class', 'clickable reactions')
  treatButton1.textContent = 'Chase Connor!'
  reactionsDiv.appendChild(treatButton1)
  treatButton1.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton1)
  })

  treatButton2 = document.createElement('button')
  treatButton2.setAttribute('id', 'posters')
  treatButton2.setAttribute('class', 'clickable reactions')
  treatButton2.textContent = 'Put up missing posters'
  reactionsDiv.appendChild(treatButton2)
  treatButton2.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton2)
  })

  treatButton3 = document.createElement('button')
  treatButton3.setAttribute('id', 'lure')
  treatButton3.setAttribute('class', 'clickable reactions')
  treatButton3.textContent = 'Lure him with a treat'
  reactionsDiv.appendChild(treatButton3)
  treatButton3.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton3)
  })
}

const ruinedCouch = () => {
  dialogue.textContent =
    'You walk into the living room and find your expensive couch torn apart... Connor destroyed it.. What do you do?'

  reactionsDiv = document.createElement('div')
  reactionsDiv.style.height = '200px'
  reactionsDiv.style.display = 'flex'
  reactionsDiv.style.flexDirection = 'column'
  reactionsDiv.style.justifyContent = 'space-evenly'
  dialogue.appendChild(reactionsDiv)

  treatButton1 = document.createElement('button')
  treatButton1.setAttribute('id', 'yell')
  treatButton1.setAttribute('class', 'clickable reactions')
  treatButton1.textContent = 'Yell at Connor: "Bad dog!"'
  reactionsDiv.appendChild(treatButton1)
  treatButton1.addEventListener('click', () => {
    reactionsDiv.remove()
    randomEvent()
  })

  treatButton2 = document.createElement('button')
  treatButton2.setAttribute('id', 'give-treat')
  treatButton2.setAttribute('class', 'clickable reactions')
  treatButton2.textContent = 'A treat will distract him from the couch'
  reactionsDiv.appendChild(treatButton2)
  treatButton2.addEventListener('click', () => {
    reactionsDiv.remove()
    randomEvent()
  })

  treatButton3 = document.createElement('button')
  treatButton3.setAttribute('id', 'take-walk')
  treatButton3.setAttribute('class', 'clickable reactions')
  treatButton3.textContent = 'Walk him to drain excess energy'
  reactionsDiv.appendChild(treatButton3)
  treatButton3.addEventListener('click', () => {
    reactionsDiv.remove()
    randomEvent()
  })
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
  sue() {}
  chase() {}
  whistle() {}
}

// main function
const startGame = () => {
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
  events[2]()
}

const outcomes = (reaction) => {
  if (reaction.id === 'home-remedy') {
    dialogue.textContent =
      "You gave Connor a boiled chicken with plain rice. He barely touched it, he's still sick."
  } else if (reaction.id === 'vet') {
    dialogue.textContent =
      "You spent $230 on Connor's vet visit. He received proper treatment and he feels better now."
  } else if (reaction.id === 'hope') {
    dialogue.textContent =
      "Connor's condition is getting worse and worse. How heartless can you be?"
  }

  if (reaction.id === 'poison-control') {
    if (chocolateType == 0) {
      dialogue.textContent =
        'You called the ASPCA and they handled the incident well. Good thinking. '
    } else if (chocolateType == 1) {
      dialogue.textContent =
        "You called the ASPCA and they said it's a small amount of milk chocolate, Connor will be fine."
    }
  } else if (reaction.id === 'hydrogen-peroxide') {
    let index = Math.floor(Math.random() * 5) + 1
    if (chocolateType == 0) {
      if (index <= 3) {
        dialogue.textContent = `You used ${index}% hydrogen peroxide to induce vomiting. While you should have consulted a vet first, this worked anyway. Connor is now better.`
      } else if (index > 3) {
        dialogue.textContent = `You used ${index}% hydrogen peroxide to induce vomiting, that's too much. You caused severe chemical burns to Connor's mouth.`
      }
    } else if (chocolateType == 1) {
      if (index <= 3) {
        dialogue.textContent = `You used ${index}% hydrogen peroxide to induce vomiting. Connor didn't need it since he only ate a small amount of milk chocolate. Fortunately, this didn't harm him.`
      } else if (index > 3) {
        dialogue.textContent = `You used ${index}% hydrogen peroxide to induce vomiting, that's too much. Connor didn't need it since he only ate a small amount of white chocolate, and on top of that you caused his mouth severe chemical burns.`
      }
    }
  } else if (reaction.id === 'do-nothing') {
    if (chocolateType == 0) {
      dialogue.textContent =
        'The type and amount of Chocolate that Connor ate were of severe toxicity, he suffered a seizure.'
    } else if (chocolateType == 1) {
      dialogue.textContent =
        "The Hershey's bar was small, Connor is doing absolutely fine. You are lucky that nothing happened. "
    }
  }

  if (reaction.id === 'chase') {
    let index = Math.floor(Math.random() * 2)
    if (index == 0) {
      dialogue.textContent = `You chased Connor until you physically collapsed. He kept running faster and faster, and you couldn't catch him.`
    } else if (index == 1) {
      dialogue.textContent = `You chased Connor until you eventually caught him. Connor licks your face, he just wanted to play.`
    }
  } else if (reaction.id === 'posters') {
    let index = Math.floor(Math.random() * 2)
    if (index == 0) {
      dialogue.textContent = `You wasted your time putting up posters instead of looking for Connor. His owner is back now and he is mad.`
    } else if (index == 1) {
      dialogue.textContent = `30 minutes after you put up the posters, a nice lady approaches, holding Connor in her arms. Phew, you got lucky!`
    }
  } else if (reaction.id === 'lure') {
    let index = Math.floor(Math.random() * 2)
    if (index == 0) {
      dialogue.textContent = `You tried to lure Connor with a treat but he didn't fall for it. Seems like he preferred finding his own treat in the street`
    } else if (index == 1) {
      dialogue.textContent = `You lured Connor with a treat. He quickly ran back towards you and jumped around begging for biscuits.`
    }
  }
}

// event listeners
startButton.addEventListener('click', startGame)
