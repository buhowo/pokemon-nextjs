import { MinifiedPokemon, Pokemon } from '../interfaces';
import { pokeApi } from '../pages/api';

export const getPokeInfo = async (nameOrId: string): Promise<MinifiedPokemon> => {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return {
        name: data.name,
        sprites: data.sprites,
        id: data.id,
    }
}