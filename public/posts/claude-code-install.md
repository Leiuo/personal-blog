# Claude Code 安装和使用

## 使用官方脚本安装

**macOS、Linux、WSL:**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows Powershell:**

```bash
irm https://claude.ai/install.psl | iex
```

**Windows CMD:**

```bash
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

**安装完成后，验证是否安装成功：**

```bash
claude --version
```

## 使用 Winget 安装（无需访问 Claude.ai，推荐）

```bash
winget install Anthropic.ClaudeCode
```

**安装完成后，验证是否安装成功：**

```bash
claude --version
```

## 使用 npm 安装

**第一步：先安装 node.js**

**第二步：全局安装 Claude Code**

```bash
npm install -g @anthropic.ai/claude-code
```

**第三步：验证是否安装成功**

```bash
claude --version
```

## Claude Code 接入 DeepSeek V4-Pro 模型

<!-- 在C:\Users\93045\\.claude创建settings.json：

```json
{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "your-keys",
        "ANTHROPIC_BASE_URL": "https://api.siliconflow.cn",
        "ANTHROPIC_MODEL": "your-model"
    }
}
``` -->

**1. 安装 CC Switch：**

`在 github 搜索 CC Switch 安装包，将其安装在你的电脑上`

**2. DeepSeek API 充值：**

`进入 DeepSeek 官网，选择 API 开放平台 -> 充值，选择支付方式，建议先小额支付一笔试试，后面再根据需求购买`

**3. 获取密钥：**

`选择 API 开放平台 -> API keys，创建一个 API key，名称自取，把密钥复制下来`

**4. 复制密钥：**

`来到 CC Switch，点击右上角加号，打开“添加新供应商”界面，选择 DeepSeek 模型，把复制的密钥粘贴到 API key 中`

**5. 更改模型名并添加：**

`CC Switch 添加新供应商界面往下滑，参考下表填写：（后面加 [1m] 是为了开启 1M 上下文）`

| 主模型 | Haiku 默认模型 | sunnet 默认模型 | Opus 默认模型 |
| ----- | -------------- | -------------- | ------------ |
| deepseek-v4-pro[1m] | deepseek-v4-flash | deepseek-v4-pro[1m] | deepseek-v4-pro[1m] |

`最后点击右下角的添加按钮，再点击启动`

至此你的 Claude Code 就成功接入了 DeepSeek V4-Pro 模型！