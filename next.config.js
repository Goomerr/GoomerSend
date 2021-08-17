module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  env:{
    backendURL: 'https://git.heroku.com/shielded-plateau-92213.git',
    frontendURL: 'https://goomersend-cliente-9ejxukb3j-goomerr.vercel.app/'
}
}