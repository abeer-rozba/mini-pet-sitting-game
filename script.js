const startButton = document.querySelector('#start-game')
const header = document.querySelector('h1')
const statusContainer = document.querySelector('.status-container')

const startGame = () => {
  console.log('game started')
  startingSettings()
}

const startingSettings = () => {
  header.style.marginBottom = '0px'
  header.style.visibility = 'hidden'
  startButton.style.visibility = 'hidden'
  statusContainer.style.marginTop = '34px'
  statusContainer.style.visibility = 'visible'
}

startButton.addEventListener('click', startGame)
