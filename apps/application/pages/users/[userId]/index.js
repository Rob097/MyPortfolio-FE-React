import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router'

const UserHome = (props) => {
    const router = useRouter();

    return (
        <>
            <h1 className='justifyContent mt-4'>User Profile Page</h1>
            <p>{router.query.userId}</p>
        </>
    );
}

export async function getStaticPaths(context) {
    const { locales } = context;
    let paths = [];
    for (const locale of locales) {
        paths.push(
            {
                params: {
                    userId: 'user1'
                },
                locale
            }
        );
        paths.push(
            {
                params: {
                    userId: 'user2'
                },
                locale
            }
        );
    }
    return {
        fallback: false,
        paths
    }
}

export async function getStaticProps(context) {
    // extract the locale identifier from the URL
    const { locale } = context

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default UserHome;