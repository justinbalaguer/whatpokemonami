import React,{useState} from 'react';
import './style/style.scss';

/* axios */
import axios from 'axios';

/* bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Form} from 'react-bootstrap';

/* icons */
import {FaFacebook,FaGithub,FaTwitter} from 'react-icons/fa';

const App = () => {
  const [date, setDate] = useState({
    birthdate: ''
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const {birthdate} = date;
  const [pokedex, setPokedex] = useState({
    pokeName: '',
    pokeImg: ''
  });
  const {pokeName,pokeImg} = pokedex;

  /* functions */
  const convertBirthday = (e) => {
    const {name,value} =  e.target;
    setDate({[name]: value});
  }
  const convertYear = birthdate.split('-')[0].split('').splice(2,3).join('');
  const convertedDate = birthdate.split('-').splice(1,2).reduce((a,b)=>parseInt(a)+parseInt(b),0) + parseInt(convertYear);
  
  const PokemonImage = () => {
    return(
      <img src={pokeImg} alt="pokemon" load={`lazy`} width={`300em`} height={`auto`} />
    );
  }

  const startQuery = async () => {
    setIsDisabled(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokedex/kanto');
      const totalPokemon = response.data.pokemon_entries;
      let pokemon = '';
      totalPokemon.map(pokemonData => {
        if(pokemonData.entry_number===convertedDate) {
          pokemon = pokemonData.pokemon_species.name;
        }
        return pokemon
      })
      await setIsDisabled(false);
      await setPokedex({pokeName: pokemon, pokeImg:`https://pokeres.bastionbot.org/images/pokemon/${convertedDate}.png`});
    } catch (error) {
      console.error(error);
    }
  }

  const reset = () => {
    setPokedex({pokeName:'',pokeImg:''});
  }

  return (
    <div className="App">
      <header>
        <h1>What Pokémon Am I?</h1>
      </header>
      <div className="content">
        {pokeName ? (
          <div className="main">
            <h1 id="pokemon-name">{pokeName}</h1>
            {pokeImg ? <PokemonImage /> : ''}
            <div className="action">
              <Button size="lg" variant="info" id="reset" onClick={reset}>Reset</Button>
            </div>
          </div>
        ) : (
          <div className="main-container">
            <div className="who">
              <img src="https://www.netclipart.com/pp/m/70-704918_pokemon-silhouette-png-whos-that-pokemon-pikachu.png" alt="pikachu silhouette" height={`auto`} width={`200em`}/>
            </div>
            <div className="birthdate-container">
              <span>Enter your birthdate</span>
              <Form.Control size="lg" type="date" id="birthdate" name="birthdate" onChange={convertBirthday} />
            </div>
            <div className="action">
              <Button size="lg" variant="info" id="submit" onClick={startQuery} disabled={isDisabled}>Submit</Button>
            </div>
            <div className="icons">
              <span className="icon"><a href="https://facebook.com/devjstn/" target="_blank" rel="noopener noreferrer"><FaFacebook/></a></span>
              <span className="icon"><a href="https://github.com/justinbalaguer/" target="_blank" rel="noopener noreferrer"><FaGithub/></a></span>
              <span className="icon"><a href="https://twitter.com/devjstn/" target="_blank" rel="noopener noreferrer"><FaTwitter/></a></span>
            </div>
          </div>
        )}
      </div>
      <footer>Made with <span role="img" aria-label="heart emoji">💜</span> by <a href="https://justinbalaguer.github.io/">Justin Balaguer</a></footer>
    </div>
  );
}

export default App;
