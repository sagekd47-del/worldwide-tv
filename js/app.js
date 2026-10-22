const CHANNEL_CATEGORIES=["Sports","Entertainment","Documentary","Religious","Kids","Movies","News","Music"];

/*
 ==========================================================
 CHANNEL CONFIGURATION
 ----------------------------------------------------------
 HAPA NDIPO UNAWEKA CHANNEL LOGO NA HLS STREAM LINK.

 logoImage: njia ya picha iliyopo ndani ya folder la assets
 stream: HLS link ya channel (mfano .m3u8)

 Example:
 logoImage:"assets/bbc-logo.jpg",
 stream:"https://your-server.example/live/channel.m3u8"
 ==========================================================
*/
const defaultChannels=[
 {id:1,name:"Food Network",cat:"Documentary",desc:"Welcome to Food Time!🍽️ Your ultimate destination for delicious, easy-to-make recipes that bring joy to your kitchen",logo:"FOOD",logoImage:"assets/foodtime-logo.png",stream:"https://streaming.aurora.enhanced.live/live/mpc/enl0eG1mLmVzcy5mZDj2eHI=/out/v1/IT_SIMULCAST/FOODNETWORK/CMAF/index.m3u8"},
 {id:2,name:"ITV Media",cat:"News",desc:"ITV plc is a major British Media Company based in London, England, that operates as a vertically intergrated prooducer, broadcaster and streaming giant.",logo:"ITV",logoImage:"assets/itv-logo.png",stream:"https://cdn10.live-tv.cloud/itvrv/abr-lq/playlist.m3u8"},
 {id:3,name:"Almere Tv",cat:"News",desc:"A television channel with a variety of programs including talk shows, sports, culture, business and news",logo:"ALM",logoImage:"assets/almere-logo.png",stream:"https://d3472rjicrodic.cloudfront.net/nlpo/clr-nlpo/709d5260/index.m3u8"},
 {id:4,name:"CTN",cat:"Religious",desc:"Christian Television Network (CTN), Is an American non-profit broadcast television network of small owned and operated stations that broadcasts religious programming.",logo:"CTN",logoImage:"assets/ctn-logo.png",stream:"https://video1.getstreamhosting.com:1936/8226/8226/playlist.m3u8"},
 {id:5,name:"CBN",cat:"Religious",desc:"The Christian Broadcasting Network is an American Christian media production and distribution organization founded in 1960 by televangelist Pat Robertson",logo:"CBN",logoImage:"assets/cbn-logo.jpg",stream:"https://2-fss-2.streamhoster.com/pl_138/200226-1359204-1/playlist.m3u8"},
 {id:6,name:"Christian Youth Channel",cat:"Religious",desc:"An English Coptic Christian channel, dedicated to Christians all around the world to spread the teachings and love of Jesus Christ",logo:"CYC",logoImage:"assets/cyc-logo.jpg",stream:"http://media3.smc-host.com:1935/cycnow.com/smil:cyc.smil/playlist.m3u8"},
 {id:7,name:"NICKELODEON",cat:"Kids",desc:"An American television channel and the flagship property of the Nickelodeon Group, a sub-division of the Paramount Media Networks division of Paramount Skydance",logo:"NICK",logoImage:"assets/nickelodeon-logo.png",stream:"http://198.58.104.90:8989/nickelodeon/index.m3u8"},
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
 {id:19,name:"BBC NEWS",cat:"News",desc:"",logo:"",logoImage:"assets/bbc-news.jpg",stream:"https://vs-hls-push-uk.live.fastly.md.bbci.co.uk/x=4/i=urn:bbc:pips:service:bbc_news_channel_hd/iptv_hd_abr_v1.m3u8"},
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
 {id:37,name:"Disney JR.",cat:"Kids",desc:"",logo:"",logoImage:"assets/disney-junior.jpg",stream:"http://151.80.18.177:86/Disney_Junior_HD/index.m3u8"},
 {id:38,name:"Arena Sport 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-1.jpg",stream:"http://88.212.15.19/live/test_arenasport/playlist.m3u8"},
 {id:39,name:"Arena Sport 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-2.png",stream:"http://88.212.15.19/live/test_arenasport_dva/playlist.m3u8"},
 {id:40,name:"Arena Sport 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-3.png",stream:"https://nl1.nghk.ai/ArenaSport3HD/index.m3u8"},
 {id:41,name:"Arena Sport 4",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-4.png",stream:"https://nl1.nghk.ai/ArenaSport4HD/index.m3u8"},
 {id:42,name:"Arena Sport 5",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-5.png",stream:"https://nl1.nghk.ai/ArenaSport5HD/index.m3u8"},
 {id:43,name:"Arena Sport 6",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-6.png",stream:"https://nl1.nghk.ai/ArenaSport6HD/index.m3u8"},
 {id:44,name:"Arena Sport 7",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-7.png",stream:"https://nl1.nghk.ai/ArenaSport7HD/index.m3u8"},
 {id:45,name:"Arena Sport 8",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-8.png",stream:"https://nl1.nghk.ai/ArenaSport8HD/index.m3u8"},
 {id:46,name:"Arena Sport 9",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-9.png",stream:"https://nl1.nghk.ai/AS9HRHD/index.m3u8"},
 {id:47,name:"Arena Sport 10",cat:"Sports",desc:"",logo:"",logoImage:"assets/arenasport-10.png",stream:"https://nl1.nghk.ai/AS10HRHD/index.m3u8"},
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
 {id:74,name:"Fox Deportes",cat:"Sports",desc:"",logo:"",logoImage:"assets/fox-deportes.png",stream:"https://cors-proxy.cooks.fyi/http://23.237.104.106:8080/USA_FOX_DEPORTES/index.m3u8"},
 {id:75,name:"FITE24",cat:"Sports",desc:"",logo:"",logoImage:"assets/fite-tv.png",stream:"https://d3d85c7qkywguj.cloudfront.net/scheduler/scheduleMaster/263.m3u8"},
 {id:76,name:"Esport3",cat:"Sports",desc:"",logo:"",logoImage:"assets/esport3.png",stream:"https://directes-tv-int.3catdirectes.cat/live-content/esport3-hls/master.m3u8"},
 {id:77,name:"Equidia",cat:"Sports",desc:"",logo:"",logoImage:"assets/equidia-logo.png",stream:"https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/equidia/live2.m3u8"},
 {id:78,name:"ATG HD",cat:"Sports",desc:"",logo:"",logoImage:"assets/atg-live.png",stream:"https://kanal75xto-llhls.akamaized.net/live/Data/atg-kanal-15-02a-rr/HLS-Legacy-HL/atg-kanal-15-02a-rr.m3u8"},
 {id:79,name:"AS3 Sport",cat:"Sports",desc:"",logo:"",logoImage:"assets/as3-sport.png",stream:"https://streamtv.as3sport.online:3394/hybrid/play.m3u8"},
 {id:80,name:"CGTN Doc",cat:"Documentary",desc:"",logo:"",logoImage:"assets/cgtn-doc.png",stream:"https://news.cgtn.com/resource/live/document/cgtn-doc.m3u8"},
 {id:81,name:"RT Documentary",cat:"Documentary",desc:"",logo:"",logoImage:"assets/rt-doc.png",stream:"https://rt-rtd.rttv.com/dvr/rtdoc/playlist.m3u8"},
 {id:82,name:"PeerTV South Tyrol",cat:"Documentary",desc:"",logo:"",logoImage:"assets/peersouth-tv.png",stream:"https://iptv.peer.biz/live/peertv-en.m3u8"},
 {id:83,name:"DW",cat:"News",desc:"",logo:"",logoImage:"assets/dw.png",stream:"https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"},
 {id:84,name:"CGTN News",cat:"News",desc:"",logo:"",logoImage:"assets/cgtn-doc.png",stream:"https://news.cgtn.com/resource/live/english/cgtn-news.m3u8"},
 {id:85,name:"NBC News NOW",cat:"News",desc:"",logo:"",logoImage:"assets/nbc-news.png",stream:"https://d1si3n1st4nkgb.cloudfront.net/10502/88896001/hls/master.m3u8?ads.xumo_channelId=88896001"},
 {id:86,name:"The Guardian",cat:"News",desc:"",logo:"",logoImage:"assets/guardian-news.png",stream:"https://rakuten-guardian-1-ie.samsung.wurl.tv/playlist.m3u8"},
 {id:87,name:"CBS News",cat:"News",desc:"",logo:"",logoImage:"assets/cbs-news.png",stream:"https://dai.google.com/linear/hls/event/Sid4xiTQTkCT1SLu6rjUSQ/master.m3u8"},
 {id:88,name:"India Today",cat:"News",desc:"",logo:"",logoImage:"assets/india-today.png",stream:"https://indiatodaylive.akamaized.net/hls/live/2014320/indiatoday/indiatodaylive/playlist.m3u8"},
 {id:89,name:"Taiwan+",cat:"News",desc:"",logo:"",logoImage:"assets/taiwan-plus.png",stream:"https://ythls.armelin.one/channel/UC7c6rvyAZLpKGk8ttVnpnLA.m3u8"},
 {id:90,name:"Global News",cat:"News",desc:"",logo:"",logoImage:"assets/global-news.png",stream:"https://live.corusdigitaldev.com/groupd/live/49a91e7f-1023-430f-8d66-561055f3d0f7/live.isml/.m3u8"},
 {id:91,name:"USA Today",cat:"News",desc:"",logo:"",logoImage:"assets/usa-today.png",stream:"https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg00731-gannettcoinc-usatodaynews-plex/playlist.m3u8"},
 {id:92,name:"CNN International",cat:"News",desc:"",logo:"",logoImage:"assets/cnn-inter.png",stream:"https://turnerlive.warnermediacdn.com/hls/live/586495/cnngo/cnn_slate/VIDEO_0_3564000.m3u8"},
 {id:93,name:"SKY News (AU)",cat:"News",desc:"",logo:"",logoImage:"assets/sky-news.png",stream:"https://i.mjh.nz/sky-news-now.m3u8"},
 {id:94,name:"KSA Sports 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/ksa-sport1.png",stream:"https://edge.taghtia.com/sa/9.m3u8"},
 {id:95,name:"KSA Sports 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/ksa-sport2.png",stream:"https://edge.taghtia.com/sa/10.m3u8"},
 {id:96,name:"KSA Sports 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/ksa-sport3.png",stream:"https://edge.taghtia.com/sa/16.m3u8"},
 {id:97,name:"Rotana Music",cat:"Music",desc:"",logo:"",logoImage:"assets/rotana-music.png",stream:"https://rotana.hibridcdn.net/rotananet/music_net-7Y83PP5adWixDF93/playlist.m3u8"},
 {id:98,name:"Cartoonito",cat:"Kids",desc:"",logo:"",logoImage:"assets/cartoonito.png",stream:"http://tvstarlife.com:25461/live/cesar/cesar123/207.m3u8"},
 {id:99,name:"DELUXE MUSIC",cat:"Music",desc:"",logo:"",logoImage:"assets/deluxe-music.png",stream:"https://sdn-global-live-streaming-packager-cache.3qsdn.com/13456/13456_264_live.m3u8"},
 {id:100,name:"AzamOne",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/aza1.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIyMTgiLCJ0cCI6InRwMSIsImV4cCI6MTgxNTg2Mjc0MCwiZG9tIjoiaXB0di5tb2thbmUudWsifQ.f3uKD-KEclx-FgwFED0OH6nJPgnEeFvh9xN4NNL3Wv0/azam-one.hls"},
 {id:101,name:"AzamTwo",cat:"Entertainment",desc:"",logo:"",logoImage:"assets/aza2.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIyMTYiLCJ0cCI6InRwMSIsImV4cCI6MTgxNTg2Mjc0MCwiZG9tIjoiaXB0di5tb2thbmUudWsifQ.GWiJleH1WkeN4uJBmGnF-q2rsM0LzZzzckdj18LJ6h4/azam-two.hls"},
 {id:102,name:"AzamSport 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/aza-sport1.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxOTkiLCJ0cCI6InRwMSIsImV4cCI6MTgxNTg2Mjc0MCwiZG9tIjoiaXB0di5tb2thbmUudWsifQ.u9crLd3n5ouEZK0gWgwkbJpxwz7GrrD4EaLDnWCRzQg/sports-1.hls"},
 {id:103,name:"AzamSport 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/aza-sport2.png",stream:""},
 {id:104,name:"AzamSport 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/aza-sport3.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIyOCIsInRwIjoidHAxIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.kXolb1kTnOouLbxFWWlqRjv9mH_mHbB3oFS9Qi9U424/sports-3.hls"},
 {id:105,name:"AzamSport 4",cat:"Sports",desc:"",logo:"",logoImage:"assets/aza-sport4.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIyMTMiLCJ0cCI6InRwMSIsImV4cCI6MTgxNTg2Mjc0MCwiZG9tIjoiaXB0di5tb2thbmUudWsifQ.I3l0DgmTBaQzlLkMPyt4sPTsNNaOyXxEfjWnfFVPKoE/sports-4.hls"},
 {id:106,name:"AzamSport 5",cat:"Sports",desc:"",logo:"",logoImage:"assets/aza-sport5.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxOTc3MSIsInRwIjoidHAxIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.sq9ALUUoOMDkM-TXKth_a5gFoVf8ydrcs6KHLp0kiiE/azm-sports-5.hls"},
 {id:107,name:"UTV",cat:"News",desc:"",logo:"",logoImage:"assets/aza-utv.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIyMTciLCJ0cCI6InRwMSIsImV4cCI6MTgxNTg2Mjc0MCwiZG9tIjoiaXB0di5tb2thbmUudWsifQ.ZJO_FpY-VhetnJ5lGs1OxFvUJPIVbMK49kIClLirMsQ/utv.hls"},
 {id:108,name:"Sinema Zetu",cat:"Movies",desc:"",logo:"",logoImage:"assets/sinema-zetu.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIyMTQiLCJ0cCI6InRwMSIsImV4cCI6MTgxNTg2Mjc0MCwiZG9tIjoiaXB0di5tb2thbmUudWsifQ.i4XRC5m9YqI4QVkBzTU4DBCnu5oV5Ff-YeqlJavwYdI/sinema.hls"},
 {id:109,name:"Bein Sports Extra",cat:"Sports",desc:"",logo:"",logoImage:"assets/bein-xtra.png",stream:"https://bein-xtra-xumo.amagi.tv/hls/amagi_hls_data_beinAAAAA-bein-xtra-xumoA/CDN/master.m3u8"},
 {id:110,name:"MMA-TV",cat:"Sports",desc:"",logo:"",logoImage:"assets/mma-tv.png",stream:"https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8"},
 {id:111,name:"X-SPORT",cat:"Sports",desc:"",logo:"",logoImage:"assets/x-sports.png",stream:"http://iptv.prosto.tv:7000/ch109/video.m3u8"},
 {id:112,name:"X-SPORT HD",cat:"Sports",desc:"",logo:"",logoImage:"assets/x-sport-hd.png",stream:"http://iptv.prosto.tv:7000/ch110/video.m3u8"},
 {id:113,name:"Canal 11",cat:"Sports",desc:"",logo:"",logoImage:"assets/canal-11.png",stream:"https://ythls.armelin.one/channel/UCMfEEaNYYX5w6nbvccTCHhg.m3u8"},
 {id:114,name:"Canal Motor",cat:"Sports",desc:"",logo:"",logoImage:"assets/canal-motor.png",stream:"https://digicom.hls.iptvdc.com/canalmotor/index.m3u8"},
 {id:115,name:"M-Net Sport",cat:"Sports",desc:"",logo:"",logoImage:"assets/mnet.png",stream:"http://ares.mnet.mk/hls/mnet-sport.m3u8"},
 {id:116,name:"Real Madrid TV",cat:"Sports",desc:"",logo:"",logoImage:"assets/madrid-tv.png",stream:"https://rmtv.akamaized.net/hls/live/2043154/rmtv-en-web/master.m3u8"},
 {id:117,name:"Dazn Combat",cat:"Sports",desc:"",logo:"",logoImage:"assets/dazn-combat.png",stream:"https://dazn-combat-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-dazn-combat-rakuten/CDN/master.m3u8"},
 {id:118,name:"Fubo Sports Network",cat:"Sports",desc:"",logo:"",logoImage:"assets/fubo-sport.png",stream:"https://playout.fubo.tv/plex/3.m3u8"},
 {id:119,name:"Sportsgrid (US)",cat:"Sports",desc:"",logo:"",logoImage:"assets/sports-grid.png",stream:"https://cdn-uw2-prod.tsv2.amagi.tv/linear/sportsgri-sportsgrid-lgus/playlist.m3u8"},
 {id:120,name:"ACCDN",cat:"Sports",desc:"",logo:"",logoImage:"assets/accdn.png",stream:"https://raycom-accdn-firetv.amagi.tv/playlist.m3u8"},
 {id:121,name:"Movie Network (US)",cat:"Movies",desc:"",logo:"",logoImage:"assets/movie-network.png",stream:"https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00500-studiocitypictu-mytime-lgus/playlist.m3u8"},
 {id:122,name:"Trace Urban (UK)",cat:"Music",desc:"",logo:"",logoImage:"assets/trace-uk.png",stream:"https://cdn-uw2-prod.tsv2.amagi.tv/linear/tracetvAA-trace-urban-lg-uk/playlist.m3u8"},
 {id:123,name:"Fazal Tv",cat:"Religious",desc:"",logo:"",logoImage:"assets/fazal-tv.png",stream:"http://cdn9.live247stream.com/punjabitvcanada/tv/playlist.m3u8"},
 {id:124,name:"FB Tv",cat:"Sports",desc:"",logo:"",logoImage:"assets/fb-tv.png",stream:"http://1hskrdto.rocketcdn.com/fenerbahcetv.smil/playlist.m3u8"},
 {id:125,name:"Fun Roads",cat:"Documentary",desc:"",logo:"",logoImage:"assets/fun-road.png",stream:"http://104.143.4.5:2080/funroads.m3u8"},
 {id:126,name:"FUEL Tv",cat:"Sports",desc:"",logo:"",logoImage:"assets/fuel-tv.png",stream:"https://amg01074-fueltv-fueltvemeaen-rakuten-b6j62.amagi.tv/hls/amagi_hls_data_rakutenAA-fueltvemeaen/CDN/master.m3u8"},
 {id:127,name:"Inter Tv",cat:"Sports",desc:"",logo:"",logoImage:"assets/inter-tv.png",stream:"https://ilglobotv-live.akamaized.net/channels/InterTV/Live.m3u8"},
 {id:128,name:"DD Sports",cat:"Sports",desc:"",logo:"",logoImage:"assets/dd-sports-in.png",stream:"http://103.78.149.54:8000/play/a02i/index.m3u8"},
 {id:129,name:"MNB Sport",cat:"Sports",desc:"",logo:"",logoImage:"assets/mnb-sport.png",stream:"https://cdn4.skygo.mn/live/disk1/MNBSport/DASH-FTA/MNBSport.mpd"},
 {id:130,name:"Premier Sports 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/ps-1.png",stream:"http://cdn4.skygo.mn/live/disk1/SPSPrime/HLS-FTA/SPSPrime.m3u8"},
 {id:131,name:"Premier Sports 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/ps-2.png",stream:"https://cdn4.skygo.mn/live/disk1/SPSPlay/HLS-FTA/SPSPlay.m3u8"},
 {id:132,name:"Premier Sports 4",cat:"Sports",desc:"",logo:"",logoImage:"assets/ps-4.png",stream:"http://cdn4.skygo.mn/live/disk1/SPSFight/HLS-FTA/SPSFight.m3u8"},
 {id:133,name:"Premier Sports 5",cat:"Sports",logo:"",logoImage:"assets/ps-5.png",stream:"http://cdn4.skygo.mn/live/disk1/SPSPlus/HLS-FTA/SPSPlus.m3u8"},
 {id:134,name:"PRO International",cat:"Sports",desc:"",logo:"",logoImage:"assets/pro-tv.png",stream:"https://proshls.wns.live/hls/stream.m3u8"},
 {id:135,name:"Rai Sport HD",cat:"Sports",desc:"",logo:"",logoImage:"assets/rai-sport.png",stream:"https://viamotionhsi.netplus.ch/live/eds/raisport1/browser-dash/raisport1.mpd"},
 {id:136,name:"Realitatea Sportiva",cat:"Sports",desc:"",logo:"",logoImage:"assets/real-itatea.png",stream:"https://stream.realitatea.net/realitatea/sportiva_md/ts:playlist.m3u8"},
 {id:137,name:"World Sport",cat:"Sports",desc:"",logo:"",logoImage:"assets/world-sport.png",stream:"https://mainstreammedia-worldoffreesportsintl-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-mainstreammediafreesportsintl-rakuten/CDN/master.m3u8"},
 {id:138,name:"AfroBeats TV",cat:"Music",desc:"",logo:"",logoImage:"assets/afrobeat-tv.png",stream:"https://stream.ecable.tv/afrobeats/tracks-v1a1/mono.m3u8"},
 {id:139,name:"Trace Urban HD",cat:"Music",desc:"",logo:"",logoImage:"assets/trace-hd.png",stream:"https://lightning-traceurban-samsungau.amagi.tv/playlist1080p.m3u8"},
 {id:140,name:"CMC Tv",cat:"Music",desc:"",logo:"",logoImage:"assets/cmc-tv.png",stream:"https://stream.cmctv.hr:49998/cmc/live.m3u8"},
 {id:141,name:"Sol Música",cat:"Music",desc:"",logo:"",logoImage:"assets/sol-musica.png",stream:"https://d2glyu450vvghm.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-21u4g5cjglv02/sm.m3u8"},
 {id:142,name:"Trace Urban",cat:"Music",desc:"",logo:"",logoImage:"assets/trace-urban.png",stream:"https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-traceurban-samsungnz/playlist.m3u8"},
 {id:143,name:"Wanasah",cat:"Music",desc:"",logo:"",logoImage:"assets/wanasah-tv.png",stream:"https://shls-wanasah-prod-dub.shahid.net/out/v1/c84ef3128e564b74a6a796e8b6287de6/index.m3u8"},
 {id:144,name:"MN Music",cat:"Music",desc:"",logo:"",logoImage:"assets/mn-music.png",stream:"http://mntv.livebox.co.in/musichls/live.m3u8"},
 {id:145,name:"France 24",cat:"News",desc:"",logo:"",logoImage:"assets/france24.png",stream:"https://amg00106-france24-france24-samsunguk-qvpp8.amagi.tv/playlist/amg00106-france24-france24-samsunguk/playlist.m3u8"},
 {id:146,name:"Estrella News",cat:"News",desc:"",logo:"",logoImage:"assets/estrella-tv.png",stream:"https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00567-estrellamedia-estrellanews-lgus/playlist.m3u8"},
 {id:147,name:"DAZN 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/dazn1.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMDczNSIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.Gxi_cAdv985P1-KbxhK27xyjG3_Cb8E-SavR3fxrQms/dazn-1.hls"},
 {id:148,name:"DAZN 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/dazn2.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMDczNiIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.ZrD4vlpMHyTqgM-LtNCPMsy_hSoGEkZKv3_eyirlf10/dazn-2.hls"},
 {id:149,name:"DAZN 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/dazn3.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/5591.ts"},
 {id:150,name:"DAZN 4",cat:"Sports",desc:"",logo:"",logoImage:"assets/dazn4.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMDc0MSIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.3KUHxOkmUfgtDRDi0kECLj7HswGqa8fQ51HtL4wM_Ys/dazn-4.hls"},
 {id:151,name:"DAZN LALIGA 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/dazn-laliga1.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/25125.ts"},
 {id:152,name:"DAZN LALIGA 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/dazn-laliga2.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/25127.ts"},
 {id:153,name:"SUPER SPORTS ACTION",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-action.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMTg5NiIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.nqY8vsb5BbDE93V5kOrZXaDGpH98DTWdYJxMV8J2vIM/ss-action.hls"},
 {id:154,name:"SUPER SPORT PSL",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-psl.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMTg4NyIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.95PIKE2Fynl9QeIeShyohRy2W02JfWotpZYQHXM1Xfk/ss-premier-league.hls"},
 {id:155,name:"SUPER SPORT LALIGA",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-laliga.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMTg4OCIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.s2NMLNVpTr4-h-Gp9Xahsp-4tTV4f2outclSXtf3cOs/ss-la-liga.hls"},
 {id:156,name:"EUROSPORT 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/e-sport1.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29929.ts"},
 {id:157,name:"EUROSPORT 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/e-sport2.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29928.ts"},
 {id:158,name:"SPORT EXTRA 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-extra1.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29685.ts"},
 {id:159,name:"SPORT EXTRA 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-extra2.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29684.ts"},
 {id:160,name:"SPORT EXTRA 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-extra3.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29683.ts"},
 {id:161,name:"SPORT EXTRA 4",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-extra4.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29682.ts"},
 {id:162,name:"BT SPORT 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/bt-spo1.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29689.ts"},
 {id:163,name:"BT SPORT 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/bt-spo2.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29688.ts"},
 {id:164,name:"BT SPORT 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/bt-spo3.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29687.ts"},
 {id:165,name:"Nick Jr",cat:"Kids",desc:"",logo:"",logoImage:"assets/nick-jr.png",stream:"https://jmp2.uk/plu-5ca6748a37b88b269472dad9.m3u8"},
 {id:166,name:"Discovery Science",cat:"Documentary",desc:"",logo:"",logoImage:"assets/discovery-science.png",stream:"http://tv.minhalista.me/live/76MzsZCaAm/factoryiptv/93030.ts"},
 {id:167,name:"SUPER SPORT VARIETY 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-variety1.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29738.ts"},
 {id:168,name:"SUPER SPORT VARIETY 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-variety2.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29741.ts"},
 {id:169,name:"SUPER SPORT VARIETY 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-variety3.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29737.ts"},
 {id:170,name:"SUPER SPORT VARIETY 4",cat:"Sports",desc:"",logo:"",logoImage:"assets/s-variety4.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/29734.ts"},
 {id:171,name:"BEIN ARAB 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/b-spo1.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/25113.ts"},
 {id:172,name:"BEIN ARAB 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/b-spo2.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/25114.ts"},
 {id:173,name:"BEIN ARAB 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/b-spo3.png",stream:"http://flysilo.top:8080/live/321668264176020045/6571668264176020/25115.ts"},
 {id:174,name:"Cartoon Network",cat:"Kids",desc:"",logo:"",logoImage:"assets/cn-kids.png",stream:"http://103.167.167.5:8111/play/a00x/index.m3u8"},
 {id:175,name:"PBS Kids",cat:"Kids",desc:"",logo:"",logoImage:"assets/pbs-kids.png",stream:"http://ys-users.com:8080/turneradt@gmail.com/S2PEcrwpdm/418040"},
 {id:176,name:"Discovery Kids",cat:"Kids",desc:"",logo:"",logoImage:"assets/dicovery-kids.png",stream:"http://190.60.37.69:8015/play/a00y/index.m3u8"},
 {id:177,name:"Tanzania Safari Channel",cat:"Documentary",desc:"",logo:"",logoImage:"assets/tz-safar.png",stream:"https://stream-134630.castr.net/5fe35eae8c53540cab83659a/live_31dabe40323511f08b8efff0016f3b67/index.m3u8"},
 {id:178,name:"Pluto Movies",cat:"Movies",desc:"",logo:"",logoImage:"assets/p-movies.png",stream:"https://jmp2.uk/plu-62ba60f059624e000781c436.m3u8"},
 {id:179,name:"KIX",cat:"Movies",desc:"",logo:"",logoImage:"assets/kix.png",stream:"https://iptv.mokane.uk/s/tp1/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIyMjIiLCJ0cCI6InRwMSIsImV4cCI6MTgxNTg2Mjc0MCwiZG9tIjoiaXB0di5tb2thbmUudWsifQ.1xfxdRmV0iGEcKYl__3Lj9EU93a6YqrgKCOeZoVjDIU/kix.hls"},
 {id:180,name:"Studio Universal",cat:"Movies",desc:"",logo:"",logoImage:"assets/studio-uni.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMTg3OSIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.8LZ8eDbA3h6-6JMkx-cDg1SZ_IlUxCHBccZKkW1cxpU/studio-universal.hls"},
 {id:181,name:"TNT Sports 1",cat:"Sports",desc:"",logo:"",logoImage:"assets/tnt-spo1.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMTYyMyIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.2LbodL_nnyT2kMVOGXH7A3_UtiKw3JFz1f-08mdQ--Y/tnt-sports-1.hls"},
 {id:182,name:"TNT Sports 2",cat:"Sports",desc:"",logo:"",logoImage:"assets/tnt-spo2.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIyNDQzNSIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.Hm--S3gxVvwy1SUOcGBJoLELjPOkejSgumIorkLZEno/tnt-sports-2.hls"},
 {id:183,name:"TNT Sports 3",cat:"Sports",desc:"",logo:"",logoImage:"assets/tnt-spo3.png",stream:"https://iptv.mokane.uk/s/tp2/eyJwaWQiOiIyMzY0OWE5OGVmMmMyNmQ4ZjY3NzM0NmYiLCJzaWQiOiIxMTYyNSIsInRwIjoidHAyIiwiZXhwIjoxODE1ODYyNzQwLCJkb20iOiJpcHR2Lm1va2FuZS51ayJ9.sHuhw0GX95DCPydQEFC9Qkb-eB1zPD-MNeFneg6NnLs/tnt-sports-3.hls"},
 {id:184,name:"Trace Mziki",cat:"Music",desc:"",logo:"",logoImage:"assets/trace-mziki.png",stream:"https://channels.trace.plus/Traceprod/MZIKI_hd/index.m3u8"},
 {id:185,name:"Trace Gospel",cat:"Music",desc:"",logo:"",logoImage:"assets/trace-gosp.png",stream:"https://channels.trace.plus/Traceprod/GOSPEL_ROA_hd/index.m3u8"},
 {id:186,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:187,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:188,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:189,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:190,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:191,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:192,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:193,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:194,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:195,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""},
 {id:196,name:"",cat:"",desc:"",logo:"",logoImage:"assets/",stream:""}
];
function getChannels(){try{const saved=JSON.parse(localStorage.getItem("st_channels")||"null");return Array.isArray(saved)&&saved.length?saved:defaultChannels}catch(e){return defaultChannels}}
function saveChannels(x){localStorage.setItem("st_channels",JSON.stringify(x))}

const defaultSlides=[
{id:101,title:"Welcome to SavageTech TV",subtitle:"Fast & Reliable Service • Watch your favourite tv channels Anywhere, Anytime at Any place",image:"assets/slider-welcome.png",stream:"https://qvc-amd-live.akamaized.net/hls/live/2034113/isqvc1us/master.m3u8"},
{id:102,title:"Live TV, Movies & Sports",subtitle:"Your entertainment, all in one place",image:"assets/live-slider.png",stream:"https://qvc-amd-live.akamaized.net/hls/live/2034113/isqvc1us/master.m3u8"},
{id:103,title:"The Hard Way",subtitle:"After learning of his brother's death on a mission in Romania, a former soldier sets off with two allies to hunt down a mysterious enemy and exact revenge.",image:"assets/slider-hard.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/34137.mkv"},
{id:104,title:"TEARS OF STEEL",subtitle:"In the future, a team of scientists and warriors gathered at the Oude Kerk, an old building in Amsterdam, to stage an event from the past to save the world from destructive robots",image:"assets/slider-tears.jpg",stream:"https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"},
{id:105,title:"Ticket To Paradise",subtitle:"A man and his ex-wife race to Bali, Indonesia, to stop their daughter from marrying a seaweed farmer. As they desperately try to sabotage the wedding, the bickering duo soon find themselves rekindling old feelings that once made them happy together.",image:"assets/slider-paradise.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/54240.mkv"},
{id:106,title:"Sintel",subtitle:"The emotionally intense, 15-minute film follows a lonely young woman named Sintel who embarks on a grueling, multi-year quest across dangerous lands to rescue Scales, a baby dragon she nursed back to health after it was violently abducted by an adult dragon.",image:"assets/slider-sintel.jpg",stream:"https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"},
{id:107,title:"The Empty Man",subtitle:"When a young mysteriously disappears, James Lasombra, a former police officer, sets out to investigate the matter. In the process, he stumbles upon a dangerous cult that summons a demon.",image:"assets/slider-empty.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/34096.mkv"},
{id:108,title:"Dark Cloud",subtitle:"Following an accident, a woman voluntarily becomes a test subject for artificial intelligence designed to rehabilitate her. In a world dependent on machines, she learns not all technological advancement has humanity's best interests in mind.",image:"assets/slider-dark.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/53920.mkv"},
{id:109,title:"Deep Water",subtitle:"A well-to-do husband who allows his wife to have affairs in order to avoid a divorce becomes a prime suspect in the disappearance of her lovers.",image:"assets/slider-deep.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/53925.mkv"},
{id:110,title:"Dead For A Dollar",subtitle:"Veteran bounty hunter Max Borlund heads deep into Mexican territory to find and return Rachel Kidd, the wife of a wealthy businessman.",image:"assets/slider-dead.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/53922.mkv"},
{id:111,title:"Family Squares",subtitle:"Secrets erupt and tensions rise when a dysfunctional family isolated from each other is force to unite in the wake of the matriarch's sudden death.",image:"assets/slider-family.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/53953.mkv"},
{id:112,title:"How I Fell in Love with a Gangster",subtitle:"A mysterious woman tells of the ups and downs in the life of Nikodem 'Nikos' Skotarczak, one of the biggest gangsters in Polish history, but fact and fiction become muddled as the story becomes darker.",image:"assets/slider-gangster.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/53996.mkv"},
{id:113,title:"Jackass Forever",subtitle:"Brimming with hilariously dangerous antics and stunts, a group of daredevil pranksters attempts to bring about a fresh wave of comical situations.",image:"assets/slider-jackass.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/54007.mkv"},
{id:114,title:"Last Survivors",subtitle:"A man and his son who have managed to live away from people for two whole decades feel threatened when a stranger enters the picture.",image:"assets/slider-survivors.png",stream:"http://flysilo.top:8080/movie/321668264176020045/6571668264176020/54017.mkv"},
{id:115,title:"Elephants Dream",subtitle:"The surreal, 11-minute film follows two characters an eccentric older man named Proog and a skeptical younger man named Emo as they wander through a chaotic, infinite, and unpredictable industrial machine world. Proog acts as an enthusiastic guide, trying to show off the wonders and mechanics of the world.",image:"assets/slider-dream.jpg",stream:"https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"}
];
function getSlides(){return JSON.parse(localStorage.getItem("st_slides")||"null")||defaultSlides}
function renderFeaturedSlider(){
 const wrap=document.getElementById("featuredSlides"), content=document.getElementById("featuredContent"), dots=document.getElementById("heroDots");
 if(!wrap||!content||!dots)return; let ss=getSlides(); if(!ss.length){wrap.innerHTML='<div class="featured-slide fallback-slide active"></div>';content.innerHTML='<span class="eyebrow"><i></i> SAVAGETECH TV</span><h1>Watch your favourite<br><span>channels anytime.</span></h1>';dots.innerHTML='';return}
 let current=0;
 wrap.innerHTML=ss.map((x,i)=>`<div class="featured-slide ${i===0?'active':''}" ${x.image?`style="background-image:url('${escapeHtml(x.image)}')"`:''}></div>`).join('');
 function paint(){const x=ss[current];wrap.querySelectorAll('.featured-slide').forEach((el,i)=>el.classList.toggle('active',i===current));content.innerHTML=`<span class="eyebrow"><i></i> FEATURED</span><h1>${escapeHtml(x.title)}</h1><p>${escapeHtml(x.subtitle||'Watch live on SavageTech TV')}</p><div class="hero-buttons"><a class="primary-btn" href="player.html?slide=${x.id}">▷ Watch Now</a><a class="ghost-btn" href="#live">Explore Channels</a></div>`;dots.innerHTML=ss.map((_,i)=>`<button aria-label="Go to slide ${i+1}" class="${i===current?'active':''}" data-slide="${i}"></button>`).join('');dots.querySelectorAll('button').forEach(b=>b.onclick=()=>{current=Number(b.dataset.slide);paint()})}
 paint(); if(ss.length>1)setInterval(()=>{current=(current+1)%ss.length;paint()},5000);
}

function card(c){
 const hasThumb=!!c.thumb;
 const logoImage=(c.logoImage||"").trim();
 return `<a class="channel-card" href="player.html?id=${c.id}" data-name="${c.name.toLowerCase()}"><div class="thumb${hasThumb?" has-image":""}">${hasThumb?`<img class="thumb-image" src="${escapeHtml(c.thumb)}" alt="${escapeHtml(c.name)}" onerror="this.closest('.thumb').classList.remove('has-image');this.remove()">`:""}<span class="live">● LIVE</span><span class="hd">HD</span>${logoImage?`<img class="channel-logo-image" src="${escapeHtml(logoImage)}" alt="${escapeHtml(c.name)} logo" onerror="this.remove()">`:`<strong class="channel-logo">${escapeHtml(c.logo||"TV")}</strong>`}</div><div class="card-info"><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.desc||c.cat)}</p></div></a>`
}
function renderHome(){
 let cs=getChannels();
 const grid=document.getElementById("channelGrid"), tabs=document.getElementById("categoryTabs"), sections=document.getElementById("categorySections");
 if(grid){
   let active="All";
   const drawAll=()=>{let visible=active==="All"?cs:cs.filter(c=>c.cat===active);grid.innerHTML=visible.length?visible.map(card).join(""):`<div class="empty-state">No ${active} channels added yet.</div>`;};
   if(tabs){tabs.innerHTML=["All",...CHANNEL_CATEGORIES].map((cat,i)=>`<button class="category-tab ${i===0?'active':''}" data-category="${cat}">${cat==='All'?'All +':cat}</button>`).join("");tabs.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{active=btn.dataset.category;tabs.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===btn));drawAll()}));}
   drawAll();
   // Filters button: open a category filter panel and filter the channel grid.
   const filterBtn=document.getElementById("filterBtn"), filterPanel=document.getElementById("filterPanel"), filterOptions=document.getElementById("filterOptions"), filterClose=document.getElementById("filterClose"), filterClear=document.getElementById("filterClear");
   if(filterBtn&&filterPanel&&filterOptions){
     filterOptions.innerHTML=["All",...CHANNEL_CATEGORIES].map(cat=>`<button type="button" class="filter-option ${cat===active?'active':''}" data-filter-category="${cat}">${cat==='All'?'All Channels':cat}</button>`).join('');
     const closeFilters=()=>{filterPanel.hidden=true;filterBtn.setAttribute("aria-expanded","false")};
     filterBtn.addEventListener("click",()=>{const open=filterPanel.hidden;filterPanel.hidden=!open;filterBtn.setAttribute("aria-expanded",String(open));});
     filterClose?.addEventListener("click",closeFilters);
     filterClear?.addEventListener("click",()=>{active="All";tabs?.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x.dataset.category==="All"));filterOptions.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x.dataset.filterCategory==="All"));drawAll();closeFilters();});
     filterOptions.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{active=btn.dataset.filterCategory;tabs?.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x.dataset.category===active));filterOptions.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===btn));drawAll();closeFilters();document.getElementById("live")?.scrollIntoView({behavior:"smooth",block:"start"});}));
   }
 }
 if(sections){
   sections.innerHTML=CHANNEL_CATEGORIES.map(cat=>{let items=cs.filter(c=>c.cat===cat);return `<section id="category-${cat}" class="section dynamic-category"><div class="section-head"><div><span class="section-kicker">${cat.toUpperCase()}</span><h2>${cat==='Kids'?"Kid's":cat}</h2></div><span class="category-count">${items.length} channel${items.length===1?'':'s'}</span></div><div class="channel-grid">${items.length?items.map(card).join(""):`<div class="empty-state">No channels in this category yet. Add one from Admin Dashboard.</div>`}</div></section>`}).join("");
 }
}

