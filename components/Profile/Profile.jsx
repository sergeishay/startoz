import React from 'react';
import Image from 'next/image';
const Profile = ({ user, handleEdit, handleDelete }) => {



  console.log(user)

  return (
    <div className="profile w-full flex p-4 flex-row font-poppins bg-white">
      <div className="profile-hero flex flex-row">
        <div className="profile-hero-img rounded-full">
          <Image src={user?.roles.Service.profilePhoto || user?.user.image} width={300} height={300} alt="profile" />
        </div>
        <div className="about-hero flex flex-col justify-center items-start"> 
            <h1 className="text-2xl font-bold underline  underline-offset-2"> {user?.user.username} </h1>
            <p className="text-md text-stone-500" > {user?.roles.Service.email } </p>
            <p className="text-md text-stone-500"> 0{user?.roles.Service.phone } </p>
        </div>
      </div>
    </div>
  )
}

export default Profile