class GoCache {
    constructor() {
        this.cache = {}
    }

    get(key) {
        return this.cache[key]
    }

    set(key, val) {
        this.cache[key] = val
    }
}

module.exports = new GoCache()