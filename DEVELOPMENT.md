# 前端开发交接

## 终端命令定义与参数补全（2026-11-13）

命令表是执行、help和补全的唯一参数来源。每项声明description、options、parameters和可选examples；位置参数可指定choices或动态path/directory类型。terminalCommand.ts生成usage、help并验证参数，terminalCompletion.ts不再判断具体命令名。实时后缀和Tab仍经shell.complete共用此逻辑，原输入、光标、历史、中文组词与分享码窗口不变。

`npm run test:terminal` 用现有TypeScript编译器和Node内置测试，在系统临时目录编译并清理；无新增依赖。覆盖全部命令、新登记项自动传播、参数与选项位置、动态目录、错误输入不触发副作用。命令业务回调仍负责具体工作；新增参数时在命令项声明契约并实现相应业务，不从usage文本或函数源码猜参数。

本目录已实现 Figma 个人主页，入口为 `src/pages/index.astro`，通过 `Portfolio` 激活 React 交互。内容来自同一份 `content.json`，桌面与手机通过响应式布局共享组件；项目详情和简历预览共用 `TerminalWindow`。


本目录已实现 Figma 个人主页，入口为 `src/pages/index.astro`，通过 `Portfolio` 激活 React 交互。内容来自同一份 `content.json`，桌面与手机通过响应式布局共享组件；项目详情和简历预览共用 `TerminalWindow`。

## 背景开场与卡片反馈（2026-11-13，当前状态）

提交前检查已由显式请求gpt-6.1-terra的独立代理01a1d097-424a-7a81-a270-77f8fe3bc9d8完成并放行：类型检查72文件零诊断、构建通过，源码/来源适配/当前截图核对通过；指定源码和文档中的常见凭据格式扫描无命中，不代表完整敏感信息审计。没有独立重测全部浏览器互动，结论结合主会话现有运行证据；手机加密卡片瞬时active和真机仍属已知验证限制。拟按导航、背景、入场、标题、卡片五项分开本地提交，开发记录独立提交；另一会话README编辑不纳入，不推送或发布。

桌面和手机侧边导航均已移除，Navigation、LineSidebar、导航定位函数、专属CSS和无引用navigation数据全部删除。下文2026-11-12导航实施记录属于历史验证，不能作为当前页面行为。SectionReveal和GSAP仍用于八处入场，不随导航一起删除；终端和现有页面内链接保留。

GradientASCII新增introDuration秒参数，默认仍为上游2.4秒；SiteBackground开启intro并传3.2，日常speed0.35不变。重读官方注册表确认时长原本固定于INTRO_SECONDS，不能通过降低speed改变开场。浏览器采样uIntro由0.0052渐增到1，实测3324.5ms；设备帧耗时与上游dt限幅会使实际时间略长。减少动画首次值直接为1。

项目与加密卡片共用styles/card-feedback.css，背景色/边框色200ms ease；悬停仅在支持hover的设备启用，键盘可见焦点及active状态同源，无transform。项目标题分隔线继承根的反馈色，不改覆盖点击层、仓库链接或手机详情按钮。四项目及三加密入口逐项键盘反馈通过，七处根transform均none；四项目详情和三分享码窗口点击/Escape关闭通过。手机轻点项目采样到active及多帧回退中间色；加密入口实际点按可打开窗口，但瞬时active颜色未在逐帧采样中捕获，不能称为该项连续颜色已验证。无真机检查。

Figma先移除导航源254:3659及两包装，四页/原型继承一致；说明254:3695和背景源244:3663更新。反馈板300:3691使用既有移动项目源102:1621及加密源232:3649的实例，颜色绑定既有变量，无整页栅格替代。默认/反馈截图及两端整页已看。浏览器证据verification/card-feedback-*.png与card-feedback-checks.json。72文件类型检查0错误/警告/提示，构建通过，保留既有staticrypt node:crypto外置警告。1440桌面与390/320手机无侧栏、手机溢出0；无JS/无WebGL及减少动画回退可读。未验证分享码正确解锁或真机，不部署。

## 主标题 TechText、六区块 ASCIIText（2026-11-12）

