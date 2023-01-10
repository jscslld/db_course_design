import {
  deleteAlbum,
  dislikeBand,
  dislikeConcert,
  dislikeSong,
  getFanBandList,
  getFanList,
  getfFanConcertList,
  getfFanSongList,
  likeBand,
  likeConcert,
  likeSong,
} from '@/services/db-design/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState } from 'react';
import { useModel } from '@@/exports';
import { Checkbox, message, Tag } from 'antd';
import { HeartFilled, HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import ConcertInfoModal from '@/pages/Fan/Concert/components/ConcertInfoModal';

const FanConcertList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const [checked, setChecked] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.FanConcertListItem>();
  const [infoModalOpen, handleInfoModalOpen] = useState<boolean>(false);
  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    actionRef.current?.reload();
  };
  const columns: ProColumns<API.FanConcertListItem>[] = [
    {
      title: '主办乐队',
      dataIndex: 'bname',
      valueType: 'textarea',
    },
    {
      title: '举行地点',
      dataIndex: 'clocation',
      valueType: 'textarea',
    },
    {
      title: '开始时间',
      dataIndex: 'cstart',
      valueType: 'textarea',
    },
    {
      title: '结束时间',
      dataIndex: 'cend',
      valueType: 'textarea',
    },
    {
      title: '人数上限',
      dataIndex: 'climit',
      hideInSearch: true,
    },

    {
      title: '已报名人数',
      dataIndex: 'cnt',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: '_',
      hideInSearch: true,
      render: (_, record) => [
        new Date(record.cstart).getTime() > new Date().getTime() ? (
          <Tag color="success">未开始</Tag>
        ) : new Date(record.cend).getTime() < new Date().getTime() ? (
          <Tag color="default">已结束</Tag>
        ) : (
          <Tag color="processing">举办中</Tag>
        ),
      ],
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          onClick={async () => {
            setCurrentRow(record);
            handleInfoModalOpen(true);
          }}
        >
          查看
        </a>,
        record.liked ? (
          <a
            style={
              new Date(record.cstart).getTime() < new Date().getTime()
                ? {
                    color: 'rgba(0,0,0,.25)',
                    cursor: 'not-allowed',
                  }
                : {}
            }
            onClick={async () => {
              await dislikeConcert({ cid: record?.cid });
              actionRef.current?.reload();
            }}
          >
            取消报名
          </a>
        ) : (
          <a
            style={
              new Date(record.cend).getTime() < new Date().getTime() || record.cnt >= record.climit
                ? {
                    color: 'rgba(0,0,0,.25)',
                    cursor: 'not-allowed',
                  }
                : {}
            }
            onClick={async () => {
              await likeConcert({ cid: record?.cid });
              actionRef.current?.reload();
            }}
          >
            报名
          </a>
        ),
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.FanConcertListItem, API.PageParams>
        headerTitle={'演唱会列表'}
        actionRef={actionRef}
        rowKey="cid"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => {
          return getfFanConcertList(params, sort, filter, {}, { liked: checked });
        }}
        columns={columns}
        toolBarRender={() => [
          <Checkbox checked={checked} onChange={onChange}>
            只看未报名
          </Checkbox>,
        ]}
      />
      <ConcertInfoModal
        onCancel={() => {
          handleInfoModalOpen(false);
        }}
        modalOpenState={infoModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default FanConcertList;
