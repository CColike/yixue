## 项目主页: https://github.com/FlowRays/yixue
## bug to fix
### 1.检验输入/预约合法性
### 2.审批时同一时段只能审批一次，修改时也是
### 3.rpx适配问题

1.
information.js:
  check.add时加入申请时间
2.
逻辑问题:
  当管理员将某个时段审批通过之后，那么同时段的申请应当如何处理
  考虑到有不同申请的优先级不同