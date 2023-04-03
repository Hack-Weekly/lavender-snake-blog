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
			<main className="w-full">{children}</main>
			<Footer />
		</div>
	)
}
