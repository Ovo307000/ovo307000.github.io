# 个人网站主页

[访问网站](https://ovo307000.github.io/)

中文求职主页，展示应用开发、Web 开发与 Linux 运维实践。采用用户确认的“终端手册式”：命令行标题、整齐对齐、细分隔线、少量荧光绿和克制扫描线；正文保持开放排版，保留认可的四张照片渐变项目封面。手机纵向重排同一份首屏、专业方向、完整介绍、项目实践和技术探索，保留双列技能与纵向教育时间线。两端项目和 PDF 均放入首页同源终端外壳。当前已实现 Astro + React 网站并发布至 Vercel；Figma 保留可编辑设计与原型连线。

## 内容数据

`content.json` 仅保存公开项目、技能与兴趣。教育、联系方式及完整简历位于加密资料中，成功验证分享码后在原区块恢复。所有入口共用同一页面解锁状态；不将私密资料预先放入隐藏 DOM。

## 前端实现（2026-11-10）

已按组件清单逐个实现全部主页区块、四项目详情和简历预览；共用按钮、章节标题、终端外壳、项目正文及目录条目，跨屏通过响应式布局重排。运行 `npm run dev` 预览，`npm run check` 和 `npm run build` 验证。组件入口、素材来源和维护经验见 [开发交接](DEVELOPMENT.md)，逐项验收与恢复方法见 [实施计划](../docs/exec-plans/completed/website-implementation.md)。[Vercel 正式页面](https://ops-portfolio-five.vercel.app/) 已发布；终端组件使用英文等宽字体，提供红灯关闭、禁用黄灯、绿灯最大化/还原及开关动画，手机菜单与终端输出有过渡效果。

简历预览和下载只读取解锁后创建的临时资源，沿用原查看器的缩放、适宽和滚动功能。

## 设计结构

可编辑设计及状态表在私有维护工作区保存，公开仓库不提供可能包含私人资料的设计链接。首页终端只负责分享码输入与提示，资料回到原区块显示。

命令、选项和位置参数在 `src/lib/terminalShell.ts` 的命令表登记，`terminalCommand.ts` 统一生成帮助并校验输入，`terminalCompletion.ts` 根据同一份定义生成实时提示与 Tab 候选。路径候选随当前虚拟目录变化；新增命令或参数不再单独修改补全判断。运行 `npm run test:terminal` 检查登记传播和现有命令行为。

## 隐私区块与分享码

页面只维护一份完整资料，不另做删减版 PDF。完整 PDF、预览、邮箱及教育明细和校徽一并使用 [StatiCrypt](https://github.com/robinmoisson/staticrypt) 加密为 `resume-private.enc`。未解锁时，原区块显示 [React Bits DecryptedText](https://reactbits.dev/text-animations/decrypted-text) 驱动的乱码提示；动画只接收公开占位文字，页面不通过 CSS 隐藏真实内容。公开构建不需要私有源文件或分享码。

点击任意未解锁入口后，弹出复用现有终端外壳和输入组件的独立窗口。首页终端保持普通命令功能。空码和错码停留在输入提示，验证成功后教育和联系方式回原区块显示，简历才进入原查看器。分享码遮蔽显示，不回显、不进入历史或补全。首页 `unlock` 打开同一输入窗口；`Esc` 或红灯取消并恢复页面滚动，`lock` 隐藏全部私有区块并释放临时资源，刷新也回到锁定态。关闭 PDF 不退出本页解锁状态。分享码不写入源码、网址、日志或持久存储。

维护者在本机更新完整资料后运行：

```bash
npm run resume:generate            # 重新加密，复用本机已有分享码
npm run resume:generate -- --rotate # 主动生成新分享码并重新加密
```

生成命令读取本机完整 PDF、预览，以及 `%LOCALAPPDATA%/ResumePortfolio/private-details.json` 中的邮箱、教育和 Base64 PNG 校徽，路径可通过 `--pdf` / `--preview` / `--details` 指定。分享码保存在同目录的 `share-code.txt`，不输出码本身；可用 `--code-file` 指定其他仓库外路径。资料源和分享码均须在网站仓库之外。更新密文后仍需检查、构建和发布；完整源文件、资料 JSON、分享码及解锁截图均不提交。

当前按用户确认采用纯静态版，不提供次数、到期或服务端撤销；持码者可转发或保存已解锁资料。轮换后新部署使用新码，已下载的旧副本不能撤回。过去公开 Git 记录及旧部署可能含此前公开的邮箱和教育信息，本轮不改写历史。设计稿在维护工作区管理，公开仓库不再提供可能包含旧私人资料的设计链接。

轮换先在码文件旁保存 `.pending` 恢复码，全部写入成功才删除。中途失败时保留它，不覆盖或发布不匹配的文件；先用该码核对候选密文，再将它保存为正式码。已有恢复文件时生成会停止，避免丢失尚未处理的码。


## 验证

2026-11-10 已查看两版整页及可读尺寸的首屏、四项目、技能、教育、兴趣、联系和页底。四张封面替换后检查桌面整页、项目区与三个手机详情截图；另外三个项目在桌面、原型和手机详情共九个实例均指向新封面，主组件默认封面也已更新。未发现非预期越界或残留占位。除照片和 PDF 文档页外，文字、组件及图形为原生可编辑图层，没有整页截图代替主页。

已实测共享简介、长项目名、长兴趣标题和说明更新及自动增行，分别跨独立调用读取，测试后恢复正式数据。新教育时间线增加了长学校名称测试：手机第一段增高 24px，连接线随之延长，第二段及后续内容自动下移；桌面学校名增行 36px，日期轴保持对齐。已查看测试截图，恢复后独立读取四个正式页与原型的学校名称、尺寸均正常。PDF 重新解析结果为一页、零链接，无手机号、邮箱、城市或到岗文案。原型目的节点均存在，固定视口和 PDF 滚动方向已核对。实际 Present 播放遇到登录／Prototype not found 提示；因此打开、返回、滚动和缩放的真实点击效果尚未通过 UI 实测，不将结构检查称为点击测试。

当前整页为桌面 1440×5363、手机 390×6184，最终截图为 [desktop.png](../docs/design-previews/website/desktop.png)、[mobile.png](../docs/design-previews/website/mobile.png)。本轮刷新了两端首屏、关于我、手机四项目、手机原型、四个手机项目弹窗和三种 PDF 状态。`../docs/design-previews/website/terminal-modal-preview.png` 现为实际桌面项目弹窗，不再对应已删除的预览板。PDF 适宽的纸张尺寸为桌面 552×780.682、手机 334×472.369，放大为 650×919.281；独立读取确认同一比例，手机最终截图已显示完整纸张宽度。

本轮独立读取：15 个终端实例均关联 `90:1552`，继承同一黑色背景、12px 圆角和泛光效果样式，未发现外壳外观覆盖。两端页面、原型及弹窗文本未发现超出直接父级的边界问题。PDF 比例修改从唯一源传播至三个正式状态；未重新进行全体终端的临时边框传播实验。两端项目 01—04、技能 01—06 的既有顺序保留。照片、校徽和 PDF 原页以外仍为原生文字、矢量及组件。

2026-11-10 实际播放：从内嵌 Figma 点击 Present 打开了正式桌面入口，浏览器显示“未找到原型／登录”。未把连线、滚动配置和截图当成点击通过。用户随后明确“先不纠结这些了，样式做好就好”，因此本轮按样式交付收口，暂停进一步播放、滚动保持与交互排查；下载按用户选择保留待接入。另一个工作单元的 Astro 实现未随本轮设计同步，未发布网页或 PDF。

## 维护经验

- 2026-11-10 已验证，限本文件 PDF：实例内直接 `resize` 原页矩形未留下宽高覆盖，手机仍按 430px 被裁切；在原页唯一源使用 `lockAspectRatio()` 与横向 FILL 后，三个正式状态分别自动得到 552、334、650px 宽及正确比例。先读稳定后的实例尺寸，再导出截图，避免把同一调用内尚未完成的重排当成最终画面。
- 2026-11-10 已验证，限官方工具的插槽内容：移动插槽内 Frame 后继续使用原派生 ID 会报节点不存在；本轮两次失败均回滚。最终从现有内容提取一个主组件，并立即以实例替换、删除旧插槽 Frame。后续通过稳定的弹窗根节点重新读取插槽内真实 ID，不沿用创建当次的短 ID。
- 2026-11-10 用户明确收口要求：先完成样式，不再继续纠结原型播放与交互排查；该取舍不表示真实交互已验证通过。

以下均为 2026-11-10 本文件设计中的实测结果，证据和复现过程见完成计划。

- 文字调用 `resize` 后需要最后设置 `textAutoResize = 'HEIGHT'` 和垂直 `HUG`，否则可能被锁为 1px 高度并发生可见重叠；检查实际文字高度与截图。
- SVG 图标主组件的子节点采用双向 `SCALE` 约束，实例从 24 缩到 16/20/22 时才能同步缩放。
- 检查变量引起的多层重排时，将修改保留到下一次独立读取，再恢复并重新读取。一次调用内的父级高度可能尚未反映所有后代变化。
- 用户本次明确约定：使用已有简历，暂不输入姓名、手机号等敏感信息，内容用数据驱动；该约定仅覆盖此网站设计。
- 用户纠正：移动端不能压缩桌面；明确章节标题、教育独立；PDF 展示原页；不使用爪印加线框卡片的占位式封面，四张封面均采用与项目主题相关的照片和可编辑标题。已在本设计落实。
- 用户本轮要求更详细的“关于我／个人兴趣”、移除地址、学校改时间线并加校徽。文案只细化已有项目方向和已确认兴趣，不新增业绩或任职；主页、原型和网站 PDF 均移除城市。
- 教育时间线用自动布局管理学校和徽章，手机每段连接线填满当前内容高度，首段底线与次段顶线连续。长学校名增行后仍保持连接，不用固定坐标锁住第二段位置。
- 项目重排后需要同步序号变量、封面、正文标题、手机列表和详情，不能只改卡片显示位置。本次已核对两版和原型均从 01 递增至 04。
- 约定类／已验证（2026-11-10，限本网站）：用户指出“为什么……只改我说的地方”，编号检查必须同时覆盖项目、技能、兴趣、导航、正式页和原型；同级控件检查包含整组按钮。此次全范围读取通过，不把单个字段正确当作整页一致。
- 约定类／已验证（2026-11-10，限本网站）：用户要求先问风格，选择“终端手册式”，随后明确“之前这样项目卡片很好看，不要换”。该风格落实为开放正文与细线分隔，同时保留四张照片、类别条、渐变和标题封面；已认可部分不随全页风格调整擅自替换。
- 工具实测（2026-11-10）：修改绑定圆角后再直接赋 `cornerRadius` 会清掉绑定。最后用四个角的 `setBoundVariable` 绑定同一半径变量，并独立读取全部按钮确认。颜色绑定的备用 RGB 应与变量真实值一致；以实际截图核对，不能只看别名存在。导入 SVG 的隐藏背景填色即使保留 `visible:false`，绑定后仍曾渲染为方块；删除该隐藏背景填色、保留矢量描边后截图恢复正常。
- 约定类／已验证（2026-11-10，限本网站）：用户最终要求“改为icon加文字，也包括页头的两个按钮”。联系入口保留信封／GitHub 图标与真实邮箱／账号，项目与简历操作使用图标加名称；不能把“用 icon”自行解释成永久删除所有可见文字。
- 约定类／已验证（2026-11-10，限手机首页与原型）：用户指出“移动端的按钮大小不一致／项目卡片加入到移动端／关于我和项目实践离得太近了”，并选择“按此实施”。操作按钮须统一内容区等宽，不能只统一高度与圆角；项目复用认可封面，保留手机摘要和详情；章节留白与条目间距分开设置。本轮实际核对 16 个等宽按钮、八个封面实例和两处 96px 留白，截图见上。
- 约定类／已验证（2026-11-10，限本网站）：用户指出“造一百个看起来一样但实际上各自实现的组件就叫做一致性吗”。复用验收必须核对同一主组件关联、实例无外观覆盖，并实际修改一次源组件验证所有实例联动，最后恢复。仅复制标题栏、填色、圆角后组装普通画框不算复用。此次五个终端实例同源，1px→2px→1px 边框联动读取通过。还需检查父级背景、模糊和裁切；同一组件不能代替最终视觉检查。泛光截图的外侧18900个对应像素比较，最大RGB通道差为2，不能据此宣称整图像素完全相同。
- 全页外框若将描边计入自动布局，会让 390/1440 的内容区域减少 2px。根层关闭 `strokesIncludedInLayout` 后重新核对所有行宽，消除了相邻固定列的两像素越界。
- SVG 项目插画应锁定原始宽高比，再让宽度随容器填充，避免在手机详情里横向挤压。

## 资源与许可

核查日期：2026-11-10。

- [Lucide Mail](https://github.com/lucide-icons/lucide/blob/main/icons/mail.svg)、[File Text](https://github.com/lucide-icons/lucide/blob/main/icons/file-text.svg)：官方库查询无匹配后直接复用官方 SVG，保存于 `assets/mail.svg`、`assets/file-text.svg`，沿用本目录已有 Lucide 许可。GitHub 标志复用 [GitHub Octicons mark-github-24](https://github.com/primer/octicons/blob/main/icons/mark-github-24.svg)，保存为 `assets/github.svg`，官方 MIT 原文保存在 `assets/OCTICONS-LICENSE.txt`。均为可编辑矢量，没有引入网站图标框架。

- [Figma 变量 API](https://developers.figma.com/docs/plugins/api/figma-variables/)：采用原生变量与别名，没有新增文案同步框架。
- Simple Design System：Figma 官方库查询返回 Button 组件集 `cc8b558dc7d9684011b6b99ce8e6509399bc836b`，使用原生关联实例。
- [Lucide Static](https://lucide.dev/guide/packages/lucide-static) / [源码](https://github.com/lucide-icons/lucide)：使用 arrow-up-right、arrow-right、terminal、container、database、code、map-pin、menu。SVG 主组件描述中保留完整许可证，本目录 `LUCIDE-LICENSE.txt` 同步保存 ISC 与相关 Feather MIT 声明。
- [PawLink README](https://github.com/Ovo307000/pawlink/blob/master/README.md) 与 [package.json](https://github.com/Ovo307000/pawlink/blob/master/package.json)：核对动物领养功能、TypeScript/Next.js/Prisma 等工程实践；未运行项目或核实部署状态。
- [PawLink 原始封面图片](https://github.com/Ovo307000/pawlink/blob/master/public/hero-bg.png) 与 [HeroSection](https://github.com/Ovo307000/pawlink/blob/master/src/components/home/HeroSection.tsx)：复用实际首页资源与“用领养替代购买”原文，保存为 `assets/pawlink-hero.png`；仓库 AGPL-3.0 许可原文保存为 `assets/PAWLINK-LICENSE.txt`。这是按项目内容重组的封面，不是运行中网页截图。
- [KCD2 README](https://github.com/Ovo307000/kcd2-mods/blob/main/README.md)：作为 Lua/C++/ASI 模组开发工作区介绍，未宣称已发布模组或运行验证成功。
- 苍穹外卖：Anna Pelzer 的 [bowl of vegetable salads](https://unsplash.com/photos/bowl-of-vegetable-salads-IGfIGP5ONV0)，保存为 `assets/sky-food.jpg`，适用 [Unsplash License](https://unsplash.com/license)。这是餐饮主题照片，非项目实际页面或菜品数据。
- 尚庭公寓：[仓库房屋图片](https://github.com/Ovo307000/lease/blob/master/rentHouseH5/src/assets/my_room_bg.png)，保存为 `assets/lease-house.png`；仓库 MIT 许可原文保存于 `assets/LEASE-LICENSE.txt`。不将示意照片称为真实在租房源。
- KCD II：[官方 Steam 商店](https://store.steampowered.com/app/1771300/Kingdom_Come_Deliverance_II/) 的媒体图 `ss_709f3329562cd2cfe6db70bac908b3e72eaef83b.1920x1080.jpg`，保留上方 1920×720 区域以显示城堡，保存为 `assets/kcd2-scene.jpg`。游戏画面版权属于 Warhorse Studios / Deep Silver；用于标识目标游戏，非本工作区模组的运行成果。
- 校徽：仅保存在加密资料内，解锁后生成临时资源，不发布独立明文图片。

本任务新增网站资料，未修改原有简历、PDF 或原简历 Figma 文件。

StatiCrypt 的 MIT 许可保存在 STATICRYPT-LICENSE.txt；React Bits 源码及其 MIT + Commons Clause 许可位于 src/components/react-bits/。
