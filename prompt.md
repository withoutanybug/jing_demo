# Architectural Digest USA 杂志展示网站

## 我的技术能力
- 会 HTML + CSS + JS（原生）
- 不会 React/Vue/Node/构建工具/任何框架
- 浏览器直接打开文件就能运行

## 绝对禁止
- 禁止过于复杂的前端框架（如 React/Vue/Node/构建工具/任何框架）
- 核心原则：可以剪裁图片，但是不能拉伸图片不能使得图片失真

## 项目结构（严格按此输出）

ad-magazine/
  index.html
  ad-usa.html
  detail.html
  about.html
  contact.html
  news.html
  css/
    style.css
  js/
    main.js
  imgs/                    <-- 我的素材文件夹（已存在）
    interior/              <-- 室内设计（客厅/卧室/餐厅等空间）
    architecture/          <-- 建筑外观/结构
    furniture/             <-- 家具单品/细节
    lifestyle/             <-- 生活方式/人物/场景
    ads/                 <-- 广告/推广
    first_page.png                 <-- 杂志封面/扉页
    ...
## 图片路径规则
- 图片数量不确定，代码用JS动态读取（数据写在JS数组里，我手动填入实际文件名）

## 6个页面详细设计

### 1. index.html（首页）
- 固定顶部导航：Logo"AD MAGAZINE" + AD USA / About / Contact / News 链接
- 全屏 Hero：背景图 ../imgs/first_page.png，标题"Architectural Digest USA"，副标题"April 2023"
- 图片规则：object-fit: contain，不裁剪不拉伸
- 底部小字："图片来源：Architectural Digest USA | 仅作展示，请勿商用"
- 精选预览：4张小图（2×2网格），点击跳 ad-usa.html

### 2. ad-usa.html（分类展示页）
- 顶部标题 + 简介
- 分类标签栏：全部 / 室内设计 / 建筑 / 家具 / 生活方式
- 点击标签切换显示对应分类图片（JS实现，无刷新）
- 图片网格：桌面3列/平板2列/手机1列
- 每张图显示：缩略图 + 标题 + 期号
- 点击任意图片跳转 detail.html?cat=interior&id=01
- 每张图下方小字："图：Architectural Digest USA"

### 3. detail.html（通用详情页）
- 从 URL 参数读取 cat 和 id
- 显示对应大图（原图尺寸，object-fit: contain）
- 图片信息：标题、分类、来源声明
- 返回按钮：返回 ad-usa.html
- 相关推荐：同分类其他2张图（循环取）

### 4. about.html（关于 + 数据报表）
- 两栏布局：
  - 左栏：头像 ../imgs/cover/01.jpg（或单独放一张头像）+ 服务介绍
    - 标题："帮助主理人定制独立站、小程序"
    - 服务列表：①0-1网站上线 ②小程序开发 ③后台数据报表
    - 联系方式：邮箱569122844@qq.com、微信Merlin_Pend
  - 右栏：数据报表仪表盘（静态演示数据）
    - 3个卡片：总访问量 2,580 / 平均停留 2'34" / 点击率 4.8%
    - 下方：柱状图（用CSS div模拟，不用canvas/chart.js）

### 5. contact.html（联系）
- 仿 https://kukannai.com/contact 布局
- 左侧：联系信息（邮箱、地址）
- 右侧：表单（姓名、邮箱、项目类型下拉框、留言文本框、提交按钮）
- 表单提交用 mailto: 链接，不接入后端，直接发送到邮箱569122844@qq.com

### 6. news.html（新闻）
- 简单列表：日期 + 标题 + 摘要
- 5条静态数据写死在HTML里

## 导航交互（JS实现）
- 当前页面导航项高亮
- 所有导航用普通 a href="xxx.html"

## CSS要求
- 白底黑字，大量留白
- 字体：系统默认无衬线
- 强调色：#C4A77D（仅用于hover、标签、按钮）
- 图片全局规则：img { max-width: 100%; height: auto; object-fit: contain; }
- 响应式：移动端单列，桌面端多列

## JS数据结构设计（main.js顶部）

// 图片数据 - 我手动填入实际文件名
const galleryData = [
  { id: '01', category: 'interior', title: '现代客厅', file: 'imgs\interior\1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_22.png' },
  { id: '02', category: 'interior', title: '主卧室', file: 'imgs\interior\1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_23.png' },
  // ...根据实际图片补充
];

// 新闻数据
const newsData = [
  { date: '2024.01.15', title: 'AD杂志2024年度精选', summary: '...' },
  // ...
];

## 输出顺序
1. 先输出项目结构确认
2. 输出 css/style.css
3. 输出 js/main.js（包含数据结构和所有逻辑）
4. 逐个输出6个HTML文件
5. 每个文件输出后等我确认再继续下一个

## 重要提醒
- 每个HTML文件必须完整可独立运行
- 图片路径：../imgs/分类名/文件名.jpg
- CSS和JS用 link/script 引入
- 不要生成任何配置文件
- 代码注释用中文
- 预留数据数组位置，方便我填入实际文件名