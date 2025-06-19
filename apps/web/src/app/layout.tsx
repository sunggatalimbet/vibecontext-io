import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'vibecontext.io',
  description:
    'Generate context based on your idea and use it in your projects',
}

const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Variable.ttf',
      weight: '400 700',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-VariableItalic.ttf',
      weight: '400 700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${satoshi.variable} ${ibmPlexSans.variable}`}
      suppressHydrationWarning
    >
      <body className={`antialiased ${ibmPlexSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
