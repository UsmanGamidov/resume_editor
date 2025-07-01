import React, { useState, useEffect } from "react";
import SectionEditor from "./components/SectionEditor";
import Preview from "./components/Preview";
import html2pdf from "html2pdf.js";

const LOCAL_STORAGE_KEY = "resume-sections";

function App() {
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState({
    font: "Arial",
    color: "#000000",
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sections));
  }, [sections]);

  const downloadPDF = () => {
    const el = document.getElementById("resume-preview");
    html2pdf()
      .set({
        margin: 0.5,
        filename: "my-resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" },
      })
      .from(el)
      .save();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Визуальный редактор резюме</h1>

        <div style={styles.toolbar}>
          <label style={styles.label}>
            Шрифт:
            <select
              value={theme.font}
              onChange={(e) => setTheme({ ...theme, font: e.target.value })}
              style={styles.select}
            >
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Courier New">Courier New</option>
            </select>
          </label>

          <label style={styles.label}>
            Цвет текста:
            <input
              type="color"
              value={theme.color}
              onChange={(e) => setTheme({ ...theme, color: e.target.value })}
              style={styles.colorInput}
            />
          </label>

          <button
            onClick={downloadPDF}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            style={styles.button}
          >
            Скачать как PDF
          </button>
        </div>

        <div style={styles.layout}>
          <div style={styles.editor}>
            <SectionEditor sections={sections} setSections={setSections} />
          </div>
          <div style={styles.preview}>
            <Preview sections={sections} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f3f3f3",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: 1200,
    backgroundColor: "#fff",
    padding: 30,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    margin: 0,
  },
  toolbar: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  select: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  colorInput: {
    width: 40,
    height: 36,
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    transition: "background 0.2s",
  },
  layout: {
    display: "flex",
    gap: 40,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  editor: {
    flex: 1,
    minWidth: 320,
    maxWidth: 540,
  },
  preview: {
    flex: 1,
    minWidth: 320,
    maxWidth: 540,
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 20,
    background: "#fff",
  },
};

export default App;
