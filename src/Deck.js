import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
const newDeckURL =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

const Deck = () => {
  const [deskID, setDeskID] = useState(null); //declare desk id
  const [cards, setCards] = useState([]); // declare cards
  const [remaining, setRemaining] = useState(51); // declare how many remaining
  const [autoDraw, setAutoDraw] = useState(false); //autodraw set up
  const timerId = useRef(); /*timer id*/

  /*we call api and get deck id */
  useEffect(() => {
    async function loadDeckID() {
      const res = await axios.get(newDeckURL);
      setDeskID(res.data.deck_id);
    }
    loadDeckID();
  }, []);

  /*we get the cards when click the button*/
  async function drawCards() {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deskID}/draw`
    );

    setCards(res.data.cards[0]);
    setRemaining(res.data.remaining);

    if (res.data.remaining === 0) {
      setAutoDraw(false);
      throw new Error("no cards remaining!");
    }
  }
  /*toggle auto Draw*/
  const toggleAutoDraw = () => {
    setAutoDraw((auto) => !auto);
  };

  useEffect(() => {
    if (autoDraw && !timerId.current) {
      timerId.current = setInterval(() => {
        drawCards();
      }, 1000);
    }

    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
    };
  }, [autoDraw]);

  return (
    <div>
      <h1>remaining cards: {remaining}</h1>
      <h3>Your desk ID is :{deskID ? deskID : "Loading..."}</h3>
      <button onClick={drawCards}>Draw One Card</button>
      <div>
        <button onClick={toggleAutoDraw}>
          {autoDraw ? "stop" : "start"} auto drawing!
        </button>
      </div>
      <div>
        <Card image={cards.image} value={cards.value} />
      </div>
    </div>
  );
};

export default Deck;
