import {
  addMemberInfo,
  getInMemberList,
  getOutMemberList,
  outMember,
  removeRule,
  updateMemberInfo,
} from '@/services/db-design/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateMemberForm';
import UpdateMemberForm from './components/UpdateMemberForm';
import { useModel } from '@@/exports';
import AddMemberForm from '@/pages/Band/Member/components/AddMemberForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addMemberInfo({
      mname: fields.mname,
      mage: fields.mage,
      msex: fields.msex,
      mjob: fields.mjob,
      menter: fields.menter,
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
    await updateMemberInfo({
      mid: fields.mid,
      mname: fields.mname,
      mage: fields.mage,
      msex: fields.msex,
      mjob: fields.mjob,
      menter: fields.menter,
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

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};
const BandMemberIndex: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [addModalOpen, handleAddModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.MemberListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.MemberListItem[]>([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [activeKey, setActiveKey] = useState<React.Key>('tab1');
  const [requestFunc, setRequestFunc] = useState({ func: getInMemberList });
  const columns: ProColumns<API.MemberListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'mname',
      valueType: 'textarea',
    },
    {
      title: '性别',
      dataIndex: 'msex',
      valueEnum: {
        男: { text: '男', msex: '男' },
        女: { text: '女', msex: '女' },
      },
    },
    {
      title: '年龄',
      dataIndex: 'mage',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '分工',
      dataIndex: 'mjob',
    },
    {
      title: '身份',
      dataIndex: 'mid',
      hideInSearch: true,
      render: (_, record) => (record.mid == currentUser?.bhead ? '队长' : '成员'),
    },
    {
      title: '加入日期',
      sorter: true,
      dataIndex: 'menter',
      valueType: 'dateRange',
      hideInSearch: true,
      render: (_, record) => record.menter,
    },
    {
      title: '离开日期',
      sorter: true,
      dataIndex: 'mleave',
      valueType: 'dateRange',
      hideInSearch: true,
      hideInTable: activeKey == 'tab1',
      render: (_, record) => record.mleave,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          style={
            activeKey === 'tab2'
              ? {
                  color: 'rgba(0,0,0,.25)',
                  cursor: 'not-allowed',
                }
              : {}
          }
          onClick={async () => {
            try {
              await outMember({ mid: record.mid });
              if (actionRef.current) {
                actionRef.current?.reload();
              }
              message.success('离队成功');
            } catch (e) {
              message.error('离队失败');
            }
          }}
        >
          离队
        </a>,
        <a
          key="subscribeAlert"
          style={
            activeKey === 'tab2'
              ? {
                  color: 'rgba(0,0,0,.25)',
                  cursor: 'not-allowed',
                }
              : {}
          }
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改信息
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.MemberListItem, API.PageParams>
        headerTitle={'成员列表'}
        actionRef={actionRef}
        rowKey="mid"
        search={{
          labelWidth: 120,
        }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: 'tab1',
                label: <span>在队成员</span>,
              },
              {
                key: 'tab2',
                label: <span>离队成员</span>,
              },
            ],
            onChange: (key) => {
              setActiveKey(key as string);
              if (key == 'tab1') {
                setRequestFunc({ func: getInMemberList });
              } else if (key == 'tab2') {
                setRequestFunc({ func: getOutMemberList });
              }
              actionRef.current?.reload();
            },
          },
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAddModalOpen(true);
            }}
          >
            <PlusOutlined /> 新增成员
          </Button>,
        ]}
        request={requestFunc.func}
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
                await outMember({ mid: record.mid });
              }
              message.success('操作成功');
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量离队
          </Button>
        </FooterToolbar>
      )}
      <AddMemberForm
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
      <UpdateMemberForm
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
    </PageContainer>
  );
};
export default BandMemberIndex;
