import { adminAddFan, outLogin, updateBandInfo, updateFanInfo } from '@/services/db-design/api';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Avatar, message, Modal, Spin } from 'antd';
import { setAlpha } from '@ant-design/pro-components';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import FanInfo from '@/pages/Fan/FanInfo';
import BandInfo from '@/pages/Band/BandInfo';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const Name = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const nameClassName = useEmotionCss(({ token }) => {
    return {
      width: currentUser?.role == 'band' ? '95px' : '64px',
      height: '48px',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none',
      },
    };
  });
  return (
    <span className={`${nameClassName} anticon`}>
      {currentUser?.role == 'band' ? currentUser?.bname : currentUser?.fname}
    </span>
  );
};

const AvatarLogo = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const avatarClassName = useEmotionCss(({ token }) => {
    return {
      marginRight: '8px',
      color: 'white',
      verticalAlign: 'top',
      background: setAlpha(token.colorBgContainer, 0.85),
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0,
      },
    };
  });

  return (
    <Avatar size="small" className={avatarClassName} style={{ backgroundColor: '#1890ff' }}>
      {currentUser?.role == 'band'
        ? currentUser?.bname.substring(0, 1)
        : currentUser?.fname.substring(0, 1)}
    </Avatar>
  );
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [fanModalOpen, handleFanModalOpen] = useState<boolean>(false);
  const [bandModalOpen, handleBandModalOpen] = useState<boolean>(false);

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({}),
      });
    }
  };
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      if (key === 'info') {
        if (currentUser?.role == 'fan') {
          handleFanModalOpen(true);
        }
        if (currentUser?.role == 'band') {
          handleBandModalOpen(true);
        }
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  if (
    !currentUser ||
    (currentUser.role == 'band' && !currentUser.bname) ||
    (currentUser.role == 'fan' && !currentUser.fname)
  ) {
    return loading;
  }

  const menuItems =
    currentUser?.role == 'admin'
      ? [
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
          },
        ]
      : [
          {
            key: 'info',
            icon: <UserOutlined />,
            label: currentUser?.role == 'band' ? '修改乐队信息' : '修改个人信息',
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
          },
        ];
  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        <span className={actionClassName}>
          <AvatarLogo />
          <Name />
        </span>
      </HeaderDropdown>
      <FanInfo
        onCancel={() => {
          handleFanModalOpen(false);
        }}
        updateModalOpen={fanModalOpen}
        onSubmit={async (values) => {
          const success = await updateFanInfo(values);
          if (success) {
            if (success.code == 200) {
              message.success('操作成功');
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          }
        }}
      />
      <BandInfo
        onCancel={() => {
          handleBandModalOpen(false);
        }}
        updateModalOpen={bandModalOpen}
        onSubmit={async (values) => {
          const success = await updateBandInfo(values);
          if (success) {
            if (success.code == 200) {
              message.success('操作成功');
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          }
        }}
      />
    </>
  );
};

export default AvatarDropdown;
