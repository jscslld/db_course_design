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
import { getConcertInfo, getConcertSongList, searchSong } from '@/services/db-design/api';

export type FormValueType = {
  cid?: number;
  cname?: string;
  cstart?: string;
  cend?: string;
  clocation?: string;
  cnt?: number;
  climit?: number;
  bname?: string;
  blocation?: string;
  liked?: boolean;
} & Partial<API.FanConcertListItem>;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  modalOpenState: boolean;
  values: Partial<API.FanConcertListItem>;
};

const ConcertInfoModal: React.FC<FormProps> = (props) => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  const [state, setState] = useState({ data: {}, loading: true });
  useEffect(() => {
    if (props.values.cid != null) {
      getConcertInfo({ cid: props.values.cid }).then((data) => {
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
      title={'演唱会详情'}
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
                <Descriptions.Item label="开始时间">{state.data?.info?.cstart}</Descriptions.Item>
                <Descriptions.Item label="结束时间">{state.data?.info?.cend}</Descriptions.Item>
                <Descriptions.Item label="举办地点">
                  {state.data?.info?.clocation}
                </Descriptions.Item>
                <Descriptions.Item label="举办乐队">{state.data?.info?.bname}</Descriptions.Item>
                <Descriptions.Item label="人数上限">{state.data?.info?.climit}</Descriptions.Item>
                <Descriptions.Item label="已报名人数">{state.data?.info?.cnt}</Descriptions.Item>
              </Descriptions>
            ),
          },
          {
            label: `演唱会歌单`,
            key: '2',
            children: (
              <Table
                columns={[
                  {
                    title: '序号',
                    dataIndex: 'sindex',
                    key: 'sindex',
                  },
                  {
                    title: '歌曲名称',
                    dataIndex: 'sname',
                    key: 'sname',
                  },
                  {
                    title: '作者',
                    dataIndex: 'sauthor',
                    key: 'sauthor',
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
export default ConcertInfoModal;
