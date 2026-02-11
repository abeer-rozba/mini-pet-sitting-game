// variables
const startButton = document.querySelector('#start-game')
const header = document.querySelector('#title')
const statusContainer = document.querySelector('.status-container')
const statusBars = document.querySelectorAll('.status-bar')
const buttons = document.querySelector('.buttons')
const body = document.querySelector('body')
const dialogue = document.querySelector('#dialogue')
const health = document.querySelector('#health')
const hunger = document.querySelector('#hunger')
const happiness = document.querySelector('#happiness')
const energy = document.querySelector('#energy')
const usernameSpan = document.querySelector('#username')

// regular buttons + timer
let feedButton,
  walkButton,
  playButton,
  sleepButton,
  rewardButton,
  petButton,
  timer,
  alertMessage,
  messageContent,
  restartButton

// random events buttons
let treatButton1, treatButton2, treatButton3, reactionsDiv, chocolateType
let gameEnded = false

const healthyFood = [
  'chicken',
  'bread',
  'broccoli',
  'carrots',
  'eggs',
  'peanut butter'
]

const unhealthyFood = [
  'onions',
  'one whole apple',
  'garlic',
  'grapes',
  'milk',
  'coffee'
]

const dogGames = ['fetch', 'tug-of-war', 'hide-and-seek', 'treasure hunt']

const chocolate = [
  "Connor just ate 6 ounces of Peanut M&Ms. He seems a bit restless, you're worried that he's poisoned. What do you do?",
  "Connor just ate one Hershey's milk chocolate bar. He seems fine but you're still worried he's poisoned. What do you do?"
]

