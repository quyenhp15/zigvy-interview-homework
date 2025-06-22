import { useState } from "react";
import styled from "styled-components";
import { Task, TaskStatus } from "../../models";
import { TaskCard } from "../../components";
import { Space } from "antd";
import { TaskDetailModal } from "./task-detail-modal";

type TaskBoardProps = {
  tasks: Task[];
};
const statuses = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

export const TaskBoard = ({ tasks }: TaskBoardProps) => {
  const [selectedTask, setSelectedTask] = useState<Task>();

  return (
    <StyledBoardContainer align="center">
      {statuses.map((status) => (
        <Column key={status}>
          <ColumnTitle>{status}</ColumnTitle>
          <TaskList>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => setSelectedTask(task)}
                />
              ))}
          </TaskList>
        </Column>
      ))}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onCancel={() => setSelectedTask(undefined)}
        />
      )}
    </StyledBoardContainer>
  );
};

const StyledBoardContainer = styled(Space)`
  width: 100%;
  justify-content: space-around;
  align-items: start;
`;

const Column = styled.div`
  min-width: 300px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const ColumnTitle = styled.h3`
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 18px;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
