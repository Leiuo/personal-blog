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

## Claude Code 国内访问配置

在C:\Users\93045\\.claude创建settings.json：

```json
{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "your-keys",
        "ANTHROPIC_BASE_URL": "https://api.siliconflow.cn",
        "ANTHROPIC_MODEL": "your-model"
    }
}
```