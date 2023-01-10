import {
  addAlbum,
  deleteAlbum,
  getAlbumList,
  setAlbumSongList,
  updateAlbumInfo,
} from '@/services/db-design/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateAlbumForm';
import UpdateAlbumForm from './components/UpdateAlbumForm';
import { useModel } from '@@/exports';
import AddAlbumForm from '@/pages/Band/Album/components/AddAlbumForm';
import SetSongForm from '@/pages/Band/Album/components/SetSongForm';
import FanTable from '@/pages/Band/Album/components/FanTable';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addAlbum({
      aname: fields.aname,
      acompany: fields.acompany,
      adate: fields.adate,
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
    const resp = await updateAlbumInfo({
      aid: fields.aid,
      aname: fields.aname,
      acompany: fields.acompany,
      adate: fields.adate,
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

const BandAlbumIndex: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [addModalOpen, handleAddModalOpen] = useState<boolean>(false);
  const [setModalOpen, handleSetModalOpen] = useState<boolean>(false);
  const [fanModalOpen, handleFanModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.AlbumListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.AlbumListItem[]>([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const columns: ProColumns<API.AlbumListItem>[] = [
    {
      title: '专辑名',
      dataIndex: 'aname',
      valueType: 'textarea',
    },
    {
      title: '发行公司',
      dataIndex: 'acompany',
      valueType: 'textarea',
    },
    {
      title: '发行日期',
      dataIndex: 'adate',
      hideInSearch: true,
    },
    {
      title: '歌曲数量',
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
              await deleteAlbum({ aid: record.aid });
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
          歌曲列表
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
      <ProTable<API.AlbumListItem, API.PageParams>
        headerTitle={'专辑列表'}
        actionRef={actionRef}
        rowKey="aid"
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
            <PlusOutlined /> 添加专辑
          </Button>,
        ]}
        request={getAlbumList}
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
                await deleteAlbum({ aid: record.aid });
              }
              message.success('操作成功');
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <AddAlbumForm
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
      <UpdateAlbumForm
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
          const success = await setAlbumSongList({ aid: value.aid, sid: sid_list });
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
export default BandAlbumIndex;
