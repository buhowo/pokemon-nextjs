import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import { pokeApi } from '../api';
import { Layout } from '../../components/layouts';
import { MinifiedPokemon, Pokemon } from '../../interfaces';

interface Props {
	pokemon: MinifiedPokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

	const { name, sprites } = pokemon;

	return (
		<Layout title={`${name.toLocaleUpperCase()}`}>
			<Grid.Container css={{ marginTop: '4px' }} gap={2}>
				<Grid xs={12} sm={4} >
					<Card isHoverable css={{ padding: '16px' }}>
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
					<Card css={{padding: "8px 12px"}}>
						<Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
							<Text h1 transform='capitalize'>{name}</Text>
							<Button color={'gradient'} ghost>
								Guardar en favoritos
							</Button>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction='row' display='flex'>
								<Image 
									src={sprites.front_default}
									alt={name}
									width={100}
									height={100}
								/>
								<Image 
									src={sprites.back_default}
									alt={name}
									width={100}
									height={100}
								/>
								<Image 
									src={sprites.front_shiny}
									alt={name}
									width={100}
									height={100}
								/>
								<Image 
									src={sprites.back_shiny}
									alt={name}
									width={100}
									height={100}
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
		sprites: data.sprites
	};	

	return {
		props: {
			pokemon
		}
	};
};


export default PokemonPage;
