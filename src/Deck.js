import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const newDeckURL =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

const Deck = () => {
  const [deskID, setDeskID] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadDeckID() {
      const res = await axios.get(newDeckURL);
      setDeskID(res.data.deck_id);
    }
    loadDeckID();
  }, [setDeskID]);

  useEffect(() => {
    console.log(deskID);
    async function loadCards() {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deskID}/draw`
      );
      console.log(res);
      setCards(res.data.cards);
    }
    loadCards();
  }, [setDeskID]);

  return (
    <div>
      <h1>{cards}</h1>
      <h3>Your desk ID is :{deskID ? deskID : "Loading..."}</h3>
    </div>
  );
};

export default Deck;
