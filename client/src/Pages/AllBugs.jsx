
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { UserContext } from "../context/UserContext";
// import { USERURL, BUGURL } from "../config";
// const bugUrl = BUGURL;
// const userUrl = USERURL;
// const AllBugs = () => {
//   const { user } = useContext(UserContext);
//   const [bugs, setBugs] = useState([]);
//   const [developers, setDevelopers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingBug, setEditingBug] = useState(null);
//   const [updatingBug, setUpdatingBug] = useState(null);
//   const [deletingBug, setDeletingBug] = useState(null);
//   const [updateStatus, setUpdateStatus] = useState({}); // Track update success/failure

//   useEffect(() => {
//     const fetchBugs = async () => {
//       try {
//         const response = await axios.get(`${bugUrl}/allBugs?user_id=${user.id}`);
//         setBugs(response.data.bugList);
//       } catch (err) {
//         setError("Failed to fetch bugs.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchDevelopers = async () => {
//       try {
//         const response = await axios.get(`${userUrl}/developer`);
//         setDevelopers(response.data.userList);
//       } catch (err) {
//         console.error("Failed to fetch developers.");
//       }
//     };

//     fetchBugs();
//     if (user.role === "TESTER") fetchDevelopers();
//   }, [user.id, user.role]);

//   const handleUpdate = async (bugId, updateData) => {
//     setUpdatingBug(bugId);
//     setUpdateStatus((prev) => ({ ...prev, [bugId]: null })); // Reset glow

//     try {
//       await axios.patch(`${bugUrl}/${bugId}`, updateData);
//       setBugs((prev) =>
//         prev.map((bug) => (bug.id === bugId ? { ...bug, ...updateData } : bug))
//       );
//       setUpdateStatus((prev) => ({ ...prev, [bugId]: "success" })); // Green glow
//     } catch (error) {
//       setUpdateStatus((prev) => ({ ...prev, [bugId]: "error" })); // Red glow
//     } finally {
//       setUpdatingBug(null);
//       setTimeout(() => {
//         setUpdateStatus((prev) => ({ ...prev, [bugId]: null })); // Remove glow after animation
//       }, 1000);
//     }
//   };

//   const handleDelete = async (bugId) => {
//     setDeletingBug(bugId);
//     setTimeout(async () => {
//       await axios.put(`${bugUrl}/delete/${bugId}`);
//       setBugs((prev) => prev.filter((bug) => bug.id !== bugId));
//       setDeletingBug(null);
//     }, 600);
//   };

//   if (loading) return <p>Loading bugs...</p>;
//   if (error) return <p className="text-red-500">{ error }</p>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Bugs</h2>
//       <div className="grid grid-cols-1 gap-6">




//         {
//           bugs.filter((bug) => !bug.isDeleted).map((bug) => (
//             <div
//               key={ bug.id }
//               className={ `p-6 border rounded bg-gray-100 shadow-lg transition-all duration-500 
//               ${updatingBug === bug.id ? "animate-shine" : ""}
//               ${deletingBug === bug.id ? "disintegrate" : ""}
//               ${updateStatus[bug.id] === "success" ? "success-glow" : ""}
//               ${updateStatus[bug.id] === "error" ? "error-glow" : ""}
//             `}
//             >
//               {/* Editable Description */ }
//               { editingBug === bug.id ? (
//                 <textarea
//                   className="w-full p-2 border rounded"
//                   defaultValue={ bug.description }
//                   onBlur={ (e) => {
//                     handleUpdate(bug.id, { description: e.target.value });
//                     setEditingBug(null);
//                   } }
//                 />
//               ) : (
//                 <p className="font-semibold cursor-pointer" onClick={ () => setEditingBug(bug.id) }>
//                   { bug.description }
//                 </p>
//               ) }
//               <p>Status: { bug.status }</p>
//               <p>Priority: { bug.priority }</p>

//               { user.role === "TESTER" && (
//                 <div className="mt-4 flex items-center gap-3">
//                   <button
//                     onClick={ () => handleDelete(bug.id) }
//                     className="bg-red-500 text-white px-3 py-2 rounded transition-all duration-300 hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                   <select
//                     onChange={ (e) => handleUpdate(bug.id, { assignedTo: e.target.value }) }
//                     className="border p-2 rounded"
//                   >
//                     <option value="">Assign Developer</option>
//                     { developers.map((dev) => (
//                       <option key={ dev.id } value={ dev.id }>
//                         { dev.name }
//                       </option>
//                     )) }
//                   </select>
//                   <select
//                     onChange={ (e) => handleUpdate(bug.id, { priority: e.target.value }) }
//                     className="border p-2 rounded"
//                   >
//                     <option>Change Priority</option>
//                     <option value="LOW">LOW</option>
//                     <option value="MEDIUM">MEDIUM</option>
//                     <option value="HIGH">HIGH</option>
//                   </select>
//                   <select
//                     onChange={ (e) => handleUpdate(bug.id, { status: e.target.value }) }
//                     className="border p-2 rounded"
//                   >
//                     <option>Change Status</option>
//                     <option value="OPEN">OPEN</option>
//                     <option value="IN_PROGRESS">IN PROGRESS</option>
//                     <option value="RESOLVED">RESOLVED</option>
//                   </select>
//                 </div>
//               ) }
//             </div>
//           ))
//         }


