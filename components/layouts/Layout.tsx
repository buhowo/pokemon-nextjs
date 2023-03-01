import { FC, PropsWithChildren, CSSProperties } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';

interface LayoutProps extends PropsWithChildren {
    title?: string;
}

const origin: string = window?.location?.origin || "";

const mainStyle: CSSProperties = {
    height: '100%',
    padding: '0px 20px',
    width: '100%',
}

export const Layout: FC<LayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Sergio Téllez Ojeda" />
                <meta name="description" content={`Información sobre el pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />

                <meta property="og:title" content={`Información sobre el ${title}`} />
                <meta property="og:description" content={`Esta es la página sobre ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <Navbar />

            <main style={mainStyle}>
                {children}
            </main>
        </>
    )
}
