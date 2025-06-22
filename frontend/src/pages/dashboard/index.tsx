import React, { useMemo, useState } from "react";
import { TaskBoard } from "./task-board";
import { Button, Input, Space } from "antd";
import styled from "styled-components";
import { Task, TaskStatus } from "../../models";
import { PlusOutlined } from "@ant-design/icons";
import { CreateTaskModal } from "./create-task-modal";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Set up project",
    description: "Initialize repo and install dependencies",
    status: TaskStatus.TODO,
  },
  {
    id: "2",
    title: "Build Sign In UI",
    description: "Form, validation, connection to API",
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: "3",
    title: "Deploy App",
    description: "CI/CD to Vercel",
    status: TaskStatus.DONE,
  },
];

export const DashBoard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesTitle = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesTitle;
    });
  }, [search, tasks]);

  return (
    <StyledDashBoardContainer direction="vertical" size={"large"}>
      <StyledSpace align="baseline">
        <Input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 240 }}
        />
        <div style={{ marginLeft: "auto" }}>
          <Button
            type="primary"
            onClick={() => {
              setIsCreateModalOpen(true);
              console.log("click btn");
            }}
            icon={<PlusOutlined />}
          >
            Create Task
          </Button>
        </div>
      </StyledSpace>
      <TaskBoard tasks={filteredTasks || tasks} />
      <CreateTaskModal
        isVisible={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onSuccess={(task: Task) => setTasks([...tasks, task])}
      />
    </StyledDashBoardContainer>
  );
};

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: space-between;
`;

const StyledDashBoardContainer = styled(Space)`
  width: 100%;
  justify-content: space-around;

  padding: 10px 10px;
`;
