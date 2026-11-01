# Windows 10 and 11 Wi-Fi and internet troubleshooting

## Evidence to collect
Record Windows version/build, adapter name and driver version, whether other devices connect, whether the PC connects to the router but has no internet, and whether the problem affects one network or every network.

## Safe diagnostic sequence
1. Confirm Wi-Fi is enabled, Airplane mode is off, and the intended SSID is selected.
2. Check whether another device can use the same network. If none can, investigate router, modem/ONT, ISP outage or account status before changing the PC.
3. If only this PC fails, restart Wi-Fi and reconnect. Forget/rejoin only when the correct password is available.
4. Test near the router and compare 2.4 GHz with 5 GHz if both are offered and supported.
5. Use Windows Get Help network troubleshooter. Record its findings.
6. Check Device Manager > Network adapters for disabled adapters or driver warnings. Obtain drivers only from the PC maker or adapter maker for the exact model.
7. Network Reset is a last resort: it removes/reinstalls network adapters and resets network settings; VPN or virtual-switch software may need reconfiguration.

## Common clues
- Connected to Wi-Fi but no internet: local wireless link may work while router WAN, DNS, ISP, captive portal or firewall does not.
- No Wi-Fi networks visible: Wi-Fi may be disabled, adapter/driver may have failed, radio switch may be off, or the adapter may not support the router band.
- Weak/intermittent signal: compare close to router; distance, walls, interference, power management or router placement may contribute.

## Source
Microsoft Support — Fix Wi-Fi connection issues in Windows: https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows
