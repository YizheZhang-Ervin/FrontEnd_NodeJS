import MyComponent from "./MyComponent.js"

const { createApp } = Vue

const axiosInstance = axios.create()

const app = createApp({
    data() {
        return {
            message: 'Hello Vue!',
            displayComponent: false,
        }
    },
    mounted() {
    },
    methods: {
        trigger() {
            this.get()
        },
        get() {
            axiosInstance.get("/api/")
                .then((response) => {
                    console.log(response);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    this.displayComponent = !this.displayComponent
                    this.message = `call sub component, current display is ${this.displayComponent}`
                })
        },
    }
})
app.component("comp", MyComponent)
app.mount('#app')