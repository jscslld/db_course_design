import {
  deleteAlbum,
  dislikeBand,
  getFanBandLikeList,
  getFanBandList,
  getFanList,
  likeBand,
} from '@/services/db-design/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState } from 'react';
import { useModel } from '@@/exports';
import { Checkbox, message } from 'antd';
import { HeartFilled, HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import BandInfoModal from '@/pages/Fan/Band/components/BandInfoModal';

const FanBandLikeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.FanConcertListItem>();
  const [infoModalOpen, handleInfoModalOpen] = useState<boolean>(false);
  const columns: ProColumns<API.FanBandListItem>[] = [
    {
      title: '乐队名称',
      dataIndex: 'bname',
      valueType: 'textarea',
      render: (_, record) => [
        <a
          onClick={async () => {
            setCurrentRow(record);
            handleInfoModalOpen(true);
          }}
        >
          {record.bname}
        </a>,
      ],
    },
    {
      title: '成立时间',
      dataIndex: 'bestablish',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '成员人数',
      dataIndex: 'cnt',
      hideInSearch: true,
    },
    {
      title: '粉丝人数',
      dataIndex: 'fanCnt',
      hideInSearch: true,
    },
    {
      title: '队长',
      dataIndex: 'headName',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.liked ? (
          <a
            onClick={async () => {
              await dislikeBand({ bid: record?.bid });
              actionRef.current?.reload();
            }}
          >
            <HeartFilled style={{ color: '#eb2f96' }} />
          </a>
        ) : (
          <a
            onClick={async () => {
              await likeBand({ bid: record?.bid });
              actionRef.current?.reload();
            }}
          >
            <HeartOutlined style={{ color: '#eb2f96' }} />
          </a>
        ),
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.FanBandListItem, API.PageParams>
        headerTitle={'乐队列表'}
        actionRef={actionRef}
        rowKey="bid"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => {
          return getFanBandLikeList(params, sort, filter);
        }}
        columns={columns}
      />
      <BandInfoModal
        onCancel={() => {
          handleInfoModalOpen(false);
        }}
        modalOpenState={infoModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default FanBandLikeList;
