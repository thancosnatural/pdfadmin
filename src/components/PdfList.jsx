import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowDown } from "react-icons/fa";

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pdf`);
        const mapped = response.data.data.map(pdf => ({
          id: pdf.id,
          title: pdf.filename,
          description: pdf.description,
          file_url: `http://localhost:5000/api/pdf/download/${pdf.id}`,
          updatedAt: pdf.createdAt,
        }));
        setPdfs(mapped);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!pdfs || pdfs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No PDF files available.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen pt-40">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">📄 Available Stocks PDF </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaArrowDown className="h-8 w-8 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800 truncate">{pdf.title}</h3>
              </div>
              {pdf.description && (
                <p className="text-gray-600 text-sm mb-6">{pdf.description}</p>
              )}
              {pdf.updatedAt && (
                <p className="text-xs text-gray-500 mb-4">
                  Last updated: {new Date(pdf.updatedAt).toLocaleString()}
                </p>
              )}


              <a
                href={pdf.file_url}
                download
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                <FaArrowDown className="h-5 w-5 mr-2" />
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfList;
