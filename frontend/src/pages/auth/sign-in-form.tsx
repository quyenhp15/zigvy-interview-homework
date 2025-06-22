import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Spin } from "antd";
import styled from "styled-components";
import { useSignIn } from "../../hooks";

const StyledButton = styled(Button)`
  width: 100%;
`;

export const SignInForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [signInForm] = Form.useForm();
  const { mutate: signIn, isPending } = useSignIn({
    onError: (e) => {
      messageApi.error(e.message);
    },
  });

  return (
    <>
      {contextHolder}
      <Spin spinning={isPending}>
        <Form form={signInForm} layout="vertical" onFinish={signIn}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" htmlType="submit">
              Sign In
            </StyledButton>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
