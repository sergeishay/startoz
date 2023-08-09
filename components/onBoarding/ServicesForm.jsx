'use client';
import Image from 'next/image';
import { useState, useEffect, useRef, useContext } from 'react';
import { uploadPhoto } from '@/actions/uploadActions';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import axios from "axios";
import { UserContext } from '../../context/UserContext'

const ServicesForm = (selectedRole) => {
  const [files, setFiles] = useState(null);
  const [urlFile, setUrlFile] = useState("");
  const { data: session, status } = useSession();
  const { user, setUser } = useContext(UserContext);

  const [formInput, setFormInput] = useState({
    companyName: '',
    email: "",
    phone: '',
    country: "",
    city: "",
    serviceType: [],
    yearsOfExperience: '',
    experience: '',
    aboutMyService: '',
    companyWebsite: '',
    description: '',
    profilePhoto: '',
    linkedinProfile: '',
    selectedRole: selectedRole,
  });

  const formRef = useRef(null);
  
  useEffect(() => {
    const sessionEmail = session?.user.email
    setFormInput((prev) => ({ ...prev, email: sessionEmail }))
  }, [session])

  const handleInputFile = async (e) => {
    const file = e.target.files[0];
    const urlFormat = URL.createObjectURL(file);
    setFiles(file);
    setUrlFile(urlFormat);
    handleUploadFile(file);
  }

  const handleUploadFile = async (files) => {
    const formData = new FormData();
    formData.append('file', files)
    const res = await uploadPhoto(formData);
    console.log(res)
    if (res.image) {
      setFormInput((prev) => ({ ...prev, profilePhoto: res.image }))
    }
  }
  const hanldeSubmitForm = async (e) => {
    e.preventDefault();
    console.log(formInput);
    const stringifyForm = JSON.stringify(formInput);
    try {
      const response = await axios.post("/api/on-boarding", stringifyForm, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={hanldeSubmitForm} ref={formRef} className="flex flex-col justify-center" >
      <input type="file" name="file" onChange={handleInputFile} />
      <div>
        {urlFile && <Image src={urlFile} alt="image" width={200} height={200} />}
      </div>

      <input name="companyName" value={formInput.companyName} onChange={handleInputChange} placeholder="Company Name" />
      <input name="phone" value={formInput.phone} onChange={handleInputChange} placeholder="Phone" />
      <input name="country" value={formInput.country} onChange={handleInputChange} placeholder="Country" />
      <input name="city" value={formInput.city} onChange={handleInputChange} placeholder="City" />
      {/* serviceType will be a dropdown or multi-select box based on your design */}
      <input name="yearsOfExperience" value={formInput.yearsOfExperience} onChange={handleInputChange} placeholder="Years of Experience" />
      <textarea name="experience" value={formInput.experience} onChange={handleInputChange} placeholder="Experience"></textarea>
      <textarea name="AboutMyService" value={formInput.aboutMyService} onChange={handleInputChange} placeholder="About My Service"></textarea>
      <input name="companyWebsite" value={formInput.companyWebsite} onChange={handleInputChange} placeholder="Company Website" />
      <textarea name="description" value={formInput.description} onChange={handleInputChange} placeholder="Description"></textarea>
      <input name="linkedinProfile" value={formInput.linkedinProfile} onChange={handleInputChange} placeholder="LinkedIn Profile" />

      <button className='bg-sky-400 p-[7px] border-2 border-indigo-600' type="submit">Submit</button>
    </form>
  );

}

export default ServicesForm