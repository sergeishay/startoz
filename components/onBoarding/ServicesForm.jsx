"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, useContext } from "react";
import { uploadPhoto } from "@/actions/uploadImage";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";


const ServicesForm = ({ selectedRole }) => {
  const serviceTypeOptions = [
    "Other",
    "Programming",
    "Design",
    "Management",
    "Marketing",
    "Sales",
  ];

  const [showCustomServiceInput, setShowCustomServiceInput] = useState(false);
  const [customServices, setCustomServices] = useState([]);
  const [files, setFiles] = useState(null);
  const [urlFile, setUrlFile] = useState("");
  const { data: session } = useSession();
  const { user, setUser } = useContext(UserContext);
  const [selectedCompanyType, setSelectedCompanyType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
 
  const [formInput, setFormInput] = useState({
    selectedRole: selectedRole,
    profilePhoto: "",
    companyType: "",
    companyName: "",
    serviceType: [],
    yearsOfExperience: "",
    companyEmail: "",
    companyWebsite: "",
    description: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    linkedinProfile: "",
    customServiceType: "",
  });

  const formRef = useRef(null);

  useEffect(() => {
    const sessionEmail = session?.user.email;
    setFormInput((prev) => ({ ...prev, email: sessionEmail }));
  }, [session]);

  const handleInputFile = async (e) => {
    const file = e.target.files[0];
    const urlFormat = URL.createObjectURL(file);
    setFiles(file);
    setUrlFile(urlFormat);
    handleUploadFile(file);
  };

  const handleUploadFile = async (files) => {
    const formData = new FormData();
    formData.append("file", files);
    const res = await uploadPhoto(formData);
    console.log(res);
    if (res.image) {
      setFormInput((prev) => ({ ...prev, profilePhoto: res.image }));
    }
  };

  const handleSubmitForm = async (e) => {
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

  const handleCompanyTypeChange = (selectedOption) => {
    setSelectedCompanyType(selectedOption.value);
    setFormInput((prevValues) => ({
      ...prevValues,
      companyType: selectedOption.value,
    }));
  };

  const handleCountryChange = (selectedCountry) => {
    console.log(selectedCountry);
    setSelectedCountry(selectedCountry);
    setSelectedState(null);
    setSelectedCity(null);
    setFormInput((prevValues) => ({
      ...prevValues,
      country: selectedCountry.name,
    }));
  };

  const handleStateChange = (selectedState) => {
    setSelectedState(selectedState);
    setSelectedCity(null);
    setFormInput((prevValues) => ({
      ...prevValues,
      state: selectedState.name,
    }));
  };

  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity);
    setFormInput((prevValues) => ({
      ...prevValues,
      city: selectedCity.name,
    }));
  };

  const handleServiceTypeChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    if (values.includes("Other")) {
      setShowCustomServiceInput(true);
    } else {
      setShowCustomServiceInput(false);
    }
    setFormInput((prevValues) => ({
      ...prevValues,
      serviceType: values.filter((val) => val !== "Other"), // Filter out the "Other" option
    }));
  };

  const handleCustomServiceTypeChange = () => {
    if (formInput.customServiceType) {
      setCustomServices([...customServices, formInput.customServiceType]);
      setFormInput((prevValues) => ({
        ...prevValues,
        serviceType: [...prevValues.serviceType, formInput.customServiceType], // Add the custom service type to the list
        customServiceType: "", // clear the custom input
      }));
    }
  };

  const handleCustomServiceTypeInputChange = (e) => {
    const { value } = e.target;
    setFormInput((prev) => ({ ...prev, customServiceType: value }));
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col justify-center">
      <input type="file" name="file" onChange={handleInputFile} />
      <div>
        {urlFile && (
          <Image src={urlFile} alt="image" width={200} height={200} />
        )}
      </div>
      <input
        type="radio"
        value="freelancer"
        name="companyType"
        checked={selectedCompanyType === "freelancer"}
        onChange={(e) => handleCompanyTypeChange({ value: e.target.value })}
      />
      Freelancer
      <input
        type="radio"
        value="company"
        name="companyType"
        checked={selectedCompanyType === "company"}
        onChange={(e) => handleCompanyTypeChange({ value: e.target.value })}
      />{" "}
      Company
      <input
        placeholder="Brand Name"
        name="companyName"
        value={formInput.companyName}
        onChange={handleInputChange}
      />
      <Select
        isMulti
        placeholder="Service Type"
        name="serviceType"
        options={serviceTypeOptions.map((service) => ({
          value: service,
          label: service,
        }))}
        value={formInput.serviceType.map((service) => ({
          value: service,
          label: service,
        }))}
        onChange={handleServiceTypeChange}
      />
      {showCustomServiceInput && (
        <>
          <label>
            Other Service Type:
            <input
              placeholder="Add your service type"
              type="text"
              name="customServiceType"
              value={formInput.customServiceType}
              onChange={handleCustomServiceTypeInputChange}
            />
          </label>
          <button type="button" onClick={handleCustomServiceTypeChange}>
            Add Custom Service Type
          </button>
        </>
      )}
      <input
        placeholder="Years of Experience"
        name="yearsOfExperience"
        value={formInput.yearsOfExperience}
        onChange={handleInputChange}
      />
      <textarea
        placeholder="Description"
        name="description"
        value={formInput.description}
        onChange={handleInputChange}
      ></textarea>
      <Select
        options={Country.getAllCountries()}
        getOptionLabel={(options) => options["name"]}
        // getOptionValue={(options) => options["isoCode"]}
        value={selectedCountry}
        onChange={(selectedOption) => handleCountryChange(selectedOption)}
      />
      <Select
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => options["name"]}
        // getOptionValue={(options) => options["isoCode"]}
        value={selectedState}
        onChange={(selectedOption) => handleStateChange(selectedOption)}
      />
      <Select
        options={City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode
        )}
        getOptionLabel={(options) => options["name"]}
        // getOptionValue={(options) => options["isoCode"]}
        value={selectedCity}
        onChange={(selectedOption) => handleCityChange(selectedOption)}
      />
      <PhoneInput
        placeholder="Enter phone number"
        international
        defaultCountry={selectedCountry?.isoCode}
        value={phoneNumber}
        countryCallingCodeEditable={false}
        onChange={(phone) => {
          setPhoneNumber(phone);
          setFormInput((prev) => ({ ...prev, phone }));
        }}
      />
      <input
        placeholder="Company Email"
        name="companyEmail"
        value={formInput.companyEmail}
        onChange={handleInputChange}
      />
      <input
        placeholder="Company Website"
        name="companyWebsite"
        value={formInput.companyWebsite}
        onChange={handleInputChange}
      />
      <input
        placeholder="LinkedIn Profile"
        name="linkedinProfile"
        value={formInput.linkedinProfile}
        onChange={handleInputChange}
      />
      <button
        className="bg-sky-400 p-[7px] border-2 border-indigo-600"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default ServicesForm;