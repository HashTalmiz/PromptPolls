import Link from 'next/link'

export default function AppLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Link href="/">
          <nav className="text-3xl text-start lg:text-md font-bold p-5">Prompt Polls</nav>
        </Link>
        {children}
      </section>
    )
  }