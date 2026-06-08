# CareerCompass

> 借助 AI 驱动的工作匹配、智能工具和全面的数据分析，为您的职业旅程导航。

<p align="center">
  <img src="../images/CareerCompass-logo.png" alt="CareerCompass Logo" width="150" style="background-color: white; padding: 20px; border-radius: 10px;" />
</p>



<p align="center">
  <strong>面向求职者与雇主的 AI 驱动职业平台</strong>
</p>


<p align="center">
  <a href="https://careercompassai.vercel.app/">在线演示</a> •
  <a href="https://github.com/arsh342/careercompass">代码仓库</a> •
  <a href="mailto:arsth134@gmail.com">联系我们</a>
</p>


---

## 概览

CareerCompass 是一个双端 AI 平台，彻底改变了雇主与求职者之间的连接方式。平台基于 **Google Gemini AI** 和 **Genkit 框架**构建，为整个招聘流程提供智能匹配、全面分析和自动化工作流。

### 核心亮点

- **17 个 AI 流程** — 覆盖整个职业旅程的全面 AI 功能
- **67 个 UI 组件** — 丰富、现代且带有动画效果的组件库
- **双端平台** — 为求职者和雇主提供无缝体验
- **实时分析** — 带有可操作洞察的实时仪表盘
- **ATS 优化** — 帮助候选人通过申请人追踪系统筛选
- **邮件自动化** — 自动通知与状态更新

---

## 功能特性

### 求职者端

| 功能                | 描述                               |
| ------------------- | ---------------------------------- |
| **AI 工作匹配**     | 基于技能和偏好的个性化推荐         |
| **简历生成器**      | AI 驱动的简历创建与优化            |
| **ATS 评分分析**    | 针对申请人追踪系统优化简历         |
| **求职信生成器**    | 为每个申请生成量身定制的求职信     |
| **面试准备**        | 根据职位要求自动生成练习问题       |
| **LinkedIn 优化器** | 改进您的 LinkedIn 个人资料建议     |
| **技能差距分析**    | 识别目标职位所需但您尚未掌握的技能 |
| **薪资谈判**        | 市场洞察与谈判策略                 |
| **申请跟踪**        | 一站式监控所有申请状态             |
| **AI 聊天助手**     | 交互式职业指导与支持               |

### 雇主端

| 功能              | 描述                       |
| ----------------- | -------------------------- |
| **AI 候选人排名** | 按岗位匹配度自动评分       |
| **智能职位发布**  | AI 增强的职位描述          |
| **候选人发现**    | 主动寻找合格候选人         |
| **招聘分析**      | 带有招聘指标和洞察的仪表盘 |
| **看板视图**      | 可视化候选人流程管理       |
| **批量邀约**      | 邀请多位候选人申请         |
| **邮件自动化**    | 自动状态更新与沟通         |
| **团队协作**      | 多用户候选人评估           |

---

## AI 流程

CareerCompass 包含 17 个由 Google Gemini 驱动的专业 AI 流程：

| 流程                            | 用途                       |
| ------------------------------- | -------------------------- |
| `findAndRankCandidates`         | 智能候选人评分与排名       |
| `findMatchingCandidates`        | 发现匹配职位要求的候选人   |
| `parseResume`                   | 从简历中提取结构化数据     |
| `enhanceText`                   | 优化简历和职位描述         |
| `generateResume`                | AI 驱动的简历创建          |
| `generateCoverLetter`           | 量身定制的求职信生成       |
| `generateProfileSummary`        | 创建引人注目的个人摘要     |
| `interviewPrep`                 | 生成针对特定职位的面试问题 |
| `jobMatch`                      | 语义级职位-候选人匹配      |
| `skillGap`                      | 识别目标职位所需技能       |
| `salaryNegotiation`             | 薪资洞察与策略             |
| `linkedinOptimizer`             | LinkedIn 个人资料改进建议  |
| `analyzeOpportunityDescription` | 增强的职位发布分析         |
| `sendApplicationStatusEmail`    | 自动申请状态更新           |
| `sendWelcomeEmail`              | 入职邮件自动化             |
| `emailTemplates`                | 动态邮件模板生成           |

---

## 技术栈

### 核心技术

| 技术             | 版本   | 用途                        |
| ---------------- | ------ | --------------------------- |
| **Next.js**      | 15.3.6 | 带 App Router 的 React 框架 |
| **React**        | 18.x   | UI 组件库                   |
| **TypeScript**   | 5.x    | 类型安全开发                |
| **Tailwind CSS** | 3.4.1  | 原子化 CSS 样式             |

### AI 与后端

| 技术                   | 用途              |
| ---------------------- | ----------------- |
| **Genkit**             | AI 流程编排框架   |
| **Gemini Pro/Flash**   | Google 大语言模型 |
| **Firebase Firestore** | 实时 NoSQL 数据库 |
| **Firebase Auth**      | Google OAuth 认证 |
| **Cloudinary**         | 图片存储与优化    |
| **Brevo**              | 事务邮件服务      |
| **Stripe**             | 支付处理          |

