# Windows printer troubleshooting: offline, not detected, queue and print quality

## Evidence to collect
Capture printer make/model, Windows version, exact display error, connection type (USB/Wi-Fi/Ethernet), printer IP if networked, queue status, and whether the printer can print its own test page.

## Safe diagnostic sequence
1. Check power/ready state, paper, ink/toner, covers and displayed error.
2. For USB, reseat the cable and test another known-good port/cable. For Wi-Fi, confirm printer and PC are on the intended network; guest networks or separate SSIDs can isolate them.
3. Restart the printer normally. Check the Windows print queue for paused/offline status and stuck jobs.
4. Run Windows printer troubleshooter / Get Help.
5. Remove and re-add the printer only after noting its current settings and connection details.
6. Install drivers only from the printer maker's official support page for the exact model and OS.
7. Restarting or clearing Print Spooler is an advanced step. Explain that pending print jobs may be deleted before clearing spool files.

## Diagnostic reasoning
If the printer's own test page fails, investigate printer-side paper, ink, hardware or configuration. If its own test page works but Windows cannot print, investigate driver, queue, port, permissions or network path. Do not assume a faulty printer from a Windows offline status alone.

## Source
Microsoft Support — Fix printer connection and printing problems in Windows: https://support.microsoft.com/en-us/windows/hardware/printer/fix-printer-connection-and-printing-problems-in-windows
