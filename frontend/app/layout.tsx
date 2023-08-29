import './globals.css';
import Footer from './components/Footer/index';


export const metadata = {
  title: 'Prompt Polls',
  description: 'A Quick way to start anonymous poll, without signing up or logging in.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
