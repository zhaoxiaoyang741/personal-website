# Cloudflare Pages 部署 & 自定义域名解析指南

> 适用场景：Nuxt 3 SPA（`ssr: false`）+ 自定义域名接入 Cloudflare
> 域名：`zhaoxiaoyang.top`（示例）

---

## 整体架构

```
用户访问
    ↓
www.zhaoxiaoyang.top
    ↓
Cloudflare 边缘节点（代理 🔸 开启）
    ↓
Cloudflare Pages（personal-website-c79.pages.dev）
    ↓
Nuxt 3 SPA（/ → /zh-CN 通过 i18n 路由跳转）
```

---

## 一、项目构建

```bash
npm run generate     # 输出 dist/ 目录
```

| 配置 | 值 |
|------|-----|
| 构建命令 | `npm run generate` |
| 输出目录 | `dist/` |
| Node.js 版本 | 22 |

### SPA Fallback

SPA 路由（如 `/zh-CN/works`）直接访问会 404，需要 fallback。两种方式：

**方式一：项目根目录新建 `_redirects` 文件**
```_redirects
/*    /index.html    200
```

**方式二：Cloudflare Pages 设置中开启**
```
Pages → 项目 → Settings → Routing → SPA Mode → 开启
```

二选一即可。

---

## 二、Cloudflare Pages 部署

```
Cloudflare Dashboard → Pages → Create a Pages project
→ Connect to Git → 选择仓库
→ 构建命令: npm run generate
→ 输出目录: dist/
→ 保存并部署
```

部署完成后会分配一个 `*.pages.dev` 域名，例如：
```
https://personal-website-c79.pages.dev
```

---

## 三、自定义域名绑定（关键！）

### 需要在两个地方配置，缺一不可：

#### 1️⃣ DNS 记录（Cloudflare DNS 页面）

| 类型 | 名称 | 目标 | 代理状态 |
|------|------|------|---------|
| CNAME | `www` | `personal-website-c79.pages.dev` | 🔸 **Proxied（橙色云）** |
| CNAME | `@` | `personal-website-c79.pages.dev` | 🔸 **Proxied（橙色云）** |

> ⚠️ **重要**：
> - **Must be Proxied（橙色云）** — 灰色云（DNS only）会导致 Error 1016
> - CNAME 目标**不能带路径**（如 `/zh-cn`），DNS 不识别路径

#### 2️⃣ Pages Custom Domains（Cloudflare Pages 页面）

```
Pages → 项目 → Custom domains
→ Add custom domain
→ 输入 www.zhaoxiaoyang.top
→ 同样方式添加 zhaoxiaoyang.top
```

> ⚠️ **容易遗漏的步骤**：DNS 记录只是"指路"，Pages 的 Custom domains 才是"开门"，**两个都要配**。

添加后 Cloudflare 会自动颁发 SSL 证书（几分钟）。

---

## 四、DNS 迁移（从阿里云迁到 Cloudflare）

### 修改 DNS 服务器（注册商层面）

```
阿里云控制台 → 域名管理 → 选择域名 → 修改 DNS 服务器
→ 替换为 Cloudflare 分配的 NS 地址（如 boyd.ns.cloudflare.com / karina.ns.cloudflare.com）
→ 删除原有的阿里云 DNS（如 dns3.hichina.com / dns4.hichina.com）
→ 保存
```

### 迁移现有记录

> ⚠️ **换 NS 后，阿里云上所有 DNS 记录立即失效**，必须在 Cloudflare DNS 中重建。

常见需要迁移的记录类型：

| 类型 | 说明 | 代理状态 |
|------|------|---------|
| A / CNAME | 网页服务 | 🔸 开启 |
| MX | 邮件服务 | 🔹 **关闭（DNS only）** |
| TXT | SPF / DKIM / DMARC 等验证 | 🔹 关闭 |
| CNAME | mail 等子域名 | 🔹 关闭 |

> **关键原则**：需要走 Cloudflare CDN 加速的（网页）开代理🔸，不需要的（邮件）关代理🔹。

### 切换生效时间

| 步骤 | 时间 |
|------|------|
| 注册商修改 NS | 几分钟 ~ 24h（通常 1h 内） |
| Cloudflare 自动颁发 SSL | 1~5 分钟 |
| Pages 部署 | 2~3 分钟 |
| **总计** | **约 1~2 小时全量生效** |

---

## 五、常见错误排查

### Error 1016 — Origin DNS Error

| 可能原因 | 解决方案 |
|---------|---------|
| CNAME 代理状态为灰色云（DNS only） | 切换为橙色云（Proxied） |
| 未在 Pages Custom domains 中绑定域名 | 去 Pages 页面添加 |
| CNAME 目标带路径（如 `/zh-cn`） | 去掉路径，只保留 `*.pages.dev` |
| DNS 缓存未刷新 | 等待几分钟，或 `dig www.zhaoxiaoyang.top` 检查 |

### 访问显示白屏 / 路由不生效

- 检查是否配置了 SPA Fallback（`_redirects` 或 SPA Mode）
- i18n 路由 `/zh-CN/` 需要客户端 JS 处理

---

## 六、验证命令

```bash
# 检查 DNS 解析
nslookup www.zhaoxiaoyang.top
dig www.zhaoxiaoyang.top

# 检查 CNAME 目标
dig www.zhaoxiaoyang.top CNAME

# 检查 NS 服务器是否已切换
dig zhaoxiaoyang.top NS
```

---

## 七、关键点速查

| # | 关键点 | 说明 |
|---|--------|------|
| 1 | **改 NS 而非加 NS 记录** | 注册商层面改 DNS 服务器，不是在 DNS 区域里加 NS 记录 |
| 2 | **CNAME 不带路径** | 目标只能是 `xxx.pages.dev`，不能是 `xxx.pages.dev/zh-cn` |
| 3 | **代理必须开启** | Pages 域名必须 Proxied（橙色云） |
| 4 | **DNS 记录 + Pages Custom domains 都要配** | 缺一不可 |
| 5 | **先配 Cloudflare DNS 再改 NS** | 避免空窗期 |
| 6 | **迁移记录不要漏邮件** | MX / TXT / SPF / DKIM 等需在 Cloudflare 重建 |
