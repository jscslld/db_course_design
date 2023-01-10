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
  getConcertInfo,
  getConcertSongList,
  searchSong,
} from '@/services/db-design/api';

export type FormValueType = {
  aid?: number;
  aname?: string;
  acompany?: string;
  adate?: string;
  cnt?: number;
  bname?: string;
  fanCnt?: number;
  liked?: boolean;
} & Partial<API.FanAlbumListItem>;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  modalOpenState: boolean;
  values: Partial<API.FanAlbumListItem>;
};

const AlbumInfoModal: React.FC<FormProps> = (props) => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  const [state, setState] = useState({ data: {}, loading: true });
  useEffect(() => {
    if (props.values.aid != null) {
      getAlbumInfo({ aid: props.values.aid }).then((data) => {
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
      title={'专辑详情'}
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
                <Descriptions.Item label="专辑名称">{state.data?.info?.aname}</Descriptions.Item>
                <Descriptions.Item label="发行公司">{state.data?.info?.acompany}</Descriptions.Item>
                <Descriptions.Item label="发行时间">{state.data?.info?.adate}</Descriptions.Item>
                <Descriptions.Item label="发行乐队">{state.data?.info?.bname}</Descriptions.Item>
              </Descriptions>
            ),
          },
          {
            label: `专辑歌单`,
            key: '2',
            children: (
              <Table
                columns={[
                  {
                    title: '歌曲名称',
                    dataIndex: 'sname',
                    key: 'sname',
                  },
                  {
                    title: '作者',
                    dataIndex: 'mname',
                    key: 'mname',
                  },
                ]}
                dataSource={state.data?.sheet}
                size="small"
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};
export default AlbumInfoModal;