//       </div>
//     </div>
//   );
// };

// export default AllBugs;



import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { USERURL, BUGURL } from "../config";
const bugUrl = BUGURL;
const userUrl = USERURL;
const AllBugs = () => {
  const { user } = useContext(UserContext);
  const [bugs, setBugs] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBug, setEditingBug] = useState(null);
  const [updatingBug, setUpdatingBug] = useState(null);
  const [deletingBug, setDeletingBug] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({}); // Track update success/failure
  const [filters, setFilters] = useState({ priority: "", status: "", assignedTo: "", dateReported: "" });

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.get(`${bugUrl}/allBugs?user_id=${user.id}`);
        setBugs(response.data.bugList);
      } catch (err) {
        setError("Failed to fetch bugs.");
      } finally {
        setLoading(false);
      }
    };

    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(`${userUrl}/developer`);
        setDevelopers(response.data.userList);
      } catch (err) {
        console.error("Failed to fetch developers.");
      }
    };

    fetchBugs();
    if (user.role === "TESTER") fetchDevelopers();
  }, [user.id, user.role]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBugs = bugs.filter((bug) =>
    !bug.isDeleted &&
    (filters.priority ? bug.priority === filters.priority : true) &&
    (filters.status ? bug.status === filters.status : true) &&
    (filters.assignedTo ? bug.assignedTo === filters.assignedTo : true) &&
    (filters.dateReported ? bug.dateReported.includes(filters.dateReported) : true)
  );

  if (loading) return <p>Loading bugs...</p>;
  if (error) return <p className="text-red-500">{ error }</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Bugs</h2>

      <div className="mb-4 flex gap-4">
        <select name="priority" onChange={ handleFilterChange } className="border p-2 rounded">
          <option value="">Filter by Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        <select name="status" onChange={ handleFilterChange } className="border p-2 rounded">
          <option value="">Filter by Status</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
        <select name="assignedTo" onChange={ handleFilterChange } className="border p-2 rounded">
          <option value="">Filter by Developer</option>
          { developers.map((dev) => (
            <option key={ dev.id } value={ dev.id }>{ dev.name }</option>
          )) }
        </select>
        <input
          type="date"
          name="dateReported"
          onChange={ handleFilterChange }
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        { filteredBugs.map((bug) => (
          <div
            key={ bug.id }
            className={ `p-6 border rounded bg-gray-100 shadow-lg transition-all duration-500 
              ${updatingBug === bug.id ? "animate-shine" : ""}
              ${deletingBug === bug.id ? "disintegrate" : ""}
              ${updateStatus[bug.id] === "success" ? "success-glow" : ""}
              ${updateStatus[bug.id] === "error" ? "error-glow" : ""}
            `}
          >
            { editingBug === bug.id ? (
              <textarea
                className="w-full p-2 border rounded"
                defaultValue={ bug.description }
                onBlur={ (e) => {
                  handleUpdate(bug.id, { description: e.target.value });
                  setEditingBug(null);
                } }
              />
            ) : (
              <p className="font-semibold cursor-pointer" onClick={ () => setEditingBug(bug.id) }>
                { bug.description }
              </p>
            ) }
            <p>Status: { bug.status }</p>
            <p>Priority: { bug.priority }</p>

            { user.role === "TESTER" && (
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={ () => handleDelete(bug.id) }
                  className="bg-red-500 text-white px-3 py-2 rounded transition-all duration-300 hover:bg-red-700"
                >
                  Delete
                </button>
                <select
                  onChange={ (e) => handleUpdate(bug.id, { assignedTo: e.target.value }) }
                  className="border p-2 rounded"
                >
                  <option value="">Assign Developer</option>
                  { developers.map((dev) => (
                    <option key={ dev.id } value={ dev.id }>{ dev.name }</option>
                  )) }
                </select>
                <select
                  onChange={ (e) => handleUpdate(bug.id, { priority: e.target.value }) }
                  className="border p-2 rounded"
                >
                  <option>Change Priority</option>
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
                <select
                  onChange={ (e) => handleUpdate(bug.id, { status: e.target.value }) }
                  className="border p-2 rounded"
                >
                  <option>Change Status</option>
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>
            ) }
          </div>
        )) }
      </div>
    </div>
  );
};

export default AllBugs;
