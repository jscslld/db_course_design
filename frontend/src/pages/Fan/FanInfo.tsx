import React from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@@/exports';
import { Modal } from 'antd';
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  updateModalOpen: boolean;
};
const FanInfo: React.FC<UpdateFormProps> = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  return (
    <Modal
      centered
      width={480}
      bodyStyle={{
        padding: '32px 32px 32px',
      }}
      footer={false}
      destroyOnClose
      title={'修改个人信息'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        fname: string;
        fage?: string;
        fsex?: number;
        fjob: string;
      }>
        initialValues={{
          fname: currentUser.fname,
          fsex: currentUser.fsex,
          fage: currentUser.fage,
          fjob: currentUser.fjob,
        }}
        layout={'horizontal'}
        onFinish={props.onSubmit}
      >
        <ProFormText
          width="md"
          name="fname"
          label="粉丝姓名"
          placeholder="粉丝姓名"
          rules={[
            {
              required: true,
              message: '请输入粉丝姓名',
            },
          ]}
        />
        <ProFormSelect
          width="md"
          name="fsex"
          label="粉丝性别"
          placeholder="粉丝性别"
          valueEnum={{
            男: '男',
            女: '女',
          }}
          rules={[
            {
              required: true,
              message: '请选择粉丝性别',
            },
          ]}
        />
        <ProFormDigit
          width="md"
          name="fage"
          label="粉丝年龄"
          placeholder="粉丝年龄"
          rules={[
            {
              required: true,
              message: '请输入粉丝年龄',
            },
          ]}
        />
        <ProFormText width="md" name="fjob" label="粉丝工作" placeholder="粉丝工作" />
      </ProForm>
    </Modal>
  );
};
export default FanInfo;
