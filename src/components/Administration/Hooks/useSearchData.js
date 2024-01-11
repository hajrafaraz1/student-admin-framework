import { useState, useEffect } from "react";

const useSearchData = (data, filter, selectedGroups) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const newFilteredData = data.filter((student) => {
      const fields = Object.values(student).map((field) =>
        field.toString().toLowerCase()
      );

      const matchesSearch = fields.some((field) =>
        field.includes(filter.toLowerCase())
      );

      const matchesGroups =
        selectedGroups.length === 0 ||
        selectedGroups.some((selectedGroup) =>
          Array.isArray(student.groups)
            ? student.groups.includes(selectedGroup)
            : (student.groups || " ").split(",").includes(selectedGroup)
        );

      return matchesSearch && matchesGroups;
    });

    setFilteredData(newFilteredData);
  }, [data, filter, selectedGroups]);

  return filteredData;
};

export default useSearchData;
