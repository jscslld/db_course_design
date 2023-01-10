import { ProForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components';
import '@umijs/max';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import { ConfigProvider, Modal } from 'antd';
import React from 'react';

export type FormValueType = {
  aname: string;
  aid?: number;
  acompany?: string;
  adate?: string;
} & Partial<API.AlbumListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.AlbumListItem>;
};
const UpdateAlbumForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      centered
      width={480}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      footer={false}
      destroyOnClose
      title={'修改专辑信息'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        aname: string;
        aid?: number;
        acompany?: string;
        adate?: string;
      }>
        initialValues={{
          aid: props.values.aid,
          aname: props.values.aname,
          acompany: props.values.acompany,
          adate: props.values.adate,
        }}
        onFinish={props.onSubmit}
      >
        <ProFormText
          hidden={true}
          readonly={true}
          width="md"
          name="aid"
          label="aid"
          placeholder="aid"
          rules={[
            {
              required: true,
              message: '请输入aid',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="aname"
          label="专辑名称"
          placeholder="专辑名称"
          rules={[
            {
              required: true,
              message: '请输入专辑名称',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="acompany"
          label="发行公司"
          placeholder="发行公司"
          rules={[
            {
              required: true,
              message: '请输入发行公司',
            },
          ]}
        />
        <ConfigProvider locale={locale}>
          <ProFormDatePicker
            width="md"
            name="adate"
            label="发行日期"
            rules={[
              {
                required: true,
                message: '请输入发行日期',
              },
            ]}
          />
        </ConfigProvider>
      </ProForm>
    </Modal>
  );
};
export default UpdateAlbumForm;
