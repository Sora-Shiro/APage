var containerVue = new Vue({
    el: '#container',
    components: {

    },
    data: {
        tempPosts: [],
        posts: [
            {
                id: 1,
                links: 'post.html',
                title: '安卓面试',
                date: '2017/12/13',
            },
            {
                id: 2,
                links: 'post.html',
                title: 'Java 算法题选',
                date: '2017/12/13',
            }
        ]
    },
    mounted() {
        this.init();
    },
    methods: {
        init: function() {
            var vm = this;
            axios.get('https://api.github.com/repos/Sora-Shiro/APage/contents/SoraShiroBlog/blog/')
                .then(function (response) {
                    var blogDirectories = response.data;
                    var directories = [];
                    blogDirectories.forEach(directory => {
                        var data = {};
                        data.name = directory.name;
                        data.url = directory.url;
                        vm.getBlogs(data);
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getBlogs: function(data) {
            var vm = this;
            axios.get(data.url)
                .then(function (response) {
                    var blogs = response.data;
                    blogs.forEach(blog => {
                        var blogData = {};
                        var tempStr = blog.name;
                        var processStrs = tempStr.split('__');
                        blogData.title = processStrs[0];
                        blogData.links = blog.html_url;
                        console.log(processStrs);
                        blogData.date = processStrs[1].substring(0, 4) 
                        + `/` + processStrs[1].substring(4, 6)
                        + '/' + processStrs[1].substring(6) + '  '
                        + String(processStrs[2].substring(0, 2)) +
                        + ':' + String(processStrs[2].substring(2));
                        vm.posts.push(blogData);
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    computed: {

    }
});

