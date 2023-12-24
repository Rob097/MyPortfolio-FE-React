import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';

import { Sort, View } from '@/models/criteria.model';
import { UserQ } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService from '@/services/user.service';

type Changefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
const changefreq: Changefreq = 'weekly';

const protocol = 'https';
const domain = 'my-portfolio.it';
const url = `${protocol}://${domain}`;

const englishSubPath = '';
const italianSubPath = '/it';
const i18nPaths = [englishSubPath, italianSubPath];

const generatePaths = (priority: number = 1, entities: any[], entityPath: string, entitySlug?: string) => {
    return i18nPaths.flatMap((i18nPath) =>
        entities.flatMap((entity) => {
            const slugs = entitySlug ? entity[entitySlug]?.map((e) => '/' + e.slug) : [''];
            return slugs.map((slug) => ({
                loc: `${url}${i18nPath}/users/${entity.slug}/${entityPath}${slug}`,
                lastmod: new Date().toISOString(),
                changefreq: changefreq,
                priority: priority,
            }));
        })
    );
};

const generateStoriesPaths = (priority: number = 1, users: any[], entityType: string) => {
    return i18nPaths.flatMap((i18nPath) =>
        users.flatMap((user) => {
            const entities = user[entityType];
            return entities.flatMap((entity) => {
                const stories = entity.stories;
                return stories.map((story) => ({
                    loc: `${url}${i18nPath}/users/${user.slug}/diary/${entityType}/${entity.slug}/${story.slug}`,
                    lastmod: new Date().toISOString(),
                    changefreq: changefreq,
                    priority: priority,
                }));
            });
        })
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const usersFilters = new UserQ(null, View.verbose, 0, 1000, new Sort(UserQ.createdAt, 'DESC'));
    const usersCriteria = UserService.getByCriteriaUrl(usersFilters);
    const usersResponse = await fetcher(usersCriteria, true);
    const users = usersResponse?.content;

    const usersPaths = generatePaths(0.9, users, 'home');
    const usersDiariesPaths = generatePaths(0.9, users, 'diary');
    const usersProjectsPaths = generatePaths(0.8, users, 'diary/projects');
    const usersExperiencesPaths = generatePaths(0.8, users, 'diary/experiences');
    const usersEducationsPaths = generatePaths(0.8, users, 'diary/educations');
    const usersProjectsPaths2 = generatePaths(0.7, users, 'diary/projects', 'projects');
    const usersExperiencesPaths2 = generatePaths(0.7, users, 'diary/experiences', 'experiences');
    const usersEducationsPaths2 = generatePaths(0.7, users, 'diary/educations', 'educations');
    const usersProjectsStoriesPaths = generateStoriesPaths(0.6, users, 'projects');
    const usersExperiencesStoriesPaths = generateStoriesPaths(0.6, users, 'experiences');
    const usersEducationsStoriesPaths = generateStoriesPaths(0.6, users, 'educations');

    // Add all users, projects, experiences, educations, and stories
    const fields = [
        {
            loc: `${url}`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/it`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/explore/people`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/it/explore/people`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/register`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/it/register`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/support`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/it/support`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/contact-us`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/it/contact-us`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        ...usersPaths,
        ...usersDiariesPaths,
        ...usersProjectsPaths,
        ...usersExperiencesPaths,
        ...usersEducationsPaths,
        ...usersProjectsPaths2,
        ...usersExperiencesPaths2,
        ...usersEducationsPaths2,
        ...usersProjectsStoriesPaths,
        ...usersExperiencesStoriesPaths,
        ...usersEducationsStoriesPaths,
    ];

    return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() { }