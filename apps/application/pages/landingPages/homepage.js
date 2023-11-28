import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import projectStyles from './styles/style.module.css'
import styles from './styles/container165.module.css'

const Homepage = () => {

    return (
        <div className={styles['container']}>
            <div className={styles['hero']}>
                <div className={styles['container1']}>
                    <h1 className={styles['text']}>
                        <span className={styles['text01']}>MyPortfolio</span>
                        <br></br>
                        <span>Your Professional</span>
                        <br></br>
                        <span className={styles['text05']}>Journey Unfolded</span>
                    </h1>
                    <span className={styles['text06']}>
                        <span>Not another simple</span>
                        <br></br>
                        <span>project-showcase website.</span>
                    </span>
                    <div className={styles['btn-group']}>
                        <button
                            className={` ${styles['button']} ${projectStyles['button']} `}
                        >
                            Get Started
                        </button>
                        <button
                            className={` ${styles['button1']} ${projectStyles['button']} `}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                <img
                    alt="image"
                    src="/images/landing/image2031407-voi-600h.png"
                    className={styles['image']}
                />
            </div>
        </div>

    );

}

export async function getStaticProps(context) {
    const { locale } = context
    const props = {
        ...(await serverSideTranslations(locale))
    }

    return {
        props
    }

}

export default Homepage;