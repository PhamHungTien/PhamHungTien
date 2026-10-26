---
title: Access your Synology NAS remotely with iPhone, iPad and Mac
description: Compare QuickConnect, DDNS and VPN access for a Synology NAS, prepare your security settings and connect with My NAS Manager on iPhone, iPad and Mac.
published: 2026-10-15
app: mynasmanager
topic: My NAS Manager
---

A Synology NAS keeps family photos, documents and media in one place. Accessing it away from home requires a connection method that also protects those files. This guide compares remote-access options, explains the security settings to review and shows how to connect with [My NAS Manager](/MyNASManager/) on iPhone, iPad and Mac.

## Where does your NAS accept connections?

At home, you connect to DSM, Synology's operating system, using a private IP address such as `192.168.1.10`. Its default management ports are:

- **5000:** HTTP, without encryption.
- **5001:** HTTPS, with encryption.

A private `192.168.x.x` address is not reachable directly from the public internet. Away from home, you need a remote-access method.

## Three ways to connect remotely

### QuickConnect

Synology's QuickConnect service uses an ID and an address such as `quickconnect.to/your-name`. It finds a route to the NAS without requiring manual router port forwarding. When a direct connection is unavailable, traffic may pass through Synology's relay servers.

- **Advantages:** straightforward setup, no fixed public IP required.
- **Tradeoffs:** relayed transfers can be slower, especially for large files. Third-party apps may not accept a QuickConnect ID directly.

### DDNS and port forwarding

A home connection may have a changing public IP address. **Dynamic DNS (DDNS)** maps a hostname, such as `your-nas.synology.me`, to that address and updates the record when it changes. In DSM, configure DDNS under **Control Panel › External Access › DDNS**.

With port forwarding, a router sends incoming connections on a chosen public port to the NAS. Forwarding HTTPS port 5001 exposes the DSM service to the internet.

- **Advantages:** a direct connection, limited by your network speeds.
- **Tradeoffs:** the exposed service receives connection and login attempts from the internet. Keep DSM patched and configure the protections below.
- **CGNAT:** if your ISP uses carrier-grade NAT, ordinary port forwarding may not work. Compare the router's WAN address with your public IP, and check with your ISP when uncertain.

### VPN access

A VPN provides a private route to the NAS without exposing the DSM port publicly.

- **Tailscale:** install it on the NAS and your Apple devices, then connect using the NAS's Tailscale address. Reaching its ordinary home-network IP requires subnet routing. Tailscale can work through CGNAT without manually forwarding a DSM port.
- **Synology VPN Server:** offers VPN services such as OpenVPN. The chosen VPN service needs its own network configuration and, where applicable, a forwarded port.
- Some routers can host **WireGuard** or **OpenVPN**, providing access to the home network.

| Your needs                                          | Option to consider                             |
| --------------------------------------------------- | ---------------------------------------------- |
| Occasional access to photos or documents            | QuickConnect and compatible Synology apps      |
| NAS management, file transfers and third-party apps | A VPN or Tailscale connection                  |
| Direct access without a VPN                         | DDNS and carefully restricted HTTPS forwarding |

A private VPN connection reduces the need to expose management services. Configure access rules so only the intended users and devices can reach the NAS. For setup details, see the [official Tailscale Synology guide](https://tailscale.com/docs/integrations/synology).

## Secure the NAS before enabling remote access

1. **Disable the default `admin` account** after creating and verifying another administrator account.
2. Use **long, unique passwords**.
3. Enable **two-factor authentication (2FA)** on administrator accounts.
4. Enable **Auto Block** in DSM security settings to limit repeated failed login attempts.
5. Use **HTTPS**. For a public hostname, configure a trusted certificate, such as a Let's Encrypt certificate, under **Control Panel › Security › Certificate**.
6. Expose only the ports you need. Avoid exposing SSH directly; review automatic port mappings and UPnP settings on the router.
7. Keep **DSM and installed packages updated**.
8. Maintain **a separate backup**. RAID protects against certain disk failures but does not replace a backup. Use snapshots where supported and keep another copy on an external drive or backup service.

## Connect with My NAS Manager

My NAS Manager manages Synology devices running **DSM 7 or later** from iPhone, iPad and Mac. It provides resource monitoring, file browsing, package management and SSH controls.

### Try Demo Mode

Choose **Demo Mode** on the sign-in screen to explore the interface with simulated data before entering real NAS credentials.

### Sign in to your NAS

Enter the connection details:

- **NAS IP / DNS:** the local IP at home, an address reachable through your VPN, the NAS's Tailscale address, or a configured DDNS hostname.
- **DSM port:** `5001` with **HTTPS**, or your custom HTTPS port. Port `5000` is the default for unencrypted HTTP.
- **Username and DSM password:** an account on the NAS. Prefer a dedicated account with only the permissions you need.

If your account uses two-factor authentication, enable **2FA** under security settings and enter the OTP when prompted. **Remember sign-in** retains the session for later use.

When away from home, connect your VPN or Tailscale first. For Tailscale, use its assigned NAS address unless you have configured access to your home subnet.

### Troubleshooting

| Problem                                | Things to check                                                                  |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| Cannot connect to DSM                  | Address, port, VPN connection, HTTPS setting and NAS firewall rules              |
| DSM rejects sign-in                    | Username, password, missing 2FA code or an Auto Block entry                      |
| Invalid NAS IP, QuickConnect ID or DNS | Unexpected spaces, an extra `http://` prefix or an incorrectly formatted address |

After repeated failed sign-ins, check the block list in DSM's security settings.

## What you can do after connecting

- **Monitor resources:** CPU, RAM, temperature, network traffic, disks and RAID status.
- **Browse files:** upload from your device, download to Files, create folders and generate sharing links.
- **Manage packages:** start and stop installed services, such as Download Station.
- **Manage SSH:** enable or disable the service, change its port and use the terminal interface for commands such as `ls`, `df -h`, `top` and `uptime`.

Turn SSH off when you no longer need it. Download [My NAS Manager on the App Store](https://apps.apple.com/us/app/my-nas-manager/id6780180564).
