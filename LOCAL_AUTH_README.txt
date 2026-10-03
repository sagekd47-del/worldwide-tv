SAVAGETECH TV - LOCAL ACCOUNT MODE

This build uses browser-local accounts instead of PostgreSQL.

- Accounts are stored in localStorage under st_local_accounts_v2.
- Passwords are NOT stored as plain text. PBKDF2-SHA-256 hashes with random salts are stored.
- Login verifies the password locally.
- The first recovery code is shown once after account creation. Save it.
- Forgot Password is local: email + recovery code + new password. It does NOT send an email.
- Clearing browser site data, using another browser/device, or private/incognito mode can remove/access a different local account store.
- This mode is intended for a single browser/device and is not a shared multi-device account system.
- SavageTech AI was not replaced or connected to OpenAI by this authentication change.