/* ==========================================================
   CHANNEL SEARCH
   Searches channel name, category and description. Results
   are rendered in the main channel grid and category tabs.
========================================================== */
function initChannelSearch(){
  const input=document.getElementById("searchInput");
  const grid=document.getElementById("channelGrid");
  const tabs=document.getElementById("categoryTabs");
  if(!input || !grid) return;

  let activeCategory="All";
  const normalize=v=>String(v||"").toLowerCase().trim();

  function draw(){
    const q=normalize(input.value);
    const channels=getChannels();
    const filtered=channels.filter(c=>{
      const matchesCategory=activeCategory==="All" || c.cat===activeCategory;
      if(!matchesCategory) return false;
      if(!q) return true;
      return [c.name,c.cat,c.desc].some(v=>normalize(v).includes(q));
    });

    grid.innerHTML=filtered.length
      ? filtered.map(card).join("")
      : `<div class="empty-state">No channels found for "${escapeHtml(input.value.trim())}".</div>`;

    grid.classList.toggle("search-active", !!q);
  }

  input.addEventListener("input",draw);
  input.addEventListener("keydown",e=>{
    if(e.key==="Enter"){ e.preventDefault(); draw(); }
    if(e.key==="Escape"){ input.value=""; draw(); input.blur(); }
  });

  if(tabs){
    tabs.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click",()=>{
        activeCategory=btn.dataset.category||"All";
        draw();
      });
    });
  }

  window.addEventListener("storage",e=>{
    if(e.key==="st_channels") draw();
  });
  draw();
}

