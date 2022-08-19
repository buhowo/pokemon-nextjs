import { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid } from '@nextui-org/react';

interface Props extends PropsWithChildren {
    pokemonId: number;
}

export const FavoritePokemonCard: FC<Props> = ({ pokemonId }) => {
	const router = useRouter();

    const onCardPress = () => router.push(`/pokemon/${pokemonId}`);

    return (
        <Grid key={pokemonId} xs={6} sm={3} md={2} xl={1}>
            <Card isHoverable isPressable css={{ padding: '12px' }} onPress={onCardPress}>
                <Card.Image
                    alt='Pokémon image'
                    width="100%"
                    height={140}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                />
            </Card>
        </Grid>
    );
};