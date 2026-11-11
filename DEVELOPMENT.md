# 前端开发交接

本目录已实现 Figma 个人主页，入口为 `src/pages/index.astro`，通过 `Portfolio` 激活 React 交互。内容来自同一份 `content.json`，桌面与手机通过响应式布局共享组件；项目详情和简历预览共用 `TerminalWindow`。

## 启动与检查

推荐使用 Node.js 22.23.4 或更高版本，在本目录运行 `npm install`，再运行 `npm run dev`。开发依赖包含项目本地 Node 22，以兼容本机较旧的全局 Node；`npm run check` 检查 Astro 和 TypeScript，`npm run build` 生成静态站点，`npm run preview` 预览构建结果。

## 设计与内容

- Figma：[桌面](https://www.figma.com/design/98rP58yj706LdDUn9qfcLG?node-id=108-2140)、[手机](https://www.figma.com/design/98rP58yj706LdDUn9qfcLG?node-id=108-2690)。实施前重新核对当前画框与原型；先读取项目的 `figma-design-to-code` 技能。
- `README.md` 和 `content.json` 是现有设计与内容的入口；`assets/` 保存素材及许可。先核对数据和当前 Figma 的差异；缺失的个人信息保持空缺。
- 桌面与手机是分别设计的布局；实现后在浏览器的对应尺寸对照 Figma 整页及局部检查。设计与代码的同步按项目 `AGENTS.md` 执行。
- React 通过 Astro 官方集成启用，首页使用 `client:load`。按钮由 shadcn CLI 安装后适配，复用本地 `cn`、CVA 与 Radix Slot；原生 `dialog.showModal()` 提供焦点隔离和 Escape 关闭。现有 Motion `useAnimate` 负责从入口展开（360ms）、关闭回缩（220ms）和最大化/还原（300ms）；关闭动画完成后再清空内容，“减少动态效果”时立即完成。
- `src/lib/assets.ts` 通过 Vite URL 导入发布图片、SVG 和 PDF。四张封面与本地原素材的 SHA256 相同，因此复用原文件；校徽及特殊矢量来自官方 Figma MCP。Noto Sans SC 和 IBM Plex Mono 通过 Fontsource 本地打包。许可仍在 `assets/` 和 `LUCIDE-LICENSE.txt`，shadcn 许可另存 `SHADCN-LICENSE.txt`。

## 组件实现顺序

1. 字体、设计变量、素材映射与图标。
2. `Button`、`SectionHeading`、`TerminalWindow`。
3. `Navigation`、`ProfileTerminal`、`HeroSection`、`AboutSection`。
4. `ProjectCover`、`ProjectContent`、`ProjectCard`、`ProjectsSection` 与 `TerminalDialog`。
5. `DirectoryItem`、`SkillsSection`、`EducationTimeline`、`InterestsSection`。
6. `ResumeViewer`、`ContactSection`、`Footer`，由 `Portfolio` 组合。

项目和技能按 JSON 的展示序号排序，不改变数组下标。手机项目摘要与桌面/详情共用同一项目对象；无仓库 URL 的项目不会生成虚构链接。全部简历入口打开同一脱敏 PDF；预览沿用原页图片，支持相对适宽的50%–300%缩放和滚动，下载交付原 PDF。

## 验证与经验

2026-11-10：Astro 类型检查 29 文件、0 错误/警告/提示，静态构建成功。后续验证使用独立 TEMP 副本的 4323 生产预览，避免与另一部署任务的依赖安装争用。正式页面为 https://ops-portfolio-five.vercel.app/ ，Vercel 项目 `ops-portfolio`（scope `ovo307000s-projects`），生产部署 `dpl_9mgnpNo5Gs63FFKLpL8rNCqvYrxQ` 已 READY。实际线上桌面/手机、导航、项目、最大化/还原和 PDF 下载通过；下载 SHA256 与源文件一致。截图保存在 `verification/`，详细状态见实施计划。

原生 Terra（gpt-6.1-terra，01a1c569-65b7-7053-bf5e-0e3ad42c9bde）对父仓库最终暂存版本独立 check/build 通过，并在隔离4324预览实测PDF缩放、最大化/还原、禁用黄灯和手机菜单/项目入口；完整范围及其未独立覆盖项见 [窗口与部署验收](../docs/exec-plans/completed/macos-window-controls.md)。

在本目录更新 Vercel：先 `npm run check` 和 `npm run build`，再执行 `npx --yes vercel@latest deploy --project ops-portfolio --scope ovo307000s-projects --prod --yes`。部署只上传网站构建输入；不推送 Git，不更改另一任务的 GitHub/Cloudflare 配置。本机全局 vercel shim 损坏，使用 npm 官方 CLI。首次 API 连接重置后，以 IPv4 DNS 优先重试成功；不要把一次连接失败当作账号或整个服务不可用。

- 窗口控件复用 [CupertinoUI WindowControls](https://www.cupertino-ui.com/docs/components/window) 的免费源码，适配到 `WindowControls.tsx`。红灯关闭、黄灯固定灰色且 disabled、绿灯最大化/还原，悬停/键盘焦点显示符号。首页终端的窗口控件全部灰色。来源与 MIT 声明保存在 `CUPERTINO-LICENSE.txt`；原生 dialog 与现有终端外观继续共用。
- 仅终端自身使用英文 IBM Plex Mono，包括 profile 输出、窗口控制和 PDF 工具栏。正文与项目内容仍为中文，PDF 本体不翻译。命令逐字显示、字段按行进入、光标1秒闪烁；手机菜单用220ms高度与透明度过渡。减少动态效果时动画全部关闭且内容完整显示。
- 项目标题的公开仓库链接位于整卡详情按钮之上，避免整卡按钮拦截点击；没有公开地址的项目不显示外链箭头。弹窗卡片桌面24px、手机左右20px/上下24px内边距，封面和正文一起内收。

- SVG 的 `currentColor` 在独立 `<img>` 中不继承页面颜色；使用 Figma 导出的带真实颜色矢量，不能把黑色默认值误认成设计颜色。
- 字节哈希相同才将下载的封面映射回本地素材；外观相似不是等价证据。
- 全局 `.command` 和 `.portfolio-button` 的声明顺序会覆盖组件弱选择器。首屏命令和手机专用按钮使用组件上下文限定，实际检查跨屏显示及高度。
- 页面、项目及 PDF 共用 6px 暗色滚动条，移除上下箭头；支持 WebKit 的浏览器使用伪元素样式，其他浏览器使用原生 thin/color。原生 scrollbar-color 非 auto 会覆盖 Chromium 的伪元素，因此两个分支互斥；手机仍保留可见滚动提示。
- 手机和桌面只有一份 `navigation` 数据与一个 nav，手机展示同源品牌和菜单开关；点选收起，Escape 收起并返回开关焦点。Figma 品牌主组件为 129:2314，手机菜单使用与桌面相同的文字变量；菜单初始收起。
- 新 UI 必须先在 Figma 改可编辑设计并查看实际呈现，再修改代码；规则已写入项目 AGENTS.md。Figma 原型使用 200ms DISSOLVE 表达弹窗过渡，缩放曲线和系统滚动条细节以浏览器实现为准。
- 扫描线位于内容下面，避免盖住 PDF 和照片；终端背景、标题栏和泛光只在共用组件维护。

## 终端命令输出颜色与监控（2026-11-11）

本节verification/内的截图和网络JSON为本机验收附件，目录按现有规则忽略，未纳入Git或正式部署。可复现操作、源码范围和检查结论保存在下面的开发记录及执行计划中。

终端高亮需要区分文件语法和命令stdout：Shiki处理YAML、INI、Markdown、Shell和log；`ls`、帮助、身份、路径及错误由ansi-colors4.1.3生成ANSI，统一交给ansi-to-react6.2.6渲染。库解析ANSI，不手写转义解析器或分词正则。目录蓝色、可执行脚本绿色、文件黄色、帮助青色、错误红色，调色与Figma参考149:3202一致。`TerminalAnsi`是唯一渲染入口；补全候选在逻辑层保持纯文本，展示时复用ANSI颜色，rawInput历史保持无ANSI文本。console库默认message字体会覆盖父级字体，因此messageStyle显式指定IBM Plex Mono14px/24px，而非只依赖继承。

监控使用官方`@vercel/analytics`2.0.1、`@vercel/speed-insights`2.1.0的Astro组件，在index.astro各接入一次。部署后两项动态脚本、view及vitals上报均200；CLI查询6次页面访问，项目API两项hasData=true，SpeedInsights有dataReceivedAt1794381501110。没有打开仪表盘UI，独立LCP聚合暂未返回summary，不把采集成功等同于所有图表已填充。沿用免费档的访问统计与RES；基础SDK接入和Plus开关不同，官方toggle尝试返回402，没有升级套餐。

本地38文件类型检查0错误/警告/提示、静态构建通过；浏览器核对ls四种实际计算色、帮助/错误/身份/路径、五类文件高亮，历史、补全、clear、PDF及减少动态效果，手机390无横向溢出。原生Terra gpt-6.1-terra代理01a1c973-6fd7-7083-9c20-819c56055007独立check/build、模块行为、转义、复用及截图检查通过；未独立操作浏览器或项目后台。检查后精确源码部署为dpl_HrzY54totHQZ8ian9G6ytxVnFpok（READY）；正式1440/390、颜色/字体复验通过。截图在verification/terminal-ansi-production-desktop.png、terminal-ansi-production-mobile.png；监控响应证据在verification/vercel-monitoring-production.json，完整记录见[执行计划](../docs/exec-plans/completed/terminal-output-vercel-monitoring.md)。

监控验收经验：SDKv2由Vercel构建注入动态采集路径，读取实际script的dataset再验证，不能只请求旧固定URL。性能SDK源码过滤webdriver/headless；IAB未见性能事件后，真实Edge经正常导航产生vitals200，不修改检测标志或伪造指标。终端验收必须执行ls/help/错误，不能只看已有Shiki首页输出就声称所有结果有颜色。

## 终端输入提示与补全（2026-11-11）

占位跳动来自失焦20px和库默认聚焦7px的输入padding；已删除假光标与条件偏移，提示符和输入统一IBM Plex Mono16px/26px、gap8px、padding0。占位文字聚焦透明、失焦恢复；使用原生聚焦光标。库默认input的fontSize/fontFamily会覆盖font简写，因此显式设置字体长属性。Figma先更新共享提示符90:1549和状态参考149:3202，再实施代码。

`terminalCompletion.ts`统一返回补齐文本和候选；唯一候选直接填入，多个候选扩展公共前缀并经现有TerminalAnsi展示，空Tab列出命令，无匹配提示No matches.。cd只补目录，whoami --a和ls -补参数；候选不执行、不写历史，Shift-Tab可离开。复用react-console-emulator5.0.2的原生输入/stdout/history，无新依赖。之前仅测唯一前缀，遗漏空输入和歧义反馈；验收须同时覆盖这些分支及补全后继续逐字输入并执行。

隔离4328预览：39文件check零诊断、静态构建通过；桌面1440和手机390/320验证焦点、占位、候选与输入，输入相对起点17.6px三态不变，进入projects后123.2px也稳定。实际who+Tab后继续输入--about并执行、cat pro候选、cd路径、参数、无匹配、历史、Shift-Tab、clear、PDF打开及减少动态效果通过。未使用手机真机；浏览器无错误。

原生Terra gpt-6.1-terra代理01a1c994-d74c-7282-9b2d-9f6eafd57144独立check/build、模块行为、暂存哈希与截图核对通过；未独立操作浏览器。精确源码快照部署dpl_5c2aJCA3RytLc85mNTVLmJUXH93m为READY，正式1440/390实测占位三态、唯一补全后继续输入执行、空Tab及多候选通过；ANSI颜色与两项监控脚本各一份，未重复测监控网络上报。截图verification/terminal-completion-production-desktop.png和terminal-completion-production-mobile.png；完整记录见[本轮执行计划](../docs/exec-plans/completed/terminal-input-completion.md)。尺寸设置后须读回innerWidth：一次390设置落在另一个标签页，确认实际1280后改用已验证标签页访问正式网址，重新完成390/1440验收，未用错误尺寸截图代替手机验证。

## help 小猫彩蛋（2026-11-11）

用户确认连续每3次无参数help附加ASCII小猫，help -h立即触发，其他命令重置计数；刷新也重置。帮助列表照常保留，附加绿色三行小猫和青色英文Still need help? Meow.。本轮仅修改terminalShell.ts、terminalCompletion.ts及本记录，无新增依赖；help -可用Tab补成help -h。计数归属createTerminalShell的页面会话闭包，各终端实例独立；非help命令在未知命令检查前重置，clear、pwd及错误输入都可打断连续help，空白输入和补全不执行命令。

有限复用核查（2026-11-11）：预算为已安装5.0.2实现与既有库调查、[官方命令API](https://github.com/linuswillner/react-console-emulator/blob/master/docs/API.md)的一次正文读取、现有ANSI/多行输出调用链。命令参数和多行stdout已有接口；现有TerminalAnsi、ansi-colors和IBM Plex Mono承担显示，只补业务计数和固定ASCII文字，不引入生成器。Figma状态189:3199（会话2e703921-0684-457f-8ae3-b9edbe3e2b11）先于代码完成并目视检查，桌面/手机两实例继续关联窗口主组件90:1552；猫色复用既有connect.sh的ANSI绿色，未改首页静态资料状态。

本地隔离4329预览：39文件类型检查零诊断、静态构建成功；实际键入6次help得到false/false/true/false/false/true的彩蛋序列。pwd和unknown-command打断后重新从第3次触发；help -h立即显示并开始新的普通help计数周期，Tab参数补全、上下键历史、刷新重置通过。320px窄屏scrollWidth314px，猫使用14px/24px IBM Plex Mono，计算色rgb(166,227,161)，字符空格保留。桌面1440与手机390截图在verification/terminal-help-cat-local-desktop.png、terminal-help-cat-local-mobile.png；没有手机真机覆盖。

原生Terra gpt-6.1-terra代理01a1c9a6-20a3-7a00-b6b5-186385ca09a8独立check/build、真实模块计数/重置/参数边界/不同shell隔离与截图核对通过，未独立操作浏览器或核验Figma实例关系。初检发现文档把现行部署提前指向待发布记录，删除不实引用后同代理复核通过；源码未变。39文件零错误/警告，静态构建完成；源码审核树16d7772fbed49d878c03fbdcb4dfe757550a2d6e，使用其隔离快照部署dpl_6bpjKPjTWUNRzY9eG7oXomz3yT4G为READY，正式网址https://ops-portfolio-five.vercel.app/。

| 操作 | 预期结果 | 实际验证 |
|---|---|---|
| 连续6次help | 第3、6次附猫，其余仅原帮助 | 本地与正式1440通过，false/false/true/false/false/true |
| help -h；help -后Tab再Enter | 立即附猫；补成help -h并正常执行 | 本地、正式通过，390手机即时触发通过 |
| help两次后pwd/未知命令/clear，再help | 计数重置，不立即附猫 | 本地三类均通过，正式pwd/clear通过 |
| 刷新；上下键历史 | 普通help重新计数，历史仍可恢复命令 | 本地通过 |
| help -h extra、help --other；不同shell、空白与纯补全 | 误参数不触发；状态隔离，空白/补全不改变计数 | Terra真实模块验证通过 |
| 桌面1440、手机390/320 | ASCII等宽对齐，可输入，无横向溢出 | 本地三尺寸通过；正式1440/390的scrollWidth1434/385，浏览器无错误 |

正式截图verification/terminal-help-cat-production-desktop.png、terminal-help-cat-production-mobile.png。两项官方Vercel监控脚本仍各一份；本轮未重复测试监控上报、PDF缩放或手机真机。截图是被忽略的本机验收附件，不随Git或Vercel发布；发布后只补本文记录，没有改运行源码。

## 终端彩蛋与 PDF 缩放（2026-11-10）

PDF工具栏历史验收（2026-11-11）：该轮验证的正式部署为`dpl_Ea8sc6duCJtXYkVyUJ5Jus5zswdJ`（READY）。紧凑PDF工具栏、桌面按钮及Ctrl+滚轮、Fit width、实际下载与手机390/320布局通过；下载SHA256与源PDF一致。历史完整记录见[终端与缩放执行计划](../docs/exec-plans/completed/terminal-easter-eggs-pdf-zoom.md)。

原生Terra检查`gpt-6.1-terra`，代理`01a1c7ca-59e0-7c90-b7f5-7bb09946a84b`：19文件暂存范围独立check/build、实际模块命令/补全/错误/PDF回调、依赖与复用、截图及下载哈希核对通过。初检把手势中心误读为固定屏幕中心，核对用户实际确认范围后撤销该阻塞，未因此修改代码；Terra未独立操作浏览器。正式部署来自其检查的精确源码快照。截图`verification/pdf-compact-production-desktop.png`和`pdf-compact-production-mobile.png`。

截图经验：IAB仅用CDP尺寸覆盖时布局指标改变但截图表面可能仍裁切；正式截图改用浏览器viewport.set，完成后reset。截图必须目视核对，不能只凭元素尺寸宣称视觉通过。

首页提示符可输入 `help`、`ls`、`cd projects`、`pwd`、`cat pawlink.md`、`whoami`、`clear`。上下键调取历史，Tab补全命令或路径，Shift-Tab正常离开；`open ~/resume.pdf`或`cat ~/resume.pdf`打开页面共用简历弹窗。`ls -a`可找到隐藏提示，`coffee`与`sudo`有趣味回复。虚拟文件从现有content生成，目录只存在当前页面会话；不接后端或真实shell。

输入、输出和历史复用MIT组件[react-console-emulator5.0.2](https://github.com/linuswillner/react-console-emulator)；虚拟文件与命令由`terminalFiles.ts`/`terminalShell.ts`维护。必须显式安装Babel7的`@babel/runtime`：该组件漏声明生产运行时，Babel8又不导出旧regenerator入口。SSR返回CommonJS default包装，浏览器打包后直接返回组件，`TerminalConsole`只在这个已验证边界适配一次。Enter捕获时preventDefault/stopPropagation，再调用组件的pushToStdout、历史、clearInput和滚动接口；命令分发使用站点已有shell和Object.hasOwn。不能用库内置的ignoreCommandCase分发：它会拒绝`./connect.sh`，还会把未知输入构造成正则。实际验证`[`和`constructor`均只显示未知命令且输入继续可用。noNewlineParsing保留多行ReactNode的高亮，避免库先将其压成纯文字。

PDF手势复用MIT的[@use-gesture/react10.3.1](https://github.com/pmndrs/use-gesture)，`usePdfZoom`统一维护比例，按钮每次25个百分点，Fit width恢复100%并回顶部；双指/Control+滚轮以手势中心缩放，图片真实宽度变化供原生滚动。所有入口共用ResumeViewer，最大化不会卸载查看器。Figma共享源90:1552、106:2081及桌面/手机状态已先修改并目视检查，命令参考149:3202。

隔离TEMP的生产构建4326已验证桌面1440、手机390及窄屏320；34文件类型检查0错误/警告/提示，静态构建成功。命令/目录/错误、清屏、历史/补全、手机输入、打开简历、缩放上下限、适宽、最大化保留比例、Escape返回输入框及减少动态效果通过。Edge390触摸仿真实际双指从100%到286%，单指scrollTop到461，再双指回105%，visualViewport.scale始终1；不等同于iOS/Android真机覆盖。内置浏览器不支持dispatchTouchEvent，不能用它宣称已测双指。截图位于verification/terminal-commands-mobile.png、pdf-zoom-mobile.png、terminal-zoom-desktop.png；详见项目执行计划。

2026-11-11：首版命令与缩放已发布到正式网址，部署`dpl_DdrFLAnSqk4YHsJ7MQTgekLGdSbE`为READY。线上桌面1440/手机390实测`ls`、`who`→Tab→`whoami`、`cat res`→Tab→`cat resume.pdf`、上下键历史、`open ~/resume.pdf`和PDF150%/适宽通过，无浏览器错误。截图`verification/terminal-production.png`及对应桌面/手机整页。此前只验证本地、未部署，导致用户在正式站点仍看到不可输入的静态终端；今后交付必须核对实际正式网址的输入和补全，不用本地验收代替线上状态。用户正在继续要求页面同名命令与Shiki高亮，后续版本验收见活动计划。

同日Shiki版本的历史部署为`dpl_CvRe6dgSd74nTaZTsbrFCmFR4eND`（READY）。首页与`cat profile.yaml`共用真实YAML文本；`whoami --about`、`ls ./projects/`、`cat ./skills.conf`、`cat ./education.log`、`ls ./interests/`和`./connect.sh`返回对应资料。英文说明作为译文保存在content.json相关条目旁，工具、项目、联系方式与时间仍由同一份数据生成；页面中文不变。高亮复用MIT库Shiki4.6.0，当时按需加载core、JavaScript引擎、四种语法和catppuccin-mocha主题；TerminalCode渲染库返回的tokens，未手写分词或高亮正则。原字段卡片及其CSS已删除，保留逐字命令、按行出现和光标动画。

此版36文件类型检查0错误/警告/提示，生产构建通过。正式网址实际执行上述六种区块命令、参数补全、异常输入和从终端打开PDF并放大至125%；桌面1440/手机390无横向溢出，无浏览器错误。本地另测文件补全、历史、清屏、兴趣目录读取、脚本源码、Shift-Tab离开、Escape焦点返回和减少动态效果；减少动画时首行opacity1/animation none。Figma共享源及桌面/手机整页、首屏已目视检查。最新线上截图：verification/terminal-yaml-production-desktop.png、terminal-yaml-production-mobile.png。

同日用户批准紧凑PDF工具栏，并明确要求检查子代理先于部署、授权自主完成。Figma共享工具栏106:2076复用现有Subtle/Small按钮3:166；代码在已有Button中补相同变体，仅Download使用。桌面工具栏36px高，页码/缩放/下载同排；手机390和320为80px紧凑换行，下载没有单独的大边框。Ctrl+滚轮已实际通过CDP输入验证50%/300%边界，图片真实宽度改变且页面缩放仍1；最大化保留比例，适宽还原100%。实际点击下载的文件SHA256与源PDF相同（1ECB06F9E1922EBFB8CD74890107C98AE28C41CC973E0AB435C0A222BB9C8B61）。36文件检查0诊断、构建通过。证据在verification/pdf-compact-desktop.png、pdf-compact-mobile.png；最终检查和发布状态见执行计划。
