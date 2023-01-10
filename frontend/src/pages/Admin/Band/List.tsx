import {
  adminAddBand,
  adminCreateBand,
  adminDelBand,
  deleteAlbum,
  dislikeBand,
  getAdminBandList,
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
import CreateForm from '@/pages/Admin/Band/components/CreateForm';
import AddForm from '@/pages/Admin/Band/components/AddForm';

const AdminBandList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const [checked, setChecked] = useState(false);
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const [addModalOpen, handleAddModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.AdminBandListItem>();
  const columns: ProColumns<API.AdminBandListItem>[] = [
    {
      title: '乐队名称',
      dataIndex: 'bname',
      valueType: 'textarea',
    },
    {
      title: '登录用户名',
      dataIndex: 'bid',
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
            const success = await adminDelBand({ id: record.bid });
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
      <ProTable<API.AdminBandListItem, API.PageParams>
        headerTitle={'乐队列表'}
        actionRef={actionRef}
        rowKey="bid"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => {
          return getAdminBandList(params, sort, filter, {});
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
            <PlusOutlined /> 添加乐队
          </Button>,
        ]}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await adminCreateBand(value);
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
          const success = await adminAddBand(value);
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
