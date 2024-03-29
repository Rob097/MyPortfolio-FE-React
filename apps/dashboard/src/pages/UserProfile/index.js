import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();

    // redirect to "${root}/profile/setup":
    useEffect(() => {
        navigate('/dashboard/profile/setup', { replace: true });
    }, []);

    return (
        <>
            <h1>This is the user Profile</h1>
        </>
    )
}

export default UserProfile;