-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主机： 172.17.0.4
-- 生成日期： 2022-12-21 10:25:46
-- 服务器版本： 8.0.31
-- PHP 版本： 8.0.26
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `db_design`
--
CREATE DATABASE IF NOT EXISTS `db_design` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_design`;

-- --------------------------------------------------------

--
-- 表的结构 `album`
--

DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
  `aid` int NOT NULL COMMENT '专辑编号',
  `aname` char(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '专辑名称',
  `acompany` char(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '发行公司',
  `adate` date NOT NULL COMMENT '发表时间',
  `aband` char(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '发行乐队'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `album`
--

INSERT INTO `album` (`aid`, `aname`, `acompany`, `adate`, `aband`) VALUES
(1, '再见理想', '自资发行', '1986-03-01', 'band1'),
(2, '后青春期的诗', '相信音乐唱片公司', '2008-10-23', 'band2'),
(3, '测试专辑', '自资发行', '2022-12-18', 'band3');

-- --------------------------------------------------------

--
-- 表的结构 `band`
--

DROP TABLE IF EXISTS `band`;
CREATE TABLE `band` (
  `bid` char(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '乐队编号',
  `bname` char(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '乐队名称',
  `bestablish` date NOT NULL COMMENT '创立时间',
  `bhead` int DEFAULT NULL COMMENT '队长',
  `cnt` int NOT NULL DEFAULT (0)
) ;

--
-- 转存表中的数据 `band`
--

INSERT INTO `band` (`bid`, `bname`, `bestablish`, `bhead`, `cnt`) VALUES
('band1', 'Beyond', '1983-03-06', 2, 3),
('band2', '五月天', '1997-03-29', 5, 5),
('band3', '测试乐队', '2022-12-18', NULL, 1);

-- --------------------------------------------------------

--
-- 表的结构 `concert`
--

DROP TABLE IF EXISTS `concert`;
CREATE TABLE `concert` (
  `cid` int NOT NULL COMMENT '演唱会编号',
  `cstart` datetime NOT NULL COMMENT '开始时间',
  `cend` datetime NOT NULL COMMENT '结束时间',
  `clocation` char(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '举办地点',
  `cband` char(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '举办乐队',
  `climit` int NOT NULL COMMENT '人数上限'
) ;

--
-- 转存表中的数据 `concert`
--

INSERT INTO `concert` (`cid`, `cstart`, `cend`, `clocation`, `cband`, `climit`) VALUES
(1, '2022-12-16 20:00:00', '2022-12-16 21:00:00', '虚拟地点', 'band1', 100),
(2, '2022-12-18 12:00:00', '2022-12-18 15:00:00', '虚拟地点2', 'band2', 100),
(3, '2022-12-18 12:00:00', '2022-12-18 15:00:00', '虚拟地点3', 'band3', 1),
(4, '2022-12-19 23:00:00', '2022-12-20 20:00:00', '河海大学', 'band1', 1);

-- --------------------------------------------------------

--
-- 表的结构 `fan`
--

DROP TABLE IF EXISTS `fan`;
CREATE TABLE `fan` (
  `fid` char(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '歌迷编号',
  `fname` char(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `fsex` char(2) COLLATE utf8mb4_general_ci NOT NULL COMMENT '性别',
  `fage` tinyint NOT NULL COMMENT '年龄',
  `fjob` char(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '工作'
) ;

--
-- 转存表中的数据 `fan`
--

INSERT INTO `fan` (`fid`, `fname`, `fsex`, `fage`, `fjob`) VALUES
('fan1', '粉丝1', '男', 18, NULL),
('fan2', '粉丝2', '男', 18, NULL),
('fan3', '粉丝3', '男', 18, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `like_album`
--

DROP TABLE IF EXISTS `like_album`;
CREATE TABLE `like_album` (
  `fid` char(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '歌迷编号',
  `aid` int NOT NULL COMMENT '专辑编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `like_album`
--

INSERT INTO `like_album` (`fid`, `aid`) VALUES
('fan1', 1),
('fan2', 2),
('fan3', 3);

-- --------------------------------------------------------

--
-- 表的结构 `like_band`
--

DROP TABLE IF EXISTS `like_band`;
CREATE TABLE `like_band` (
  `fid` char(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '歌迷编号',
  `bid` char(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '乐队编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `like_band`
--

INSERT INTO `like_band` (`fid`, `bid`) VALUES
('fan1', 'band1'),
('fan2', 'band2'),
('fan3', 'band3');

-- --------------------------------------------------------

--
-- 表的结构 `like_song`
--

DROP TABLE IF EXISTS `like_song`;
CREATE TABLE `like_song` (
  `fid` char(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '歌迷编号',
  `sid` int NOT NULL COMMENT '歌曲编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `like_song`
--

INSERT INTO `like_song` (`fid`, `sid`) VALUES
('fan1', 2),
('fan2', 2),
('fan1', 3),
('fan2', 4),
('fan1', 5),
('fan2', 7),
('fan3', 9);

-- --------------------------------------------------------

--
-- 表的结构 `member`
--

DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `mid` int NOT NULL COMMENT '成员编号',
  `mname` char(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `msex` char(2) COLLATE utf8mb4_general_ci NOT NULL COMMENT '性别',
  `mage` tinyint NOT NULL COMMENT '年龄',
  `mjob` char(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分工',
  `menter` date DEFAULT NULL COMMENT '加入时间',
  `mleave` date DEFAULT NULL COMMENT '离开时间',
  `mband` char(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '所属乐队'
) ;

--
-- 转存表中的数据 `member`
--

INSERT INTO `member` (`mid`, `mname`, `msex`, `mage`, `mjob`, `menter`, `mleave`, `mband`) VALUES
(1, '黄家驹', '男', 31, '吉他手', '1983-03-06', '2022-12-18', 'band1'),
(2, '黄贯中', '男', 58, '主音吉他手兼主唱', '1985-04-01', NULL, 'band1'),
(3, '黄家强', '男', 58, '贝斯手', '1984-01-01', NULL, 'band1'),
(4, '叶世荣', '男', 59, '鼓手', '1983-03-06', NULL, 'band1'),
(5, '温尚翊', '男', 43, '吉他手', '1997-03-29', NULL, 'band2'),
(6, '陈信宏', '男', 47, '主唱', '1997-03-29', NULL, 'band2'),
(7, '蔡昇晏', '男', 45, '贝斯手', '1997-03-29', NULL, 'band2'),
(8, '石锦航', '男', 47, '吉他手', '1997-03-29', NULL, 'band2'),
(9, '刘谚明', '男', 49, '鼓手', '1999-01-01', NULL, 'band2'),
(10, '成员1', '男', 18, '吉他手', '2022-12-18', NULL, 'band3');

--
-- 触发器 `member`
--
DROP TRIGGER IF EXISTS `TRIGGER_UPDATE_BAND_MEMBER_CNT_DEL`;
DELIMITER $$
CREATE TRIGGER `TRIGGER_UPDATE_BAND_MEMBER_CNT_DEL` AFTER DELETE ON `member` FOR EACH ROW update band a inner join (select count(*) cnt from member where mband = OLD.mband and mleave is NULL) b set a.cnt = b.cnt where a.bid = OLD.mband
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `TRIGGER_UPDATE_BAND_MEMBER_CNT_IST`;
DELIMITER $$
CREATE TRIGGER `TRIGGER_UPDATE_BAND_MEMBER_CNT_IST` AFTER INSERT ON `member` FOR EACH ROW update band a inner join (select count(*) cnt from member where mband = NEW.mband and mleave is NULL) b set a.cnt = b.cnt where a.bid = NEW.mband
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `TRIGGER_UPDATE_BAND_MEMBER_CNT_UPD`;
DELIMITER $$
CREATE TRIGGER `TRIGGER_UPDATE_BAND_MEMBER_CNT_UPD` AFTER UPDATE ON `member` FOR EACH ROW update band a inner join (select count(*) cnt from member where mband = NEW.mband and mleave is NULL) b set a.cnt = b.cnt where a.bid = NEW.mband
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `participate`
--

DROP TABLE IF EXISTS `participate`;
CREATE TABLE `participate` (
  `cid` int NOT NULL COMMENT '演唱会编号',
  `fid` char(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '歌迷编号',
  `ptime` datetime NOT NULL COMMENT '报名时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `participate`
--

INSERT INTO `participate` (`cid`, `fid`, `ptime`) VALUES
(1, 'fan1', '2022-12-16 20:08:41'),
(1, 'fan3', '2022-12-18 06:19:50'),
(2, 'fan2', '2022-12-18 12:04:09'),
(3, 'fan3', '2022-12-18 06:21:59'),
(4, 'fan1', '2022-12-19 20:36:25');

--
-- 触发器 `participate`
--
DROP TRIGGER IF EXISTS `TRIGGER_PARTICIPATE_LIMIT`;
DELIMITER $$
CREATE TRIGGER `TRIGGER_PARTICIPATE_LIMIT` BEFORE INSERT ON `participate` FOR EACH ROW BEGIN
  set @climit = 0;
	set @cnt = 0;
	select climit into @climit from concert where cid = NEW.cid;
	select count(*) into @cnt from participate where cid = NEW.cid group by cid;
	if @cnt >= @climit then 
		signal sqlstate '45000' set message_text = 'concert limit exceeded';
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `song`
--

DROP TABLE IF EXISTS `song`;
CREATE TABLE `song` (
  `sid` int NOT NULL COMMENT '歌曲编号',
  `sname` char(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '歌曲名称',
  `sauthor` int NOT NULL COMMENT '创作者编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `song`
--

INSERT INTO `song` (`sid`, `sname`, `sauthor`) VALUES
(2, '海阔天空', 1),
(3, '永远等待', 4),
(4, '巨人', 4),
(5, '志明与春娇', 6),
(6, '温柔', 6),
(7, '突然好想你', 6),
(8, '生存以上生活以下', 6),
(9, '测试歌曲', 10);

-- --------------------------------------------------------

--
-- 表的结构 `song_album`
--

DROP TABLE IF EXISTS `song_album`;
CREATE TABLE `song_album` (
  `sid` int NOT NULL COMMENT '歌曲编号',
  `aid` int NOT NULL COMMENT '专辑编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `song_album`
--

INSERT INTO `song_album` (`sid`, `aid`) VALUES
(3, 1),
(4, 1),
(7, 2),
(8, 2),
(9, 3);

-- --------------------------------------------------------

--
-- 表的结构 `song_sheet`
--

DROP TABLE IF EXISTS `song_sheet`;
CREATE TABLE `song_sheet` (
  `cid` int NOT NULL COMMENT '演唱会编号',
  `sid` int NOT NULL COMMENT '歌曲编号',
  `sindex` tinyint NOT NULL COMMENT '顺序'
) ;

--
-- 转存表中的数据 `song_sheet`
--

INSERT INTO `song_sheet` (`cid`, `sid`, `sindex`) VALUES
(1, 2, 1),
(1, 3, 2),
(1, 4, 3),
(2, 5, 1),
(2, 6, 2),
(3, 9, 1);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_album_fan_count_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_album_fan_count_for_fan`;
CREATE TABLE `view_album_fan_count_for_fan` (
`aid` int
,`cnt` bigint
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_album_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_album_for_band`;
CREATE TABLE `view_album_for_band` (
`aband` char(10)
,`acompany` char(20)
,`adate` date
,`aid` int
,`aname` char(20)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_band_fan_count_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_band_fan_count_for_fan`;
CREATE TABLE `view_band_fan_count_for_fan` (
`bid` char(10)
,`cnt` bigint
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_band_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_band_for_band`;
CREATE TABLE `view_band_for_band` (
`bestablish` date
,`bhead` int
,`bid` char(10)
,`bname` char(20)
,`cnt` int
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_concert_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_concert_for_band`;
CREATE TABLE `view_concert_for_band` (
`cband` char(10)
,`cend` datetime
,`cid` int
,`climit` int
,`clocation` char(100)
,`cstart` datetime
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_concert_participate_count_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_concert_participate_count_for_fan`;
CREATE TABLE `view_concert_participate_count_for_fan` (
`cid` int
,`cnt` bigint
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_fan_count`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_fan_count`;
CREATE TABLE `view_fan_count` (
`bid` char(10)
,`cnt` bigint
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_fan_count_by_age`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_fan_count_by_age`;
CREATE TABLE `view_fan_count_by_age` (
`age_scope` varchar(5)
,`cnt` bigint
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_fan_count_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_fan_count_for_band`;
CREATE TABLE `view_fan_count_for_band` (
`bid` char(10)
,`cnt` bigint
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_fan_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_fan_for_fan`;
CREATE TABLE `view_fan_for_fan` (
`fage` tinyint
,`fid` char(10)
,`fjob` char(20)
,`fname` char(20)
,`fsex` char(2)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_like_album_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_like_album_for_band`;
CREATE TABLE `view_like_album_for_band` (
`aid` int
,`fid` char(10)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_like_album_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_like_album_for_fan`;
CREATE TABLE `view_like_album_for_fan` (
`aid` int
,`fid` char(10)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_like_band_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_like_band_for_band`;
CREATE TABLE `view_like_band_for_band` (
`bid` char(10)
,`fid` char(10)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_like_band_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_like_band_for_fan`;
CREATE TABLE `view_like_band_for_fan` (
`bid` char(10)
,`fid` char(10)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_like_song_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_like_song_for_band`;
CREATE TABLE `view_like_song_for_band` (
`fid` char(10)
,`sid` int
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_like_song_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_like_song_for_fan`;
CREATE TABLE `view_like_song_for_fan` (
`fid` char(10)
,`sid` int
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_like_song_top_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_like_song_top_for_band`;
CREATE TABLE `view_like_song_top_for_band` (
`cnt` bigint
,`sid` int
,`sname` char(20)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_member_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_member_for_band`;
CREATE TABLE `view_member_for_band` (
`mage` tinyint
,`mband` char(10)
,`menter` date
,`mid` int
,`mjob` char(20)
,`mleave` date
,`mname` char(20)
,`msex` char(2)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_participate_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_participate_for_band`;
CREATE TABLE `view_participate_for_band` (
`cid` int
,`fid` char(10)
,`ptime` datetime
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_participate_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_participate_for_fan`;
CREATE TABLE `view_participate_for_fan` (
`cid` int
,`fid` char(10)
,`ptime` datetime
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_song_album_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_song_album_for_band`;
CREATE TABLE `view_song_album_for_band` (
`aid` int
,`sid` int
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_song_fan_count_for_fan`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_song_fan_count_for_fan`;
CREATE TABLE `view_song_fan_count_for_fan` (
`cnt` bigint
,`sid` int
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_song_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_song_for_band`;
CREATE TABLE `view_song_for_band` (
`sauthor` int
,`sid` int
,`sname` char(20)
);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `view_song_sheet_for_band`
-- （参见下面的实际视图）
--
DROP VIEW IF EXISTS `view_song_sheet_for_band`;
CREATE TABLE `view_song_sheet_for_band` (
`cid` int
,`sid` int
,`sindex` tinyint
);

-- --------------------------------------------------------

--
-- 视图结构 `view_album_fan_count_for_fan`
--
DROP TABLE IF EXISTS `view_album_fan_count_for_fan`;

DROP VIEW IF EXISTS `view_album_fan_count_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_album_fan_count_for_fan` (`aid`, `cnt`) AS   select `x`.`aid` AS `aid`,count(`y`.`fid`) AS `count(y.fid)` from (`album` `x` left join `like_album` `y` on((`y`.`aid` = `x`.`aid`))) group by `x`.`aid`  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_album_for_band`
--
DROP TABLE IF EXISTS `view_album_for_band`;

DROP VIEW IF EXISTS `view_album_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_album_for_band`  AS SELECT `album`.`aid` AS `aid`, `album`.`aname` AS `aname`, `album`.`acompany` AS `acompany`, `album`.`adate` AS `adate`, `album`.`aband` AS `aband` FROM `album` WHERE (`album`.`aband` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_band_fan_count_for_fan`
--
DROP TABLE IF EXISTS `view_band_fan_count_for_fan`;

DROP VIEW IF EXISTS `view_band_fan_count_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_band_fan_count_for_fan` (`bid`, `cnt`) AS   select `x`.`bid` AS `bid`,count(`y`.`fid`) AS `count(y.fid)` from (`band` `x` left join `like_band` `y` on((`y`.`bid` = `x`.`bid`))) group by `x`.`bid`  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_band_for_band`
--
DROP TABLE IF EXISTS `view_band_for_band`;

DROP VIEW IF EXISTS `view_band_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_band_for_band`  AS SELECT `band`.`bid` AS `bid`, `band`.`bname` AS `bname`, `band`.`bestablish` AS `bestablish`, `band`.`bhead` AS `bhead`, `band`.`cnt` AS `cnt` FROM `band` WHERE (`band`.`bid` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_concert_for_band`
--
DROP TABLE IF EXISTS `view_concert_for_band`;

DROP VIEW IF EXISTS `view_concert_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_concert_for_band`  AS SELECT `concert`.`cid` AS `cid`, `concert`.`cstart` AS `cstart`, `concert`.`cend` AS `cend`, `concert`.`clocation` AS `clocation`, `concert`.`cband` AS `cband`, `concert`.`climit` AS `climit` FROM `concert` WHERE (`concert`.`cband` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_concert_participate_count_for_fan`
--
DROP TABLE IF EXISTS `view_concert_participate_count_for_fan`;

DROP VIEW IF EXISTS `view_concert_participate_count_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_concert_participate_count_for_fan` (`cid`, `cnt`) AS   select `x`.`cid` AS `cid`,count(`y`.`fid`) AS `count(y.fid)` from (`concert` `x` left join `participate` `y` on((`y`.`cid` = `x`.`cid`))) group by `x`.`cid`  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_fan_count`
--
DROP TABLE IF EXISTS `view_fan_count`;

DROP VIEW IF EXISTS `view_fan_count`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_fan_count` (`bid`, `cnt`) AS   select `x`.`bid` AS `bid`,count(`y`.`fid`) AS `count( y.fid )` from (`band` `x` left join `like_band` `y` on((`y`.`bid` = `x`.`bid`))) group by `x`.`bid`  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_fan_count_by_age`
--
DROP TABLE IF EXISTS `view_fan_count_by_age`;

DROP VIEW IF EXISTS `view_fan_count_by_age`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_fan_count_by_age` (`age_scope`, `cnt`) AS   select (case when ((`a`.`fage` >= 0) and (`a`.`fage` <= 17)) then '0~17' when ((`a`.`fage` >= 18) and (`a`.`fage` <= 35)) then '18~35' when ((`a`.`fage` >= 36) and (`a`.`fage` <= 59)) then '36~59' else '>=60' end) AS `age_scope`,count(0) AS `cnt` from `fan` `a` where `a`.`fid` in (select `view_like_band_for_band`.`fid` from `view_like_band_for_band`) group by `a`.`fage`  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_fan_count_for_band`
--
DROP TABLE IF EXISTS `view_fan_count_for_band`;

DROP VIEW IF EXISTS `view_fan_count_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_fan_count_for_band` (`bid`, `cnt`) AS   select `view_fan_count`.`bid` AS `bid`,`view_fan_count`.`cnt` AS `cnt` from `view_fan_count` where (`view_fan_count`.`bid` = substring_index(user(),'@',1))  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_fan_for_fan`
--
DROP TABLE IF EXISTS `view_fan_for_fan`;

DROP VIEW IF EXISTS `view_fan_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_fan_for_fan`  AS SELECT `fan`.`fid` AS `fid`, `fan`.`fname` AS `fname`, `fan`.`fsex` AS `fsex`, `fan`.`fage` AS `fage`, `fan`.`fjob` AS `fjob` FROM `fan` WHERE (`fan`.`fid` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_like_album_for_band`
--
DROP TABLE IF EXISTS `view_like_album_for_band`;

DROP VIEW IF EXISTS `view_like_album_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_like_album_for_band`  AS SELECT `like_album`.`fid` AS `fid`, `like_album`.`aid` AS `aid` FROM `like_album` WHERE `like_album`.`aid` in (select `album`.`aid` from `album` where (`album`.`aband` = substring_index(user(),'@',1))) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_like_album_for_fan`
--
DROP TABLE IF EXISTS `view_like_album_for_fan`;

DROP VIEW IF EXISTS `view_like_album_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_like_album_for_fan`  AS SELECT `like_album`.`fid` AS `fid`, `like_album`.`aid` AS `aid` FROM `like_album` WHERE (`like_album`.`fid` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_like_band_for_band`
--
DROP TABLE IF EXISTS `view_like_band_for_band`;

DROP VIEW IF EXISTS `view_like_band_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_like_band_for_band`  AS SELECT `like_band`.`fid` AS `fid`, `like_band`.`bid` AS `bid` FROM `like_band` WHERE (`like_band`.`bid` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_like_band_for_fan`
--
DROP TABLE IF EXISTS `view_like_band_for_fan`;

DROP VIEW IF EXISTS `view_like_band_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_like_band_for_fan`  AS SELECT `like_band`.`fid` AS `fid`, `like_band`.`bid` AS `bid` FROM `like_band` WHERE (`like_band`.`fid` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_like_song_for_band`
--
DROP TABLE IF EXISTS `view_like_song_for_band`;

DROP VIEW IF EXISTS `view_like_song_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_like_song_for_band`  AS SELECT `like_song`.`fid` AS `fid`, `like_song`.`sid` AS `sid` FROM `like_song` WHERE `like_song`.`sid` in (select `song`.`sid` from `song` where `song`.`sauthor` in (select `member`.`mid` from `member` where (`member`.`mband` = substring_index(user(),'@',1)))) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_like_song_for_fan`
--
DROP TABLE IF EXISTS `view_like_song_for_fan`;

DROP VIEW IF EXISTS `view_like_song_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_like_song_for_fan`  AS SELECT `like_song`.`fid` AS `fid`, `like_song`.`sid` AS `sid` FROM `like_song` WHERE (`like_song`.`fid` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_like_song_top_for_band`
--
DROP TABLE IF EXISTS `view_like_song_top_for_band`;

DROP VIEW IF EXISTS `view_like_song_top_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_like_song_top_for_band` (`sid`, `sname`, `cnt`) AS   select `view_song_for_band`.`sid` AS `sid`,`view_song_for_band`.`sname` AS `sname`,count(`view_like_song_for_band`.`fid`) AS `count( view_like_song_for_band.fid )` from (`view_song_for_band` join `view_like_song_for_band`) where (`view_song_for_band`.`sid` = `view_like_song_for_band`.`sid`) group by `view_song_for_band`.`sid`  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_member_for_band`
--
DROP TABLE IF EXISTS `view_member_for_band`;

DROP VIEW IF EXISTS `view_member_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_member_for_band`  AS SELECT `member`.`mid` AS `mid`, `member`.`mname` AS `mname`, `member`.`msex` AS `msex`, `member`.`mage` AS `mage`, `member`.`mjob` AS `mjob`, `member`.`menter` AS `menter`, `member`.`mleave` AS `mleave`, `member`.`mband` AS `mband` FROM `member` WHERE (`member`.`mband` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_participate_for_band`
--
DROP TABLE IF EXISTS `view_participate_for_band`;

DROP VIEW IF EXISTS `view_participate_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_participate_for_band`  AS SELECT `participate`.`cid` AS `cid`, `participate`.`fid` AS `fid`, `participate`.`ptime` AS `ptime` FROM `participate` WHERE `participate`.`cid` in (select `concert`.`cid` from `concert` where (`concert`.`cband` = substring_index(user(),'@',1))) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_participate_for_fan`
--
DROP TABLE IF EXISTS `view_participate_for_fan`;

DROP VIEW IF EXISTS `view_participate_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_participate_for_fan`  AS SELECT `participate`.`cid` AS `cid`, `participate`.`fid` AS `fid`, `participate`.`ptime` AS `ptime` FROM `participate` WHERE (`participate`.`fid` = substring_index(user(),'@',1)) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_song_album_for_band`
--
DROP TABLE IF EXISTS `view_song_album_for_band`;

DROP VIEW IF EXISTS `view_song_album_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_song_album_for_band`  AS SELECT `song_album`.`sid` AS `sid`, `song_album`.`aid` AS `aid` FROM `song_album` WHERE `song_album`.`aid` in (select `album`.`aid` from `album` where (`album`.`aband` = substring_index(user(),'@',1)))  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_song_fan_count_for_fan`
--
DROP TABLE IF EXISTS `view_song_fan_count_for_fan`;

DROP VIEW IF EXISTS `view_song_fan_count_for_fan`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_song_fan_count_for_fan` (`sid`, `cnt`) AS   select `x`.`sid` AS `sid`,count(`y`.`fid`) AS `count(y.fid)` from (`song` `x` left join `like_song` `y` on((`y`.`sid` = `x`.`sid`))) group by `x`.`sid`  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_song_for_band`
--
DROP TABLE IF EXISTS `view_song_for_band`;

DROP VIEW IF EXISTS `view_song_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_song_for_band`  AS SELECT `song`.`sid` AS `sid`, `song`.`sname` AS `sname`, `song`.`sauthor` AS `sauthor` FROM `song` WHERE `song`.`sauthor` in (select `member`.`mid` from `member` where (`member`.`mband` = substring_index(user(),'@',1))) WITH CASCADED CHECK OPTION  ;

-- --------------------------------------------------------

--
-- 视图结构 `view_song_sheet_for_band`
--
DROP TABLE IF EXISTS `view_song_sheet_for_band`;

DROP VIEW IF EXISTS `view_song_sheet_for_band`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_song_sheet_for_band`  AS SELECT `song_sheet`.`cid` AS `cid`, `song_sheet`.`sid` AS `sid`, `song_sheet`.`sindex` AS `sindex` FROM `song_sheet` WHERE `song_sheet`.`cid` in (select `concert`.`cid` from `concert` where (`concert`.`cband` = substring_index(user(),'@',1))) WITH CASCADED CHECK OPTION  ;

--
-- 转储表的索引
--

--
-- 表的索引 `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`aid`),
  ADD UNIQUE KEY `aname` (`aname`),
  ADD KEY `FA_ahead` (`aband`);

--
-- 表的索引 `band`
--
ALTER TABLE `band`
  ADD PRIMARY KEY (`bid`),
  ADD UNIQUE KEY `bname` (`bname`),
  ADD KEY `FB_bhead` (`bhead`);

--
-- 表的索引 `concert`
--
ALTER TABLE `concert`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `FC_cband` (`cband`);

--
-- 表的索引 `fan`
--
ALTER TABLE `fan`
  ADD PRIMARY KEY (`fid`);

--
-- 表的索引 `like_album`
--
ALTER TABLE `like_album`
  ADD PRIMARY KEY (`fid`,`aid`),
  ADD KEY `FLA_aid` (`aid`);

--
-- 表的索引 `like_band`
--
ALTER TABLE `like_band`
  ADD PRIMARY KEY (`fid`,`bid`),
  ADD KEY `FLB_bid` (`bid`);

--
-- 表的索引 `like_song`
--
ALTER TABLE `like_song`
  ADD PRIMARY KEY (`fid`,`sid`),
  ADD KEY `FLS_sid` (`sid`);

--
-- 表的索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `FB_mband` (`mband`);

--
-- 表的索引 `participate`
--
ALTER TABLE `participate`
  ADD PRIMARY KEY (`cid`,`fid`),
  ADD KEY `FP_fid` (`fid`);

--
-- 表的索引 `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `FS_sauthor` (`sauthor`);

--
-- 表的索引 `song_album`
--
ALTER TABLE `song_album`
  ADD PRIMARY KEY (`sid`,`aid`),
  ADD KEY `FSA_aid` (`aid`);

--
-- 表的索引 `song_sheet`
--
ALTER TABLE `song_sheet`
  ADD PRIMARY KEY (`cid`,`sid`),
  ADD KEY `FSS_sid` (`sid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `album`
--
ALTER TABLE `album`
  MODIFY `aid` int NOT NULL AUTO_INCREMENT COMMENT '专辑编号', AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `concert`
--
ALTER TABLE `concert`
  MODIFY `cid` int NOT NULL AUTO_INCREMENT COMMENT '演唱会编号';

--
-- 使用表AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `mid` int NOT NULL AUTO_INCREMENT COMMENT '成员编号';

--
-- 使用表AUTO_INCREMENT `song`
--
ALTER TABLE `song`
  MODIFY `sid` int NOT NULL AUTO_INCREMENT COMMENT '歌曲编号', AUTO_INCREMENT=10;

--
-- 限制导出的表
--

--
-- 限制表 `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `FA_ahead` FOREIGN KEY (`aband`) REFERENCES `band` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `band`
--
ALTER TABLE `band`
  ADD CONSTRAINT `FB_bhead` FOREIGN KEY (`bhead`) REFERENCES `member` (`mid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- 限制表 `concert`
--
ALTER TABLE `concert`
  ADD CONSTRAINT `FC_cband` FOREIGN KEY (`cband`) REFERENCES `band` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `like_album`
--
ALTER TABLE `like_album`
  ADD CONSTRAINT `FLA_aid` FOREIGN KEY (`aid`) REFERENCES `album` (`aid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FLA_fid` FOREIGN KEY (`fid`) REFERENCES `fan` (`fid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `like_band`
--
ALTER TABLE `like_band`
  ADD CONSTRAINT `FLB_bid` FOREIGN KEY (`bid`) REFERENCES `band` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FLB_fid` FOREIGN KEY (`fid`) REFERENCES `fan` (`fid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `like_song`
--
ALTER TABLE `like_song`
  ADD CONSTRAINT `FLS_fid` FOREIGN KEY (`fid`) REFERENCES `fan` (`fid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FLS_sid` FOREIGN KEY (`sid`) REFERENCES `song` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `FB_mband` FOREIGN KEY (`mband`) REFERENCES `band` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `participate`
--
ALTER TABLE `participate`
  ADD CONSTRAINT `FP_cid` FOREIGN KEY (`cid`) REFERENCES `concert` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FP_fid` FOREIGN KEY (`fid`) REFERENCES `fan` (`fid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `FS_sauthor` FOREIGN KEY (`sauthor`) REFERENCES `member` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `song_album`
--
ALTER TABLE `song_album`
  ADD CONSTRAINT `FSA_aid` FOREIGN KEY (`aid`) REFERENCES `album` (`aid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FSA_sid` FOREIGN KEY (`sid`) REFERENCES `song` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `song_sheet`
--
ALTER TABLE `song_sheet`
  ADD CONSTRAINT `FSS_cid` FOREIGN KEY (`cid`) REFERENCES `concert` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FSS_sid` FOREIGN KEY (`sid`) REFERENCES `song` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


-- 登陆时自动激活角色
use db_design;

-- 乐队角色
create role ROLE_BAND;

grant select on fan to ROLE_BAND;

grant select,update,insert,delete 
on view_album_for_band
to ROLE_BAND;
grant select,update,insert,delete 
on view_concert_for_band
to ROLE_BAND;
grant select,update,insert,delete 
on view_member_for_band
to ROLE_BAND;
grant select,update,insert,delete 
on view_song_for_band 
to ROLE_BAND;
grant select,update,insert,delete 
on view_song_sheet_for_band  
to ROLE_BAND;
GRANT select,update,insert,delete  
ON view_song_album_for_band
TO ROLE_BAND;
grant select,update 
on view_band_for_band
to ROLE_BAND;
grant select
on view_like_album_for_band
to ROLE_BAND;
grant select
on view_like_band_for_band
to ROLE_BAND;
grant select
on view_like_song_for_band
to ROLE_BAND;
grant select
on view_participate_for_band
to ROLE_BAND;
GRANT SELECT 
ON view_fan_count_for_band
TO ROLE_BAND;
GRANT SELECT
ON view_fan_count_by_age
TO ROLE_BAND;
GRANT SELECT 
ON view_like_song_top_for_band 
TO ROLE_BAND;

-- 歌迷角色

create role ROLE_FAN;

grant select on album to ROLE_FAN;
grant select on band to ROLE_FAN;
grant select on concert to ROLE_FAN;
grant select on song to ROLE_FAN;
grant select on member to ROLE_FAN;
grant select on song_album to ROLE_FAN;
grant select on song_sheet to ROLE_FAN;

grant select on view_band_fan_count_for_fan to ROLE_FAN;
grant select on view_song_fan_count_for_fan to ROLE_FAN;
grant select on view_album_fan_count_for_fan to ROLE_FAN;
grant select on view_concert_participate_count_for_fan to ROLE_FAN;

grant select,update,insert,delete 
on view_fan_for_fan
to ROLE_FAN;
grant select,update,insert,delete 
on view_participate_for_fan
to ROLE_FAN;
grant select,update,insert,delete 
on view_like_band_for_fan
to ROLE_FAN;
grant select,update,insert,delete 
on view_like_album_for_fan
to ROLE_FAN;
grant select,update,insert,delete 
on view_like_song_for_fan
to ROLE_FAN;

-- 管理员角色

create role ROLE_ADMIN;
GRANT ALL PRIVILEGES ON *.* TO ROLE_ADMIN WITH GRANT OPTION;

-- 新建admin
create user 'admin'@'%' IDENTIFIED BY '123456';
grant ROLE_ADMIN to 'admin'@'%';
flush privileges;