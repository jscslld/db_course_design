import {
  FormListActionType,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import '@umijs/max';
import 'dayjs/locale/zh-cn';
import { Descriptions, Divider, Modal, Table, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  getAlbumInfo,
  getBandInfo,
  getConcertInfo,
  getConcertSongList,
  searchSong,
} from '@/services/db-design/api';

export type FormValueType = {
  bid?: string;
  bname?: string;
  bestablish?: string;
  cnt?: number;
  fanCnt?: number;
  liked?: boolean;
} & Partial<API.FanBandListItem>;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  modalOpenState: boolean;
  values: Partial<API.FanBandListItem>;
};

const BandInfoModal: React.FC<FormProps> = (props) => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  const [state, setState] = useState({ data: {}, loading: true });
  useEffect(() => {
    if (props.values.bid != null) {
      getBandInfo({ bid: props.values.bid }).then((data) => {
        setState({ data: data.data, loading: false });
      });
      console.log(state);
    }
  }, [props]);

  return (
    <Modal
      centered
      width={640}
      bodyStyle={{
        padding: '10px',
      }}
      footer={false}
      destroyOnClose
      title={'乐队详情'}
      open={props.modalOpenState}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `基本信息`,
            key: '1',
            children: (
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="乐队名称">{state.data?.info?.bname}</Descriptions.Item>
                <Descriptions.Item label="成立时间">
                  {state.data?.info?.bestablish}
                </Descriptions.Item>
                <Descriptions.Item label="队长姓名">{state.data?.info?.headName}</Descriptions.Item>
                <Descriptions.Item label="乐队人数">{state.data?.info?.cnt}</Descriptions.Item>
                <Descriptions.Item label="粉丝人数">{state.data?.info?.fanCnt}</Descriptions.Item>
              </Descriptions>
            ),
          },
          {
            label: `在队成员`,
            key: '2',
            children: (
              <Table
                columns={[
                  {
                    title: '姓名',
                    dataIndex: 'mname',
                  },
                  {
                    title: '性别',
                    dataIndex: 'msex',
                  },
                  {
                    title: '年龄',
                    dataIndex: 'mage',
                  },
                  {
                    title: '分工',
                    dataIndex: 'mjob',
                  },
                  {
                    title: '加入日期',
                    dataIndex: 'menter',
                  },
                ]}
                dataSource={state.data?.inMember}
                size="small"
              />
            ),
          },
          {
            label: `离队成员`,
            key: '3',
            children: (
              <Table
                columns={[
                  {
                    title: '姓名',
                    dataIndex: 'mname',
                  },
                  {
                    title: '性别',
                    dataIndex: 'msex',
                  },
                  {
                    title: '年龄',
                    dataIndex: 'mage',
                  },
                  {
                    title: '分工',
                    dataIndex: 'mjob',
                  },
                  {
                    title: '加入日期',
                    dataIndex: 'menter',
                  },
                  {
                    title: '离队日期',
                    dataIndex: 'mleave',
                  },
                ]}
                dataSource={state.data?.outMember}
                size="small"
              />
            ),
          },
          {
            label: `乐队专辑`,
            key: '4',
            children: (
              <Table
                columns={[
                  {
                    title: '专辑名称',
                    dataIndex: 'aname',
                  },
                  {
                    title: '发行公司',
                    dataIndex: 'acompany',
                  },
                  {
                    title: '发行时间',
                    dataIndex: 'adate',
                  },
                  {
                    title: '歌曲数量',
                    dataIndex: 'cnt',
                  },
                  {
                    title: '粉丝数量',
                    dataIndex: 'fanCnt',
                  },
                ]}
                dataSource={state.data?.albumList}
                size="small"
              />
            ),
          },
          {
            label: `乐队歌曲`,
            key: '5',
            children: (
              <Table
                columns={[
                  {
                    title: '歌曲名称',
                    dataIndex: 'sname',
                  },
                  {
                    title: '创作者',
                    dataIndex: 'mname',
                  },
                  {
                    title: '粉丝数量',
                    dataIndex: 'fanCnt',
                  },
                ]}
                dataSource={state.data?.songList}
                size="small"
              />
            ),
          },
          {
            label: `乐队演唱会`,
            key: '6',
            children: (
              <Table
                columns={[
                  {
                    title: '开始时间',
                    dataIndex: 'cstart',
                  },
                  {
                    title: '结束时间',
                    dataIndex: 'cend',
                  },
                  {
                    title: '举办地点',
                    dataIndex: 'clocation',
                  },
                  {
                    title: '人数上限',
                    dataIndex: 'climit',
                  },
                  {
                    title: '报名人数',
                    dataIndex: 'cnt',
                  },
                ]}
                dataSource={state.data?.concertList}
                size="small"
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};
export default BandInfoModal;
