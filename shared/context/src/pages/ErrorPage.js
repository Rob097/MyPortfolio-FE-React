import { Link } from "react-router-dom";

const ErrorPage = () => (
    <>
        <main>
            <h1>An error occured</h1>
            <p>Could not find this page</p>
            <Link to="/">Home Page</Link>
        </main>
    </>
)
export default ErrorPage;