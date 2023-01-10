import {
  adminAddBand,
  adminAddFan,
  adminCreateBand,
  adminCreateFan,
  adminDelBand,
  adminDelFan,
  deleteAlbum,
  dislikeBand,
  getAdminBandList,
  getAdminFanList,
  getFanBandList,
  getFanList,
  likeBand,
} from '@/services/db-design/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState } from 'react';
import { useModel } from '@@/exports';
import { Button, Checkbox, message, Tag } from 'antd';
import { HeartFilled, HeartOutlined, HeartTwoTone, PlusOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import CreateForm from '@/pages/Admin/Fan/components/CreateForm';
import AddForm from '@/pages/Admin/Fan/components/AddForm';

const AdminBandList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const [checked, setChecked] = useState(false);
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [addModalOpen, handleAddModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.AdminBandListItem>();
  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    actionRef.current?.reload();
  };
  const columns: ProColumns<API.AdminFanListItem>[] = [
    {
      title: '歌迷姓名',
      dataIndex: 'fname',
      valueType: 'textarea',
    },
    {
      title: '登录用户名',
      dataIndex: 'fid',
      valueType: 'textarea',
    },
    {
      title: 'MySQL同步状态',
      dataIndex: 'created',
      valueType: 'textarea',
      hideInSearch: true,
      render: (_, record) => [
        record.created ? <Tag color="success">已同步</Tag> : <Tag color="warning">未同步</Tag>,
      ],
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        !record.created ? (
          <a
            color="success"
            onClick={() => {
              setCurrentRow(record);
              handleCreateModalOpen(true);
            }}
          >
            创建登录用户
          </a>
        ) : (
          <></>
        ),
        <a
          color="success"
          onClick={async () => {
            const success = await adminDelFan({ id: record.fid });
            if (success.code == 200) {
              message.success('删除成功');
              if (actionRef.current) actionRef.current.reload();
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.AdminFanListItem, API.PageParams>
        headerTitle={'歌迷列表'}
        actionRef={actionRef}
        rowKey="fid"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => {
          return getAdminFanList(params, sort, filter, {});
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAddModalOpen(true);
            }}
          >
            <PlusOutlined /> 添加歌迷
          </Button>,
        ]}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await adminCreateFan(value);
          if (success) {
            if (success.code == 200) {
              message.success('操作成功');
            }
            handleCreateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCreateModalOpen(false);
        }}
        updateModalOpen={createModalOpen}
        values={currentRow || {}}
      />
      <AddForm
        onSubmit={async (value) => {
          const success = await adminAddFan(value);
          if (success) {
            if (success.code == 200) {
              message.success('操作成功');
            }
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
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default AdminBandList;
