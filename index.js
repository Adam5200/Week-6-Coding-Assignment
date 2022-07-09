//The player object has two properties. An array of card objects, representing their "hand", and a value to keep score.
class Player{
    constructor() {
        this.hand = []
        this.points = 0
    }

    //takes the passed card object and adds it to the players hand array
    addCard(card) {
        this.hand.push(card)
    }
}

//The card object has a suit property and a value property. The value in this case is a literal integer, keeping track of how "powerful" the card is within the game
class Card{
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    //this method will display the card as it would appear in the real world, transposing the higher values to their traditional nomenclature
    toString() {
        let value = this.value
        if(this.value > 10) {
            switch(this.value) {
                case 11: value = "Jack"
                break;
                case 12: value = "Queen"
                break;
                case 13: value = "King"
                break;
                case 14: value = "Ace"
                break;
                default:
            }
        }
        return value + " of " + this.suit
    }
}

//This object is initialized once and is only used in generating the initial deck of cards that gets shuffled and dispersed to the two players.
//It will get deleted once the cards are handed to the players, to preserve a sense of realism.
class Deck{
    //an empty array of cards
    constructor(cards) {
        this.cards = []
    }

    //a method to add a card object to the deck
    addCard(card) {
        this.cards.push(card)
    }

    //this will randomly shuffle the cards in the deck. Basically, it will iterate through the cards, and each time, it will swap 2 of them. This quite realisically shuffles the cards
    shuffle(cards) {
        for(let i = cards.length - 1 ; i > 0; i--) {
            let j = Math.floor(Math.random()*(i+1))
            //always use a temporary value to do an in-house swap!
            let temp = cards[i]
            cards[i] = cards[j]
            cards[j] = temp
        }
        //we'll return the same value we passed in. No need to hold on to the original organized cards.
        return cards
    }
}

class Game{
    //basic constructor, creating the main deck of cards, and the two player objects.
    constructor() {
        this.deck = new Deck()
        this.playerOne = new Player()
        this.playerTwo = new Player()
    }

    //simple feature to print all the cards of any deck. Was used in debugging to print not only the main deck, but also the hands of players one and two.
    printAllCards(deck) {
        for(let card of deck) {
            console.log(card.toString())
        }
    }

    //this very simply creates 52 cards, much like a traditional deck of cards might appear. They are added as card objects to the cards array in the deck object.
    createMainDeck() {
        let suits = ["Spades", "Diamonds", "Hearts", "Clubs"]
        let value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        for(let x = 0; x < suits.length; x++) {
            for(let y = 0; y < value.length; y++) {
                this.deck.addCard(new Card(suits[x], value[y]))
            }
        }
    }

    //this shuffles the deck of cards and disperses them to the two players.
    dealNewCards(deck, playerOne, playerTwo) {
        let shuffledDeck = deck.shuffle(deck.cards)
        //this loop splices the shuffled deck array into two, and will deal the cards to the players. Much like a real card dealer.
        for(let i = 0; i < shuffledDeck.length; i++) {
            if(i % 2 == 0) {
                playerOne.addCard(shuffledDeck[i])
            } else {
                playerTwo.addCard(shuffledDeck[i])
            }
        }
        //this line here serves no true function in the program, other than simulating that the deck of cards the was shuffled and handed out,
        //now exists in the players hand, and not in the initial deck variable.
        deck = null;
    }

    //this is the main "algorithm" of the game. Each card has a value assigned to it from 2 - 14. The greater the value, the better the card. 
    fight(playerOne, playerTwo) {
        //we use the length of the player one hand because it's also the amount of rounds there will be.
        for(let i = 0; i < playerOne.hand.length; i++) {
            console.log("Player One deals a " + playerOne.hand[i].toString() + " | Player Two deals a " + playerTwo.hand[i].toString())
            //checking for a tie
            if(playerOne.hand[i].value == playerTwo.hand[i].value) {
                console.log("Tie! There are no points awarded")
            //checking if player one has a better card
            } else if(playerOne.hand[i].value > playerTwo.hand[i].value) {
                console.log("Player One gets a point!")
                playerOne.points++
            //checking if player two has a better card
            } else if(playerOne.hand[i].value < playerTwo.hand[i].value) {
                console.log("Player Two gets a point!")
                playerTwo.points++
            }
            //announcing the score at the end of every round
            console.log("P1: " + playerOne.points + " P2: " + playerTwo.points)
        }
        //final score announcement
        console.log("FINAL SCORE\nPlayer One: " + playerOne.points + " Player Two: " + playerTwo.points)

        //code block to display the winning player
        if(playerOne.points === playerTwo.points) {
            console.log("A tie! Can you believe it?")
        } else if(playerOne.points > playerTwo.points) {
            console.log("Player One wins!")
        } else if(playerOne.points < playerTwo.points) {
            console.log("Player Two wins!")
        }
    }

    //function to create a new game
    newGame() {
        //create a deck of cards
        this.createMainDeck()
        //deal the cards to the players
        this.dealNewCards(this.deck, this.playerOne, this.playerTwo)
        console.log("Let the game begin...")
        //the battle. This leads into the end of the program.
        this.fight(this.playerOne, this.playerTwo)
    }
}

//declaring a new game object
let game = new Game()
//calling the newGame function of game
game.newGame()
