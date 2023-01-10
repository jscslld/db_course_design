import {
  deleteAlbum,
  dislikeBand,
  dislikeSong,
  getFanBandList,
  getFanList,
  getfFanSongLikeList,
  getfFanSongList,
  likeBand,
  likeSong,
} from '@/services/db-design/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState } from 'react';
import { useModel } from '@@/exports';
import { Checkbox, message } from 'antd';
import { HeartFilled, HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import SongInfoModal from '@/pages/Fan/Song/components/SongInfoModal';

const FanSongLikeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const [currentRow, setCurrentRow] = useState<API.FanConcertListItem>();
  const [infoModalOpen, handleInfoModalOpen] = useState<boolean>(false);
  const columns: ProColumns<API.FanSongListItem>[] = [
    {
      title: '歌曲名称',
      dataIndex: 'sname',
      valueType: 'textarea',
      render: (_, record) => [
        <a
          onClick={async () => {
            setCurrentRow(record);
            handleInfoModalOpen(true);
          }}
        >
          {record.sname}
        </a>,
      ],
    },
    {
      title: '乐队名称',
      dataIndex: 'bname',
      valueType: 'textarea',
    },
    {
      title: '创作者',
      dataIndex: 'mname',
      valueType: 'textarea',
    },
    {
      title: '粉丝人数',
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
              await dislikeSong({ sid: record?.sid });
              actionRef.current?.reload();
            }}
          >
            <HeartFilled style={{ color: '#eb2f96' }} />
          </a>
        ) : (
          <a
            onClick={async () => {
              await likeSong({ sid: record?.sid });
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
      <ProTable<API.FanSongListItem, API.PageParams>
        headerTitle={'歌曲列表'}
        actionRef={actionRef}
        rowKey="bid"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => {
          return getfFanSongLikeList(params, sort, filter, {});
        }}
        columns={columns}
      />
      <SongInfoModal
        onCancel={() => {
          handleInfoModalOpen(false);
        }}
        modalOpenState={infoModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default FanSongLikeList;
