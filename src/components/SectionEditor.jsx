import React, { useState } from "react";
import ExperienceForm from "./SectionForm/ExperienceForm";
import EducationForm from "./SectionForm/EducationForm";
import SkillsForm from "./SectionForm/SkillsForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { sectionTemplates } from "../utils/sectionTemplates";

const sectionTypes = {
  experience: "Опыт",
  education: "Образование",
  skills: "Навыки",
};

export default function SectionEditor({ sections, setSections }) {
  const [selectedType, setSelectedType] = useState("");

  const addSection = () => {
    if (!selectedType) return;
    const newSection = {
      id: Date.now().toString(),
      type: selectedType,
      data: {},
    };
    setSections([...sections, newSection]);
    setSelectedType("");
  };

  const updateSection = (id, newData) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, data: newData } : s)));
  };

  const deleteSection = (id) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updated = Array.from(sections);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setSections(updated);
  };

  const renderForm = (section) => {
    const props = {
      data: section.data,
      onChange: (data) => updateSection(section.id, data),
    };

    switch (section.type) {
      case "experience":
        return <ExperienceForm {...props} />;
      case "education":
        return <EducationForm {...props} />;
      case "skills":
        return <SkillsForm {...props} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 style={styles.title}>Редактор секций</h2>

      <div style={styles.addRow}>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={styles.select}
        >
          <option value="">Выберите секцию</option>
          <option value="experience">Опыт</option>
          <option value="education">Образование</option>
          <option value="skills">Навыки</option>
        </select>

        <button
          onClick={addSection}
          style={styles.addButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0069d9")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Добавить секцию
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sectionList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ ...styles.section, ...provided.draggableProps.style }}
                    >
                      <h3 style={{ marginTop: 0 }}>{sectionTypes[section.type]}</h3>
                      {renderForm(section)}

                      <div style={styles.buttonRow}>
                        <button
                          onClick={() =>
                            updateSection(section.id, sectionTemplates[section.type])
                          }
                          style={styles.aiButton}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#554fd8")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#6c63ff")
                          }
                        >
                          AI-подсказка
                        </button>

                        <button
                          onClick={() => deleteSection(section.id)}
                          style={styles.deleteButton}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#e04344")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#ff4d4f")
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const styles = {
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  addRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  select: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  section: {
    padding: 12,
    marginBottom: 16,
    background: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  buttonRow: {
    display: "flex",
    gap: 10,
    marginTop: 12,
  },
  aiButton: {
    padding: "8px 14px",
    backgroundColor: "#6c63ff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  deleteButton: {
    padding: "8px 14px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  },
};
