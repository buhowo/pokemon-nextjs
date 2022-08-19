import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { pokeApi } from '../api';
import { Layout } from '../../components/layouts';
import { MinifiedPokemon, Pokemon } from '../../interfaces';
import { localFavorites } from '../../utils';

interface Props {
	pokemon: MinifiedPokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
	const { name, sprites, id } = pokemon;

	const [isInFavorites, setIsInFavorites] = useState<boolean>(false);

	const onToggleFavorites = () => {
		localFavorites.toggleFavorites(id);
		setIsInFavorites(!isInFavorites);

		if(isInFavorites) return;

		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 160,
			angle: -100,
			origin: {
				x: 0.5, 
				y: 0,
			}
		})
	}


	useEffect(() => {
		setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
	}, [pokemon.id])

	return (
		<Layout title={`${name.toLocaleUpperCase()}`}>
			<Grid.Container css={{ marginTop: '4px' }} gap={2} >
				<Grid xs={12} sm={4} >
					<Card isHoverable isPressable css={{ padding: '16px' }}>
						<Card.Body>
							<Card.Image
								src={sprites.other?.dream_world.front_default || '/no-image.png'}
								alt={name}
								width="100%"
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card css={{ padding: "8px 12px" }}>
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text h1 transform='capitalize'>{name}</Text>
							<Button
								color='gradient'
								ghost={!isInFavorites}
								onPress={onToggleFavorites}
							>
								{isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
							</Button>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction='row' display='flex'>
								<Image
									src={sprites.front_default}
									alt={name}
									width={156}
									height={156}
								/>
								<Image
									src={sprites.back_default}
									alt={name}
									width={156}
									height={156}
								/>
								<Image
									src={sprites.front_shiny}
									alt={name}
									width={156}
									height={156}
								/>
								<Image
									src={sprites.back_shiny}
									alt={name}
									width={156}
									height={156}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const pokemons151: string[] = [...Array(151)].map((_, id) => `${id + 1}`);

	return {
		paths: pokemons151.map(id => ({ params: { id } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

	const { id } = params as { id: string };
	const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
	const pokemon: MinifiedPokemon = {
		name: data.name,
		sprites: data.sprites,
		id: data.id,
	};

	return {
		props: {
			pokemon
		}
	};
};


export default PokemonPage;
