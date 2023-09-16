import Snack from '@/components/alerts/snack';
import CoverLayout from '@/layouts/CoverLayout';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ErrorHandler = ({ error }) => {
  const router = useRouter();

  if (error)
    Snack.error(error?.message || error);

  const status = error?.response?.status || Number(error?.name) || 500;

  return (
    <CoverLayout>
      <div className="flex flex-col items-center justify-center w-full" style={{ height: 'calc(100vh - 104px)' }}>
        <h1 className="text-4xl font-bold text-center text-red-500">Something went wrong.</h1>
        {status && <caption className="text-center text-red-500">Status: {status}</caption>}
        <h2 className="text-2xl font-bold text-center text-red-500">Please try again later.</h2>
        <Link href="/">
          <Button variant="contained" color="primary" size="small" className='rounded-full whitespace-nowrap' >
            Go to the Home Page
          </Button>
        </Link>
        <Button variant="contained" color="primary" size="small" className='rounded-full whitespace-nowrap mt-4' onClick={() => router.reload()} >
          Reload the page
        </Button>
      </div>
    </CoverLayout>
  )

}

export default ErrorHandler