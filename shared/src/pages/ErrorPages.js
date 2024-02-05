import { Link } from "react-router-dom";

export const ErrorPage = () => (
    <>
        <main role="alert">
            <h1>An error occured</h1>
            <p>An error occured inside the page</p>
            <Link to="/">Home Page</Link>
        </main>
    </>
)

export const PageNotFound = () => (
    <>  
        <main>
            <h1>An error occured</h1>
            <p>Could not find this page</p>
            <Link to="/">Home Page</Link>
        </main>
    </>
)

export const NotAllowed = () => {
    return <h2>You are not allowed to visit this page.</h2>
}