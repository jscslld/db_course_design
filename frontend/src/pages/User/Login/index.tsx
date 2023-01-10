import Footer from '@/components/Footer';
import { login } from '@/services/db-design/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { useMount } from 'ahooks';

const Login: React.FC = () => {
  useMount(() => {
    document.title = '登录 - 《数据库原理与技术》课程设计';
  });
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    // 登录
    const data = await login({
      ...values,
    });
    console.log(data);
    if (data.code === 200) {
      message.success('登录成功');
      localStorage.setItem('role', data.data?.role);
      localStorage.setItem('token', data.data?.token);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div className={containerClassName}>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title="河海大学"
          subTitle="《数据库原理与技术》课程设计"
          initialValues={{
            autoLogin: true,
            userType: 'admin',
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {
            <>
              <div style={{ textAlign: 'center', display: 'block' }}>
                <ProFormRadio.Group
                  width={'lg'}
                  name="userType"
                  options={[
                    {
                      label: '管理员',
                      value: 'admin',
                    },
                    {
                      label: '乐队',
                      value: 'band',
                    },
                    {
                      label: '粉丝',
                      value: 'fan',
                    },
                  ]}
                  fieldProps={{
                    defaultValue: 'admin',
                    size: 'large',
                  }}
                />
              </div>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="用户名"
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          }
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
