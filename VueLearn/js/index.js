new Vue({
    el: '#app',
    data: {
        tArea: 'dynamic',
        message: 'Will change',
        once_message: 'Not change'
    },
    methods: {
        changeMessage: function (event) {
            if(this.tAreaData === undefined || this.tAreaData.length === 0) {
                alert("Cannot be empty!");
            } else {
                this.message = this.tAreaData;
            }
        }
    }
})
