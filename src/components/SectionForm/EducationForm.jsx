import React from "react";

export default function EducationForm({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>
        Учебное заведение:
        <input
          type="text"
          name="school"
          placeholder="Например: МГУ"
          value={data.school || ""}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Специальность:
        <input
          type="text"
          name="specialty"
          placeholder="Прикладная математика"
          value={data.specialty || ""}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Период:
        <input
          type="text"
          name="period"
          placeholder="2016–2020"
          value={data.period || ""}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontWeight: 500,
    fontSize: "14px",
    marginBottom: "14px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
};
