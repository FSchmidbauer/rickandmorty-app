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


 // meine Änderungen
  /* const [characters, setCharacters] = useState([]);
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
  }; */

  // bis hierhin

  function showHome() {
    characters.map((character) => {
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
            isClicked="false"
            onClick={() => placeIntoBookmarked(character)}
          ></RenderedGurke>
        </Character>
      );
    })
  }  

  function  showBookmarked() {

  }  
 

const [characters, setCharacters] = useState([])
  const [bookmarkedChars, setBookmarkedChars] = useState([]);

  function placeIntoBookmarked(currywurst) {
    const characterToAdd = characters.find(
      (character) => character.name === currywurst.name
    );
    setBookmarkedChars([characterToAdd, ...bookmarkedChars]);
  }
 


  const [activePage, setactivePage] = useState("Home");
  const Home = () => <h1>Home</h1>;


  return (

<div className="App">
<Headernavigation onChangeToPage={setActivePage} />
<main>
  {activePage === "Home" ? (
    <Home />
  ) : ( 
    <Characters characters={characters} />
  )}
</main>

</div>
    
    <div>
      
        <Headermenu onChangeToPage={setActivePage}>
         {/*  <p onClick={showHome()}>Home</p>
          <p onClick={showBookmarked()}>Bookmarked</p> */}
        </Headermenu>
      
      <CharacterSection>

      </CharacterSection>
          {/*{characters.map((character) => { //character ist der gleiche wie Zeile 116
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
                isClicked="false"
                onClick={() => placeIntoBookmarked(character)} //arrow-function, weil wir mehr als click-events mitgeben wollen
              ></RenderedGurke>
            </Character>
          );
        })} 
      </CharacterSection>
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
                isClicked="false"
                onClick={() => placeIntoBookmarked(character)} //arrow-function, weil wir mehr als click-events mitgeben wollen
              ></RenderedGurke>
            </Character>
          );
        })} 
</BookmarkedCharSection> */}
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
  background: #8BCF21;
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
  background: #8BCF21;
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

const BookmarkedCharSection = styled.section`
background-color: skyblue;
  text-align: center;
  padding: 3rem;
  margin: 0 auto;
  position: relative;
  max-width: 32rem;
`;


const CharacterSection = styled.section`
  text-align: center;
  padding: 3rem;
  margin: 0 auto;
  position: relative;
  max-width: 32rem;
`;


const Character = styled.section`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-content: center;
`;

const CharacterImage = styled.img`
  border: 1rem solid #8BCF21;
`;

const RenderedGurke = styled.img`
  position: absolute;
  cursor: pointer;
  z-index: 10;
  left: 17rem;
  top: -3rem;
  opacity: 50%;
  :hover {
    transform: scale(2);
  }
  :active{
    opacity: 100%;
  }
`;