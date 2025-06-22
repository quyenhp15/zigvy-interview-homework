import { Modal, Tag, Typography } from "antd";
import { Task } from "../../models";
import styled from "styled-components";
import { getStatusColor } from "../../utils";

const { Paragraph } = Typography;
type TaskDetailModalProps = {
  task: Task;
  onCancel: () => void;
};
export const TaskDetailModal = ({ task, onCancel }: TaskDetailModalProps) => {
  return (
    <Modal open={true} onCancel={onCancel} footer={null} width={600}>
      <ModalContent>
        <MainContent>
          <SectionTitle>{task.title}</SectionTitle>
          <Section>
            <Label>Description</Label>
            <Paragraph>{task.description}</Paragraph>
          </Section>
        </MainContent>

        <Sidebar>
          <Section>
            <Label>Status</Label>
            <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
          </Section>
        </Sidebar>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px 8px;
`;

const MainContent = styled.div`
  flex: 2;
`;

const Sidebar = styled.div`
  flex: 1;
  border-left: 1px solid #f0f0f0;
  padding-left: 16px;
`;

const Section = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  color: #888;
`;
