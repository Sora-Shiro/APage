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
                        blogData.title = blog.name;
                        blogData.subTitle = blog.name + 'test';
                        blogData.links = blog.html_url;
                        blogData.date = '2017/12/13';
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

