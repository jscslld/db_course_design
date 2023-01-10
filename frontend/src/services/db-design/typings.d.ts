// @ts-ignore
/* eslint-disable */

type ResponseStructure<T> = {
  code: number;
  msg: string;
  data: T;
};
declare namespace API {
  type AdminFanListItem = {
    fid?: string;
    fname?: string;
    created?: boolean;
  };
  type AdminFanList = {
    data?: AdminFanListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type AdminBandListItem = {
    bid?: string;
    bname?: string;
    created?: boolean;
  };
  type AdminBandList = {
    data?: AdminBandListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FanConcertListItem = {
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
  };
  type FanConcertList = {
    data?: FanConcertListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FanSongListItem = {
    sid?: number;
    sname?: string;
    mid?: number;
    mname?: string;
    bid?: number;
    bname?: string;
    fanCnt?: number;
    liked?: boolean;
  };
  type FanSongList = {
    data?: FanSongListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FanAlbumListItem = {
    aid?: number;
    aname?: string;
    acompany?: string;
    adate?: string;
    cnt?: number;
    bname?: string;
    fanCnt?: number;
    liked?: boolean;
  };
  type FanAlbumList = {
    data?: FanAlbumListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FanBandListItem = {
    bid?: string;
    bname?: string;
    bestablish?: string;
    cnt?: number;
    fanCnt?: number;
    liked?: boolean;
    headId?: number;
    headName?: string;
  };
  type FanBandList = {
    data?: FanBandListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FanParticipateListItem = {
    fid?: string;
    fname?: string;
    ptime?: string;
  };
  type FanParticipateList = {
    data?: FanParticipateListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type ConcertListItem = {
    cid?: number;
    cstart?: string;
    cend?: string;
    clocation?: string;
    climit?: number;
    cnt?: number;
  };
  type ConcertList = {
    data?: ConcertListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type AlbumListItem = {
    aid?: number;
    aname?: string;
    acompany?: string;
    adate?: string;
    cnt?: number;
  };
  type AlbumList = {
    data?: AlbumListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type SongListItem = {
    sid?: number;
    sname?: string;
    authorName?: string;
    authorId?: string;
  };
  type SongList = {
    data?: SongListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FanListItem = {
    fid?: string;
    fname?: string;
    fsex?: string;
    fjob?: string;
    fage?: number;
  };
  type FanList = {
    data?: FanListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type SMemberListItem = {
    label: string;
    value: string;
  };
  type AlbumSongList = {
    sid: number;
  };
  type SSongListItem = {
    label: string;
    value: string;
  };
  type MemberListItem = {
    mid?: number;
    mname?: string;
    msex?: string;
    mage?: number;
    mjob?: string;
    menter?: string;
    mleave?: string;
  };
  type MemberList = {
    data?: MemberListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FanCount = {
    count?: number;
  };
  type FanAgeCount = {
    ageScope?: string;
    cnt?: number;
  };
  type SongLikeTop10 = {
    sname?: string;
    cnt?: number;
  };
  type CurrentUser = {
    bcnt?: number;
    bid?: string;
    bname?: string;
    role?: string;
    bestablish?: string;
    bhead?: number;
    fid?: string;
    fname?: string;
    fsex?: string;
    fjob?: string;
    fage?: number;
  };

  type LoginResult = {
    token: string;
    role: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    user_type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
