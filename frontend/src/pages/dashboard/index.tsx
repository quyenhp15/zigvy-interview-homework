import React, { useEffect, useMemo, useState } from "react";
import { TaskBoard } from "./task-board";
import { Button, Input, Result, Space, Spin } from "antd";
import styled from "styled-components";
import { Task } from "../../models";
import { PlusOutlined } from "@ant-design/icons";
import { CreateTaskModal } from "./create-task-modal";
import { useGetTasks } from "../../hooks";

export const DashBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isPending, isSuccess, isError } = useGetTasks();

  useEffect(() => {
    if (isSuccess) {
      setTasks(data);
    }
  }, [isSuccess]);

  const filteredTasks = useMemo(() => {
    if (tasks?.length === 0) {
      return undefined;
    }

    const filteredTasks = tasks?.filter((task) => {
      const isMatchTitle = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return isMatchTitle;
    });

    if (filteredTasks?.length === 0) {
      return undefined;
    }
    return filteredTasks;
  }, [search, tasks]);

  if (isError) {
    return <Result status="warning" title="There are some problems" />;
  }

  return (
    <StyledDashBoardContainer direction="vertical" size={"large"}>
      <Spin spinning={isPending}>
        <StyledSpaceContainer direction="vertical">
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
        </StyledSpaceContainer>
        <CreateTaskModal
          isVisible={isCreateModalOpen}
          onCancel={() => setIsCreateModalOpen(false)}
          onSuccess={(task: Task) => setTasks([...tasks, task])}
        />
      </Spin>
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

const StyledSpaceContainer = styled(Space)`
  width: 100%;
`;
