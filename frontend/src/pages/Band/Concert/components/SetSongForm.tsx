import {
  FormListActionType,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import '@umijs/max';
import 'dayjs/locale/zh-cn';
import { Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getConcertSongList, searchSong } from '@/services/db-design/api';

export type FormValueType = {
  aname: string;
  cid?: number;
  acompany?: string;
  adate?: string;
} & Partial<API.AlbumListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.AlbumListItem>;
};

const SetSongForm: React.FC<UpdateFormProps> = (props) => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  const [state, setState] = useState({ data: [] });
  useEffect(() => {
    if (props.values.cid != null) {
      getConcertSongList({ cid: props.values.cid }).then((data) => {
        for (const datum of data.data) {
          console.log(datum);
          actionRef.current?.add({ sid: datum.sid.toString() });
        }
      });
    }
  }, [props]);

  return (
    <Modal
      centered
      width={480}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      footer={false}
      destroyOnClose
      title={'演唱会歌单'}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm
        layout={'horizontal'}
        initialValues={{
          cid: props.values.cid,
        }}
        onFinish={props.onSubmit}
      >
        <ProFormText
          hidden={true}
          readonly={true}
          width="md"
          name="cid"
          label="cid"
          placeholder="cid"
          rules={[
            {
              required: true,
              message: '请输入cid',
            },
          ]}
        />
        <ProFormList
          actionRef={actionRef}
          copyIconProps={false}
          name={'songs'}
          initialValue={[]}
          itemContainerRender={(doms) => {
            return <ProForm.Group>{doms}</ProForm.Group>;
          }}
          alwaysShowItemLabel
          creatorButtonProps={{ creatorButtonText: '添加一首歌曲' }}
        >
          {(f, index, action) => {
            console.log(f, index, action);
            return (
              <>
                <ProFormSelect
                  showSearch
                  request={async () => {
                    return (await searchSong()).data;
                  }}
                  width={'md'}
                  name="sid"
                  label={`第 ${index + 1} 首歌`}
                />
              </>
            );
          }}
        </ProFormList>
      </ProForm>
    </Modal>
  );
};
export default SetSongForm;
