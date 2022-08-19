import { useState, useEffect } from 'react';

import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemons';

const FavoritesPage = () => {
	const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

	useEffect(() => {
		setFavoritePokemons(localFavorites.pokemons);
	}, [])

	return (
		<Layout title='Pokémons favoritos'>
			{
				favoritePokemons.length === 0 ? <NoFavorites /> : <FavoritePokemons pokemons={favoritePokemons} />
			}
		</Layout>
	)
}

export default FavoritesPage;