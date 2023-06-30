import { StepperStoreProvider } from '../components/Stepper/StepperContext';
import ProfileBuilder from './ProfileBuilder';

const Home = () => {
    return (
        <>
            <StepperStoreProvider>
                <ProfileBuilder />
            </StepperStoreProvider>
        </>
    );
}

export default Home;