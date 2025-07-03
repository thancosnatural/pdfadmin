import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCloudUploadAlt,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
  FaFilePdf,
} from "react-icons/fa";

const PdfUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pdfserver-1.onrender.com/api/pdf`);
      const mapped = response.data.data.map((pdf) => ({
        id: pdf.id,
        title: pdf.filename,
        description: pdf.description,
        file_url: `https://pdfserver-1.onrender.com/api/pdf/download/${pdf.id}`,
        updatedAt: pdf.createdAt,
      }));
      setUploadedFiles(mapped);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

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
        "https://pdfserver-1.onrender.com/api/pdf/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("File uploaded successfully!");
      setSelectedFile(null);

      // Refresh the uploaded list
      fetchPdfs();
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl min-h-screen pt-30 md:pt-40">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaCloudUploadAlt className="text-blue-600" />
        Upload PDF File
      </h2>

      {/* Upload Dropzone */}
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

      {/* Error / Success Messages */}
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

      {/* Upload Button */}
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

      {/* Uploaded Files */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <FaFilePdf className="text-red-600" />
        Uploaded PDFs
      </h3>

      {uploadedFiles.length === 0 ? (
        <p className="text-gray-500 text-sm">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {uploadedFiles.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="text-gray-800 text-sm truncate">{file.title}</span>
              <a
                href={file.file_url}
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
