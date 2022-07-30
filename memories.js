const cardsColor = [
	"red",
	"green",
	"blue",
	"brown",
	"yellow",
	"gray",
	"cadetblue",
	"violet",
	"lightgreen",
	"red",
	"green",
	"blue",
	"brown",
	"yellow",
	"gray",
	"cadetblue",
	"violet",
	"lightgreen",
]

let cards = document.querySelectorAll("div")
cards

const startTime = new Date().getTime()
let activeCard = ""
const activeCards = []

const gamePairs = cards.length / 2
let gameResult = 0

const clickCard = () => {
	activeCard = event.target
    if(activeCard===activeCards[0]){
        return
    }

	activeCard.classList.remove("hidden")

	if (activeCards.length === 0) {
		activeCards[0] = activeCard
		return
	} else {
		cards.forEach((card) => {
			card.removeEventListener("click", clickCard)
		})
		activeCards[1] = activeCard
		setTimeout(() => {
			if (activeCards[0].className === activeCards[1].className) {
				gameResult++
				activeCards.forEach((card) => {
					card.classList.add("off")
				})
				if (gameResult === gamePairs) {
					const endTime = new Date().getTime()
					const gameTime = (endTime - startTime) / 1000
					alert(`Wygrałeś a Twój czas gry wynosił ${gameTime}`)
					location.reload()
				}
			} else {
				activeCards.forEach((card) => {
					card.classList.add("hidden")
				})
			}

			activeCard = ""
			activeCards.length = 0
			cards.forEach((card) => {
				if (card.classList.contains('off') !==true ) {
					card.addEventListener("click", clickCard)
				}
			})
		}, 700)
	}
}

const init = () => {
	//giving divs colors-->
	cards.forEach((card) => {
		const position = Math.floor(Math.random() * cardsColor.length)
		card.classList.add(cardsColor[position])
		cardsColor.splice(position, 1)
	})
	//hide divs
	setTimeout(() => {
		cards.forEach((card) => {
			card.classList.add("hidden")
			card.addEventListener("click", clickCard)
		})
	}, 1500)
}

init()
