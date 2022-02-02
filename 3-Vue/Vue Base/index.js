var app = new Vue({
    el: '#app',
    data: {
        input:"",
        output:""
    },
    methods: {
        get() {
            axios.get("/api/")
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                })
        },
        sendCMD() {
            axios.post("/api/", { key: JSON.stringify(this.input) })
                .then(function (response) {
                    this.output = response.data.result;
                    console.log(this.output);
                }, function (err) {
                    console.log(err);
                })
        }
    }
})