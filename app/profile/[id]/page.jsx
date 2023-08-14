'use client';
import { useState, useEffect, useContext } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from "next/navigation"
import Profile from '../../../components/Profile/Profile';
import { UserContext } from '@/context/UserContext';
import React from 'react'

const ProfilePageByMail = () => {

  const handleEdit = () => {}
  const { user, setUser } = useContext(UserContext);
  console.log(user)

  const handleDelete = async () => {}




  return (
    <div>
      <Profile
      name="John Doe"
      email=""
      data={[]}
      user={user}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default ProfilePageByMail