2026-11-13跨行选框修正：此前HeroTitle每行各建TechText画布，frame状态互不相通，同一行平滑并不代表跨行连续。先更新Figma动效说明293:3691，桌面/手机原可编辑标题布局保留；再将HeroTitle合为一个画布。TechText仅补换行排版、字形独立基线、像素行高和二维命中，复用官方选框缓动及点击/拖动逻辑，不增加第二套选框动画。useTitleTheme返回现有CSS行高；画布纵向留白改为两行总高的10%，保留原176/108/92px标题高度。

实测1440/900/768/390/320px均只有一个主标题画布、横向溢出0；下行返回上行采样分别有37/31/30/32/29个不同选框纵坐标，验证经过中间位置而非跳转。下行点击、上行拖动后恢复同一画布哈希1659861024，拖动光标grabbing；无JS及减少动画均保留完整两行普通文字。75文件类型检查0诊断，构建通过，仅原有staticrypt node:crypto警告。证据verification/tech-crossline-checks.json、tech-crossline-desktop.png、tech-crossline-mobile.png；Figma是静态文字与动效说明，连续移动以浏览器采样为准。本地修改，尚未提交或发布。

用户最终确认：首页完整两行“从应用开发，／到部署与运维。”使用TechText，鼠标经过显示虚线轮廓和选框；关于我、项目实践、技术能力、教育经历、个人兴趣、简历与联系六个区块标题使用ASCIIText。全部沿用绿色和原文，其他h3项目名/技能分类、简介、按钮、背景、悬浮导航及区块入场不改。最初仅给首页使用ASCIIText的方案已被替代，旧AsciiHeroTitle与useAsciiTitleTheme入口及旧CSS均已移除。

先在Figma保留原四个h1文本及十二个区块标题文本，主标题恢复实体绿色作为TechText默认态；十二个区块标题实际引用同一ASCII纹理PaintStyle S:0efdcd45d8b9482ae66c491c568bbfb81bef92c9,。字符纹理为效果素材，中文本身仍可编辑；布局、字号、行高不变。交互意图293:3691记录轮廓、选框、点击回弹、拖动恢复及降级。整页和关于我局部已目视检查；Figma是静态参考，不能表示Canvas连续互动。

网站HeroTitle复用官方TechText，六个SectionHeading共用AsciiSectionTitle；两者实际调用同一个useTitleTheme读取现有CSS主题、加载Noto Sans SC并测量可用宽度。保留真实h1/h2文本和读屏语义；服务器先显示普通文字，无JS可读；减少动画时直接显示普通标题。WebGL2不可用时六个ASCII标题走官方普通文字回退，TechText的Canvas2D仍工作。无新增依赖，源码与本地适配说明见react-bits/README。

实际桌面1440、900、768和手机390/320验证均无横向溢出；主标题仍为两行，六个h2逐项完整，普通h3中画布数0。主标题桌面176px高、390端108px、320端92px；区块标题桌面49px、手机39px，维持原行高。TechText悬停选框/虚线已目视检查；点击与拖动后画布均恢复同一稳定像素哈希4208566790（点击中971240737，拖动光标grabbing）。ASCII六标题着色器ready1/intro0；细格桌面1.545px、手机1.25px，指针hover约0.72、hue0，点击ripples有效。减少动画时0个文字画布、8行普通文字；无JS8行可见；模拟无WebGL2完整显示六个标题。

回归实际执行终端help及四个悬浮导航锚点，位置约24px；页面原入场未改。最终75文件类型检查零错误/警告/提示，构建通过，保留既有staticrypt node:crypto外置警告。未解锁或复验另一会话正在修改的隐私简历流程，未覆盖手机真机；未发布。

经验：官方ASCIIText默认3px下限在小中文上呈粗块，只将下限开放到1.25px，由适配层按字号/22选细格，不缩小字体或重写着色器；TechText默认CSS的100%画布尺寸会覆盖站点留白，使用更具体的.hero-heading .hero-tech-effect选择器，让字形恢复原字号，布局盒子不变。截图必须等待字体、区块入场和ASCII解码完成，不能把初始暗淡帧当最终画面。证据：verification/tech-ascii-checks.json、tech-ascii-hero-hover.png、tech-ascii-about-desktop.png、tech-ascii-interests-mobile.png、tech-ascii-desktop-full.png。