// classes and objects
class Dog {
  constructor() {
    this.name = 'Connor'
    this.health = 50
    this.hunger = 50
    this.happiness = 50
    this.energy = 50
    this.isHungry = false
    this.isSick = false
    this.isTired = false
    this.isUnhappy = false
  }
  feed() {
    if (this.isHungry == true) {
      alertMessage.remove()
      buttons.style.visibility = 'visible'
    }
    let index = Math.floor(Math.random() * 2)
    if (this.hunger <= 0) {
      dialogue.textContent = `Connor feels full, he refuses to eat.`
    } else if (this.hunger > 0) {
      if (this.isSick == true) {
        this.isSick = false
        alertMessage.remove()
        buttons.style.visibility = 'visible'
        index = 0
      }
      if (index == 0) {
        this.health += 10
        let index = Math.floor(Math.random() * healthyFood.length)
        dialogue.textContent = `You fed Connor ${healthyFood[index]}. The food was delicious and healthy.`
      } else if (index == 1) {
        this.health -= 10
        let index = Math.floor(Math.random() * unhealthyFood.length)
        if (index == 1) {
          dialogue.textContent = `You fed Connor ${unhealthyFood[index]}. The seeds irritated his stomach.`
        } else
          dialogue.textContent = `You fed Connor ${unhealthyFood[index]}. The food irritated his stomach.`
      }
      this.hunger -= 10
      this.energy += 10
      this.statusLimits()
      this.isHungry = false
      health.textContent = this.health
      hunger.textContent = this.hunger
      energy.textContent = this.energy
    }
  }
  walk() {
    let index = Math.floor(Math.random() * 45) + 1
    if (this.energy <= 10) index = 30
    if (index <= 20) {
      this.hunger += 5
      this.energy -= 10
      dialogue.textContent = `You walked Connor for ${index} minutes. He still feels energetic and ready for more activities`
    } else if (index > 20) {
      this.hunger += 10
      this.energy -= 15
      dialogue.textContent = `You walked Connor for ${index} minutes. He feels tired now. Connor takes a little nap.`
    }
    this.statusLimits()
    hunger.textContent = this.hunger
    energy.textContent = this.energy
  }
  play() {
    if (this.isUnhappy == true) {
      this.isUnhappy = false
      alertMessage.remove()
      buttons.style.visibility = 'visible'
    }
    let index = Math.floor(Math.random() * dogGames.length)
    this.happiness += 10
    this.energy -= 5
    dialogue.textContent = `You played ${dogGames[index]} with Connor. He enjoyed his time but the game left him a bit tired.`
    this.statusLimits()
    happiness.textContent = this.happiness
    energy.textContent = this.energy
  }
  sleep() {
    if (this.isSick == true || this.isTired == true) {
      alertMessage.remove()
      this.isSick = false
      this.isTired = false
      buttons.style.visibility = 'visible'
    }
    let index = Math.floor(Math.random() * 30) + 1
    if (this.energy >= 60) index = 20
    if (index <= 15) {
      this.health += 5
      this.energy += 5
      dialogue.textContent = `Connor napped for ${index} minutes. He still feels tired and wants to sleep some more.`
    } else if (index > 15) {
      this.health += 10
      this.energy += 10
      dialogue.textContent = `Connor slept for ${index} minutes. He feels refreshed now. That was such a power nap!`
    }
    this.hunger += 5
    this.happiness -= 5
    this.statusLimits()
    health.textContent = this.health
    energy.textContent = this.energy
    happiness.textContent = this.happiness
  }
  reward() {
    if (this.isUnhappy == true) {
      this.isUnhappy = false
      alertMessage.remove()
      buttons.style.visibility = 'visible'
    }
    this.happiness += 10
    this.health -= 10
    this.hunger -= 5
    this.statusLimits()
    dialogue.textContent = `You gave Connor a treat, he jumps around happily, asking for more.`
    happiness.textContent = this.happiness
    health.textContent = this.health
    hunger.textContent = this.hunger
  }
  pet() {
    if (this.isUnhappy == true) {
      this.isUnhappy = false
      alertMessage.remove()
      buttons.style.visibility = 'visible'
    }
    let index = Math.floor(Math.random() * 2)
    if (index == 0) {
      dialogue.textContent = `You gave Connor some belly rubs, he wiggles around happily, asking for more.`
    } else if (index == 1) {
      dialogue.textContent = `You pat on Connor's head, he wags his tail happily, asking for more.`
    }
    this.happiness += 10
    this.statusLimits()
    happiness.textContent = this.happiness
  }
  statusLimits() {
    if (this.health >= 100) this.health = 100
    if (this.health <= 0) this.health = 0
    if (this.hunger <= 0) this.hunger = 0
    if (this.hunger >= 100) this.hunger = 100
    if (this.happiness >= 100) this.happiness = 100
    if (this.happiness <= 0) this.happiness = 0
    if (this.energy >= 100) this.energy = 100
    if (this.energy <= 0) this.energy = 0
  }
  changeStatusColor() {
    const healthClass = document.querySelector('.health')
    const hungerClass = document.querySelector('.hunger')
    const happinessClass = document.querySelector('.happiness')
    const energyClass = document.querySelector('.energy')
    if (this.health >= 70) {
      healthClass.style.backgroundColor = 'rgb(116, 194, 92)'
    }
    if (this.health < 70) {
      healthClass.style.backgroundColor = 'rgb(231, 141, 7)'
    }
    if (this.health <= 30) {
      healthClass.style.backgroundColor = 'rgb(204, 22, 22)'
    }
    if (this.hunger >= 70) {
      hungerClass.style.backgroundColor = 'rgb(204, 22, 22)'
    }
    if (this.hunger < 70) {
      hungerClass.style.backgroundColor = 'rgb(231, 141, 7)'
    }
    if (this.hunger <= 30) {
      hungerClass.style.backgroundColor = 'rgb(116, 194, 92)'
    }
    if (this.happiness >= 70) {
      happinessClass.style.backgroundColor = 'rgb(116, 194, 92)'
    }
    if (this.happiness < 70) {
      happinessClass.style.backgroundColor = 'rgb(231, 141, 7)'
    }
    if (this.happiness <= 30) {
      happinessClass.style.backgroundColor = 'rgb(204, 22, 22)'
    }
    if (this.energy >= 70) {
      energyClass.style.backgroundColor = 'rgb(116, 194, 92)'
    }
    if (this.energy < 70) {
      energyClass.style.backgroundColor = 'rgb(231, 141, 7)'
    }
    if (this.energy <= 30) {
      energyClass.style.backgroundColor = 'rgb(204, 22, 22)'
    }
  }
  checkStatus() {
    if (this.health <= 0) {
      this.isSick = true
      alertMessage = document.createElement('div')
      alertMessage.style.height = '200px'
      alertMessage.style.display = 'flex'
      alertMessage.style.flexDirection = 'column'
      alertMessage.style.justifyContent = 'center'
      dialogue.appendChild(alertMessage)

      messageContent = document.createElement('p')
      messageContent.setAttribute('class', 'reactions')
      messageContent.style.backgroundColor = 'rgba(216, 115, 14, 0.84)'
      messageContent.style.border = 'none'
      messageContent.style.borderRadius = '18px'
      messageContent.textContent = `Connor is feeling under the weather, help him feel better.`
      alertMessage.appendChild(messageContent)
      buttons.style.visibility = 'hidden'
      sleepButton.style.visibility = 'visible'
      feedButton.style.visibility = 'visible'
    } else if (this.hunger >= 100) {
      this.isHungry = true
      alertMessage = document.createElement('div')
      alertMessage.style.height = '200px'
      alertMessage.style.display = 'flex'
      alertMessage.style.flexDirection = 'column'
      alertMessage.style.justifyContent = 'center'
      dialogue.appendChild(alertMessage)

      messageContent = document.createElement('p')
      messageContent.setAttribute('class', 'reactions')
      messageContent.style.backgroundColor = 'rgba(216, 115, 14, 0.84)'
      messageContent.style.border = 'none'
      messageContent.style.borderRadius = '18px'
      messageContent.textContent = 'Connor feels very hungry. Feed him please.'
      alertMessage.appendChild(messageContent)
      buttons.style.visibility = 'hidden'
      feedButton.style.visibility = 'visible'
      rewardButton.style.visibility = 'visible'
    } else if (this.happiness <= 0) {
      this.isUnhappy = true
      alertMessage = document.createElement('div')
      alertMessage.style.height = '200px'
      alertMessage.style.display = 'flex'
      alertMessage.style.flexDirection = 'column'
      alertMessage.style.justifyContent = 'center'
      dialogue.appendChild(alertMessage)

      messageContent = document.createElement('p')
      messageContent.setAttribute('class', 'reactions')
      messageContent.style.backgroundColor = 'rgba(216, 115, 14, 0.84)'
      messageContent.style.border = 'none'
      messageContent.style.borderRadius = '18px'
      messageContent.textContent =
        'Connor feels depressed. Try to cheer him up!'
      alertMessage.appendChild(messageContent)
      buttons.style.visibility = 'hidden'
      playButton.style.visibility = 'visible'
      rewardButton.style.visibility = 'visible'
      petButton.style.visibility = 'visible'
    } else if (this.energy <= 0) {
      this.isTired = true
      alertMessage = document.createElement('div')
      alertMessage.style.height = '200px'
      alertMessage.style.display = 'flex'
      alertMessage.style.flexDirection = 'column'
      alertMessage.style.justifyContent = 'center'
      dialogue.appendChild(alertMessage)

      messageContent = document.createElement('p')
      messageContent.setAttribute('class', 'reactions')
      messageContent.style.backgroundColor = 'rgba(216, 115, 14, 0.84)'
      messageContent.style.border = 'none'
      messageContent.style.borderRadius = '18px'
      messageContent.textContent =
        'Connor is so tired and sleepy. Let him rest now.'
      alertMessage.appendChild(messageContent)
      buttons.style.visibility = 'hidden'
      sleepButton.style.visibility = 'visible'
    }
  }
}

