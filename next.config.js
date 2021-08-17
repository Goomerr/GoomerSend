module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  env:{
    backendURL: 'https://goomersendservidor.herokuapp.com',
    frontendURL: 'https://goomersend-cliente.vercel.app/'
}
}
