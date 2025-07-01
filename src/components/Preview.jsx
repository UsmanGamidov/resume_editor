import React from "react";

const sectionRenderers = {
  experience: (data) => (
    <div>
      <h4 style={styles.itemTitle}>{data.position || "Должность не указана"}</h4>
      <p style={styles.itemMeta}>
        <strong>{data.company}</strong> — {data.period}
      </p>
      <p>{data.description}</p>
    </div>
  ),
  education: (data) => (
    <div>
      <h4 style={styles.itemTitle}>{data.specialty || "Специальность"}</h4>
      <p style={styles.itemMeta}>
        <strong>{data.school}</strong> — {data.period}
      </p>
    </div>
  ),
  skills: (data) => (
    <ul style={styles.skillList}>
      {(data.skills || "")
        .split(",")
        .map((skill, idx) => (
          <li key={idx} style={styles.skillItem}>
            {skill.trim()}
          </li>
        ))}
    </ul>
  ),
};

export default function Preview({ sections, theme }) {
  return (
    <div
      id="resume-preview"
      style={{
        ...styles.preview,
        fontFamily: theme.font,
        color: theme.color,
      }}
    >
      <h2 style={styles.heading}>Резюме</h2>

      {sections.map((section) => (
        <div key={section.id} style={styles.section}>
          <h3 style={styles.sectionTitle}>
            {section.type === "experience" && "Опыт"}
            {section.type === "education" && "Образование"}
            {section.type === "skills" && "Навыки"}
          </h3>
          {sectionRenderers[section.type]?.(section.data)}
        </div>
      ))}
    </div>
  );
}

const styles = {
  preview: {
    border: "1px solid #999",
    padding: 20,
    backgroundColor: "#fff",
    lineHeight: 1.5,
  },
  heading: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 22,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    borderBottom: "1px solid #ddd",
    paddingBottom: 5,
    marginBottom: 10,
    fontSize: 18,
  },
  itemTitle: {
    margin: "4px 0",
    fontWeight: 600,
    fontSize: 16,
  },
  itemMeta: {
    margin: "2px 0 10px 0",
    fontSize: 14,
    color: "#444",
  },
  skillList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  skillItem: {
    border: "1px solid #ccc",
    padding: "4px 10px",
    borderRadius: 6,
    background: "#f0f0f0",
    fontSize: 13,
  },
};