class Owner {
  constructor() {
    this.payable = 100
    this.tipAmount = 0
  }
  slap() {}
  tip() {}
  sue() {}
}

const dog = new Dog()

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
    outcomes(treatButton1)
  })

  treatButton2 = document.createElement('button')
  treatButton2.setAttribute('id', 'give-treat')
  treatButton2.setAttribute('class', 'clickable reactions')
  treatButton2.textContent = 'A treat will distract him from the couch'
  reactionsDiv.appendChild(treatButton2)
  treatButton2.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton2)
  })

  treatButton3 = document.createElement('button')
  treatButton3.setAttribute('id', 'take-walk')
  treatButton3.setAttribute('class', 'clickable reactions')
  treatButton3.textContent = 'Walk him to drain excess energy'
  reactionsDiv.appendChild(treatButton3)
  treatButton3.addEventListener('click', () => {
    reactionsDiv.remove()
    outcomes(treatButton3)
  })
}

const events = [sickPet, ateChocolate, escaped, ruinedCouch] // https://stackoverflow.com/questions/3592468/can-i-store-javascript-functions-in-arrays, https://www.geeksforgeeks.org/javascript/array-of-functions-in-javascript/

usernameSpan.textContent = localStorage.getItem('username')
// https://coreui.io/answers/how-to-get-an-item-from-localstorage-in-javascript/

