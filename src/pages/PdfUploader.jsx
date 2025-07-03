import { useEffect, useState } from 'react';
import { UploadCloud } from 'lucide-react';

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [allFiles, setAllFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const fetchAllFiles = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/pdf');
      const result = await res.json();
      if (result.success) {
        setAllFiles(result.data);
      }
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) return setErrorMsg('Please select a file.');

    setUploading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result;

      try {
        const response = await fetch('http://localhost:5000/api/pdf/upload-s3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            base64Data: base64,
            description,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setSuccessMsg('File uploaded successfully.');
          setUploadedFile({ name: file.name, type: file.type, url: result.data?.url });
          setFile(null);
          setDescription('');
          fetchAllFiles();
        } else {
          setErrorMsg(result.message || 'Upload failed.');
        }
      } catch (error) {
        console.error(error);
        setErrorMsg('Upload failed.');
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 px-6 py-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload Document</h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">File</label>
        <div className="flex items-center justify-center border-2 border-dashed border-blue-400 rounded-lg px-4 py-10 cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="flex flex-col items-center justify-center cursor-pointer">
            <UploadCloud size={40} className="text-blue-500 mb-2" />
            <span className="text-gray-600">{file ? file.name : 'Click to upload or drag & drop your file'}</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Description (optional)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a short description..."
          className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 text-sm mb-4">{successMsg}</p>}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : (
          <>
            <UploadCloud className="mr-2" size={20} /> Upload File
          </>
        )}
      </button>

      {uploadedFile && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Uploaded File Details</h3>
          <p><strong>Name:</strong> {uploadedFile.name}</p>
          <p><strong>Type:</strong> {uploadedFile.type}</p>
          {uploadedFile.url && (
            <p>
              <strong>Preview:</strong> <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View File</a>
            </p>
          )}
        </div>
      )}

      {allFiles.length > 0 && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">All Uploaded Files</h3>
          <ul className="space-y-3">
            {allFiles.map((file) => (
              <li key={file.id} className="flex justify-between items-center border p-4 rounded-md shadow-sm">
                <div>
                  <p className="font-medium text-gray-800">{file.filename}</p>
                  {file.description && <p className="text-sm text-gray-600">{file.description}</p>}
                </div>
                <a
                  href={file.filepath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm font-medium"
                >
                  View
                </a>

           

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;