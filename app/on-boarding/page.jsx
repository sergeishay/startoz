"use client";

import { useState, useEffect } from "react";
import React from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CoFounderForm from '../../components/onBoarding/CoFounderForm';
// import InvestorForm from './InvestorForm';
// import EntrepreneurForm from './EntrepreneurForm';
// import ProviderForm from './ProviderForm'
import ServicesForm from "@/components/onBoarding/ServicesForm";

const OnBoarding = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Providers services"); // State to store selected role
  const sessionEmail = session?.user.email
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="hero flex flex-col items-center justify-center">
        <h1>Hello {session?.user.name}</h1>
        <h1>Welcome to StartoZ!</h1>
        <p>We Excited to have you here</p>
        <p>
          We are a platform that operates in 4 hats, during the registration
          process you must choose the right profile for you
        </p>
      </div>

      <div>
        <form>
          <input
            type="radio"
            value="Co-founder"
            name="role"
            checked={selectedRole === "Co-founder"}
            onChange={handleRoleChange}
          />{" "}
          Co-founder
          <input
            type="radio"
            value="Investors"
            name="role"
            checked={selectedRole === "Investors"}
            onChange={handleRoleChange}
          />{" "}
          Investors
          <input
            type="radio"
            value="Entrepreneur"
            name="role"
            checked={selectedRole === "Entrepreneur"}
            onChange={handleRoleChange}
          />{" "}
          Entrepreneur
          <input
            type="radio"
            value="Providers services"
            name="role"
            checked={selectedRole === "Providers services"}
            onChange={handleRoleChange}
          />{" "}
          Providers services
        </form>
      </div>

      {/* Display forms here based on the selected role */}
      {selectedRole === 'Co-founder' && <CoFounderForm selectedRole={selectedRole} sessionEmail={sessionEmail} />}
{/* 
       {selectedRole === 'Investors' && <InvestorForm selectedRole={selectedRole} />}
      {selectedRole === 'Entrepreneur' && <EntrepreneurForm selectedRole={selectedRole} />} */}
      {selectedRole === 'Providers services' && <ServicesForm selectedRole={selectedRole} />} 

    </div>
  );
};

export default OnBoarding;
