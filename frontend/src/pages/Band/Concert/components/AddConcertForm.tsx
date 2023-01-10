import {
  ProForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-components';
import '@umijs/max';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import { ConfigProvider, Modal } from 'antd';
import React from 'react';

export type FormValueType = {
  cid?: number;
  cstart?: string;
  cend?: string;
  clocation?: string;
  climit?: number;
} & Partial<API.ConcertListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.ConcertListItem>;
};
const AddConcertForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      centered
      width={480}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      footer={false}
      destroyOnClose
      title={'添加演唱会'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        cid?: number;
        cstart?: string;
        cend?: string;
        clocation?: string;
        climit?: number;
      }>
        onFinish={props.onSubmit}
      >
        <ConfigProvider locale={locale}>
          <ProFormDateTimePicker
            width="md"
            name="cstart"
            label="开始时间"
            rules={[
              {
                required: true,
                message: '请输入开始时间',
              },
            ]}
          />
          <ProFormDateTimePicker
            width="md"
            name="cend"
            label="结束时间"
            rules={[
              {
                required: true,
                message: '请输入结束时间',
              },
            ]}
          />
        </ConfigProvider>
        <ProFormText
          width="md"
          name="clocation"
          label="举办地点"
          placeholder="举办地点"
          rules={[
            {
              required: true,
              message: '请输入举办地点',
            },
          ]}
        />
        <ProFormDigit
          min={0}
          width="md"
          name="climit"
          label="人数上限"
          placeholder="人数上限"
          rules={[
            {
              required: true,
              message: '请输入人数上限',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};
export default AddConcertForm;