function splash(){
 const s=document.getElementById("splashScreen"),bar=document.getElementById("loadingBar"),pct=document.getElementById("loadingPercent");
 if(!s)return;
 const page=location.pathname.split("/").pop()||"index.html";
 const key=`st_splash_${page}`;
 if(sessionStorage.getItem(key)==="1"){s.remove();return;}
 const duration=7000,start=performance.now();
 function tick(now){const p=Math.max(1,Math.min(100,Math.floor(((now-start)/duration)*100)+1));bar.style.width=p+"%";pct.textContent=p+"%";if(p<100)requestAnimationFrame(tick);else{sessionStorage.setItem(key,"1");setTimeout(()=>s.classList.add("hide"),180)}}
 requestAnimationFrame(tick);
}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function getUser(){try{return JSON.parse(localStorage.getItem("st_user")||"null")}catch(e){return null}}
function updateAuthUI(){
 const u=getUser();
 document.querySelectorAll("[data-user-name]").forEach(el=>el.textContent=u?.username||u?.name||"Guest");
 const login=document.getElementById("loginBtn"); if(login){login.textContent=u?"Settings":"Sign in"; login.href=u?"settings.html":"login.html";}
 const dl=document.getElementById("downloadTopBtn"); if(dl) dl.href="download.html";
}


