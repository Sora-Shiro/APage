function sortByProperty(property) {
    function sortfun(obj1, obj2) {
        if (obj1[property] > obj2[property]) return -1
        else if (obj1[property] < obj2[property]) return 1
        else if (obj1[property] == obj2[property]) return 0
    }
    return sortfun;
}

function PostList() {
    this.initialize.apply(this, arguments);
}

PostList.prototype = Object.create(Object.prototype);
PostList.prototype.constructor = PostList;

PostList.prototype.initialize = function () {
    this.postList = [];
};

PostList.prototype.pushPost = function (post) {
    this.postList.push(post);
    this.postList.sortByProperty(`rawData`);
}

PostList.prototype.getPostList = function () {
    return this.postList;
}

var $SoraShiroPostList = new PostList();

var containerVue = new Vue({
    el: '#container',
    components: {

    },
    data: {
        tempPosts: [],
        rawPosts: [],
    },
    computed: {
        
    },
    mounted() {
        this.init();
    },
    methods: {
        init: function () {
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
        getBlogs: function (data) {
            var vm = this;
            axios.get(data.url)
                .then(function (response) {
                    var blogs = response.data;
                    blogs.forEach(blog => {
                        var blogData = {};
                        var tempStr = blog.name;
                        var processStrs = tempStr.split(`__`);
                        blogData.title = processStrs[0];
                        blogData.links = blog.html_url;
                        blogData.rawDate = processStrs[1] + processStrs[2].substring(0, 4);
                        blogData.rawDate = Number(blogData.rawDate);
                        blogData.date = processStrs[1].substring(0, 4)
                            + `/` + processStrs[1].substring(4, 6)
                            + `/` + processStrs[1].substring(6) + `  `
                            + processStrs[2].substring(0, 2);
                        blogData.date += `:` + processStrs[2].substring(2, 4);
                        vm.rawPosts.push(blogData);
                        vm.rawPosts.sort(sortByProperty(`rawDate`));
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },

});

