import React from "react";
import styled from "styled-components";
import { Tabs, Card } from "antd";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

const { TabPane } = Tabs;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

const StyledCard = styled(Card)`
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
`;

export const AuthForm: React.FC = () => {
  return (
    <Container>
      <StyledCard title="Welcome">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Sign In" key="1">
            <SignInForm />
          </TabPane>

          <TabPane tab="Sign Up" key="2">
            <SignUpForm />
          </TabPane>
        </Tabs>
      </StyledCard>
    </Container>
  );
};
