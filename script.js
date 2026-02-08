const startButton = document.querySelector('#start-game')
const header = document.querySelector('h1')
const statusContainer = document.querySelector('.status-container')
const statusBars = document.querySelectorAll('.status-bar')
const buttons = document.querySelector('.buttons')

const startGame = () => {
  console.log('game started')
  startingSettings()
  decreaseStatus()
  createButtons()
}

const startingSettings = () => {
  header.style.marginBottom = '0px'
  header.style.visibility = 'hidden'
  startButton.style.visibility = 'hidden'
  statusContainer.style.marginTop = '34px'
  statusContainer.style.visibility = 'visible'
}

const decreaseStatus = () => {
  let statusBars = document.querySelectorAll('.status-bar')
  statusBars.forEach((bar) => {
    let width = 150
    let duration = 10000
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
  const feedButton = document.createElement('button')
  feedButton.setAttribute('id', 'feed')
  feedButton.setAttribute('class', 'clickable')
  feedButton.textContent = 'Feed'
  buttons.appendChild(feedButton)

  const walkButton = document.createElement('button')
  walkButton.setAttribute('id', 'walk')
  walkButton.setAttribute('class', 'clickable')
  walkButton.textContent = 'Walk'
  buttons.appendChild(walkButton)

  const playButton = document.createElement('button')
  playButton.setAttribute('id', 'play')
  playButton.setAttribute('class', 'clickable')
  playButton.textContent = 'Play'
  buttons.appendChild(playButton)

  const sleepButton = document.createElement('button')
  sleepButton.setAttribute('id', 'sleep')
  sleepButton.setAttribute('class', 'clickable')
  sleepButton.textContent = 'Sleep'
  buttons.appendChild(sleepButton)

  const rewardButton = document.createElement('button')
  rewardButton.setAttribute('id', 'reward')
  rewardButton.setAttribute('class', 'clickable')
  rewardButton.textContent = 'Reward'
  buttons.appendChild(rewardButton)

  const petButton = document.createElement('button')
  petButton.setAttribute('id', 'pet')
  petButton.setAttribute('class', 'clickable')
  petButton.textContent = 'Pet'
  buttons.appendChild(petButton)
}

startButton.addEventListener('click', startGame)
