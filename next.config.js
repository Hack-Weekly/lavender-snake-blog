/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["picsum.photos"], // Lorem Pictures. Replace this later on.
	},
}

module.exports = nextConfig
