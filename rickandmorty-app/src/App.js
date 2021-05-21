import "./App.css";
import Bookmarked from "./Bookmarked.js";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Gurke from "./gurke.png";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useSound from "use-sound";
import Getschwifty from "./getschwifty.mp3";

export default function App() {
  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setCharacters((characters) => {
      return [...characters, ...data.results];
    });
    if (data.info && data.info.next) {
      fetchData(data.info.next);
    }
  };

  const [characters, setCharacters] = useState([]);
  const [onlyAliens, setOnlyAliens] = useState([]);
  const [viewOnlyAliens, setViewOnlyAliens] = useState(false);
  const [bookmarkedChars, setBookmarkedChars] = useState(loadFromLocalStorage('favorites') ?? []);

  useEffect(() => {saveToLocalStorage ('favorites', bookmarkedChars)
  }, [bookmarkedChars]) // bei jeder Änderung des [bookmarkedChars] wird die Funktion ausgeführt


  function placeIntoBookmarked(currywurst) {
    const updatedCharacters = characters.filter(
      (character) => character.name !== currywurst.name
    );
    const characterToAdd = characters.find(
      (character) => character.name === currywurst.name
    );
    RenderedGurke.isClicked = !RenderedGurke.isClicked;
    setBookmarkedChars([...bookmarkedChars, characterToAdd]);
    setCharacters(updatedCharacters);
    saveToLocalStorage('favorites', bookmarkedChars);
  }


  function removeFromBookmarked(currywurst) {
    const remainingChars = bookmarkedChars.filter(
      (bookmarkedChar) => bookmarkedChar.name !== currywurst.name
    );
    const returnedChar = bookmarkedChars.find(
      (bookmarkedChar) => bookmarkedChar.name === currywurst.name
    );
    RenderedGurke.isClicked = !RenderedGurke.isClicked;
    setBookmarkedChars(remainingChars);
    setCharacters([returnedChar,...characters])
  }

  
  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
    }
     
  function loadFromLocalStorage(key) {
      try {
        const localData = localStorage.getItem(key);
        return JSON.parse(localData);
      } catch (error) {
        console.error(error);
      }
    }

  function Home() {
    return (
      <>
        <Headline>
          <SchwiftySound />
        </Headline>
        <Filterbuttons>
          <button onClick={showAllCharacters}>Show all characters</button>
          <button onClick={showOnlyAliens}>Show only aliens</button>
        </Filterbuttons>
        <MainSection>
          {charactersOnScreen(viewOnlyAliens ? onlyAliens : characters)}
        </MainSection>
      </>
    );
  }

  const SchwiftySound = () => {
    const [play] = useSound(Getschwifty);
    return <SchwiftyButton onClick={play}>🎵 Get Schwifty!</SchwiftyButton>;
  };

  function showOnlyAliens() {
    setViewOnlyAliens(true);
    const Aliens = characters.filter(
      (character) => character.species === "Alien"
    );
    setOnlyAliens([...Aliens]);
  }

  function showAllCharacters() {
    setViewOnlyAliens(false);
  }

  function charactersOnScreen(card) {
    return card.map((character, index) => (
      <CharacterSection>
        <Character key={index}>
          <CharacterImage
            src={character.image}
            width="200"
            alt={character.name}
          ></CharacterImage>
          <h3>{character.name}</h3>
          <RenderedGurke
            width="60"
            src={Gurke}
            isClicked={bookmarkedChars.some((bookmarkedChar) => bookmarkedChar.name === character.name)}
            onClick={() => placeIntoBookmarked(character)}
            //arrow-function, weil wir mehr als click-events mitgeben wollen
          ></RenderedGurke>
        </Character>
      </CharacterSection>
    ));
  }

  //   function myFunction(element, color) {
  // element.style.color = color; element.style.setProperty("text-decoration", "line-through");
  // }
  function changeColor(RenderedGurke) {}

  return (
    <>
      <Router>
        <div>
          <Headermenu>
            <p>
              <Link to="/" style={{ textDecoration: "none", color: "ivory" }}>
                Home
              </Link>
            </p>
            <p>
              <Link
                to="/bookmarked"
                style={{ textDecoration: "none", color: "ivory" }}
              >
                Bookmarked
              </Link>
            </p>
          </Headermenu>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/bookmarked">
              <Bookmarked bookmarkedChars={bookmarkedChars} onRemoveFromBookmarked={removeFromBookmarked}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>

      <footer>
        <Footermenu>
          <p>© by Vika Brandes, Farah Mansour, Florian Schmidbauer</p>
        </Footermenu>
      </footer>
    </>
  );
}

const SchwiftyButton = styled.button`
  border: none;
  background-color: gold;
  border-radius: 1rem;
  cursor: pointer;
  padding: 1rem;
  font-weight: bold;
  border: 0.1rem solid black;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

const Headermenu = styled.div`
  display: flex;
  background: #8bcf21;
  justify-content: center;
  opacity: 70%;
  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: ivory;
    padding: 0 1rem;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Filterbuttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0rem;

  button {
    background: green;
    border: 0.1rem solid black;
    color: ivory;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
    padding: 1.5rem;
    margin: 1rem;
    opacity: 70%;
    :hover {
      transform: scale(1.2);
    }
  }
`;

const Footermenu = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
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

const MainSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const CharacterSection = styled.section`
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
  top: -2rem;
  opacity: ${(props) => (props.isClicked ? "1" : "0.5")};
  :hover {
    transform: scale(1.5);
  }
`;

const Headline = styled.h2`
  text-align: center;
`;
