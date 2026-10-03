
async function refreshAnalytics(){
 try{
  const r=await fetch('/api/analytics/stats',{cache:'no-store'}); if(!r.ok) return; const d=await r.json();
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=String(v??0)};
  set('statActiveUsers',d.activeUsers);set('statUniqueVisitors',d.uniqueVisitors);set('statTotalVisits',d.totalVisits);set('statTotalDownloads',d.totalDownloads);set('statUniqueDownloaders',d.uniqueDownloaders);
  set('periodTodayUsers',d.today?.users);set('periodTodayChats',`${d.today?.chats||0} chats · ${d.today?.downloads||0} downloads`);
  set('periodWeekUsers',d.week?.users);set('periodWeekChats',`${d.week?.chats||0} chats · ${d.week?.downloads||0} downloads`);
  set('periodMonthUsers',d.month?.users);set('periodMonthChats',`${d.month?.chats||0} chats · ${d.month?.downloads||0} downloads`);
  set('periodYearUsers',d.year?.users);set('periodYearChats',`${d.year?.chats||0} chats · ${d.year?.downloads||0} downloads`);
 }catch(e){console.warn('Analytics unavailable',e)}
}
refreshAnalytics(); setInterval(refreshAnalytics,15000);

const ADMIN_PASSWORD="techtv26";
function adminUnlock(){
 const lock=document.getElementById("adminLock"), form=document.getElementById("adminUnlockForm"), input=document.getElementById("adminPasswordInput"), error=document.getElementById("adminLockError");
 const open=()=>{sessionStorage.setItem("st_admin_access","1");lock?.remove();document.body.classList.remove("admin-locked")};
 if(sessionStorage.getItem("st_admin_access")==="1"){open();return;}
 document.body.classList.add("admin-locked");
 form?.addEventListener("submit",e=>{e.preventDefault();if(input.value===ADMIN_PASSWORD){open();}else{error.textContent="Incorrect password. Please try again.";input.value="";input.focus();}});
}
function setupPasswordToggle(inputId,buttonId){
    const input = document.getElementById(inputId);
    const btn = document.getElementById(buttonId);
    if(!input || !btn) return;
    btn.addEventListener("click", ()=>{
        input.type = input.type === "password" ? "text" : "password";
    });
    }
setupPasswordToggle("adminPasswordInput","toggleAdminPassword");
setupPasswordToggle("deletePasswordInput","toggleDeletePassword");
function confirmAdminDelete(){return new Promise(resolve=>{const modal=document.getElementById("deleteModal"),input=document.getElementById("deletePasswordInput"),error=document.getElementById("deletePasswordError"),ok=document.getElementById("confirmDelete"),cancel=document.getElementById("cancelDelete");modal.classList.add("show");modal.setAttribute("aria-hidden","false");input.value="";input.type="password";document.getElementById("toggleDeletePassword").textContent="👁";error.textContent="";setTimeout(()=>input.focus(),50);const close=result=>{modal.classList.remove("show");modal.setAttribute("aria-hidden","true");ok.onclick=null;cancel.onclick=null;resolve(result);};cancel.onclick=()=>close(false);ok.onclick=()=>{if(input.value===ADMIN_PASSWORD)close(true);else{error.textContent="Incorrect password. Delete cancelled.";input.value="";input.focus();}};input.onkeydown=e=>{if(e.key==="Enter")ok.click();if(e.key==="Escape")close(false);};});}
adminUnlock();