### UI 库

| 库                | 用途           |
| ----------------- | -------------- |
| **Radix UI**      | 无障碍组件基元 |
| **Framer Motion** | 动画与过渡效果 |
| **GSAP**          | 高级动画       |
| **Recharts**      | 数据可视化     |
| **Lucide React**  | 图标库         |

---

## 项目结构

```
careercompass/
├── src/
│   ├── ai/                          # AI 引擎
│   │   ├── genkit.ts                # Genkit 配置
│   │   ├── dev.ts                   # 开发服务器
│   │   └── flows/                   # 17 个 AI 流程实现
│   │       ├── find-and-rank-candidates.ts
│   │       ├── generate-resume.ts
│   │       ├── interview-prep.ts
│   │       └── ...
│   │
│   ├── app/                         # Next.js App Router
│   │   ├── (app)/                   # 需认证的路由
│   │   │   ├── ai-tools/            # AI 工具套件
│   │   │   │   ├── cover-letter/
│   │   │   │   ├── interview-prep/
│   │   │   │   ├── linkedin/
│   │   │   │   ├── resume-builder/
│   │   │   │   ├── salary/
│   │   │   │   └── skill-gap/
│   │   │   ├── analytics/           # 分析仪表盘
│   │   │   ├── applications/        # 申请管理
│   │   │   ├── chat/                # AI 聊天助手
│   │   │   ├── dashboard/           # 用户仪表盘
│   │   │   ├── employer/            # 雇主路由
│   │   │   ├── inbox/               # 消息
│   │   │   ├── opportunities/       # 职位列表
│   │   │   ├── profile/             # 用户资料
│   │   │   └── saved/               # 已保存的职位
│   │   ├── (auth)/                  # 认证路由
│   │   └── api/                     # API 端点
│   │
│   ├── components/                  # React 组件
│   │   └── ui/                      # 67 个 UI 组件
│   │       ├── chat-interface.tsx
│   │       ├── kanban.tsx
│   │       ├── opportunity-card.tsx
│   │       └── ...
│   │
│   ├── context/                     # React Context
│   ├── hooks/                       # 自定义 Hooks
│   └── lib/                         # 工具函数
│
├── docs/                            # 文档
│   ├── blueprint.md
│   └── logo.png
│
└── 配置文件
```

---

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn
- Git

### 快速上手

1. **克隆仓库**

   ```bash
   git clone https://github.com/arsh342/careercompass.git
   cd careercompass
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **启动开发服务器**

   ```bash
   npm run dev
   ```

4. **在浏览器中打开**

   ```
   http://localhost:9002
   ```

### 可用脚本

| 脚本                   | 描述                          |
| ---------------------- | ----------------------------- |
| `npm run dev`          | 使用 Turbopack 启动开发服务器 |
| `npm run build`        | 构建生产版本                  |
| `npm run start`        | 启动生产服务器                |
| `npm run lint`         | 运行 ESLint                   |
| `npm run typecheck`    | 运行 TypeScript 类型检查      |
| `npm run genkit:dev`   | 启动 Genkit AI 开发服务器     |
| `npm run genkit:watch` | 启动 Genkit 热重载            |

### 环境变量

创建 `.env.local` 文件：

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google AI
GOOGLE_GENAI_API_KEY=

# Brevo 邮件
BREVO_API_KEY=
BREVO_SMTP_HOST=
BREVO_SMTP_PORT=
BREVO_SMTP_USER=
BREVO_SMTP_PASS=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## 部署

CareerCompass 部署在 **Vercel** 上，配置如下：

- **框架**: Next.js
- **Node 版本**: 18.x
- **构建命令**: `npm run build`
- **输出目录**: `.next`

### Firebase App Hosting

`apphosting.yaml` 中的配置：

```yaml
runConfig:
  cpu: 1
  memoryMiB: 512
  concurrency: 80
```

---

## 性能

- **Lighthouse 评分**: 95+
- **Core Web Vitals**: 已优化
- **打包体积**: 通过 tree-shaking 最小化
- **图片**: 通过 Cloudinary 优化

---

## 许可证

本项目采用 **MIT 许可证**。详见 [LICENSE](LICENSE)。

---

## 作者

**Arsh Singh**

- [LinkedIn](https://www.linkedin.com/in/arshsingh342/)
- [Email](mailto:arsth134@gmail.com)
- [GitHub](https://github.com/arsh342)

---

## 致谢

- 基于 [Next.js](https://nextjs.org/) 构建
- AI 由 [Google Gemini](https://ai.google.dev/) 驱动
- AI 编排由 [Genkit](https://firebase.google.com/docs/genkit) 提供
- 部署于 [Vercel](https://vercel.com/)