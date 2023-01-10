import {
  deleteAlbum,
  dislikeAlbum,
  dislikeBand,
  getFanAlbumLikeList,
  getFanBandLikeList,
  getFanBandList,
  getFanList,
  gettFanAlbumList,
  likeAlbum,
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
import AlbumInfoModal from '@/pages/Fan/Album/components/AlbumInfoModal';

const FanAlbumLikeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const [checked, setChecked] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.FanConcertListItem>();
  const [infoModalOpen, handleInfoModalOpen] = useState<boolean>(false);
  const columns: ProColumns<API.FanAlbumListItem>[] = [
    {
      title: '专辑名称',
      dataIndex: 'aname',
      valueType: 'textarea',
      render: (_, record) => [
        <a
          onClick={async () => {
            setCurrentRow(record);
            handleInfoModalOpen(true);
          }}
        >
          {record.aname}
        </a>,
      ],
    },
    {
      title: '发行公司',
      dataIndex: 'acompany',
      valueType: 'textarea',
    },
    {
      title: '发行乐队',
      dataIndex: 'bname',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '发行时间',
      dataIndex: 'adate',
      hideInSearch: true,
    },
    {
      title: '歌曲数量',
      dataIndex: 'cnt',
      hideInSearch: true,
    },
    {
      title: '喜欢人数',
      dataIndex: 'fanCnt',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.liked ? (
          <a
            onClick={async () => {
              await dislikeAlbum({ aid: record?.aid });
              actionRef.current?.reload();
            }}
          >
            <HeartFilled style={{ color: '#eb2f96' }} />
          </a>
        ) : (
          <a
            onClick={async () => {
              await likeAlbum({ aid: record?.aid });
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
      <ProTable<API.FanAlbumListItem, API.PageParams>
        headerTitle={'专辑列表'}
        actionRef={actionRef}
        rowKey="bid"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => {
          return getFanAlbumLikeList(params, sort, filter);
        }}
        columns={columns}
      />
      <AlbumInfoModal
        onCancel={() => {
          handleInfoModalOpen(false);
        }}
        modalOpenState={infoModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default FanAlbumLikeList;
