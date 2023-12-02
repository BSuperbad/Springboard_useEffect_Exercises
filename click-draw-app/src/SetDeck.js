import React, {useState, useEffect} from "react";
import NewCardForm from "./NewCardForm";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const SetDeck = () => {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    const [shuffle, setShuffle] = useState(null);

    useEffect(() => {
        async function loadNewDeck() {
          try {
            const res = await axios.get(`${BASE_URL}/new/shuffle`);
            setDeck(res.data);
          } catch (error) {
            console.error("Error loading new deck:", error);
          }
        }
        loadNewDeck();
      }, []);


      const draw = async () => {
        try {
          const drawRes = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);
    
          if (drawRes.data.cards.length === 0) {
            setError("Error: no cards remaining!");
          } else {
            setCard(drawRes.data.cards[0]);
            setError(null);
          }
        } catch (error) {
          console.error("Error drawing a card:", error);
        }
      };

      const shuffleDeck = async () => {
        try {
          setShuffle(true);
          const res = await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle`);
          setDeck(res.data);
          setCard(null);
          setError(null);
          setShuffle(false);
        } catch (error) {
          console.error("Error shuffling the deck:", error);
          setShuffle(false);
        }
      };

      return (
        <div>
          <h1>Cards!</h1>
          {card ? <img src={card.image} alt="card" /> : <img src="https://deckofcardsapi.com/static/img/back.png" alt="deck" />}
          {error && <p>{error}</p>}
          <div>
          <NewCardForm draw={draw} />
          <button onClick={shuffleDeck} disabled={shuffle}>
            {shuffle ? "Shuffling Deck..." : "Shuffle Deck"}
          </button>
          </div>
        </div>
      );
    };

 export default SetDeck;

 



//  https://deckofcardsapi.com/api/deck/sovr0a4tfe5o/draw/?count=1