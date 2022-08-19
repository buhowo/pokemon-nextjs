import { FC, PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import { Card, Grid, Row, Text } from '@nextui-org/react';

import { SmallPokemon } from '../../interfaces'

interface Props extends PropsWithChildren {
	pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

	const router = useRouter();

	const onClick = () => {
		router.push(`/pokemon/${pokemon.id}`)
	};

	const { id, img, name } = pokemon;
	return (
		<Grid key={name} xs={6} sm={3} md={2} xl={1}>
			<Card isHoverable isPressable onClick={onClick}>
				<Card.Body css={{ padding: 12 }}>
					<Card.Image src={img} width="100%" height={140} />
				</Card.Body>
				<Card.Footer>
					<Row justify='space-between'>
						<Text transform='capitalize'>{name}</Text>
						<Text> #{id}</Text>
					</Row>
				</Card.Footer>
			</Card>
		</Grid>
	)
}
