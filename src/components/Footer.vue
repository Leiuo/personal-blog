<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>关于博客</h4>
                <p>分享技术，记录生活，成长路上与你同行。</p>
            </div>

            <div class="footer-section">
                <h4>快速链接</h4>
                <ul>
                    <li><router-link to="/">首页</router-link></li>
                    <li><router-link to="/archives">归档</router-link></li>
                    <li><router-link to="/about">关于</router-link></li>
                </ul>
            </div>

            <div class="footer-section">
                <h4>关注我</h4>
                <div class="social-links">
                    <a href="https://github.com/Leiuo">GitHub</a>
                    <a href="https://wx.mail.qq.com/home/index">QQ邮箱</a>
                    <a href="https://www.zhihu.com/people/meng-shen-xiao-xue-sheng-90">知乎</a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; {{ currentYear }} 个人博客. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.footer {
    background: var(--bg-secondary);
    color: var(--text-primary);
    margin-top: 60px;
    border-top: 1px solid var(--border-color);
    transition: background-color var(--transition-normal), color var(--transition-normal);

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;

        .footer-section {
            h4 {
                margin-bottom: 15px;
                color: var(--accent-color);
            }

            p {
                color: var(--text-secondary);
                line-height: 1.6;
            }

            ul {
                list-style: none;
                padding: 0;

                li {
                    margin: 8px 0;

                    a {
                        color: var(--text-secondary);
                        text-decoration: none;
                        transition: color var(--transition-fast);

                        &:hover {
                            color: var(--accent-color);
                        }
                    }
                }
            }

            .social-links {
                display: flex;
                gap: 15px;

                a {
                    color: var(--text-secondary);
                    text-decoration: none;
                    transition: color var(--transition-fast);

                    &:hover {
                        color: var(--accent-color);
                    }
                }
            }
        }
    }

    .footer-bottom {
        text-align: center;
        padding: 20px;
        background: var(--bg-primary);
        font-size: 14px;
        color: var(--text-muted);
    }
}
</style>