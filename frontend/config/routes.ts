import { createFromIconfontCN } from '@ant-design/icons';

export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/index', name: '首页', icon: 'DashboardOutlined', component: './Index' },
  {
    path: '/band/member',
    access: 'canBand',
    name: '成员管理',
    component: './Band/Member/Index',
    icon: 'UserOutlined',
  },
  {
    path: '/band/song',
    access: 'canBand',
    name: '歌曲管理',
    component: './Band/Song/Index',
    icon: 'icon-yinle1',
  },
  {
    path: '/band/album',
    access: 'canBand',
    name: '专辑管理',
    component: './Band/Album/Index',
    icon: 'icon-zhuanji',
  },
  {
    path: '/band/concert',
    access: 'canBand',
    name: '演唱会管理',
    component: './Band/Concert/Index',
    icon: 'icon-changge',
  },
  {
    path: '/band/fan',
    access: 'canBand',
    name: '乐队粉丝',
    component: './Band/Fan/Index',
    icon: 'icon-wodefensi',
  },
  {
    path: '/admin/band',
    access: 'canAdmin',
    name: '乐队管理',
    component: './Admin/Band/List',
    icon: 'icon-tuandui',
  },
  {
    path: '/admin/fan',
    access: 'canAdmin',
    name: '歌迷管理',
    component: './Admin/Fan/List',
    icon: 'icon-wodefensi',
  },
  {
    path: '/fan/band',
    access: 'canFan',
    name: '乐队列表',
    icon: 'icon-tuandui',
    routes: [
      { path: '/fan/band', redirect: '/fan/band/like' },
      {
        path: '/fan/band/like',
        name: '我喜欢的乐队',
        component: './Fan/Band/LikeList',
      },
      {
        path: '/fan/band/list',
        name: '乐队列表',
        component: './Fan/Band/List',
      },
    ],
  },
  {
    path: '/fan/album',
    access: 'canFan',
    name: '专辑列表',
    icon: 'icon-zhuanji',
    routes: [
      { path: '/fan/album', redirect: '/fan/album/like' },
      {
        path: '/fan/album/like',
        name: '我喜欢的专辑',
        component: './Fan/Album/LikeList',
      },
      {
        path: '/fan/album/list',
        name: '专辑列表',
        component: './Fan/Album/List',
      },
    ],
  },
  {
    path: '/fan/song',
    access: 'canFan',
    name: '歌曲列表',
    icon: 'icon-yinle1',
    routes: [
      { path: '/fan/song', redirect: '/fan/song/like' },
      {
        path: '/fan/song/like',
        name: '我喜欢的歌曲',
        component: './Fan/Song/LikeList',
      },
      {
        path: '/fan/song/list',
        name: '歌曲列表',
        component: './Fan/Song/List',
      },
    ],
  },
  {
    path: '/fan/concert',
    access: 'canFan',
    name: '演唱会列表',
    icon: 'icon-changge',
    routes: [
      { path: '/fan/concert', redirect: '/fan/concert/like' },
      {
        path: '/fan/concert/like',
        name: '我报名的演唱会',
        component: './Fan/Concert/LikeList',
      },
      {
        path: '/fan/concert/list',
        name: '演唱会列表',
        component: './Fan/Concert/List',
      },
    ],
  },
  { path: '/', redirect: '/index' },
  { path: '*', layout: false, component: './404' },
];
