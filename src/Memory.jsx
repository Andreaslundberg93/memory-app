import React, { useState, useEffect } from 'react'
import Card from './Component/card.jsx';

const Memory = () => {

  let first;
  let second;
  const [data, setData] = useState([]);
  let [firstCard, setFirstCard] = useState([]);
  let [secondCard, setSecondCard] = useState([]);

    useEffect(() => {
        getDeck("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

    }, [])

    async function getDeck(url) {
        const res = await fetch(url)
        const data =  await res.json()

        console.log(data);

        const allCards = await fetch (`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`)

        const cardData = await allCards.json()
        const cards = cardData.cards
        console.log(cards)
        combineDecks(cards)
    }


    const combineDecks = (cards) => {
        
        const newDeck = [...cards]; 
        let doubleDeck = newDeck.concat(newDeck); 
    
        doubleDeck = [...doubleDeck].map((cards, i) => ({
          
          ...cards,
          id: i,
          flip: false,
          match: false,
        })); 
        shuffle(doubleDeck); 
      };

      function shuffle(combined) {
        combined.sort(() => Math.random() - 0.5); 
        setData(combined);
      }


      useEffect(() => {
        
        const cardOne = [...firstCard]; 
        const cardTwo = [...secondCard];
    
        cardOne.map((item) => {
          first = item.code; 
        });
        cardTwo.map((item) => {
           second = item.code; 
        });
        if (firstCard.length && secondCard.length === 1) {
          if (first === second) {
            cardOne.map((item) => {
              item.match = true;
            });
            cardTwo.map((item) => {
              item.match = true;
            });
          }
        }
      }, [secondCard]); 

      const handleClick = (code) => {
        
        if (firstCard.length && secondCard.length === 1) {
          setFirstCard([]);
          setSecondCard([]);
        }
        if (firstCard.length === 0) {
        setFirstCard(() => [...firstCard, code]);
        } else if (secondCard.length === 0) {
          setSecondCard(() => [...secondCard, code]); 
        }
      };

    









    return (
        <div className="App">
        <div className="flex">
        {data.map(
          
          (
            item
          ) => (
            <Card
            key={item.id}
              matched={item.match}
              image={item.image}
              flips={firstCard.includes(item) || secondCard.includes(item)}
              onClicked={() => handleClick(item)}/>
          )
        )}
      </div>
    </div>
    )
}

export default Memory

