import React from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@@/exports';
import { Modal } from 'antd';
import { searchAuthor } from '@/services/db-design/api';
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
      title={'修改乐队信息'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm<{
        bname: string;
        bestablish?: string;
        bhead?: string;
      }>
        initialValues={{
          bname: currentUser.bname,
          bestablish: currentUser.bestablish,
          bhead: currentUser.bhead?.toString(),
        }}
        layout={'horizontal'}
        onFinish={props.onSubmit}
      >
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
        <ProFormSelect
          showSearch={true}
          width="md"
          name="bhead"
          label="队长"
          placeholder="队长"
          request={async () => {
            return (await searchAuthor()).data;
          }}
        />
      </ProForm>
    </Modal>
  );
};
export default FanInfo;
