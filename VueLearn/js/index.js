var appSyntax = new Vue({
    el: '#app_syntax',
    data: {
        tArea: 'dynamic',
        message: 'Will change',
        once_message: 'Not change'
    },
    methods: {
        changeMessage: function (event) {
            if (this.tAreaData === undefined || this.tAreaData.length === 0) {
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
                var reverseBack = val.split('').reverse().join('');
                this.message = reverseBack;
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



