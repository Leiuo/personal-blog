<template>
    <div class="about-page">
        <div class="about-header">
            <h1>关于我</h1>
            <p>了解博主的故事</p>
        </div>

        <div class="about-content">
            <div class="profile-section">
                <div class="avatar">
                    <img :src="BASE_URL + 'images/avatar.jpg'" alt="头像">
                </div>
                <h2>博主简介</h2>
                <p>前端开发者，热爱技术和写作，喜欢分享知识和经验。</p>
            </div>

            <div class="info-section">
                <h3>技术栈</h3>
                <div class="skills">
                    <span class="skill-tag">Vue.js</span>
                    <span class="skill-tag">HTML</span>
                    <span class="skill-tag">CSS</span>
                    <span class="skill-tag">Javascript</span>
                    <span class="skill-tag">TypeScript</span>
                    <span class="skill-tag">Webpack</span>
                    <span class="skill-tag">Node.js</span>
                    <span class="skill-tag">Git</span>
                </div>
            </div>

            <div class="info-section">
                <h3>联系方式</h3>
                <div class="contact-links">
                    <a href="https://mail.qq.com" class="contact-link">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        930452672@qq.com
                    </a>
                    <a href="https://github.com/Leiuo" target="_blank" class="contact-link">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        GitHub
                    </a>
                    <a href="https://weixin.qq.com/" target="_blank" class="contact-link">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        WeChat
                    </a>
                </div>
            </div>

            <div class="info-section">
                <h3>关于博客</h3>
                <p>这个博客创建于2026年，主要分享：</p>
                <ul>
                    <li>前端开发技术文章</li>
                    <li>前端学习经验总结</li>
                    <li>个人成长与思考</li>
                    <li>个人生活</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const BASE_URL = import.meta.env.BASE_URL || '/'
</script>

<style lang="scss" scoped>
.about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;

    .about-header {
        text-align: center;
        margin-bottom: 50px;

        h1 {
            font-size: 36px;
            color: var(--text-primary);
            margin-bottom: 10px;
        }

        p {
            color: var(--text-secondary);
            font-size: 18px;
        }
    }

    .about-content {
        background: var(--bg-secondary);
        border-radius: 12px;
        padding: 40px;
        box-shadow: var(--shadow-light);

        .profile-section {
            text-align: center;
            margin-bottom: 40px;

            .avatar {
                width: 150px;
                height: 150px;
                margin: 0 auto 20px;
                border-radius: 50%;
                overflow: hidden;
                border: 3px solid var(--accent-color);

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            h2 {
                color: var(--text-primary);
                margin-bottom: 15px;
            }

            p {
                color: var(--text-secondary);
                line-height: 1.6;
            }
        }

        .info-section {
            margin-bottom: 30px;

            h3 {
                color: var(--text-primary);
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid var(--accent-color);
                display: inline-block;
            }

            .skills {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;

                .skill-tag {
                    background: var(--border-color);
                    padding: 6px 15px;
                    border-radius: 20px;
                    font-size: 14px;
                    color: var(--text-primary);
                    transition: all 0.3s;

                    &:hover {
                        background: var(--accent-color);
                        color: white;
                        transform: translateY(-2px);
                    }
                }
            }

            .contact-links {
                display: flex;
                flex-direction: column;
                gap: 12px;

                .contact-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--accent-color);
                    text-decoration: none;
                    font-size: 16px;
                    transition: transform 0.2s ease;

                    svg {
                        flex-shrink: 0;
                    }

                    &:hover {
                        transform: translateX(4px);
                    }
                }
            }

            ul {
                padding-left: 20px;
                color: var(--text-secondary);

                li {
                    margin: 8px 0;
                }
            }
        }
    }
}
</style>