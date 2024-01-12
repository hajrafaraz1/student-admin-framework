const useDeleteData = () => {
  const deleteData = async (url, dataId, setData) => {
    try {
      console.log("Deleting data...");
      const response = await fetch(`${url}/${dataId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Deletion successful");
        setData((previousData) =>
          previousData.filter((item) => item.id !== dataId)
        );
      } else {
        console.error("Deletion request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Deletion request failed:", error);
    }
  };
  return { deleteData };
};

export default useDeleteData;
