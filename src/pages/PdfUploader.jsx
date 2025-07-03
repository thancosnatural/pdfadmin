import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaExclamationCircle, FaFilePdf } from "react-icons/fa";

const PdfUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setSelectedFile(null);
      setSuccessMessage("");
    } else {
      setError("");
      setSuccessMessage("");
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/pdf/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedFiles((prev) => [...prev, response.data.filename]);
      setSuccessMessage("File uploaded successfully!");
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl pt-30 md:pt-40">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaCloudUploadAlt className="text-blue-600" />
        Upload PDF File
      </h2>

      {/* Professional Dropzone */}
      <div className="flex justify-center">
        <label
          htmlFor="pdf-upload"
          className={`cursor-pointer border-2 border-dashed border-gray-300 w-full p-8 flex flex-col items-center justify-center rounded-xl text-center hover:border-blue-500 transition-all duration-300 ${
            selectedFile ? "border-green-500 bg-green-50" : ""
          }`}
        >
          {selectedFile ? (
            <div className="flex items-center gap-2 text-green-700">
              <FaFilePdf className="text-red-600 text-3xl" />
              <span className="text-md">{selectedFile.name}</span>
            </div>
          ) : (
            <>
              <FaCloudUploadAlt className="text-blue-500 text-5xl mb-3" />
              <p className="text-gray-500">Drag and drop a PDF file here, or click to browse</p>
            </>
          )}
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 text-sm">
          <FaExclamationCircle />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mt-4 flex items-center gap-2 text-green-600 text-sm">
          <FaCheckCircle />
          {successMessage}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <FaCloudUploadAlt />
            Upload PDF
          </>
        )}
      </button>

      <hr className="my-8 border-gray-200" />

      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <FaFilePdf className="text-red-600" />
        Uploaded PDFs
      </h3>

      {uploadedFiles.length === 0 ? (
        <p className="text-gray-500 text-sm">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {uploadedFiles.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="text-gray-800 text-sm truncate">{file}</span>
              <a
                href={`http://localhost:5000/uploads/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                View / Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PdfUpload;
