import React from "react";

const SelectedTestsTable = ({
  selectedTests,
  setSelectedTests,
  handleRemoveTest,
}) => {
  const handleEditTest = (testId, field, value) => {
    setSelectedTests((prevTests) =>
      prevTests.map((test) =>
        test._id === testId ? { ...test, [field]: value } : test
      )
    );
  };

  return (
    <div className="col-span-2">
      <label className="block text-xl mt-2 mb-1 font-semibold">
        Selected Tests
      </label>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Test Name</th>
              <th className="p-2 border">Test Code</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedTests.map((test) => (
              <tr key={test._id} className="border-b">
                <td className="p-2 border">{test.testName}</td>
                <td className="p-2 border">{test.testCode || "N/A"}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    step="0.01" // Allow decimal values
                    value={test.price}
                    onChange={(e) =>
                      handleEditTest(
                        test._id,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    step="0.01" // Allow decimal values
                    value={test.discount}
                    onChange={(e) =>
                      handleEditTest(
                        test._id,
                        "discount",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full p-1 border rounded"
                  />
                </td>

                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleRemoveTest(test._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedTestsTable;
