// 存储response，配合service使用
// 适用离线

// 检查给定的 Request 是否是 CacheStorage 对象跟踪的任何 Cache 对象的键，并返回一个resolve为该匹配的 Promise .
caches.match()

// 如果存在与 cacheName 匹配的 Cache 对象，则返回一个resolve为true的 Promise .
caches.has()

// 返回一个 Promise ，resolve为匹配 cacheName （如果不存在则创建一个新的cache）的 Cache 对象
caches.open()

// 查找匹配 cacheName 的 Cache 对象，如果找到，则删除 Cache 对象并返回一个resolve为true的 Promise 。如果没有找到 Cache 对象，则返回 false.
caches.delete()

// 返回一个 Promise ，它将使用一个包含与 CacheStorage 追踪的所有命名 Cache 对象对应字符串的数组来resolve. 使用该方法迭代所有 Cache 对象的列表。
caches.keys()