'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function VerifyEmail() {

    // const router = useRouter();

    const[token, setToken] = useState("");

    const[verified, setVerified] = useState(false);

    const[error, setError] = useState(false);

    const verifyUserEmail = async() => {
        try {
            const res = await axios.post("/api/users/verify",token);
            setVerified(true);
            setError(false);

            console.log("User Verified : ",res.data);

            toast.success("User verified successfully");
        } catch (error: any) {
            console.log("Error : ", error.response.data);
            setError(true);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1]

        console.log("URL token : ",urlToken);

        setToken(urlToken || "");

        // const {query} = router;
        // const urlTokenTwo = query.token;


    },[]);

    useEffect(() => {
        setError(false)
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token])

    return (
        <div
            className='
                flex
                flex-col
                min-h-screen
                justify-center
                items-center
                py-2 
                gap-y-6
            '
        >
            <h1
                className='
                    text-white
                    text-4xl
                    font-bold
                    text-center
                '
            >
                Verify Email
            </h1>
            <h2
                className='
                    p-2
                    text-black
                    font-semibold
                    bg-orange-500
                    rounded-md
                '
            >
                {token ? token : "No Token"}
            </h2>
            {verified && (
                <div>
                    <h2>
                        Verified
                    </h2>
                    <Link
                        href={"/login"}
                    >
                        Login
                    </Link>
                </div>
            )}
            {
                error && (
                    <div>
                        <h2>
                            Error!!!
                        </h2>
                    </div>
                )
            }
            {/* <button
                className='
                    bg-indigo-600
                    w-36
                    p-4
                    rounded-lg
                '
            >
                Verify email
            </button> */}
        </div>
    )
}

export default VerifyEmail;