## React Bits 右侧悬浮导航与区块入场（2026-11-12）

用户最终要求桌面与手机都直接悬浮在页面右侧，不单独预留栏位、不缩窄正文，手机也不使用展开按钮或抽屉。已移除旧顶部导航及其CSS和无引用prompt字段。Navigation复用既有四项navigation数据与官方LineSidebar，仅将点击li适配成真实锚点，支持Tab/Enter；桌面显示栏目名，手机显示01～04和刻度，名称继续供读屏使用。右边缘宽度为108px/40px，手机每项触控高度44px。没有第二套菜单状态或移动端内容源。

七个正文区块和页脚统一经SectionReveal调用官方AnimatedContent：首次进入视口由下方100px/透明到原位/不透明，0.8秒、power3.out、threshold0.1、once。背景、导航和弹窗不包入transform；终端原有文字/光标动效保留。新增依赖gsap，来源与适配说明见src/components/react-bits/README.md。SSR显式visibility:visible，无JS可读；减少动画时八个区块直接显示。

Figma先完成导航源254:3659、桌面实例254:3669、手机实例254:3682及动效说明254:3695；桌面/手机正式页面和两个原型沿同一源继承。旧桌面导航3:309和手机按钮包装21:1454已移除，手机21:1456改为常驻悬浮刻度；正文全宽。首版预留区域和重复品牌被用户否定后已撤回，最后移除手机抽屉，缩为页边编号。静态设计表达默认/活动外观和入场意图，连续动画以浏览器验证，不能逐帧等同。

本地生产预览4341、Edge157：最终63文件类型检查零错误/警告/提示，构建成功，保留原有staticrypt node:crypto外置警告。1440px正文宽1440；390/320手机正文宽分别390/320，导航4链接常驻且按钮/抽屉数量0，无横向溢出。实际点击/键盘四锚点定位约24px，屏幕刚缩放后点击也通过。八区块实测初始opacity0、translateY100，结束opacity1、transform none；返回上方/导航跳转后不重播。减少动画、无JS、终端help、PawLink详情与关闭通过。此轮没有解锁或重新验证另一会话正在修改的隐私简历流程；保留其现有修改，未将旧简历测试结论套到新流程。没有真机验证、没有发布。

排错实证：焦点设置放在平滑滚动后，会在手机仿真中中断滚动；先focus({preventScroll:true})再scrollTo解决。390→320后立即点击仍会被ScrollTrigger的延迟resize刷新打断；阅读其_refreshAll确认会暂停resizeDelay，改为navigateToSection先调用ScrollTrigger.refresh，再取稳定wrapper.offsetTop并滚动，复测通过。不用动画中的getBoundingClientRect作为目标坐标，不加任意延时补丁。

最终运行截图为verification/nav-motion-desktop.png、nav-motion-desktop-full.png、nav-floating-mobile-390.png、nav-floating-mobile-320.png；结构及行为证据verification/nav-motion-checks.json。旧抽屉/展开测试已失效，不作为当前验收。全局React Bits技能安装到C:/Users/solow/.agents/skills/design--react-bits，并实际下载两组件；错误组件名按预期退出1、不写伪源码。本地发现器检出，当前会话已加载；没有证明客户端目录广告自动刷新。全库引用门禁仍有此前已存在的DigitalOcean脚本缺失，新增技能的引用、索引和frontmatter均无错误。

## Gradient ASCII 整站背景（2026-11-12）

用户确认整站共用深绿字符渐变，卡片和终端保留底色，正文和布局保持，本轮不发布。先修改 Figma 桌面108:2140 / 手机108:2690并目视检查，再接入官方 React Bits Gradient ASCII。唯一静态设计源244:3663、文本244:3664，桌面/手机实例244:3665、244:3667，原型沿现有页面组件继承；静态示意无法表达连续着色器动画。字体复用IBM Plex Mono与Portfolio/mono，颜色绑定现有background/accent。绑定paint时opacity被重置为1，实际截图发现过亮；改为文本节点opacity0.10后重新看整页通过，后续必须读取实际值和截图。

