"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import { toast } from "react-hot-toast";
// import { Storage } from "@google-cloud/storage"; // Import the Storage class from @google-cloud/storage

const CoFounderForm = ({ selectedRole, sessionEmail }) => {
  console.log(sessionEmail); // add this to check the prop value

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sessionEmail: sessionEmail,
    }));
  }, [sessionEmail]);

  const [formValues, setFormValues] = useState({
    sessionEmail: sessionEmail || "",
    selectedRole: selectedRole,
    phoneNumber: "",
    profession: "",
    lookingToBe: [],
    desiredSectors: [],
    country: "",
    dateOfBirth: null,
    aboutMe: "",
    experience: "",
    skills: [],
    personalWeb: "",
    linkedInProfileLink: "",
    cv: null,
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
    console.log(file + " line 121");
    setFormValues((prevValues) => ({
      ...prevValues,
      cv: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (key === "cv" && formValues[key]) {
        formData.append(key, formValues[key], formValues[key].name);
        console.log(formValues[key].name + " line 134");
      } else if (Array.isArray(formValues[key])) {
        formData.append(key, JSON.stringify(formValues[key]));
      } else {
        formData.append(key, formValues[key]);
      }
    });

    // Log FormData values
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios.post("/api/on-boarding", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response + "LINE 162");
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const resetForm = () => {
    setFormValues({
      phoneNumber: "",
      profession: "",
      lookingToBe: [],
      desiredSectors: [],
      country: "",
      dateOfBirth: null,
      aboutMe: "",
      experience: "",
      skills: [],
      personalWeb: "",
      linkedInProfileLink: "",
      cv: null,
      customLookingToBe: "",
      customSector: "",
      customSkill: "",
    });
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
