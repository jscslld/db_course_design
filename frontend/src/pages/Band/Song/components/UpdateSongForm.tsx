import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
import { searchAuthor } from '@/services/db-design/api';

export type FormValueType = {
  sid?: number;
  sname?: string;
  authorId?: number;
} & Partial<API.MemberListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.SongListItem>;
};
const UpdateSongForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      centered
      width={480}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      footer={false}
      destroyOnClose
      title={'修改歌曲信息'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        authorId: string;
        sid?: number;
        sname?: string;
      }>
        initialValues={{
          sid: props.values.sid,
          authorId: props.values.authorId,
          sname: props.values.sname,
        }}
        onFinish={props.onSubmit}
      >
        <ProFormText
          hidden={true}
          readonly={true}
          width="md"
          name="sid"
          label="sid"
          placeholder="sid"
          rules={[
            {
              required: true,
              message: '请输入sid',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="sname"
          label="歌曲名称"
          placeholder="歌曲名称"
          rules={[
            {
              required: true,
              message: '请输入歌曲名称',
            },
          ]}
        />
        <ProFormSelect
          showSearch={true}
          width="md"
          name="authorId"
          label="作者"
          placeholder="作者"
          request={async () => {
            return (await searchAuthor()).data;
          }}
          rules={[
            {
              required: true,
              message: '请选择作者',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};
export default UpdateSongForm;
