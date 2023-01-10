// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import qs from 'qs';
export async function updateFanInfo(body: any, options?: { [key: string]: any }) {
  return request('/api/user/update/fan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function updateBandInfo(body: any, options?: { [key: string]: any }) {
  return request('/api/user/update/band', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function adminDelFan(body: any, options?: { [key: string]: any }) {
  return request('/api/admin/fan/del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function adminDelBand(body: any, options?: { [key: string]: any }) {
  return request('/api/admin/band/del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function adminAddFan(body: any, options?: { [key: string]: any }) {
  return request('/api/admin/fan/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function adminCreateFan(body: any, options?: { [key: string]: any }) {
  return request('/api/admin/fan/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function adminAddBand(body: any, options?: { [key: string]: any }) {
  return request('/api/admin/band/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function adminCreateBand(body: any, options?: { [key: string]: any }) {
  return request('/api/admin/band/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function getAdminBandList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.AdminBandList>('/api/admin/band/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}
export async function getAdminFanList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.AdminFanList>('/api/admin/fan/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}
export async function getAlbumInfo(param: any, options?: { [key: string]: any }) {
  return request('/api/album/fan/get', {
    method: 'GET',
    params: param,
    ...(options || {}),
  });
}
export async function getBandInfo(param: any, options?: { [key: string]: any }) {
  return request('/api/band/fan/get', {
    method: 'GET',
    params: param,
    ...(options || {}),
  });
}
export async function getSongInfo(param: any, options?: { [key: string]: any }) {
  return request('/api/song/fan/get', {
    method: 'GET',
    params: param,
    ...(options || {}),
  });
}
export async function getConcertInfo(param: any, options?: { [key: string]: any }) {
  return request('/api/concert/fan/get', {
    method: 'GET',
    params: param,
    ...(options || {}),
  });
}
export async function likeConcert(body: any, options?: { [key: string]: any }) {
  return request('/api/concert/fan/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function dislikeConcert(body: any, options?: { [key: string]: any }) {
  return request('/api/concert/fan/dislike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function likeSong(body: any, options?: { [key: string]: any }) {
  return request('/api/song/fan/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function dislikeSong(body: any, options?: { [key: string]: any }) {
  return request('/api/song/fan/dislike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function likeAlbum(body: any, options?: { [key: string]: any }) {
  return request('/api/album/fan/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function dislikeAlbum(body: any, options?: { [key: string]: any }) {
  return request('/api/album/fan/dislike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function gettFanAlbumList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanAlbumList>('/api/album/fan/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}
export async function getFanAlbumLikeList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.FanAlbumList>('/api/album/fan/list/like', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
    },
    ...(options || {}),
  });
}
export async function likeBand(body: any, options?: { [key: string]: any }) {
  return request('/api/band/fan/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function dislikeBand(body: any, options?: { [key: string]: any }) {
  return request('/api/band/fan/dislike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}
export async function getfFanSongList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanSongList>('/api/song/fan/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}
export async function getfFanSongLikeList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanSongList>('/api/song/fan/list/like', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}
export async function getfFanConcertList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanSongList>('/api/concert/fan/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}
export async function getfFanConcertLikeList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanSongList>('/api/concert/fan/list/like', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}
export async function getFanBandList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanBandList>('/api/band/fan/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}
export async function getFanBandLikeList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.FanBandList>('/api/band/fan/list/like', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
    },
    ...(options || {}),
  });
}

export async function getParticipateList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanParticipateList>('/api/concert/participate/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
      sorter: JSON.stringify(sort),
    },
    ...(options || {}),
  });
}

export async function currentUser(options?: { [key: string]: any }) {
  return request<ResponseStructure<API.CurrentUser>>('/api/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getFanCount(options?: { [key: string]: any }) {
  return request<ResponseStructure<API.FanCount>>('/api/fan/count', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getFanAgeCount(options?: { [key: string]: any }) {
  return request<ResponseStructure<Array<API.FanAgeCount>>>('/api/fan/count_by_age', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getSongLikeTop10(options?: { [key: string]: any }) {
  return request<ResponseStructure<Array<API.SongLikeTop10>>>('/api/song/like_top_ten', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function searchAuthor(options?: { [key: string]: any }) {
  return request<ResponseStructure<Array<API.SMemberListItem>>>('/api/member/search', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getAlbumSongList(params: any, options?: { [key: string]: any }) {
  return request<ResponseStructure<Array<API.AlbumSongList>>>('/api/album/song/list', {
    params: params,
    method: 'GET',
    ...(options || {}),
  });
}

export async function getConcertSongList(params: any, options?: { [key: string]: any }) {
  return request<ResponseStructure<Array<API.AlbumSongList>>>('/api/concert/song/list', {
    params: params,
    method: 'GET',
    ...(options || {}),
  });
}

export async function setConcertSongList(body: any, options?: { [key: string]: any }) {
  return request('/api/concert/song/set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function setAlbumSongList(body: any, options?: { [key: string]: any }) {
  return request('/api/album/song/set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function searchSong(options?: { [key: string]: any }) {
  return request<ResponseStructure<Array<API.SSongListItem>>>('/api/song/search', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getInMemberList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.MemberList>('/api/member/list/in', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      sorter: JSON.stringify(sort),
    },
    ...(options || {}),
  });
}

export async function getOutMemberList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.MemberList>('/api/member/list/out', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      sorter: JSON.stringify(sort),
    },
    ...(options || {}),
  });
}

export async function updateMemberInfo(body: any, options?: { [key: string]: any }) {
  return request('/api/member/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function addMemberInfo(body: any, options?: { [key: string]: any }) {
  return request('/api/member/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function outMember(body: any, options?: { [key: string]: any }) {
  return request('/api/member/out', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function getConcertList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.AlbumList>('/api/concert/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
    },
    ...(options || {}),
  });
}

export async function updateConcertInfo(body: any, options?: { [key: string]: any }) {
  return request('/api/concert/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function addConcert(body: any, options?: { [key: string]: any }) {
  return request('/api/concert/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function deleteConcert(body: any, options?: { [key: string]: any }) {
  return request('/api/concert/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function getAlbumList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.AlbumList>('/api/album/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
    },
    ...(options || {}),
  });
}

export async function updateAlbumInfo(body: any, options?: { [key: string]: any }) {
  return request('/api/album/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function addAlbum(body: any, options?: { [key: string]: any }) {
  return request('/api/album/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function deleteAlbum(body: any, options?: { [key: string]: any }) {
  return request('/api/album/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function getSongList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.SongList>('/api/song/list', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
    },
    ...(options || {}),
  });
}

export async function getFanList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.FanList>('/api/fan/list/band', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
    },
    ...(options || {}),
  });
}

export async function getFanAlbumList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanList>('/api/fan/list/album', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}

export async function getFanSongList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort: { [key: string]: any },
  filter: { [key: string]: any },
  options?: { [key: string]: any },
  data?: { [key: string]: any },
) {
  return request<API.FanList>('/api/fan/list/song', {
    method: 'GET',
    params: {
      ...params,
      ...filter,
      ...data,
    },
    ...(options || {}),
  });
}

export async function updateSongInfo(body: any, options?: { [key: string]: any }) {
  return request('/api/song/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function deleteSong(body: any, options?: { [key: string]: any }) {
  return request('/api/song/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

export async function addSong(body: any, options?: { [key: string]: any }) {
  return request('/api/song/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<ResponseStructure<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(body),
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
