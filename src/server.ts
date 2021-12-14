import express from 'express';
import { PokemonController } from './controllers/pokemon-controller';

const app = express();
app.use(express.json());
const pokemonController = new PokemonController();

app.post('/pokemon', (req, res) => pokemonController.createPokemon(req, res));

app.listen(3000, () => {
  console.log('Server iniciado na porta 3000');
});
