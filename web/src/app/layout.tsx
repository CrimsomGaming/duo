
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles/global.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  title: 'Duo',
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
