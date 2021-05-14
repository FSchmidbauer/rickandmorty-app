import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Gurke from "./gurke.png";
import PropTypes from "prop-types";

export default function App() {
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const [characters, setCharacters] = useState([]);
  const [bookmarkedChars, setBookmarkedChars] = useState([]);

  function placeIntoBookmarked() {
    const characterToAdd = Characters.find(
      (character) => character.name === name
    );
    setBookmarkedChars([characterToAdd, ...bookmarkedChars]);
  }

  // function onSetClicked() {
  //   const clickedGurke = RenderedGurke.find((gurke) => gurke. === id)
  //   clickedGurke.isClicked = !clickedGurke.isClicked
  //   setTobuy(newTobuy) //this function allows me to toggle complete and incomplete
  // }
  // }

  // const [activePage, setactivePage] = useState("Home");
  // const Home = () => <h1>Home</h1>;

  // function renderCharacter({ character }) {
  //   return (
  //     <>
  //       <img src={character.image} alt={character.name} />
  //       <h3>{character.name}</h3>
  //     </>
  //   );
  // }

  return (
    <div>
      <header>
        <Headermenu>
          <p onClick>Home</p>
          <p onClick>Bookmarked</p>
        </Headermenu>
      </header>
      <CharacterSection>
        {characters.map((character, index) => {
          return (
            <Characters>
              <CharacterImage
                src={character.image}
                width="200"
                alt={character.name}
              ></CharacterImage>
              <h3>{character.name}</h3>
              <RenderedGurke
                width="60"
                src={Gurke}
                isClicked="false"
                onClick={placeIntoBookmarked}
              ></RenderedGurke>
            </Characters>
          );
        })}
      </CharacterSection>
      <footer>
        <Footermenu>
          <p>© by Vika Brandes, Farah Mansour, Florian Schmidbauer</p>
        </Footermenu>
      </footer>
    </div>
  );
}

const Headermenu = styled.div`
  display: flex;
  background: #8bcf21;
  justify-content: center;
  margin: 1rem 0;
  opacity: 70%;
  border: 0.2rem solid black;

  p {
    font-weight: bold;
    color: ivory;
    padding: 0 1rem;
    cursor: pointer;
  }
`;

const Footermenu = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #8bcf21;
  justify-content: center;

  p {
    font-weight: bold;
    color: ivory;
    padding: 0 1rem;
    cursor: pointer;
    text-align: center;
    font-size: 0.8rem;
  }
`;

const CharacterSection = styled.section`
  text-align: center;
  padding: 3rem;
  position: relative;
`;

const Characters = styled.section`
  border: 1rem solid black;
`;

const CharacterImage = styled.img`
  border: 1rem solid #8bcf21;
`;

const RenderedGurke = styled.img`
  position: absolute;
  cursor: pointer;
  z-index: 10;

  :hover {
    transform: scale(2);
  }
`;
