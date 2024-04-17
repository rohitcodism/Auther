'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

function SignUp() {

    

    const router = useRouter();

    const[user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

    const[loading, setLoading] = useState<boolean>(false);

    const onSignUp = async() => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup",user);

            toast.success("User registered successfully!!");
            console.log("Sign up Success : ",res.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Error : ",error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
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
                {loading ? "Processing..." : "Sign Up"}
            </h1>
            <hr />
            <br />
            <label 
                htmlFor="username"
                className='
                    pb-2
                '
            >
                Username
            </label>
            <input 
                type="text"
                id='username'
                value={user.username}
                onChange={(e) => setUser({...user,username: e.target.value})}
                placeholder='username'
                className='
                    p-2
                    rounded-md
                    text-black
                '
            />
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
                type="text"
                id='email'
                value={user.email}
                onChange={(e) => setUser({...user,email: e.target.value})}
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
                type="text"
                id='username'
                value={user.password}
                onChange={(e) => setUser({...user,password: e.target.value})}
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
                onClick={onSignUp}
            >
                Sign Up
            </button>
            <Link
                className='
                    mt-6
                    text-blue-600
                '
                href={"/login"}
            >
                Visit Login Page
            </Link>
        </div>
    )
}

export default SignUp;
