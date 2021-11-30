class Card{
    suit;
    cardName;
    value;
    img;
    constructor(suit, cardName, value, img){
        this.suit = suit;
        this.cardName = cardName;
        this.value = value;
        this.img = img;
    }
}

var deck = [];
var playersCards = [];
var dealersCards = [];
var dealerScore = 0;
var playerScore = 0;
var suits = [
    {suitName: "Diamonds", suitImg: "♥"}, 
    {suitName: "Spades", suitImg: "♠"}, 
    {suitName: "Clubs", suitImg: "♣"}, 
    {suitName: "Hearts", suitImg: "◆"}
];
var cardValues = [
    {cardName: "A", value: 1},
    {cardName: "2", value: 2},
    {cardName: "3", value: 3},
    {cardName: "4", value: 4},
    {cardName: "5", value: 5},
    {cardName: "6", value: 6},
    {cardName: "7", value: 7},
    {cardName: "8", value: 8},
    {cardName: "9", value: 9},
    {cardName: "10", value: 10},
    {cardName: "J", value: 10},
    {cardName: "Q", value: 10},
    {cardName: "K", value: 10},
]

for(let i = 0; i < suits.length; i++){
    for(let j = 0; j < cardValues.length; j++){
       var card = new Card(suits[i].suitName, cardValues[j].cardName, cardValues[j].value, suits[i].suitImg);
       deck.push(card)
    }
}



$(document).ready(function(){
    $("p").hide();

    $("#deal").click(function(){
        $("p").show();
        playersCards = [];
        dealersCards = [];
        $("#dealersCards").empty();
        $("#playersCards").empty();
        $("#dealerStatus").empty();
        $("#playerStatus").empty();
        dealerScore = 0;
        playerScore = 0;
        for(let i = 2; i < 6; i++){
         if(i % 2 == 0){
         var cardPicked = deck[Math.floor(Math.random()*deck.length)];
         dealersCards.push(cardPicked);
         var cardToBeRemoved = deck.indexOf(cardPicked);
         deck.splice(cardToBeRemoved, 1);
         }else if(i % 2 != 0){
         var cardPicked = deck[Math.floor(Math.random()*deck.length)];
         playersCards.push(cardPicked);
         var cardToBeRemoved = deck.indexOf(cardPicked);
         deck.splice(cardToBeRemoved, 1); 
         }
        }
dealerScore = getScore(dealersCards);
$("#dealerScore").html(getScore(dealersCards));
playersScore = getScore(playersCards);
$("#playersScore").html(getScore(playersCards));

    for(let i = 0; i < dealersCards.length; i++){
        $("#dealersCards").append(`
        <div class="card" style="width: 20%;">
            <div class="card-body text-center">
                <h5 class="card-title" id="dealerCard-title-${i}"></h5>
                <h6 class="card-subtitle mb-2 text-muted" id="dealercard-subtitle-${i}"></h6>
                <p class="card-text" id="dealerCard-text-${i}"></p>
            </div>
        </div>`)
        $("#dealercard-subtitle-"+i).html(dealersCards[i].img);
        $("#dealerCard-title-"+i).html(dealersCards[i].cardName);
        $("#dealerCard-text-"+i).html(dealersCards[i].suit);
    }

    for(let i = 0; i < playersCards.length; i++){
        $("#playersCards").append(`
        <div class="card" style="width: 20%;">
            <div class="card-body text-center">
                <h5 class="card-title" id="playersCard-title-${i}"></h5>
                <h6 class="card-subtitle mb-2 text-muted" id="playerscard-subtitle-${i}"></h6>
                <p class="card-text" id="playersCard-text-${i}"></p>
            </div>
        </div>`)
        $("#playerscard-subtitle-"+i).html(playersCards[i].img);
        $("#playersCard-title-"+i).html(playersCards[i].cardName);
        $("#playersCard-text-"+i).html(playersCards[i].suit);
    }
    })
  
$("#hit").click(function(){
    playerScore = 0;
    dealersScore = 0;
    var cardPicked = deck[Math.floor(Math.random()*deck.length)];
    var cardToBeRemoved = deck.indexOf(cardPicked);
    deck.splice(cardToBeRemoved, 1);
    if(dealersCards.length == playersCards.length){
        playersCards.push(cardPicked);
        $("#playersCards").empty();
    for(let i =0; i < playersCards.length; i++){
        $("#playersCards").append(`
        <div class="card" style="width: 20%;">
            <div class="card-body text-center">
                <h5 class="card-title" id="playersCard-title-${i}"></h5>
                <h6 class="card-subtitle mb-2 text-muted" id="playerscard-subtitle-${i}"></h6>
                <p class="card-text" id="playersCard-text-${i}"></p>
            </div>
        </div>`)
        $("#playerscard-subtitle-"+i).html(playersCards[i].img);
        $("#playersCard-title-"+i).html(playersCards[i].cardName);
        $("#playersCard-text-"+i).html(playersCards[i].suit); 
    }
    playerScore = getScore(playersCards);
    $("#playerScore").html(getScore(playersCards));
    
    }else if(dealersCards.length < playersCards.length){
        dealersCards.push(cardPicked);
        $("#dealersCards").empty();
    for(let i =0; i < dealersCards.length; i++){
        $("#dealersCards").append(`
        <div class="card" style="width: 20%;">
            <div class="card-body text-center">
                <h5 class="card-title" id="dealerCard-title-${i}"></h5>
                <h6 class="card-subtitle mb-2 text-muted" id="dealercard-subtitle-${i}"></h6>
                <p class="card-text" id="dealerCard-text-${i}"></p>
            </div>
        </div>`)
        $("#dealercard-subtitle-"+i).html(dealersCards[i].img);
        $("#dealerCard-title-"+i).html(dealersCards[i].cardName);
        $("#dealerCard-text-"+i).html(dealersCards[i].suit);
    }
    dealersScore = getScore(dealersCards);
    $("#dealerScore").html(getScore(dealersCards));
    
    }
    if(playerScore > 21){
        $("#playerStatus").append(`
        <div class="alert alert-danger" id="player-alert" role="alert">
        
        </div>`)
        $("#player-alert").html("BUST!")
    }else{
        $("#dealerStatus").append(`
        <div class="alert alert-danger" id="dealer-alert" role="alert">
        
        </div>`)
        $("#dealer-alert").html("BUST! ")
    }
})
  });

function getScore(array){
    let score = 0;
    for(i = 0; i < array.length; i++){
        if(array[i].cardName != "A"){
            score += array[i].value;
        }
        if(array[i].cardName == "A"){
            if((score + 11) < 21){
                score += 11;
            }else if((score + 11) > 21){
                score += 1;
            }
        }
    } return(score);
}