/**
 * Created by kyle on 2016/3/3.
 */
module.exports = {
    domain: 'https://www.zhihu.com',
    loginUrl: '/login/email',
    loginData: {
        email: '350932784@qq.com',
        password: 'q372563572',
        remember_me: true
    },
    entryUrl:'/explore',
    requestHeader: {
        'Host': 'www.zhihu.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.',
        'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.7,pt-BR;q=0.5,en;q=0.3,es-MX;q=0.2',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://www.zhihu.com/',
        'Connection': 'keep-alive'
    },
    //最小关注数
    mixFollowers:1000
}
;