网站唯一挂载入口为Portfolio中的SiteBackground，颜色从现有CSS主题读取；固定视口画布覆盖整站，pointer-events:none不拦截输入或滚动。官方TSX/CSS保存在src/components/react-bits，源码保持原貌，来源、SHA256与许可在相邻README/LICENSE中；无新增依赖。移除整页、首屏、联系区的旧纹理引用、CSS和三份SVG，保留终端内部扫描线。导航、首屏和联系区背景透明，标签、隐私说明与终端原底色保留。

54文件类型检查零错误/警告/提示，生产构建通过；构建仍有现存staticrypt的node:crypto浏览器externalization警告，未在本轮修改。复用已运行的本地生产预览4341，在Edge157验证1440×1000、390×844、320×740：横向溢出均为0，滚动到技能/联系区后仍只有一个视口大小canvas。实际help、PawLink详情、简历预览和Escape关闭通过；手机help和项目详情通过。鼠标移动后着色器trail强度约0.983，证明指针进入渲染；减少动画时连续观察绘制次数25→25且trail=0。模拟无WebGL2仍可执行pwd并显示/home/visitor，内容可读。截图已目视检查，证据位于verification/ascii-*.png及ascii-checks.json；没有真机覆盖，也没有发布到正式站点。Figma设计截图与执行状态在私有工作区docs/design-previews/website与背景执行计划中。

## 关于我 A 版与统一标签（2026-11-12）

用户选择样式 A，并要求“给技能 tag 改到小卡片上，例如项目实践加 java tag”；随后确认个人兴趣、技术能力与关于我、项目标签统一采用“细边小圆角”。先完成 Figma 正式桌面和手机设计，再根据官方设计上下文同步网站。关于我上方保留完整简介，下方是编号双栏，手机纵排；Java / TypeScript / Linux 归项目实践，Lua / C++ 归技术探索，没有新增个人经历或删减正文。

`ui/TagList.tsx` 是四处标签的统一渲染入口，使用语义化列表；全局 `.tag` 统一 12px/20px 正文、4px 圆角、1px 边框、4px×8px 内边距，沿用 surface、border、text 主题色。标签列表自动换行，不模拟按钮。技能和兴趣的 `tools` 从分隔字符串改为数组，终端技能清单以 `join(', ')` 保持原输出；没有旧字段兼容分支或新增依赖。

Figma 标签源为 `206:3326`（Technology / Tag）；技能/桌面兴趣源 `3:299`、手机兴趣源 `111:2446`、完整项目源 `3:223` 均通过插槽组合它的实例。直接维护的消费者分别为 15、3、20 个，页面原型继承正式页面源。正式关于我根 `3:602` / `21:1460` 保留，已有滚动目标无需更换。Figma 实测标签高 30px；浏览器当前缩放下计算高约 29.6px、边框约 0.8px，各处值一致。

本地生产构建浏览器验证：1440px 两栏标签和底边对齐；390px、320px 纵排及标签换行正常，页面横向溢出为 0。技能六组各四个标签、兴趣三组各三个标签、关于我两组 3/2 个标签均保留；桌面可见 62 个标签，手机首页可见 38 个（项目完整标签在详情中）。320px 实际打开苍穹外卖详情，六个标签完整且 Docker Compose 不溢出。实际运行 `cat ./skills.conf` 返回六组原技能清单，浏览器错误/警告为空。构建、检查及发布证据由私有工作区的本次执行计划记录；本地验证不能代表正式站点已发布。

本轮另发现手机菜单收起会让锚点向上偏移约 204px；实际关于我 top≈-180.4px，桌面约 23.6px。Navigation.tsx 无本任务改动，保留为独立问题；没有将菜单点击成功写成手机锚点定位通过。

