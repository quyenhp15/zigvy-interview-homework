import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: 100%;
`;

export const SignInForm = () => {
  const [signInForm] = Form.useForm();

  const onSignIn = (values: any) => {
    console.log("Sign In values:", values);
  };

  return (
    <Form form={signInForm} layout="vertical" onFinish={onSignIn}>
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
  );
};
