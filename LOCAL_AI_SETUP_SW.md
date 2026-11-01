# DigiDoctor Local AI v3 — Mwongozo wa Windows

## Kwa nini jibu lilikuwa lilelile?
Frontend ya awali ilikuwa inaficha hitilafu ya kuunganishwa na backend. Ikiwa uliifungua kwa Live Server pekee, `/api/diagnose` haikuwepo; JavaScript ilimeza hitilafu hiyo na kuonyesha fallback ileile ya “More details are needed”. Pia knowledge base ilikuwa na nyaraka 8 tu za jumla. Kwa hiyo model haikuwa ikitumika ipasavyo.

## Kuweka na kuwasha
1. Sakinisha Node.js 18 au mpya zaidi: https://nodejs.org/
2. Sakinisha Ollama: https://ollama.com/download/windows
3. Fungua PowerShell na pakua model: `ollama pull qwen3:4b`
4. Fungua folder `DigiDoctor_Web` ndani ya VS Code.
5. Fungua Terminal ndani ya folder hilo.
6. Endesha `npm install`.
7. Endesha `npm start`.
8. Fungua browser kwenye `http://localhost:3000`.
9. Fungua `http://localhost:3000/api/health`. Hakikisha unaona `ok: true` na `modelInstalled: true`.

Usifungue `index.html` kwa kubofya mara mbili. Usitumie Live Server peke yake. Node server ndiyo inahudumia tovuti na kuunganisha frontend na Ollama.

## Nini kimeboreshwa kwenye v3?
- Frontend haifichi tena hitilafu ya backend na kutoa jibu la kujifanya. Ikiwa Local AI haipatikani, inaeleza tatizo na hatua za kurekebisha.
- Loading page inasubiri Node.js, Ollama na model ya ndani kuwa tayari. Haipakui tena faili ya 3MB wala kuhitaji internet wakati wa matumizi ya kawaida.
- Typing indicator inaendelea angalau sekunde 5, kisha inasubiri Local AI na majibu yake. CPU inaweza kuwa polepole; muda wa request umeongezwa hadi dakika 10.
- Retrieval imeboreshwa kwa maneno yanayofanana, Kiswahili/English, model numbers na error codes.
- Knowledge base imeongezwa kutoka nyaraka 8 hadi 13. Zimejumuisha Windows Wi-Fi, Windows printers, Android, iPhone/iPad na PlayStation pamoja na nyaraka za awali.
- Model inaweza kutumia maarifa yake ya jumla kwa hatua salama zisizohitaji model maalum. Hairuhusiwi kubuni error codes, menu paths, firmware au part numbers.
- Jibu linaweza kuonyesha follow-up questions, confidence na majina ya nyaraka za ndani zilizotumika.

## Kuhusu internet isiyo stable
Kwa kuwa umechagua 100% Local AI, internet ya mtumiaji haihitajiki wakati wa diagnosis baada ya model na knowledge base kupakuliwa. Kinachotakiwa kusubiri ni Local AI engine (Ollama) iwe tayari, si internet. Internet inahitajika tu kupakua model, kusakinisha packages au kupata nyaraka mpya. Hii inafanya DigiDoctor iendelee kufanya kazi hata internet ikikatika.

## Model na computer yako
Kwa RAM 16GB na Intel Integrated Graphics, anza na `qwen3:4b`. Inatumia CPU ikiwa hakuna GPU inayofaa. Ikiwa ni nzito sana, unaweza kupakua `qwen3:1.7b` na kuwasha server kwa:
`$env:OLLAMA_MODEL="qwen3:1.7b"; npm start`

## Vyanzo vilivyotumika kuandaa nyaraka
- Microsoft Wi-Fi troubleshooting: https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows
- Microsoft printer troubleshooting: https://support.microsoft.com/en-us/windows/hardware/printer/fix-printer-connection-and-printing-problems-in-windows
- Google Android Help: https://support.google.com/android/
- Apple Wi-Fi troubleshooting: https://support.apple.com/en-us/111786
- PlayStation Hardware & Repairs: https://www.playstation.com/en-us/support/hardware/
- Ollama API: https://docs.ollama.com/api

## Kupanua database
Weka `.md` au `.txt` files ndani ya `knowledge/`. Kila entry iwe na:
- Brand, model na OS/firmware version inapojulikana.
- Dalili na error code kamili.
- Vipimo vinavyoweza kuthibitisha au kuondoa sababu.
- Suluhisho lililothibitishwa na matokeo yake.
- Chanzo rasmi, URL na tarehe ya ukaguzi.

Nyaraka 13 ni mwanzo tu, si database ya kila kifaa duniani. Usinakili manuals zenye hakimiliki bila ruhusa. Usitumie maudhui ya iFixit kama training corpus bila kufuata masharti yao ya leseni.

## Muhimu kuhusu deployment
Uki-deploy frontend pekee Render, haitafikia Ollama iliyo kwenye laptop yako. Node backend na Ollama lazima viendeshwe kwenye mashine/server moja, au uweke private secure connection. Usifungue Ollama port hadharani bila authentication na ulinzi wa mtandao.
