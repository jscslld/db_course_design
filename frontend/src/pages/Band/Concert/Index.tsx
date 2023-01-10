import {
  addConcert,
  deleteConcert,
  getConcertList,
  setConcertSongList,
  updateConcertInfo,
} from '@/services/db-design/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateConcertForm';
import UpdateConcertForm from './components/UpdateConcertForm';
import { useModel } from '@@/exports';
import AddConcertForm from '@/pages/Band/Concert/components/AddConcertForm';
import SetSongForm from '@/pages/Band/Concert/components/SetSongForm';
import ParticipateTable from '@/pages/Band/Concert/components/ParticipateTable';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addConcert({
      cstart: fields.cstart,
      cend: fields.cend,
      clocation: fields.clocation,
      climit: fields.climit,
    });

    hide();
    if (resp.code == 200) {
      message.success('添加成功');
    }
    return true;
  } catch (error) {
    hide();
    message.error('添加失败，请重试！');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在修改');
  try {
    const resp = await updateConcertInfo({
      cid: fields.cid,
      cstart: fields.cstart,
      cend: fields.cend,
      clocation: fields.clocation,
      climit: fields.climit,
    });
    hide();
    if (resp.code == 200) {
      message.success('修改成功');
    }
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试！');
    return false;
  }
};

const BandConcertIndex: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [addModalOpen, handleAddModalOpen] = useState<boolean>(false);
  const [setModalOpen, handleSetModalOpen] = useState<boolean>(false);
  const [parModalOpen, handleParModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ConcertListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ConcertListItem[]>([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const columns: ProColumns<API.ConcertListItem>[] = [
    {
      title: '开始时间',
      dataIndex: 'cstart',
      valueType: 'dateTime',
    },
    {
      title: '结束时间',
      dataIndex: 'cend',
      valueType: 'dateTime',
    },
    {
      title: '举办地点',
      dataIndex: 'clocation',
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={async () => {
            try {
              await deleteConcert({ cid: record.cid });
              if (actionRef.current) {
                actionRef.current?.reload();
              }
              message.success('删除成功');
            } catch (e) {
              message.error('删除失败');
            }
          }}
        >
          删除
        </a>,
        <a
          key="subscribeAlert"
          onClick={() => {
            handleSetModalOpen(true);
            setCurrentRow(record);
          }}
        >
          歌单修改
        </a>,
        <a
          key="subscribeAlert"
          onClick={() => {
            handleParModalOpen(true);
            setCurrentRow(record);
          }}
        >
          报名列表
        </a>,
        <a
          key="subscribeAlert"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ConcertListItem, API.PageParams>
        headerTitle={'演唱会列表'}
        actionRef={actionRef}
        rowKey="cid"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAddModalOpen(true);
            }}
          >
            <PlusOutlined /> 添加演唱会
          </Button>,
        ]}
        request={getConcertList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }
        >
          <Button
            type={'primary'}
            onClick={async () => {
              for (const record of selectedRowsState) {
                await deleteConcert({ cid: record.cid });
              }
              message.success('操作成功');
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <AddConcertForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleAddModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleAddModalOpen(false);
        }}
        updateModalOpen={addModalOpen}
        values={{}}
      />
      <UpdateConcertForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />
      <SetSongForm
        onSubmit={async (value) => {
          console.log(value);
          let sid_list = '';
          for (const valueElement of value.songs) {
            sid_list += valueElement.sid + ',';
          }
          console.log(sid_list);
          const success = await setConcertSongList({ cid: value.cid, sid: sid_list });
          if (success) {
            handleSetModalOpen(false);
            message.success('歌单设置成功');
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleSetModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={setModalOpen}
        values={currentRow || {}}
      />
      <ParticipateTable
        onCancel={() => {
          handleParModalOpen(false);
        }}
        updateModalOpen={parModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default BandConcertIndex;
