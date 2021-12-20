import express from 'express';
import { PokemonController } from './controllers/pokemon-controller';

const app = express();
app.use(express.json());
const pokemonController = new PokemonController();

app.post('/pokemon', async (req, res) =>
  pokemonController.createPokemon(req, res),
);
app.get('/pokemon/:nome', async (req, res) =>
  pokemonController.getPokemonByName(req, res),
);
app.patch('/pokemon/:id', async (req, res) =>
  pokemonController.updatePokemon(req, res),
);
app.delete('/pokemon/:id', async (req, res) =>
  pokemonController.deletePokemon(req, res),
);
app.get('/pokemon', async (req, res) => pokemonController.getAll(req, res));

app.listen(3000, () => {
  console.log('Server iniciado na porta 3000');
});

// GET http://localhost:3000/pokemon/pikachu
// CRUD
