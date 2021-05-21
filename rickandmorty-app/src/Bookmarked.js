import { useState, useEffect } from "react";
import styled from "styled-components";
import Gurke from "./gurke.png";
import PropTypes from "prop-types";
import App from "./App.js";
import removeFromBookmarked from "./App";

export default function Bookmarked({bookmarkedChars, onRemoveFromBookmarked}) {
 


  return (
   
  <>
  <MainSection>
    <BookmarkedCharSection>
      {bookmarkedChars.map((character) => {
        return (
          <Character>
            <CharacterImage
              src={character.image}
              width="200"
              alt={character.name}
              ></CharacterImage>
            <h3>{character.name}</h3>
            <RenderedGurke
              width="60"
              src={Gurke}
              isClicked={bookmarkedChars.some((bookmarkedChar) => bookmarkedChar.name === character.name)} //arrow-function, weil wir mehr als click-events mitgeben wollen
              onClick={() => onRemoveFromBookmarked(character)}
              ></RenderedGurke>
          </Character>
        );
      })}
    </BookmarkedCharSection>
    </MainSection>
      </>
  );
}


const MainSection = styled.div`
  display: grid;
  margin-top: 1.75rem;
`;

const BookmarkedCharSection = styled.section`
  text-align: center;
  padding: 1rem;
  margin: 0 auto;
  position: relative;
  max-width: 32rem;
`;

const Character = styled.section`
  position: relative;
  align-content: center;
`;

const CharacterImage = styled.img`
  border: 0.4rem solid #8bcf21;
  border-radius: 1rem;
`;

const RenderedGurke = styled.img`
  position: absolute;
  cursor: pointer;
  z-index: 10;
  left: 10rem;
  top: -2.5rem;
  opacity: ${(props) => (props.isClicked ? "1" : "0.5")};
  :hover {
    transform: scale(1.5);
  }
`;
