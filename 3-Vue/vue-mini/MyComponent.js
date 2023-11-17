const axiosInstance = axios.create()

export default {
    props: {
        msg: Boolean
    },
    watch: {
        msg(newVal, oldVal) {
            this.display = newVal //newVal即是msg
            this.display ? this.post() : null
        },
    },
    mounted() {
        this.display ? this.post() : null
    },
    data() {
        return {
            display: false,
            message: ""
        }
    },
    methods: {
        post() {
            axiosInstance.post("/api/", { key: "xxvalue" })
                .then((response) => {
                    console.log(response);
                }).catch((err) => {
                    console.log(err);
                }).finally(
                    this.message = `sub component display is ${this.display}`
                )
        },
    },
    template:
        `
<section v-show="display">
    <div>{{message}}</div>
</section>
`
}