/**
 * 计算 日期
 */
function calculateDistance(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = now.getMonth() - date.getMonth() + (now.getFullYear() - date.getFullYear()) * 12;
    const diffInYears = now.getFullYear() - date.getFullYear();

    if (diffInSeconds < 60) {
        return `${diffInSeconds} 秒前`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} 分钟前`;
    } else if (diffInHours < 24) {
        return `${diffInHours} 小时前`;
    } else if (diffInDays === 1) {
        return '一天前';
    } else if (diffInDays < 7) {
        return `${diffInDays} 天前`;
    } else if (diffInWeeks === 1) {
        return '一周前';
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks} 周前`;
    } else if (diffInMonths === 1) {
        return '一个月前';
    } else if (diffInMonths < 12) {
        return `${diffInMonths} 个月前`;
    } else if (diffInYears === 1) {
        return '一年前';
    } else {
        return `${diffInYears} 年前`;
    }
}


export default calculateDistance;