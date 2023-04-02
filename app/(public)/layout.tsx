import Nav from "./components/Nav"
import Footer from "./components/Footer"

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div>
			<Nav />
			{children}
			<Footer />
		</div>
	)
}
