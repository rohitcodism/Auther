import React from 'react'

function UserProfile({params} : any) {

    return (
        <div
        className="
        flex
        flex-col
        min-h-screen
        py-2
        justify-center
        items-center
        "
        >
            <h1
                className="
                    font-bold
                    text-3xl
                    text-white
                    py-2
                "
            >
                Welcome to your profile
            </h1>
            <h2
                className="
                font-bold
                text-xl
                text-green-500
                py-2
            "
            >
                {params.id}
            </h2>
        </div>
    )
}

export default UserProfile;
