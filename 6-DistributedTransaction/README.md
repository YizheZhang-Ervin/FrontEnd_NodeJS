# dtm

npm install

## Tcc
```
# TransOutTry -> TransInTry -> TransInConfirm -> TransOutConfirm
node tcc.js
```

## saga
```
# TransOut -> TransIn
node saga.js

# TransOut -> TransOut -> TransIn -> TransIn
node saga.js concurrent
```

## 二阶段消息
```
# dtm_busi库, 新增user_account,barrier两张表
# 顺序：TransOut 30, TransIn 30
node msg.js

# 日志看sql，输出TransIn 30，连接数据库可看到两个user的转账结果
node msg.js local
```