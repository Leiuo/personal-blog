<template>
    <div class="about-page">
        <div class="about-header">
            <h1>关于我</h1>
            <p>了解博主的故事</p>
        </div>

        <div class="about-content">
            <div class="profile-section">
                <div class="avatar">
                    <img src="https://picsum.photos/200/200?random=100" alt="头像">
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
                        📧 930452672@qq.com
                    </a>
                    <a href="https://github.com/Leiuo" target="_blank" class="contact-link">
                        💻 GitHub
                    </a>
                    <a href="https://weixin.qq.com/" target="_blank" class="contact-link">
                        🐦 WeChat
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
                    <li>技术趋势分析</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
// 页面逻辑可以在这里添加
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
            color: #333;
            margin-bottom: 10px;
        }

        p {
            color: #666;
            font-size: 18px;
        }
    }

    .about-content {
        background: white;
        border-radius: 12px;
        padding: 40px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .profile-section {
            text-align: center;
            margin-bottom: 40px;

            .avatar {
                width: 150px;
                height: 150px;
                margin: 0 auto 20px;
                border-radius: 50%;
                overflow: hidden;
                border: 3px solid #4CAF50;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            h2 {
                color: #333;
                margin-bottom: 15px;
            }

            p {
                color: #666;
                line-height: 1.6;
            }
        }

        .info-section {
            margin-bottom: 30px;

            h3 {
                color: #333;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid #4CAF50;
                display: inline-block;
            }

            .skills {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;

                .skill-tag {
                    background: #f0f0f0;
                    padding: 6px 15px;
                    border-radius: 20px;
                    font-size: 14px;
                    color: #333;
                    transition: all 0.3s;

                    &:hover {
                        background: #4CAF50;
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
                    color: #4CAF50;
                    text-decoration: none;
                    font-size: 16px;
                    transition: transform 0.3s;

                    &:hover {
                        transform: translateX(5px);
                    }
                }
            }

            ul {
                padding-left: 20px;
                color: #666;

                li {
                    margin: 8px 0;
                }
            }
        }
    }
}
</style>