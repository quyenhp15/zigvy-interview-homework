import React from "react";
import styled from "styled-components";
import { Card, Tag, Typography, Space } from "antd";
import { Task } from "../models";
import { getStatusColor } from "../utils";

const { Paragraph } = Typography;

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <StyledCard title={<CardTitle>{task.title}</CardTitle>} onClick={onClick}>
      <Space direction="vertical" size="small">
        <Paragraph ellipsis={{ rows: 2 }}>{task.description}</Paragraph>
        <Space size="middle">
          <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
        </Space>
      </Space>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
`;
