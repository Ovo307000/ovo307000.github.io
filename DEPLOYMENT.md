# 发布与自动更新

源码仓库：https://github.com/Ovo307000/ovo307000.github.io

正式分支为 `master`。GitHub Pages 地址为 https://ovo307000.github.io/ 。Cloudflare Pages 从同一仓库的同一分支构建；其最终地址在首次部署成功后记录。

网站目录单独关联上述仓库，保留旧站 Git 历史。父目录的简历资料和设计文件不随此仓库上传。网站运行所需的 `src/`、`assets/`、`content.json`、`resume.pdf`、`resume-page.png` 和许可证必须保留；整页设计截图、验证截图、本地 Figma 状态、依赖目录和环境密钥不上传。

## 每次更新

在 `C:/Users/solow/OneDrive/Project/Job/Resume/website` 打开终端：

```powershell
npm run check
npm run build
git status --short
# 仅暂存本次想发布的文件；以下为更新文字内容的示例。
git add content.json
git commit -m "docs: revise homepage content"
git push origin master
```

推送成功后，GitHub Actions 和 Cloudflare Pages 分别自动构建同一个提交。两边完成时间可能不同；修改后只保存文件或只创建本地提交都不会更新网站。新增组件、图片或简历资产时，把对应文件一起暂存。不要在父目录执行网站发布操作。

## 部署设置

两边共用 `package-lock.json`、`.node-version` 和 `package.json` 中的检查与构建命令。

| 项目 | GitHub Pages | Cloudflare Pages |
| --- | --- | --- |
| 源码 | 本仓库 `master` | 本仓库 `master` |
| 构建根目录 | 仓库根目录 | 仓库根目录 |
| Node | `.node-version` | `.node-version` |
| 安装与构建 | `npm ci`，`npm run check`，`npm run build` | `npm ci && npm run check && npm run build` |
| 输出目录 | `dist` | `dist` |
| 发布入口 | `.github/workflows/deploy.yml` | Cloudflare 原生 Git 集成 |

GitHub 仓库 Settings → Pages 的发布来源应为 GitHub Actions。工作流只在成功构建后部署，使用 GitHub 自动提供的短期令牌；Cloudflare 原生 Git 集成不需要在仓库保存 Cloudflare API Token。Cloudflare 应用仅安装到当前主页仓库。

## 检查和恢复

在 GitHub 的 Actions 页面和 Cloudflare Pages 的 Deployments 页面查看状态，核对两边使用的提交哈希。构建失败时先查看失败日志、修复并重新推送，不上传半成品。恢复旧版应创建新的回退提交再推送，不强制推送、不改写旧历史。Figma 和本地内容的同步仍按原项目约定执行；部署流程不会自动改动设计。

配置与首次线上验证状态记录在父工作区的 `docs/exec-plans/active/website-deployment.md`，完成后移入 `completed/`。该内部计划不上传到公开网站仓库。
