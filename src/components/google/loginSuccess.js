import React, { useEffect } from 'react';

export function LoginSuccess() {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 1000);
    }, []);
    return <div>Login Successful</div>;
}

export function LoginFailure() {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 1000);
    }, []);
    return <div>Login Failure</div>;
}