/**
 * Created by rkg on 2014/12/9.
 */
 
JSON保存格式：
插件高度： height
插件宽度： width
简介 ： des 
图片链接： link
图片源地址 ： url
新闻列表 ： news: [{
新闻标题          title : '萨达姆参加APEC会议遭遇恐怖分子袭击',    
新闻链接          link  : 'www.cctv.com'
                   }, {
                        title : '张碧晨获得中国好声音决赛冠军力压全场',
                        link  : 'www.voiceofchina.com'
                   }]
图片列表： imgs: [{
图片标题：       url : 'www.artnchina.com/static/23643092859081436ET095D',
图片名称：       name: '周杰伦',
图片链接：       link: 'www.cflac.com'
                  },{
                       url : 'www.artnchina.com/static/237dhshd8143RFGE5665645',
                       name: '蔡依林'
                       link: 'www.cflas.com'
                  }]

 
 例子：
单张图片：
view = {
    height: "200",
    url: "www.baidu.com",
    link: "",
    width: "200"
}

图文混排：
view = {
    height: 481.74545459747316,
    link: "123",   //超链接
    percent: "80",
    url: "123",  //源文件地址
    width: 984.1818182468414,
    news: [{
        link: "www.baidu.com",
        title: "11"
    },{
        link: "www.souhu.com",
        title: "11"
    },{
        link: "www.google.com",
        title: "11"
    }]
}

图片组件：
view = {
    width: 100,
    height: 100,
    imgs: [{
        url : 'www.artnchina.com/static/23643092859081436ET095D',
        link: 'www.google.com'
    },{
        url : 'www.artnchina.com/static/23643092859081436ET095D',
        link: 'www.google.com'
    }]
}

