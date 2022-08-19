import type { NextPage } from 'next';
import { GetStaticProps } from 'next'

import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { pokeApi } from './api';
import { PokemonCard } from '../components/pokemons';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((pokemon: SmallPokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
      </Grid.Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((pokemon: SmallPokemon, index: number) => ({
    ...pokemon,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;