截图与结构证据位于 `verification/tags-interests-desktop.jpg`、`tags-interests-390.jpg`、`tags-interests-320.jpg`、`tags-full-desktop.jpg`、`tags-full-390.jpg`、`tags-full-320.jpg`、`tags-project-320-bottom.jpg`、`tags-layout-checks.json` 和 `tags-interaction-checks.json`。设计经验：项目组件属性对象的键顺序不保证等于技术标签下标，迁移后应按原内容变量路径的数字下标排列；本轮已按此恢复全部项目消费者的顺序。复制混合单边描边时，`strokeWeight` 可能是 mixed 标记，不能当数字写入；应明确维护单边线宽。

## 字符间光标的平滑位移与闪烁（2026-11-12）

用户明确：“拖尾是从一个地方到另外一个地方移动的过渡动画，而不是另外一个特效”，同时要求光标不占用建议字母的位置。当前只有一根1px竖线，通过Motion从旧位置平滑移动到新位置，默认过渡180ms；不增加空格或独立残影。Figma参考149:3202和动效说明202:3270已按此修正；旧尾迹参考因Figma虚拟插槽节点拒绝删除而隐藏，运行时代码中没有该效果。

`TerminalCaret`复用`useTerminalFeedback`的输入、选区、composition和滚动快照。镜像文字测出目标位置并扣除scrollLeft；Motion只移动光标，原生输入、选区和命令响应保持即时。启用时隐藏原生光标，失焦、普通文本选区和减少动态效果时恢复；闲置以1.1秒周期闪烁，输入/移动后保持可见500ms。组词期间继续更新光标位置，同时隐藏补全建议，选词结束后再恢复补全；输入法候选框仍由原生输入处理。

用户在最新预览明确反馈“现在组词时有过渡了”，作为真实输入法动画验收依据，不用静态截图替代。此前一次失败反馈来自尚未刷新的旧脚本；核对标签页与服务端模块版本并刷新后，临时诊断采集到组词事件。诊断只记录长度和光标位置、不记录文字，已停止并从页面移除；数值记录保留在verification/terminal-ime-user-trace.json。静态检查与构建通过，正式发布状态由本次计划记录。

## 首次使用提示（2026-11-12）

用户选择“此浏览器一直记住，刷新或下次打开也不再提示”。未使用时保留`type help`，输入任意字符即移除，不要求执行命令。`terminalUsage.ts`使用同一站点的localStorage记录已使用状态，接入既有输入观察器，不新增重复输入监听；清空、clear和失焦不恢复提示。浏览器禁止存储时仍在本页隐藏，不阻断输入。

隔离预览用localhost:4333独立站点状态验证，未改动用户的127.0.0.1:4333状态：首次占位为type help，仅聚焦/失焦仍保留；输入x后移除；删除、失焦、刷新、执行clear后均没有placeholder，已使用记录为1。42文件检查零诊断、构建成功；这项测试只证明提示行为，动画与输入法采用用户反馈。

## 终端实时补全与无匹配反馈（2026-11-12）

用户确认：输入`who`后显示淡色`ami`，Tab接受；无匹配在输入行下方显示`No matching commands or paths`，继续输入即清除，重复Tab不新增输出。先更新Figma状态参考149:3202中的原有桌面/手机内容源，保留共享终端90:1552实例和主题色，再查看实际呈现并实现。

`useTerminalFeedback.tsx`通过React portal将预览和状态放入库的原有输入行；预览与Tab均调用现有`shell.complete`，没有新命令表、解析器或依赖。原生输入仍由react-console-emulator5.0.2负责；输入、删除/粘贴、焦点、选区、横向滚动与历史按键后同步预览。前缀占位不可见、预览不可交互且从辅助阅读隐藏；无匹配通过status单独显示，不进stdout或历史。已核实该库用程序赋值恢复历史，不会产生input事件，因此仅监听输入变化不足。中文组合输入期间不接受补全或提交；本轮未覆盖真实手机输入法。

实测还发现库默认content高度100%会让长输出后的新提示贴近裁切边界；改为内容自适应高度，并复用原有scrollToBottom将新提示带入视口。现有字体、8px提示符间距和输出高亮保留，状态为12px/20px、距输入4px。Figma对应状态复用muted变量。

