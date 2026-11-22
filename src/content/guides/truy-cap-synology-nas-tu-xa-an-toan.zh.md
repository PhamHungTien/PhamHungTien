---
lang: zh
title: 如何用 iPhone 和 iPad 安全地远程访问群晖 NAS
description: 对比群晖 NAS 的 QuickConnect、DDNS 和 VPN 远程访问方式，检查安全设置，并用 iPhone 或 iPad 上的 My NAS Manager 连接 DSM。
published: 2026-11-22
app: mynasmanager
topic: My NAS Manager
---

群晖 NAS 可集中保存家庭照片、文档和媒体。在外访问时，需要选用能够保护这些文件的连接方式。本指南对比远程访问方案，说明应检查的安全设置，并演示怎样通过 iPhone 和 iPad 上的 [My NAS Manager](/zh/MyNASManager/) 连接。

## NAS 从哪里接收连接？

在家中，可以通过 `192.168.1.10` 之类的私有 IP 地址连接群晖的 DSM。其默认管理端口为：

- **5000** 使用不加密的 HTTP。
- **5001** 使用 HTTPS 加密。

`192.168.x.x` 等私有地址可从本地网络访问，也可经由通往该网络的私有路由访问。[群晖 DSM 端口说明](https://kb.synology.com/en-global/DSM/help/DSM/AdminCenter/system_login_portal_dsm)

## 三种远程连接方式

### QuickConnect

群晖 QuickConnect 使用一个 ID 和 `quickconnect.to/your-name` 之类的地址寻找通往 NAS 的路径，无需手动设置路由器端口转发。没有直连路径时，流量可能通过群晖中继服务器。

- **优点。** 设置简单，无需固定公网 IP。
- **取舍。** 中继传输可能较慢，尤其是大文件。第三方应用可能不接受 QuickConnect ID 作为地址。

### DDNS 和端口转发

家庭网络的公网 IP 可能变化。**动态 DNS（DDNS）**将 `your-nas.synology.me` 之类的主机名关联到该地址，并在地址变化时更新记录。在 DSM 中，前往**控制面板 › 外部访问 › DDNS** 设置。

端口转发让路由器把特定公网端口收到的连接转发到 NAS。转发 HTTPS 端口 5001 会将 DSM 服务暴露在互联网上。

- **优点。** 可以直连，速度取决于网络条件。
- **取舍。** 暴露的服务会收到来自互联网的连接和登录尝试。请保持 DSM 更新，并检查下方保护措施。
- **CGNAT。** 如果运营商使用运营商级 NAT，普通端口转发可能不可用。可比较路由器的 WAN 地址和公网 IP。如不确定，向运营商查询。

### VPN

VPN 提供访问 NAS 的私有路由，无需公开 DSM 端口。

- **Tailscale。** 在 NAS 和 Apple 设备上安装，使用 NAS 的 Tailscale 地址连接。要访问普通家庭网络 IP，还需配置子网路由。Tailscale 可在 CGNAT 下工作，无需手动转发 DSM 端口。
- **群晖 VPN Server。** 提供 OpenVPN 等 VPN 服务。所选 VPN 服务需要相应的网络配置，部分情况下要转发其自身端口。
- 部分路由器可以运行 **WireGuard** 或 **OpenVPN**，供外部设备访问家庭网络。

| 需求                               | 可考虑的方式                     |
| ---------------------------------- | -------------------------------- |
| 偶尔访问照片或文档                 | QuickConnect 和兼容的群晖应用    |
| 管理 NAS、传输文件或使用第三方应用 | VPN 或 Tailscale                 |
| 直连且不使用 VPN                   | DDNS 和严格限制的 HTTPS 端口转发 |

通过私有 VPN 可管理 DSM，无需向互联网开放其端口。请设置访问规则，只允许指定设备和用户连接。[Tailscale 群晖设置指南](https://tailscale.com/docs/integrations/synology)

## 开启远程访问前检查安全设置

1. 创建并验证另一个管理员账户后，**停用默认的 `admin` 账户**。
2. 使用**足够长且不重复的密码**。
3. 为管理员账户启用**双重验证（2FA）**。
4. 在 DSM 安全设置中启用**自动封锁**，限制连续失败的登录尝试。
5. 使用 **HTTPS**。对公网主机名，在**控制面板 › 安全性 › 证书**配置受信任的证书，例如 Let's Encrypt。
6. 仅开放需要的端口。避免直接暴露 SSH，并检查路由器的自动端口映射和 UPnP 设置。
7. 持续更新 **DSM 和已安装的套件**。
8. 保留**独立备份**。RAID 能应对某些硬盘故障，仍需要独立的备份。支持时使用快照，并在外接磁盘或备份服务保留另一份副本。

[群晖 NAS 安全指南](https://kb.synology.com/en-us/DSM/tutorial/How_to_add_extra_security_to_your_Synology_NAS)

## 用 My NAS Manager 连接

My NAS Manager 可在 iPhone 或 iPad 上管理运行 **DSM 7 或更高版本**的群晖 NAS，提供资源监控、文件浏览、套件管理和 SSH 服务控制。

### 登录 NAS

填写以下连接信息：

- **NAS IP 或 DNS。** 使用家庭网络内的 IP、通过 VPN 可访问的地址、NAS 的 Tailscale 地址，或已配置的 DDNS 主机名。
- **DSM 端口。** 使用 **HTTPS** 时，填写 `5001` 或自定义端口。未加密 HTTP 的默认端口为 `5000`。
- **用户名和 DSM 密码。** 使用 NAS 上的账户，最好为此用途创建仅具备所需权限的账户。

如果账户使用双重验证，请启用安全设置中的 **2FA**，在需要时输入一次性验证码。选择**记住登录**会将 DSM 会话保存在钥匙串中。

在家外先连接 VPN 或 Tailscale。未为家庭子网配置路由时，请使用 Tailscale 分配给 NAS 的地址。

### 排查连接问题

| 问题         | 检查内容                                            |
| ------------ | --------------------------------------------------- |
| 无法连接 DSM | 地址、端口、VPN、HTTPS 设置以及 NAS 防火墙          |
| DSM 拒绝登录 | 用户名、密码、是否遗漏 2FA 验证码，以及自动封锁名单 |
| 证书不受信任 | DSM 主机名、证书到期时间和证书链                    |
| NAS 地址无效 | 多余空格、拼写错误或端口格式                        |

多次登录失败后，请在 DSM 的安全设置中检查封锁名单。

## 连接后可以做什么

- **监控资源。** 查看 CPU、内存、温度、网络流量、硬盘与 RAID 状态。
- **浏览文件。** 从设备上传或下载到「文件」，也可创建文件夹及分享链接。
- **管理套件。** 启动或停止已安装的服务，例如 Download Station。
- **管理 SSH 服务。** 启用或关闭 DSM 的 SSH 服务、更改端口，或查看应用内终端式界面提供的诊断信息。

不再使用 SSH 时可将其关闭。[在 App Store 下载 My NAS Manager](https://apps.apple.com/app/id6780180564)。
