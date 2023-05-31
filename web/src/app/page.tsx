import Image from 'next/image'
import Link from 'next/link'
import '../styles/global.css'

export default function Home() {
  return (
    <div>
      <h1></h1>
      <a href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify`}>entra com o dicord</a>
      
    </div>
  )
}
//https://discord.com/api/oauth2/authorize?client_id=1113183944431644672&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2Findex.html&response_type=code&scope=identify