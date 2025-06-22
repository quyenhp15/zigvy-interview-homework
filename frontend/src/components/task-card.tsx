// src/components/TaskCard.tsx
import React from "react";
import styled from "styled-components";
import { Card, Tag, Typography, Space, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Task } from "../models";

const { Paragraph, Text } = Typography;

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "To Do":
        return "default";
      case "In Progress":
        return "blue";
      case "Done":
        return "green";
      default:
        return "default";
    }
  };

  return (
    <StyledCard
      title={<CardTitle>{task.title}</CardTitle>}
      extra={
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit?.(task)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDelete?.(task.id)}
              size="small"
              danger
            />
          </Tooltip>
        </Space>
      }
    >
      <Space direction="vertical" size="small">
        <Paragraph ellipsis={{ rows: 2 }}>{task.description}</Paragraph>
        <Space size="middle">
          <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
        </Space>
        {task?.dueDate && (
          <Text type="secondary">Due: {task.dueDate.toLocaleDateString()}</Text>
        )}
      </Space>
    </StyledCard>
  );
};

// Styled-components
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
