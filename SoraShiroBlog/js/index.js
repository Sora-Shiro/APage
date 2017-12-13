var PostPreviewChild = {
    template: 
    '<div class="post-preview">'+
    '<a href="{{ links }}">'+
      '<h2 class="post-title">'+
        '{{ title }}'+
      '</h2>'+
      '<h3 class="post-subtitle">'+
        '{{ subTitle }}'+
      '</h3>'+
    '</a>'+
    '<p class="post-meta">由'+
      '<a href="#"> Sora Shiro </a>'+
      '发布于 {{ date }}</p>'+
    '<hr>'+
    '</div>',
    props: ['links', 'title', 'subTitle', 'date'],
}

var containerVue = new Vue({
    el: '#container',
    components: {
        'post-preview': PostPreviewChild,
    },
    data: {
        posts: [
            {
                id: 1,
                links: 'post.html',
                title: '安卓面试',
                subTitle: '这是采自……',
                date: '2017/12/13',
            },
            {
                id: 2,
                links: 'post.html',
                title: 'Java 算法题选',
                subTitle: '这是',
                date: '2017/12/13',
            }
        ]
    },
    methods: {

    },
    computed: {

    }
});

