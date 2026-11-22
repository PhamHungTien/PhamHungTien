---
title: 隐私政策
description: 了解 My NAS Manager 如何连接群晖 DSM、处理登录凭据与文件，并通过 App Store 验证购买权限。
updated: '2026-11-22'
lang: zh
---

My NAS Manager 是适用于群晖 DiskStation Manager（DSM）的客户端。本政策说明应用如何处理服务器连接、文件和购买权限。

## 连接 NAS 和处理数据

应用将 DSM 请求发送到你输入的 NAS 地址，并与该地址传输文件。这些请求可能包含登录信息、文件和管理请求。开发者不运营处理此流量的代理或服务器。应用不包含广告或第三方分析 SDK。

应用使用你的密码及一次性验证码登录 NAS，并不会保存这些值。已保存的 DSM 会话包含会话令牌和连接信息，保存在设备的钥匙串中。退出登录会清除应用中保存的会话。

系统可能请求访问本地网络的权限，以连接你的 NAS。应用支持 HTTPS，也允许对所支持的专用或本地地址使用普通 HTTP。普通 HTTP 不加密流量。如下载或分享文件，或创建 DSM 分享链接，接收端的副本与访问由接收端或你的 NAS 设置管理。

## App Store 购买

Apple 通过 App Store 处理购买以及恢复购买。My NAS Manager 使用 StoreKit 检查购买权限，应用不会收到你的支付卡信息。[Apple 隐私政策](https://www.apple.com/legal/privacy/)

## 支持与政策变更

如果你发邮件给我们，我们会使用你发送的信息回复请求。请勿在支持邮件中附上密码、会话令牌或验证码。修订内容和更新日期会在本页公布。

如有隐私问题，请发送邮件至 [contact@phamhungtien.com](mailto:contact@phamhungtien.com)。
