import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
const newDeckURL =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

const Deck = () => {
  const [deskID, setDeskID] = useState(null);
  const [cards, setCards] = useState([]);
  const [remaining, setRemaining] = useState(51);

  useEffect(() => {
    async function loadDeckID() {
      const res = await axios.get(newDeckURL);
      setDeskID(res.data.deck_id);
    }
    loadDeckID();
  }, [setDeskID]);

  async function drawCards() {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deskID}/draw`
    );
    console.log(res);
    setCards(res.data.cards[0]);
    setRemaining(res.data.remaining);
  }

  return (
    <div>
      <h1>remaining cards: {remaining}</h1>
      <h3>Your desk ID is :{deskID ? deskID : "Loading..."}</h3>
      <button onClick={drawCards}>Draw One Card</button>
      <div>
        <Card image={cards.image} value={cards.value} />
      </div>
    </div>
  );
};

export default Deck;