const restartDialogue = dialogue.textContent

// main function
const startGame = () => {
  startingSettings()
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
  health.textContent = dog.health
  hunger.textContent = dog.hunger
  happiness.textContent = dog.happiness
  energy.textContent = dog.energy
  dog.changeStatusColor()
}

const createButtons = () => {
  feedButton = document.createElement('button')
  feedButton.setAttribute('id', 'feed')
  feedButton.setAttribute('class', 'clickable')
  feedButton.textContent = 'Feed'
  buttons.appendChild(feedButton)

  feedButton.addEventListener('click', () => {
    dog.feed()
    dog.checkStatus()
    dog.changeStatusColor()
  })

  walkButton = document.createElement('button')
  walkButton.setAttribute('id', 'walk')
  walkButton.setAttribute('class', 'clickable')
  walkButton.textContent = 'Walk'
  buttons.appendChild(walkButton)

  walkButton.addEventListener('click', () => {
    dog.walk()
    dog.checkStatus()
    dog.changeStatusColor()
  })

  playButton = document.createElement('button')
  playButton.setAttribute('id', 'play')
  playButton.setAttribute('class', 'clickable')
  playButton.textContent = 'Play'
  buttons.appendChild(playButton)

  playButton.addEventListener('click', () => {
    dog.play()
    dog.checkStatus()
    dog.changeStatusColor()
  })

  sleepButton = document.createElement('button')
  sleepButton.setAttribute('id', 'sleep')
  sleepButton.setAttribute('class', 'clickable')
  sleepButton.textContent = 'Sleep'
  buttons.appendChild(sleepButton)

  sleepButton.addEventListener('click', () => {
    dog.sleep()
    dog.checkStatus()
    dog.changeStatusColor()
  })

  rewardButton = document.createElement('button')
  rewardButton.setAttribute('id', 'reward')
  rewardButton.setAttribute('class', 'clickable')
  rewardButton.textContent = 'Reward'
  buttons.appendChild(rewardButton)

  rewardButton.addEventListener('click', () => {
    dog.reward()
    dog.checkStatus()
    dog.changeStatusColor()
  })

  petButton = document.createElement('button')
  petButton.setAttribute('id', 'pet')
  petButton.setAttribute('class', 'clickable')
  petButton.textContent = 'Pet'
  buttons.appendChild(petButton)

  petButton.addEventListener('click', () => {
    dog.pet()
    dog.checkStatus()
    dog.changeStatusColor()
  })
}

