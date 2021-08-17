module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  env:{
    backendURL: 'https://serene-waters-86119.herokuapp.com/',
    frontendURL: 'https://goomersend-cliente.vercel.app/'
}
}
