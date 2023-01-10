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
  mid?: number;
  mname?: string;
  msex?: number;
  mjob?: string;
  menter?: string;
} & Partial<API.MemberListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.MemberListItem>;
};
const UpdateMemberForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      centered
      width={480}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      footer={false}
      destroyOnClose
      title={'修改成员信息'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        mname: string;
        msex?: string;
        mjob?: string;
        mage?: number;
        mid?: number;
        menter?: string;
      }>
        initialValues={{
          mid: props.values.mid,
          mname: props.values.mname,
          msex: props.values.msex,
          mjob: props.values.mjob,
          mage: parseInt(props.values.mage, 10),
          menter: props.values.menter,
        }}
        onFinish={props.onSubmit}
      >
        <ProFormText
          hidden={true}
          readonly={true}
          width="md"
          name="mid"
          label="mid"
          placeholder="mid"
          rules={[
            {
              required: true,
              message: '请输入mid',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="mname"
          label="成员名称"
          placeholder="成员名称"
          rules={[
            {
              required: true,
              message: '请输入成员名称',
            },
          ]}
        />
        <ProFormSelect
          width="md"
          name="msex"
          label="成员性别"
          placeholder="成员性别"
          valueEnum={{
            男: '男',
            女: '女',
          }}
          rules={[
            {
              required: true,
              message: '请选择成员性别',
            },
          ]}
        />
        <ProFormDigit
          width="md"
          name="mage"
          label="成员年龄"
          placeholder="成员年龄"
          rules={[
            {
              required: true,
              message: '请输入成员名称',
            },
          ]}
        />
        <ProFormText width="md" name="mjob" label="成员分工" placeholder="成员分工" />
        <ProFormDatePicker
          width="md"
          name="menter"
          label="加入日期"
          placeholder="加入日期"
          rules={[
            {
              required: true,
              message: '请输入加入日期',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};
export default UpdateMemberForm;
