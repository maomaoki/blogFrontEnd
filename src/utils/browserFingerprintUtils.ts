/**
 * 获取 浏览器 指纹
 */
//@ts-nocheck
function getBrowserFingerprint() {
    const userAgent = navigator.userAgent;
    let browserName = '未知浏览器';
    let browserVersion = '未知版本';
    let os = '未知系统';

    // 匹配 Chrome
    if (/Chrome\/([\d.]+)/.test(userAgent)) {
        browserName = 'Chrome';
        browserVersion = userAgent.match(/Chrome\/([\d.]+)/)[1];
    }
    // 匹配 Firefox
    else if (/Firefox\/([\d.]+)/.test(userAgent)) {
        browserName = 'Firefox';
        browserVersion = userAgent.match(/Firefox\/([\d.]+)/)[1];
    }
    // 匹配 Safari
    else if (/Safari\/([\d.]+)/.test(userAgent) && !/Chrome/.test(userAgent)) {
        browserName = 'Safari';
        browserVersion = userAgent.match(/Version\/([\d.]+)/)[1];
    }
    // 匹配 Internet Explorer
    else if (/MSIE ([\d.]+)/.test(userAgent) || /Trident\/.*rv:([\d.]+)/.test(userAgent)) {
        browserName = 'Internet Explorer';
        if (/MSIE ([\d.]+)/.test(userAgent)) {
            browserVersion = userAgent.match(/MSIE ([\d.]+)/)[1];
        } else {
            browserVersion = userAgent.match(/Trident\/.*rv:([\d.]+)/)[1];
        }
    }
    // 匹配 Edge（旧版）
    else if (/Edge\/([\d.]+)/.test(userAgent)) {
        browserName = 'Edge（旧版）';
        browserVersion = userAgent.match(/Edge\/([\d.]+)/)[1];
    }
    // 匹配 Edge（Chromium 版）
    else if (/Edg\/([\d.]+)/.test(userAgent)) {
        browserName = 'Edge（Chromium 版）';
        browserVersion = userAgent.match(/Edg\/([\d.]+)/)[1];
    }

    // 匹配操作系统信息
    if (/Windows NT 10.0/.test(userAgent)) {
        os = 'Windows 10';
    } else if (/Windows NT 6.3/.test(userAgent)) {
        os = 'Windows 8.1';
    } else if (/Windows NT 6.2/.test(userAgent)) {
        os = 'Windows 8';
    } else if (/Windows NT 6.1/.test(userAgent)) {
        os = 'Windows 7';
    } else if (/Windows NT 6.0/.test(userAgent)) {
        os = 'Windows Vista';
    } else if (/Windows NT 5.1/.test(userAgent)) {
        os = 'Windows XP';
    } else if (/Mac OS X/.test(userAgent)) {
        os = 'macOS';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
        os = 'iOS';
    }

    return {
        name: browserName,
        version: browserVersion,
        os: os
    };
}

export default getBrowserFingerprint;