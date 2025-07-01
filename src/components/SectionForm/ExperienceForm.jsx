import React from "react";

export default function ExperienceForm({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>
        Должность:
        <input
          type="text"
          name="position"
          placeholder="Менеджер проектов"
          value={data.position || ""}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Компания:
        <input
          type="text"
          name="company"
          placeholder="ООО «Пример»"
          value={data.company || ""}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Период:
        <input
          type="text"
          name="period"
          placeholder="2020–2023"
          value={data.period || ""}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Описание:
        <textarea
          name="description"
          placeholder="Кратко опишите задачи и достижения"
          value={data.description || ""}
          onChange={handleChange}
          rows={4}
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
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
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
