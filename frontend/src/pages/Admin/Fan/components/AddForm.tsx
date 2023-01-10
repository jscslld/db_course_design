import {
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type FormValueType = {
  fid?: string;
  fname?: string;
  created?: boolean;
} & Partial<API.AdminFanListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.AdminFanListItem>;
};
const AddForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      centered
      width={480}
      bodyStyle={{
        padding: '32px 32px 32px',
      }}
      footer={false}
      destroyOnClose
      title={'创建歌迷'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        fid: string;
        fname?: string;
        fsex?: string;
        fjob?: string;
        fage?: number;
        password?: string;
      }>
        onFinish={props.onSubmit}
      >
        <ProFormText
          width="md"
          name="fid"
          label="歌迷编号"
          placeholder="歌迷编号"
          rules={[
            {
              required: true,
              message: '请输入歌迷编号',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="登陆密码"
          placeholder="登陆密码"
          rules={[
            {
              required: true,
              message: '请输入登陆密码',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="fname"
          label="歌迷姓名"
          placeholder="歌迷姓名"
          rules={[
            {
              required: true,
              message: '请输入歌迷姓名',
            },
          ]}
        />
        <ProFormSelect
          width="md"
          name="fsex"
          label="歌迷性别"
          placeholder="歌迷性别"
          valueEnum={{
            男: '男',
            女: '女',
          }}
          rules={[
            {
              required: true,
              message: '请选择歌迷性别',
            },
          ]}
        />
        <ProFormDigit
          width="md"
          name="fage"
          label="歌迷年龄"
          placeholder="歌迷年龄"
          rules={[
            {
              required: true,
              message: '请输入歌迷年龄',
            },
          ]}
        />
        <ProFormText width="md" name="fjob" label="歌迷工作" placeholder="歌迷工作" />
      </ProForm>
    </Modal>
  );
};
export default AddForm;
