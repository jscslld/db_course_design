import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import 'dayjs/locale/zh-cn';
import { Modal } from 'antd';
import React from 'react';
import { getParticipateList } from '@/services/db-design/api';

export type FormValueType = {
  aname: string;
  cid?: number;
  acompany?: string;
  adate?: string;
} & Partial<API.ConcertListItem>;
export type UpdateFormProps = {
  updateModalOpen: boolean;
  onCancel: () => void;
  values: Partial<API.ConcertListItem>;
};
const columns: ProColumns<API.FanParticipateListItem>[] = [
  {
    title: '粉丝姓名',
    dataIndex: 'fname',
    valueType: 'textarea',
  },
  {
    title: '粉丝性别',
    dataIndex: 'fsex',
    valueEnum: {
      男: { text: '男', msex: '男' },
      女: { text: '女', msex: '女' },
    },
  },
  {
    title: '粉丝年龄',
    dataIndex: 'fage',
    hideInSearch: true,
  },
  {
    title: '粉丝职业',
    dataIndex: 'fjob',
    valueType: 'textarea',
  },
  {
    title: '报名时间',
    dataIndex: 'ptime',
    hideInSearch: true,
  },
];
const ParticipateTable: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      centered
      width={960}
      bodyStyle={{
        padding: '16px 16px 16px',
      }}
      footer={false}
      destroyOnClose
      title={'报名名单'}
      open={props.updateModalOpen}
      onCancel={props.onCancel}
    >
      <ProTable<API.FanParticipateListItem>
        request={(params, sort, filter) => {
          return getParticipateList(params, sort, filter, {}, { cid: props.values.cid });
        }}
        rowKey="key"
        columns={columns}
        toolBarRender={false}
      />
    </Modal>
  );
};
export default ParticipateTable;
