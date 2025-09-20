import React from "react";
import axios from "axios";

function ExportButton({ city }) {
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/water/export/${city}`,
        { responseType: "blob" }
      );

      // Create blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${city}-water-report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download PDF");
    }
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        background: "#1c2237",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Download PDF Report
    </button>
  );
}

export default ExportButton;
