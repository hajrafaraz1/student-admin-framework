const useCreateData = () => {
  const createData = async (url, inputs, setData) => {
    try {
      console.log("Creating data...");
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          ...inputs,
          groups: Array.isArray(inputs.groups)
            ? inputs.groups
            : [inputs.groups],
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Creation successful");
        const createdData = await response.json();
        setData((previousData) => [...previousData, createdData]);
      } else {
        console.error("Creation request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Creation request failed:", error);
    }
  };

  return { createData };
};

export default useCreateData;
