import Nav from "./components/Nav"
import Footer from "./components/Footer"

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-dscreen flex flex-col items-center justify-between">
			<Nav />
			<main className="align-center flex w-full flex-1 flex-col justify-center bg-primary-bg dark:bg-[#0F172A]">
				{children}
			</main>
			<Footer />
		</div>
	)
}
