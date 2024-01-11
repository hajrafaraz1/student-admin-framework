import React, { useState } from "react";
import { studyGroups } from "./constants.js";
import useCreateData from "./useCreateData";
import useUpdateData from "./useUpdateData";

const AddEditUser = ({
  selectedStudent,
  setData,
  isModalOpen,
  setIsModalOpen,
  onClose,
}) => {
  const isAddMode = !selectedStudent;
  const [inputs, setInputs] = useState({
    name: selectedStudent?.name ?? "",
    gender: selectedStudent?.gender ?? "",
    place: selectedStudent?.place ?? "",
    groups: selectedStudent?.groups ?? [],
  });

  const [validationError, setValidationError] = useState(null);
  const { createData } = useCreateData();
  const { updateData } = useUpdateData();

  const handleCheckboxChange = (group) => {
    setInputs((prevInputs) => {
      const updatedGroups = Array.isArray(prevInputs.groups)
        ? prevInputs.groups.includes(group)
          ? prevInputs.groups.filter((selected) => selected !== group)
          : [...prevInputs.groups, group]
        : [group];

      return { ...prevInputs, groups: updatedGroups };
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputs.name || !inputs.gender || !inputs.place) {
      setValidationError("Please fill in all the required fields.");
      return;
    }
    const lettersRegex = /^[a-zA-Z]+$/;

    if (!lettersRegex.test(inputs.gender)) {
      setValidationError("Please enter a valid gender (letters only).");
      return;
    }

    if (!lettersRegex.test(inputs.place)) {
      setValidationError("Please enter a valid place of birth (letters only).");
      return;
    }
    setValidationError(null);

    if (isAddMode) {
      await createData(`http://localhost:3001/tableData`, inputs, setData);
    } else {
      console.log("Before updateData call");
      await updateData(
        `http://localhost:3001/tableData/${selectedStudent.id}`,
        inputs,
        setData
      );
      console.log("After updateData call");
    }
    setIsModalOpen(false);
    setInputs({
      name: "",
      gender: "",
      place: "",
      groups: [],
    });
  };

  return (
    <>
      {isModalOpen && (
        <div
          style={{
            border: "2px solid #36219e",
            backgroundColor: "#42aaf5",
            position: "fixed",
            top: "20%",
            left: "40%",
          }}
        >
          <div
            className="closebutton"
            style={{ backgroundColor: "rgb(23, 166, 209)" }}
          >
            <button onClick={onClose}>X</button>
          </div>
          <div className="formDesign">
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {validationError && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {validationError}
                </div>
              )}
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
              <label>Gender:</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={inputs.gender}
                onChange={handleChange}
                required
              />
              <label>Place of Birth:</label>
              <input
                type="text"
                id="place"
                name="place"
                value={inputs.place}
                onChange={handleChange}
                required
              />
              <label>Groups of Study:</label>
              {studyGroups.map((group) => (
                <div key={group}>
                  <input
                    type="checkbox"
                    name="groups"
                    value={group}
                    checked={inputs.groups.includes(group)}
                    onChange={() => handleCheckboxChange(group)}
                  />
                  {group}
                </div>
              ))}
              <input
                style={{
                  fontFamily: "Times New Roman",
                  fontSize: "18px",
                  margin: "18px",
                  padding: "8px",
                  borderRadius: "35px",
                  backgroundColor: "#2a71a3",
                }}
                type="submit"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditUser;
