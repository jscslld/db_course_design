import { getFanList } from '@/services/db-design/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef } from 'react';
import { useModel } from '@@/exports';

const BandFanIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');

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
  return (
    <PageContainer>
      <ProTable<API.FanListItem, API.PageParams>
        headerTitle={'粉丝列表'}
        actionRef={actionRef}
        rowKey="fid"
        search={{
          labelWidth: 120,
        }}
        request={getFanList}
        columns={columns}
      />
    </PageContainer>
  );
};
export default BandFanIndex;
