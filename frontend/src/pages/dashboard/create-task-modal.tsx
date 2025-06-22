import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
} from "antd";
import { Task, TaskStatus } from "../../models";
import { useCreateTask } from "../../hooks";
import { useEffect, useState } from "react";

type CreateTaskModalProps = {
  isVisible?: boolean;
  onCancel?: () => void;
  onSuccess: (createdTask: Task) => void;
};
export const CreateTaskModal = ({
  isVisible,
  onCancel,
  onSuccess,
}: CreateTaskModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(isVisible);

  const {
    mutate: create,
    isPending,
    isSuccess,
  } = useCreateTask({
    onError: (e) => {
      messageApi.error(e.message);
    },
    onSuccess,
  });

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
    }
  }, [isSuccess]);

  return (
    <>
      {contextHolder}
      <Modal
        open={visible}
        title="Create New Task"
        footer={null}
        onCancel={onCancel}
        destroyOnHidden
      >
        <Spin spinning={isPending}>
          <Form layout="vertical" onFinish={create}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select
                options={Object.values(TaskStatus).map((s) => ({
                  label: s,
                  value: s,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Task
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