/* ==========================================================
   SAVAGETECH UNIVERSAL STREAM PLAYER
   Supports:
   - HLS .m3u8 (HTTP + HTTPS)
   - MPEG-DASH .mpd (HTTP + HTTPS)
   - MPEG-TS .ts (server-side FFmpeg -> HLS)
   - Native browser media as a fallback
   IMPORTANT: A browser cannot natively play raw MPEG-TS. The
   included Node server converts .ts to HLS when needed.
========================================================== */
function player(){
  const video=document.getElementById("videoPlayer");
  if(!video) return;

  const params=new URLSearchParams(location.search);
  const id=params.get("id"), slideId=params.get("slide");
  const channels=getChannels();
  const slide=slideId ? getSlides().find(x=>String(x.id)===String(slideId)) : null;
  const channel=id ? channels.find(x=>String(x.id)===String(id)) : null;
  const item=channel || slide || channels.find(x=>x.stream) || {};
  const stream=String(item.stream||"").trim();

  const shell=document.getElementById("playerShell");
  const placeholder=document.getElementById("videoPlaceholder");
  const status=document.getElementById("playerStatus");
  const errorBox=document.getElementById("playerError");
  const title=document.getElementById("playerTitle");
  const watchName=document.getElementById("watchName");
  const watchDesc=document.getElementById("watchDesc");
  const playBtn=document.getElementById("playBtn");
  const muteBtn=document.getElementById("muteBtn");
  const fullscreenBtn=document.getElementById("fullscreenBtn");
  const pipBtn=document.getElementById("pipBtn");
  const subtitleBtn=document.getElementById("subtitleBtn");
  const subtitleMenu=document.getElementById("subtitleMenu");
  const subtitleOptions=document.getElementById("subtitleOptions");
  const settingsBtn=document.getElementById("settingsBtn");
  const settingsMenu=document.getElementById("settingsMenu");
  const qualityOptions=document.getElementById("qualityOptions");
  const progressFill=document.getElementById("progressFill");
  const progressTrack=document.getElementById("progressTrack");
  const bigPlayOrb=document.getElementById("bigPlayOrb");
  const moreGrid=document.getElementById("moreGrid");

  let hls=null, dash=null, currentObjectUrl=null, retryTimer=null, tracks=[];
  const isLocalServer=location.protocol==="http:" || location.protocol==="https:";

  // VOD resume: remember a finite-duration video position for 30 minutes.
  // Live streams are ignored because their duration is normally Infinity.
  const VOD_RESUME_TTL = 30 * 60 * 1000;
  const resumeKey = `st_vod_resume:${item.id ?? id ?? slideId ?? "unknown"}:${stream}`;
  let resumeRestored = false;
  let lastResumeWrite = 0;
  const serverBase=isLocalServer ? location.origin : "";
  const esc=window.escapeHtml || (v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])));

  function extOf(url){
    try{
      const p=new URL(url,location.href).pathname.toLowerCase();
      if(p.endsWith(".m3u8") || p.endsWith(".hls")) return "hls";
      if(p.endsWith(".mpd")) return "dash";
      if(p.endsWith(".ts")) return "ts";
      if(p.endsWith(".mkv")) return "mkv";
      if(p.endsWith(".mp4")||p.endsWith(".webm")||p.endsWith(".ogg")||p.endsWith(".m4v")) return "native";
    }catch(e){}
    const clean=url.split("?")[0].split("#")[0].toLowerCase();
    if(clean.endsWith(".m3u8") || clean.endsWith(".hls")) return "hls";
    if(clean.endsWith(".mpd")) return "dash";
    if(clean.endsWith(".ts")) return "ts";
    if(clean.endsWith(".mkv")) return "mkv";
    return "auto";
  }
  function sameOrigin(url){
    try{return new URL(url,location.href).origin===location.origin}catch(e){return false}
  }
  function proxyUrl(url){
    if(!serverBase) return url;
    return `${serverBase}/api/stream-proxy?url=${encodeURIComponent(url)}`;
  }
  function tsUrl(url){
    if(!serverBase) return url;
    return `${serverBase}/api/ts-hls?url=${encodeURIComponent(url)}`;
  }
  function mkvUrl(url){
    if(!serverBase) return url;
    return `${serverBase}/api/mkv-hls?url=${encodeURIComponent(url)}`;
  }
  function probablyHttpMixedContent(url){
    return location.protocol==="https:" && /^http:\/\//i.test(url);
  }
  function cleanup(){
    if(hls){try{hls.destroy()}catch(e){} hls=null}
    if(dash){try{dash.reset()}catch(e){} dash=null}
    if(retryTimer){clearTimeout(retryTimer);retryTimer=null}
    if(currentObjectUrl){URL.revokeObjectURL(currentObjectUrl);currentObjectUrl=null}
    video.removeAttribute("src");
    video.load();
  }
  function setStatus(msg){
    if(status) status.textContent=msg||"";
    if(placeholder) placeholder.style.display=msg?"grid":"none";
  }
  function setError(msg){
    if(errorBox){errorBox.hidden=!msg;errorBox.textContent=msg||""}
  }
  function isVOD(){
    return Number.isFinite(video.duration) && video.duration > 0 && video.duration !== Infinity;
  }
  function formatTime(sec){
    sec=Math.max(0,Math.floor(Number(sec)||0));
    const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=sec%60;
    return h ? `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}` : `${m}:${String(s).padStart(2,"0")}`;
  }
  function readResume(){
    try{
      const raw=localStorage.getItem(resumeKey);
      if(!raw)return null;
      const data=JSON.parse(raw);
      if(!data || Date.now()-Number(data.updatedAt||0) > VOD_RESUME_TTL) {
        localStorage.removeItem(resumeKey);
        return null;
      }
      const pos=Number(data.position);
      if(!Number.isFinite(pos) || pos < 5)return null;
      return data;
    }catch(e){return null}
  }
  function saveResume(force=false){
    if(!isVOD() || !Number.isFinite(video.currentTime) || video.currentTime < 5)return;
    const now=Date.now();
    if(!force && now-lastResumeWrite < 2000)return;
    lastResumeWrite=now;
    // Clear completed videos instead of offering an almost-finished resume.
    if(video.duration > 0 && video.currentTime >= video.duration-3){
      try{localStorage.removeItem(resumeKey)}catch(e){}
      return;
    }
    try{
      localStorage.setItem(resumeKey,JSON.stringify({position:video.currentTime,duration:video.duration,updatedAt:now,name:item.name||"Video"}));
    }catch(e){}
  }
  function showResumeNotice(data){
    if(!data || !isVOD() || data.position >= video.duration-5)return;
    let el=document.getElementById("vodResumeNotice");
    if(!el){
      el=document.createElement("div");
      el.id="vodResumeNotice";
      el.className="vod-resume-notice";
      el.innerHTML='<span class="vod-resume-text"></span><button type="button" class="resume-btn">Resume</button><button type="button" class="restart-btn">Start over</button>';
      document.body.appendChild(el);
      el.querySelector(".resume-btn").onclick=()=>{
        const pos=Number(el.dataset.position||0);
        if(Number.isFinite(pos)){ video.currentTime=pos; resumeRestored=true; }
        el.classList.remove("show");
        startPlayback();
      };
      el.querySelector(".restart-btn").onclick=()=>{
        try{localStorage.removeItem(resumeKey)}catch(e){}
        video.currentTime=0;
        el.classList.remove("show");
        startPlayback();
      };
    }
    el.dataset.position=String(data.position);
    el.querySelector(".vod-resume-text").textContent=`Continue ${item.name||"video"} from ${formatTime(data.position)}?`;
    el.classList.add("show");
  }
  function restoreResume(){
    if(resumeRestored || !isVOD())return;
    const data=readResume();
    if(!data)return;
    const position=Math.min(data.position, Math.max(0, video.duration-5));
    try{
      video.currentTime=position;
      resumeRestored=true;
      showResumeNotice({...data,position});
    }catch(e){}
  }
  function setPlayingUi(){
    const playing=!video.paused && !video.ended;
    if(playBtn){playBtn.textContent=playing?"❚❚":"▶";playBtn.setAttribute("aria-label",playing?"Pause":"Play")}
    if(bigPlayOrb) bigPlayOrb.textContent=playing?"❚❚":"▶";
  }
  function setQualityButtons(levels, onSelect){
    if(!qualityOptions)return;
    const items=[`<button type="button" data-quality="auto">Auto</button>`];
    (levels||[]).forEach((x,i)=>{
      const h=x.height ? `${x.height}p` : (x.bitrate ? `${Math.round(x.bitrate/1000)} kbps` : `Level ${i+1}`);
      items.push(`<button type="button" data-quality="${i}">${esc(h)}</button>`);
    });
    qualityOptions.innerHTML=items.join("");
    qualityOptions.querySelectorAll("button").forEach(b=>b.onclick=()=>{
      const q=b.dataset.quality;
      onSelect(q==="auto" ? -1 : Number(q));
      settingsMenu?.classList.remove("show");
    });
  }
  function showTracks(){
    if(!subtitleOptions)return;
    subtitleOptions.innerHTML="";
    const off=document.createElement("button"); off.type="button"; off.textContent="Off";
    off.onclick=()=>{for(const t of video.textTracks)t.mode="disabled"; subtitleMenu?.classList.remove("show")};
    subtitleOptions.appendChild(off);
    for(const t of video.textTracks){
      if(t.kind!=="subtitles" && t.kind!=="captions") continue;
      const b=document.createElement("button"); b.type="button"; b.textContent=t.label||t.language||"Subtitle";
      b.onclick=()=>{for(const x of video.textTracks)x.mode="disabled";t.mode="showing";subtitleMenu?.classList.remove("show")};
      subtitleOptions.appendChild(b);
    }
  }
  async function startPlayback(){
    try{
      await video.play();
      setPlayingUi();
      return true;
    }catch(e){
      // Browsers/TVs may block autoplay with sound. Try muted autoplay once.
      try{
        video.muted = true;
        if(muteBtn) muteBtn.textContent = "🔇";
        await video.play();
        setPlayingUi();
        return true;
      }catch(e2){
        setStatus("Ready — press Play");
        setPlayingUi();
        return false;
      }
    }
  }
  function finishLoad(label){
    setStatus("");
    setError("");
    if(title) title.textContent=label || "SavageTech TV";
    if(watchName) watchName.textContent=label || "Live Channel";
    if(watchDesc) watchDesc.textContent="Live channel streaming on SavageTech TV.";
    showTracks();
    startPlayback();
  }
  function fail(msg){
    setStatus("Stream unavailable");
    setError(msg);
    // A visible retry control is useful on Smart TVs and devices where streams
    // can take longer to initialize. It retries the same configured URL.
    if(errorBox){
      let retry=errorBox.querySelector("[data-player-retry]");
      if(!retry){
        retry=document.createElement("button");
        retry.type="button";
        retry.dataset.playerRetry="1";
        retry.className="primary-btn player-retry-btn";
        retry.textContent="Retry stream";
        retry.addEventListener("click",()=>{setError("");loadStream(stream);});
        errorBox.appendChild(document.createElement("br"));
        errorBox.appendChild(retry);
      }
    }
    console.warn("SavageTech stream failure:", msg, {url:stream, kind:extOf(stream)});
  }

  async function loadStream(rawUrl){
    cleanup();
    if(!rawUrl){fail("No stream link is configured for this channel.");return}
    let url=rawUrl;
    const kind=extOf(url);
    const needsProxy=probablyHttpMixedContent(url);
    // Cross-origin HTTPS streams still need the provider to allow CORS. If the
    // page is running through our Node server, proxy them as well to remove
    // browser CORS restrictions where possible.
    const useProxy=isLocalServer && (!sameOrigin(url) || needsProxy);
    if(kind==="ts"){
      if(!isLocalServer){fail("Raw .ts streams need the SavageTech Node server (FFmpeg) because browsers do not natively play MPEG-TS.");return}
      url=tsUrl(url);
    }else if(kind==="mkv"){
      if(!isLocalServer){fail("Remote .mkv playback needs the SavageTech Node server (FFmpeg) to convert MKV to browser-compatible HLS.");return}
      url=mkvUrl(url);
    }else if((kind==="hls"||kind==="dash") && useProxy){
      url=proxyUrl(url);
    }

    setStatus(kind==="ts" ? "Preparing MPEG-TS stream…" : kind==="mkv" ? "Preparing MKV stream…" : "Loading stream…");

    if(kind==="dash"){
      if(window.dashjs && typeof dashjs.MediaPlayer==="function"){
        dash=dashjs.MediaPlayer().create();
        dash.initialize(video,url,true);
        dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED,()=>finishLoad(item.name));
        dash.on(dashjs.MediaPlayer.events.ERROR,e=>{
          console.warn("DASH error",e);
          if(!video.readyState) fail("The DASH stream could not be played. It may require DRM, authentication, CORS, or a valid MPD.");
        });
        setQualityButtons([],()=>{});
        return;
      }
      fail("DASH player library could not be loaded. Check your internet connection.");
      return;
    }

    if(kind==="hls" || kind==="ts" || kind==="mkv" || kind==="auto"){
      if(video.canPlayType("application/vnd.apple.mpegurl") && (kind==="hls" || kind==="ts" || kind==="mkv")){
        video.src=url;
        video.addEventListener("loadedmetadata",()=>finishLoad(item.name),{once:true});
      }else if(window.Hls && window.Hls.isSupported()){
        hls=new Hls({
          enableWorker:true,
          // Prefer stability on slower connections over ultra-low latency.
          lowLatencyMode:false,
          backBufferLength:20,
          maxBufferLength:30,
          maxMaxBufferLength:60,
          maxBufferSize:45*1000*1000,
          liveSyncDurationCount:5,
          liveMaxLatencyDurationCount:10,
          startLevel:-1,
          capLevelToPlayerSize:true,
          abrEwmaDefaultEstimate:350000,
          abrBandWidthFactor:0.8,
          abrBandWidthUpFactor:0.6,
          fragLoadingMaxRetry:6,
          manifestLoadingMaxRetry:4,
          levelLoadingMaxRetry:6,
          fragLoadingRetryDelay:1000,
          manifestLoadingRetryDelay:1000,
          levelLoadingRetryDelay:1000
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,(_,data)=>{
          finishLoad(item.name);
          setQualityButtons(data.levels||[],q=>{hls.currentLevel=q});
        });
        hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED,(_,data)=>{
          tracks=data.subtitleTracks||[];
          showTracks();
        });
        hls.on(Hls.Events.ERROR,(_,data)=>{
          console.warn("HLS error",data);
          if(data.fatal){
            if(data.type===Hls.ErrorTypes.MEDIA_ERROR){try{hls.recoverMediaError();return}catch(e){}}
            if(data.type===Hls.ErrorTypes.NETWORK_ERROR && hls && !hls.__stRetrying){
              hls.__stRetrying=true;
              setStatus("Connection interrupted — reconnecting…");
              setTimeout(()=>{if(hls){hls.__stRetrying=false;try{hls.startLoad()}catch(e){}}},1800);
              return;
            }
            fail("HLS playback failed. The stream may be offline, blocked, protected, or require authentication.");
          }
        });
      }else if(kind==="auto"){
        video.src=url;
        video.addEventListener("loadedmetadata",()=>finishLoad(item.name),{once:true});
      }else{
        fail("This browser cannot play HLS. Try a modern Chrome, Edge, Firefox, Safari, or the SavageTech app build.");
      }
      return;
    }

    video.src=url;
    video.addEventListener("loadedmetadata",()=>finishLoad(item.name),{once:true});
    video.addEventListener("error",()=>fail("This media format is not supported by the browser."),{once:true});
  }

  if(title) title.textContent=item.name || "SavageTech TV";
  if(watchName) watchName.textContent=item.name || "Live Channel";
  if(watchDesc) watchDesc.textContent=item.desc || "Live channel streaming on SavageTech TV.";
  if(moreGrid){
    const more=channels.filter(c=>c.id!==item.id && c.name && c.stream).slice(0,12);
    moreGrid.innerHTML=more.map(card).join("");
  }

  playBtn?.addEventListener("click",()=>video.paused?video.play().catch(()=>{}):video.pause());
  bigPlayOrb?.addEventListener("click",()=>video.paused?video.play().catch(()=>{}):video.pause());
  muteBtn?.addEventListener("click",()=>{video.muted=!video.muted;muteBtn.textContent=video.muted?"🔇":"🔊"});
  function isTouchMobile(){
    try{
      return window.matchMedia("(pointer:coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }catch(e){ return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent); }
  }

  function ensureOrientationNotice(){
    let el=document.getElementById("orientationNotice");
    if(el) return el;
    el=document.createElement("div");
    el.id="orientationNotice";
    el.className="orientation-notice";
    el.innerHTML='<span class="orientation-notice-icon">↻</span><div class="orientation-notice-text"></div><button type="button">Retry</button>';
    document.body.appendChild(el);
    el.querySelector("button").addEventListener("click",async()=>{
      hideOrientationNotice();
      await enterLandscape();
    });
    return el;
  }
  let orientationNoticeTimer=null;
  function showOrientationNotice(message){
    const el=ensureOrientationNotice();
    el.querySelector(".orientation-notice-text").textContent=message;
    el.classList.add("show");
    clearTimeout(orientationNoticeTimer);
    orientationNoticeTimer=setTimeout(()=>el.classList.remove("show"),9000);
  }
  function hideOrientationNotice(){
    const el=document.getElementById("orientationNotice");
    if(el) el.classList.remove("show");
    clearTimeout(orientationNoticeTimer);
  }

  async function lockLandscapeAfterFullscreen(){
    if(!screen.orientation?.lock) return {locked:false,reason:"unsupported"};
    const modes=["landscape-primary","landscape"];
    let lastError=null;
    for(const mode of modes){
      try{
        await screen.orientation.lock(mode);
        return {locked:true,reason:"locked"};
      }catch(e){ lastError=e; }
    }
    return {locked:false,reason:lastError?.name || "denied"};
  }

  async function enterLandscape(){
    if(!shell) return false;

    hideOrientationNotice();
    // Real device/browser orientation only. Never use CSS transform/rotation.
    let fullscreen=!!document.fullscreenElement;
    if(!fullscreen && shell.requestFullscreen){
      try{
        await shell.requestFullscreen({navigationUI:"hide"});
        fullscreen=!!document.fullscreenElement;
      }catch(e){}
    }

    if(!fullscreen){
      showOrientationNotice("SavageTech needs Fullscreen before it can switch to Landscape.");
      return false;
    }

    // Android/Chrome can reject orientation.lock when Auto-rotate is disabled.
    // Retry after the fullscreen transition, but never fake the rotation.
    let result=await lockLandscapeAfterFullscreen();
    if(!result.locked){
      await new Promise(r=>setTimeout(r,250));
      result=await lockLandscapeAfterFullscreen();
    }
    if(!result.locked){
      await new Promise(r=>setTimeout(r,600));
      result=await lockLandscapeAfterFullscreen();
    }

    if(result.locked){
      videoScreen?.classList.add("landscape-mode");
      videoScreen?.classList.remove("portrait-mode");
      hideOrientationNotice();
      return true;
    }

    // The browser refused the real orientation change. Tell the user exactly
    // what to do instead of silently pretending that Landscape succeeded.
    showOrientationNotice("Landscape could not start. Please turn ON Auto-rotate / Screen rotation on your device, then tap Retry.");
    return false;
  }

  async function exitPlayerFullscreen(){
    try{ if(screen.orientation?.unlock) screen.orientation.unlock(); }catch(e){}
    try{
      if(document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
    }catch(e){}
  }

  function pipSupported(){
    return !!(document.pictureInPictureEnabled && typeof video.requestPictureInPicture === "function") || typeof video.webkitSetPresentationMode === "function";
  }
  async function enterPiP(){
    try{
      if(typeof video.webkitSetPresentationMode === "function" && video.webkitPresentationMode !== "picture-in-picture"){
        video.webkitSetPresentationMode("picture-in-picture");
        return true;
      }
      if(document.pictureInPictureElement===video){
        await document.exitPictureInPicture?.();
        return true;
      }
      if(typeof video.requestPictureInPicture === "function") {
        await video.requestPictureInPicture();
        return true;
      }
    }catch(e){
      console.warn("Picture-in-Picture was not permitted",e);
    }
    showPiPNotice();
    return false;
  }
  function showPiPNotice(){
    let el=document.getElementById("pipNotice");
    if(!el){
      el=document.createElement("div");
      el.id="pipNotice";
      el.className="pip-notice";
      el.textContent="Mini player is not available in this browser. Try Chrome/Edge/Safari Picture-in-Picture.";
      document.body.appendChild(el);
    }
    el.classList.add("show");
    clearTimeout(window.__pipNoticeTimer);
    window.__pipNoticeTimer=setTimeout(()=>el.classList.remove("show"),5000);
  }
  if(pipBtn){
    pipBtn.hidden=!pipSupported();
    pipBtn.addEventListener("click",async()=>{await enterPiP();revealControls();});
  }
  document.addEventListener("enterpictureinpicture",()=>{if(pipBtn)pipBtn.textContent="▣";});
  document.addEventListener("leavepictureinpicture",()=>{if(pipBtn)pipBtn.textContent="▣";});

  fullscreenBtn?.addEventListener("click",async()=>{
    try{
      if(document.fullscreenElement){
        await exitPlayerFullscreen();
      }else if(shell?.requestFullscreen){
        // Fullscreen button only enters fullscreen. The user can then choose
        // Settings -> Landscape, which requests the real device rotation.
        await shell.requestFullscreen({navigationUI:"hide"});
      }
    }catch(e){}
    revealControls();
  });
  settingsBtn?.addEventListener("click",()=>settingsMenu?.classList.toggle("show"));
  subtitleBtn?.addEventListener("click",()=>{showTracks();subtitleMenu?.classList.toggle("show")});
  document.addEventListener("click",e=>{
    if(!e.target.closest(".settings-wrap")){settingsMenu?.classList.remove("show");subtitleMenu?.classList.remove("show")}
  });
  settingsMenu?.querySelectorAll("[data-speed]").forEach(b=>b.addEventListener("click",()=>{
    video.playbackRate=Number(b.dataset.speed);settingsMenu.classList.remove("show");
  }));
  settingsMenu?.querySelectorAll("[data-orientation]").forEach(b=>b.addEventListener("click",async()=>{
    const mode=b.dataset.orientation;
    try{
      if(mode === "landscape") {
        await enterLandscape();
      } else {
        await exitPlayerFullscreen();
        videoScreen?.classList.add("portrait-mode");
        videoScreen?.classList.remove("landscape-mode");
      }
    }catch(e){
      console.warn("Orientation change was not permitted by this browser", e);
      if(mode === "landscape") showOrientationNotice("Landscape could not start. Please turn ON Auto-rotate / Screen rotation on your device, then tap Retry.");
    }
    settingsMenu.classList.remove("show");
    revealControls();
  }));
  progressTrack?.addEventListener("click",e=>{
    if(!Number.isFinite(video.duration)||video.duration<=0)return;
    const r=progressTrack.getBoundingClientRect();
    video.currentTime=((e.clientX-r.left)/r.width)*video.duration;
  });
  video.addEventListener("play",setPlayingUi);
  video.addEventListener("pause",setPlayingUi);
  video.addEventListener("timeupdate",()=>{
    if(progressFill && Number.isFinite(video.duration) && video.duration>0)
      progressFill.style.width=(video.currentTime/video.duration*100)+"%";
    saveResume(false);
  });
  video.addEventListener("loadedmetadata",()=>{showTracks();restoreResume();});
  video.addEventListener("durationchange",restoreResume);
  video.addEventListener("pause",()=>saveResume(true));
  video.addEventListener("ended",()=>{try{localStorage.removeItem(resumeKey)}catch(e){}});
  window.addEventListener("pagehide",()=>saveResume(true));
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")saveResume(true)});
  video.addEventListener("canplay",()=>{setStatus("");setPlayingUi()});
  video.addEventListener("waiting",()=>setStatus("Buffering…"));
  video.addEventListener("playing",()=>{setStatus("");setError("");setPlayingUi()});
  video.addEventListener("error",()=>{if(!video.src || video.networkState===HTMLMediaElement.NETWORK_NO_SOURCE)return;});

  // TV/laptop/mobile friendly controls: visible after any interaction, then hide
  // after 3 seconds of inactivity. Keyboard arrows count as interaction.
  let controlsTimer=null;
  function revealControls(){
    shell?.classList.add("controls-visible");
    if(controlsTimer) clearTimeout(controlsTimer);
    controlsTimer=setTimeout(()=>{
      if(!settingsMenu?.classList.contains("show") && !subtitleMenu?.classList.contains("show"))
        shell?.classList.remove("controls-visible");
    },3000);
  }
  function playerInteraction(){ revealControls(); }
  ["pointermove","pointerdown","touchstart","mousemove","wheel","click"].forEach(ev=>shell?.addEventListener(ev,playerInteraction,{passive:true}));
  document.addEventListener("keydown",e=>{
    const keys=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"," ","Escape"];
    if(keys.includes(e.key)) revealControls();
  });
  shell?.addEventListener("mouseleave",()=>{
    if(!settingsMenu?.classList.contains("show") && !subtitleMenu?.classList.contains("show")) {
      if(controlsTimer) clearTimeout(controlsTimer);
      controlsTimer=setTimeout(()=>shell?.classList.remove("controls-visible"),3000);
    }
  });
  screen.orientation?.addEventListener?.("change",()=>{
    const isLandscape=/^landscape/.test(screen.orientation.type || "");
    if(isLandscape){
      videoScreen?.classList.add("landscape-mode");
      videoScreen?.classList.remove("portrait-mode");
      hideOrientationNotice();
    }else{
      videoScreen?.classList.remove("landscape-mode");
      videoScreen?.classList.add("portrait-mode");
    }
  });

  document.addEventListener("fullscreenchange",async()=>{
    if(document.fullscreenElement===shell){
      shell.classList.add("is-fullscreen");
      // Fullscreen alone is not Landscape. Preserve the source in portrait
      // until Settings -> Landscape successfully locks the real orientation.
      if(screen.orientation && /^portrait/.test(screen.orientation.type || "")){
        videoScreen?.classList.add("portrait-mode");
        videoScreen?.classList.remove("landscape-mode");
      }
      revealControls();
    }else{
      shell?.classList.remove("is-fullscreen");
      try{ if(screen.orientation?.unlock) screen.orientation.unlock(); }catch(e){}
      revealControls();
    }
  });

  revealControls();
  loadStream(stream);

}

splash();renderFeaturedSlider();renderHome();initChannelSearch();player();profile();updateAuthUI();


/* =========================
   TERMS & PRIVACY MODALS
========================= */

function openModal(modalId) {

    const modal = document.getElementById(modalId);

    if (modal) {

        modal.style.display = "flex";

        document.body.style.overflow = "hidden";

    }

}


function closeModal(modalId) {

    const modal = document.getElementById(modalId);

    if (modal) {

        modal.style.display = "none";

        document.body.style.overflow = "";

    }

}


/* CLOSE WHEN CLICKING OUTSIDE */

window.addEventListener("click", function (event) {

    if (event.target.classList.contains("policy-modal")) {

        event.target.style.display = "none";

        document.body.style.overflow = "";

    }

});


/* CLOSE WITH ESC */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        document.querySelectorAll(".policy-modal").forEach(function (modal) {

            modal.style.display = "none";

        });

        document.body.style.overflow = "";

    }

});

