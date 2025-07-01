import React from "react";

export default function SkillsForm({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ ...data, skills: e.target.value });
  };

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>
        Навыки:
        <textarea
          placeholder="Например: JavaScript, React, Git"
          value={data.skills || ""}
          onChange={handleChange}
          rows={3}
          style={styles.textarea}
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
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
  },
};