async function loadAnalyticsStats(){
  try{
    const r=await fetch('/api/analytics/stats',{cache:'no-store'});
    if(!r.ok) throw new Error('stats unavailable');
    const d=await r.json();
    const active=document.getElementById('statActiveUsers');
    const unique=document.getElementById('statUniqueVisitors');
    const visits=document.getElementById('statTotalVisits');
    if(active) active.textContent=Number(d.activeUsers||0).toLocaleString();
    if(unique) unique.textContent=Number(d.uniqueVisitors||0).toLocaleString();
    if(visits) visits.textContent=Number(d.totalVisits||0).toLocaleString();
  }catch(e){}
}
loadAnalyticsStats();
setInterval(loadAnalyticsStats,10000);
const demo=[
 {id:1,name:"Food Network",cat:"Documentary",desc:"Welcome to Food Time!🍽️ Your ultimate destination for delicious, easy-to-make recipes that bring joy to your kitchen",logo:"FOOD",logoImage:"assets/foodtime-logo.png",stream:"http://stream.mcquack.net/216/index.m3u8"},
 {id:2,name:"ITV Media",cat:"News",desc:"ITV plc is a major British Media Company based in London, England, that operates as a vertically intergrated prooducer, broadcaster and streaming giant.",logo:"ITV",logoImage:"assets/itv-logo.png",stream:"https://cdn10.live-tv.cloud/itvrv/abr-lq/playlist.m3u8"},
 {id:3,name:"Almere Tv",cat:"News",desc:"A television channel with a variety of programs including talk shows, sports, culture, business and news",logo:"ALM",logoImage:"assets/almere-logo.png",stream:"https://d3472rjicrodic.cloudfront.net/nlpo/clr-nlpo/709d5260/index.m3u8"},
 {id:4,name:"CTN",cat:"Religious",desc:"Christian Television Network (CTN), Is an American non-profit broadcast television network of small owned and operated stations that broadcasts religious programming.",logo:"CTN",logoImage:"assets/ctn-logo.png",stream:"https://video1.getstreamhosting.com:1936/8226/8226/playlist.m3u8"},
 {id:5,name:"CBN",cat:"Religious",desc:"The Christian Broadcasting Network is an American Christian media production and distribution organization founded in 1960 by televangelist Pat Robertson",logo:"CBN",logoImage:"assets/cbn-logo.jpg",stream:"https://2-fss-2.streamhoster.com/pl_138/200226-1359204-1/playlist.m3u8"},
 {id:6,name:"Christian Youth Channel",cat:"Religious",desc:"An English Coptic Christian channel, dedicated to Christians all around the world to spread the teachings and love of Jesus Christ",logo:"CYC",logoImage:"assets/cyc-logo.jpg",stream:"http://media3.smc-host.com:1935/cycnow.com/smil:cyc.smil/playlist.m3u8"},
 {id:7,name:"NICKELODEON",cat:"Kids",desc:"An American television channel and the flagship property of the Nickelodeon Group, a sub-division of the Paramount Media Networks division of Paramount Skydance",logo:"NICK",logoImage:"assets/nickelodeon-logo.png",stream:"http://23.237.104.106:8080/USA_NICKELODEON/index.m3u8"},
 {id:8,name:"Channel 24",cat:"News",desc:"A Ukranian TV Channel that covers events in Ukraine and around the world.",logo:"24",logoImage:"assets/channel-24.png",stream:"https://streamvideol1.luxnet.ua/news24/smil:news24.stream.smil/playlist.m3u8"},
 {id:9,name:"24Hour Movies",cat:"Movies",desc:"Your ultimate destination for non-stop cinema! 24Hours a Day and 7Days a Week, Never miss a moment of entertainment Watch Now!🎬",logo:"24/7",logoImage:"assets/24-hour-movie.png",stream:"https://d1j2u714xk898n.cloudfront.net/scheduler/scheduleMaster/145.m3u8"},
 {id:10,name:"ABN TV Network",cat:"Religious",desc:"A dedicated Bible Movies/Arabic Cinematic Films channel stream that broadcasts scripturally themed films and visual storytelling",logo:"ABN",logoImage:"assets/abn-tv.png",stream:"https://mediaserver.abnvideos.com/streams/abnbiblemovies.m3u8"},
 {id:11,name:"Andxplor HD",cat:"Movies",desc:"&xplor HD Is a premium HD Hindi movie television channel owned and operated byZee Entertainment Enterprises.",logo:"&XP",logoImage:"assets/xplor-hd.png",stream:"http://66.102.126.10:8000/play/a028/index.m3u8"},
 {id:12,name:"AMC East HD",cat:"Movies",desc:"A premium high definition cable channel that broadcasts a mix of critically acclaimed original dramas, horror franchises and hit Hollywood movies scheduled for Eastern Standard Time",logo:"AMC",logoImage:"assets/amc-plus.webp",stream:"http://41.205.93.154/AMC/index.m3u8"},
 {id:13,name:"360TuneBox",cat:"Music",desc:"An international music TV channel focused on independent and breakthrough artists from around the world.",logo:"",logoImage:"assets/360tunebox.jpg",stream:"https://dash3.antik.sk/live/test_360_tunebox_medium_atk/playlist.m3u8"},
 {id:14,name:"BBC America",cat:"Documentary",desc:"Watch the latest full episodes and video extras for BBC America shows: Doctor Who, Killing Eve, Orphan Black, Luther, Planet Earth and more...",logo:"",logoImage:"assets/bbc-logo.jpg",stream:"http://23.239.31.26:8989/bbcamerica/index.m3u8"},
 {id:15,name:"RTV Horizon",cat:"News",desc:"A non-profit public local media organisation that serves it's community with comprehensive news.",logo:"",logoImage:"assets/rtv-horizon.png",stream:"https://tv.rtvhorizon.nl/hls/horizon/1_2/index.m3u8"},
 {id:16,name:"TBC 1",cat:"News",desc:"",logo:"",logoImage:"assets/tbc1.webp",stream:"https://tbc.maintek.co/LiveApp/streams/YF43nTzH0duMyUA2130641323343587.m3u8"},
 {id:17,name:"TBC 2",cat:"News",desc:"",logo:"",logoImage:"assets/tbc2.jpg",stream:"https://stream-134630.castr.net/5fe35eae8c53540cab83659a/live_44ed95e05b6d11f18d5d85805abbdd6f/index.m3u8"},
 {id:18,name:"Mahaasin Tv",cat:"Religious",desc:"",logo:"",logoImage:"assets/mahaasin-tv.png",stream:"https://mahaasintv.livebox.co.in/mahaasintvhls/mahaasintv.m3u8"},
 {id:19,name:"BBC NEWS",cat:"News",desc:"",logo:"",logoImage:"assets/bbc-news.jpg",stream:"https://xemzi.short.gy/1000015"},
 {id:20,name:"MoreThan Sport TV",cat:"Sports",desc:"A German TV and digital sports channel based in Munich",logo:"",logoImage:"assets/morethan-sport.png",stream:"https://mts1.iptv-playoutcenter.de/mts/mts-web/playlist.m3u8"},
 {id:21,name:"IBN TV",cat:"Religious",desc:"",logo:"",logoImage:"assets/ibn-tv.png",stream:"http://138.68.138.119:8080/live/5a8993709ea19/index.m3u8"},
 {id:22,name:"Adventure Earth",cat:"Documentary",desc:"",logo:"",logoImage:"assets/adventure-tv.png",stream:"https://a57e9c69976649b582a8d7604c00e69a.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/RlaxxTV-eu_AdventureEarth/playlist.m3u8"},
 {id:23,name:"365 Days TV",cat:"Documentary",desc:"",logo:"",logoImage:"assets/365-days.jpg",stream:"http://stream.mcquack.net/70/index.m3u8"},
 {id:24,name:"Autentic History",cat:"Documentary",desc:"",logo:"",logoImage:"assets/autentic-tv.jpg",stream:"https://9e754fa707344ccca6d84955c8fcaf36.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/RlaxxTV-eu_AutenticHistory/playlist.m3u8"},
 {id:25,name:"Documentary+",cat:"Documentary",desc:"",logo:"",logoImage:"assets/doc-plus.png",stream:"https://ef79b15c8c7c46c7a9de9d33001dbd07.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-859-DOCUMENTARYPLUS-DOCUMENTARYPLUS/mt/documentaryplus/859/hls/master/playlist.m3u8"},
 {id:26,name:"Documentary+ International",cat:"Documentary",desc:"",logo:"",logoImage:"assets/doc-plus-national.png",stream:"https://1d153317c8db4250b3789601274e2402.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-887-DOCUMENTARYINTERNATIONAL-DOCUMENTARYPLUS/mt/documentaryplus/887/hls/master/playlist.m3u8"},
 {id:27,name:"History",cat:"Documentary",desc:"",logo:"",logoImage:"assets/history.png",stream:"https://lds-timeline-rakuten.amagi.tv/playlist.m3u8"},
 {id:28,name:"National Geographic",cat:"Documentary",desc:"",logo:"",logoImage:"assets/natgeo.jpg",stream:"http://198.58.104.90:8989/natgeo/index.m3u8"},
 {id:29,name:"National Geographic Wild",cat:"Documentary",desc:"",logo:"",logoImage:"assets/natgeo-wild.jpg",stream:"http://198.58.104.90:8989/natgeowild/index.m3u8"},
 {id:30,name:"BBC Earth",cat:"Documentary",desc:"",logo:"",logoImage:"assets/bbc-earth.png",stream:"https://amg00793-amg00793c6-xumo-us-2669.playouts.now.amagi.tv/BBCStudios-BBCEarthA-hls/playlist.m3u8"},
 {id:31,name:"Africa News",cat:"News",desc:"",logo:"",logoImage:"assets/africanews.png",stream:"https://cdn-euronews.akamaized.net/live/eds/africanews-en/25049/index.m3u8"},
 {id:32,name:"FIFA+",cat:"Sports",desc:"",logo:"",logoImage:"assets/fifa-plus.png",stream:"https://d2w9q46ikgrcwx.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-of5cbk3sav3w5/v1/sysdata_s_p_a_fifa_7/samsungheadend_us/latest/main/hls/playlist.m3u8"},
 {id:33,name:"Al Jazeera",cat:"News",desc:"",logo:"",logoImage:"assets/aljazeera-news.png",stream:"https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8"},
 {id:34,name:"Fox Sports 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/foxsports1.gif",stream:"http://85.237.89.160:9590/usa-s/FOX-SPORTS-1/index.m3u8"},
 {id:35,name:"Fox Sports 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/foxsport-2.jpg",stream:"https://tvsen7.aynascope.net/foxsports2/index.m3u8"},
 {id:36,name:"NBC Sports",cat:"Sports",desc:"",logo:"",logoImage:"assets/nbc-sports.png",stream:"https://d4whmvwm0rdvi.cloudfront.net/10007/99993008/hls/master.m3u8?ads.xumo_channelId=99993008"},
 {id:37,name:"Disney JR.",cat:"Kids",desc:"",logo:"",logoImage:"assets/disney-junior.jpg",stream:"http://23.237.104.106:8080/USA_DISNEY_JUNIOR/index.m3u8"},
 {id:38,name:"Arena Sport 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-1.jpg",stream:"http://88.212.15.19/live/test_arenasport/playlist.m3u8"},
 {id:39,name:"Arena Sport 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-2.png",stream:"http://88.212.15.19/live/test_arenasport_dva/playlist.m3u8"},
 {id:40,name:"Arena Sport 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-3.png",stream:"https://nl1.nghk.ai/ArenaSport3HD/index.m3u8"},
 {id:41,name:"Arena Sport 4",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-4.png",stream:"https://nl1.nghk.ai/ArenaSport4HD/index.m3u8"},
 {id:42,name:"Arena Sport 5",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-5.png",stream:"https://nl1.nghk.ai/ArenaSport5HD/index.m3u8"},
 {id:43,name:"Arena Sport 6",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-6.png",stream:"https://nl1.nghk.ai/ArenaSport6HD/index.m3u8"},
 {id:44,name:"Arena Sport 7",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-7.png",stream:"https://nl1.nghk.ai/ArenaSport7HD/index.m3u8"},
 {id:45,name:"Arena Sport 8",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-8.png",stream:"https://nl1.nghk.ai/ArenaSport8HD/index.m3u8"},
 {id:46,name:"Arena Sport 9",cat:"Sports",desc:"",logo:"",logoImage:"assets/",stream:"https://nl1.nghk.ai/AS9HRHD/index.m3u8"},
 {id:47,name:"Arena Sport 10",cat:"Sports",desc:"",logo:"",logoImage:"assets/",stream:"https://nl1.nghk.ai/AS10HRHD/index.m3u8"},
 {id:48,name:"ARTFLIX Classics",cat:"Movies",desc:"",logo:"",logoImage:"assets/artflix.jpg",stream:"https://amogonetworx-artflix-1-nl.samsung.wurl.tv/playlist.m3u8"},
 {id:49,name:"1KZN Tv",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/1kzn-tv.png",stream:"https://cdn.freevisiontv.co.za/sttv/smil:1kzn.stream.smil/playlist.m3u8"},
 {id:50,name:"1Twente Tv",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/1twente-tv.png",stream:"https://ms7.mx-cd.net/dtv-11/198989148/1Twente_TV.smil/chunklist_w954512639_b4292608_slNLD.m3u8"},
 {id:51,name:"2M Monde",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/2m-monde.jpg",stream:"https://d2qh3gh0k5vp3v.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-n6pess5lwbghr/2M_ES.m3u8"},
 {id:52,name:"3Sat",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/3sat.png",stream:"https://zdf-hls-18.akamaized.net/hls/live/2016501/dach/high/master.m3u8"},
 {id:53,name:"20Minutes Tv",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/20minutes-tv.png",stream:"https://live-20minutestv.digiteka.com/1961167769/index.m3u8"},
 {id:54,name:"Asianet MovieHD",cat:"Movies",desc:"",logo:"",logoImage:"assets/a-movies.png",stream:"https://da86m1sqpm3o0.cloudfront.net/28072023/smil:asianetmovies1.smil/playlist.m3u8"},
 {id:55,name:"APunt Tv",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/a-punt-tv.png",stream:"https://fastly.live.brightcove.com/1846756479408303045/eu-central1/6057955885001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZWFxNWh4LmVncmVzcy53YzQ3bTEiLCJhY2NvdW50X2lkIjoiNjA1Nzk1NTg4NTAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI2MDU3OTU1ODg1MDAxIl0sImp0aSI6IjE4NDY3NTY0Nzk0MDgzMDMwNDUifQ.o6wb_VATVxl3ERgr7FKLlaTjY7smErmsf73QAydySE/playlist-hls-dvr.m3u8"},
 {id:56,name:"A2 Tv",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/a2tv.png",stream:"https://rnttwmjcin.turknet.ercdn.net/lcpmvefbyo/a2tv/a2tv.m3u8"},
 {id:57,name:"Abadan TV",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/abadan-tv.png",stream:"https://ncdn.telewebion.ir/abadan/live/playlist.m3u8"},
 {id:58,name:"ABC Entertains",cat:"Kids",desc:"",logo:"",logoImage:"assets/abc-entertainment.png",stream:"https://c.mjh.nz/abc-me.m3u8"},
 {id:59,name:"ABC Kids",cat:"Kids",desc:"",logo:"",logoImage:"assets/abc-kids.jpg",stream:"https://c.mjh.nz/abc-kids.m3u8"},
 {id:60,name:"ACI Sport Tv",cat:"Sports",desc:"",logo:"",logoImage:"assets/aci-sport.png",stream:"https://webstream.multistream.it/memfs/e2cb3629-c1a2-495b-b43a9eb386f04ed8.m3u8"},
 {id:61,name:"Action24",cat:"Movies",desc:"",logo:"",logoImage:"assets/action-24.jpg",stream:"http://actionlive.siliconweb.com/actionabr/actiontv/playlist.m3u8"},
 {id:62,name:"ActivaTV",cat:"Music",desc:"",logo:"",logoImage:"assets/activa-tv.jpg",stream:"https://streamtv.mediasector.es/hls/activatv/index.m3u8"},
 {id:63,name:"AfghanNoble Tv",cat:"Movies",desc:"",logo:"",logoImage:"assets/afghan-tv.jpg",stream:"https://live.relentlessinnovations.net:1936/afghannobel/afghannobel/playlist.m3u8"},
 {id:64,name:"Africa24 Sport",cat:"Sports",desc:"",logo:"",logoImage:"assets/africa-24.png",stream:"https://africa24.vedge.infomaniak.com/livecast/ik:africa24sport/manifest.m3u8"},
 {id:65,name:"Allocine Tv",cat:"Movies",desc:"",logo:"",logoImage:"assets/allocine.jpg",stream:"https://d1yl6bf4hrzbr0.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-5km3zs4zs9sp0/allo.m3u8"},
 {id:66,name:"AllTimeMovies HD",cat:"Movies",desc:"",logo:"",logoImage:"assets/alltime-movie.png",stream:"https://streams.tangotv.in/ALLTIMEMOVIES/ORIGIN/index.m3u8"},
 {id:67,name:"AlphaCinema",cat:"Movies",desc:"",logo:"",logoImage:"assets/alpha-tv.png",stream:"https://live.15plusmg.ru/memfs/b389173a-df4e-4171-8904-e249893e71eb.m3u8"},
 {id:68,name:"AMC Music",cat:"Music",desc:"",logo:"",logoImage:"assets/amc-music.png",stream:"https://amchls.wns.live/hls/stream.m3u8"},
 {id:69,name:"Amedia Premium",cat:"Movies",desc:"",logo:"",logoImage:"assets/amedia-tv.png",stream:"http://31.148.48.15/Amedia_Premium_HD/index.m3u8"},
 {id:70,name:"American Horrors",cat:"Movies",desc:"",logo:"",logoImage:"assets/americanhorror.gif",stream:"http://107.167.7.162:8081/playlist/amhor/playlist.m3u8"},
 {id:71,name:"Avatar Tv",cat:"Kids",desc:"",logo:"",logoImage:"assets/avatar-tv.png",stream:"https://jmp2.uk/plu-656df599c0fc8800089c75ab.m3u8"},
 {id:72,name:"BBC Kids",cat:"Kids",desc:"",logo:"",logoImage:"assets/bbc-kids.png",stream:"https://dmr1h4skdal9h.cloudfront.net/playlist.m3u8"},
 {id:73,name:"Cbeebies",cat:"Kids",desc:"A British free-to-air public broadcast children's television channel.",logo:"",logoImage:"assets/cbeebies.jpg",stream:"http://193.46.58.239:8080/CbeebiesHD/index.m3u8"},
 {id:74,name:"Fox Deportes",cat:"Sports",desc:"",logo:"",logoImage:"assets/",stream:"https://cors-proxy.cooks.fyi/http://23.237.104.106:8080/USA_FOX_DEPORTES/index.m3u8"},
 {id:75,name:"FITE24",cat:"Sports",desc:"",logo:"",logoImage:"assets/",stream:"https://d3d85c7qkywguj.cloudfront.net/scheduler/scheduleMaster/263.m3u8"},
 {id:76,name:"Esport3",cat:"Sports",desc:"",logo:"",logoImage:"assets/",stream:"https://directes-tv-int.3catdirectes.cat/live-content/esport3-hls/master.m3u8"},
 {id:77,name:"Equidia",cat:"Sports",desc:"",logo:"",logoImage:"assets/",stream:"https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/equidia/live2.m3u8"},
 {id:78,name:"ATG HD",cat:"Sports",desc:"",logo:"",logoImage:"assets/",stream:"https://kanal75xto-llhls.akamaized.net/live/Data/atg-kanal-15-02a-rr/HLS-Legacy-HL/atg-kanal-15-02a-rr.m3u8"},
 {id:79,name:"AS3 Sport",cat:"Sports",desc:"",logo:"",logoImage:"assets/",stream:"https://streamtv.as3sport.online:3394/hybrid/play.m3u8"},
 {id:80,name:"CGTN HD",cat:"Documentary",desc:"",logo:"",logoImage:"assets/",stream:"https://news.cgtn.com/resource/live/document/cgtn-doc.m3u8"},
 {id:81,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:82,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:83,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:84,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:85,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:86,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:87,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:88,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:89,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:90,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:91,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:92,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:93,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:94,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:95,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:96,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:97,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:98,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:99,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:100,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""}
];
const demoSlides=[{id:101,title:"Welcome to SavageTech TV",subtitle:"Fast & Reliable Service • Watch your favourite channels",image:"assets/slider-demo.gif",stream:""},{id:102,title:"Live TV, Movies & Sports",subtitle:"Add your own image and stream from Admin Dashboard",image:"",stream:""}];
function channels(){return JSON.parse(localStorage.getItem("st_channels")||"null")||demo}
function slides(){return JSON.parse(localStorage.getItem("st_slides")||"null")||demoSlides}
let uploadedThumb="", uploadedSlide="";
function showThumb(src){let p=document.getElementById("thumbPreview");if(p)p.innerHTML=src?`<img src="${src}" alt="Channel preview">`:"Image preview"}
function showSlide(src){let p=document.getElementById("slidePreview");if(p)p.innerHTML=src?`<img src="${src}" alt="Slider preview">`:"Slider image preview"}
document.getElementById("thumbFile")?.addEventListener("change",e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{uploadedThumb=r.result;showThumb(uploadedThumb)};r.readAsDataURL(f)});
document.getElementById("thumbUrl")?.addEventListener("input",e=>{if(e.target.value.trim()){uploadedThumb="";showThumb(e.target.value.trim())}});
document.getElementById("slideFile")?.addEventListener("change",e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{uploadedSlide=r.result;showSlide(uploadedSlide)};r.readAsDataURL(f)});
document.getElementById("slideImageUrl")?.addEventListener("input",e=>{if(e.target.value.trim()){uploadedSlide="";showSlide(e.target.value.trim())}});
function draw(){let cs=channels();document.getElementById("statChannels").textContent=cs.length;document.getElementById("adminList").innerHTML=cs.map(c=>`<div class="admin-row"><div><b>${c.name}</b><br><small>${c.cat} · ${c.desc||""}</small></div><div class="admin-actions"><button class="ghost-btn" onclick="editC(${c.id})">Edit</button><button class="ghost-btn danger" onclick="delC(${c.id})">Delete</button></div></div>`).join("");let ss=slides();let list=document.getElementById("slideList");if(list)list.innerHTML=ss.map(x=>`<div class="admin-row slide-admin-row"><div class="admin-slide-mini">${x.image?`<img src="${x.image}">`:"TV"}</div><div class="admin-slide-info"><b>${x.title}</b><br><small>${x.subtitle||"No subtitle"}</small></div><div class="admin-actions"><button class="ghost-btn" onclick="editSlide(${x.id})">Edit</button><button class="ghost-btn danger" onclick="delSlide(${x.id})">Delete</button></div></div>`).join("")}
function editC(id){let c=channels().find(x=>x.id===id);["channelId","channelName","channelCategory","streamUrl","thumbUrl","channelDesc"].forEach((id,i)=>document.getElementById(id).value=i===0?c.id:i===1?c.name:i===2?c.cat:i===3?(c.stream||""):i===4?(c.thumb||""):(c.desc||""));uploadedThumb=c.thumb||"";showThumb(uploadedThumb);window.scrollTo({top:300,behavior:"smooth"})}
async function delC(id){if(!(await confirmAdminDelete()))return;localStorage.setItem("st_channels",JSON.stringify(channels().filter(c=>c.id!==id)));draw()}
function editSlide(id){let x=slides().find(v=>v.id===id);document.getElementById("slideId").value=x.id;document.getElementById("slideTitle").value=x.title;document.getElementById("slideSubtitle").value=x.subtitle||"";document.getElementById("slideStream").value=x.stream||"";document.getElementById("slideImageUrl").value=x.image||"";uploadedSlide=x.image||"";showSlide(uploadedSlide);window.scrollTo({top:0,behavior:"smooth"})}
async function delSlide(id){if(!(await confirmAdminDelete()))return;let ss=slides().filter(x=>x.id!==id);localStorage.setItem("st_slides",JSON.stringify(ss));draw()}
document.getElementById("channelForm").addEventListener("submit",e=>{e.preventDefault();let cs=channels(),id=Number(document.getElementById("channelId").value)||Date.now();let c={id,name:document.getElementById("channelName").value,cat:document.getElementById("channelCategory").value,stream:document.getElementById("streamUrl").value,thumb:uploadedThumb||document.getElementById("thumbUrl").value,desc:document.getElementById("channelDesc").value,logo:document.getElementById("channelName").value.split(" ").map(x=>x[0]).join("").slice(0,3).toUpperCase()};let ix=cs.findIndex(x=>x.id===id);ix>=0?cs[ix]=c:cs.push(c);localStorage.setItem("st_channels",JSON.stringify(cs));e.target.reset();document.getElementById("channelId").value="";uploadedThumb="";showThumb("");draw()});
document.getElementById("slideForm")?.addEventListener("submit",e=>{e.preventDefault();let ss=slides(),id=Number(document.getElementById("slideId").value)||Date.now();let x={id,title:document.getElementById("slideTitle").value.trim(),subtitle:document.getElementById("slideSubtitle").value.trim(),stream:document.getElementById("slideStream").value.trim(),image:uploadedSlide||document.getElementById("slideImageUrl").value.trim()};let ix=ss.findIndex(v=>v.id===id);ix>=0?ss[ix]=x:ss.push(x);localStorage.setItem("st_slides",JSON.stringify(ss));e.target.reset();document.getElementById("slideId").value="";uploadedSlide="";showSlide("");draw()});
document.getElementById("resetForm").onclick=()=>{document.getElementById("channelForm").reset();uploadedThumb="";showThumb("")};
document.getElementById("resetSlideForm")?.addEventListener("click",()=>{document.getElementById("slideForm").reset();document.getElementById("slideId").value="";uploadedSlide="";showSlide("")});
document.getElementById("resetChannels").onclick=()=>{localStorage.removeItem("st_channels");draw()};
document.getElementById("resetSlides")?.addEventListener("click",()=>{localStorage.removeItem("st_slides");draw()});draw();
