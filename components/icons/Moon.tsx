import { SVGProps } from "react"

// heroicons:moon-20-solid
export default function Moon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 20 20"
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7.455 2.004a.75.75 0 0 1 .26.77a7 7 0 0 0 9.958 7.967a.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z"
				clipRule="evenodd"
			></path>
		</svg>
	)
}
