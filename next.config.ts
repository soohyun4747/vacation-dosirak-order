import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			// 필요하면 추가
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
			},
		],
	},
};

export default nextConfig;
