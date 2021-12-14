import express from 'express';
import { PokemonController } from './controllers/pokemon-controller';

const app = express();
app.use(express.json());
const pokemonController = new PokemonController();

app.post('/pokemon', (req, res) => pokemonController.createPokemon(req, res));
app.get('/pokemon/:nome', (req, res) =>
  pokemonController.getPokemonByName(req, res),
);
app.patch('/pokemon/:nome', (req, res) =>
  pokemonController.updatePokemon(req, res),
);
app.delete('/pokemon/:nome', (req, res) =>
  pokemonController.deletePokemon(req, res),
);
app.get('/pokemon', (req, res) => pokemonController.getAll(req, res));

app.listen(3000, () => {
  console.log('Server iniciado na porta 3000');
});

// GET http://localhost:3000/pokemon/pikachu
// CRUD
