/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@radix-ui/react-dialog',
    'react-remove-scroll',
    'vaul'
  ],
  
  webpack: (config:any) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    };
    return config;
  },
  turbopack:{},
};

module.exports = nextConfig;