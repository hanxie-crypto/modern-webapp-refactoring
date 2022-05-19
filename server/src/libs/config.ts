const baseHosts = {
  // development
  development: {
    baseHost: 'http://localhost:3000/',
    uploadPath: './public/',
    domain: 'www.giibee.com',
  },

  // production
  production: {
    baseHost: process.env.apiDomain|| '',
    uploadPath: process.env.staticPath || './public',
    domain: process.env.domain,
  },
};

export { baseHosts };
