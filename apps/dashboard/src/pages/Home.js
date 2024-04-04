import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';

const Home = () => {

    /* useEffect(() => {
        trackPromise(
            // test promise of 3 seconds:
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            })
        );
    }, []); */

    return (
        <>
            <h1>WELCOME</h1>
        </>
    );
}

export default Home;