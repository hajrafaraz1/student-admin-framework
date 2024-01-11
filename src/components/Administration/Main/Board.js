import React, { useEffect, useState } from "react";
import "../Ui/style.css";
import AddEditUser from "./AddEditUser.js";
import useSearchData from "../Hooks/useSearchData.js";
import useDeleteData from "../Hooks/useDeleteData.js";
import { URL } from "../constants/constants.js";

const Board = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [filter, setFilter] = React.useState("");
  const [selectedGroups, setSelectedGroups] = React.useState([]);
  const { deleteData } = useDeleteData();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, []);

  const openUsermodal = () => {
    setIsModalOpen(true);
  };

  const closeUsermodal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDelete = async (dataId) => {
    await deleteData("http://localhost:3001/tableData", dataId, setData);
  };

  const handleCheckboxChange = (group) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(group)
        ? prevSelected.filter((selected) => selected !== group)
        : [...prevSelected, group]
    );
  };

  const filteredData = useSearchData(data, filter, selectedGroups);
  console.log("filteredData", filteredData);

  const modifiedStudentGroups = filteredData.map((data) => {
    return {
      ...data,
      groups: Array.isArray(data.groups) ? data.groups.join(", ") : data.groups,
    };
  });

  const getHighlightedText = (text, highlight) => {
    if (typeof text !== "string") {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { backgroundColor: "yellow" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <>
      <div className="top">
        <div>
          <h1 className="headings"> SAF </h1>
          <p style={{ fontSize: "12px", margin: "0px", paddingLeft: "2rem" }}>
            Student Administration FrameWork
          </p>
        </div>
        <div style={{ paddingRight: "3rem", marginTop: "3rem" }}>
          My Profile
        </div>
      </div>

      <button
        className="button"
        style={{ marginTop: "3rem", marginLeft: "5rem" }}
        onClick={openUsermodal}
      >
        ADD USER
      </button>

      <div className="footer">
        <div className="search">
          <p style={{ backgroundColor: "white" }}> SEARCH FOR NAME : </p>
          <div style={{ display: "flex" }}>
            <button className="search_button">
              <i class="material-icons" style={{ backgroundColor: "white" }}>
                search
              </i>
            </button>
            <input
              type="text"
              size="40"
              className="mytext"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="filter">
            <p style={{ backgroundColor: "white" }}> FILTER BY GROUP : </p>
            {[
              "Typography",
              "FrontEnd",
              "BackEnd",
              "WebDesigner",
              "UIUX",
              "AndroidDeveloper",
            ].map((group) => (
              <div key={group}>
                <input
                  type="checkbox"
                  value={group}
                  checked={selectedGroups.includes(group)}
                  onChange={() => handleCheckboxChange(group)}
                />
                {group}
              </div>
            ))}
          </div>
        </div>

        <div className="table">
          <div>
            {/* <div style={{ margin: "10px" }}> */}
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Place</th>
              <th>Group</th>
              <th>Edit Data</th>
            </tr>
          </div>
          <div className="table_container">
            {modifiedStudentGroups.map((student, key) => {
              return (
                <tr key={key}>
                  <td>{getHighlightedText(student.id, filter)}</td>
                  <td>{getHighlightedText(student.name, filter)}</td>
                  <td>{getHighlightedText(student.gender, filter)}</td>
                  <td>{getHighlightedText(student.place, filter)}</td>
                  <td>{getHighlightedText(student.groups, filter)}</td>
                  <td>
                    <button
                      style={{
                        borderRadius: "5px",
                      }}
                      className="editbutton"
                      onClick={() => {
                        setSelectedStudent(student);
                        openUsermodal();
                      }}
                    >
                      Update
                    </button>
                    <button
                      style={{
                        borderRadius: "5px",
                      }}
                      className="deletebutton"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {isModalOpen && (
              <div>
                <AddEditUser
                  setData={setData}
                  selectedStudent={selectedStudent}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  onClose={closeUsermodal}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
