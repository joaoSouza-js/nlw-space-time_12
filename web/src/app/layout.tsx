import { Metadata } from 'next'
import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import './globals.css'

import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { Profile } from '@/components/Profile'
import { CopyRight } from '@/components/CopyRight'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bai-jamjuree',
})

export const metadata: Metadata = {
  title: 'NLW SpaceTime',
  description:
    'Uma Capsula do Tempo Contruida na com React ,Next.js, TailwindCSS e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-base text-gray-100`}
      >
        <div className="grid min-h-screen grid-cols-2">
          {/* left side */}
          <div className=" relative flex  flex-col items-start justify-between  gap-5 overflow-hidden border-r border-white/10  bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* Sign in */}

            {isAuthenticated ? (
              <Profile />
            ) : (
              <SignIn
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
              />
            )}
            {/* blur */}
            <div className=" absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-600 blur-full" />
            {/* stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            <Hero />

            <CopyRight />
          </div>

          {/* right side */}
          <div className="flex max-h-screen flex-1 flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover  py-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
