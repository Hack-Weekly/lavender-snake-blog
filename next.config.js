/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["https://picsum.photos/"], // Lorem Pictures. Replace this later on.
	},
}

module.exports = nextConfig
