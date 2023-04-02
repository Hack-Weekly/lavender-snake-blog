import Nav from "./Nav";
import Footer from "./Footer";
import './globals.css';

export const metadata = {
  title: 'Lavander Snake Blog',
  description: 'Team blog for Lavander Snake',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
