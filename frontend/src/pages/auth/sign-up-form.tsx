import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: 100%;
`;

export const SignUpForm = () => {
  const [signUpForm] = Form.useForm();

  const onSignUp = (values: any) => {
    console.log("Sign Up values:", values);
  };

  return (
    <Form form={signUpForm} layout="vertical" onFinish={onSignUp}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
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
          Sign Up
        </StyledButton>
      </Form.Item>
    </Form>
  );
};
