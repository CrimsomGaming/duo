
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles/global.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  openGraph: {
    locale: 'pt-br',
    title: 'Duo',
    type: 'website',
    countryName: 'Brasil',
    description: 'Uma Lugar para você encontrar um novo Parceiro para as sua partidas',

  },
  icons: {
    icon: 'http://localhost:3000/icon.svg'
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    }
  },
  category: 'games',
  title:  {
    default: 'Duo',
    template: 'Duo | %s'
  },
  applicationName: 'Duo',
  keywords: [
    'Encontrar jogadores',
    'Jogo online',
    'Comunidade de jogadores',
    'Multiplayer',
    'Matchmaking',
    'Procurar jogadores',
    'Plataforma de jogos',
    'Jogos em equipe',
    'Busca de jogadores',
    'Conexão de jogadores',
    'Amigos de jogo',
    'Lista de amigos',
    'Convites para jogar',
    'Atividades em grupo',
    'Perfis de jogadores',
    'Nível de habilidade',
    'Preferências de jogo',
    'Grupo de jogos'
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  creator: 'João Souza',
  robots: {
    index: true,
    follow: false,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  description: 'Uma Lugar para você encontrar um novo Parceiro para as sua partidas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br"  className={`${inter.variable}`}>
      <body className={`${inter.variable} px-5   bg-gray900 bg-galaxy bg-cover bg-no-repeat `}>
        <div className='  mx-auto ' >
          {children}
        </div>
      </body>
    </html>
  )
}