const countdown = () => {
  let time = 300
  const clock = setInterval(() => {
    if (gameEnded == true) {
      if (alertMessage) {
        alertMessage.remove()
        alertMessage = null
      }
      if (reactionsDiv) {
        reactionsDiv.remove()
        reactionsDiv = null
      }
      buttons.style.visibility = 'hidden'
      if (restartButton) restartButton.style.visibility = 'visible'
      clearInterval(clock)
    }

    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    timer.style.left = '7%'
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    time--

    // https://community.testmuai.com/t/how-can-i-create-a-simple-javascript-countdown-timer/31822/2

    if (time <= 0) {
      if (alertMessage) {
        alertMessage.remove()
        alertMessage = null
      }
      if (reactionsDiv) {
        reactionsDiv.remove()
        reactionsDiv = null
      }
      buttons.style.visibility = 'hidden'
      if (restartButton) restartButton.style.visibility = 'visible'
      endGame('timeIsUp')
      clearInterval(clock)
      return
    }

    if (time % 10 == 0 && events.length > 0) randomEvent()
  }, 1000)
}

const randomEvent = () => {
  buttons.style.visibility = 'hidden'
  let index = Math.floor(Math.random() * events.length)
  events[index]()
  events.splice(index, 1)
}

const restartGame = () => {
  console.log('restarted')
  if (alertMessage) alertMessage.remove()
  if (reactionsDiv) reactionsDiv.remove()
  if (timer) timer.remove()
  buttons.innerHTML = ''
  dog.health = 50
  dog.hunger = 50
  dog.happiness = 50
  dog.energy = 50
  dog.isHungry = false
  dog.isSick = false
  dog.isTired = false
  dog.isUnhappy = false
  dog.changeStatusColor()
  health.textContent = dog.health
  hunger.textContent = dog.hunger
  happiness.textContent = dog.happiness
  energy.textContent = dog.energy

  dialogue.textContent = restartDialogue
  buttons.style.visibility = 'visible'
  events.length = 0
  events.push(sickPet, ateChocolate, escaped, ruinedCouch)

  gameEnded = false
  startGame()
}

const endGame = (reason) => {
  if (reason === 'seizure') {
    dialogue.textContent = `Connor's owner came back to find his dog suffering from a seizure. He slaps you, pays you nothing, and says that he's going to sue you.`
  } else if (reason === 'ranAway') {
    dialogue.textContent = `Connor's owner came back to find out that you lost his dog. He slaps you and pays you nothing.`
  } else if (reason === 'timeIsUp') {
    if (
      dog.health >= 50 &&
      dog.hunger >= 50 &&
      dog.happiness >= 50 &&
      dog.energy >= 50
    ) {
      dialogue.textContent = `Connor's owner came back and found his dog well taken care of. He's pleased with you, he pays you $100 and tips you an extra $20.`
    } else if (
      dog.health < 50 &&
      dog.hunger < 50 &&
      dog.happiness < 50 &&
      dog.energy < 50
    ) {
      dialogue.textContent = `Connor's owner came back and found his dog in a not-so-great condition. He's angry, but he pays you a $100 anyway, muttering something about not hiring you again.`
    }
  }

  if (alertMessage) {
    alertMessage.remove()
  }
  if (reactionsDiv) {
    reactionsDiv.remove()
  }
  buttons.style.visibility = 'hidden'
  dog.statusLimits()
  dog.changeStatusColor()
  gameEnded = true
  console.log(reason)

  restartButton = document.createElement('button')
  restartButton.setAttribute('id', 'restart-game')
  restartButton.setAttribute('class', 'clickable')
  restartButton.textContent = 'Restart game'
  buttons.appendChild(restartButton)

  restartButton.addEventListener('click', () => {
    restartGame()
  })
}

