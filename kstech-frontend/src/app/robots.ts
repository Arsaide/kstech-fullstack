import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: ['/'],
            },
            {
                userAgent: ['Applebot', 'Bingbot'],
                allow: ['/'],
            },
        ],
        sitemap: 'http://ks-tech.com.ua/sitemap.xml',
    }
}