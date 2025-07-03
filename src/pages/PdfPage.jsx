// Example parent component or page
import React, { useEffect, useState } from 'react';
import PdfList from '../components/PdfList';

const PdfPage = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    // Simulated fetch
    const fetchData = async () => {
      const data = [
        {
          id: '1',
          title: 'Sample PDF 1',
          description: 'This is the first PDF document.',
          file_url: '/files/sample1.pdf',
        },
        {
          id: '2',
          title: 'Sample PDF 2',
          description: 'This is the second PDF document.',
          file_url: '/files/sample2.pdf',
        },
      ];
      setPdfs(data);
    };

    fetchData();
  }, []);

  return <PdfList pdfs={pdfs} />;
};

export default PdfPage;
