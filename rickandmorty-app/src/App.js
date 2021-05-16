import "./App.css";
import Bookmarked from "./Bookmarked.js";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Gurke from "./gurke.png";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setCharacters((_characters) => {
      return [..._characters, ...data.results];
    });
    if (data.info && data.info.next) {
      fetchData(data.info.next);
    }
  };

  // function showHome() {
  //   characters.map((character) => {
  //     return (
  //       <Character>
  //         <CharacterImage
  //           src={character.image}
  //           width="200"
  //           alt={character.name}
  //         ></CharacterImage>
  //         <h3>{character.name}</h3>
  //         <RenderedGurke
  //           width="60"
  //           src={Gurke}
  //           isClicked="false"
  //           onClick={() => placeIntoBookmarked(character)}
  //         ></RenderedGurke>
  //       </Character>
  //     );
  //   });
  // }

  function showBookmarked() {}

  const [characters, setCharacters] = useState([]);
  const [onlyAliens, setOnlyAliens] = useState([]);
  const [viewOnlyAliens, setViewOnlyAliens] = useState(false);

  const [bookmarkedChars, setBookmarkedChars] = useState([]);

  // function showAllCharacters() {
  //   const completeChars = characters.slice(characters);
  //   setAllChars([...allChars, completeChars]);
  // }

  function Home() {
    return <h2>Get schwifty!</h2>;
  }

  function placeIntoBookmarked(currywurst) {
    const characterToAdd = characters.find(
      (character) => character.name === currywurst.name
    );
    setBookmarkedChars([...bookmarkedChars, characterToAdd]);
  }

  function showOnlyAliens() {
    setViewOnlyAliens(true);
    const Aliens = characters.filter(
      (character) => character.species === "Alien"
    );
    setOnlyAliens([...Aliens]);
    // return (
    //   <OnlyHumanSection>
    //     <Character>
    //       <CharacterImage
    //         src={character.image}
    //         width="200"
    //         alt={character.name}
    //       ></CharacterImage>
    //       <h3>{character.name}</h3>
    //       <RenderedGurke
    //         width="60"
    //         src={Gurke}
    //         isClicked="false" //arrow-function, weil wir mehr als click-events mitgeben wollen
    //       ></RenderedGurke>
    //     </Character>
    //   </OnlyHumanSection>
    // );
    // const newHuman = characters.filter(
    //   (character) => character.species === "Human"
    // );
    // setOnlyHumans([...onlyHumans, newHuman]);
  }

  function showAllCharacters() {
    setViewOnlyAliens(false);
    // const newHuman = characters.filter(
    //   (character) => character.species === "Human"
    // );
    // setOnlyHumans([...onlyHumans, newHuman]);
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
            isClicked="false"
            onClick={() => placeIntoBookmarked(character)} //arrow-function, weil wir mehr als click-events mitgeben wollen
          ></RenderedGurke>
        </Character>
      </CharacterSection>
    ));
  }

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/bookmarked">Bookmarked</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/bookmarked">
              <Bookmarked />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <Filterbuttons>
        <button onClick={showAllCharacters}>Show all characters</button>
        <button onClick={showOnlyAliens}>Show only aliens</button>
      </Filterbuttons>
      <MainSection>
        {charactersOnScreen(viewOnlyAliens ? onlyAliens : characters)}
        {/* <CharacterSection>
          {characters.map((character) => {
            //character ist der gleiche wie Zeile 116
            return (
              <Character key={character.id}>
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
                  onClick={() => placeIntoBookmarked(character)} //arrow-function, weil wir mehr als click-events mitgeben wollen
                ></RenderedGurke>
              </Character>
            );
          })}
        </CharacterSection>
        <OnlyHumanSection>
          {onlyHumans.map((character) => {
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
                  isClicked="false" //arrow-function, weil wir mehr als click-events mitgeben wollen
                ></RenderedGurke>
              </Character>
            );
          })}
        </OnlyHumanSection>
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
                  isClicked="false" //arrow-function, weil wir mehr als click-events mitgeben wollen
                ></RenderedGurke>
              </Character>
            );
          })}
        </BookmarkedCharSection> */}
      </MainSection>
      <footer>
        <Footermenu>
          <p>© by Vika Brandes, Farah Mansour, Florian Schmidbauer</p>
        </Footermenu>
      </footer>
    </>
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
    font-size: 1.5rem;
    font-weight: bold;
    color: ivory;
    padding: 0 1rem;
    cursor: pointer;
  }
`;

const Filterbuttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0rem;

  button {
    background: green;
    border: 0.2rem solid black;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: bold;
    padding: 1.5rem;
    margin: 1rem;
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

const BookmarkedCharSection = styled.section`
  background-color: skyblue;
  text-align: center;
  padding: 3rem;
  margin: 0 auto;
  width: 32rem;
  position: relative;
  max-width: 32rem;
`;

const OnlyHumanSection = styled.section`
  background-color: red;
  text-align: center;
  padding: 3rem;
  margin: 0 auto;
  width: 32rem;
  position: relative;
  max-width: 32rem;
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
  opacity: 50%;
  :hover {
    transform: scale(1.5);
  }
  :active {
    opacity: 100%;
  }
`;
