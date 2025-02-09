import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Mic, Loader } from "lucide-react";

import { BUGURL } from "../config";

const bugurl = BUGURL;

const predefinedBugs = [
  "UI button not responsive on mobile view",
  "Login page takes too long to load",
  "Data is not saving after form submission",
  "App crashes when clicking on 'Submit'",
  "Text overlapping in dark mode",
  "User profile images not loading properly",
  "Notifications are not showing up in real-time",
  "Sorting function is not working correctly",
  "Search results show irrelevant data",
  "Logout button is not working sometimes",
];

const AddBug = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [bugSuggestions, setBugSuggestions] = useState(predefinedBugs.slice(0, 5));
  const [isRecording, setIsRecording] = useState(false);

  const observer = useRef();

  // Infinite Scroll - Load more bugs
  const lastBugRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setBugSuggestions((prev) => [
            ...prev,
            ...predefinedBugs.slice(prev.length, prev.length + 5),
          ]);
        }
      });
      if (node) observer.current.observe(node);
    },
    [bugSuggestions]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(`${bugurl}/create`, {
        reportedBy: user.id,
        description,
        priority,
      });

      // ✅ Check response status correctly
      if (response.status === 201 && response.data.bugDTO) {
        setMessage("Bug successfully added!");
        setMessageType("success");
        setDescription("");
        setPriority("low");
      } else {
        setMessage("Failed to add bug. Try again.");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error creating bug:", err);

      // ✅ Improved error handling to display actual error response
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`Error: ${err.response.data.message}`);
      } else {
        setMessage("Failed to create bug. Please try again.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000); // Auto-hide message after 3 seconds
    }
  };



  // Voice Input Handling
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => {
      setIsRecording(false);
      alert("Error recording. Try again.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDescription((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.start();
  };

  return (
    <div className="flex h-screen">
      {/* Bug Reporting Section */ }
      <div className="p-6 w-1/2 border-r">
        <h2 className="text-xl font-bold mb-4">Report a New Bug</h2>

        <form onSubmit={ handleSubmit } className="space-y-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Bug Description"
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
            required
          />
          <div className="flex items-center gap-2">
            <select
              className="p-2 border rounded w-full"
              value={ priority }
              onChange={ (e) => setPriority(e.target.value) }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              type="button"
              className={ `p-2 rounded-full bg-gray-200 ${isRecording ? "bg-red-500" : "bg-gray-300"
                }` }
              onClick={ handleVoiceInput }
            >
              <Mic className="w-6 h-6" />
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
            disabled={ loading }
          >
            { loading ? "Submitting..." : "Submit Bug" }
          </button>
        </form>

        {/* Success/Error Message */ }
        { message && (
          <div
            className={ `mt-4 p-2 text-white text-center rounded-lg transition-opacity duration-500 ${messageType === "success" ? "bg-green-500" : "bg-red-500"
              }` }
          >
            { message }
          </div>
        ) }
      </div>

      {/* Bug Suggestions - Infinite Scroll */ }
      <div className="w-1/2 p-6 overflow-y-auto h-full">
        <h2 className="text-xl font-bold mb-4">Bug Suggestions</h2>
        <div className="space-y-4">
          { bugSuggestions.map((bug, index) => (
            <div
              key={ index }
              ref={ index === bugSuggestions.length - 1 ? lastBugRef : null }
              className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-all"
              onClick={ () => setDescription(bug) }
            >
              { bug }
            </div>
          )) }
          { bugSuggestions.length < predefinedBugs.length && (
            <div className="flex justify-center">
              <Loader className="animate-spin w-6 h-6 text-gray-500" />
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default AddBug;
