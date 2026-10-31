# DigiDoctor Local AI — mwongozo wa Windows

## Kile kilichoongezwa
- Local backend ya Node.js (`server/server.js`).
- Inatumia Ollama inayoendesha model kwenye kompyuta/server yako; hakuna OpenAI au cloud AI API.
- Inatafuta kwanza ndani ya `knowledge/` na kupeleka vipande vinavyolingana kwa model (RAG ya ndani).
- Lugha ya jibu inafuata `language` iliyochaguliwa kwenye DigiDoctor.
- `/api/health` inaonyesha kama Ollama inapatikana na model gani zipo.
- Frontend tayari ina typing indicator ya sekunde 5 na Like/Dislike; sasa inaita backend hii.

## Kuweka kwenye Windows
1. Sakinisha Node.js 18 au mpya zaidi: https://nodejs.org/
2. Sakinisha Ollama: https://ollama.com/download/windows
3. Fungua PowerShell na pakua model: `ollama pull qwen2.5:7b`
   - Model hii ni mfano wa kuanzia, si lazima iwe bora kwa kila PC. Inahitaji RAM ya kutosha; PC dhaifu inaweza kutumia `qwen2.5:3b` kwa kubadilisha `OLLAMA_MODEL`.
4. Fungua PowerShell ndani ya folder `DigiDoctor_Web`.
5. Endesha: `npm install`
6. Endesha: `npm start`
7. Fungua `http://localhost:3000` (si `index.html` kwa kubofya mara mbili).
8. Kagua `http://localhost:3000/api/health` kuona model zilizopo.

## Kuchagua model nyingine
PowerShell:
`$env:OLLAMA_MODEL="qwen2.5:3b"; npm start`
Model lazima iwe imepakuliwa kwa `ollama pull qwen2.5:3b`.

## Muhimu kuhusu “Local”
Local maana yake model na majibu vinafanyika kwenye mashine inayoendesha Ollama. Ukifungua website iliyodeploy Render kwa simu ya mtu mwingine, simu hiyo haiwezi kuifikia Ollama ya laptop yako kupitia `127.0.0.1`. Ili watumiaji wengi watumie Local AI, Ollama/backend lazima viwekwe kwenye server yako binafsi yenye RAM/GPU ya kutosha, au kila mtumiaji aendeshe model yake. Hii si sawa na kuhost frontend pekee kwenye Render.

## Kuongeza maarifa mapya kwa usalama
- Weka manuals, troubleshooting notes na error-code references unazoruhusiwa kutumia ndani ya `knowledge/` kama `.md` au `.txt`.
- Andika jina la brand/model, OS/firmware version, dalili, chanzo rasmi, tarehe ya kusasishwa na hatua zilizothibitishwa.
- Usikusanye kwa wingi au kunakili maudhui yenye hakimiliki bila ruhusa. iFixit API inaruhusu ufikiaji wa repair guides lakini masharti yake yana leseni ya BY-NC-SA na yanakataza kutumia maudhui yake kufundisha LLM; usiingize data yake kama training corpus.
- Knowledge base ya sasa ni mwanzo wa jumla, si mkusanyiko kamili wa kila kifaa au hitilafu duniani. DigiDoctor lazima iseme “sijapata ushahidi wa kutosha” badala ya kubuni jibu.

## Vyanzo vya kuanzia (official / primary)
- Ollama API: https://docs.ollama.com/api
- Ollama Windows: https://docs.ollama.com/windows
- Microsoft Windows troubleshooters: https://support.microsoft.com/en-us/support/get-help/windows-troubleshooters
- Microsoft Windows Update troubleshooter: https://support.microsoft.com/en-us/windows/experience/windows-update-troubleshooter
- iFixit API terms and documentation: https://www.ifixit.com/api-docs
- Samsung support: https://www.samsung.com/support/
- Apple support: https://support.apple.com/
- HP support: https://support.hp.com/
- Lenovo support: https://support.lenovo.com/
- Dell support: https://www.dell.com/support/home/
- ASUS support: https://www.asus.com/support/
- Hisense support: https://www.hisense.com/support/

Kumbuka: link za manufacturers ni vyanzo vya kutafuta manual sahihi; DigiDoctor haijapakua wala kujumuisha manuals zote moja kwa moja.
