import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Spin } from "antd";
import styled from "styled-components";
import { useSignUp } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../../routes";

const StyledButton = styled(Button)`
  width: 100%;
`;

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [signUpForm] = Form.useForm();
  const {
    mutate: signUp,
    isPending,
    isSuccess,
  } = useSignUp({
    onError: (e) => {
      messageApi.error(e.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isSuccess]);
  return (
    <>
      {contextHolder}
      <Spin spinning={isPending}>
        <Form form={signUpForm} layout="vertical" onFinish={signUp}>
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
      </Spin>
    </>
  );
};
