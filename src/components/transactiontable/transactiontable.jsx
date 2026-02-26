import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
const TransactionTable = ({ retrievedData,setEditTransactions,editTransactions,setRetrievedData }) => {
  const navigate = useNavigate();
const HandleDelete = (id)=>{
  setRetrievedData(prev=>

   prev.filter((f)=>{
    return id !== f.id;
  })
  )

}
const HandleEdit = (m) =>{
  setEditTransactions(m);
  navigate("/addTransaction");
}

  useEffect(() => {
    localStorage.setItem("transactionData", JSON.stringify(retrievedData));
  }, [retrievedData]);
  return (
    <>
   
      <div className="backGround p-6  rounded-lg shadow  overflow-auto">

        <h2 className="text-lg font-semibold mb-4">
          Transactions History
        </h2>

        <table className="w-full text-left mb-6">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="pb-3">Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Edit</th>
              <th className="pb-3">Delete</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {retrievedData.map((m) =>
              <tr className="border-b">
                <td className="py-3">{m.name}</td>
                <td className="py-3">{m.category}</td>
                <td>{m.type}</td>
                <td>{m.date}</td>
                <td className="text-red-500">{m.amount}</td>
                <td className="text-green-600">{m.status}</td>
                <td className="pl-2" ><button onClick={()=>HandleEdit(m)}><FaPencil /></button> </td>
                <td className="pl-2" ><button onClick={()=>HandleDelete(m.id)}><MdDelete /></button></td>
               
              </tr>
            )}

          </tbody>
        </table>

        {/* Add Button */}


      </div>
    </>
  );
};

export default TransactionTable;
