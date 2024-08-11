import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GA | Admin Dashboard',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en">
        <body
          className={`${inter.className} flex gap-5 shadow-lg p-3 h-screen bg-black overflow-hidden`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Sidebar />
            <div className="w-full justify-between flex flex-col z-50">
              <div className="w-full flex justify-between mb-5">
                <div className="flex w-[500px] max-w-sm items-center space-x-2">
                  <Input
                    className="rounded-[12px]"
                    type="text"
                    placeholder="Type something to search..."
                  />
                  <Button className="rounded-[12px]" type="submit">
                    Search
                  </Button>
                </div>
              </div>
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
