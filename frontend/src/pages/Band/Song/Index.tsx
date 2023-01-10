import { addSong, deleteSong, getSongList, updateSongInfo } from '@/services/db-design/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateSongForm';
import UpdateSongForm from './components/UpdateSongForm';
import { useModel } from '@@/exports';
import AddSongForm from '@/pages/Band/Song/components/AddSongForm';
import FanTable from '@/pages/Band/Song/components/FanTable';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addSong({
      sname: fields.sname,
      sauthor: fields.authorId,
    });
    hide();
    message.success('添加成功');
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
    await updateSongInfo({
      sid: fields.sid,
      sname: fields.sname,
      sauthor: fields.authorId,
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试！');
    return false;
  }
};

const BandSongIndex: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [addModalOpen, handleAddModalOpen] = useState<boolean>(false);
  const [fanModalOpen, handleFanModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SongListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.SongListItem[]>([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const columns: ProColumns<API.SongListItem>[] = [
    {
      title: '歌曲名',
      dataIndex: 'sname',
      valueType: 'textarea',
    },
    {
      title: '作者',
      dataIndex: 'authorName',
      valueType: 'textarea',
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
              await deleteSong({ sid: record.sid });
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
            handleFanModalOpen(true);
            setCurrentRow(record);
          }}
        >
          粉丝列表
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
      <ProTable<API.SongListItem, API.PageParams>
        headerTitle={'歌曲列表'}
        actionRef={actionRef}
        rowKey="sid"
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
            <PlusOutlined /> 添加歌曲
          </Button>,
        ]}
        request={getSongList}
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
                await deleteSong({ sid: record.sid });
              }
              message.success('操作成功');
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <AddSongForm
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
      <UpdateSongForm
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
      <FanTable
        onCancel={() => {
          handleFanModalOpen(false);
        }}
        updateModalOpen={fanModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default BandSongIndex;
