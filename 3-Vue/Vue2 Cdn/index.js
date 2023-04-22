var app = new Vue({
    el: '#app',
    data: {
        input: "",
        output: "",
        displayComponent: true
    },
    mounted() {
        // title时钟
        setInterval(() => {
            this.checkVisibility();
        }, 1000);
        // 获取地理位置
        this.getGeolocation();
        // 防止f12
        this.attack_kp();
        // 防止鼠标右键
        this.attack_cm();
        // 鼠标移动
        // document.onmousemove = this.mouseMove;
    },
    methods: {
        trigger() {
            this.displayComponent = !this.displayComponent
        },
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
        },
        // title时钟，当页面在前台可见时
        checkVisibility: function () {
            let vs = document.visibilityState;
            let date = new Date(Date.now());
            if (vs == "visible") {
                document.title =
                    "Hello - " +
                    date.getHours() +
                    ":" +
                    date.getMinutes() +
                    ":" +
                    date.getSeconds();
            }
        },
        // 获取鼠标位置
        mouseMove(ev) {
            ev = ev || window.event;
            var mousePos = this.mouseCoords(ev);
            //获取当前的x,y坐标=>获取当前位置的元素
            let ele = document.elementFromPoint(mousePos.x, mousePos.y);
            console.log(ele);
        },
        mouseCoords(ev) {
            //鼠标移动的位置
            if (ev.pageX || ev.pageY) {
                return { x: ev.pageX, y: ev.pageY };
            }
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop,
            };
        },
        // 地理位置
        getGeolocation() {
            navigator.geolocation.getCurrentPosition(this.sendNotification);
        },
        sendNotification(position) {
            // get geolocation
            let latitude =
                position.coords.latitude > 0
                    ? position.coords.latitude + " N"
                    : position.coords.latitude + " S";
            let longitude =
                position.coords.longitude > 0
                    ? position.coords.longitude + " E"
                    : position.coords.longitude + " W";
            // Notification
            var n = new Notification("你当前所在位置为", {
                body: `${latitude},${longitude}`,
                tag: "backup",
                requireInteraction: false,
                data: {
                    loc: `${latitude},${longitude}`,
                },
            });
            n.onclick = function () {
                n.close();
            };
        },
        // 防止鼠标右键
        attack_cm() {
            document.oncontextmenu = function (e) {
                e.preventDefault();
                alert("prevent right click");
            }
        },
        // 防止f12
        attack_kp() {
            document.addEventListener("keydown", (e) => {
                if (e.key == "F12") {
                    window.event.returnValue = false;
                    alert("prevent F12")
                }
            })
        },
    }
})