'use client';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from "next/navigation"
import Profile from '../../components/Profile/Profile';

import React from 'react'

const ProfilePage = () => {

  const handleEdit = () => {}


  const handleDelete = async () => {}




  return (
    <div>
      <Profile
      name="John Doe"
      email=""
      data={[]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default ProfilePage