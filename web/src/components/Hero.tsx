import Image from 'next/image'
import Link from 'next/link'
import Logo from '../assets/nlw-space-time-logo.svg'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image quality={1} src={Logo} alt="NLW SpaceTime" />
      <div className="max-w-[420px] space-y-1">
        <h1 className=" text-5xl font-bold leading-tight tracking-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <Link
        href={'/memories/new'}
        className="flex h-8 w-56 items-center justify-center rounded-full bg-green-500 font-alt text-sm font-bold uppercase text-black transition-colors hover:cursor-pointer "
      >
        CADASTRAR LEMBRANçA
      </Link>
    </div>
  )
}
