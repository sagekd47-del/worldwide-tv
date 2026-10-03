/* SavageTech TV LOCAL AUTHENTICATION
   Accounts live only in this browser's localStorage.
   Passwords are never stored as plain text: PBKDF2-SHA-256 hashes + random salts are stored.
   This intentionally does NOT replace the SavageTech AI or connect auth to OpenAI.
*/
const AUTH_KEY='st_local_accounts_v2';
const SESSION_KEY='st_user';
const PBKDF2_ITERATIONS=150000;

function toast(msg){
  let x=document.createElement('div'); x.className='toast'; x.textContent=msg;
  document.body.appendChild(x); setTimeout(()=>x.remove(),3200);
}
function goHome(){sessionStorage.setItem('st_splash_home.html','1'); setTimeout(()=>location.href='home.html',350);}
function readAccounts(){try{const a=JSON.parse(localStorage.getItem(AUTH_KEY)||'[]');return Array.isArray(a)?a:[]}catch(_){return []}}
function saveAccounts(a){localStorage.setItem(AUTH_KEY,JSON.stringify(a))}
function normalizeEmail(v){return String(v||'').trim().toLowerCase()}
function normalizeUsername(v){return String(v||'').trim().toLowerCase()}
function bytesToBase64(bytes){let s='';const chunk=0x8000;for(let i=0;i<bytes.length;i+=chunk)s+=String.fromCharCode(...bytes.subarray(i,i+chunk));return btoa(s)}
function base64ToBytes(s){const b=atob(s);const out=new Uint8Array(b.length);for(let i=0;i<b.length;i++)out[i]=b.charCodeAt(i);return out}
function randomBytes(n){const b=new Uint8Array(n);crypto.getRandomValues(b);return b}
async function deriveHash(password,salt){
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:PBKDF2_ITERATIONS,hash:'SHA-256'},key,256);
  return new Uint8Array(bits);
}
function constantTimeEqual(a,b){if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a[i]^b[i];return x===0}
async function hashPassword(password){const salt=randomBytes(16);const hash=await deriveHash(password,salt);return {salt:bytesToBase64(salt),hash:bytesToBase64(hash),iterations:PBKDF2_ITERATIONS}}
async function verifyPassword(password,record){try{const hash=await deriveHash(password,base64ToBytes(record.salt));return constantTimeEqual(hash,base64ToBytes(record.hash))}catch(_){return false}}
function makeRecoveryCode(){const a=new Uint32Array(1);crypto.getRandomValues(a);return String(10000000+(a[0]%90000000))}
async function hashRecovery(code){return hashPassword(code)}
function setSession(account){
  const u={name:account.name||account.username,username:account.username,email:account.email,photo:account.photo||null,createdAt:account.createdAt,localAuth:true};
  localStorage.setItem(SESSION_KEY,JSON.stringify(u));
}
function currentUser(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch(_){return null}}

// Signup
const signupForm=document.getElementById('signupForm');
signupForm?.addEventListener('submit',async e=>{
  e.preventDefault();
  const username=document.getElementById('username')?.value.trim();
  const name=document.getElementById('name')?.value.trim()||username;
  const email=normalizeEmail(document.getElementById('email')?.value);
  const password=document.getElementById('password')?.value||'';
  if(!username){toast('Please choose a username.');return}
  if(username.length<3){toast('Username must be at least 3 characters.');return}
  if(!/^[a-zA-Z0-9_.-]+$/.test(username)){toast('Username can use letters, numbers, dot, dash and underscore.');return}
  if(!email){toast('Please enter your email.');return}
  if(password.length<6){toast('Password must be at least 6 characters.');return}
  const accounts=readAccounts();
  if(accounts.some(a=>normalizeEmail(a.email)===email)){toast('An account with this email already exists. Please sign in.');return}
  if(accounts.some(a=>normalizeUsername(a.username)===normalizeUsername(username))){toast('That username is already taken.');return}
  const recoveryCode=makeRecoveryCode();
  const pass=await hashPassword(password);
  const recovery=await hashRecovery(recoveryCode);
  const account={id:crypto.randomUUID(),name:name||username,username,email,photo:null,createdAt:new Date().toISOString(),password:pass,recovery,recoveryIssuedAt:new Date().toISOString()};
  accounts.push(account); saveAccounts(accounts); setSession(account);
  alert(`Account created successfully.\n\nLOCAL RECOVERY CODE: ${recoveryCode}\n\nSave this code somewhere safe. It is required to reset your password on this browser if you forget it.`);
  toast('Account created successfully.'); goHome();
});

// Login
const loginForm=document.getElementById('loginForm');
loginForm?.addEventListener('submit',async e=>{
  e.preventDefault();
  const email=normalizeEmail(document.getElementById('email')?.value);
  const password=document.getElementById('password')?.value||'';
  const account=readAccounts().find(a=>normalizeEmail(a.email)===email);
  if(!account){toast('No local account was found for this email. Create an account first.');return}
  const ok=await verifyPassword(password,account.password);
  if(!ok){toast('Incorrect email or password.');return}
  setSession(account); toast('Signed in successfully.'); goHome();
});

// Local password recovery. No email is sent because this mode is intentionally offline/local.
const forgotForm=document.getElementById('forgotForm');
forgotForm?.addEventListener('submit',async e=>{
  e.preventDefault();
  const email=normalizeEmail(document.getElementById('forgotEmail')?.value);
  const code=String(document.getElementById('recoveryCode')?.value||'').trim();
  const newPassword=document.getElementById('newPassword')?.value||'';
  if(newPassword.length<6){toast('New password must be at least 6 characters.');return}
  const accounts=readAccounts(); const idx=accounts.findIndex(a=>normalizeEmail(a.email)===email);
  if(idx<0){toast('No local account was found for this email.');return}
  if(!accounts[idx].recovery){toast('This account has no local recovery code. Create a new local account.');return}
  if(!(await verifyPassword(code,accounts[idx].recovery))){toast('Incorrect recovery code.');return}
  accounts[idx].password=await hashPassword(newPassword);
  const newRecoveryCode=makeRecoveryCode();
  accounts[idx].recovery=await hashRecovery(newRecoveryCode);
  accounts[idx].recoveryIssuedAt=new Date().toISOString();
  saveAccounts(accounts); localStorage.removeItem(SESSION_KEY);
  document.getElementById('forgotStatus').textContent=`Password changed. New local recovery code: ${newRecoveryCode}. Save it somewhere safe.`;
  toast('Password changed successfully.');
  setTimeout(()=>location.href='login.html',900);
});

// Logout helper used by profile/settings pages.
window.savageTechLogout=function(){localStorage.removeItem(SESSION_KEY);location.href='login.html'};
