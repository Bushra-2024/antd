import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Modal,
  Checkbox,
  Select,
  Card,
  Typography,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function TodoList() {
  const initialData = [
    { id: 1, title: "Study", description: "revise topics", status: false },
    { id: 2, title: "Note2", description: "Complete the task", status: true },
    { id: 3, title: "Note3", description: "Do this task finish", status: true },
  ];
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentNote, setCurrentNote] = useState(null);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    resetForm();
  }
  function openEditModal(note) {
    setIsEditModalOpen(true);
    setTitle(note.title);
    setDescription(note.description);
    setCurrentNote(note);
  }
  function closeEditModal() {
    setIsEditModalOpen(false);
    resetForm();
  }
  function resetForm() {
    setTitle("");
    setDescription("");
  }

  function saveNote() {
    let newOne = { id: Date.now(), title, description, status: false };
    setData([...data, newOne]);
    closeModal();
  }

  function updateUser() {
    setData(
      data.map((e) =>
        e.id === currentNote.id ? { ...e, title, description } : e
      )
    );
    closeEditModal();
  }

  function deleteUser(id) {
    setData(data.filter((e) => e.id !== id));
  }

  function checkk(e) {
    let updatedData = data.map((el) =>
      el.id === e.id ? { ...el, status: !el.status } : el
    );
    setData(updatedData);
  }

  function filterIt(value) {
    setFilter(value);
  }

  let filteredData = data
    .filter((el) =>
      filter === "Active"
        ? el.status
        : filter === "Inactive"
        ? !el.status
        : true
    )
    .filter((el) =>
      JSON.stringify(el).toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "30px",
        backgroundColor: "#f7f7f7",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography.Title
        level={2}
        style={{ textAlign: "center", color: "#333" }}
      >
        Todo List
      </Typography.Title>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          onClick={openModal}
          style={{
            width: "30%",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
          }}
        >
          Add Note
        </Button>
        <Select
          value={filter}
          onChange={filterIt}
          style={{
            width: "30%",
            height: "40px",
            borderRadius: "8px",
            borderColor: "#ccc",
            padding: "8px",
            fontSize: "16px",
          }}
        >
          <Select.Option value="All">All</Select.Option>
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
        </Select>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "45%",
            padding: "8px 12px",
            borderRadius: "8px",
            borderColor: "#ccc",
            fontSize: "16px",
            outline: "none",
          }}
        />
      </div>

      {filteredData.length > 0 ? (
        filteredData.map((e) => (
          <Card
            key={e.id}
            style={{
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Checkbox
                checked={e.status}
                onChange={() => checkk(e)}
                style={{ fontSize: "18px", color: "#333" }}
              />
              <div style={{ flexGrow: 1, paddingLeft: "15px" }}>
                <Typography.Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                    textDecoration: e.status ? "line-through":"none" , // Applying line-through when task is not done
                  }}
                >
                  {e.title}
                </Typography.Text>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  {e.description}
                </p>
              </div>
              <Button
                type="primary"
                style={{
                  backgroundColor: e.status ? "#4CAF50" : "#FF6347",
                  borderColor: e.status ? "#4CAF50" : "#FF6347",
                  color: "white",
                  fontWeight: "bold",
                  padding: "5px 15px",
                  borderRadius: "8px",
                }}
              >
                {e.status ? "Done" : "Not Done"} {/* Changed text here */}
              </Button>
              <Space style={{ marginLeft: "15px" }}>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => deleteUser(e.id)}
                  style={{ color: "#FF6347", fontSize: "20px" }}
                />
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => openEditModal(e)}
                  style={{ color: "#4CAF50", fontSize: "20px" }}
                />
              </Space>
            </div>
          </Card>
        ))
      ) : (
        <Typography.Text
          style={{
            color: "#FF6347",
            fontSize: "16px",
            display: "block",
            textAlign: "center",
          }}
        >
          No tasks found
        </Typography.Text>
      )}

      <Modal
        title="Add New Note"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={saveNote}>
            Save Note
          </Button>,
        ]}
      >
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "10px", borderRadius: "8px", padding: "10px" }}
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ borderRadius: "8px", padding: "10px" }}
        />
      </Modal>

      <Modal
        title="Edit Note"
        visible={isEditModalOpen}
        onCancel={closeEditModal}
        footer={[
          <Button key="back" onClick={closeEditModal}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={updateUser}>
            Update Note
          </Button>,
        ]}
      >
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "10px", borderRadius: "8px", padding: "10px" }}
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ borderRadius: "8px", padding: "10px" }}
        />
      </Modal>
    </div>
  );
}

export default TodoList;
