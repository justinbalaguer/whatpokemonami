import React,{useState} from 'react';
import './style/style.scss';

/* axios */
import axios from 'axios';

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
      <img src={pokeImg} alt="pokemon" load={`lazy`}/>
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
  return (
    <div className="App">
      <input type="date" id="birthdate" name="birthdate" onChange={convertBirthday} />
      <button type="button" id="submit" onClick={startQuery} disabled={isDisabled}>Submit</button>
      <div>
        <h1 id="pokemon-name">{pokeName}</h1>
        {pokeImg ? <PokemonImage /> : ''}
      </div>
    </div>
  );
}

export default App;
