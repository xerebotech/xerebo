import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://xerebo.com';
    const lastModified = new Date();

    const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
        { path: '', changeFrequency: 'weekly', priority: 1 },
        { path: '/services/seo', changeFrequency: 'weekly', priority: 0.9 },
        { path: '/services/web-development', changeFrequency: 'weekly', priority: 0.9 },
        { path: '/products/xeo', changeFrequency: 'weekly', priority: 0.9 },
        { path: '/products/xpace', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/products/xocials', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/packages', changeFrequency: 'weekly', priority: 0.9 },
        { path: '/results', changeFrequency: 'weekly', priority: 0.8 },
        { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
        { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
        { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
        { path: '/terms-service', changeFrequency: 'yearly', priority: 0.3 },
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
