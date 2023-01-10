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
  getConcertInfo,
  getConcertSongList,
  getSongInfo,
  searchSong,
} from '@/services/db-design/api';

export type FormValueType = {
  sid?: number;
  sname?: string;
  mid?: number;
  mname?: string;
  bid?: number;
  bname?: string;
  fanCnt?: number;
  liked?: boolean;
} & Partial<API.FanSongListItem>;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  modalOpenState: boolean;
  values: Partial<API.FanSongListItem>;
};

const SongInfoModal: React.FC<FormProps> = (props) => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  const [state, setState] = useState({ data: {}, loading: true });
  useEffect(() => {
    if (props.values.sid != null) {
      getSongInfo({ sid: props.values.sid }).then((data) => {
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
      title={'歌曲详情'}
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
                <Descriptions.Item label="歌曲名称">{state.data?.info?.sname}</Descriptions.Item>
                <Descriptions.Item label="创作者">{state.data?.info?.mname}</Descriptions.Item>
                <Descriptions.Item label="乐队名称">{state.data?.info?.bname}</Descriptions.Item>
              </Descriptions>
            ),
          },
          {
            label: `收录的演唱会`,
            key: '2',
            children: (
              <Table
                columns={[
                  {
                    title: '开始时间',
                    dataIndex: 'cstart',
                    key: 'cstart',
                  },
                  {
                    title: '结束时间',
                    dataIndex: 'cend',
                    key: 'cend',
                  },
                  {
                    title: '举办地点',
                    dataIndex: 'clocation',
                    key: 'clocation',
                  },
                  {
                    title: '举办乐队',
                    dataIndex: 'bname',
                    key: 'bname',
                  },
                ]}
                dataSource={state.data?.concert}
                size="small"
              />
            ),
          },
          {
            label: `收录的专辑`,
            key: '3',
            children: (
              <Table
                columns={[
                  {
                    title: '专辑名称',
                    dataIndex: 'aname',
                    key: 'aname',
                  },
                  {
                    title: '发行公司',
                    dataIndex: 'acompany',
                    key: 'acompany',
                  },
                  {
                    title: '发行时间',
                    dataIndex: 'adate',
                    key: 'adate',
                  },
                  {
                    title: '发行乐队',
                    dataIndex: 'bname',
                    key: 'bname',
                  },
                ]}
                dataSource={state.data?.album}
                size="small"
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};
export default SongInfoModal;
