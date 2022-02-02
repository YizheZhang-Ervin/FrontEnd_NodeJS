// 扩展local Storage 和 session Storage
// 添加了超时时间，序列化方法。可以直接存储json对象，同时可以非常简单的进行超时时间的设置。
// 优化：WebStorageCache自动清除访问的过期数据，避免了过期数据的累积。
// 另外也提供了清除全部过期数据的方法：wsCache.deleteAllExpires();

var wsCache = new WebStorageCache();
 
// 缓存字符串'wqteam' 到 'username' 中, 超时时间100秒
wsCache.set('username', 'wqteam', {exp : 100});
 
// 超时截止日期，可用使用Date类型
var nextYear = new Date();
nextYear.setFullYear(nextYear.getFullYear() + 1);
wsCache.set('username', 'wqteam', {exp : nextYear});
 
// 获取缓存中 'username' 的值
wsCache.get('username');
 
// 缓存简单js对象，默认使用序列化方法为JSON.stringify。可以通过初始化wsCache的时候配置serializer.serialize
wsCache.set('user', { name: 'Wu', organization: 'wqteam'});
 
// 读取缓存中的简单js对象 - 默认使用反序列化方法为JSON.parse。可以通过初始化wsCache的时候配置serializer.deserialize
var user = wsCache.get('user');
alert(user.name + ' belongs to ' + user.organization);
 
// 删除缓存中 'username'
wsCache.delete('username');
 
// 手工删除所有超时CacheItem,
wsCache.deleteAllExpires();
 
// 清除客户端中所有缓存
wsCache.clear();
 
// 为已存在的（未超时的）缓存值设置新的超时时间。
wsCache.touch('username', 1);
 
// 如果缓存中没有key为username2的缓存，则添加username2。反之什么都不做
wsCache.add('username2', 'wqteam', {exp : 1});
 
// 如果缓存中有key为username的缓存，则替换为新值。反之什么都不做
wsCache.replace('username', 'new wqteam', {exp : 1});
 
// 检查当前选择作为缓存的storage是否被用户浏览器支持。
//如果不支持调用WebStorageCache API提供的方法将什么都不做。
wsCache.isSupported();