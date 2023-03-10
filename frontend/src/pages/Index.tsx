import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Alert, Col, Result, Row } from 'antd';
import React, { useState } from 'react';
import { Statistic } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import { useModel } from '@@/exports';
import { Column, G2, Pie } from '@ant-design/plots';
import { useMount, useSetState } from 'ahooks';
import { getFanAgeCount, getSongLikeTop10 } from '@/services/db-design/api';
import { SmileOutlined } from '@ant-design/icons';

const { Divider } = ProCard;

interface State {
  [key: string]: any;
}
const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [responsive, setResponsive] = useState(false);
  const [state, setState] = useSetState<State>({
    count: 0,
    fan_count_by_age: [],
    song_top: [],
  });

  useMount(async () => {
    if (currentUser?.role == 'band') {
      const fan_count_by_age = await getFanAgeCount();
      const state_fan_count: { type?: string; value?: number }[] = [];
      fan_count_by_age.data.forEach((data) => {
        state_fan_count.push({ type: data.ageScope, value: data.cnt });
      });
      setState({ fan_count_by_age: state_fan_count, song_top: (await getSongLikeTop10()).data });
    }
  });
  const G = G2.getEngine('canvas');
  const config = {
    appendPadding: 10,
    data: state?.fan_count_by_age,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    legend: false,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value}??? ${(data.percent * 100).toFixed(2)}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  const cfg = {
    data: state?.song_top,
    xField: 'sname',
    yField: 'cnt',
    label: {
      // ??????????????? label ??????????????????
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // ????????????
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      sname: {
        alias: '?????????',
      },
      cnt: {
        alias: '?????????',
      },
    },
  };
  return (
    <PageContainer>
      {currentUser?.role == 'band' && (
        <>
          <Row>
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <ProCard.Group title="??????????????????" direction={responsive ? 'column' : 'row'}>
                <ProCard>
                  <Statistic title="????????????" value={currentUser?.bid} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic title="????????????" value={currentUser?.bname} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic title="????????????" value={currentUser?.bestablish} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic title="????????????" value={currentUser?.bcnt} />
                </ProCard>
              </ProCard.Group>
            </RcResizeObserver>
          </Row>
          <Row style={{ marginTop: '20px' }} gutter={8}>
            <Col span={12}>
              <ProCard title="??????????????????">
                {state.fan_count_by_age.length != 0 ? (
                  <Pie {...config} style={{ height: '400px' }} />
                ) : (
                  <div style={{ height: '400px' }}>
                    <Alert message="?????????????????????" type="info" showIcon />
                  </div>
                )}
              </ProCard>
            </Col>
            <Col span={12}>
              <ProCard title="????????????????????????">
                <Column {...cfg} />
              </ProCard>
            </Col>
          </Row>
        </>
      )}
      {currentUser?.role == 'fan' && (
        <>
          <Row>
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <ProCard.Group title="??????????????????" direction={responsive ? 'column' : 'row'}>
                <ProCard>
                  <Statistic title="????????????" value={currentUser?.fid} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic title="????????????" value={currentUser?.fname} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic title="????????????" value={currentUser?.fsex} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic title="????????????" value={currentUser?.fage} />
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard>
                  <Statistic
                    title="????????????"
                    value={currentUser?.fjob == null ? '-' : currentUser?.fjob}
                  />
                </ProCard>
              </ProCard.Group>
            </RcResizeObserver>
          </Row>
        </>
      )}
      {currentUser?.role == 'admin' && (
        <>
          <Result icon={<SmileOutlined />} title="??????????????????????????????????????????????????????????????????" />
        </>
      )}
    </PageContainer>
  );
};

export default Index;
