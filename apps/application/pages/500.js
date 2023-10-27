import Snack from "@/components/alerts/snack";
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function Custom500({ error }) {

    const router = useRouter();

    let errorMessage;
    if (error) {
        if(typeof error === 'string') {
            errorMessage = error;
        } else {
            errorMessage = error.message || error.cause?.message;
        }
        Snack.error(errorMessage);
    }

    return (
        <div className="absolute w-full flex flex-col items-center justify-center" style={{ minHeight: `calc(100vh - 80px)` }}>
            <h1>500 - Server-side error occurred</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <Link href="/">
                <Button variant="contained" color="primary" size="small" className='rounded-full whitespace-nowrap' >
                    Go to the Home Page
                </Button>
            </Link>
            <Button variant="contained" color="primary" size="small" className='rounded-full whitespace-nowrap mt-4' onClick={() => router.reload()} >
                Reload the page
            </Button>
        </div>
    )
}