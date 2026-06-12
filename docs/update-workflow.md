# 更新网站内容工作流

> 日常修改内容 → 提交 GitHub → Cloudflare Pages 自动部署

---

## 一、标准更新流程

```bash
# 1. 确保在 master 分支
git checkout master

# 2. 修改代码后查看变更
git status

# 3. 暂存所有改动
git add .

# 4. 提交（使用 Conventional Commits 格式）
git commit -m "类型: 简短描述" -m "- 详细改动 1
- 详细改动 2
- 详细改动 3"

# 5. 推送到 GitHub
git push origin master
```

### Commit 类型参考

| 类型 | 适用场景 | 示例 |
|------|---------|------|
| `feat` | 新功能 | `feat: add contact form section` |
| `fix` | 修复 | `fix: fix nav link active state on mobile` |
| `style` | 样式调整 | `style: adjust hero section gradient` |
| `refactor` | 代码重构 | `refactor: extract card tilt logic` |
| `content` | 内容更新 | `content: update project descriptions` |
| `i18n` | 翻译更新 | `i18n: add new service descriptions to zh-CN` |
| `chore` | 配置/依赖 | `chore: update Nuxt to 4.0.1` |

---

## 二、自动部署

代码推送到 GitHub 后，Cloudflare Pages 会自动：

```
git push origin master
        ↓
Cloudflare 检测到变更
        ↓
自动拉取最新代码
        ↓
npm run generate（构建）
        ↓
部署到全球边缘节点
        ↓
生效（通常 1~3 分钟）
```

> 部署进度可在 Cloudflare Dashboard → Pages → 项目 → **Deployments** 实时查看。

---

## 三、常用修改场景

### 修改文本内容

编辑 `i18n/locales/` 下的 JSON 文件：

| 文件 | 语言 |
|------|------|
| `i18n/locales/en.json` | 英文 |
| `i18n/locales/zh-CN.json` | 中文 |

```json
// en.json — 示例
{
  "hero": {
    "title": "Crafting Digital Experiences",
    "subtitle": "Design & Development"
  },
  "nav": {
    "home": "Home",
    "services": "Services",
    "works": "Works"
  }
}
```

### 修改页面结构

编辑 `pages/index.vue` 和 `components/` 下的 Vue 组件。

### 修改样式

- Tailwind 配置：`tailwind.config.ts`
- 全局样式：`assets/css/main.css`
- 组件样式：各 `.vue` 文件的 `<style>` 块

### 新增页面/组件

```
components/
├── NewSection.vue        # 新增组件
pages/
├── index.vue             # 主页
├── about.vue             # 新增页面（需在导航栏添加链接）
```

---

## 四、常用命令

```bash
npm run dev        # 本地开发 → http://localhost:3000
npm run generate   # 本地构建（模拟部署输出）
npm run preview    # 预览构建结果
```

---

## 五、部署状态检查

| 方法 | 操作 |
|------|------|
| Cloudflare Dashboard | Pages → 项目 → Deployments，查看最新部署状态 |
| 访问网站 | `www.zhaoxiaoyang.top` 确认内容已更新 |
| 本地预览 | `npm run build && npm run preview` 先本地确认 |

---

## 六、回滚

如果新部署有问题：

```
Cloudflare Dashboard → Pages → 项目 → Deployments
→ 找到上一个正常版本 → 点击 ⋮ → Rollback to this deployment
```

快速回滚，无需重新提交代码。

---

## 七、完整案例

```powershell
# 修改中文首页标题后
git add .
git commit -m "content: update hero title" -m "- 修改中文首页主标题文案"
git push origin master
# → Cloudflare 自动部署，约 2 分钟后生效
```
