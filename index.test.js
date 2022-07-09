const expect = chai.expect;

describe("Player Classes", function() {
    it("should both have a hand of 26 cards", function() {
        let game = new Game()
        game.newGame()
        expect(game.playerOne.hand.length).to.equal(26)
        expect(game.playerTwo.hand.length).to.equal(26)
    })
})

describe("Deck Class", function() {
    it("should have an array of 52 cards", function() {
        let game = new Game()
        game.newGame()
        expect(game.deck.cards.length).to.equal(52)
    })
})
