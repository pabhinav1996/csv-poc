import React, { useState } from 'react';

function App() {
  const [csvContent, setCsvContent] = useState('');
  const [editedCsv, setEditedCsv] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvContent(e.target.result);
        setEditedCsv(e.target.result);
        setIsEditing(true);
      };
      reader.readAsText(file);
    }
  };

  const handleCsvUpdate = () => {
    // Implement your CSV editing logic here.
    // For simplicity, we're just converting to uppercase.
    const updatedCsv = editedCsv.toUpperCase();
    setEditedCsv(updatedCsv);
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([editedCsv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h2>CSV Editor and Display</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {isEditing && (
        <div>
          <button onClick={handleCsvUpdate}>Update CSV</button>
          <button onClick={handleDownloadCsv}>Download CSV</button>
        </div>
      )}

      {isEditing ? (
        <textarea
          rows="10"
          cols="40"
          value={editedCsv}
          onChange={(e) => setEditedCsv(e.target.value)}
        />
      ) : (
        <pre>{csvContent}</pre>
      )}
    </div>
  );
}

export default App;
