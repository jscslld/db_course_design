import {
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import '@umijs/max';
import { ConfigProvider, Modal } from 'antd';
import React from 'react';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';

export type FormValueType = {
  bid?: string;
  bname?: string;
  created?: boolean;
} & Partial<API.AdminBandListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.AdminBandListItem>;
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
      title={'创建乐队'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        bid: string;
        bname?: string;
        bestablish?: string;
        password?: string;
      }>
        onFinish={props.onSubmit}
      >
        <ProFormText
          width="md"
          name="bid"
          label="乐队编号"
          placeholder="乐队编号"
          rules={[
            {
              required: true,
              message: '请输入乐队编号',
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
          name="bname"
          label="乐队名称"
          placeholder="乐队名称"
          rules={[
            {
              required: true,
              message: '请输入乐队名称',
            },
          ]}
        />
        <ConfigProvider locale={locale}>
          <ProFormDatePicker
            width="md"
            name="bestablish"
            label="成立时间"
            placeholder="成立时间"
            rules={[
              {
                required: true,
                message: '请选择成立时间',
              },
            ]}
          />
        </ConfigProvider>
      </ProForm>
    </Modal>
  );
};
export default AddForm;
