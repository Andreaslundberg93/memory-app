import React from "react";
import "./card.css";
import cardBack from "./Cardback.jpg"


const Card = ({ flips, image, onClicked, matched }) => {
    
    return (
      <div className="cardBox">
        <img
          className="img-size"
          src={flips || matched ? image : cardBack} 
          alt="Playing memory"
          onClick={onClicked}
        />
      </div>
    );
  };
  
  export default Card;