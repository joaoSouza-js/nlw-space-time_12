import { getUser } from '@/libs/auth'
import Image from 'next/image'

export function Profile() {
  const user = getUser()

  const [firstName, secondName] = user.name.split(' ')

  return (
    <div className="t flex items-center gap-3 text-left">
      <Image
        quality={1}
        alt=""
        src={user.avatarUrl}
        width={40}
        height={40}
        className="h-10 h-10 rounded-full"
      />
      <p className="max-w-[140px] text-sm leading-snug">
        {firstName} {secondName}
        <a
          href="/api/auth/logout"
          className="block cursor-pointer text-red-400 underline hover:text-red-400"
        >
          Quero Sair
        </a>
      </p>
    </div>
  )
}
