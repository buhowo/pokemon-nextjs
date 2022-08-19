import { CSSProperties } from 'react';
import NextLink from 'next/link';
import { Link as Link, Spacer, Text, useTheme, Image } from '@nextui-org/react';

export const Navbar = () => {
    const { theme } = useTheme();

    const navbarStyle: CSSProperties = {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: theme?.colors.neutralShadow.value,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: '0px 20px',
        width: '100%',
    };

    return (
        <nav style={navbarStyle}>
            <Image
                alt='Pokemon Page'
                src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"}
                width={70}
                height={70}
            />
            <NextLink href='/' passHref>    
                <Link>
                    <Text color='white' h2>P</Text>
                    <Text color='white' h3>okémon</Text>
                </Link>
            </NextLink>

            <Spacer css={{ flex: 1 }} />

            <NextLink href='/favorites' passHref>
                <Link>
                    <Text color='primary'>Favoritos</Text>
                </Link>
            </NextLink>
        </nav>
    );
};
