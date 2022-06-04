const services = [
    {
        url: '/santas',
        auth: false,
        proxy: {
            target: "http://localhost:3002",
            changeOrigin: true,
            pathRewrite: {
                [`^/santas`]: '/',
            },
        }
    }
]

module.exports = services;