本地4331浏览器实际逐字输入验证：who→预览ami→Tab→whoami→Enter；兴趣目录cat ./edu连续三次Tab仅一条状态且stdout数量不变；编辑/历史/提交清除状态；cat res、whoami --a、cd pro、cat pro多候选及空Tab命令列表正常；中间光标/选区/失焦隐藏预览，长输入scrollLeft183.2px时预览同步位移，Tab仍补全。1440/390/320px无横向溢出（手机scrollWidth385/314px），clear与PDF打开/关闭正常，浏览器错误/警告为空。40文件类型检查零诊断，最终静态构建成功。截图位于verification/terminal-inline-desktop.png、terminal-inline-mobile.png、terminal-feedback-desktop.png、terminal-feedback-mobile.png及terminal-feedback-320.png。以上为本地验证，正式发布与提交状态见本轮计划。

## 启动与检查

推荐使用 Node.js 22.23.4 或更高版本，在本目录运行 `npm install`，再运行 `npm run dev`。开发依赖包含项目本地 Node 22，以兼容本机较旧的全局 Node；`npm run check` 检查 Astro 和 TypeScript，`npm run build` 生成静态站点，`npm run preview` 预览构建结果。

## 设计与内容

- Figma 设计入口在本机维护工作区管理，公开仓库不发布可能含旧私人资料的设计链接。实施前重新核对当前画框与原型；先读取项目的 `figma-design-to-code` 技能。
- `README.md` 和 `content.json` 是现有设计与内容的入口；`assets/` 保存素材及许可。先核对数据和当前 Figma 的差异；缺失的个人信息保持空缺。
- 桌面与手机是分别设计的布局；实现后在浏览器的对应尺寸对照 Figma 整页及局部检查。设计与代码的同步按项目 `AGENTS.md` 执行。
- React 通过 Astro 官方集成启用，首页使用 `client:load`。按钮由 shadcn CLI 安装后适配，复用本地 `cn`、CVA 与 Radix Slot；原生 `dialog.showModal()` 提供焦点隔离和 Escape 关闭。现有 Motion `useAnimate` 负责从入口展开（360ms）、关闭回缩（220ms）和最大化/还原（300ms）；关闭动画完成后再清空内容，“减少动态效果”时立即完成。
- `src/lib/assets.ts` 通过 Vite URL 导入公开图片、SVG 和私有资料密文，不导入明文 PDF 或预览。四张封面与本地原素材的 SHA256 相同，因此复用原文件；学校校徽只在加密资料内，解锁后创建临时 Blob URL。Noto Sans SC 和 IBM Plex Mono 通过 Fontsource 本地打包。许可仍在 `assets/` 和 `LUCIDE-LICENSE.txt`，shadcn 许可另存 `SHADCN-LICENSE.txt`。

## 组件实现顺序

1. 字体、设计变量、素材映射与图标。
2. `Button`、`SectionHeading`、`TerminalWindow`。
3. `Navigation`、`ProfileTerminal`、`HeroSection`、`AboutSection`。
4. `ProjectCover`、`ProjectContent`、`ProjectCard`、`ProjectsSection` 与 `TerminalDialog`。
5. `DirectoryItem`、`SkillsSection`、`EducationTimeline`、`InterestsSection`。
6. `ResumeViewer`、`ContactSection`、`Footer`，由 `Portfolio` 组合。

项目和技能按 JSON 展示序号排序，不改变数组下标。手机摘要与桌面/详情共用同一项目对象；无仓库 URL 的项目不生成虚构链接。受保护区块使用 React Bits DecryptedText，只动画公开占位文字。所有未解锁入口打开独立 share-code.sh 终端窗口，复用 TerminalDialog、TerminalEmulator 和隐私状态，首页终端不接管输入。空码/错码仅提示，成功才进入完整 PDF 或原位恢复资料。`unlock` 打开同一窗口，`lock` 释放私有资源。useTerminalDialog 同步 open=false 和卸载到原生 close，防止遮罩与 body 滚动锁残留。完整 PDF 沿用原查看器的缩放及下载。

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
