'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Login() {


    const router = useRouter();

    const[user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

    const[loading, setLoading] = useState<boolean>(false);

    const onLogin = async() => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/login",user);

            toast.success("User logged in successfully!!");
            console.log("Log in Success : ",res.data);
            router.push("/");

        } catch (error: any) {
            console.log("Error : ",error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

    return (
        <div
            className='
                flex
                flex-col
                justify-center
                items-center
                min-h-screen
                py-2
            '
        >
            <h1
                className='
                    text-4xl
                    font-bold
                '
            >
                {loading ? "Logging in..." : "Log in"}
            </h1>
            <hr />
            <br />
            <label
                htmlFor="email"
                className='
                pb-2
            '
            >
                Email
            </label>
            <input
                type="email"
                id='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='email'
                className='
                    p-2
                    rounded-md
                    text-black
                '
            />
            <br />
            <label
                htmlFor="password"
                className='
                pb-2
            '
            >
                Password
            </label>
            <input
                type="password"
                id='username'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='username'
                className='
                    p-2
                    rounded-md
                    text-black
                '
            />
            <button
                className={`
                    p-2
                    w-36
                    mt-6
                    bg-white
                    text-black
                    rounded-lg
                    cursor-${buttonDisabled ? 'not-allowed' : 'pointer'}
                `}
                disabled={buttonDisabled}
                onClick={onLogin}
            >
                Log in
            </button>
            <Link
                className='
                    mt-6
                    text-blue-600
                '
                href={"/signup"}
            >
                Visit Sign Up Page
            </Link>
        </div>
    )
}

export default Login;
