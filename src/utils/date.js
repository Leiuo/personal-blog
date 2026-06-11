/**
 * 时区安全的日期工具函数
 *
 * 问题背景：new Date("YYYY-MM-DD") 在 JS 中会被解析为 UTC 午夜，
 * 而 .getDate()/getMonth()/getFullYear() 返回本地时区时间。
 * 对于 UTC 负偏移时区（UTC-5、UTC-8 等），日期会早一天。
 *
 * 解决方案：直接解析字符串中的年/月/日部分，完全绕过 Date 的时区转换。
 */

/**
 * 将 YYYY-MM-DD 字符串解析为本地日期的 Date 对象
 * 使用 new Date(year, month-1, day) —— JS 会将其视为本地午夜
 */
export function parseLocalDate(dateStr) {
    if (!dateStr) return null
    const parts = dateStr.split('-')
    if (parts.length !== 3) return null
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const day = parseInt(parts[2], 10)
    return new Date(year, month, day)
}

/**
 * 格式化日期为 YYYY-MM-DD（时区安全）
 */
export function formatDate(dateStr) {
    if (!dateStr) return ''
    const parts = dateStr.split('-')
    if (parts.length !== 3) return dateStr
    return `${parts[0]}-${String(parseInt(parts[1], 10)).padStart(2, '0')}-${String(parseInt(parts[2], 10)).padStart(2, '0')}`
}

/**
 * 格式化日期，7 天内显示相对时间（今天/昨天/N天前），超出显示 YYYY-MM-DD
 */
export function formatDateRelative(dateStr) {
    if (!dateStr) return '暂无日期'

    const parsed = parseLocalDate(dateStr)
    if (!parsed) return dateStr

    const today = new Date()
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const diffTime = todayLocal - parsed
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays <= 7) return `${diffDays}天前`

    return formatDate(dateStr)
}

/**
 * 比较两个 YYYY-MM-DD 日期字符串（用于排序）
 * 返回负数表示 a < b，正数表示 a > b，0 表示相等
 */
export function compareDates(a, b) {
    if (!a && !b) return 0
    if (!a) return 1
    if (!b) return -1
    return a.localeCompare(b)
}

/**
 * 从 YYYY-MM-DD 字符串中安全提取年份
 */
export function getDateYear(dateStr) {
    if (!dateStr) return null
    const parts = dateStr.split('-')
    return parts.length === 3 ? parseInt(parts[0], 10) : null
}
