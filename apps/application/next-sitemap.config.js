const protocol = 'https';
const domain = 'my-portfolio.it';
const url = `${protocol}://${domain}`;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: url,
    generateRobotsTxt: true, // (optional)
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 100,
    generateRobotsTxt: true,
    // exclude all the pages which will be instead loaded by the server
    exclude: ['/**'],
    robotsTxtOptions: {
        additionalSitemaps: [
            url + '/server-sitemap.xml', // <==== Add here
        ],
    },
    alternateRefs: [
        {
            href: url + '',
            hreflang: 'en',
        },
        {
            href: url + '/it',
            hreflang: 'it',
        },
    ],
}