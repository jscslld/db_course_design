import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '《数据库原理与技术》课程设计',
  pwa: false,
  logo: '/logo.png',
  iconfontUrl: '//at.alicdn.com/t/c/font_3820576_x95rmcevuid.js',
};

export default Settings;
