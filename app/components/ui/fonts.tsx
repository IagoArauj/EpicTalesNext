import { Noto_Sans, Playfair_Display_SC } from 'next/font/google'

export const noto = Noto_Sans({
  weight: ['200', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap'
})

export const playfair = Playfair_Display_SC({
  weight: ['400'],
  subsets: ['latin'],
  style: 'italic',
})