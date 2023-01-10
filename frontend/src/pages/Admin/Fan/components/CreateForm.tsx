import { ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
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
const CreateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      centered
      width={480}
      bodyStyle={{
        padding: '32px 32px 32px',
      }}
      footer={false}
      destroyOnClose
      title={'同步MySQL用户'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        username: string;
        password?: string;
      }>
        onFinish={props.onSubmit}
        initialValues={{ username: props.values.fid, password: '' }}
      >
        <ProFormText
          width="md"
          name="username"
          label="登陆用户名"
          placeholder="登陆用户名"
          disabled={true}
          rules={[
            {
              required: true,
              message: '请输入登陆用户名',
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
      </ProForm>
    </Modal>
  );
};
export default CreateForm;
