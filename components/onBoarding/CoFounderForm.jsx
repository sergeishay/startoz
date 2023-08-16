"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, useContext } from "react";
import { uploadPhoto } from "@/actions/uploadImage";
import { uploadCv } from "@/actions/uploadFile";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Country, State, City } from "country-state-city";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-hot-toast";

const CoFounderForm = ({ selectedRole }) => {
  const lookingToBeOptions = [
    "Other",
    "CEO",
    "CTO",
    "ZBO",
    "Programming",
    "Design",
    "Management",
    "Marketing",
    "Sales",
  ];

  const desiredSectorOptions = [
    "Other",
    "Adtech",
    "Cyber",
    "Edtech",
    "Fintech",
    "Design",
    "Managementtech",
    "Healthtech",
    "Sales",
  ];

  const skillsOptions = [
    "Other",
    "Programming",
    "Design",
    "Management",
    "Marketing",
    "Sales",
  ];

  const [formInput, setFormInput] = useState({
    selectedRole: selectedRole,
    profilePhoto: "",
    phoneNumber: "",
    profession: "",
    lookingToBe: [],
    desiredSectors: [],
    country: "",
    dateOfBirth: null,
    description: "",
    skills: [],
    personalWebsite: "",
    linkedInProfile: "",
    cv: "",
    customLookingToBe: "",
    customSector: "",
    customSkill: "",
  });
  const [files, setFiles] = useState(null);
  const [urlFile, setUrlFile] = useState("");
  const [cv, setCv] = useState(null);
  const [urlCv, setUrlCv] = useState("");
  const { data: session } = useSession();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [showCustomLookingToBeInput, setShowCustomLookingToBeInput] =
    useState(false);
  const [showCustomDesiredSectorInput, setShowCustomDesiredSectorInput] =
    useState(false);
  const [showCustomSkillInput, setShowCustomSkillInput] = useState(false);
  const [customLookingToBe, setCustomLookingToBe] = useState([]); // <-- Add this state
  const [customDesiredSector, setCustomDesiredSector] = useState([]); // <-- Add this state
  const [customSkill, setCustomSkill] = useState([]); // <-- Add this state

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

  const handleInputCv = async (e) => {
    const file = e.target.files[0];
    const urlFormat = URL.createObjectURL(file);
    setCv(file);
    setUrlCv(urlFormat);
    handleUploadCv(file);
  };

  const handleUploadCv = async (files) => {
    const formData = new FormData();
    formData.append("file", files);
    const res = await uploadCv(formData);
    console.log(res);
    if (res.image) {
      setFormInput((prev) => ({ ...prev, cv: res.image }));
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

  const handleDateChange = (date) => {
    setFormInput((prevValues) => ({
      ...prevValues,
      dateOfBirth: date,
    }));
  };

  const handleLookingToBeChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    if (values.includes("Other")) {
      setShowCustomLookingToBeInput(true);
    } else {
      setShowCustomLookingToBeInput(false);
    }
    setFormInput((prevValues) => ({
      ...prevValues,
      lookingToBe: values.filter((val) => val !== "Other"), // Filter out the "Other" option
    }));
  };

  const handleCustomLookingToBeChange = () => {
    if (formInput.customLookingToBe) {
      setCustomLookingToBe([...customLookingToBe, formInput.customLookingToBe]);
      setFormInput((prevValues) => ({
        ...prevValues,
        lookingToBe: [...prevValues.lookingToBe, formInput.customLookingToBe], // Add the custom service type to the list
        customLookingToBe: "", // clear the custom input
      }));
    }
  };

  const handleCustomLookingToBeInputChange = (e) => {
    const { value } = e.target;
    setFormInput((prev) => ({ ...prev, customLookingToBe: value }));
  };

  const handleDesiredSectorChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    if (values.includes("Other")) {
      setShowCustomDesiredSectorInput(true);
    } else {
      setShowCustomDesiredSectorInput(false);
    }
    setFormInput((prevValues) => ({
      ...prevValues,
      desiredSectors: values.filter((val) => val !== "Other"), // Filter out the "Other" option
    }));
  };

  const handleCustomDesiredSectorChange = () => {
    if (formInput.customDesiredSector) {
      setCustomDesiredSector([
        ...customDesiredSector,
        formInput.customDesiredSector,
      ]);
      setFormInput((prevValues) => ({
        ...prevValues,
        desiredSectors: [
          ...prevValues.desiredSectors,
          formInput.customDesiredSector,
        ], // Add the custom service type to the list
        customDesiredSector: "", // clear the custom input
      }));
    }
  };

  const handleCustomSkillInputChange = (e) => {
    const { value } = e.target;
    setFormInput((prev) => ({ ...prev, customskill: value }));
  };

  const handleskillsChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    if (values.includes("Other")) {
      setShowCustomSkillInput(true);
    } else {
      setShowCustomSkillInput(false);
    }
    setFormInput((prevValues) => ({
      ...prevValues,
      skills: values.filter((val) => val !== "Other"), // Filter out the "Other" option
    }));
  };

  const handleCustomSkillChange = () => {
    if (formInput.customSkill) {
      setCustomSkill([...customSkill, formInput.customSkill]);
      setFormInput((prevValues) => ({
        ...prevValues,
        skills: [...prevValues.skills, formInput.customSkill], // Add the custom service type to the list
        customSkill: "", // clear the custom input
      }));
    }
  };

  const handleCustomDesiredSectorInputChange = (e) => {
    const { value } = e.target;
    setFormInput((prev) => ({ ...prev, customDesiredSector: value }));
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
        placeholder="What is your profession"
        name="profession"
        value={formInput.profession}
        onChange={handleInputChange}
      />
      <Select
        isMulti
        placeholder="Looking to be"
        name="lookingToBe"
        options={lookingToBeOptions.map((lookingToBe) => ({
          value: lookingToBe,
          label: lookingToBe,
        }))}
        value={formInput.lookingToBe.map((lookingToBe) => ({
          value: lookingToBe,
          label: lookingToBe,
        }))}
        onChange={handleLookingToBeChange}
      />
      {showCustomLookingToBeInput && (
        <>
          <label>
            Other Looking To Be:
            <input
              placeholder="Add your looking to te"
              type="text"
              name="customLookingToBe"
              value={formInput.customLookingToBe}
              onChange={handleCustomLookingToBeInputChange}
            />
          </label>
          <button type="button" onClick={handleCustomLookingToBeChange}>
            Add Custom Looking To Be
          </button>
        </>
      )}
      <Select
        isMulti
        placeholder="Desired Sector"
        name="desiredSectors"
        options={desiredSectorOptions.map((sector) => ({
          value: sector,
          label: sector,
        }))}
        value={formInput.desiredSectors.map((sector) => ({
          value: sector,
          label: sector,
        }))}
        onChange={handleDesiredSectorChange}
      />
      {showCustomDesiredSectorInput && (
        <>
          <label>
            Other Sector:
            <input
              placeholder="Add your sector"
              type="text"
              name="customDesiredSector"
              value={formInput.customDesiredSector}
              onChange={handleCustomDesiredSectorInputChange}
            />
          </label>
          <button type="button" onClick={handleCustomDesiredSectorChange}>
            Add Custom Sector
          </button>
        </>
      )}
      <Select
        options={Country.getAllCountries()}
        getOptionLabel={(options) => options["name"]}
        value={selectedCountry}
        onChange={(selectedOption) => handleCountryChange(selectedOption)}
      />
      <Select
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => options["name"]}
        value={selectedState}
        onChange={(selectedOption) => handleStateChange(selectedOption)}
      />
      <Select
        options={City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode
        )}
        getOptionLabel={(options) => options["name"]}
        value={selectedCity}
        onChange={(selectedOption) => handleCityChange(selectedOption)}
      />
      <label>
        Date of Birth:
        <DatePicker
          selected={formInput.dateOfBirth}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
        />
      </label>
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
        isMulti
        placeholder="Skill"
        name="skills"
        options={skillsOptions.map((skill) => ({
          value: skill,
          label: skill,
        }))}
        value={formInput.skills.map((skill) => ({
          value: skill,
          label: skill,
        }))}
        onChange={handleskillsChange}
      />
      {showCustomSkillInput && (
        <>
          <label>
            Other skill:
            <input
              placeholder="Add your skill"
              type="text"
              name="customskill"
              value={formInput.customskill}
              onChange={handleCustomSkillInputChange}
            />
          </label>
          <button type="button" onClick={handleCustomSkillChange}>
            Add Custom skill
          </button>
        </>
      )}
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
        placeholder="Personal Website"
        name="personalWebsite"
        value={formInput.personalWebsite}
        onChange={handleInputChange}
      />
      <input
        placeholder="LinkedIn Profile"
        name="linkedInProfile"
        value={formInput.linkedInProfile}
        onChange={handleInputChange}
      />
      <input type="file" name="cv" onChange={handleInputCv} />
      {urlCv && (
        <div>
          <embed src={urlCv} type="application/pdf" width="600" height="400" />
        </div>
      )}
      <button
        className="bg-sky-400 p-[7px] border-2 border-indigo-600"
        type="submit"
      >
        Submit
      </button>{" "}
    </form>
  );
};

export default CoFounderForm;