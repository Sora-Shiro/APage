var appSyntax = new Vue({
    el: '#app_syntax',
    data: {
        tArea: 'dynamic',
        tAreaData: '',
        message: 'Will change',
        once_message: 'Not change'
    },
    methods: {
        changeMessage: function (event) {
            if (this.tAreaData.length === 0) {
                alert("Cannot be empty!");
            } else {
                this.message = this.tAreaData;
            }
        }
    },
    computed: {
        reverseMessage: {
            get: function () {
                if (this.message === undefined) {
                    return "";
                } else {
                    return this.message.split('').reverse().join('');
                }
            },
            set: function (val) {
                if (this.message !== undefined) {
                    var reverseBack = val.split('').reverse().join('');
                    this.message = reverseBack;
                }
            }
        }
    }
});

var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        // whenever question changes, this function will run
        question: function (newQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },
    methods: {
        // _.debounce is a function provided by lodash to limit how
        // often a particularly expensive operation can be run.
        // In this case, we want to limit how often we access
        // yesno.wtf/api, waiting until the user has completely
        // finished typing before making the ajax request. To learn
        // more about the _.debounce function (and its cousin
        // _.throttle), visit: https://lodash.com/docs#debounce
        getAnswer: _.debounce(
            function () {
                if (this.question.indexOf('?') === -1) {
                    this.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                this.answer = 'Thinking...'
                var vm = this
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // This is the number of milliseconds we wait for the
            // user to stop typing.
            500
        )
    }
});

var classStyleBind = new Vue({
    el: '#class-style-bind',
    data: {
        isActive: true,
        hasError: false,
        classObject: {
            active: true,
            'text-danger': false
        },
        activeColor: 'red',
        fontSize: 30,
        styleObject: {
            color: 'red',
            fontSize: '13px'
        },
    },
});

var conditionalVue = new Vue({
    el: '#conditional',
    data: {
        conditionalOk: true,
        conditionalNo: false,
        loginType: 'username',
    },
    methods: {
        changeLoginType: function (event) {
            if (this.loginType === 'username') {
                this.loginType = 'email';
            } else {
                this.loginType = 'username';
            }
        },
    }
});

var conditionalVue = new Vue({
    el: '#forList',
    data: {
        parentMessage: 'Parent',
        items: [
            { data: 'Foo' },
            { data: 'Bar' }
        ],
        object: {
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        }
    },
    methods: {

    }
});

var eventVue = new Vue({
    el: '#events',
    data: {
        inputData: '',
    },
    methods: {
        submit: function (event) {
            alert(this.inputData);
        }
    }
});

var formlVue = new Vue({
    el: '#forms',
    data: {
        multiMessage: '',
        checked: true,
        checkedNames: [],
        picked: '',
        selected: '',
        multiSelected: [],
        dynSelected: 'A',
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' }
        ],
        toggle: 'a',
        a: 'a',
        b: 'b',
        pick: '',
    },
    methods: {
        submit: function (event) {
            alert(this.inputData);
        }
    }
});