// Smart-TV spatial navigation: arrows move focus between visible cards/controls.
(function enableRemoteSpatialNavigation(){
 if(window.__stRemoteNavInstalled)return; window.__stRemoteNavInstalled=true;
 const selector='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
 function candidates(){return [...document.querySelectorAll(selector)].filter(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'&&!el.closest('[hidden]')});}
 document.addEventListener('keydown',e=>{
  if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;
  const active=document.activeElement; if(active&&(active.matches('input,textarea,select')||active.isContentEditable))return;
  const list=candidates(); if(!list.length)return;
  if(!active||active===document.body||!list.includes(active)){
    e.preventDefault(); const first=list.find(x=>x.matches('.channel-card,.category-tab,.primary-btn'))||list[0]; first.focus({preventScroll:true}); first.scrollIntoView({block:'nearest',inline:'nearest'});return;
  }
  const a=active.getBoundingClientRect(), ax=a.left+a.width/2, ay=a.top+a.height/2;
  const dirs={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]},[dx,dy]=dirs[e.key];
  let best=null,bestScore=Infinity;
  for(const el of list){if(el===active)continue;const r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,vx=x-ax,vy=y-ay,primary=vx*dx+vy*dy;if(primary<=3)continue;const secondary=Math.abs(vx*dy-vy*dx);const score=primary+secondary*2.4;if(score<bestScore){best=el;bestScore=score}}
  if(best){e.preventDefault();best.focus({preventScroll:true});best.scrollIntoView({block:'nearest',inline:'nearest',behavior:'auto'});}
 },true);
})();