const outcomes = (reaction) => {
  buttons.style.visibility = 'visible'
  if (reaction.id === 'home-remedy') {
    dialogue.textContent =
      "You gave Connor a boiled chicken with plain rice. He barely touched it, he's still sick."
  } else if (reaction.id === 'vet') {
    dog.health += 40
    dialogue.textContent =
      "You spent $230 on Connor's vet visit. He received proper treatment and he feels better now."
  } else if (reaction.id === 'hope') {
    dog.health -= 40
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
        dog.health += 20
        dialogue.textContent = `You used ${index}% hydrogen peroxide to induce vomiting. While you should have consulted a vet first, this worked anyway. Connor is now better.`
      } else if (index > 3) {
        dog.health = 5
        dialogue.textContent = `You used ${index}% hydrogen peroxide to induce vomiting, that's too much. You caused severe chemical burns to Connor's mouth.`
      }
    } else if (chocolateType == 1) {
      if (index <= 3) {
        dialogue.textContent = `You used ${index}% hydrogen peroxide to induce vomiting. Connor didn't need it since he only ate a small amount of milk chocolate. Fortunately, this didn't harm him.`
      } else if (index > 3) {
        dog.health = 5
        dialogue.textContent = `You used ${index}% hydrogen peroxide to induce vomiting, that's too much. Connor didn't need it since he only ate a small amount of white chocolate, and on top of that you caused his mouth severe chemical burns.`
      }
    }
  } else if (reaction.id === 'do-nothing') {
    if (chocolateType == 0) {
      dog.health = 5
      dialogue.textContent =
        'The type and amount of Chocolate that Connor ate were of severe toxicity, he suffered a seizure.'
      endGame('seizure')
    } else if (chocolateType == 1) {
      dialogue.textContent =
        "The Hershey's bar was small, Connor is doing absolutely fine. You are lucky that nothing happened. "
    }
  }

  if (reaction.id === 'chase') {
    let index = Math.floor(Math.random() * 2)
    if (index == 0) {
      dialogue.textContent = `You chased Connor until you physically collapsed. He kept running faster and faster, and you couldn't catch him.`
      endGame('ranAway')
    } else if (index == 1) {
      dialogue.textContent = `You chased Connor until you eventually caught him. Connor licks your face, he just wanted to play.`
    }
  } else if (reaction.id === 'posters') {
    let index = Math.floor(Math.random() * 2)
    if (index == 0) {
      dialogue.textContent = `You wasted your time putting up posters instead of looking for Connor. His owner is back now and he is mad.`
      endGame('ranAway')
    } else if (index == 1) {
      dialogue.textContent = `30 minutes after you put up the posters, a nice lady approaches, holding Connor in her arms. Phew, you got lucky!`
    }
  } else if (reaction.id === 'lure') {
    let index = Math.floor(Math.random() * 2)
    if (index == 0) {
      dialogue.textContent = `You tried to lure Connor with a treat but he didn't fall for it. Seems like he preferred finding his own treat in the street`
      endGame('ranAway')
    } else if (index == 1) {
      dog.happiness += 5
      dialogue.textContent = `You lured Connor with a treat. He quickly ran back towards you and jumped around begging for biscuits.`
    }
  }

  if (reaction.id === 'yell') {
    dog.happiness -= 40
    dialogue.textContent =
      'You yell at Connor. He feels threatened and bites you. You deserve that, never yell at a doggie.'
  } else if (reaction.id === 'give-treat') {
    dialogue.textContent =
      "You try distracting Connor with a treat, but he thinks you're rewarding his behavior. He keeps on tearing the couch."
  } else if (reaction.id === 'take-walk') {
    dog.happiness += 20
    dog.energy -= 20
    dialogue.textContent =
      "You take Connor on a walk that stimulates his senses and drains his energy out. When you're back, Connor sleeps."
  }
  dog.statusLimits()
  health.textContent = dog.health
  happiness.textContent = dog.happiness
  energy.textContent = dog.energy
  dog.checkStatus()
  dog.changeStatusColor()
  endGame('seizure')
}

// event listeners
startButton.addEventListener('click', startGame)
