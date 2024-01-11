const useUpdateData = () => {
  const updateData = async (url, inputs, setData) => {
    try {
      console.log("Updating data...");
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(inputs),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Update successful");
        const updatedData = await response.json();
        setData((previousData) =>
          previousData.map((item) =>
            item.id === updatedData.id ? { ...item, ...updatedData } : item
          )
        );
      } else {
        console.error("Update request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Update request failed:", error);
    }
  };

  return { updateData };
};

export default useUpdateData;
