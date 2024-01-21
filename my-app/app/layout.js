import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "군적금 계산기",
  description: "군적금 만기 수령액을 계산해주는 사이트입니다.",
  icons: {
    icon: './favicon.ico',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
