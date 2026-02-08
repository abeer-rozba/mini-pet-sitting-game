const startButton = document.querySelector('#start-game')
const header = document.querySelector('h1')
const statusContainer = document.querySelector('.status-container')
const statusBars = document.querySelectorAll('.status-bar')

const startGame = () => {
  console.log('game started')
  startingSettings()
  decreaseStatus()
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

startButton.addEventListener('click', startGame)
