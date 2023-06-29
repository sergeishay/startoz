"use client";

import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import { toast } from "react-hot-toast";

const CoFounderForm = ({ selectedRole, sessionEmail }) => {
  // console.log(sessionEmail)
  const [formValues, setFormValues] = useState({
    sessionEmail: sessionEmail || '' ,
    selectedRole,
    phoneNumber: "",
    profession: "",
    lookingToBe: [],
    desiredSectors: [],
    country: "",
    // city: "",
    dateOfBirth: null,
    aboutMe: "",
    experience: "",
    skills: [],
    personalWeb: "",
    linkedInProfileLink: "",
    // cv: null,
    customLookingToBe: "",
    customSector: "",
    customSkill: "",
  });

  const countryOptions = countryList().getData();

  const handleLookingToBe = (selectedOptions) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      lookingToBe: selectedOptions || [],
    }));
  };

  const handleDesiredSectorsChange = (selectedOptions) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      desiredSectors: selectedOptions || [],
    }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      skills: selectedOptions || [],
    }));
  };

  const handleAddCustomRole = () => {
    if (formValues.customLookingToBe) {
      setFormValues((prevValues) => ({
        ...prevValues,
        lookingToBe: [
          ...prevValues.lookingToBe,
          {
            value: formValues.customLookingToBe,
            label: formValues.customLookingToBe,
          },
        ],
        customLookingToBe: "", // clear the custom input
      }));
    }
  };

  const handleAddCustomSector = () => {
    if (formValues.customSector) {
      setFormValues((prevValues) => ({
        ...prevValues,
        desiredSectors: [
          ...prevValues.desiredSectors,
          { value: formValues.customSector, label: formValues.customSector },
        ],
        customSector: "", // clear the custom input
      }));
    }
  };

  const handleAddCustomSkill = () => {
    if (formValues.customSkill) {
      setFormValues((prevValues) => ({
        ...prevValues,
        skills: [
          ...prevValues.skills,
          { value: formValues.customSkill, label: formValues.customSkill },
        ],
        customSkill: "", // clear the custom input
      }));
    }
  };

  const handleCountryChange = (selectedOption) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      country: selectedOption.value,
    }));
  };

  const handleCityChange = (selectedOption) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      city: selectedOption.value,
    }));
  };

  const handleChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      dateOfBirth: date,
    }));
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      cv: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // // Create form data to send files
      const formData = new FormData();
      // formData.append("cv", formValues.cv);

      // Append other form values to the form data
      // Object.keys(formValues).forEach((key) => {
      // if (key !== "cv") {
      // formData.append(key, formValues[key]);
      // }
      // });

      // Print the form data to the console
      console.log("Form data:", formValues);
      // console.log(typeof formData)
      // Send the form data to the server or API endpoint
      const response = await axios.post("/api/on-boarding", formValues);
      // });

      console.log(response);

      // Reset the form values after successful submission
      setFormValues({
        phoneNumber: "",
        profession: "",
        lookingToBe: [],
        desiredSectors: [],
        country: "",
        // city: "",
        dateOfBirth: null,
        aboutMe: "",
        experience: "",
        skills: [],
        personalWeb: "",
        linkedInProfileLink: "",
        // cv: null,
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <div>
      <h2>Co-founder Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Profession:
          <input
            type="text"
            name="profession"
            value={formValues.profession}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Looking to Be:
          <Select
            isMulti
            name="lookingToBe"
            options={[
              { value: "CEO", label: "CEO" },
              { value: "CTO", label: "CTO" },
              { value: "COO", label: "COO" },
              { value: "CFO", label: "CFO" },
              { value: "CMO", label: "CMO" },
              { value: "Other", label: "Other" },
            ]}
            value={formValues.lookingToBe}
            onChange={handleLookingToBe}
          />
        </label>
        {formValues.lookingToBe.some((option) => option.value === "Other") && (
          <div>
            <label>
              Custom Role:
              <input
                type="text"
                name="customLookingToBe"
                value={formValues.customLookingToBe}
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={handleAddCustomRole}>
              Add Custom Role
            </button>
          </div>
        )}
        <br />

        <label>
          Desired Sectors:
          <Select
            isMulti
            name="desiredSectors"
            options={[
              { value: "Adtech", label: "Adtech" },
              { value: "Cyber", label: "Cyber" },
              { value: "Edtech", label: "Edtech" },
              { value: "Fintech", label: "Fintech" },
              { value: "Healthtech", label: "Healthtech" },
              { value: "Other", label: "Other" },
            ]}
            value={formValues.desiredSectors}
            onChange={handleDesiredSectorsChange}
          />
        </label>
        {formValues.desiredSectors.some(
          (option) => option.value === "Other"
        ) && (
          <div>
            <label>
              Custom Sector:
              <input
                type="text"
                name="customSector"
                value={formValues.customSector}
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={handleAddCustomSector}>
              Add Custom Sector
            </button>
          </div>
        )}

        <br />
        <label>
          Country:
          <Select
            options={countryOptions}
            value={countryOptions.find(
              (option) => option.value === formValues.country
            )}
            onChange={handleCountryChange}
          />
        </label>
        {/* <br />
        <label>
          City:
          <Select
            options={
              formValues.country ? cityOptions[formValues.country] || [] : []
            }
            value={formValues.city}
            onChange={handleCityChange}
            isDisabled={!formValues.country}
          />
        </label> */}
        <br />
        <label>
          Date of Birth:
          <DatePicker
            selected={formValues.dateOfBirth}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
          />
        </label>
        <br />
        <label>
          About Me:
          <textarea
            name="aboutMe"
            value={formValues.aboutMe}
            onChange={handleChange}
            rows={4}
            maxLength={1000}
          />
        </label>
        <br />
        <label>
          Experience:
          <textarea
            name="experience"
            value={formValues.experience}
            onChange={handleChange}
            rows={4}
          />
        </label>
        <br />
        <label>
          Skills:
          <Select
            isMulti
            name="skills"
            options={[
              { value: "Programming", label: "Programming" },
              { value: "Design", label: "Design" },
              { value: "Management", label: "Management" },
              { value: "Marketing", label: "Marketing" },
              { value: "Sales", label: "Sales" },
              { value: "Other", label: "Other" },
            ]}
            value={formValues.skills}
            onChange={handleSkillsChange}
          />
        </label>
        {formValues.skills.some((option) => option.value === "Other") && (
          <div>
            <label>
              Other Skills:
              <input
                type="text"
                name="customSkill"
                value={formValues.customSkill}
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={handleAddCustomSkill}>
              Add Custom Skill
            </button>
          </div>
        )}
        <br />
        <label>
          Personal Website:
          <input
            type="text"
            name="personalWeb"
            value={formValues.personalWeb}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          LinkedIn Profile Link:
          <input
            type="text"
            name="linkedInProfileLink"
            value={formValues.linkedInProfileLink}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          C.V:
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleCVUpload}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CoFounderForm;
