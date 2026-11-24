# 个人主页

一个终端风格的中文个人主页，展示个人介绍、项目实践、技术能力、教育经历和兴趣。页面适配桌面与手机，内容由同一份数据驱动。

[访问网站](https://ovo307000.github.io/)

## 功能

- 浏览项目、技能和公开 GitHub；教育、联系方式和简历原位显示动态乱码，解锁后恢复完整内容。
- 在首页终端输入 `help` 查看命令，通过 `ls`、`cd` 和 `cat` 探索站点内容；支持命令历史和 Tab 补全。
- 查看项目详情，在页面内预览、缩放和下载简历 PDF。
- 桌面与移动端共用内容，并根据屏幕尺寸调整布局。

首页终端是运行在浏览器中的模拟环境，展示的是网站内容，不连接真实系统终端。

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

## 技术栈

- [Astro](https://astro.build/) 和 [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion](https://motion.dev/) 和 [Shiki](https://shiki.style/)
- TypeScript

## 本地开发

需要 Node.js 22.23.4 或更高版本。在仓库根目录执行：

```bash
npm ci
npm run dev
```

按终端提示打开本地地址。其他常用命令：

```bash
npm run check    # 检查 Astro 和 TypeScript
npm run build    # 构建静态站点到 dist/
npm run preview  # 预览构建结果
```

## 项目结构

```text
content.json       页面内容
src/pages/         页面入口
src/components/    页面组件与交互
src/lib/           内容、终端与资源处理
src/styles/        页面样式
assets/            图片、图标及相关许可
resume-private.enc 加密的完整 PDF、预览及私有区块数据
scripts/           本机维护命令（不在公开构建时生成私有资料）
```

维护说明见 [开发文档](DEVELOPMENT.md)，发布配置见 [部署文档](DEPLOYMENT.md)。

## 素材与许可

网站使用的第三方组件、图标及部分项目素材的许可文件保存在仓库根目录和 `assets/`。[React Bits Gradient ASCII](https://reactbits.dev/backgrounds/gradient-ascii) 背景的来源和 MIT + Commons Clause 许可保存在 `src/components/react-bits/`。餐饮项目封面使用 Anna Pelzer 的 [Unsplash 照片](https://unsplash.com/photos/bowl-of-vegetable-salads-IGfIGP5ONV0)；KCD II 项目封面使用 [Steam 商店页面](https://store.steampowered.com/app/1771300/Kingdom_Come_Deliverance_II/)的游戏画面，版权属于 Warhorse Studios / Deep Silver。

StatiCrypt 3.5.4 的 MIT 许可保存在 `STATICRYPT-LICENSE.txt`。加解密、签名和密钥派生直接复用该库，不自行实现密码算法。
React Bits DecryptedText 的上游源码及 MIT + Commons Clause 许可位于 `src/components/react-bits/`。
