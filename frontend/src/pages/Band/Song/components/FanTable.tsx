import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import 'dayjs/locale/zh-cn';
import { Modal } from 'antd';
import React, { useRef } from 'react';
import { getFanAlbumList, getFanSongList } from '@/services/db-design/api';

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
const columns: ProColumns<API.FanListItem>[] = [
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
];
const FanTable: React.FC<UpdateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  return (
    <Modal
      centered
      width={960}
      bodyStyle={{
        padding: '16px 16px 16px',
      }}
      footer={false}
      destroyOnClose
      title={'粉丝列表'}
      open={props.updateModalOpen}
      onCancel={props.onCancel}
    >
      <ProTable<API.FanListItem, API.PageParams>
        toolBarRender={false}
        headerTitle={'粉丝列表'}
        actionRef={actionRef}
        rowKey="sid"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => {
          return getFanSongList(params, sort, filter, {}, { sid: props.values.sid });
        }}
        columns={columns}
      />
    </Modal>
  );
};
export default FanTable;
