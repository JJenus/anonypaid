// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	nitro: {
		preset: "vercel", // Ensure this is set correctly
	},
	modules: ["nuxt-swiper", "@nuxt/image"],
	devtools: { enabled: false },
	ssr: true,
	routeRules: {
		// "/": { redirect: "/about-us" },
	},
	image: {
		format: ["webp", "avif", "jpeg", "jpg", "png", "gif"],
		// The screen sizes predefined by `@nuxt/image`:
		screens: {
			xs: 320,
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1200,
			xxl: 1400,
			"2xl": 1536,
		},
	},
	runtimeConfig: {
		BE_API: process.env.BE_API || "https://quiika.alwaysdata.net",
		public: {
			BE_API: process.env.BE_API || "https://quiika.alwaysdata.net",
			APP: "Quiika",
			CLOUD_NAME: "dofakovum",
			CLOUD_KEY: "989922725678128",
			CLOUD_SECRETE: "Vzr0P-RNm2NEtKp1-Dyib33di0E",
			DEFAULT_DP: "https://robohash.org/nftexchaing-user.png",
		},
	},
	devServer: {
		https: {
			key: "./server.key",
			cert: "./server.crt",
		},
	},
	app: {
		head: {
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					name: "twitter:card",
					content:
						"Quiika enables seamless and secure monetary transactions, allowing users to send gifts, transfer funds, and access money effortlessly using the innovative QUID system. Experience fast, reliable, and inclusive financial solutions.",
				},
				{
					name: "twitter:title",
					content: "Quiika - Send and Access Funds Effortlessly",
				},
				{
					name: "twitter:description",
					content:
						"Quiika empowers individuals and businesses to send and receive funds securely and efficiently. With our unique QUID system, you can access your money anytime, anywhere. Join us and experience the future of financial transactions.",
				},
				{
					name: "twitter:image",
					content:
						"https://www.quiika.com/assets/media/logos/quiika-logo.png", // Replace with your actual logo URL
				},
				{
					property: "og:title",
					content: "Quiika - Send and Access Funds Effortlessly",
				},
				{
					property: "og:description",
					content:
						"Quiika is a platform designed to simplify monetary transactions. Send gifts, transfer funds, and access your money securely using the QUID system. Fast, reliable, and built for everyone.",
				},
				{
					property: "og:image",
					content:
						"https://www.quiika.com/assets/media/logos/quiika-logo.png", // Replace with your actual logo URL
				},
				{
					property: "og:url",
					content: "https://www.quiika.com", // Replace with your actual domain
				},
			],
			script: [
				{ src: "/assets/plugins/global/plugins.bundle.js" },
				{ src: "/assets/js/scripts.bundle.js" },
				{
					src: "/assets/plugins/custom/fslightbox/fslightbox.bundle.js",
				},
				// { src: "//code.tidio.co/d0e7onzhw4dwaohrjstabmxkpi16bzz1.js" },
			],

			link: [
				{
					rel: "stylesheet",
					href: "/assets/plugins/global/plugins.bundle.css",
				},
				{
					rel: "stylesheet",
					href: "/assets/css/style.bundle.css",
				},
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/assets/media/favicon/favicon.ico",
				},
				{
					rel: "icon",
					sizes: "16x16",
					type: "image/png",
					href: "/assets/media/favicon/favicon-16x16.png",
				},
				{
					rel: "icon",
					sizes: "192x192",
					type: "image/png",
					href: "/assets/media/favicon/android-chrome-192x192.png",
				},
				{
					rel: "icon",
					sizes: "512x512",
					type: "image/png",
					href: "/assets/media/favicon/android-chrome-512x512.png",
				},
				{
					rel: "apple-touch-icon",
					href: "/assets/media/favicon/apple-touch-icon.png",
				},
				{
					rel: "manifest",
					href: "/assets/media/favicon/site.webmanifest",
				},
			],
		},
	},
});
