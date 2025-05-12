var __defProp=Object.defineProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});import sourceMapSupport from"source-map-support";import path12 from"path";import chalk from"chalk";import pretty from"pretty-time";var PerfTimer=class{static{__name(this,"PerfTimer")}evts;constructor(){this.evts={},this.addEvent("start")}addEvent(evtName){this.evts[evtName]=process.hrtime()}timeSince(evtName){return chalk.yellow(pretty(process.hrtime(this.evts[evtName??"start"])))}};import{rimraf}from"rimraf";import{isGitIgnored}from"globby";import chalk6 from"chalk";import esbuild from"esbuild";import remarkParse from"remark-parse";import remarkRehype from"remark-rehype";import{unified}from"unified";import{read}from"to-vfile";import{slug as slugAnchor}from"github-slugger";import rfdc from"rfdc";var clone=rfdc(),QUARTZ="quartz";function isRelativeURL(s){let validStart=/^\.{1,2}/.test(s),validEnding=!endsWith(s,"index");return validStart&&validEnding&&![".md",".html"].includes(_getFileExtension(s)??"")}__name(isRelativeURL,"isRelativeURL");function sluggify(s){return s.split("/").map(segment=>segment.replace(/\s/g,"-").replace(/&/g,"-and-").replace(/%/g,"-percent").replace(/\?/g,"").replace(/#/g,"")).join("/").replace(/\/$/,"")}__name(sluggify,"sluggify");function slugifyFilePath(fp,excludeExt){fp=stripSlashes(fp);let ext=_getFileExtension(fp),withoutFileExt=fp.replace(new RegExp(ext+"$"),"");(excludeExt||[".md",".html",void 0].includes(ext))&&(ext="");let slug=sluggify(withoutFileExt);return endsWith(slug,"_index")&&(slug=slug.replace(/_index$/,"index")),slug+ext}__name(slugifyFilePath,"slugifyFilePath");function simplifySlug(fp){let res=stripSlashes(trimSuffix(fp,"index"),!0);return res.length===0?"/":res}__name(simplifySlug,"simplifySlug");function transformInternalLink(link){let[fplike,anchor]=splitAnchor(decodeURI(link)),folderPath=isFolderPath(fplike),segments=fplike.split("/").filter(x=>x.length>0),prefix=segments.filter(isRelativeSegment).join("/"),fp=segments.filter(seg=>!isRelativeSegment(seg)&&seg!=="").join("/"),simpleSlug=simplifySlug(slugifyFilePath(fp)),joined=joinSegments(stripSlashes(prefix),stripSlashes(simpleSlug)),trail=folderPath?"/":"";return _addRelativeToStart(joined)+trail+anchor}__name(transformInternalLink,"transformInternalLink");var _rebaseHastElement=__name((el,attr,curBase,newBase)=>{if(el.properties?.[attr]){if(!isRelativeURL(String(el.properties[attr])))return;let rel=joinSegments(resolveRelative(curBase,newBase),"..",el.properties[attr]);el.properties[attr]=rel}},"_rebaseHastElement");function normalizeHastElement(rawEl,curBase,newBase){let el=clone(rawEl);return _rebaseHastElement(el,"src",curBase,newBase),_rebaseHastElement(el,"href",curBase,newBase),el.children&&(el.children=el.children.map(child=>normalizeHastElement(child,curBase,newBase))),el}__name(normalizeHastElement,"normalizeHastElement");function pathToRoot(slug){let rootPath=slug.split("/").filter(x=>x!=="").slice(0,-1).map(_=>"..").join("/");return rootPath.length===0&&(rootPath="."),rootPath}__name(pathToRoot,"pathToRoot");function resolveRelative(current,target){return joinSegments(pathToRoot(current),simplifySlug(target))}__name(resolveRelative,"resolveRelative");function splitAnchor(link){let[fp,anchor]=link.split("#",2);return fp.endsWith(".pdf")?[fp,anchor===void 0?"":`#${anchor}`]:(anchor=anchor===void 0?"":"#"+slugAnchor(anchor),[fp,anchor])}__name(splitAnchor,"splitAnchor");function slugTag(tag){return tag.split("/").map(tagSegment=>sluggify(tagSegment)).join("/")}__name(slugTag,"slugTag");function joinSegments(...args){return args.filter(segment=>segment!=="").join("/").replace(/\/\/+/g,"/")}__name(joinSegments,"joinSegments");function getAllSegmentPrefixes(tags){let segments=tags.split("/"),results=[];for(let i=0;i<segments.length;i++)results.push(segments.slice(0,i+1).join("/"));return results}__name(getAllSegmentPrefixes,"getAllSegmentPrefixes");function transformLink(src,target,opts){let targetSlug=transformInternalLink(target);if(opts.strategy==="relative")return targetSlug;{let folderTail=isFolderPath(targetSlug)?"/":"",canonicalSlug=stripSlashes(targetSlug.slice(1)),[targetCanonical,targetAnchor]=splitAnchor(canonicalSlug);if(opts.strategy==="shortest"){let matchingFileNames=opts.allSlugs.filter(slug=>{let fileName=slug.split("/").at(-1);return targetCanonical===fileName});if(matchingFileNames.length===1){let targetSlug2=matchingFileNames[0];return resolveRelative(src,targetSlug2)+targetAnchor}}return joinSegments(pathToRoot(src),canonicalSlug)+folderTail}}__name(transformLink,"transformLink");function isFolderPath(fplike){return fplike.endsWith("/")||endsWith(fplike,"index")||endsWith(fplike,"index.md")||endsWith(fplike,"index.html")}__name(isFolderPath,"isFolderPath");function endsWith(s,suffix){return s===suffix||s.endsWith("/"+suffix)}__name(endsWith,"endsWith");function trimSuffix(s,suffix){return endsWith(s,suffix)&&(s=s.slice(0,-suffix.length)),s}__name(trimSuffix,"trimSuffix");function _getFileExtension(s){return s.match(/\.[A-Za-z0-9]+$/)?.[0]}__name(_getFileExtension,"_getFileExtension");function isRelativeSegment(s){return/^\.{0,2}$/.test(s)}__name(isRelativeSegment,"isRelativeSegment");function stripSlashes(s,onlyStripPrefix){return s.startsWith("/")&&(s=s.substring(1)),!onlyStripPrefix&&s.endsWith("/")&&(s=s.slice(0,-1)),s}__name(stripSlashes,"stripSlashes");function _addRelativeToStart(s){return s===""&&(s="."),s.startsWith(".")||(s=joinSegments(".",s)),s}__name(_addRelativeToStart,"_addRelativeToStart");import path from"path";import workerpool,{Promise as WorkerPromise}from"workerpool";import{Spinner}from"cli-spinner";var QuartzLogger=class{static{__name(this,"QuartzLogger")}verbose;spinner;constructor(verbose){this.verbose=verbose}start(text){this.verbose?console.log(text):(this.spinner=new Spinner(`%s ${text}`),this.spinner.setSpinnerString(18),this.spinner.start())}end(text){this.verbose||this.spinner.stop(!0),text&&console.log(text)}};import chalk2 from"chalk";import process2 from"process";import{isMainThread}from"workerpool";var rootFile=/.*at file:/;function trace(msg,err){let stack=err.stack??"",lines=[];lines.push(""),lines.push(`
`+chalk2.bgRed.black.bold(" ERROR ")+`

`+chalk2.red(` ${msg}`)+(err.message.length>0?`: ${err.message}`:""));let reachedEndOfLegibleTrace=!1;for(let line of stack.split(`
`).slice(1)){if(reachedEndOfLegibleTrace)break;line.includes("node_modules")||(lines.push(` ${line}`),rootFile.test(line)&&(reachedEndOfLegibleTrace=!0))}let traceMsg=lines.join(`
`);if(isMainThread)console.error(traceMsg),process2.exit(1);else throw new Error(traceMsg)}__name(trace,"trace");function createProcessor(ctx){let transformers=ctx.cfg.plugins.transformers;return unified().use(remarkParse).use(transformers.filter(p=>p.markdownPlugins).flatMap(plugin=>plugin.markdownPlugins(ctx))).use(remarkRehype,{allowDangerousHtml:!0}).use(transformers.filter(p=>p.htmlPlugins).flatMap(plugin=>plugin.htmlPlugins(ctx)))}__name(createProcessor,"createProcessor");function*chunks(arr,n){for(let i=0;i<arr.length;i+=n)yield arr.slice(i,i+n)}__name(chunks,"chunks");async function transpileWorkerScript(){return esbuild.build({entryPoints:["./quartz/worker.ts"],outfile:path.join(QUARTZ,"./.quartz-cache/transpiled-worker.mjs"),bundle:!0,keepNames:!0,platform:"node",format:"esm",packages:"external",sourcemap:!0,sourcesContent:!1,plugins:[{name:"css-and-scripts-as-text",setup(build){build.onLoad({filter:/\.scss$/},_=>({contents:"",loader:"text"})),build.onLoad({filter:/\.inline\.(ts|js)$/},_=>({contents:"",loader:"text"}))}}]})}__name(transpileWorkerScript,"transpileWorkerScript");function createFileParser(ctx,fps){let{argv,cfg}=ctx;return async processor=>{let res=[];for(let fp of fps)try{let perf=new PerfTimer,file=await read(fp);file.value=file.value.toString().trim();for(let plugin of cfg.plugins.transformers.filter(p=>p.textTransform))file.value=plugin.textTransform(ctx,file.value.toString());file.data.filePath=file.path,file.data.relativePath=path.posix.relative(argv.directory,file.path),file.data.slug=slugifyFilePath(file.data.relativePath);let ast=processor.parse(file),newAst=await processor.run(ast,file);res.push([newAst,file]),argv.verbose&&console.log(`[process] ${fp} -> ${file.data.slug} (${perf.timeSince()})`)}catch(err){trace(`
Failed to process \`${fp}\``,err)}return res}}__name(createFileParser,"createFileParser");var clamp=__name((num,min,max)=>Math.min(Math.max(Math.round(num),min),max),"clamp");async function parseMarkdown(ctx,fps){let{argv}=ctx,perf=new PerfTimer,log=new QuartzLogger(argv.verbose),CHUNK_SIZE=128,concurrency=ctx.argv.concurrency??clamp(fps.length/CHUNK_SIZE,1,4),res=[];if(log.start(`Parsing input files using ${concurrency} threads`),concurrency===1)try{let processor=createProcessor(ctx);res=await createFileParser(ctx,fps)(processor)}catch(error){throw log.end(),error}else{await transpileWorkerScript();let pool=workerpool.pool("./quartz/bootstrap-worker.mjs",{minWorkers:"max",maxWorkers:concurrency,workerType:"thread"}),childPromises=[];for(let chunk of chunks(fps,CHUNK_SIZE))childPromises.push(pool.exec("parseFiles",[ctx.buildId,argv,chunk,ctx.allSlugs]));res=(await WorkerPromise.all(childPromises).catch(err=>{let errString=err.toString().slice(6);console.error(errString),process.exit(1)})).flat(),await pool.terminate()}return log.end(`Parsed ${res.length} Markdown files in ${perf.timeSince()}`),res}__name(parseMarkdown,"parseMarkdown");function filterContent(ctx,content){let{cfg,argv}=ctx,perf=new PerfTimer,initialLength=content.length;for(let plugin of cfg.plugins.filters){let updatedContent=content.filter(item=>plugin.shouldPublish(ctx,item));if(argv.verbose){let diff=content.filter(x=>!updatedContent.includes(x));for(let file of diff)console.log(`[filter:${plugin.name}] ${file[1].data.slug}`)}content=updatedContent}return console.log(`Filtered out ${initialLength-content.length} files in ${perf.timeSince()}`),content}__name(filterContent,"filterContent");import matter from"gray-matter";import remarkFrontmatter from"remark-frontmatter";import yaml from"js-yaml";import toml from"toml";var en_US_default={propertyDefaults:{title:"Untitled",description:"No description provided"},components:{callout:{note:"Note",abstract:"Abstract",info:"Info",todo:"Todo",tip:"Tip",success:"Success",question:"Question",warning:"Warning",failure:"Failure",danger:"Danger",bug:"Bug",example:"Example",quote:"Quote"},backlinks:{title:"Backlinks",noBacklinksFound:"No backlinks found"},themeToggle:{lightMode:"Light mode",darkMode:"Dark mode"},explorer:{title:"Explorer"},footer:{createdWith:"Created with"},graph:{title:"Graph View"},recentNotes:{title:"Recent Notes",seeRemainingMore:({remaining})=>`See ${remaining} more \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transclude of ${targetSlug}`,linkToOriginal:"Link to original"},search:{title:"Search",searchBarPlaceholder:"Search for something"},tableOfContents:{title:"Table of Contents"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"Recent notes",lastFewNotes:({count})=>`Last ${count} notes`},error:{title:"Not Found",notFound:"Either this page is private or doesn't exist.",home:"Return to Homepage"},folderContent:{folder:"Folder",itemsUnderFolder:({count})=>count===1?"1 item under this folder.":`${count} items under this folder.`},tagContent:{tag:"Tag",tagIndex:"Tag Index",itemsUnderTag:({count})=>count===1?"1 item with this tag.":`${count} items with this tag.`,showingFirst:({count})=>`Showing first ${count} tags.`,totalTags:({count})=>`Found ${count} total tags.`}}};var en_GB_default={propertyDefaults:{title:"Untitled",description:"No description provided"},components:{callout:{note:"Note",abstract:"Abstract",info:"Info",todo:"To-Do",tip:"Tip",success:"Success",question:"Question",warning:"Warning",failure:"Failure",danger:"Danger",bug:"Bug",example:"Example",quote:"Quote"},backlinks:{title:"Backlinks",noBacklinksFound:"No backlinks found"},themeToggle:{lightMode:"Light mode",darkMode:"Dark mode"},explorer:{title:"Explorer"},footer:{createdWith:"Created with"},graph:{title:"Graph View"},recentNotes:{title:"Recent Notes",seeRemainingMore:({remaining})=>`See ${remaining} more \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transclude of ${targetSlug}`,linkToOriginal:"Link to original"},search:{title:"Search",searchBarPlaceholder:"Search for something"},tableOfContents:{title:"Table of Contents"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"Recent notes",lastFewNotes:({count})=>`Last ${count} notes`},error:{title:"Not Found",notFound:"Either this page is private or doesn't exist.",home:"Return to Homepage"},folderContent:{folder:"Folder",itemsUnderFolder:({count})=>count===1?"1 item under this folder.":`${count} items under this folder.`},tagContent:{tag:"Tag",tagIndex:"Tag Index",itemsUnderTag:({count})=>count===1?"1 item with this tag.":`${count} items with this tag.`,showingFirst:({count})=>`Showing first ${count} tags.`,totalTags:({count})=>`Found ${count} total tags.`}}};var fr_FR_default={propertyDefaults:{title:"Sans titre",description:"Aucune description fournie"},components:{callout:{note:"Note",abstract:"R\xE9sum\xE9",info:"Info",todo:"\xC0 faire",tip:"Conseil",success:"Succ\xE8s",question:"Question",warning:"Avertissement",failure:"\xC9chec",danger:"Danger",bug:"Bogue",example:"Exemple",quote:"Citation"},backlinks:{title:"Liens retour",noBacklinksFound:"Aucun lien retour trouv\xE9"},themeToggle:{lightMode:"Mode clair",darkMode:"Mode sombre"},explorer:{title:"Explorateur"},footer:{createdWith:"Cr\xE9\xE9 avec"},graph:{title:"Vue Graphique"},recentNotes:{title:"Notes R\xE9centes",seeRemainingMore:({remaining})=>`Voir ${remaining} de plus \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transclusion de ${targetSlug}`,linkToOriginal:"Lien vers l'original"},search:{title:"Recherche",searchBarPlaceholder:"Rechercher quelque chose"},tableOfContents:{title:"Table des Mati\xE8res"},contentMeta:{readingTime:({minutes})=>`${minutes} min de lecture`}},pages:{rss:{recentNotes:"Notes r\xE9centes",lastFewNotes:({count})=>`Les derni\xE8res ${count} notes`},error:{title:"Introuvable",notFound:"Cette page est soit priv\xE9e, soit elle n'existe pas.",home:"Retour \xE0 la page d'accueil"},folderContent:{folder:"Dossier",itemsUnderFolder:({count})=>count===1?"1 \xE9l\xE9ment sous ce dossier.":`${count} \xE9l\xE9ments sous ce dossier.`},tagContent:{tag:"\xC9tiquette",tagIndex:"Index des \xE9tiquettes",itemsUnderTag:({count})=>count===1?"1 \xE9l\xE9ment avec cette \xE9tiquette.":`${count} \xE9l\xE9ments avec cette \xE9tiquette.`,showingFirst:({count})=>`Affichage des premi\xE8res ${count} \xE9tiquettes.`,totalTags:({count})=>`Trouv\xE9 ${count} \xE9tiquettes au total.`}}};var it_IT_default={propertyDefaults:{title:"Senza titolo",description:"Nessuna descrizione"},components:{callout:{note:"Nota",abstract:"Astratto",info:"Info",todo:"Da fare",tip:"Consiglio",success:"Completato",question:"Domanda",warning:"Attenzione",failure:"Errore",danger:"Pericolo",bug:"Bug",example:"Esempio",quote:"Citazione"},backlinks:{title:"Link entranti",noBacklinksFound:"Nessun link entrante"},themeToggle:{lightMode:"Tema chiaro",darkMode:"Tema scuro"},explorer:{title:"Esplora"},footer:{createdWith:"Creato con"},graph:{title:"Vista grafico"},recentNotes:{title:"Note recenti",seeRemainingMore:({remaining})=>`Vedi ${remaining} altro \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transclusione di ${targetSlug}`,linkToOriginal:"Link all'originale"},search:{title:"Cerca",searchBarPlaceholder:"Cerca qualcosa"},tableOfContents:{title:"Tabella dei contenuti"},contentMeta:{readingTime:({minutes})=>`${minutes} minuti`}},pages:{rss:{recentNotes:"Note recenti",lastFewNotes:({count})=>`Ultime ${count} note`},error:{title:"Non trovato",notFound:"Questa pagina \xE8 privata o non esiste.",home:"Ritorna alla home page"},folderContent:{folder:"Cartella",itemsUnderFolder:({count})=>count===1?"1 oggetto in questa cartella.":`${count} oggetti in questa cartella.`},tagContent:{tag:"Etichetta",tagIndex:"Indice etichette",itemsUnderTag:({count})=>count===1?"1 oggetto con questa etichetta.":`${count} oggetti con questa etichetta.`,showingFirst:({count})=>`Prime ${count} etichette.`,totalTags:({count})=>`Trovate ${count} etichette totali.`}}};var ja_JP_default={propertyDefaults:{title:"\u7121\u984C",description:"\u8AAC\u660E\u306A\u3057"},components:{callout:{note:"\u30CE\u30FC\u30C8",abstract:"\u6284\u9332",info:"\u60C5\u5831",todo:"\u3084\u308B\u3079\u304D\u3053\u3068",tip:"\u30D2\u30F3\u30C8",success:"\u6210\u529F",question:"\u8CEA\u554F",warning:"\u8B66\u544A",failure:"\u5931\u6557",danger:"\u5371\u967A",bug:"\u30D0\u30B0",example:"\u4F8B",quote:"\u5F15\u7528"},backlinks:{title:"\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF",noBacklinksFound:"\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF\u306F\u3042\u308A\u307E\u305B\u3093"},themeToggle:{lightMode:"\u30E9\u30A4\u30C8\u30E2\u30FC\u30C9",darkMode:"\u30C0\u30FC\u30AF\u30E2\u30FC\u30C9"},explorer:{title:"\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC"},footer:{createdWith:"\u4F5C\u6210"},graph:{title:"\u30B0\u30E9\u30D5\u30D3\u30E5\u30FC"},recentNotes:{title:"\u6700\u8FD1\u306E\u8A18\u4E8B",seeRemainingMore:({remaining})=>`\u3055\u3089\u306B${remaining}\u4EF6 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`${targetSlug}\u306E\u307E\u3068\u3081`,linkToOriginal:"\u5143\u8A18\u4E8B\u3078\u306E\u30EA\u30F3\u30AF"},search:{title:"\u691C\u7D22",searchBarPlaceholder:"\u691C\u7D22\u30EF\u30FC\u30C9\u3092\u5165\u529B"},tableOfContents:{title:"\u76EE\u6B21"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"\u6700\u8FD1\u306E\u8A18\u4E8B",lastFewNotes:({count})=>`\u6700\u65B0\u306E${count}\u4EF6`},error:{title:"Not Found",notFound:"\u30DA\u30FC\u30B8\u304C\u5B58\u5728\u3057\u306A\u3044\u304B\u3001\u975E\u516C\u958B\u8A2D\u5B9A\u306B\u306A\u3063\u3066\u3044\u307E\u3059\u3002",home:"\u30DB\u30FC\u30E0\u30DA\u30FC\u30B8\u306B\u623B\u308B"},folderContent:{folder:"\u30D5\u30A9\u30EB\u30C0",itemsUnderFolder:({count})=>`${count}\u4EF6\u306E\u30DA\u30FC\u30B8`},tagContent:{tag:"\u30BF\u30B0",tagIndex:"\u30BF\u30B0\u4E00\u89A7",itemsUnderTag:({count})=>`${count}\u4EF6\u306E\u30DA\u30FC\u30B8`,showingFirst:({count})=>`\u306E\u3046\u3061\u6700\u521D\u306E${count}\u4EF6\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059`,totalTags:({count})=>`\u5168${count}\u500B\u306E\u30BF\u30B0\u3092\u8868\u793A\u4E2D`}}};var de_DE_default={propertyDefaults:{title:"Unbenannt",description:"Keine Beschreibung angegeben"},components:{callout:{note:"Hinweis",abstract:"Zusammenfassung",info:"Info",todo:"Zu erledigen",tip:"Tipp",success:"Erfolg",question:"Frage",warning:"Warnung",failure:"Misserfolg",danger:"Gefahr",bug:"Fehler",example:"Beispiel",quote:"Zitat"},backlinks:{title:"Backlinks",noBacklinksFound:"Keine Backlinks gefunden"},themeToggle:{lightMode:"Light Mode",darkMode:"Dark Mode"},explorer:{title:"Explorer"},footer:{createdWith:"Erstellt mit"},graph:{title:"Graphansicht"},recentNotes:{title:"Zuletzt bearbeitete Seiten",seeRemainingMore:({remaining})=>`${remaining} weitere ansehen \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transklusion von ${targetSlug}`,linkToOriginal:"Link zum Original"},search:{title:"Suche",searchBarPlaceholder:"Suche nach etwas"},tableOfContents:{title:"Inhaltsverzeichnis"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"Zuletzt bearbeitete Seiten",lastFewNotes:({count})=>`Letzte ${count} Seiten`},error:{title:"Nicht gefunden",notFound:"Diese Seite ist entweder nicht \xF6ffentlich oder existiert nicht.",home:"Return to Homepage"},folderContent:{folder:"Ordner",itemsUnderFolder:({count})=>count===1?"1 Datei in diesem Ordner.":`${count} Dateien in diesem Ordner.`},tagContent:{tag:"Tag",tagIndex:"Tag-\xDCbersicht",itemsUnderTag:({count})=>count===1?"1 Datei mit diesem Tag.":`${count} Dateien mit diesem Tag.`,showingFirst:({count})=>`Die ersten ${count} Tags werden angezeigt.`,totalTags:({count})=>`${count} Tags insgesamt.`}}};var nl_NL_default={propertyDefaults:{title:"Naamloos",description:"Geen beschrijving gegeven."},components:{callout:{note:"Notitie",abstract:"Samenvatting",info:"Info",todo:"Te doen",tip:"Tip",success:"Succes",question:"Vraag",warning:"Waarschuwing",failure:"Mislukking",danger:"Gevaar",bug:"Bug",example:"Voorbeeld",quote:"Citaat"},backlinks:{title:"Backlinks",noBacklinksFound:"Geen backlinks gevonden"},themeToggle:{lightMode:"Lichte modus",darkMode:"Donkere modus"},explorer:{title:"Verkenner"},footer:{createdWith:"Gemaakt met"},graph:{title:"Grafiekweergave"},recentNotes:{title:"Recente notities",seeRemainingMore:({remaining})=>`Zie ${remaining} meer \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Invoeging van ${targetSlug}`,linkToOriginal:"Link naar origineel"},search:{title:"Zoeken",searchBarPlaceholder:"Doorzoek de website"},tableOfContents:{title:"Inhoudsopgave"},contentMeta:{readingTime:({minutes})=>minutes===1?"1 minuut leestijd":`${minutes} minuten leestijd`}},pages:{rss:{recentNotes:"Recente notities",lastFewNotes:({count})=>`Laatste ${count} notities`},error:{title:"Niet gevonden",notFound:"Deze pagina is niet zichtbaar of bestaat niet.",home:"Keer terug naar de start pagina"},folderContent:{folder:"Map",itemsUnderFolder:({count})=>count===1?"1 item in deze map.":`${count} items in deze map.`},tagContent:{tag:"Label",tagIndex:"Label-index",itemsUnderTag:({count})=>count===1?"1 item met dit label.":`${count} items met dit label.`,showingFirst:({count})=>count===1?"Eerste label tonen.":`Eerste ${count} labels tonen.`,totalTags:({count})=>`${count} labels gevonden.`}}};var ro_RO_default={propertyDefaults:{title:"F\u0103r\u0103 titlu",description:"Nici o descriere furnizat\u0103"},components:{callout:{note:"Not\u0103",abstract:"Rezumat",info:"Informa\u021Bie",todo:"De f\u0103cut",tip:"Sfat",success:"Succes",question:"\xCEntrebare",warning:"Avertisment",failure:"E\u0219ec",danger:"Pericol",bug:"Bug",example:"Exemplu",quote:"Citat"},backlinks:{title:"Leg\u0103turi \xEEnapoi",noBacklinksFound:"Nu s-au g\u0103sit leg\u0103turi \xEEnapoi"},themeToggle:{lightMode:"Modul luminos",darkMode:"Modul \xEEntunecat"},explorer:{title:"Explorator"},footer:{createdWith:"Creat cu"},graph:{title:"Graf"},recentNotes:{title:"Noti\u021Be recente",seeRemainingMore:({remaining})=>`Vezi \xEEnc\u0103 ${remaining} \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Extras din ${targetSlug}`,linkToOriginal:"Leg\u0103tur\u0103 c\u0103tre original"},search:{title:"C\u0103utare",searchBarPlaceholder:"Introduce\u021Bi termenul de c\u0103utare..."},tableOfContents:{title:"Cuprins"},contentMeta:{readingTime:({minutes})=>minutes==1?"lectur\u0103 de 1 minut":`lectur\u0103 de ${minutes} minute`}},pages:{rss:{recentNotes:"Noti\u021Be recente",lastFewNotes:({count})=>`Ultimele ${count} noti\u021Be`},error:{title:"Pagina nu a fost g\u0103sit\u0103",notFound:"Fie aceast\u0103 pagin\u0103 este privat\u0103, fie nu exist\u0103.",home:"Reveni\u021Bi la pagina de pornire"},folderContent:{folder:"Dosar",itemsUnderFolder:({count})=>count===1?"1 articol \xEEn acest dosar.":`${count} elemente \xEEn acest dosar.`},tagContent:{tag:"Etichet\u0103",tagIndex:"Indexul etichetelor",itemsUnderTag:({count})=>count===1?"1 articol cu aceast\u0103 etichet\u0103.":`${count} articole cu aceast\u0103 etichet\u0103.`,showingFirst:({count})=>`Se afi\u0219eaz\u0103 primele ${count} etichete.`,totalTags:({count})=>`Au fost g\u0103site ${count} etichete \xEEn total.`}}};var ca_ES_default={propertyDefaults:{title:"Sense t\xEDtol",description:"Sense descripci\xF3"},components:{callout:{note:"Nota",abstract:"Resum",info:"Informaci\xF3",todo:"Per fer",tip:"Consell",success:"\xC8xit",question:"Pregunta",warning:"Advert\xE8ncia",failure:"Fall",danger:"Perill",bug:"Error",example:"Exemple",quote:"Cita"},backlinks:{title:"Retroenlla\xE7",noBacklinksFound:"No s'han trobat retroenlla\xE7os"},themeToggle:{lightMode:"Mode clar",darkMode:"Mode fosc"},explorer:{title:"Explorador"},footer:{createdWith:"Creat amb"},graph:{title:"Vista Gr\xE0fica"},recentNotes:{title:"Notes Recents",seeRemainingMore:({remaining})=>`Vegi ${remaining} m\xE9s \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transcluit de ${targetSlug}`,linkToOriginal:"Enlla\xE7 a l'original"},search:{title:"Cercar",searchBarPlaceholder:"Cerca alguna cosa"},tableOfContents:{title:"Taula de Continguts"},contentMeta:{readingTime:({minutes})=>`Es llegeix en ${minutes} min`}},pages:{rss:{recentNotes:"Notes recents",lastFewNotes:({count})=>`\xDAltimes ${count} notes`},error:{title:"No s'ha trobat.",notFound:"Aquesta p\xE0gina \xE9s privada o no existeix.",home:"Torna a la p\xE0gina principal"},folderContent:{folder:"Carpeta",itemsUnderFolder:({count})=>count===1?"1 article en aquesta carpeta.":`${count} articles en esta carpeta.`},tagContent:{tag:"Etiqueta",tagIndex:"\xEDndex d'Etiquetes",itemsUnderTag:({count})=>count===1?"1 article amb aquesta etiqueta.":`${count} article amb aquesta etiqueta.`,showingFirst:({count})=>`Mostrant les primeres ${count} etiquetes.`,totalTags:({count})=>`S'han trobat ${count} etiquetes en total.`}}};var es_ES_default={propertyDefaults:{title:"Sin t\xEDtulo",description:"Sin descripci\xF3n"},components:{callout:{note:"Nota",abstract:"Resumen",info:"Informaci\xF3n",todo:"Por hacer",tip:"Consejo",success:"\xC9xito",question:"Pregunta",warning:"Advertencia",failure:"Fallo",danger:"Peligro",bug:"Error",example:"Ejemplo",quote:"Cita"},backlinks:{title:"Retroenlaces",noBacklinksFound:"No se han encontrado retroenlaces"},themeToggle:{lightMode:"Modo claro",darkMode:"Modo oscuro"},explorer:{title:"Explorador"},footer:{createdWith:"Creado con"},graph:{title:"Vista Gr\xE1fica"},recentNotes:{title:"Notas Recientes",seeRemainingMore:({remaining})=>`Vea ${remaining} m\xE1s \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transcluido de ${targetSlug}`,linkToOriginal:"Enlace al original"},search:{title:"Buscar",searchBarPlaceholder:"Busca algo"},tableOfContents:{title:"Tabla de Contenidos"},contentMeta:{readingTime:({minutes})=>`Se lee en ${minutes} min`}},pages:{rss:{recentNotes:"Notas recientes",lastFewNotes:({count})=>`\xDAltimas ${count} notas`},error:{title:"No se ha encontrado.",notFound:"Esta p\xE1gina es privada o no existe.",home:"Regresa a la p\xE1gina principal"},folderContent:{folder:"Carpeta",itemsUnderFolder:({count})=>count===1?"1 art\xEDculo en esta carpeta.":`${count} art\xEDculos en esta carpeta.`},tagContent:{tag:"Etiqueta",tagIndex:"\xCDndice de Etiquetas",itemsUnderTag:({count})=>count===1?"1 art\xEDculo con esta etiqueta.":`${count} art\xEDculos con esta etiqueta.`,showingFirst:({count})=>`Mostrando las primeras ${count} etiquetas.`,totalTags:({count})=>`Se han encontrado ${count} etiquetas en total.`}}};var ar_SA_default={propertyDefaults:{title:"\u063A\u064A\u0631 \u0645\u0639\u0646\u0648\u0646",description:"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0642\u062F\u064A\u0645 \u0623\u064A \u0648\u0635\u0641"},components:{callout:{note:"\u0645\u0644\u0627\u062D\u0638\u0629",abstract:"\u0645\u0644\u062E\u0635",info:"\u0645\u0639\u0644\u0648\u0645\u0627\u062A",todo:"\u0644\u0644\u0642\u064A\u0627\u0645",tip:"\u0646\u0635\u064A\u062D\u0629",success:"\u0646\u062C\u0627\u062D",question:"\u0633\u0624\u0627\u0644",warning:"\u062A\u062D\u0630\u064A\u0631",failure:"\u0641\u0634\u0644",danger:"\u062E\u0637\u0631",bug:"\u062E\u0644\u0644",example:"\u0645\u062B\u0627\u0644",quote:"\u0627\u0642\u062A\u0628\u0627\u0633"},backlinks:{title:"\u0648\u0635\u0644\u0627\u062A \u0627\u0644\u0639\u0648\u062F\u0629",noBacklinksFound:"\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0644\u0627\u062A \u0639\u0648\u062F\u0629"},themeToggle:{lightMode:"\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0646\u0647\u0627\u0631\u064A",darkMode:"\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0644\u064A\u0644\u064A"},explorer:{title:"\u0627\u0644\u0645\u0633\u062A\u0639\u0631\u0636"},footer:{createdWith:"\u0623\u064F\u0646\u0634\u0626 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645"},graph:{title:"\u0627\u0644\u062A\u0645\u062B\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A"},recentNotes:{title:"\u0622\u062E\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",seeRemainingMore:({remaining})=>`\u062A\u0635\u0641\u062D ${remaining} \u0623\u0643\u062B\u0631 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u0645\u0642\u062A\u0628\u0633 \u0645\u0646 ${targetSlug}`,linkToOriginal:"\u0648\u0635\u0644\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u0629"},search:{title:"\u0628\u062D\u062B",searchBarPlaceholder:"\u0627\u0628\u062D\u062B \u0639\u0646 \u0634\u064A\u0621 \u0645\u0627"},tableOfContents:{title:"\u0641\u0647\u0631\u0633 \u0627\u0644\u0645\u062D\u062A\u0648\u064A\u0627\u062A"},contentMeta:{readingTime:({minutes})=>minutes==1?"\u062F\u0642\u064A\u0642\u0629 \u0623\u0648 \u0623\u0642\u0644 \u0644\u0644\u0642\u0631\u0627\u0621\u0629":minutes==2?"\u062F\u0642\u064A\u0642\u062A\u0627\u0646 \u0644\u0644\u0642\u0631\u0627\u0621\u0629":`${minutes} \u062F\u0642\u0627\u0626\u0642 \u0644\u0644\u0642\u0631\u0627\u0621\u0629`}},pages:{rss:{recentNotes:"\u0622\u062E\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",lastFewNotes:({count})=>`\u0622\u062E\u0631 ${count} \u0645\u0644\u0627\u062D\u0638\u0629`},error:{title:"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F",notFound:"\u0625\u0645\u0627 \u0623\u0646 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u062E\u0627\u0635\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629.",home:"\u0627\u0644\u0639\u0648\u062F\u0647 \u0644\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629"},folderContent:{folder:"\u0645\u062C\u0644\u062F",itemsUnderFolder:({count})=>count===1?"\u064A\u0648\u062C\u062F \u0639\u0646\u0635\u0631 \u0648\u0627\u062D\u062F \u0641\u0642\u0637 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0644\u062F":`\u064A\u0648\u062C\u062F ${count} \u0639\u0646\u0627\u0635\u0631 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0644\u062F.`},tagContent:{tag:"\u0627\u0644\u0648\u0633\u0645",tagIndex:"\u0645\u0624\u0634\u0631 \u0627\u0644\u0648\u0633\u0645",itemsUnderTag:({count})=>count===1?"\u064A\u0648\u062C\u062F \u0639\u0646\u0635\u0631 \u0648\u0627\u062D\u062F \u0641\u0642\u0637 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0648\u0633\u0645":`\u064A\u0648\u062C\u062F ${count} \u0639\u0646\u0627\u0635\u0631 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0648\u0633\u0645.`,showingFirst:({count})=>`\u0625\u0638\u0647\u0627\u0631 \u0623\u0648\u0644 ${count} \u0623\u0648\u0633\u0645\u0629.`,totalTags:({count})=>`\u064A\u0648\u062C\u062F ${count} \u0623\u0648\u0633\u0645\u0629.`}}};var uk_UA_default={propertyDefaults:{title:"\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0438",description:"\u041E\u043F\u0438\u0441 \u043D\u0435 \u043D\u0430\u0434\u0430\u043D\u043E"},components:{callout:{note:"\u041F\u0440\u0438\u043C\u0456\u0442\u043A\u0430",abstract:"\u0410\u0431\u0441\u0442\u0440\u0430\u043A\u0442",info:"\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F",todo:"\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F",tip:"\u041F\u043E\u0440\u0430\u0434\u0430",success:"\u0423\u0441\u043F\u0456\u0445",question:"\u041F\u0438\u0442\u0430\u043D\u043D\u044F",warning:"\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u0436\u0435\u043D\u043D\u044F",failure:"\u041D\u0435\u0432\u0434\u0430\u0447\u0430",danger:"\u041D\u0435\u0431\u0435\u0437\u043F\u0435\u043A\u0430",bug:"\u0411\u0430\u0433",example:"\u041F\u0440\u0438\u043A\u043B\u0430\u0434",quote:"\u0426\u0438\u0442\u0430\u0442\u0430"},backlinks:{title:"\u0417\u0432\u043E\u0440\u043E\u0442\u043D\u0456 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F",noBacklinksFound:"\u0417\u0432\u043E\u0440\u043E\u0442\u043D\u0438\u0445 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u044C \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E"},themeToggle:{lightMode:"\u0421\u0432\u0456\u0442\u043B\u0438\u0439 \u0440\u0435\u0436\u0438\u043C",darkMode:"\u0422\u0435\u043C\u043D\u0438\u0439 \u0440\u0435\u0436\u0438\u043C"},explorer:{title:"\u041F\u0440\u043E\u0432\u0456\u0434\u043D\u0438\u043A"},footer:{createdWith:"\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043E \u0437\u0430 \u0434\u043E\u043F\u043E\u043C\u043E\u0433\u043E\u044E"},graph:{title:"\u0412\u0438\u0433\u043B\u044F\u0434 \u0433\u0440\u0430\u0444\u0430"},recentNotes:{title:"\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438",seeRemainingMore:({remaining})=>`\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0449\u0435 ${remaining} \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u0412\u0438\u0434\u043E\u0431\u0443\u0442\u043E \u0437 ${targetSlug}`,linkToOriginal:"\u041F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u043D\u0430 \u043E\u0440\u0438\u0433\u0456\u043D\u0430\u043B"},search:{title:"\u041F\u043E\u0448\u0443\u043A",searchBarPlaceholder:"\u0428\u0443\u043A\u0430\u0442\u0438 \u0449\u043E\u0441\u044C"},tableOfContents:{title:"\u0417\u043C\u0456\u0441\u0442"},contentMeta:{readingTime:({minutes})=>`${minutes} \u0445\u0432 \u0447\u0438\u0442\u0430\u043D\u043D\u044F`}},pages:{rss:{recentNotes:"\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438",lastFewNotes:({count})=>`\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438: ${count}`},error:{title:"\u041D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E",notFound:"\u0426\u044F \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0430 \u0430\u0431\u043E \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0430, \u0430\u0431\u043E \u043D\u0435 \u0456\u0441\u043D\u0443\u0454.",home:"\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\u0441\u044F \u043D\u0430 \u0433\u043E\u043B\u043E\u0432\u043D\u0443 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443"},folderContent:{folder:"\u0422\u0435\u043A\u0430",itemsUnderFolder:({count})=>count===1?"\u0423 \u0446\u0456\u0439 \u0442\u0435\u0446\u0456 1 \u0435\u043B\u0435\u043C\u0435\u043D\u0442.":`\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432 \u0443 \u0446\u0456\u0439 \u0442\u0435\u0446\u0456: ${count}.`},tagContent:{tag:"\u041C\u0456\u0442\u043A\u0430",tagIndex:"\u0406\u043D\u0434\u0435\u043A\u0441 \u043C\u0456\u0442\u043A\u0438",itemsUnderTag:({count})=>count===1?"1 \u0435\u043B\u0435\u043C\u0435\u043D\u0442 \u0437 \u0446\u0456\u0454\u044E \u043C\u0456\u0442\u043A\u043E\u044E.":`\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432 \u0437 \u0446\u0456\u0454\u044E \u043C\u0456\u0442\u043A\u043E\u044E: ${count}.`,showingFirst:({count})=>`\u041F\u043E\u043A\u0430\u0437 \u043F\u0435\u0440\u0448\u0438\u0445 ${count} \u043C\u0456\u0442\u043E\u043A.`,totalTags:({count})=>`\u0412\u0441\u044C\u043E\u0433\u043E \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043C\u0456\u0442\u043E\u043A: ${count}.`}}};var ru_RU_default={propertyDefaults:{title:"\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",description:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442"},components:{callout:{note:"\u0417\u0430\u043C\u0435\u0442\u043A\u0430",abstract:"\u0420\u0435\u0437\u044E\u043C\u0435",info:"\u0418\u043D\u0444\u043E",todo:"\u0421\u0434\u0435\u043B\u0430\u0442\u044C",tip:"\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",question:"\u0412\u043E\u043F\u0440\u043E\u0441",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",failure:"\u041D\u0435\u0443\u0434\u0430\u0447\u0430",danger:"\u041E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C",bug:"\u0411\u0430\u0433",example:"\u041F\u0440\u0438\u043C\u0435\u0440",quote:"\u0426\u0438\u0442\u0430\u0442\u0430"},backlinks:{title:"\u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438",noBacklinksFound:"\u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442"},themeToggle:{lightMode:"\u0421\u0432\u0435\u0442\u043B\u044B\u0439 \u0440\u0435\u0436\u0438\u043C",darkMode:"\u0422\u0451\u043C\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C"},explorer:{title:"\u041F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A"},footer:{createdWith:"\u0421\u043E\u0437\u0434\u0430\u043D\u043E \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E"},graph:{title:"\u0412\u0438\u0434 \u0433\u0440\u0430\u0444\u0430"},recentNotes:{title:"\u041D\u0435\u0434\u0430\u0432\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",seeRemainingMore:({remaining})=>`\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0441\u0442\u0430\u0432\u0448${getForm(remaining,"\u0443\u044E\u0441\u044F","\u0438\u0435\u0441\u044F","\u0438\u0435\u0441\u044F")} ${remaining} \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u0438\u0437 ${targetSlug}`,linkToOriginal:"\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B"},search:{title:"\u041F\u043E\u0438\u0441\u043A",searchBarPlaceholder:"\u041D\u0430\u0439\u0442\u0438 \u0447\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C"},tableOfContents:{title:"\u041E\u0433\u043B\u0430\u0432\u043B\u0435\u043D\u0438\u0435"},contentMeta:{readingTime:({minutes})=>`\u0432\u0440\u0435\u043C\u044F \u0447\u0442\u0435\u043D\u0438\u044F ~${minutes} \u043C\u0438\u043D.`}},pages:{rss:{recentNotes:"\u041D\u0435\u0434\u0430\u0432\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",lastFewNotes:({count})=>`\u041F\u043E\u0441\u043B\u0435\u0434\u043D${getForm(count,"\u044F\u044F","\u0438\u0435","\u0438\u0435")} ${count} \u0437\u0430\u043C\u0435\u0442${getForm(count,"\u043A\u0430","\u043A\u0438","\u043E\u043A")}`},error:{title:"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",notFound:"\u042D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0430\u044F \u0438\u043B\u0438 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442",home:"\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443"},folderContent:{folder:"\u041F\u0430\u043F\u043A\u0430",itemsUnderFolder:({count})=>`\u0432 \u044D\u0442\u043E\u0439 \u043F\u0430\u043F\u043A\u0435 ${count} \u044D\u043B\u0435\u043C\u0435\u043D\u0442${getForm(count,"","\u0430","\u043E\u0432")}`},tagContent:{tag:"\u0422\u0435\u0433",tagIndex:"\u0418\u043D\u0434\u0435\u043A\u0441 \u0442\u0435\u0433\u043E\u0432",itemsUnderTag:({count})=>`\u0441 \u044D\u0442\u0438\u043C \u0442\u0435\u0433\u043E\u043C ${count} \u044D\u043B\u0435\u043C\u0435\u043D\u0442${getForm(count,"","\u0430","\u043E\u0432")}`,showingFirst:({count})=>`\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430${getForm(count,"\u0435\u0442\u0441\u044F","\u044E\u0442\u0441\u044F","\u044E\u0442\u0441\u044F")} ${count} \u0442\u0435\u0433${getForm(count,"","\u0430","\u043E\u0432")}`,totalTags:({count})=>`\u0412\u0441\u0435\u0433\u043E ${count} \u0442\u0435\u0433${getForm(count,"","\u0430","\u043E\u0432")}`}}};function getForm(number,form1,form2,form5){let remainder100=number%100,remainder10=remainder100%10;return remainder100>=10&&remainder100<=20?form5:remainder10>1&&remainder10<5?form2:remainder10==1?form1:form5}__name(getForm,"getForm");var ko_KR_default={propertyDefaults:{title:"\uC81C\uBAA9 \uC5C6\uC74C",description:"\uC124\uBA85 \uC5C6\uC74C"},components:{callout:{note:"\uB178\uD2B8",abstract:"\uAC1C\uC694",info:"\uC815\uBCF4",todo:"\uD560\uC77C",tip:"\uD301",success:"\uC131\uACF5",question:"\uC9C8\uBB38",warning:"\uC8FC\uC758",failure:"\uC2E4\uD328",danger:"\uC704\uD5D8",bug:"\uBC84\uADF8",example:"\uC608\uC2DC",quote:"\uC778\uC6A9"},backlinks:{title:"\uBC31\uB9C1\uD06C",noBacklinksFound:"\uBC31\uB9C1\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."},themeToggle:{lightMode:"\uB77C\uC774\uD2B8 \uBAA8\uB4DC",darkMode:"\uB2E4\uD06C \uBAA8\uB4DC"},explorer:{title:"\uD0D0\uC0C9\uAE30"},footer:{createdWith:"Created with"},graph:{title:"\uADF8\uB798\uD504 \uBDF0"},recentNotes:{title:"\uCD5C\uADFC \uAC8C\uC2DC\uAE00",seeRemainingMore:({remaining})=>`${remaining}\uAC74 \uB354\uBCF4\uAE30 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`${targetSlug}\uC758 \uD3EC\uD568`,linkToOriginal:"\uC6D0\uBCF8 \uB9C1\uD06C"},search:{title:"\uAC80\uC0C9",searchBarPlaceholder:"\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694"},tableOfContents:{title:"\uBAA9\uCC28"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"\uCD5C\uADFC \uAC8C\uC2DC\uAE00",lastFewNotes:({count})=>`\uCD5C\uADFC ${count} \uAC74`},error:{title:"Not Found",notFound:"\uD398\uC774\uC9C0\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uAC70\uB098 \uBE44\uACF5\uAC1C \uC124\uC815\uC774 \uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",home:"\uD648\uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00\uAE30"},folderContent:{folder:"\uD3F4\uB354",itemsUnderFolder:({count})=>`${count}\uAC74\uC758 \uD56D\uBAA9`},tagContent:{tag:"\uD0DC\uADF8",tagIndex:"\uD0DC\uADF8 \uBAA9\uB85D",itemsUnderTag:({count})=>`${count}\uAC74\uC758 \uD56D\uBAA9`,showingFirst:({count})=>`\uCC98\uC74C ${count}\uAC1C\uC758 \uD0DC\uADF8`,totalTags:({count})=>`\uCD1D ${count}\uAC1C\uC758 \uD0DC\uADF8\uB97C \uCC3E\uC558\uC2B5\uB2C8\uB2E4.`}}};var zh_CN_default={propertyDefaults:{title:"\u65E0\u9898",description:"\u65E0\u63CF\u8FF0"},components:{callout:{note:"\u7B14\u8BB0",abstract:"\u6458\u8981",info:"\u63D0\u793A",todo:"\u5F85\u529E",tip:"\u63D0\u793A",success:"\u6210\u529F",question:"\u95EE\u9898",warning:"\u8B66\u544A",failure:"\u5931\u8D25",danger:"\u5371\u9669",bug:"\u9519\u8BEF",example:"\u793A\u4F8B",quote:"\u5F15\u7528"},backlinks:{title:"\u53CD\u5411\u94FE\u63A5",noBacklinksFound:"\u65E0\u6CD5\u627E\u5230\u53CD\u5411\u94FE\u63A5"},themeToggle:{lightMode:"\u4EAE\u8272\u6A21\u5F0F",darkMode:"\u6697\u8272\u6A21\u5F0F"},explorer:{title:"\u63A2\u7D22"},footer:{createdWith:"Created with"},graph:{title:"\u5173\u7CFB\u56FE\u8C31"},recentNotes:{title:"\u6700\u8FD1\u7684\u7B14\u8BB0",seeRemainingMore:({remaining})=>`\u67E5\u770B\u66F4\u591A${remaining}\u7BC7\u7B14\u8BB0 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u5305\u542B${targetSlug}`,linkToOriginal:"\u6307\u5411\u539F\u59CB\u7B14\u8BB0\u7684\u94FE\u63A5"},search:{title:"\u641C\u7D22",searchBarPlaceholder:"\u641C\u7D22\u4E9B\u4EC0\u4E48"},tableOfContents:{title:"\u76EE\u5F55"},contentMeta:{readingTime:({minutes})=>`${minutes}\u5206\u949F\u9605\u8BFB`}},pages:{rss:{recentNotes:"\u6700\u8FD1\u7684\u7B14\u8BB0",lastFewNotes:({count})=>`\u6700\u8FD1\u7684${count}\u6761\u7B14\u8BB0`},error:{title:"\u65E0\u6CD5\u627E\u5230",notFound:"\u79C1\u6709\u7B14\u8BB0\u6216\u7B14\u8BB0\u4E0D\u5B58\u5728\u3002",home:"\u8FD4\u56DE\u9996\u9875"},folderContent:{folder:"\u6587\u4EF6\u5939",itemsUnderFolder:({count})=>`\u6B64\u6587\u4EF6\u5939\u4E0B\u6709${count}\u6761\u7B14\u8BB0\u3002`},tagContent:{tag:"\u6807\u7B7E",tagIndex:"\u6807\u7B7E\u7D22\u5F15",itemsUnderTag:({count})=>`\u6B64\u6807\u7B7E\u4E0B\u6709${count}\u6761\u7B14\u8BB0\u3002`,showingFirst:({count})=>`\u663E\u793A\u524D${count}\u4E2A\u6807\u7B7E\u3002`,totalTags:({count})=>`\u603B\u5171\u6709${count}\u4E2A\u6807\u7B7E\u3002`}}};var vi_VN_default={propertyDefaults:{title:"Kh\xF4ng c\xF3 ti\xEAu \u0111\u1EC1",description:"Kh\xF4ng c\xF3 m\xF4 t\u1EA3 \u0111\u01B0\u1EE3c cung c\u1EA5p"},components:{callout:{note:"Ghi Ch\xFA",abstract:"T\xF3m T\u1EAFt",info:"Th\xF4ng tin",todo:"C\u1EA7n L\xE0m",tip:"G\u1EE3i \xDD",success:"Th\xE0nh C\xF4ng",question:"Nghi V\u1EA5n",warning:"C\u1EA3nh B\xE1o",failure:"Th\u1EA5t B\u1EA1i",danger:"Nguy Hi\u1EC3m",bug:"L\u1ED7i",example:"V\xED D\u1EE5",quote:"Tr\xEDch D\u1EABn"},backlinks:{title:"Li\xEAn K\u1EBFt Ng\u01B0\u1EE3c",noBacklinksFound:"Kh\xF4ng c\xF3 li\xEAn k\u1EBFt ng\u01B0\u1EE3c \u0111\u01B0\u1EE3c t\xECm th\u1EA5y"},themeToggle:{lightMode:"S\xE1ng",darkMode:"T\u1ED1i"},explorer:{title:"Trong b\xE0i n\xE0y"},footer:{createdWith:"\u0110\u01B0\u1EE3c t\u1EA1o b\u1EDFi"},graph:{title:"Bi\u1EC3u \u0110\u1ED3"},recentNotes:{title:"B\xE0i vi\u1EBFt g\u1EA7n \u0111\xE2y",seeRemainingMore:({remaining})=>`Xem ${remaining} th\xEAm \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Bao g\u1ED3m ${targetSlug}`,linkToOriginal:"Li\xEAn K\u1EBFt G\u1ED1c"},search:{title:"T\xECm Ki\u1EBFm",searchBarPlaceholder:"T\xECm ki\u1EBFm th\xF4ng tin"},tableOfContents:{title:"B\u1EA3ng N\u1ED9i Dung"},contentMeta:{readingTime:({minutes})=>`\u0111\u1ECDc ${minutes} ph\xFAt`}},pages:{rss:{recentNotes:"Nh\u1EEFng b\xE0i g\u1EA7n \u0111\xE2y",lastFewNotes:({count})=>`${count} B\xE0i g\u1EA7n \u0111\xE2y`},error:{title:"Kh\xF4ng T\xECm Th\u1EA5y",notFound:"Trang n\xE0y \u0111\u01B0\u1EE3c b\u1EA3o m\u1EADt ho\u1EB7c kh\xF4ng t\u1ED3n t\u1EA1i.",home:"Tr\u1EDF v\u1EC1 trang ch\u1EE7"},folderContent:{folder:"Th\u01B0 M\u1EE5c",itemsUnderFolder:({count})=>count===1?"1 m\u1EE5c trong th\u01B0 m\u1EE5c n\xE0y.":`${count} m\u1EE5c trong th\u01B0 m\u1EE5c n\xE0y.`},tagContent:{tag:"Th\u1EBB",tagIndex:"Th\u1EBB M\u1EE5c L\u1EE5c",itemsUnderTag:({count})=>count===1?"1 m\u1EE5c g\u1EAFn th\u1EBB n\xE0y.":`${count} m\u1EE5c g\u1EAFn th\u1EBB n\xE0y.`,showingFirst:({count})=>`Hi\u1EC3n th\u1ECB tr\u01B0\u1EDBc ${count} th\u1EBB.`,totalTags:({count})=>`T\xECm th\u1EA5y ${count} th\u1EBB t\u1ED5ng c\u1ED9ng.`}}};var pt_BR_default={propertyDefaults:{title:"Sem t\xEDtulo",description:"Sem descri\xE7\xE3o"},components:{callout:{note:"Nota",abstract:"Abstrato",info:"Info",todo:"Pend\xEAncia",tip:"Dica",success:"Sucesso",question:"Pergunta",warning:"Aviso",failure:"Falha",danger:"Perigo",bug:"Bug",example:"Exemplo",quote:"Cita\xE7\xE3o"},backlinks:{title:"Backlinks",noBacklinksFound:"Sem backlinks encontrados"},themeToggle:{lightMode:"Tema claro",darkMode:"Tema escuro"},explorer:{title:"Explorador"},footer:{createdWith:"Criado com"},graph:{title:"Vis\xE3o de gr\xE1fico"},recentNotes:{title:"Notas recentes",seeRemainingMore:({remaining})=>`Veja mais ${remaining} \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transcrever de ${targetSlug}`,linkToOriginal:"Link ao original"},search:{title:"Pesquisar",searchBarPlaceholder:"Pesquisar por algo"},tableOfContents:{title:"Sum\xE1rio"},contentMeta:{readingTime:({minutes})=>`Leitura de ${minutes} min`}},pages:{rss:{recentNotes:"Notas recentes",lastFewNotes:({count})=>`\xDAltimas ${count} notas`},error:{title:"N\xE3o encontrado",notFound:"Esta p\xE1gina \xE9 privada ou n\xE3o existe.",home:"Retornar a p\xE1gina inicial"},folderContent:{folder:"Arquivo",itemsUnderFolder:({count})=>count===1?"1 item neste arquivo.":`${count} items neste arquivo.`},tagContent:{tag:"Tag",tagIndex:"Sum\xE1rio de Tags",itemsUnderTag:({count})=>count===1?"1 item com esta tag.":`${count} items com esta tag.`,showingFirst:({count})=>`Mostrando as ${count} primeiras tags.`,totalTags:({count})=>`Encontradas ${count} tags.`}}};var hu_HU_default={propertyDefaults:{title:"N\xE9vtelen",description:"Nincs le\xEDr\xE1s"},components:{callout:{note:"Jegyzet",abstract:"Abstract",info:"Inform\xE1ci\xF3",todo:"Tennival\xF3",tip:"Tipp",success:"Siker",question:"K\xE9rd\xE9s",warning:"Figyelmeztet\xE9s",failure:"Hiba",danger:"Vesz\xE9ly",bug:"Bug",example:"P\xE9lda",quote:"Id\xE9zet"},backlinks:{title:"Visszautal\xE1sok",noBacklinksFound:"Nincs visszautal\xE1s"},themeToggle:{lightMode:"Vil\xE1gos m\xF3d",darkMode:"S\xF6t\xE9t m\xF3d"},explorer:{title:"F\xE1jlb\xF6ng\xE9sz\u0151"},footer:{createdWith:"K\xE9sz\xEDtve ezzel:"},graph:{title:"Grafikonn\xE9zet"},recentNotes:{title:"Legut\xF3bbi jegyzetek",seeRemainingMore:({remaining})=>`${remaining} tov\xE1bbi megtekint\xE9se \u2192`},transcludes:{transcludeOf:({targetSlug})=>`${targetSlug} \xE1thivatkoz\xE1sa`,linkToOriginal:"Hivatkoz\xE1s az eredetire"},search:{title:"Keres\xE9s",searchBarPlaceholder:"Keress valamire"},tableOfContents:{title:"Tartalomjegyz\xE9k"},contentMeta:{readingTime:({minutes})=>`${minutes} perces olvas\xE1s`}},pages:{rss:{recentNotes:"Legut\xF3bbi jegyzetek",lastFewNotes:({count})=>`Legut\xF3bbi ${count} jegyzet`},error:{title:"Nem tal\xE1lhat\xF3",notFound:"Ez a lap vagy priv\xE1t vagy nem l\xE9tezik.",home:"Vissza a kezd\u0151lapra"},folderContent:{folder:"Mappa",itemsUnderFolder:({count})=>`Ebben a mapp\xE1ban ${count} elem tal\xE1lhat\xF3.`},tagContent:{tag:"C\xEDmke",tagIndex:"C\xEDmke index",itemsUnderTag:({count})=>`${count} elem tal\xE1lhat\xF3 ezzel a c\xEDmk\xE9vel.`,showingFirst:({count})=>`Els\u0151 ${count} c\xEDmke megjelen\xEDtve.`,totalTags:({count})=>`\xD6sszesen ${count} c\xEDmke tal\xE1lhat\xF3.`}}};var fa_IR_default={propertyDefaults:{title:"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646",description:"\u062A\u0648\u0636\u06CC\u062D \u062E\u0627\u0635\u06CC \u0627\u0636\u0627\u0641\u0647 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A"},components:{callout:{note:"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A",abstract:"\u0686\u06A9\u06CC\u062F\u0647",info:"\u0627\u0637\u0644\u0627\u0639\u0627\u062A",todo:"\u0627\u0642\u062F\u0627\u0645",tip:"\u0646\u06A9\u062A\u0647",success:"\u062A\u06CC\u06A9",question:"\u0633\u0624\u0627\u0644",warning:"\u0647\u0634\u062F\u0627\u0631",failure:"\u0634\u06A9\u0633\u062A",danger:"\u062E\u0637\u0631",bug:"\u0628\u0627\u06AF",example:"\u0645\u062B\u0627\u0644",quote:"\u0646\u0642\u0644 \u0642\u0648\u0644"},backlinks:{title:"\u0628\u06A9\u200C\u0644\u06CC\u0646\u06A9\u200C\u0647\u0627",noBacklinksFound:"\u0628\u062F\u0648\u0646 \u0628\u06A9\u200C\u0644\u06CC\u0646\u06A9"},themeToggle:{lightMode:"\u062D\u0627\u0644\u062A \u0631\u0648\u0634\u0646",darkMode:"\u062D\u0627\u0644\u062A \u062A\u0627\u0631\u06CC\u06A9"},explorer:{title:"\u0645\u0637\u0627\u0644\u0628"},footer:{createdWith:"\u0633\u0627\u062E\u062A\u0647 \u0634\u062F\u0647 \u0628\u0627"},graph:{title:"\u0646\u0645\u0627\u06CC \u06AF\u0631\u0627\u0641"},recentNotes:{title:"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",seeRemainingMore:({remaining})=>`${remaining} \u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u062F\u06CC\u06AF\u0631 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u0627\u0632 ${targetSlug}`,linkToOriginal:"\u067E\u06CC\u0648\u0646\u062F \u0628\u0647 \u0627\u0635\u0644\u06CC"},search:{title:"\u062C\u0633\u062A\u062C\u0648",searchBarPlaceholder:"\u0645\u0637\u0644\u0628\u06CC \u0631\u0627 \u062C\u0633\u062A\u062C\u0648 \u06A9\u0646\u06CC\u062F"},tableOfContents:{title:"\u0641\u0647\u0631\u0633\u062A"},contentMeta:{readingTime:({minutes})=>`\u0632\u0645\u0627\u0646 \u062A\u0642\u0631\u06CC\u0628\u06CC \u0645\u0637\u0627\u0644\u0639\u0647: ${minutes} \u062F\u0642\u06CC\u0642\u0647`}},pages:{rss:{recentNotes:"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",lastFewNotes:({count})=>`${count} \u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u0627\u062E\u06CC\u0631`},error:{title:"\u06CC\u0627\u0641\u062A \u0646\u0634\u062F",notFound:"\u0627\u06CC\u0646 \u0635\u0641\u062D\u0647 \u06CC\u0627 \u062E\u0635\u0648\u0635\u06CC \u0627\u0633\u062A \u06CC\u0627 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F",home:"\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0635\u0641\u062D\u0647 \u0627\u0635\u0644\u06CC"},folderContent:{folder:"\u067E\u0648\u0634\u0647",itemsUnderFolder:({count})=>count===1?".\u06CC\u06A9 \u0645\u0637\u0644\u0628 \u062F\u0631 \u0627\u06CC\u0646 \u067E\u0648\u0634\u0647 \u0627\u0633\u062A":`${count} \u0645\u0637\u0644\u0628 \u062F\u0631 \u0627\u06CC\u0646 \u067E\u0648\u0634\u0647 \u0627\u0633\u062A.`},tagContent:{tag:"\u0628\u0631\u0686\u0633\u0628",tagIndex:"\u0641\u0647\u0631\u0633\u062A \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627",itemsUnderTag:({count})=>count===1?"\u06CC\u06A9 \u0645\u0637\u0644\u0628 \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0631\u0686\u0633\u0628":`${count} \u0645\u0637\u0644\u0628 \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0631\u0686\u0633\u0628.`,showingFirst:({count})=>`\u062F\u0631 \u062D\u0627\u0644 \u0646\u0645\u0627\u06CC\u0634 ${count} \u0628\u0631\u0686\u0633\u0628.`,totalTags:({count})=>`${count} \u0628\u0631\u0686\u0633\u0628 \u06CC\u0627\u0641\u062A \u0634\u062F.`}}};var pl_PL_default={propertyDefaults:{title:"Bez nazwy",description:"Brak opisu"},components:{callout:{note:"Notatka",abstract:"Streszczenie",info:"informacja",todo:"Do zrobienia",tip:"Wskaz\xF3wka",success:"Zrobione",question:"Pytanie",warning:"Ostrze\u017Cenie",failure:"Usterka",danger:"Niebiezpiecze\u0144stwo",bug:"B\u0142\u0105d w kodzie",example:"Przyk\u0142ad",quote:"Cytat"},backlinks:{title:"Odno\u015Bniki zwrotne",noBacklinksFound:"Brak po\u0142\u0105cze\u0144 zwrotnych"},themeToggle:{lightMode:"Trzyb jasny",darkMode:"Tryb ciemny"},explorer:{title:"Przegl\u0105daj"},footer:{createdWith:"Stworzone z u\u017Cyciem"},graph:{title:"Graf"},recentNotes:{title:"Najnowsze notatki",seeRemainingMore:({remaining})=>`Zobacz ${remaining} nastepnych \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Osadzone ${targetSlug}`,linkToOriginal:"\u0141\u0105cze do orygina\u0142u"},search:{title:"Szukaj",searchBarPlaceholder:"Search for something"},tableOfContents:{title:"Spis tre\u015Bci"},contentMeta:{readingTime:({minutes})=>`${minutes} min. czytania `}},pages:{rss:{recentNotes:"Najnowsze notatki",lastFewNotes:({count})=>`Ostatnie ${count} notatek`},error:{title:"Nie znaleziono",notFound:"Ta strona jest prywatna lub nie istnieje.",home:"Powr\xF3t do strony g\u0142\xF3wnej"},folderContent:{folder:"Folder",itemsUnderFolder:({count})=>count===1?"W tym folderze jest 1 element.":`Element\xF3w w folderze: ${count}.`},tagContent:{tag:"Znacznik",tagIndex:"Spis znacznik\xF3w",itemsUnderTag:({count})=>count===1?"Oznaczony 1 element.":`Element\xF3w z tym znacznikiem: ${count}.`,showingFirst:({count})=>`Pokazuje ${count} pierwszych znacznik\xF3w.`,totalTags:({count})=>`Znalezionych wszystkich znacznik\xF3w: ${count}.`}}};var cs_CZ_default={propertyDefaults:{title:"Bez n\xE1zvu",description:"Nebyl uveden \u017E\xE1dn\xFD popis"},components:{callout:{note:"Pozn\xE1mka",abstract:"Abstract",info:"Info",todo:"Todo",tip:"Tip",success:"\xDAsp\u011Bch",question:"Ot\xE1zka",warning:"Upozorn\u011Bn\xED",failure:"Chyba",danger:"Nebezpe\u010D\xED",bug:"Bug",example:"P\u0159\xEDklad",quote:"Citace"},backlinks:{title:"P\u0159\xEDchoz\xED odkazy",noBacklinksFound:"Nenalezeny \u017E\xE1dn\xE9 p\u0159\xEDchoz\xED odkazy"},themeToggle:{lightMode:"Sv\u011Btl\xFD re\u017Eim",darkMode:"Tmav\xFD re\u017Eim"},explorer:{title:"Proch\xE1zet"},footer:{createdWith:"Vytvo\u0159eno pomoc\xED"},graph:{title:"Graf"},recentNotes:{title:"Nejnov\u011Bj\u0161\xED pozn\xE1mky",seeRemainingMore:({remaining})=>`Zobraz ${remaining} dal\u0161\xEDch \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Zobrazen\xED ${targetSlug}`,linkToOriginal:"Odkaz na p\u016Fvodn\xED dokument"},search:{title:"Hledat",searchBarPlaceholder:"Hledejte n\u011Bco"},tableOfContents:{title:"Obsah"},contentMeta:{readingTime:({minutes})=>`${minutes} min \u010Dten\xED`}},pages:{rss:{recentNotes:"Nejnov\u011Bj\u0161\xED pozn\xE1mky",lastFewNotes:({count})=>`Posledn\xEDch ${count} pozn\xE1mek`},error:{title:"Nenalezeno",notFound:"Tato str\xE1nka je bu\u010F soukrom\xE1, nebo neexistuje.",home:"N\xE1vrat na domovskou str\xE1nku"},folderContent:{folder:"Slo\u017Eka",itemsUnderFolder:({count})=>count===1?"1 polo\u017Eka v t\xE9to slo\u017Ece.":`${count} polo\u017Eek v t\xE9to slo\u017Ece.`},tagContent:{tag:"Tag",tagIndex:"Rejst\u0159\xEDk tag\u016F",itemsUnderTag:({count})=>count===1?"1 polo\u017Eka s t\xEDmto tagem.":`${count} polo\u017Eek s t\xEDmto tagem.`,showingFirst:({count})=>`Zobrazuj\xED se prvn\xED ${count} tagy.`,totalTags:({count})=>`Nalezeno celkem ${count} tag\u016F.`}}};var TRANSLATIONS={"en-US":en_US_default,"en-GB":en_GB_default,"fr-FR":fr_FR_default,"it-IT":it_IT_default,"ja-JP":ja_JP_default,"de-DE":de_DE_default,"nl-NL":nl_NL_default,"nl-BE":nl_NL_default,"ro-RO":ro_RO_default,"ro-MD":ro_RO_default,"ca-ES":ca_ES_default,"es-ES":es_ES_default,"ar-SA":ar_SA_default,"ar-AE":ar_SA_default,"ar-QA":ar_SA_default,"ar-BH":ar_SA_default,"ar-KW":ar_SA_default,"ar-OM":ar_SA_default,"ar-YE":ar_SA_default,"ar-IR":ar_SA_default,"ar-SY":ar_SA_default,"ar-IQ":ar_SA_default,"ar-JO":ar_SA_default,"ar-PL":ar_SA_default,"ar-LB":ar_SA_default,"ar-EG":ar_SA_default,"ar-SD":ar_SA_default,"ar-LY":ar_SA_default,"ar-MA":ar_SA_default,"ar-TN":ar_SA_default,"ar-DZ":ar_SA_default,"ar-MR":ar_SA_default,"uk-UA":uk_UA_default,"ru-RU":ru_RU_default,"ko-KR":ko_KR_default,"zh-CN":zh_CN_default,"vi-VN":vi_VN_default,"pt-BR":pt_BR_default,"hu-HU":hu_HU_default,"fa-IR":fa_IR_default,"pl-PL":pl_PL_default,"cs-CZ":cs_CZ_default},defaultTranslation="en-US",i18n=__name(locale=>TRANSLATIONS[locale??defaultTranslation],"i18n");var defaultOptions={delimiters:"---",language:"yaml"};function coalesceAliases(data,aliases){for(let alias of aliases)if(data[alias]!==void 0&&data[alias]!==null)return data[alias]}__name(coalesceAliases,"coalesceAliases");function coerceToArray(input){if(input!=null)return Array.isArray(input)||(input=input.toString().split(",").map(tag=>tag.trim())),input.filter(tag=>typeof tag=="string"||typeof tag=="number").map(tag=>tag.toString())}__name(coerceToArray,"coerceToArray");var FrontMatter=__name(userOpts=>{let opts={...defaultOptions,...userOpts};return{name:"FrontMatter",markdownPlugins({cfg}){return[[remarkFrontmatter,["yaml","toml"]],()=>(_,file)=>{let{data}=matter(Buffer.from(file.value),{...opts,engines:{yaml:s=>yaml.load(s,{schema:yaml.JSON_SCHEMA}),toml:s=>toml.parse(s)}});data.title!=null&&data.title.toString()!==""?data.title=data.title.toString():data.title=file.stem??i18n(cfg.configuration.locale).propertyDefaults.title;let tags=coerceToArray(coalesceAliases(data,["tags","tag"]));tags&&(data.tags=[...new Set(tags.map(tag=>slugTag(tag)))]);let aliases=coerceToArray(coalesceAliases(data,["aliases","alias"]));aliases&&(data.aliases=aliases);let cssclasses=coerceToArray(coalesceAliases(data,["cssclasses","cssclass"]));cssclasses&&(data.cssclasses=cssclasses),file.data.frontmatter=data}]}}},"FrontMatter");import remarkGfm from"remark-gfm";import smartypants from"remark-smartypants";import rehypeSlug from"rehype-slug";import rehypeAutolinkHeadings from"rehype-autolink-headings";var defaultOptions2={enableSmartyPants:!0,linkHeadings:!0},GitHubFlavoredMarkdown=__name(userOpts=>{let opts={...defaultOptions2,...userOpts};return{name:"GitHubFlavoredMarkdown",markdownPlugins(){return opts.enableSmartyPants?[remarkGfm,smartypants]:[remarkGfm]},htmlPlugins(){return opts.linkHeadings?[rehypeSlug,[rehypeAutolinkHeadings,{behavior:"append",properties:{role:"anchor",ariaHidden:!0,tabIndex:-1,"data-no-popover":!0},content:{type:"element",tagName:"svg",properties:{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},children:[{type:"element",tagName:"path",properties:{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"},children:[]},{type:"element",tagName:"path",properties:{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"},children:[]}]}}]]:[]}}},"GitHubFlavoredMarkdown");import rehypeCitation from"rehype-citation";import{visit}from"unist-util-visit";import fs from"fs";import path2 from"path";import{Repository}from"@napi-rs/simple-git";import chalk3 from"chalk";var defaultOptions3={priority:["frontmatter","git","filesystem"]};function coerceDate(fp,d){let dt=new Date(d),invalidDate=isNaN(dt.getTime())||dt.getTime()===0;return invalidDate&&d!==void 0&&console.log(chalk3.yellow(`
Warning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`)),invalidDate?new Date:dt}__name(coerceDate,"coerceDate");var CreatedModifiedDate=__name(userOpts=>{let opts={...defaultOptions3,...userOpts};return{name:"CreatedModifiedDate",markdownPlugins(){return[()=>{let repo;return async(_tree,file)=>{let created,modified,published,fp=file.data.filePath,fullFp=path2.isAbsolute(fp)?fp:path2.posix.join(file.cwd,fp);for(let source of opts.priority)if(source==="filesystem"){let st=await fs.promises.stat(fullFp);created||=st.birthtimeMs,modified||=st.mtimeMs}else if(source==="frontmatter"&&file.data.frontmatter)created||=file.data.frontmatter.date,modified||=file.data.frontmatter.lastmod,modified||=file.data.frontmatter.updated,modified||=file.data.frontmatter["last-modified"],published||=file.data.frontmatter.publishDate;else if(source==="git"){repo||(repo=Repository.discover(file.cwd));try{modified||=await repo.getFileLatestModifiedDateAsync(file.data.filePath)}catch{console.log(chalk3.yellow(`
Warning: ${file.data.filePath} isn't yet tracked by git, last modification date is not available for this file`))}}file.data.dates={created:coerceDate(fp,created),modified:coerceDate(fp,modified),published:coerceDate(fp,published)}}}]}}},"CreatedModifiedDate");import remarkMath from"remark-math";import rehypeKatex from"rehype-katex";import rehypeMathjax from"rehype-mathjax/svg";var Latex=__name(opts=>{let engine=opts?.renderEngine??"katex",macros=opts?.customMacros??{};return{name:"Latex",markdownPlugins(){return[remarkMath]},htmlPlugins(){return engine==="katex"?[[rehypeKatex,{output:"html",macros}]]:[[rehypeMathjax,{macros}]]},externalResources(){return engine==="katex"?{css:["https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css"],js:[{src:"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/copy-tex.min.js",loadTime:"afterDOMReady",contentType:"external"}]}:{}}}},"Latex");import{toString}from"hast-util-to-string";var escapeHTML=__name(unsafe=>unsafe.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),"escapeHTML");var defaultOptions4={descriptionLength:150,replaceExternalLinks:!0},urlRegex=new RegExp(/(https?:\/\/)?(?<domain>([\da-z\.-]+)\.([a-z\.]{2,6})(:\d+)?)(?<path>[\/\w\.-]*)(\?[\/\w\.=&;-]*)?/,"g"),Description=__name(userOpts=>{let opts={...defaultOptions4,...userOpts};return{name:"Description",htmlPlugins(){return[()=>async(tree,file)=>{let frontMatterDescription=file.data.frontmatter?.description,text=escapeHTML(toString(tree));opts.replaceExternalLinks&&(frontMatterDescription=frontMatterDescription?.replace(urlRegex,"$<domain>$<path>"),text=text.replace(urlRegex,"$<domain>$<path>"));let sentences=(frontMatterDescription??text).replace(/\s+/g," ").split(/\.\s/),finalDesc=[],len=opts.descriptionLength,sentenceIdx=0,currentDescriptionLength=0;if(sentences[0]!==void 0&&sentences[0].length>=len){let firstSentence=sentences[0].split(" ");for(;currentDescriptionLength<len;){let sentence=firstSentence[sentenceIdx];if(!sentence)break;finalDesc.push(sentence),currentDescriptionLength+=sentence.length,sentenceIdx++}finalDesc.push("...")}else for(;currentDescriptionLength<len;){let sentence=sentences[sentenceIdx];if(!sentence)break;let currentSentence=sentence.endsWith(".")?sentence:sentence+".";finalDesc.push(currentSentence),currentDescriptionLength+=currentSentence.length,sentenceIdx++}file.data.description=finalDesc.join(" "),file.data.text=text}]}}},"Description");import path3 from"path";import{visit as visit2}from"unist-util-visit";import isAbsoluteUrl from"is-absolute-url";var defaultOptions5={markdownLinkResolution:"absolute",prettyLinks:!0,openLinksInNewTab:!1,lazyLoad:!1,externalLinkIcon:!0},CrawlLinks=__name(userOpts=>{let opts={...defaultOptions5,...userOpts};return{name:"LinkProcessing",htmlPlugins(ctx){return[()=>(tree,file)=>{let curSlug=simplifySlug(file.data.slug),outgoing=new Set,transformOptions={strategy:opts.markdownLinkResolution,allSlugs:ctx.allSlugs};visit2(tree,"element",(node,_index,_parent)=>{if(node.tagName==="a"&&node.properties&&typeof node.properties.href=="string"){let dest=node.properties.href,classes=node.properties.className??[],isExternal=isAbsoluteUrl(dest);classes.push(isExternal?"external":"internal"),isExternal&&opts.externalLinkIcon&&node.children.push({type:"element",tagName:"svg",properties:{"aria-hidden":"true",class:"external-icon",style:"max-width:0.8em;max-height:0.8em",viewBox:"0 0 512 512"},children:[{type:"element",tagName:"path",properties:{d:"M320 0H288V64h32 82.7L201.4 265.4 178.7 288 224 333.3l22.6-22.6L448 109.3V192v32h64V192 32 0H480 320zM32 32H0V64 480v32H32 456h32V480 352 320H424v32 96H64V96h96 32V32H160 32z"},children:[]}]}),node.children.length===1&&node.children[0].type==="text"&&node.children[0].value!==dest&&classes.push("alias"),node.properties.className=classes,isExternal&&opts.openLinksInNewTab&&(node.properties.target="_blank");let isInternal=!(isAbsoluteUrl(dest)||dest.startsWith("#"));if(isInternal){dest=node.properties.href=transformLink(file.data.slug,dest,transformOptions);let canonicalDest=new URL(dest,"https://base.com/"+stripSlashes(curSlug,!0)).pathname,[destCanonical,_destAnchor]=splitAnchor(canonicalDest);destCanonical.endsWith("/")&&(destCanonical+="index");let full=decodeURIComponent(stripSlashes(destCanonical,!0)),simple=simplifySlug(full);outgoing.add(simple),node.properties["data-slug"]=full}opts.prettyLinks&&isInternal&&node.children.length===1&&node.children[0].type==="text"&&!node.children[0].value.startsWith("#")&&(node.children[0].value=path3.basename(node.children[0].value))}if(["img","video","audio","iframe"].includes(node.tagName)&&node.properties&&typeof node.properties.src=="string"&&(opts.lazyLoad&&(node.properties.loading="lazy"),!isAbsoluteUrl(node.properties.src))){let dest=node.properties.src;dest=node.properties.src=transformLink(file.data.slug,dest,transformOptions),node.properties.src=dest}}),file.data.links=[...outgoing]}]}}},"CrawlLinks");import{findAndReplace as mdastFindReplace}from"mdast-util-find-and-replace";import rehypeRaw from"rehype-raw";import{SKIP,visit as visit3}from"unist-util-visit";import path4 from"path";var callout_inline_default=`function c(){let t=this.parentElement;t.classList.toggle("is-collapsed");let l=t.classList.contains("is-collapsed")?this.scrollHeight:t.scrollHeight;t.style.maxHeight=l+"px";let o=t,e=t.parentElement;for(;e;){if(!e.classList.contains("callout"))return;let n=e.classList.contains("is-collapsed")?e.scrollHeight:e.scrollHeight+o.scrollHeight;e.style.maxHeight=n+"px",o=e,e=e.parentElement}}function i(){let t=document.getElementsByClassName("callout is-collapsible");for(let s of t){let l=s.firstElementChild;if(l){l.addEventListener("click",c),window.addCleanup(()=>l.removeEventListener("click",c));let e=s.classList.contains("is-collapsed")?l.scrollHeight:s.scrollHeight;s.style.maxHeight=e+"px"}}}document.addEventListener("nav",i);window.addEventListener("resize",i);
`;var checkbox_inline_default='var m=Object.create;var f=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty;var R=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var j=(e,t,n,A)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of S(t))!b.call(e,i)&&i!==n&&f(e,i,{get:()=>t[i],enumerable:!(A=x(t,i))||A.enumerable});return e};var v=(e,t,n)=>(n=e!=null?m(y(e)):{},j(t||!e||!e.__esModule?f(n,"default",{value:e,enumerable:!0}):n,e));var p=R((_,g)=>{"use strict";g.exports=w;function B(e){return e instanceof Buffer?Buffer.from(e):new e.constructor(e.buffer.slice(),e.byteOffset,e.length)}function w(e){if(e=e||{},e.circles)return L(e);let t=new Map;if(t.set(Date,F=>new Date(F)),t.set(Map,(F,E)=>new Map(A(Array.from(F),E))),t.set(Set,(F,E)=>new Set(A(Array.from(F),E))),e.constructorHandlers)for(let F of e.constructorHandlers)t.set(F[0],F[1]);let n=null;return e.proto?C:i;function A(F,E){let u=Object.keys(F),D=new Array(u.length);for(let l=0;l<u.length;l++){let r=u[l],s=F[r];typeof s!="object"||s===null?D[r]=s:s.constructor!==Object&&(n=t.get(s.constructor))?D[r]=n(s,E):ArrayBuffer.isView(s)?D[r]=B(s):D[r]=E(s)}return D}function i(F){if(typeof F!="object"||F===null)return F;if(Array.isArray(F))return A(F,i);if(F.constructor!==Object&&(n=t.get(F.constructor)))return n(F,i);let E={};for(let u in F){if(Object.hasOwnProperty.call(F,u)===!1)continue;let D=F[u];typeof D!="object"||D===null?E[u]=D:D.constructor!==Object&&(n=t.get(D.constructor))?E[u]=n(D,i):ArrayBuffer.isView(D)?E[u]=B(D):E[u]=i(D)}return E}function C(F){if(typeof F!="object"||F===null)return F;if(Array.isArray(F))return A(F,C);if(F.constructor!==Object&&(n=t.get(F.constructor)))return n(F,C);let E={};for(let u in F){let D=F[u];typeof D!="object"||D===null?E[u]=D:D.constructor!==Object&&(n=t.get(D.constructor))?E[u]=n(D,C):ArrayBuffer.isView(D)?E[u]=B(D):E[u]=C(D)}return E}}function L(e){let t=[],n=[],A=new Map;if(A.set(Date,u=>new Date(u)),A.set(Map,(u,D)=>new Map(C(Array.from(u),D))),A.set(Set,(u,D)=>new Set(C(Array.from(u),D))),e.constructorHandlers)for(let u of e.constructorHandlers)A.set(u[0],u[1]);let i=null;return e.proto?E:F;function C(u,D){let l=Object.keys(u),r=new Array(l.length);for(let s=0;s<l.length;s++){let c=l[s],o=u[c];if(typeof o!="object"||o===null)r[c]=o;else if(o.constructor!==Object&&(i=A.get(o.constructor)))r[c]=i(o,D);else if(ArrayBuffer.isView(o))r[c]=B(o);else{let a=t.indexOf(o);a!==-1?r[c]=n[a]:r[c]=D(o)}}return r}function F(u){if(typeof u!="object"||u===null)return u;if(Array.isArray(u))return C(u,F);if(u.constructor!==Object&&(i=A.get(u.constructor)))return i(u,F);let D={};t.push(u),n.push(D);for(let l in u){if(Object.hasOwnProperty.call(u,l)===!1)continue;let r=u[l];if(typeof r!="object"||r===null)D[l]=r;else if(r.constructor!==Object&&(i=A.get(r.constructor)))D[l]=i(r,F);else if(ArrayBuffer.isView(r))D[l]=B(r);else{let s=t.indexOf(r);s!==-1?D[l]=n[s]:D[l]=F(r)}}return t.pop(),n.pop(),D}function E(u){if(typeof u!="object"||u===null)return u;if(Array.isArray(u))return C(u,E);if(u.constructor!==Object&&(i=A.get(u.constructor)))return i(u,E);let D={};t.push(u),n.push(D);for(let l in u){let r=u[l];if(typeof r!="object"||r===null)D[l]=r;else if(r.constructor!==Object&&(i=A.get(r.constructor)))D[l]=i(r,E);else if(ArrayBuffer.isView(r))D[l]=B(r);else{let s=t.indexOf(r);s!==-1?D[l]=n[s]:D[l]=E(r)}}return t.pop(),n.pop(),D}}});var W=Object.hasOwnProperty;var d=v(p(),1),$=(0,d.default)();function h(e){return e.document.body.dataset.slug}var O=e=>`${h(window)}-checkbox-${e}`;document.addEventListener("nav",()=>{document.querySelectorAll("input.checkbox-toggle").forEach((t,n)=>{let A=O(n),i=C=>{let F=C.target?.checked?"true":"false";localStorage.setItem(A,F)};t.addEventListener("change",i),window.addCleanup(()=>t.removeEventListener("change",i)),localStorage.getItem(A)==="true"&&(t.checked=!0)})});\n';import{toHast}from"mdast-util-to-hast";import{toHtml}from"hast-util-to-html";function capitalize(s){return s.substring(0,1).toUpperCase()+s.substring(1)}__name(capitalize,"capitalize");function classNames(displayClass,...classes){return displayClass&&classes.push(displayClass),classes.join(" ")}__name(classNames,"classNames");var defaultOptions6={comments:!0,highlight:!0,wikilinks:!0,callouts:!0,mermaid:!0,parseTags:!0,parseArrows:!0,parseBlockReferences:!0,enableInHtmlEmbed:!1,enableYouTubeEmbed:!0,enableVideoEmbed:!0,enableCheckbox:!1},calloutMapping={note:"note",abstract:"abstract",summary:"abstract",tldr:"abstract",info:"info",todo:"todo",tip:"tip",hint:"tip",important:"tip",success:"success",check:"success",done:"success",question:"question",help:"question",faq:"question",warning:"warning",attention:"warning",caution:"warning",failure:"failure",missing:"failure",fail:"failure",danger:"danger",error:"danger",bug:"bug",example:"example",quote:"quote",cite:"quote"},arrowMapping={"->":"&rarr;","-->":"&rArr;","=>":"&rArr;","==>":"&rArr;","<-":"&larr;","<--":"&lArr;","<=":"&lArr;","<==":"&lArr;"};function canonicalizeCallout(calloutName){let normalizedCallout=calloutName.toLowerCase();return calloutMapping[normalizedCallout]??calloutName}__name(canonicalizeCallout,"canonicalizeCallout");var externalLinkRegex=/^https?:\/\//i,arrowRegex=new RegExp(/(-{1,2}>|={1,2}>|<-{1,2}|<={1,2})/g),wikilinkRegex=new RegExp(/!?\[\[([^\[\]\|\#\\]+)?(#+[^\[\]\|\#\\]+)?(\\?\|[^\[\]\#]+)?\]\]/g),tableRegex=new RegExp(/^\|([^\n])+\|\n(\|)( ?:?-{3,}:? ?\|)+\n(\|([^\n])+\|\n?)+/gm),tableWikilinkRegex=new RegExp(/(!?\[\[[^\]]*?\]\])/g),highlightRegex=new RegExp(/==([^=]+)==/g),commentRegex=new RegExp(/%%[\s\S]*?%%/g),calloutRegex=new RegExp(/^\[\!(\w+)\|?(.+?)?\]([+-]?)/),calloutLineRegex=new RegExp(/^> *\[\!\w+\|?.*?\][+-]?.*$/gm),tagRegex=new RegExp(/(?:^| )#((?:[-_\p{L}\p{Emoji}\p{M}\d])+(?:\/[-_\p{L}\p{Emoji}\p{M}\d]+)*)/gu),blockReferenceRegex=new RegExp(/\^([-_A-Za-z0-9]+)$/g),ytLinkRegex=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,ytPlaylistLinkRegex=/[?&]list=([^#?&]*)/,videoExtensionRegex=new RegExp(/\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/),wikilinkImageEmbedRegex=new RegExp(/^(?<alt>(?!^\d*x?\d*$).*?)?(\|?\s*?(?<width>\d+)(x(?<height>\d+))?)?$/),ObsidianFlavoredMarkdown=__name(userOpts=>{let opts={...defaultOptions6,...userOpts},mdastToHtml=__name(ast=>{let hast=toHast(ast,{allowDangerousHtml:!0});return toHtml(hast,{allowDangerousHtml:!0})},"mdastToHtml");return{name:"ObsidianFlavoredMarkdown",textTransform(_ctx,src){return opts.comments&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(commentRegex,"")),opts.callouts&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(calloutLineRegex,value=>value+`
> `)),opts.wikilinks&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(tableRegex,value=>value.replace(tableWikilinkRegex,(_value,raw)=>{let escaped=raw??"";return escaped=escaped.replace("#","\\#"),escaped=escaped.replace(/((^|[^\\])(\\\\)*)\|/g,"$1\\|"),escaped})),src=src.replace(wikilinkRegex,(value,...capture)=>{let[rawFp,rawHeader,rawAlias]=capture,[fp,anchor]=splitAnchor(`${rawFp??""}${rawHeader??""}`),blockRef=rawHeader?.match(/^#?\^/)?"^":"",displayAnchor=anchor?`#${blockRef}${anchor.trim().replace(/^#+/,"")}`:"",displayAlias=rawAlias??rawHeader?.replace("#","|")??"",embedDisplay=value.startsWith("!")?"!":"";return rawFp?.match(externalLinkRegex)?`${embedDisplay}[${displayAlias.replace(/^\|/,"")}](${rawFp})`:`${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`})),src},markdownPlugins(_ctx){let plugins=[];return plugins.push(()=>(tree,file)=>{let replacements=[],base=pathToRoot(file.data.slug);opts.wikilinks&&replacements.push([wikilinkRegex,(value,...capture)=>{let[rawFp,rawHeader,rawAlias]=capture,fp=rawFp?.trim()??"",anchor=rawHeader?.trim()??"",alias=rawAlias?.slice(1).trim();if(value.startsWith("!")){let ext=path4.extname(fp).toLowerCase(),url2=slugifyFilePath(fp);if([".png",".jpg",".jpeg",".gif",".bmp",".svg",".webp"].includes(ext)){let match=wikilinkImageEmbedRegex.exec(alias??""),alt=match?.groups?.alt??"",width=match?.groups?.width??"auto",height=match?.groups?.height??"auto";return{type:"image",url:url2,data:{hProperties:{width,height,alt}}}}else{if([".mp4",".webm",".ogv",".mov",".mkv"].includes(ext))return{type:"html",value:`<video src="${url2}" controls></video>`};if([".mp3",".webm",".wav",".m4a",".ogg",".3gp",".flac"].includes(ext))return{type:"html",value:`<audio src="${url2}" controls></audio>`};if([".pdf"].includes(ext))return{type:"html",value:`<iframe src="${url2}" class="pdf"></iframe>`};{let block=anchor;return{type:"html",data:{hProperties:{transclude:!0}},value:`<blockquote class="transclude" data-url="${url2}" data-block="${block}" data-embed-alias="${alias}"><a href="${url2+anchor}" class="transclude-inner">Transclude of ${url2}${block}</a></blockquote>`}}}}return{type:"link",url:fp+anchor,children:[{type:"text",value:alias??fp}]}}]),opts.highlight&&replacements.push([highlightRegex,(_value,...capture)=>{let[inner]=capture;return{type:"html",value:`<span class="text-highlight">${inner}</span>`}}]),opts.parseArrows&&replacements.push([arrowRegex,(value,..._capture)=>{let maybeArrow=arrowMapping[value];return maybeArrow===void 0?SKIP:{type:"html",value:`<span>${maybeArrow}</span>`}}]),opts.parseTags&&replacements.push([tagRegex,(_value,tag)=>{if(/^[\/\d]+$/.test(tag))return!1;if(tag=slugTag(tag),file.data.frontmatter){let noteTags=file.data.frontmatter.tags??[];file.data.frontmatter.tags=[...new Set([...noteTags,tag])]}return{type:"link",url:base+`/tags/${tag}`,data:{hProperties:{className:["tag-link"]}},children:[{type:"text",value:tag}]}}]),opts.enableInHtmlEmbed&&visit3(tree,"html",node=>{for(let[regex,replace]of replacements)typeof replace=="string"?node.value=node.value.replace(regex,replace):node.value=node.value.replace(regex,(substring,...args)=>{let replaceValue=replace(substring,...args);return typeof replaceValue=="string"?replaceValue:Array.isArray(replaceValue)?replaceValue.map(mdastToHtml).join(""):typeof replaceValue=="object"&&replaceValue!==null?mdastToHtml(replaceValue):substring})}),mdastFindReplace(tree,replacements)}),opts.enableVideoEmbed&&plugins.push(()=>(tree,_file)=>{visit3(tree,"image",(node,index,parent)=>{if(parent&&index!=null&&videoExtensionRegex.test(node.url)){let newNode={type:"html",value:`<video controls src="${node.url}"></video>`};return parent.children.splice(index,1,newNode),SKIP}})}),opts.callouts&&plugins.push(()=>(tree,_file)=>{visit3(tree,"blockquote",node=>{if(node.children.length===0)return;let[firstChild,...calloutContent]=node.children;if(firstChild.type!=="paragraph"||firstChild.children[0]?.type!=="text")return;let text=firstChild.children[0].value,restOfTitle=firstChild.children.slice(1),[firstLine,...remainingLines]=text.split(`
`),remainingText=remainingLines.join(`
`),match=firstLine.match(calloutRegex);if(match&&match.input){let[calloutDirective,typeString,calloutMetaData,collapseChar]=match,calloutType=canonicalizeCallout(typeString.toLowerCase()),collapse=collapseChar==="+"||collapseChar==="-",defaultState=collapseChar==="-"?"collapsed":"expanded",titleContent=match.input.slice(calloutDirective.length).trim(),titleNode={type:"paragraph",children:[{type:"text",value:titleContent===""&&restOfTitle.length===0?capitalize(typeString):titleContent+" "},...restOfTitle]},blockquoteContent=[{type:"html",value:`<div
                  class="callout-title"
                >
                  <div class="callout-icon"></div>
                  <div class="callout-title-inner">${mdastToHtml(titleNode)}</div>
                  ${collapse?'<div class="fold-callout-icon"></div>':""}
                </div>`}];remainingText.length>0&&blockquoteContent.push({type:"paragraph",children:[{type:"text",value:remainingText}]}),node.children.splice(0,1,...blockquoteContent);let classNames2=["callout",calloutType];if(collapse&&classNames2.push("is-collapsible"),defaultState==="collapsed"&&classNames2.push("is-collapsed"),node.data={hProperties:{...node.data?.hProperties??{},className:classNames2.join(" "),"data-callout":calloutType,"data-callout-fold":collapse,"data-callout-metadata":calloutMetaData}},calloutContent.length>0){let contentData={data:{hProperties:{className:"callout-content"},hName:"div"},type:"blockquote",children:[...calloutContent]};node.children=[node.children[0],contentData]}}})}),opts.mermaid&&plugins.push(()=>(tree,_file)=>{visit3(tree,"code",node=>{node.lang==="mermaid"&&(node.data={hProperties:{className:["mermaid"]}})})}),plugins},htmlPlugins(){let plugins=[rehypeRaw];return opts.parseBlockReferences&&plugins.push(()=>{let inlineTagTypes=new Set(["p","li"]),blockTagTypes=new Set(["blockquote"]);return(tree,file)=>{file.data.blocks={},visit3(tree,"element",(node,index,parent)=>{if(blockTagTypes.has(node.tagName)){let nextChild=parent?.children.at(index+2);if(nextChild&&nextChild.tagName==="p"){let text=nextChild.children.at(0);if(text&&text.value&&text.type==="text"){let matches=text.value.match(blockReferenceRegex);if(matches&&matches.length>=1){parent.children.splice(index+2,1);let block=matches[0].slice(1);Object.keys(file.data.blocks).includes(block)||(node.properties={...node.properties,id:block},file.data.blocks[block]=node)}}}}else if(inlineTagTypes.has(node.tagName)){let last=node.children.at(-1);if(last&&last.value&&typeof last.value=="string"){let matches=last.value.match(blockReferenceRegex);if(matches&&matches.length>=1){last.value=last.value.slice(0,-matches[0].length);let block=matches[0].slice(1);if(last.value===""){let idx=(index??1)-1;for(;idx>=0;){let element=parent?.children.at(idx);if(!element)break;if(element.type!=="element")idx-=1;else{Object.keys(file.data.blocks).includes(block)||(element.properties={...element.properties,id:block},file.data.blocks[block]=element);return}}}else Object.keys(file.data.blocks).includes(block)||(node.properties={...node.properties,id:block},file.data.blocks[block]=node)}}}}),file.data.htmlAst=tree}}),opts.enableYouTubeEmbed&&plugins.push(()=>tree=>{visit3(tree,"element",node=>{if(node.tagName==="img"&&typeof node.properties.src=="string"){let match=node.properties.src.match(ytLinkRegex),videoId=match&&match[2].length==11?match[2]:null,playlistId=node.properties.src.match(ytPlaylistLinkRegex)?.[1];videoId?(node.tagName="iframe",node.properties={class:"external-embed youtube",allow:"fullscreen",frameborder:0,width:"600px",src:playlistId?`https://www.youtube.com/embed/${videoId}?list=${playlistId}`:`https://www.youtube.com/embed/${videoId}`}):playlistId&&(node.tagName="iframe",node.properties={class:"external-embed youtube",allow:"fullscreen",frameborder:0,width:"600px",src:`https://www.youtube.com/embed/videoseries?list=${playlistId}`})}})}),opts.enableCheckbox&&plugins.push(()=>(tree,_file)=>{visit3(tree,"element",node=>{if(node.tagName==="input"&&node.properties.type==="checkbox"){let isChecked=node.properties?.checked??!1;node.properties={type:"checkbox",disabled:!1,checked:isChecked,class:"checkbox-toggle"}}})}),plugins},externalResources(){let js=[];return opts.enableCheckbox&&js.push({script:checkbox_inline_default,loadTime:"afterDOMReady",contentType:"inline"}),opts.callouts&&js.push({script:callout_inline_default,loadTime:"afterDOMReady",contentType:"inline"}),opts.mermaid&&js.push({script:`
          let mermaidImport = undefined
          document.addEventListener('nav', async () => {
            if (document.querySelector("code.mermaid")) {
              mermaidImport ||= await import('https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.7.0/mermaid.esm.min.mjs')
              const mermaid = mermaidImport.default
              const darkMode = document.documentElement.getAttribute('saved-theme') === 'dark'
              mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'loose',
                theme: darkMode ? 'dark' : 'default'
              })

              await mermaid.run({
                querySelector: '.mermaid'
              })
            }
          });
          `,loadTime:"afterDOMReady",moduleType:"module",contentType:"inline"}),{js}}}},"ObsidianFlavoredMarkdown");var relrefRegex=new RegExp(/\[([^\]]+)\]\(\{\{< relref "([^"]+)" >\}\}\)/,"g"),predefinedHeadingIdRegex=new RegExp(/(.*) {#(?:.*)}/,"g"),hugoShortcodeRegex=new RegExp(/{{(.*)}}/,"g"),figureTagRegex=new RegExp(/< ?figure src="(.*)" ?>/,"g"),inlineLatexRegex=new RegExp(/\\\\\((.+?)\\\\\)/,"g"),blockLatexRegex=new RegExp(/(?:\\begin{equation}|\\\\\(|\\\\\[)([\s\S]*?)(?:\\\\\]|\\\\\)|\\end{equation})/,"g"),quartzLatexRegex=new RegExp(/\$\$[\s\S]*?\$\$|\$.*?\$/,"g");import rehypePrettyCode from"rehype-pretty-code";var defaultOptions7={theme:{light:"github-light",dark:"github-dark"},keepBackground:!1},SyntaxHighlighting=__name(userOpts=>{let opts={...defaultOptions7,...userOpts};return{name:"SyntaxHighlighting",htmlPlugins(){return[[rehypePrettyCode,opts]]}}},"SyntaxHighlighting");import{visit as visit4}from"unist-util-visit";import{toString as toString2}from"mdast-util-to-string";import Slugger from"github-slugger";var defaultOptions8={maxDepth:3,minEntries:1,showByDefault:!0,collapseByDefault:!1},slugAnchor2=new Slugger,TableOfContents=__name(userOpts=>{let opts={...defaultOptions8,...userOpts};return{name:"TableOfContents",markdownPlugins(){return[()=>async(tree,file)=>{if(file.data.frontmatter?.enableToc??opts.showByDefault){slugAnchor2.reset();let toc=[],highestDepth=opts.maxDepth;visit4(tree,"heading",node=>{if(node.depth<=opts.maxDepth){let text=toString2(node);highestDepth=Math.min(highestDepth,node.depth),toc.push({depth:node.depth,text,slug:slugAnchor2.slug(text)})}}),toc.length>0&&toc.length>opts.minEntries&&(file.data.toc=toc.map(entry=>({...entry,depth:entry.depth-highestDepth})),file.data.collapseToc=opts.collapseByDefault)}}]}}},"TableOfContents");import remarkBreaks from"remark-breaks";import{visit as visit5}from"unist-util-visit";import{findAndReplace as mdastFindReplace2}from"mdast-util-find-and-replace";var orRegex=new RegExp(/{{or:(.*?)}}/,"g"),TODORegex=new RegExp(/{{.*?\bTODO\b.*?}}/,"g"),DONERegex=new RegExp(/{{.*?\bDONE\b.*?}}/,"g"),videoRegex=new RegExp(/{{.*?\[\[video\]\].*?\:(.*?)}}/,"g"),youtubeRegex=new RegExp(/{{.*?\[\[video\]\].*?(https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?)}}/,"g"),audioRegex=new RegExp(/{{.*?\[\[audio\]\].*?\:(.*?)}}/,"g"),pdfRegex=new RegExp(/{{.*?\[\[pdf\]\].*?\:(.*?)}}/,"g"),blockquoteRegex=new RegExp(/(\[\[>\]\])\s*(.*)/,"g"),roamHighlightRegex=new RegExp(/\^\^(.+)\^\^/,"g"),roamItalicRegex=new RegExp(/__(.+)__/,"g"),tableRegex2=new RegExp(/- {{.*?\btable\b.*?}}/,"g"),attributeRegex=new RegExp(/\b\w+(?:\s+\w+)*::/,"g");var RemoveDrafts=__name(()=>({name:"RemoveDrafts",shouldPublish(_ctx,[_tree,vfile]){return!(vfile.data?.frontmatter?.draft||!1)}}),"RemoveDrafts");import path7 from"path";import{visit as visit7}from"unist-util-visit";import{jsx}from"preact/jsx-runtime";var Header=__name(({children})=>children.length>0?jsx("header",{children}):null,"Header");Header.css=`
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}
`;var Header_default=__name(()=>Header,"default");var clipboard_inline_default=`var r='<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>',l='<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';document.addEventListener("nav",()=>{let n=document.getElementsByTagName("pre");for(let t=0;t<n.length;t++){let o=n[t].getElementsByTagName("code")[0];if(o){let a=function(){navigator.clipboard.writeText(i).then(()=>{e.blur(),e.innerHTML=l,setTimeout(()=>{e.innerHTML=r,e.style.borderColor=""},2e3)},d=>console.error(d))};var c=a;let i=o.innerText.replace(/\\n\\n/g,\`
\`),e=document.createElement("button");e.className="clipboard-button",e.type="button",e.innerHTML=r,e.ariaLabel="Copy source",e.addEventListener("click",a),window.addCleanup(()=>e.removeEventListener("click",a)),n[t].prepend(e)}}});
`;var clipboard_default=`.clipboard-button {
  position: absolute;
  display: flex;
  float: right;
  right: 0;
  padding: 0.4rem;
  margin: 0.3rem;
  color: var(--gray);
  border-color: var(--dark);
  background-color: var(--light);
  border: 1px solid;
  border-radius: 5px;
  opacity: 0;
  transition: 0.2s;
}
.clipboard-button > svg {
  fill: var(--light);
  filter: contrast(0.3);
}
.clipboard-button:hover {
  cursor: pointer;
  border-color: var(--secondary);
}
.clipboard-button:focus {
  outline: 0;
}

pre:hover > .clipboard-button {
  opacity: 1;
  transition: 0.2s;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbImNsaXBib2FyZC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFOzs7QUFLRjtFQUNFO0VBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIuY2xpcGJvYXJkLWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxvYXQ6IHJpZ2h0O1xuICByaWdodDogMDtcbiAgcGFkZGluZzogMC40cmVtO1xuICBtYXJnaW46IDAuM3JlbTtcbiAgY29sb3I6IHZhcigtLWdyYXkpO1xuICBib3JkZXItY29sb3I6IHZhcigtLWRhcmspO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IDAuMnM7XG5cbiAgJiA+IHN2ZyB7XG4gICAgZmlsbDogdmFyKC0tbGlnaHQpO1xuICAgIGZpbHRlcjogY29udHJhc3QoMC4zKTtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG4gIH1cblxuICAmOmZvY3VzIHtcbiAgICBvdXRsaW5lOiAwO1xuICB9XG59XG5cbnByZSB7XG4gICY6aG92ZXIgPiAuY2xpcGJvYXJkLWJ1dHRvbiB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiAwLjJzO1xuICB9XG59XG4iXX0= */`;import{jsx as jsx2}from"preact/jsx-runtime";var Body=__name(({children})=>jsx2("div",{id:"quartz-body",children}),"Body");Body.afterDOMLoaded=clipboard_inline_default;Body.css=clipboard_default;var Body_default=__name(()=>Body,"default");import{render}from"preact-render-to-string";import{randomUUID}from"crypto";import{jsx as jsx3}from"preact/jsx-runtime";function JSResourceToScriptElement(resource,preserve){let scriptType=resource.moduleType??"application/javascript",spaPreserve=preserve??resource.spaPreserve;if(resource.contentType==="external")return jsx3("script",{src:resource.src,type:scriptType,"spa-preserve":spaPreserve},resource.src);{let content=resource.script;return jsx3("script",{type:scriptType,"spa-preserve":spaPreserve,dangerouslySetInnerHTML:{__html:content}},randomUUID())}}__name(JSResourceToScriptElement,"JSResourceToScriptElement");import{visit as visit6}from"unist-util-visit";import{jsx as jsx4,jsxs}from"preact/jsx-runtime";var headerRegex=new RegExp(/h[1-6]/);function pageResources(baseDir,staticResources){let contentIndexScript=`const fetchData = fetch("${joinSegments(baseDir,"static/contentIndex.json")}").then(data => data.json())`;return{css:[joinSegments(baseDir,"index.css"),...staticResources.css],js:[{src:joinSegments(baseDir,"prescript.js"),loadTime:"beforeDOMReady",contentType:"external"},{loadTime:"beforeDOMReady",contentType:"inline",spaPreserve:!0,script:contentIndexScript},...staticResources.js,{src:joinSegments(baseDir,"postscript.js"),loadTime:"afterDOMReady",moduleType:"module",contentType:"external"}]}}__name(pageResources,"pageResources");function renderPage(cfg,slug,componentData,components,pageResources2){let root=clone(componentData.tree);visit6(root,"element",(node,_index,_parent)=>{if(node.tagName==="blockquote"&&(node.properties?.className??[]).includes("transclude")){let inner=node.children[0],transcludeTarget=inner.properties["data-slug"],page=componentData.allFiles.find(f=>f.slug===transcludeTarget);if(!page)return;let blockRef=node.properties.dataBlock;if(blockRef?.startsWith("#^")){blockRef=blockRef.slice(2);let blockNode=page.blocks?.[blockRef];blockNode&&(blockNode.tagName==="li"&&(blockNode={type:"element",tagName:"ul",properties:{},children:[blockNode]}),node.children=[normalizeHastElement(blockNode,slug,transcludeTarget),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal","transclude-src"]},children:[{type:"text",value:i18n(cfg.locale).components.transcludes.linkToOriginal}]}])}else if(blockRef?.startsWith("#")&&page.htmlAst){blockRef=blockRef.slice(1);let startIdx,startDepth,endIdx;for(let[i,el]of page.htmlAst.children.entries()){if(!(el.type==="element"&&el.tagName.match(headerRegex)))continue;let depth=Number(el.tagName.substring(1));if(startIdx===void 0||startDepth===void 0)el.properties?.id===blockRef&&(startIdx=i,startDepth=depth);else if(depth<=startDepth){endIdx=i;break}}if(startIdx===void 0)return;node.children=[...page.htmlAst.children.slice(startIdx,endIdx).map(child=>normalizeHastElement(child,slug,transcludeTarget)),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal","transclude-src"]},children:[{type:"text",value:i18n(cfg.locale).components.transcludes.linkToOriginal}]}]}else page.htmlAst&&(node.children=[{type:"element",tagName:"h1",properties:{},children:[{type:"text",value:page.frontmatter?.title??i18n(cfg.locale).components.transcludes.transcludeOf({targetSlug:page.slug})}]},...page.htmlAst.children.map(child=>normalizeHastElement(child,slug,transcludeTarget)),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal","transclude-src"]},children:[{type:"text",value:i18n(cfg.locale).components.transcludes.linkToOriginal}]}])}}),componentData.tree=root;let{head:Head,header,beforeBody,pageBody:Content2,afterBody,left,right,footer:Footer}=components,Header2=Header_default(),Body2=Body_default(),LeftComponent=jsx4("div",{class:"left sidebar",children:left.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))}),RightComponent=jsx4("div",{class:"right sidebar",children:right.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))}),lang=componentData.fileData.frontmatter?.lang??cfg.locale?.split("-")[0]??"en",doc=jsxs("html",{lang,children:[jsx4(Head,{...componentData}),jsx4("body",{"data-slug":slug,children:jsx4("div",{id:"quartz-root",class:"page",children:jsxs(Body2,{...componentData,children:[LeftComponent,jsxs("div",{class:"center",children:[jsxs("div",{class:"page-header",children:[jsx4(Header2,{...componentData,children:header.map(HeaderComponent=>jsx4(HeaderComponent,{...componentData}))}),jsx4("div",{class:"popover-hint",children:beforeBody.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))})]}),jsx4(Content2,{...componentData}),jsx4("hr",{}),jsx4("div",{class:"page-footer",children:afterBody.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))})]}),RightComponent,jsx4(Footer,{...componentData})]})})}),pageResources2.js.filter(resource=>resource.loadTime==="afterDOMReady").map(res=>JSResourceToScriptElement(res))]});return`<!DOCTYPE html>
`+render(doc)}__name(renderPage,"renderPage");import{toJsxRuntime}from"hast-util-to-jsx-runtime";import{Fragment,jsx as jsx5,jsxs as jsxs2}from"preact/jsx-runtime";import{jsx as jsx6}from"preact/jsx-runtime";var customComponents={table:props=>jsx6("div",{class:"table-container",children:jsx6("table",{...props})})};function htmlToJsx(fp,tree){try{return toJsxRuntime(tree,{Fragment,jsx:jsx5,jsxs:jsxs2,elementAttributeNameCase:"html",components:customComponents})}catch(e){trace(`Failed to parse Markdown in \`${fp}\` into JSX`,e)}}__name(htmlToJsx,"htmlToJsx");import{jsx as jsx7}from"preact/jsx-runtime";var Content=__name(({fileData,tree})=>{let content=htmlToJsx(fileData.filePath,tree),classString=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" ");return jsx7("article",{class:classString,children:content})},"Content"),Content_default=__name(()=>Content,"default");var listPage_default=`/**
 * Layout breakpoints
 * $mobile: screen width below this value will use mobile styles
 * $desktop: screen width above this value will use desktop styles
 * Screen width between $mobile and $desktop width will use the tablet layout.
 * assuming mobile < desktop
 */
ul.section-ul {
  list-style: none;
  margin-top: 2em;
  padding-left: 0;
}

li.section-li {
  margin-bottom: 1em;
}
li.section-li > .section {
  display: grid;
  grid-template-columns: fit-content(8em) 3fr 1fr;
}
@media all and ((max-width: 800px)) {
  li.section-li > .section > .tags {
    display: none;
  }
}
li.section-li > .section > .desc > h3 > a {
  background-color: transparent;
}
li.section-li > .section .meta {
  margin: 0 1em 0 0;
  opacity: 0.6;
}

.popover .section {
  grid-template-columns: fit-content(8em) 1fr !important;
}
.popover .section > .tags {
  display: none;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbIi4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2NzcyIsImxpc3RQYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUNFQTtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7RUFDRTs7QUFFQTtFQUNFO0VBQ0E7O0FBRUE7RUFDRTtJQUNFOzs7QUFJSjtFQUNFOztBQUdGO0VBQ0U7RUFDQTs7O0FBTU47RUFDRTs7QUFFQTtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMYXlvdXQgYnJlYWtwb2ludHNcbiAqICRtb2JpbGU6IHNjcmVlbiB3aWR0aCBiZWxvdyB0aGlzIHZhbHVlIHdpbGwgdXNlIG1vYmlsZSBzdHlsZXNcbiAqICRkZXNrdG9wOiBzY3JlZW4gd2lkdGggYWJvdmUgdGhpcyB2YWx1ZSB3aWxsIHVzZSBkZXNrdG9wIHN0eWxlc1xuICogU2NyZWVuIHdpZHRoIGJldHdlZW4gJG1vYmlsZSBhbmQgJGRlc2t0b3Agd2lkdGggd2lsbCB1c2UgdGhlIHRhYmxldCBsYXlvdXQuXG4gKiBhc3N1bWluZyBtb2JpbGUgPCBkZXNrdG9wXG4gKi9cbiRicmVha3BvaW50czogKFxuICBtb2JpbGU6IDgwMHB4LFxuICBkZXNrdG9wOiAxMjAwcHgsXG4pO1xuXG4kbW9iaWxlOiBcIihtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIG1vYmlsZSl9KVwiO1xuJHRhYmxldDogXCIobWluLXdpZHRoOiAje21hcC1nZXQoJGJyZWFrcG9pbnRzLCBtb2JpbGUpfSkgYW5kIChtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSlcIjtcbiRkZXNrdG9wOiBcIihtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSlcIjtcblxuJHBhZ2VXaWR0aDogI3ttYXAtZ2V0KCRicmVha3BvaW50cywgbW9iaWxlKX07XG4kc2lkZVBhbmVsV2lkdGg6IDMyMHB4OyAvLzM4MHB4O1xuJHRvcFNwYWNpbmc6IDZyZW07XG4kYm9sZFdlaWdodDogNzAwO1xuJHNlbWlCb2xkV2VpZ2h0OiA2MDA7XG4kbm9ybWFsV2VpZ2h0OiA0MDA7XG5cbiRtb2JpbGVHcmlkOiAoXG4gIHRlbXBsYXRlUm93czogXCJhdXRvIGF1dG8gYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcImF1dG9cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnRcIlxcXG4gICAgICBcImdyaWQtaGVhZGVyXCJcXFxuICAgICAgXCJncmlkLWNlbnRlclwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLXJpZ2h0XCJcXFxuICAgICAgXCJncmlkLWZvb3RlclwiJyxcbik7XG4kdGFibGV0R3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG8gYXV0b1wiLFxuICB0ZW1wbGF0ZUNvbHVtbnM6IFwiI3skc2lkZVBhbmVsV2lkdGh9IGF1dG9cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1oZWFkZXJcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtY2VudGVyXCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItbGVmdCBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtZm9vdGVyXCInLFxuKTtcbiRkZXNrdG9wR3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcIiN7JHNpZGVQYW5lbFdpZHRofSBhdXRvICN7JHNpZGVQYW5lbFdpZHRofVwiLFxuICByb3dHYXA6IFwiNXB4XCIsXG4gIGNvbHVtbkdhcDogXCI1cHhcIixcbiAgdGVtcGxhdGVBcmVhczpcbiAgICAnXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWhlYWRlciBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtY2VudGVyIGdyaWQtc2lkZWJhci1yaWdodFwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1mb290ZXIgZ3JpZC1zaWRlYmFyLXJpZ2h0XCInLFxuKTtcbiIsIkB1c2UgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuXG51bC5zZWN0aW9uLXVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgbWFyZ2luLXRvcDogMmVtO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG59XG5cbmxpLnNlY3Rpb24tbGkge1xuICBtYXJnaW4tYm90dG9tOiAxZW07XG5cbiAgJiA+IC5zZWN0aW9uIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogZml0LWNvbnRlbnQoOGVtKSAzZnIgMWZyO1xuXG4gICAgQG1lZGlhIGFsbCBhbmQgKCRtb2JpbGUpIHtcbiAgICAgICYgPiAudGFncyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJiA+IC5kZXNjID4gaDMgPiBhIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cblxuICAgICYgLm1ldGEge1xuICAgICAgbWFyZ2luOiAwIDFlbSAwIDA7XG4gICAgICBvcGFjaXR5OiAwLjY7XG4gICAgfVxuICB9XG59XG5cbi8vIG1vZGlmaWNhdGlvbnMgaW4gcG9wb3ZlciBjb250ZXh0XG4ucG9wb3ZlciAuc2VjdGlvbiB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogZml0LWNvbnRlbnQoOGVtKSAxZnIgIWltcG9ydGFudDtcblxuICAmID4gLnRhZ3Mge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cbiJdfQ== */`;import{Fragment as Fragment2,jsx as jsx8}from"preact/jsx-runtime";function getDate(cfg,data){if(!cfg.defaultDateType)throw new Error("Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.");return data.dates?.[cfg.defaultDateType]}__name(getDate,"getDate");function formatDate(d,locale="en-US"){return d.toLocaleDateString(locale,{year:"numeric",month:"short",day:"2-digit"})}__name(formatDate,"formatDate");function Date2({date,locale}){return jsx8(Fragment2,{children:formatDate(date,locale)})}__name(Date2,"Date");import{jsx as jsx9,jsxs as jsxs3}from"preact/jsx-runtime";function byDateAndAlphabetical(cfg){return(f1,f2)=>{if(f1.dates&&f2.dates)return getDate(cfg,f2).getTime()-getDate(cfg,f1).getTime();if(f1.dates&&!f2.dates)return-1;if(!f1.dates&&f2.dates)return 1;let f1Title=f1.frontmatter?.title.toLowerCase()??"",f2Title=f2.frontmatter?.title.toLowerCase()??"";return f1Title.localeCompare(f2Title)}}__name(byDateAndAlphabetical,"byDateAndAlphabetical");var PageList=__name(({cfg,fileData,allFiles,limit,sort})=>{let sorter=sort??byDateAndAlphabetical(cfg),list=allFiles.sort(sorter);return limit&&(list=list.slice(0,limit)),jsx9("ul",{class:"section-ul",children:list.map(page=>{let title=page.frontmatter?.title,tags=page.frontmatter?.tags??[];return jsx9("li",{class:"section-li",children:jsxs3("div",{class:"section",children:[jsx9("div",{children:page.dates&&jsx9("p",{class:"meta",children:jsx9(Date2,{date:getDate(cfg,page),locale:cfg.locale})})}),jsx9("div",{class:"desc",children:jsx9("h3",{children:jsx9("a",{href:resolveRelative(fileData.slug,page.slug),class:"internal",children:title})})}),jsx9("ul",{class:"tags",children:tags.map(tag=>jsx9("li",{children:jsx9("a",{class:"internal tag-link",href:resolveRelative(fileData.slug,`tags/${tag}`),children:tag})}))})]})})})})},"PageList");PageList.css=`
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`;import{Fragment as Fragment3,jsx as jsx10,jsxs as jsxs4}from"preact/jsx-runtime";var defaultOptions9={numPages:10},TagContent_default=__name(opts=>{let options2={...defaultOptions9,...opts},TagContent=__name(props=>{let{tree,fileData,allFiles,cfg}=props,slug=fileData.slug;if(!(slug?.startsWith("tags/")||slug==="tags"))throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`);let tag=simplifySlug(slug.slice(5)),allPagesWithTag=__name(tag2=>allFiles.filter(file=>(file.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes).includes(tag2)),"allPagesWithTag"),content=tree.children.length===0?fileData.description:htmlToJsx(fileData.filePath,tree),classes=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" ");if(tag==="/"){let tags=[...new Set(allFiles.flatMap(data=>data.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes))].sort((a,b)=>a.localeCompare(b)),tagItemMap=new Map;for(let tag2 of tags)tagItemMap.set(tag2,allPagesWithTag(tag2));return jsxs4("div",{class:classes,children:[jsx10("article",{children:jsx10("p",{children:content})}),jsx10("p",{children:i18n(cfg.locale).pages.tagContent.totalTags({count:tags.length})}),jsx10("div",{children:tags.map(tag2=>{let pages=tagItemMap.get(tag2),listProps={...props,allFiles:pages},contentPage=allFiles.filter(file=>file.slug===`tags/${tag2}`).at(0),root=contentPage?.htmlAst,content2=!root||root?.children.length===0?contentPage?.description:htmlToJsx(contentPage.filePath,root);return jsxs4("div",{children:[jsx10("h2",{children:jsx10("a",{class:"internal tag-link",href:`../tags/${tag2}`,children:tag2})}),content2&&jsx10("p",{children:content2}),jsxs4("div",{class:"page-listing",children:[jsxs4("p",{children:[i18n(cfg.locale).pages.tagContent.itemsUnderTag({count:pages.length}),pages.length>options2.numPages&&jsxs4(Fragment3,{children:[" ",jsx10("span",{children:i18n(cfg.locale).pages.tagContent.showingFirst({count:options2.numPages})})]})]}),jsx10(PageList,{limit:options2.numPages,...listProps,sort:opts?.sort})]})]})})})]})}else{let pages=allPagesWithTag(tag),listProps={...props,allFiles:pages};return jsxs4("div",{class:classes,children:[jsx10("article",{children:content}),jsxs4("div",{class:"page-listing",children:[jsx10("p",{children:i18n(cfg.locale).pages.tagContent.itemsUnderTag({count:pages.length})}),jsx10("div",{children:jsx10(PageList,{...listProps})})]})]})}},"TagContent");return TagContent.css=listPage_default+PageList.css,TagContent},"default");import path5 from"path";import{jsx as jsx11,jsxs as jsxs5}from"preact/jsx-runtime";var defaultOptions10={showFolderCount:!0},FolderContent_default=__name(opts=>{let options2={...defaultOptions10,...opts},FolderContent=__name(props=>{let{tree,fileData,allFiles,cfg}=props,folderSlug=stripSlashes(simplifySlug(fileData.slug)),allPagesInFolder=allFiles.filter(file=>{let fileSlug=stripSlashes(simplifySlug(file.slug)),prefixed=fileSlug.startsWith(folderSlug)&&fileSlug!==folderSlug,folderParts=folderSlug.split(path5.posix.sep),isDirectChild=fileSlug.split(path5.posix.sep).length===folderParts.length+1;return prefixed&&isDirectChild}),classes=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" "),listProps={...props,sort:options2.sort,allFiles:allPagesInFolder},content=tree.children.length===0?fileData.description:htmlToJsx(fileData.filePath,tree);return jsxs5("div",{class:classes,children:[jsx11("article",{children:content}),jsxs5("div",{class:"page-listing",children:[options2.showFolderCount&&jsx11("p",{children:i18n(cfg.locale).pages.folderContent.itemsUnderFolder({count:allPagesInFolder.length})}),jsx11("div",{children:jsx11(PageList,{...listProps})})]})]})},"FolderContent");return FolderContent.css=listPage_default+PageList.css,FolderContent},"default");import{jsx as jsx12,jsxs as jsxs6}from"preact/jsx-runtime";var NotFound=__name(({cfg})=>{let baseDir=new URL(`https://${cfg.baseUrl??"example.com"}`).pathname;return jsxs6("article",{class:"popover-hint",children:[jsx12("h1",{children:"404"}),jsx12("p",{children:i18n(cfg.locale).pages.error.notFound}),jsx12("a",{href:baseDir,children:i18n(cfg.locale).pages.error.home})]})},"NotFound"),__default=__name(()=>NotFound,"default");import{jsx as jsx13}from"preact/jsx-runtime";var ArticleTitle=__name(({fileData,displayClass})=>{let title=fileData.frontmatter?.title;return title?jsx13("h1",{class:classNames(displayClass,"article-title"),children:title}):null},"ArticleTitle");ArticleTitle.css=`
.article-title {
  margin: 2rem 0 0 0;
}
`;var ArticleTitle_default=__name(()=>ArticleTitle,"default");var darkmode_inline_default=`var d=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",s=localStorage.getItem("theme")??d;document.documentElement.setAttribute("saved-theme",s);var a=t=>{let n=new CustomEvent("themechange",{detail:{theme:t}});document.dispatchEvent(n)};document.addEventListener("nav",()=>{let t=o=>{let e=document.documentElement.getAttribute("saved-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),a(e)},n=o=>{let e=o.matches?"dark":"light";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),a(e)},m=document.querySelector("#darkmode");m.addEventListener("click",t),window.addCleanup(()=>m.removeEventListener("click",t));let c=window.matchMedia("(prefers-color-scheme: dark)");c.addEventListener("change",n),window.addCleanup(()=>c.removeEventListener("change",n))});
`;var darkmode_default=`.darkmode {
  cursor: pointer;
  padding: 0;
  position: relative;
  background: none;
  border: none;
  width: 20px;
  height: 20px;
  margin: 0 10px;
  text-align: inherit;
}
.darkmode svg {
  position: absolute;
  width: 20px;
  height: 20px;
  top: calc(50% - 10px);
  fill: var(--darkgray);
  transition: opacity 0.1s ease;
}

:root[saved-theme=dark] {
  color-scheme: dark;
}

:root[saved-theme=light] {
  color-scheme: light;
}

:root[saved-theme=dark] .darkmode > #dayIcon {
  display: none;
}
:root[saved-theme=dark] .darkmode > #nightIcon {
  display: inline;
}

:root .darkmode > #dayIcon {
  display: inline;
}
:root .darkmode > #nightIcon {
  display: none;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbImRhcmttb2RlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztBQUlKO0VBQ0U7OztBQUdGO0VBQ0U7OztBQUlBO0VBQ0U7O0FBRUY7RUFDRTs7O0FBS0Y7RUFDRTs7QUFFRjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiLmRhcmttb2RlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgbWFyZ2luOiAwIDEwcHg7XG4gIHRleHQtYWxpZ246IGluaGVyaXQ7XG5cbiAgJiBzdmcge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgdG9wOiBjYWxjKDUwJSAtIDEwcHgpO1xuICAgIGZpbGw6IHZhcigtLWRhcmtncmF5KTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgZWFzZTtcbiAgfVxufVxuXG46cm9vdFtzYXZlZC10aGVtZT1cImRhcmtcIl0ge1xuICBjb2xvci1zY2hlbWU6IGRhcms7XG59XG5cbjpyb290W3NhdmVkLXRoZW1lPVwibGlnaHRcIl0ge1xuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xufVxuXG46cm9vdFtzYXZlZC10aGVtZT1cImRhcmtcIl0gLmRhcmttb2RlIHtcbiAgJiA+ICNkYXlJY29uIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG4gICYgPiAjbmlnaHRJY29uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmU7XG4gIH1cbn1cblxuOnJvb3QgLmRhcmttb2RlIHtcbiAgJiA+ICNkYXlJY29uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmU7XG4gIH1cbiAgJiA+ICNuaWdodEljb24ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cbiJdfQ== */`;import{jsx as jsx14,jsxs as jsxs7}from"preact/jsx-runtime";var Darkmode=__name(({displayClass,cfg})=>jsxs7("button",{class:classNames(displayClass,"darkmode"),id:"darkmode",children:[jsxs7("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",id:"dayIcon",x:"0px",y:"0px",viewBox:"0 0 35 35",style:"enable-background:new 0 0 35 35",xmlSpace:"preserve","aria-label":i18n(cfg.locale).components.themeToggle.darkMode,children:[jsx14("title",{children:i18n(cfg.locale).components.themeToggle.darkMode}),jsx14("path",{d:"M6,17.5C6,16.672,5.328,16,4.5,16h-3C0.672,16,0,16.672,0,17.5    S0.672,19,1.5,19h3C5.328,19,6,18.328,6,17.5z M7.5,26c-0.414,0-0.789,0.168-1.061,0.439l-2,2C4.168,28.711,4,29.086,4,29.5    C4,30.328,4.671,31,5.5,31c0.414,0,0.789-0.168,1.06-0.44l2-2C8.832,28.289,9,27.914,9,27.5C9,26.672,8.329,26,7.5,26z M17.5,6    C18.329,6,19,5.328,19,4.5v-3C19,0.672,18.329,0,17.5,0S16,0.672,16,1.5v3C16,5.328,16.671,6,17.5,6z M27.5,9    c0.414,0,0.789-0.168,1.06-0.439l2-2C30.832,6.289,31,5.914,31,5.5C31,4.672,30.329,4,29.5,4c-0.414,0-0.789,0.168-1.061,0.44    l-2,2C26.168,6.711,26,7.086,26,7.5C26,8.328,26.671,9,27.5,9z M6.439,8.561C6.711,8.832,7.086,9,7.5,9C8.328,9,9,8.328,9,7.5    c0-0.414-0.168-0.789-0.439-1.061l-2-2C6.289,4.168,5.914,4,5.5,4C4.672,4,4,4.672,4,5.5c0,0.414,0.168,0.789,0.439,1.06    L6.439,8.561z M33.5,16h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3c0.828,0,1.5-0.672,1.5-1.5S34.328,16,33.5,16z     M28.561,26.439C28.289,26.168,27.914,26,27.5,26c-0.828,0-1.5,0.672-1.5,1.5c0,0.414,0.168,0.789,0.439,1.06l2,2    C28.711,30.832,29.086,31,29.5,31c0.828,0,1.5-0.672,1.5-1.5c0-0.414-0.168-0.789-0.439-1.061L28.561,26.439z M17.5,29    c-0.829,0-1.5,0.672-1.5,1.5v3c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3C19,29.672,18.329,29,17.5,29z M17.5,7    C11.71,7,7,11.71,7,17.5S11.71,28,17.5,28S28,23.29,28,17.5S23.29,7,17.5,7z M17.5,25c-4.136,0-7.5-3.364-7.5-7.5    c0-4.136,3.364-7.5,7.5-7.5c4.136,0,7.5,3.364,7.5,7.5C25,21.636,21.636,25,17.5,25z"})]}),jsxs7("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",id:"nightIcon",x:"0px",y:"0px",viewBox:"0 0 100 100",style:"enable-background:new 0 0 100 100",xmlSpace:"preserve","aria-label":i18n(cfg.locale).components.themeToggle.lightMode,children:[jsx14("title",{children:i18n(cfg.locale).components.themeToggle.lightMode}),jsx14("path",{d:"M96.76,66.458c-0.853-0.852-2.15-1.064-3.23-0.534c-6.063,2.991-12.858,4.571-19.655,4.571  C62.022,70.495,50.88,65.88,42.5,57.5C29.043,44.043,25.658,23.536,34.076,6.47c0.532-1.08,0.318-2.379-0.534-3.23  c-0.851-0.852-2.15-1.064-3.23-0.534c-4.918,2.427-9.375,5.619-13.246,9.491c-9.447,9.447-14.65,22.008-14.65,35.369  c0,13.36,5.203,25.921,14.65,35.368s22.008,14.65,35.368,14.65c13.361,0,25.921-5.203,35.369-14.65  c3.872-3.871,7.064-8.328,9.491-13.246C97.826,68.608,97.611,67.309,96.76,66.458z"})]})]}),"Darkmode");Darkmode.beforeDOMLoaded=darkmode_inline_default;Darkmode.css=darkmode_default;var Darkmode_default=__name(()=>Darkmode,"default");var DEFAULT_SANS_SERIF='-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',DEFAULT_MONO="ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace";function googleFontHref(theme){let{code,header,body}=theme.typography;return`https://fonts.googleapis.com/css2?family=${code}&family=${header}:wght@400;700&family=${body}:ital,wght@0,400;0,600;1,400;1,600&display=swap`}__name(googleFontHref,"googleFontHref");function joinStyles(theme,...stylesheet){return`
${stylesheet.join(`

`)}

:root {
  --light: ${theme.colors.lightMode.light};
  --lightgray: ${theme.colors.lightMode.lightgray};
  --gray: ${theme.colors.lightMode.gray};
  --darkgray: ${theme.colors.lightMode.darkgray};
  --dark: ${theme.colors.lightMode.dark};
  --secondary: ${theme.colors.lightMode.secondary};
  --tertiary: ${theme.colors.lightMode.tertiary};
  --highlight: ${theme.colors.lightMode.highlight};
  --textHighlight: ${theme.colors.lightMode.textHighlight};

  --headerFont: "${theme.typography.header}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${theme.typography.body}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${theme.typography.code}", ${DEFAULT_MONO};
}

:root[saved-theme="dark"] {
  --light: ${theme.colors.darkMode.light};
  --lightgray: ${theme.colors.darkMode.lightgray};
  --gray: ${theme.colors.darkMode.gray};
  --darkgray: ${theme.colors.darkMode.darkgray};
  --dark: ${theme.colors.darkMode.dark};
  --secondary: ${theme.colors.darkMode.secondary};
  --tertiary: ${theme.colors.darkMode.tertiary};
  --highlight: ${theme.colors.darkMode.highlight};
  --textHighlight: ${theme.colors.darkMode.textHighlight};
}
`}__name(joinStyles,"joinStyles");import{Fragment as Fragment4,jsx as jsx15,jsxs as jsxs8}from"preact/jsx-runtime";var Head_default=__name(()=>__name(({cfg,fileData,externalResources})=>{let titleSuffix=cfg.pageTitleSuffix??"",title=(fileData.frontmatter?.title??i18n(cfg.locale).propertyDefaults.title)+titleSuffix,description=fileData.description?.trim()??i18n(cfg.locale).propertyDefaults.description,{css,js}=externalResources,path13=new URL(`https://${cfg.baseUrl??"example.com"}`).pathname,baseDir=fileData.slug==="404"?path13:pathToRoot(fileData.slug),iconPath=joinSegments(baseDir,"static/icon.png"),ogImagePath=`https://${cfg.baseUrl}/static/og-image.png`;return jsxs8("head",{children:[jsx15("title",{children:title}),jsx15("meta",{charSet:"utf-8"}),cfg.theme.cdnCaching&&cfg.theme.fontOrigin==="googleFonts"&&jsxs8(Fragment4,{children:[jsx15("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),jsx15("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),jsx15("link",{rel:"stylesheet",href:googleFontHref(cfg.theme)})]}),jsx15("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),jsx15("meta",{property:"og:title",content:title}),jsx15("meta",{property:"og:description",content:description}),cfg.baseUrl&&jsx15("meta",{property:"og:image",content:ogImagePath}),jsx15("meta",{property:"og:width",content:"1200"}),jsx15("meta",{property:"og:height",content:"675"}),jsx15("link",{rel:"icon",href:iconPath}),jsx15("meta",{name:"description",content:description}),jsx15("meta",{name:"generator",content:"Quartz"}),css.map(href=>jsx15("link",{href,rel:"stylesheet",type:"text/css","spa-preserve":!0},href)),js.filter(resource=>resource.loadTime==="beforeDOMReady").map(res=>JSResourceToScriptElement(res,!0))]})},"Head"),"default");import{jsx as jsx16}from"preact/jsx-runtime";var PageTitle=__name(({fileData,cfg,displayClass})=>{let title=cfg?.pageTitle??i18n(cfg.locale).propertyDefaults.title,baseDir=pathToRoot(fileData.slug);return jsx16("h2",{class:classNames(displayClass,"page-title"),children:jsx16("a",{href:baseDir,children:title})})},"PageTitle");PageTitle.css=`
.page-title {
  font-size: 1.75rem;
  margin: 0;
}
`;var PageTitle_default=__name(()=>PageTitle,"default");import readingTime from"reading-time";var contentMeta_default=`.content-meta {
  margin-top: 0;
  color: var(--gray);
}
.content-meta[show-comma=true] > span:not(:last-child) {
  margin-right: 8px;
}
.content-meta[show-comma=true] > span:not(:last-child)::after {
  content: ",";
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbImNvbnRlbnRNZXRhLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBOztBQUdFO0VBQ0U7O0FBRUE7RUFDRSIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50LW1ldGEge1xuICBtYXJnaW4tdG9wOiAwO1xuICBjb2xvcjogdmFyKC0tZ3JheSk7XG5cbiAgJltzaG93LWNvbW1hPVwidHJ1ZVwiXSB7XG4gICAgPiBzcGFuOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG5cbiAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogXCIsXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */`;import{jsx as jsx17}from"preact/jsx-runtime";var defaultOptions11={showReadingTime:!0,showComma:!0},ContentMeta_default=__name(opts=>{let options2={...defaultOptions11,...opts};function ContentMetadata({cfg,fileData,displayClass}){let text=fileData.text;if(text){let segments=[];if(fileData.dates&&segments.push(formatDate(getDate(cfg,fileData),cfg.locale)),options2.showReadingTime){let{minutes,words:_words}=readingTime(text),displayedTime=i18n(cfg.locale).components.contentMeta.readingTime({minutes:Math.ceil(minutes)});segments.push(displayedTime)}let segmentsElements=segments.map(segment=>jsx17("span",{children:segment}));return jsx17("p",{"show-comma":options2.showComma,class:classNames(displayClass,"content-meta"),children:segmentsElements})}else return null}return __name(ContentMetadata,"ContentMetadata"),ContentMetadata.css=contentMeta_default,ContentMetadata},"default");import{jsx as jsx18}from"preact/jsx-runtime";function Spacer({displayClass}){return jsx18("div",{class:classNames(displayClass,"spacer")})}__name(Spacer,"Spacer");var Spacer_default=__name(()=>Spacer,"default");var legacyToc_default=`details#toc summary {
  cursor: pointer;
}
details#toc summary::marker {
  color: var(--dark);
}
details#toc summary > * {
  padding-left: 0.25rem;
  display: inline-block;
  margin: 0;
}
details#toc ul {
  list-style: none;
  margin: 0.5rem 1.25rem;
  padding: 0;
}
details#toc .depth-1 {
  padding-left: calc(1rem * 1);
}
details#toc .depth-2 {
  padding-left: calc(1rem * 2);
}
details#toc .depth-3 {
  padding-left: calc(1rem * 3);
}
details#toc .depth-4 {
  padding-left: calc(1rem * 4);
}
details#toc .depth-5 {
  padding-left: calc(1rem * 5);
}
details#toc .depth-6 {
  padding-left: calc(1rem * 6);
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbImxlZ2FjeVRvYy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0U7O0FBRUE7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFJSjtFQUNFO0VBQ0E7RUFDQTs7QUFJQTtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRSIsInNvdXJjZXNDb250ZW50IjpbImRldGFpbHMjdG9jIHtcbiAgJiBzdW1tYXJ5IHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAmOjptYXJrZXIge1xuICAgICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgIH1cblxuICAgICYgPiAqIHtcbiAgICAgIHBhZGRpbmctbGVmdDogMC4yNXJlbTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIG1hcmdpbjogMDtcbiAgICB9XG4gIH1cblxuICAmIHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIG1hcmdpbjogMC41cmVtIDEuMjVyZW07XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggNiB7XG4gICAgJiAuZGVwdGgtI3skaX0ge1xuICAgICAgcGFkZGluZy1sZWZ0OiBjYWxjKDFyZW0gKiAjeyRpfSk7XG4gICAgfVxuICB9XG59XG4iXX0= */`;var toc_default=`.toc {
  display: flex;
  flex-direction: column;
}
.toc.desktop-only {
  display: flex;
  max-height: 40%;
}

button#toc {
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 0;
  color: var(--dark);
  display: flex;
  align-items: center;
}
button#toc h3 {
  font-size: 1rem;
  display: inline-block;
  margin: 0;
}
button#toc .fold {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  opacity: 0.8;
}
button#toc.collapsed .fold {
  transform: rotateZ(-90deg);
}

#toc-content {
  list-style: none;
  overflow: hidden;
  overflow-y: auto;
  max-height: 100%;
  transition: max-height 0.35s ease, visibility 0s linear 0s;
  position: relative;
  visibility: visible;
}
#toc-content.collapsed {
  max-height: 0;
  transition: max-height 0.35s ease, visibility 0s linear 0.35s;
  visibility: hidden;
}
#toc-content.collapsed > .overflow::after {
  opacity: 0;
}
#toc-content ul {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
}
#toc-content ul > li > a {
  color: var(--dark);
  opacity: 0.35;
  transition: 0.5s ease opacity, 0.3s ease color;
}
#toc-content ul > li > a.in-view {
  opacity: 0.75;
}
#toc-content > ul.overflow {
  max-height: none;
  width: 100%;
}
#toc-content .depth-0 {
  padding-left: calc(1rem * 0);
}
#toc-content .depth-1 {
  padding-left: calc(1rem * 1);
}
#toc-content .depth-2 {
  padding-left: calc(1rem * 2);
}
#toc-content .depth-3 {
  padding-left: calc(1rem * 3);
}
#toc-content .depth-4 {
  padding-left: calc(1rem * 4);
}
#toc-content .depth-5 {
  padding-left: calc(1rem * 5);
}
#toc-content .depth-6 {
  padding-left: calc(1rem * 6);
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbInRvYy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7RUFDQTs7QUFDQTtFQUNFO0VBQ0E7OztBQUlKO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsWUFDRTtFQUVGO0VBQ0E7O0FBRUE7RUFDRTtFQUNBLFlBQ0U7RUFFRjs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOztBQUNBO0VBQ0U7RUFDQTtFQUNBLFlBQ0U7O0FBRUY7RUFDRTs7QUFJTjtFQUNFO0VBQ0E7O0FBSUE7RUFDRTs7QUFERjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRSIsInNvdXJjZXNDb250ZW50IjpbIi50b2Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAmLmRlc2t0b3Atb25seSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXgtaGVpZ2h0OiA0MCU7XG4gIH1cbn1cblxuYnV0dG9uI3RvYyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgY29sb3I6IHZhcigtLWRhcmspO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICYgaDMge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgJiAuZm9sZCB7XG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxuXG4gICYuY29sbGFwc2VkIC5mb2xkIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooLTkwZGVnKTtcbiAgfVxufVxuXG4jdG9jLWNvbnRlbnQge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICB0cmFuc2l0aW9uOlxuICAgIG1heC1oZWlnaHQgMC4zNXMgZWFzZSxcbiAgICB2aXNpYmlsaXR5IDBzIGxpbmVhciAwcztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuXG4gICYuY29sbGFwc2VkIHtcbiAgICBtYXgtaGVpZ2h0OiAwO1xuICAgIHRyYW5zaXRpb246XG4gICAgICBtYXgtaGVpZ2h0IDAuMzVzIGVhc2UsXG4gICAgICB2aXNpYmlsaXR5IDBzIGxpbmVhciAwLjM1cztcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cblxuICAmLmNvbGxhcHNlZCA+IC5vdmVyZmxvdzo6YWZ0ZXIge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICAmIHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIG1hcmdpbjogMC41cmVtIDA7XG4gICAgcGFkZGluZzogMDtcbiAgICAmID4gbGkgPiBhIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgICAgIG9wYWNpdHk6IDAuMzU7XG4gICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAwLjVzIGVhc2Ugb3BhY2l0eSxcbiAgICAgICAgMC4zcyBlYXNlIGNvbG9yO1xuICAgICAgJi5pbi12aWV3IHtcbiAgICAgICAgb3BhY2l0eTogMC43NTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgPiB1bC5vdmVyZmxvdyB7XG4gICAgbWF4LWhlaWdodDogbm9uZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIEBmb3IgJGkgZnJvbSAwIHRocm91Z2ggNiB7XG4gICAgJiAuZGVwdGgtI3skaX0ge1xuICAgICAgcGFkZGluZy1sZWZ0OiBjYWxjKDFyZW0gKiAjeyRpfSk7XG4gICAgfVxuICB9XG59XG4iXX0= */`;var toc_inline_default='var o=new IntersectionObserver(e=>{for(let t of e){let s=t.target.id,n=document.querySelector(`a[data-for="${s}"]`),i=t.rootBounds?.height;i&&n&&(t.boundingClientRect.y<i?n.classList.add("in-view"):n.classList.remove("in-view"))}});function c(){this.classList.toggle("collapsed"),this.setAttribute("aria-expanded",this.getAttribute("aria-expanded")==="true"?"false":"true");let e=this.nextElementSibling;e&&e.classList.toggle("collapsed")}function d(){let e=document.getElementById("toc");if(e){let t=e.classList.contains("collapsed");if(!e.nextElementSibling)return;e.addEventListener("click",c),window.addCleanup(()=>e.removeEventListener("click",c))}}window.addEventListener("resize",d);document.addEventListener("nav",()=>{d(),o.disconnect(),document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach(t=>o.observe(t))});\n';import{jsx as jsx19,jsxs as jsxs9}from"preact/jsx-runtime";var defaultOptions12={layout:"modern"},TableOfContents2=__name(({fileData,displayClass,cfg})=>fileData.toc?jsxs9("div",{class:classNames(displayClass,"toc"),children:[jsxs9("button",{type:"button",id:"toc",class:fileData.collapseToc?"collapsed":"","aria-controls":"toc-content","aria-expanded":!fileData.collapseToc,children:[jsx19("h3",{children:i18n(cfg.locale).components.tableOfContents.title}),jsx19("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"fold",children:jsx19("polyline",{points:"6 9 12 15 18 9"})})]}),jsx19("div",{id:"toc-content",class:fileData.collapseToc?"collapsed":"",children:jsx19("ul",{class:"overflow",children:fileData.toc.map(tocEntry=>jsx19("li",{class:`depth-${tocEntry.depth}`,children:jsx19("a",{href:`#${tocEntry.slug}`,"data-for":tocEntry.slug,children:tocEntry.text})},tocEntry.slug))})})]}):null,"TableOfContents");TableOfContents2.css=toc_default;TableOfContents2.afterDOMLoaded=toc_inline_default;var LegacyTableOfContents=__name(({fileData,cfg})=>fileData.toc?jsxs9("details",{id:"toc",open:!fileData.collapseToc,children:[jsx19("summary",{children:jsx19("h3",{children:i18n(cfg.locale).components.tableOfContents.title})}),jsx19("ul",{children:fileData.toc.map(tocEntry=>jsx19("li",{class:`depth-${tocEntry.depth}`,children:jsx19("a",{href:`#${tocEntry.slug}`,"data-for":tocEntry.slug,children:tocEntry.text})},tocEntry.slug))})]}):null,"LegacyTableOfContents");LegacyTableOfContents.css=legacyToc_default;var TableOfContents_default=__name(opts=>(opts?.layout??defaultOptions12.layout)==="modern"?TableOfContents2:LegacyTableOfContents,"default");var explorer_default=`/**
 * Layout breakpoints
 * $mobile: screen width below this value will use mobile styles
 * $desktop: screen width above this value will use desktop styles
 * Screen width between $mobile and $desktop width will use the tablet layout.
 * assuming mobile < desktop
 */
.explorer {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  /*&:after {
    pointer-events: none;
    content: "";
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 1;
    transition: opacity 0.3s ease;
    background: linear-gradient(transparent 0px, var(--light));
  }*/
}
@media all and not ((max-width: 800px)) {
  .explorer.desktop-only {
    display: flex;
  }
}

button#explorer {
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 0;
  color: var(--dark);
  display: flex;
  align-items: center;
}
button#explorer h2 {
  font-size: 1rem;
  display: inline-block;
  margin: 0;
}
button#explorer .fold {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  opacity: 0.8;
}
button#explorer.collapsed .fold {
  transform: rotateZ(-90deg);
}

.folder-outer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-in-out;
}

.folder-outer.open {
  grid-template-rows: 1fr;
}

.folder-outer > ul {
  overflow: hidden;
}

#explorer-content {
  list-style: none;
  overflow: hidden;
  overflow-y: auto;
  max-height: 100%;
  transition: max-height 0.35s ease, visibility 0s linear 0s;
  margin-top: 0.5rem;
  visibility: visible;
}
#explorer-content.collapsed {
  max-height: 0;
  transition: max-height 0.35s ease, visibility 0s linear 0.35s;
  visibility: hidden;
}
#explorer-content ul {
  list-style: none;
  margin: 0.08rem 0;
  padding: 0;
  transition: max-height 0.35s ease, transform 0.35s ease, opacity 0.2s ease;
}
#explorer-content ul li > a {
  color: var(--dark);
  opacity: 0.75;
  pointer-events: all;
}
#explorer-content > #explorer-ul {
  max-height: none;
}

svg {
  pointer-events: all;
}
svg > polyline {
  pointer-events: none;
}

.folder-container {
  flex-direction: row;
  display: flex;
  align-items: center;
  user-select: none;
}
.folder-container div > a {
  color: var(--secondary);
  font-family: var(--headerFont);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5rem;
  display: inline-block;
}
.folder-container div > a:hover {
  color: var(--tertiary);
}
.folder-container div > button {
  color: var(--dark);
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  align-items: center;
  font-family: var(--headerFont);
}
.folder-container div > button span {
  font-size: 0.95rem;
  display: inline-block;
  color: var(--secondary);
  font-weight: 600;
  margin: 0;
  line-height: 1.5rem;
  pointer-events: none;
}

.folder-icon {
  margin-right: 5px;
  color: var(--secondary);
  cursor: pointer;
  transition: transform 0.3s ease;
  backface-visibility: visible;
}

li:has(> .folder-outer:not(.open)) > .folder-container > svg {
  transform: rotate(-90deg);
}

.folder-icon:hover {
  color: var(--tertiary);
}

.no-background::after {
  background: none !important;
}

#explorer-end {
  height: 4px;
  margin: 0;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbIi4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2NzcyIsImV4cGxvcmVyLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUNFQTtFQUNFO0VBQ0E7RUFDQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFKRTtFQURGO0lBRUk7Ozs7QUFpQk47RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBOztBQUdGO0VBQ0U7OztBQUlKO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsWUFDRTtFQUVGO0VBQ0E7O0FBRUE7RUFDRTtFQUNBLFlBQ0U7RUFFRjs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBLFlBQ0U7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBR0o7RUFDRTs7O0FBSUo7RUFDRTs7QUFFQTtFQUNFOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBO0VBQ0EsYUR0R2E7RUN1R2I7RUFDQTs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQSxhRC9IVztFQ2dJWDtFQUNBO0VBQ0E7OztBQUtOO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFFRTtFQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMYXlvdXQgYnJlYWtwb2ludHNcbiAqICRtb2JpbGU6IHNjcmVlbiB3aWR0aCBiZWxvdyB0aGlzIHZhbHVlIHdpbGwgdXNlIG1vYmlsZSBzdHlsZXNcbiAqICRkZXNrdG9wOiBzY3JlZW4gd2lkdGggYWJvdmUgdGhpcyB2YWx1ZSB3aWxsIHVzZSBkZXNrdG9wIHN0eWxlc1xuICogU2NyZWVuIHdpZHRoIGJldHdlZW4gJG1vYmlsZSBhbmQgJGRlc2t0b3Agd2lkdGggd2lsbCB1c2UgdGhlIHRhYmxldCBsYXlvdXQuXG4gKiBhc3N1bWluZyBtb2JpbGUgPCBkZXNrdG9wXG4gKi9cbiRicmVha3BvaW50czogKFxuICBtb2JpbGU6IDgwMHB4LFxuICBkZXNrdG9wOiAxMjAwcHgsXG4pO1xuXG4kbW9iaWxlOiBcIihtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIG1vYmlsZSl9KVwiO1xuJHRhYmxldDogXCIobWluLXdpZHRoOiAje21hcC1nZXQoJGJyZWFrcG9pbnRzLCBtb2JpbGUpfSkgYW5kIChtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSlcIjtcbiRkZXNrdG9wOiBcIihtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSlcIjtcblxuJHBhZ2VXaWR0aDogI3ttYXAtZ2V0KCRicmVha3BvaW50cywgbW9iaWxlKX07XG4kc2lkZVBhbmVsV2lkdGg6IDMyMHB4OyAvLzM4MHB4O1xuJHRvcFNwYWNpbmc6IDZyZW07XG4kYm9sZFdlaWdodDogNzAwO1xuJHNlbWlCb2xkV2VpZ2h0OiA2MDA7XG4kbm9ybWFsV2VpZ2h0OiA0MDA7XG5cbiRtb2JpbGVHcmlkOiAoXG4gIHRlbXBsYXRlUm93czogXCJhdXRvIGF1dG8gYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcImF1dG9cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnRcIlxcXG4gICAgICBcImdyaWQtaGVhZGVyXCJcXFxuICAgICAgXCJncmlkLWNlbnRlclwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLXJpZ2h0XCJcXFxuICAgICAgXCJncmlkLWZvb3RlclwiJyxcbik7XG4kdGFibGV0R3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG8gYXV0b1wiLFxuICB0ZW1wbGF0ZUNvbHVtbnM6IFwiI3skc2lkZVBhbmVsV2lkdGh9IGF1dG9cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1oZWFkZXJcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtY2VudGVyXCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItbGVmdCBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtZm9vdGVyXCInLFxuKTtcbiRkZXNrdG9wR3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcIiN7JHNpZGVQYW5lbFdpZHRofSBhdXRvICN7JHNpZGVQYW5lbFdpZHRofVwiLFxuICByb3dHYXA6IFwiNXB4XCIsXG4gIGNvbHVtbkdhcDogXCI1cHhcIixcbiAgdGVtcGxhdGVBcmVhczpcbiAgICAnXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWhlYWRlciBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtY2VudGVyIGdyaWQtc2lkZWJhci1yaWdodFwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1mb290ZXIgZ3JpZC1zaWRlYmFyLXJpZ2h0XCInLFxuKTtcbiIsIkB1c2UgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuXG4uZXhwbG9yZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBvdmVyZmxvdy15OiBoaWRkZW47XG4gICYuZGVza3RvcC1vbmx5IHtcbiAgICBAbWVkaWEgYWxsIGFuZCBub3QgKCRtb2JpbGUpIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICB9XG4gIC8qJjphZnRlciB7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgY29udGVudDogXCJcIjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDBweCwgdmFyKC0tbGlnaHQpKTtcbiAgfSovXG59XG5cbmJ1dHRvbiNleHBsb3JlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgY29sb3I6IHZhcigtLWRhcmspO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICYgaDIge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgJiAuZm9sZCB7XG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxuXG4gICYuY29sbGFwc2VkIC5mb2xkIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooLTkwZGVnKTtcbiAgfVxufVxuXG4uZm9sZGVyLW91dGVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAwZnI7XG4gIHRyYW5zaXRpb246IGdyaWQtdGVtcGxhdGUtcm93cyAwLjNzIGVhc2UtaW4tb3V0O1xufVxuXG4uZm9sZGVyLW91dGVyLm9wZW4ge1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmcjtcbn1cblxuLmZvbGRlci1vdXRlciA+IHVsIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuI2V4cGxvcmVyLWNvbnRlbnQge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICB0cmFuc2l0aW9uOlxuICAgIG1heC1oZWlnaHQgMC4zNXMgZWFzZSxcbiAgICB2aXNpYmlsaXR5IDBzIGxpbmVhciAwcztcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuXG4gICYuY29sbGFwc2VkIHtcbiAgICBtYXgtaGVpZ2h0OiAwO1xuICAgIHRyYW5zaXRpb246XG4gICAgICBtYXgtaGVpZ2h0IDAuMzVzIGVhc2UsXG4gICAgICB2aXNpYmlsaXR5IDBzIGxpbmVhciAwLjM1cztcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cblxuICAmIHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIG1hcmdpbjogMC4wOHJlbSAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgdHJhbnNpdGlvbjpcbiAgICAgIG1heC1oZWlnaHQgMC4zNXMgZWFzZSxcbiAgICAgIHRyYW5zZm9ybSAwLjM1cyBlYXNlLFxuICAgICAgb3BhY2l0eSAwLjJzIGVhc2U7XG4gICAgJiBsaSA+IGEge1xuICAgICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgICAgb3BhY2l0eTogMC43NTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XG4gICAgfVxuICB9XG4gID4gI2V4cGxvcmVyLXVsIHtcbiAgICBtYXgtaGVpZ2h0OiBub25lO1xuICB9XG59XG5cbnN2ZyB7XG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cbiAgJiA+IHBvbHlsaW5lIHtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxufVxuXG4uZm9sZGVyLWNvbnRhaW5lciB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuXG4gICYgZGl2ID4gYSB7XG4gICAgY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWhlYWRlckZvbnQpO1xuICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgICBmb250LXdlaWdodDogJHNlbWlCb2xkV2VpZ2h0O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG5cbiAgJiBkaXYgPiBhOmhvdmVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGVydGlhcnkpO1xuICB9XG5cbiAgJiBkaXYgPiBidXR0b24ge1xuICAgIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1oZWFkZXJGb250KTtcblxuICAgICYgc3BhbiB7XG4gICAgICBmb250LXNpemU6IDAuOTVyZW07XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgICAgIGZvbnQtd2VpZ2h0OiAkc2VtaUJvbGRXZWlnaHQ7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBsaW5lLWhlaWdodDogMS41cmVtO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbi5mb2xkZXItaWNvbiB7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG5saTpoYXMoPiAuZm9sZGVyLW91dGVyOm5vdCgub3BlbikpID4gLmZvbGRlci1jb250YWluZXIgPiBzdmcge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xufVxuXG4uZm9sZGVyLWljb246aG92ZXIge1xuICBjb2xvcjogdmFyKC0tdGVydGlhcnkpO1xufVxuXG4ubm8tYmFja2dyb3VuZDo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiBub25lICFpbXBvcnRhbnQ7XG59XG5cbiNleHBsb3Jlci1lbmQge1xuICAvLyBuZWVkcyBoZWlnaHQgc28gSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgZ2V0cyB0cmlnZ2VyZWRcbiAgaGVpZ2h0OiA0cHg7XG4gIC8vIHJlbW92ZSBkZWZhdWx0IG1hcmdpbiBmcm9tIGxpXG4gIG1hcmdpbjogMDtcbn1cbiJdfQ== */`;var explorer_inline_default='var s,p=new IntersectionObserver(e=>{let t=document.getElementById("explorer-ul");if(t)for(let o of e)o.isIntersecting?t.classList.add("no-background"):t.classList.remove("no-background")});function m(){this.classList.toggle("collapsed"),this.setAttribute("aria-expanded",this.getAttribute("aria-expanded")==="true"?"false":"true");let e=this.nextElementSibling;e&&e.classList.toggle("collapsed")}function i(e){e.stopPropagation();let t=e.target;if(!t)return;let o=t.nodeName==="svg",l=o?t.parentElement?.nextSibling:t.parentElement?.parentElement?.nextElementSibling,a=o?t.nextElementSibling:t.parentElement;if(!(l&&a))return;l.classList.toggle("open");let d=l.classList.contains("open");f(l,!d);let n=a.dataset.folderpath;u(s,n);let r=JSON.stringify(s);localStorage.setItem("fileTree",r)}function g(){let e=document.getElementById("explorer");if(!e)return;if(e.dataset.behavior==="collapse")for(let n of document.getElementsByClassName("folder-button"))n.addEventListener("click",i),window.addCleanup(()=>n.removeEventListener("click",i));e.addEventListener("click",m),window.addCleanup(()=>e.removeEventListener("click",m));for(let n of document.getElementsByClassName("folder-icon"))n.addEventListener("click",i),window.addCleanup(()=>n.removeEventListener("click",i));let t=localStorage.getItem("fileTree"),o=e?.dataset.savestate==="true",l=t&&o?JSON.parse(t):[],a=new Map(l.map(n=>[n.path,n.collapsed])),d=e.dataset.tree?JSON.parse(e.dataset.tree):[];s=[];for(let{path:n,collapsed:r}of d)s.push({path:n,collapsed:a.get(n)??r});s.map(n=>{let c=document.querySelector(`[data-folderpath=\'${n.path}\']`)?.parentElement?.nextElementSibling;c&&f(c,n.collapsed)})}window.addEventListener("resize",g);document.addEventListener("nav",()=>{g(),p.disconnect();let e=document.getElementById("explorer-end");e&&p.observe(e)});function f(e,t){return t?e.classList.remove("open"):e.classList.add("open")}function u(e,t){let o=e.find(l=>l.path===t);o&&(o.collapsed=!o.collapsed)}\n';import{Fragment as Fragment5,jsx as jsx20,jsxs as jsxs10}from"preact/jsx-runtime";function getPathSegment(fp,idx){if(fp)return fp.split("/").at(idx)}__name(getPathSegment,"getPathSegment");var FileNode=class _FileNode{static{__name(this,"FileNode")}children;name;displayName;file;depth;constructor(slugSegment,displayName,file,depth){this.children=[],this.name=slugSegment,this.displayName=displayName??file?.frontmatter?.title??slugSegment,this.file=file?clone(file):null,this.depth=depth??0}insert(fileData){if(fileData.path.length===0)return;let nextSegment=fileData.path[0];if(fileData.path.length===1){if(nextSegment===""){let title=fileData.file.frontmatter?.title;title&&title!=="index"&&(this.displayName=title)}else this.children.push(new _FileNode(nextSegment,void 0,fileData.file,this.depth+1));return}fileData.path=fileData.path.splice(1);let child=this.children.find(c=>c.name===nextSegment);if(child){child.insert(fileData);return}let newChild=new _FileNode(nextSegment,getPathSegment(fileData.file.relativePath,this.depth),void 0,this.depth+1);newChild.insert(fileData),this.children.push(newChild)}add(file){this.insert({file,path:simplifySlug(file.slug).split("/")})}filter(filterFn){this.children=this.children.filter(filterFn),this.children.forEach(child=>child.filter(filterFn))}map(mapFn){mapFn(this),this.children.forEach(child=>child.map(mapFn))}getFolderPaths(collapsed){let folderPaths=[],traverse=__name((node,currentPath)=>{if(!node.file){let folderPath=joinSegments(currentPath,node.name);folderPath!==""&&folderPaths.push({path:folderPath,collapsed}),node.children.forEach(child=>traverse(child,folderPath))}},"traverse");return traverse(this,""),folderPaths}sort(sortFn){this.children=this.children.sort(sortFn),this.children.forEach(e=>e.sort(sortFn))}};function ExplorerNode({node,opts,fullPath,fileData}){let folderBehavior=opts.folderClickBehavior,isDefaultOpen=opts.folderDefaultState==="open",folderPath=node.name!==""?joinSegments(fullPath??"",node.name):"",href=resolveRelative(fileData.slug,folderPath)+"/";return jsx20(Fragment5,{children:node.file?jsx20("li",{children:jsx20("a",{href:resolveRelative(fileData.slug,node.file.slug),"data-for":node.file.slug,children:node.displayName})},node.file.slug):jsxs10("li",{children:[node.name!==""&&jsxs10("div",{class:"folder-container",children:[jsx20("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"5 8 14 8",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"folder-icon",children:jsx20("polyline",{points:"6 9 12 15 18 9"})}),jsx20("div",{"data-folderpath":folderPath,children:folderBehavior==="link"?jsx20("a",{href,"data-for":node.name,class:"folder-title",children:node.displayName}):jsx20("button",{class:"folder-button",children:jsx20("span",{class:"folder-title",children:node.displayName})})},node.name)]}),jsx20("div",{class:`folder-outer ${node.depth===0||isDefaultOpen?"open":""}`,children:jsx20("ul",{style:{paddingLeft:node.name!==""?"1.4rem":"0"},class:"content","data-folderul":folderPath,children:node.children.map((childNode,i)=>jsx20(ExplorerNode,{node:childNode,opts,fullPath:folderPath,fileData},i))})})]})})}__name(ExplorerNode,"ExplorerNode");import{jsx as jsx21,jsxs as jsxs11}from"preact/jsx-runtime";var defaultOptions13={folderClickBehavior:"collapse",folderDefaultState:"collapsed",useSavedState:!0,mapFn:node=>node,sortFn:(a,b)=>!a.file&&!b.file||a.file&&b.file?a.displayName.localeCompare(b.displayName,void 0,{numeric:!0,sensitivity:"base"}):a.file&&!b.file?1:-1,filterFn:node=>node.name!=="tags",order:["filter","map","sort"]},Explorer_default=__name(userOpts=>{let opts={...defaultOptions13,...userOpts},fileTree,jsonTree,lastBuildId="";function constructFileTree(allFiles){if(fileTree=new FileNode(""),allFiles.forEach(file=>fileTree.add(file)),opts.order)for(let i=0;i<opts.order.length;i++){let functionName=opts.order[i];functionName==="map"?fileTree.map(opts.mapFn):functionName==="sort"?fileTree.sort(opts.sortFn):functionName==="filter"&&fileTree.filter(opts.filterFn)}let folders=fileTree.getFolderPaths(opts.folderDefaultState==="collapsed");jsonTree=JSON.stringify(folders)}__name(constructFileTree,"constructFileTree");let Explorer=__name(({ctx,cfg,allFiles,displayClass,fileData})=>(ctx.buildId!==lastBuildId&&(lastBuildId=ctx.buildId,constructFileTree(allFiles)),jsxs11("div",{class:classNames(displayClass,"explorer"),children:[jsxs11("button",{type:"button",id:"explorer","data-behavior":opts.folderClickBehavior,"data-collapsed":opts.folderDefaultState,"data-savestate":opts.useSavedState,"data-tree":jsonTree,"aria-controls":"explorer-content","aria-expanded":opts.folderDefaultState==="open",children:[jsx21("h2",{children:opts.title??i18n(cfg.locale).components.explorer.title}),jsx21("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"5 8 14 8",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"fold",children:jsx21("polyline",{points:"6 9 12 15 18 9"})})]}),jsx21("div",{id:"explorer-content",children:jsxs11("ul",{class:"overflow",id:"explorer-ul",children:[jsx21(ExplorerNode,{node:fileTree,opts,fileData}),jsx21("li",{id:"explorer-end"})]})})]})),"Explorer");return Explorer.css=explorer_default,Explorer.afterDOMLoaded=explorer_inline_default,Explorer},"default");import{jsx as jsx22}from"preact/jsx-runtime";var TagList=__name(({fileData,displayClass})=>{let tags=fileData.frontmatter?.tags,baseDir=pathToRoot(fileData.slug);return tags&&tags.length>0?jsx22("ul",{class:classNames(displayClass,"tags"),children:tags.map(tag=>{let linkDest=baseDir+`/tags/${slugTag(tag)}`;return jsx22("li",{children:jsx22("a",{href:linkDest,class:"internal tag-link",children:tag})})})}):null},"TagList");TagList.css=`
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-self: end;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`;var TagList_default=__name(()=>TagList,"default");import{jsx as jsx23,jsxs as jsxs12}from"preact/jsx-runtime";var backlinks_default=`/**
 * Layout breakpoints
 * $mobile: screen width below this value will use mobile styles
 * $desktop: screen width above this value will use desktop styles
 * Screen width between $mobile and $desktop width will use the tablet layout.
 * assuming mobile < desktop
 */
.backlinks {
  flex-direction: column;
  /*&:after {
      pointer-events: none;
      content: "";
      width: 100%;
      height: 50px;
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 1;
      transition: opacity 0.3s ease;
      background: linear-gradient(transparent 0px, var(--light));
    }*/
}
.backlinks > h3 {
  font-size: 1rem;
  margin: 0;
}
.backlinks > ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}
.backlinks > ul > li > a {
  background-color: transparent;
}
.backlinks > .overflow {
  height: auto;
}
.backlinks > .overflow:after {
  display: none;
}
@media all and ((max-width: 1200px)) {
  .backlinks > .overflow {
    height: 250px;
  }
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbIi4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2NzcyIsImJhY2tsaW5rcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FDRUE7RUFDRTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFhQTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBR0U7RUFDRTs7QUFLTjtFQUlFOztBQUhBO0VBQ0U7O0FBR0Y7RUFMRjtJQU1JIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMYXlvdXQgYnJlYWtwb2ludHNcbiAqICRtb2JpbGU6IHNjcmVlbiB3aWR0aCBiZWxvdyB0aGlzIHZhbHVlIHdpbGwgdXNlIG1vYmlsZSBzdHlsZXNcbiAqICRkZXNrdG9wOiBzY3JlZW4gd2lkdGggYWJvdmUgdGhpcyB2YWx1ZSB3aWxsIHVzZSBkZXNrdG9wIHN0eWxlc1xuICogU2NyZWVuIHdpZHRoIGJldHdlZW4gJG1vYmlsZSBhbmQgJGRlc2t0b3Agd2lkdGggd2lsbCB1c2UgdGhlIHRhYmxldCBsYXlvdXQuXG4gKiBhc3N1bWluZyBtb2JpbGUgPCBkZXNrdG9wXG4gKi9cbiRicmVha3BvaW50czogKFxuICBtb2JpbGU6IDgwMHB4LFxuICBkZXNrdG9wOiAxMjAwcHgsXG4pO1xuXG4kbW9iaWxlOiBcIihtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIG1vYmlsZSl9KVwiO1xuJHRhYmxldDogXCIobWluLXdpZHRoOiAje21hcC1nZXQoJGJyZWFrcG9pbnRzLCBtb2JpbGUpfSkgYW5kIChtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSlcIjtcbiRkZXNrdG9wOiBcIihtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSlcIjtcblxuJHBhZ2VXaWR0aDogI3ttYXAtZ2V0KCRicmVha3BvaW50cywgbW9iaWxlKX07XG4kc2lkZVBhbmVsV2lkdGg6IDMyMHB4OyAvLzM4MHB4O1xuJHRvcFNwYWNpbmc6IDZyZW07XG4kYm9sZFdlaWdodDogNzAwO1xuJHNlbWlCb2xkV2VpZ2h0OiA2MDA7XG4kbm9ybWFsV2VpZ2h0OiA0MDA7XG5cbiRtb2JpbGVHcmlkOiAoXG4gIHRlbXBsYXRlUm93czogXCJhdXRvIGF1dG8gYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcImF1dG9cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnRcIlxcXG4gICAgICBcImdyaWQtaGVhZGVyXCJcXFxuICAgICAgXCJncmlkLWNlbnRlclwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLXJpZ2h0XCJcXFxuICAgICAgXCJncmlkLWZvb3RlclwiJyxcbik7XG4kdGFibGV0R3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG8gYXV0b1wiLFxuICB0ZW1wbGF0ZUNvbHVtbnM6IFwiI3skc2lkZVBhbmVsV2lkdGh9IGF1dG9cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1oZWFkZXJcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtY2VudGVyXCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItbGVmdCBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtZm9vdGVyXCInLFxuKTtcbiRkZXNrdG9wR3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcIiN7JHNpZGVQYW5lbFdpZHRofSBhdXRvICN7JHNpZGVQYW5lbFdpZHRofVwiLFxuICByb3dHYXA6IFwiNXB4XCIsXG4gIGNvbHVtbkdhcDogXCI1cHhcIixcbiAgdGVtcGxhdGVBcmVhczpcbiAgICAnXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWhlYWRlciBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtY2VudGVyIGdyaWQtc2lkZWJhci1yaWdodFwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1mb290ZXIgZ3JpZC1zaWRlYmFyLXJpZ2h0XCInLFxuKTtcbiIsIkB1c2UgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuXG4uYmFja2xpbmtzIHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgLyomOmFmdGVyIHtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCAwcHgsIHZhcigtLWxpZ2h0KSk7XG4gICAgfSovXG5cbiAgJiA+IGgzIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgJiA+IHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiAwLjVyZW0gMDtcblxuICAgICYgPiBsaSB7XG4gICAgICAmID4gYSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYgPiAub3ZlcmZsb3cge1xuICAgICY6YWZ0ZXIge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIEBtZWRpYSBhbGwgYW5kICgkZGVza3RvcCkge1xuICAgICAgaGVpZ2h0OiAyNTBweDtcbiAgICB9XG4gIH1cbn1cbiJdfQ== */`;import{jsx as jsx24,jsxs as jsxs13}from"preact/jsx-runtime";var Backlinks=__name(({fileData,allFiles,displayClass,cfg})=>{let slug=simplifySlug(fileData.slug),backlinkFiles=allFiles.filter(file=>file.links?.includes(slug));return jsxs13("div",{class:classNames(displayClass,"backlinks"),children:[jsx24("h3",{children:i18n(cfg.locale).components.backlinks.title}),jsx24("ul",{class:"overflow",children:backlinkFiles.length>0?backlinkFiles.map(f=>jsx24("li",{children:jsx24("a",{href:resolveRelative(fileData.slug,f.slug),class:"internal",children:f.frontmatter?.title})})):jsx24("li",{children:i18n(cfg.locale).components.backlinks.noBacklinksFound})})]})},"Backlinks");Backlinks.css=backlinks_default;var search_default=`/**
 * Layout breakpoints
 * $mobile: screen width below this value will use mobile styles
 * $desktop: screen width above this value will use desktop styles
 * Screen width between $mobile and $desktop width will use the tablet layout.
 * assuming mobile < desktop
 */
.search {
  min-width: fit-content;
  max-width: 14rem;
}
@media all and ((max-width: 800px)) {
  .search {
    flex-grow: 0.3;
  }
}
.search > .search-button {
  background-color: var(--lightgray);
  border: none;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  height: 2rem;
  padding: 0;
  display: flex;
  align-items: center;
  text-align: inherit;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  justify-content: space-between;
}
.search > .search-button > p {
  display: inline;
  padding: 0 1rem;
}
.search > .search-button svg {
  cursor: pointer;
  width: 18px;
  min-width: 18px;
  margin: 0 0.5rem;
}
.search > .search-button svg .search-path {
  stroke: var(--darkgray);
  stroke-width: 2px;
  transition: stroke 0.5s ease;
}
.search > #search-container {
  position: fixed;
  contain: layout;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: none;
  backdrop-filter: blur(4px);
}
.search > #search-container.active {
  display: inline-block;
}
.search > #search-container > #search-space {
  width: 65%;
  margin-top: 12vh;
  margin-left: auto;
  margin-right: auto;
}
@media all and ((max-width: 1200px)) {
  .search > #search-container > #search-space {
    width: 90%;
  }
}
.search > #search-container > #search-space > * {
  width: 100%;
  border-radius: 7px;
  background: var(--light);
  box-shadow: 0 14px 50px rgba(27, 33, 48, 0.12), 0 10px 30px rgba(27, 33, 48, 0.16);
  margin-bottom: 2em;
}
.search > #search-container > #search-space > input {
  box-sizing: border-box;
  padding: 0.5em 1em;
  font-family: var(--bodyFont);
  color: var(--dark);
  font-size: 1.1em;
  border: 1px solid var(--lightgray);
}
.search > #search-container > #search-space > input:focus {
  outline: none;
}
.search > #search-container > #search-space > #search-layout {
  display: none;
  flex-direction: row;
  border: 1px solid var(--lightgray);
  flex: 0 0 100%;
  box-sizing: border-box;
}
.search > #search-container > #search-space > #search-layout.display-results {
  display: flex;
}
.search > #search-container > #search-space > #search-layout[data-preview] > #results-container {
  flex: 0 0 min(30%, 450px);
}
@media all and not ((min-width: 800px) and (max-width: 1200px)) {
  .search > #search-container > #search-space > #search-layout[data-preview] .result-card > p.preview {
    display: none;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > div:first-child {
    border-right: 1px solid var(--lightgray);
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > div:last-child {
    border-top-left-radius: unset;
    border-bottom-left-radius: unset;
  }
}
.search > #search-container > #search-space > #search-layout > div {
  height: 63vh;
  border-radius: 5px;
}
@media all and ((min-width: 800px) and (max-width: 1200px)) {
  .search > #search-container > #search-space > #search-layout > #preview-container {
    display: none !important;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > #results-container {
    width: 100%;
    height: auto;
    flex: 0 0 100%;
  }
}
.search > #search-container > #search-space > #search-layout .highlight {
  background: color-mix(in srgb, var(--tertiary) 60%, rgba(255, 255, 255, 0));
  border-radius: 5px;
  scroll-margin-top: 2rem;
}
.search > #search-container > #search-space > #search-layout > #preview-container {
  display: block;
  overflow: hidden;
  font-family: inherit;
  color: var(--dark);
  line-height: 1.5em;
  font-weight: 400;
  overflow-y: auto;
  padding: 0 2rem;
}
.search > #search-container > #search-space > #search-layout > #preview-container .preview-inner {
  margin: 0 auto;
  width: min(800px, 100%);
}
.search > #search-container > #search-space > #search-layout > #preview-container a[role=anchor] {
  background-color: transparent;
}
.search > #search-container > #search-space > #search-layout > #results-container {
  overflow-y: auto;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card {
  overflow: hidden;
  padding: 1em;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid var(--lightgray);
  width: 100%;
  display: block;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  text-transform: none;
  text-align: left;
  outline: none;
  font-weight: inherit;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card:hover, .search > #search-container > #search-space > #search-layout > #results-container .result-card:focus, .search > #search-container > #search-space > #search-layout > #results-container .result-card.focus {
  background: var(--lightgray);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > h3 {
  margin: 0;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul.tags {
  margin-top: 0.45rem;
  margin-bottom: 0;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul > li > p {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
  line-height: 1.4rem;
  font-weight: 700;
  color: var(--secondary);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul > li > p.match-tag {
  color: var(--tertiary);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > p {
  margin-bottom: 0;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbIi4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2NzcyIsInNlYXJjaC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FDRUE7RUFDRTtFQUNBOztBQUNBO0VBSEY7SUFJSTs7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBOztBQUtOO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBTkY7SUFPSTs7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQSxZQUNFO0VBRUY7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFOztBQUdGO0VBRUk7SUFDRTs7RUFJQTtJQUNFO0lBQ0E7SUFDQTs7RUFHRjtJQUNFO0lBQ0E7OztBQU1SO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0lBQ0U7O0VBR0Y7SUFDRTtJQUNBO0lBQ0E7OztBQUlKO0VBQ0U7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLGFEeklLO0VDMElMO0VBQ0E7O0FBRUE7RUFDRTtFQUNBOztBQUdGO0VBQ0U7O0FBSUo7RUFDRTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBR0U7O0FBR0Y7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsYURyTUQ7RUNzTUM7O0FBRUE7RUFDRTs7QUFJSjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMYXlvdXQgYnJlYWtwb2ludHNcbiAqICRtb2JpbGU6IHNjcmVlbiB3aWR0aCBiZWxvdyB0aGlzIHZhbHVlIHdpbGwgdXNlIG1vYmlsZSBzdHlsZXNcbiAqICRkZXNrdG9wOiBzY3JlZW4gd2lkdGggYWJvdmUgdGhpcyB2YWx1ZSB3aWxsIHVzZSBkZXNrdG9wIHN0eWxlc1xuICogU2NyZWVuIHdpZHRoIGJldHdlZW4gJG1vYmlsZSBhbmQgJGRlc2t0b3Agd2lkdGggd2lsbCB1c2UgdGhlIHRhYmxldCBsYXlvdXQuXG4gKiBhc3N1bWluZyBtb2JpbGUgPCBkZXNrdG9wXG4gKi9cbiRicmVha3BvaW50czogKFxuICBtb2JpbGU6IDgwMHB4LFxuICBkZXNrdG9wOiAxMjAwcHgsXG4pO1xuXG4kbW9iaWxlOiBcIihtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIG1vYmlsZSl9KVwiO1xuJHRhYmxldDogXCIobWluLXdpZHRoOiAje21hcC1nZXQoJGJyZWFrcG9pbnRzLCBtb2JpbGUpfSkgYW5kIChtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSlcIjtcbiRkZXNrdG9wOiBcIihtYXgtd2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSlcIjtcblxuJHBhZ2VXaWR0aDogI3ttYXAtZ2V0KCRicmVha3BvaW50cywgbW9iaWxlKX07XG4kc2lkZVBhbmVsV2lkdGg6IDMyMHB4OyAvLzM4MHB4O1xuJHRvcFNwYWNpbmc6IDZyZW07XG4kYm9sZFdlaWdodDogNzAwO1xuJHNlbWlCb2xkV2VpZ2h0OiA2MDA7XG4kbm9ybWFsV2VpZ2h0OiA0MDA7XG5cbiRtb2JpbGVHcmlkOiAoXG4gIHRlbXBsYXRlUm93czogXCJhdXRvIGF1dG8gYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcImF1dG9cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnRcIlxcXG4gICAgICBcImdyaWQtaGVhZGVyXCJcXFxuICAgICAgXCJncmlkLWNlbnRlclwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLXJpZ2h0XCJcXFxuICAgICAgXCJncmlkLWZvb3RlclwiJyxcbik7XG4kdGFibGV0R3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG8gYXV0b1wiLFxuICB0ZW1wbGF0ZUNvbHVtbnM6IFwiI3skc2lkZVBhbmVsV2lkdGh9IGF1dG9cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1oZWFkZXJcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtY2VudGVyXCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItbGVmdCBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtZm9vdGVyXCInLFxuKTtcbiRkZXNrdG9wR3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcIiN7JHNpZGVQYW5lbFdpZHRofSBhdXRvICN7JHNpZGVQYW5lbFdpZHRofVwiLFxuICByb3dHYXA6IFwiNXB4XCIsXG4gIGNvbHVtbkdhcDogXCI1cHhcIixcbiAgdGVtcGxhdGVBcmVhczpcbiAgICAnXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWhlYWRlciBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtY2VudGVyIGdyaWQtc2lkZWJhci1yaWdodFwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1mb290ZXIgZ3JpZC1zaWRlYmFyLXJpZ2h0XCInLFxuKTtcbiIsIkB1c2UgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuXG4uc2VhcmNoIHtcbiAgbWluLXdpZHRoOiBmaXQtY29udGVudDtcbiAgbWF4LXdpZHRoOiAxNHJlbTtcbiAgQG1lZGlhIGFsbCBhbmQgKCRtb2JpbGUpIHtcbiAgICBmbGV4LWdyb3c6IDAuMztcbiAgfVxuXG4gICYgPiAuc2VhcmNoLWJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHRncmF5KTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgICBoZWlnaHQ6IDJyZW07XG4gICAgcGFkZGluZzogMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgdGV4dC1hbGlnbjogaW5oZXJpdDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cbiAgICAmID4gcCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgfVxuXG4gICAgJiBzdmcge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgd2lkdGg6IDE4cHg7XG4gICAgICBtaW4td2lkdGg6IDE4cHg7XG4gICAgICBtYXJnaW46IDAgMC41cmVtO1xuXG4gICAgICAuc2VhcmNoLXBhdGgge1xuICAgICAgICBzdHJva2U6IHZhcigtLWRhcmtncmF5KTtcbiAgICAgICAgc3Ryb2tlLXdpZHRoOiAycHg7XG4gICAgICAgIHRyYW5zaXRpb246IHN0cm9rZSAwLjVzIGVhc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJiA+ICNzZWFyY2gtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgY29udGFpbjogbGF5b3V0O1xuICAgIHotaW5kZXg6IDk5OTtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDRweCk7XG5cbiAgICAmLmFjdGl2ZSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuXG4gICAgJiA+ICNzZWFyY2gtc3BhY2Uge1xuICAgICAgd2lkdGg6IDY1JTtcbiAgICAgIG1hcmdpbi10b3A6IDEydmg7XG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcblxuICAgICAgQG1lZGlhIGFsbCBhbmQgKCRkZXNrdG9wKSB7XG4gICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICB9XG5cbiAgICAgICYgPiAqIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQpO1xuICAgICAgICBib3gtc2hhZG93OlxuICAgICAgICAgIDAgMTRweCA1MHB4IHJnYmEoMjcsIDMzLCA0OCwgMC4xMiksXG4gICAgICAgICAgMCAxMHB4IDMwcHggcmdiYSgyNywgMzMsIDQ4LCAwLjE2KTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMmVtO1xuICAgICAgfVxuXG4gICAgICAmID4gaW5wdXQge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBwYWRkaW5nOiAwLjVlbSAxZW07XG4gICAgICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1ib2R5Rm9udCk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgICAgICAgZm9udC1zaXplOiAxLjFlbTtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcblxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYgPiAjc2VhcmNoLWxheW91dCB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxpZ2h0Z3JheSk7XG4gICAgICAgIGZsZXg6IDAgMCAxMDAlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgICAgICYuZGlzcGxheS1yZXN1bHRzIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgJltkYXRhLXByZXZpZXddID4gI3Jlc3VsdHMtY29udGFpbmVyIHtcbiAgICAgICAgICBmbGV4OiAwIDAgbWluKDMwJSwgNDUwcHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIGFsbCBhbmQgbm90ICgkdGFibGV0KSB7XG4gICAgICAgICAgJltkYXRhLXByZXZpZXddIHtcbiAgICAgICAgICAgICYgLnJlc3VsdC1jYXJkID4gcC5wcmV2aWV3IHtcbiAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJiA+IGRpdiB7XG4gICAgICAgICAgICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWxpZ2h0Z3JheSk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IHVuc2V0O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiB1bnNldDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdW5zZXQ7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogdW5zZXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmID4gZGl2IHtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGMoNzV2aCAtIDEydmgpO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSBhbGwgYW5kICgkdGFibGV0KSB7XG4gICAgICAgICAgJiA+ICNwcmV2aWV3LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJltkYXRhLXByZXZpZXddID4gI3Jlc3VsdHMtY29udGFpbmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICAgICAgZmxleDogMCAwIDEwMCU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJiAuaGlnaGxpZ2h0IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0tdGVydGlhcnkpIDYwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSk7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAgIHNjcm9sbC1tYXJnaW4tdG9wOiAycmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgJiA+ICNwcmV2aWV3LWNvbnRhaW5lciB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0tZGFyayk7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiAkbm9ybWFsV2VpZ2h0O1xuICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICAgICAgcGFkZGluZzogMCAycmVtO1xuXG4gICAgICAgICAgJiAucHJldmlldy1pbm5lciB7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgIHdpZHRoOiBtaW4oJHBhZ2VXaWR0aCwgMTAwJSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYVtyb2xlPVwiYW5jaG9yXCJdIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYgPiAjcmVzdWx0cy1jb250YWluZXIge1xuICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG5cbiAgICAgICAgICAmIC5yZXN1bHQtY2FyZCB7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzIGVhc2U7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUgY2FyZCBwcm9wc1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgICAgICAgICBmb250LXNpemU6IDEwMCU7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgICBmb250LXdlaWdodDogaW5oZXJpdDtcblxuICAgICAgICAgICAgJjpob3ZlcixcbiAgICAgICAgICAgICY6Zm9jdXMsXG4gICAgICAgICAgICAmLmZvY3VzIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHRncmF5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJiA+IGgzIHtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmID4gdWwudGFncyB7XG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDAuNDVyZW07XG4gICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYgPiB1bCA+IGxpID4gcCB7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGlnaGxpZ2h0KTtcbiAgICAgICAgICAgICAgcGFkZGluZzogMC4ycmVtIDAuNHJlbTtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwIDAuMXJlbTtcbiAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNHJlbTtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6ICRib2xkV2VpZ2h0O1xuICAgICAgICAgICAgICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcblxuICAgICAgICAgICAgICAmLm1hdGNoLXRhZyB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHZhcigtLXRlcnRpYXJ5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmID4gcCB7XG4gICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */`;var search_inline_default='var Kt=Object.create;var Ft=Object.defineProperty;var $t=Object.getOwnPropertyDescriptor;var Gt=Object.getOwnPropertyNames;var Jt=Object.getPrototypeOf,Vt=Object.prototype.hasOwnProperty;var ht=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Zt=(t,e,u,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Gt(e))!Vt.call(t,r)&&r!==u&&Ft(t,r,{get:()=>e[r],enumerable:!(n=$t(e,r))||n.enumerable});return t};var bt=(t,e,u)=>(u=t!=null?Kt(Jt(t)):{},Zt(e||!t||!t.__esModule?Ft(u,"default",{value:t,enumerable:!0}):u,t));var ft=ht(()=>{});var It=ht((Ue,Ot)=>{"use strict";Ot.exports=Ee;function q(t){return t instanceof Buffer?Buffer.from(t):new t.constructor(t.buffer.slice(),t.byteOffset,t.length)}function Ee(t){if(t=t||{},t.circles)return ge(t);let e=new Map;if(e.set(Date,s=>new Date(s)),e.set(Map,(s,l)=>new Map(n(Array.from(s),l))),e.set(Set,(s,l)=>new Set(n(Array.from(s),l))),t.constructorHandlers)for(let s of t.constructorHandlers)e.set(s[0],s[1]);let u=null;return t.proto?i:r;function n(s,l){let o=Object.keys(s),D=new Array(o.length);for(let h=0;h<o.length;h++){let c=o[h],f=s[c];typeof f!="object"||f===null?D[c]=f:f.constructor!==Object&&(u=e.get(f.constructor))?D[c]=u(f,l):ArrayBuffer.isView(f)?D[c]=q(f):D[c]=l(f)}return D}function r(s){if(typeof s!="object"||s===null)return s;if(Array.isArray(s))return n(s,r);if(s.constructor!==Object&&(u=e.get(s.constructor)))return u(s,r);let l={};for(let o in s){if(Object.hasOwnProperty.call(s,o)===!1)continue;let D=s[o];typeof D!="object"||D===null?l[o]=D:D.constructor!==Object&&(u=e.get(D.constructor))?l[o]=u(D,r):ArrayBuffer.isView(D)?l[o]=q(D):l[o]=r(D)}return l}function i(s){if(typeof s!="object"||s===null)return s;if(Array.isArray(s))return n(s,i);if(s.constructor!==Object&&(u=e.get(s.constructor)))return u(s,i);let l={};for(let o in s){let D=s[o];typeof D!="object"||D===null?l[o]=D:D.constructor!==Object&&(u=e.get(D.constructor))?l[o]=u(D,i):ArrayBuffer.isView(D)?l[o]=q(D):l[o]=i(D)}return l}}function ge(t){let e=[],u=[],n=new Map;if(n.set(Date,o=>new Date(o)),n.set(Map,(o,D)=>new Map(i(Array.from(o),D))),n.set(Set,(o,D)=>new Set(i(Array.from(o),D))),t.constructorHandlers)for(let o of t.constructorHandlers)n.set(o[0],o[1]);let r=null;return t.proto?l:s;function i(o,D){let h=Object.keys(o),c=new Array(h.length);for(let f=0;f<h.length;f++){let a=h[f],F=o[a];if(typeof F!="object"||F===null)c[a]=F;else if(F.constructor!==Object&&(r=n.get(F.constructor)))c[a]=r(F,D);else if(ArrayBuffer.isView(F))c[a]=q(F);else{let g=e.indexOf(F);g!==-1?c[a]=u[g]:c[a]=D(F)}}return c}function s(o){if(typeof o!="object"||o===null)return o;if(Array.isArray(o))return i(o,s);if(o.constructor!==Object&&(r=n.get(o.constructor)))return r(o,s);let D={};e.push(o),u.push(D);for(let h in o){if(Object.hasOwnProperty.call(o,h)===!1)continue;let c=o[h];if(typeof c!="object"||c===null)D[h]=c;else if(c.constructor!==Object&&(r=n.get(c.constructor)))D[h]=r(c,s);else if(ArrayBuffer.isView(c))D[h]=q(c);else{let f=e.indexOf(c);f!==-1?D[h]=u[f]:D[h]=s(c)}}return e.pop(),u.pop(),D}function l(o){if(typeof o!="object"||o===null)return o;if(Array.isArray(o))return i(o,l);if(o.constructor!==Object&&(r=n.get(o.constructor)))return r(o,l);let D={};e.push(o),u.push(D);for(let h in o){let c=o[h];if(typeof c!="object"||c===null)D[h]=c;else if(c.constructor!==Object&&(r=n.get(c.constructor)))D[h]=r(c,l);else if(ArrayBuffer.isView(c))D[h]=q(c);else{let f=e.indexOf(c);f!==-1?D[h]=u[f]:D[h]=l(c)}}return e.pop(),u.pop(),D}}});var B;function Y(t){return typeof t<"u"?t:!0}function at(t){let e=Array(t);for(let u=0;u<t;u++)e[u]=p();return e}function p(){return Object.create(null)}function Qt(t,e){return e.length-t.length}function x(t){return typeof t=="string"}function R(t){return typeof t=="object"}function ot(t){return typeof t=="function"}function pt(t,e){var u=Xt;if(t&&(e&&(t=tt(t,e)),this.H&&(t=tt(t,this.H)),this.J&&1<t.length&&(t=tt(t,this.J)),u||u==="")){if(e=t.split(u),this.filter){t=this.filter,u=e.length;let n=[];for(let r=0,i=0;r<u;r++){let s=e[r];s&&!t[s]&&(n[i++]=s)}t=n}else t=e;return t}return t}var Xt=/[\\p{Z}\\p{S}\\p{P}\\p{C}]+/u,Yt=/[\\u0300-\\u036f]/g;function Et(t,e){let u=Object.keys(t),n=u.length,r=[],i="",s=0;for(let l=0,o,D;l<n;l++)o=u[l],(D=t[o])?(r[s++]=y(e?"(?!\\\\b)"+o+"(\\\\b|_)":o),r[s++]=D):i+=(i?"|":"")+o;return i&&(r[s++]=y(e?"(?!\\\\b)("+i+")(\\\\b|_)":"("+i+")"),r[s]=""),r}function tt(t,e){for(let u=0,n=e.length;u<n&&(t=t.replace(e[u],e[u+1]),t);u+=2);return t}function y(t){return new RegExp(t,"g")}function mt(t){let e="",u="";for(let n=0,r=t.length,i;n<r;n++)(i=t[n])!==u&&(e+=u=i);return e}var te={encode:Bt,F:!1,G:""};function Bt(t){return pt.call(this,(""+t).toLowerCase(),!1)}var yt={},U={};function wt(t){K(t,"add"),K(t,"append"),K(t,"search"),K(t,"update"),K(t,"remove")}function K(t,e){t[e+"Async"]=function(){let u=this,n=arguments;var r=n[n.length-1];let i;return ot(r)&&(i=r,delete n[n.length-1]),r=new Promise(function(s){setTimeout(function(){u.async=!0;let l=u[e].apply(u,n);u.async=!1,s(l)})}),i?(r.then(i),this):r}}function xt(t,e,u,n){let r=t.length,i=[],s,l,o=0;n&&(n=[]);for(let D=r-1;0<=D;D--){let h=t[D],c=h.length,f=p(),a=!s;for(let F=0;F<c;F++){let g=h[F],A=g.length;if(A)for(let k=0,v,w;k<A;k++)if(w=g[k],s){if(s[w]){if(!D){if(u)u--;else if(i[o++]=w,o===e)return i}(D||n)&&(f[w]=1),a=!0}if(n&&(v=(l[w]||0)+1,l[w]=v,v<r)){let H=n[v-2]||(n[v-2]=[]);H[H.length]=w}}else f[w]=1}if(n)s||(l=f);else if(!a)return[];s=f}if(n)for(let D=n.length-1,h,c;0<=D;D--){h=n[D],c=h.length;for(let f=0,a;f<c;f++)if(a=h[f],!s[a]){if(u)u--;else if(i[o++]=a,o===e)return i;s[a]=1}}return i}function ee(t,e){let u=p(),n=p(),r=[];for(let i=0;i<t.length;i++)u[t[i]]=1;for(let i=0,s;i<e.length;i++){s=e[i];for(let l=0,o;l<s.length;l++)o=s[l],u[o]&&!n[o]&&(n[o]=1,r[r.length]=o)}return r}function ut(t){this.l=t!==!0&&t,this.cache=p(),this.h=[]}function vt(t,e,u){R(t)&&(t=t.query);let n=this.cache.get(t);return n||(n=this.search(t,e,u),this.cache.set(t,n)),n}ut.prototype.set=function(t,e){if(!this.cache[t]){var u=this.h.length;for(u===this.l?delete this.cache[this.h[u-1]]:u++,--u;0<u;u--)this.h[u]=this.h[u-1];this.h[0]=t}this.cache[t]=e};ut.prototype.get=function(t){let e=this.cache[t];if(this.l&&e&&(t=this.h.indexOf(t))){let u=this.h[t-1];this.h[t-1]=this.h[t],this.h[t]=u}return e};var ue={memory:{charset:"latin:extra",D:3,B:4,m:!1},performance:{D:3,B:3,s:!1,context:{depth:2,D:1}},match:{charset:"latin:extra",G:"reverse"},score:{charset:"latin:advanced",D:20,B:3,context:{depth:3,D:9}},default:{}};function Lt(t,e,u,n,r,i,s,l){setTimeout(function(){let o=t(u?u+"."+n:n,JSON.stringify(s));o&&o.then?o.then(function(){e.export(t,e,u,r,i+1,l)}):e.export(t,e,u,r,i+1,l)})}function P(t,e){if(!(this instanceof P))return new P(t);var u;if(t){x(t)?t=ue[t]:(u=t.preset)&&(t=Object.assign({},u[u],t)),u=t.charset;var n=t.lang;x(u)&&(u.indexOf(":")===-1&&(u+=":default"),u=U[u]),x(n)&&(n=yt[n])}else t={};let r,i,s=t.context||{};if(this.encode=t.encode||u&&u.encode||Bt,this.register=e||p(),this.D=r=t.resolution||9,this.G=e=u&&u.G||t.tokenize||"strict",this.depth=e==="strict"&&s.depth,this.l=Y(s.bidirectional),this.s=i=Y(t.optimize),this.m=Y(t.fastupdate),this.B=t.minlength||1,this.C=t.boost,this.map=i?at(r):p(),this.A=r=s.resolution||1,this.h=i?at(r):p(),this.F=u&&u.F||t.rtl,this.H=(e=t.matcher||n&&n.H)&&Et(e,!1),this.J=(e=t.stemmer||n&&n.J)&&Et(e,!0),u=e=t.filter||n&&n.filter){u=e,n=p();for(let l=0,o=u.length;l<o;l++)n[u[l]]=1;u=n}this.filter=u,this.cache=(e=t.cache)&&new ut(e)}B=P.prototype;B.append=function(t,e){return this.add(t,e,!0)};B.add=function(t,e,u,n){if(e&&(t||t===0)){if(!n&&!u&&this.register[t])return this.update(t,e);if(e=this.encode(e),n=e.length){let D=p(),h=p(),c=this.depth,f=this.D;for(let a=0;a<n;a++){let F=e[this.F?n-1-a:a];var r=F.length;if(F&&r>=this.B&&(c||!h[F])){var i=Q(f,n,a),s="";switch(this.G){case"full":if(2<r){for(i=0;i<r;i++)for(var l=r;l>i;l--)if(l-i>=this.B){var o=Q(f,n,a,r,i);s=F.substring(i,l),$(this,h,s,o,t,u)}break}case"reverse":if(1<r){for(l=r-1;0<l;l--)s=F[l]+s,s.length>=this.B&&$(this,h,s,Q(f,n,a,r,l),t,u);s=""}case"forward":if(1<r){for(l=0;l<r;l++)s+=F[l],s.length>=this.B&&$(this,h,s,i,t,u);break}default:if(this.C&&(i=Math.min(i/this.C(e,F,a)|0,f-1)),$(this,h,F,i,t,u),c&&1<n&&a<n-1){for(r=p(),s=this.A,i=F,l=Math.min(c+1,n-a),r[i]=1,o=1;o<l;o++)if((F=e[this.F?n-1-a-o:a+o])&&F.length>=this.B&&!r[F]){r[F]=1;let g=this.l&&F>i;$(this,D,g?i:F,Q(s+(n/2>s?0:1),n,a,l-1,o-1),t,u,g?F:i)}}}}}this.m||(this.register[t]=1)}}return this};function Q(t,e,u,n,r){return u&&1<t?e+(n||0)<=t?u+(r||0):(t-1)/(e+(n||0))*(u+(r||0))+1|0:0}function $(t,e,u,n,r,i,s){let l=s?t.h:t.map;(!e[u]||s&&!e[u][s])&&(t.s&&(l=l[n]),s?(e=e[u]||(e[u]=p()),e[s]=1,l=l[s]||(l[s]=p())):e[u]=1,l=l[u]||(l[u]=[]),t.s||(l=l[n]||(l[n]=[])),i&&l.includes(r)||(l[l.length]=r,t.m&&(t=t.register[r]||(t.register[r]=[]),t[t.length]=l)))}B.search=function(t,e,u){u||(!e&&R(t)?(u=t,t=u.query):R(e)&&(u=e));let n=[],r,i,s=0;if(u){t=u.query||t,e=u.limit,s=u.offset||0;var l=u.context;i=u.suggest}if(t&&(t=this.encode(""+t),r=t.length,1<r)){u=p();var o=[];for(let h=0,c=0,f;h<r;h++)if((f=t[h])&&f.length>=this.B&&!u[f])if(this.s||i||this.map[f])o[c++]=f,u[f]=1;else return n;t=o,r=t.length}if(!r)return n;e||(e=100),l=this.depth&&1<r&&l!==!1,u=0;let D;l?(D=t[0],u=1):1<r&&t.sort(Qt);for(let h,c;u<r;u++){if(c=t[u],l?(h=gt(this,n,i,e,s,r===2,c,D),i&&h===!1&&n.length||(D=c)):h=gt(this,n,i,e,s,r===1,c),h)return h;if(i&&u===r-1){if(o=n.length,!o){if(l){l=0,u=-1;continue}return n}if(o===1)return St(n[0],e,s)}}return xt(n,e,s,i)};function gt(t,e,u,n,r,i,s,l){let o=[],D=l?t.h:t.map;if(t.s||(D=dt(D,s,l,t.l)),D){let h=0,c=Math.min(D.length,l?t.A:t.D);for(let f=0,a=0,F,g;f<c&&!((F=D[f])&&(t.s&&(F=dt(F,s,l,t.l)),r&&F&&i&&(g=F.length,g<=r?(r-=g,F=null):(F=F.slice(r),r=0)),F&&(o[h++]=F,i&&(a+=F.length,a>=n))));f++);if(h){if(i)return St(o,n,0);e[e.length]=o;return}}return!u&&o}function St(t,e,u){return t=t.length===1?t[0]:[].concat.apply([],t),u||t.length>e?t.slice(u,u+e):t}function dt(t,e,u,n){return u?(n=n&&e>u,t=(t=t[n?e:u])&&t[n?u:e]):t=t[e],t}B.contain=function(t){return!!this.register[t]};B.update=function(t,e){return this.remove(t).add(t,e)};B.remove=function(t,e){let u=this.register[t];if(u){if(this.m)for(let n=0,r;n<u.length;n++)r=u[n],r.splice(r.indexOf(t),1);else et(this.map,t,this.D,this.s),this.depth&&et(this.h,t,this.A,this.s);if(e||delete this.register[t],this.cache){e=this.cache;for(let n=0,r,i;n<e.h.length;n++)i=e.h[n],r=e.cache[i],r.includes(t)&&(e.h.splice(n--,1),delete e.cache[i])}}return this};function et(t,e,u,n,r){let i=0;if(t.constructor===Array)if(r)e=t.indexOf(e),e!==-1?1<t.length&&(t.splice(e,1),i++):i++;else{r=Math.min(t.length,u);for(let s=0,l;s<r;s++)(l=t[s])&&(i=et(l,e,u,n,r),n||i||delete t[s])}else for(let s in t)(i=et(t[s],e,u,n,r))||delete t[s];return i}B.searchCache=vt;B.export=function(t,e,u,n,r,i){let s=!0;typeof i>"u"&&(s=new Promise(D=>{i=D}));let l,o;switch(r||(r=0)){case 0:if(l="reg",this.m){o=p();for(let D in this.register)o[D]=1}else o=this.register;break;case 1:l="cfg",o={doc:0,opt:this.s?1:0};break;case 2:l="map",o=this.map;break;case 3:l="ctx",o=this.h;break;default:typeof u>"u"&&i&&i();return}return Lt(t,e||this,u,l,n,r,o,i),s};B.import=function(t,e){if(e)switch(x(e)&&(e=JSON.parse(e)),t){case"cfg":this.s=!!e.opt;break;case"reg":this.m=!1,this.register=e;break;case"map":this.map=e;break;case"ctx":this.h=e}};wt(P.prototype);function ne(t){t=t.data;var e=self._index;let u=t.args;var n=t.task;switch(n){case"init":n=t.options||{},t=t.factory,e=n.encode,n.cache=!1,e&&e.indexOf("function")===0&&(n.encode=Function("return "+e)()),t?(Function("return "+t)()(self),self._index=new self.FlexSearch.Index(n),delete self.FlexSearch):self._index=new P(n);break;default:t=t.id,e=e[n].apply(e,u),postMessage(n==="search"?{id:t,msg:e}:{id:t})}}var Ct=0;function N(t){if(!(this instanceof N))return new N(t);var e;t?ot(e=t.encode)&&(t.encode=e.toString()):t={},(e=(self||window)._factory)&&(e=e.toString());let u=typeof window>"u"&&self.exports,n=this;this.o=re(e,u,t.worker),this.h=p(),this.o&&(u?this.o.on("message",function(r){n.h[r.id](r.msg),delete n.h[r.id]}):this.o.onmessage=function(r){r=r.data,n.h[r.id](r.msg),delete n.h[r.id]},this.o.postMessage({task:"init",factory:e,options:t}))}J("add");J("append");J("search");J("update");J("remove");function J(t){N.prototype[t]=N.prototype[t+"Async"]=function(){let e=this,u=[].slice.call(arguments);var n=u[u.length-1];let r;return ot(n)&&(r=n,u.splice(u.length-1,1)),n=new Promise(function(i){setTimeout(function(){e.h[++Ct]=i,e.o.postMessage({task:t,id:Ct,args:u})})}),r?(n.then(r),this):n}}function re(t,e,u){let n;try{n=e?new(ft()).Worker(__dirname+"/node/node.js"):t?new Worker(URL.createObjectURL(new Blob(["onmessage="+ne.toString()],{type:"text/javascript"}))):new Worker(x(u)?u:"worker/worker.js",{type:"module"})}catch{}return n}function G(t){if(!(this instanceof G))return new G(t);var e=t.document||t.doc||t,u;this.K=[],this.h=[],this.A=[],this.register=p(),this.key=(u=e.key||e.id)&&X(u,this.A)||"id",this.m=Y(t.fastupdate),this.C=(u=e.store)&&u!==!0&&[],this.store=u&&p(),this.I=(u=e.tag)&&X(u,this.A),this.l=u&&p(),this.cache=(u=t.cache)&&new ut(u),t.cache=!1,this.o=t.worker,this.async=!1,u=p();let n=e.index||e.field||e;x(n)&&(n=[n]);for(let r=0,i,s;r<n.length;r++)i=n[r],x(i)||(s=i,i=i.field),s=R(s)?Object.assign({},t,s):t,this.o&&(u[i]=new N(s),u[i].o||(this.o=!1)),this.o||(u[i]=new P(s,this.register)),this.K[r]=X(i,this.A),this.h[r]=i;if(this.C)for(t=e.store,x(t)&&(t=[t]),e=0;e<t.length;e++)this.C[e]=X(t[e],this.A);this.index=u}function X(t,e){let u=t.split(":"),n=0;for(let r=0;r<u.length;r++)t=u[r],0<=t.indexOf("[]")&&(t=t.substring(0,t.length-2))&&(e[n]=!0),t&&(u[n++]=t);return n<u.length&&(u.length=n),1<n?u:u[0]}function it(t,e){if(x(e))t=t[e];else for(let u=0;t&&u<e.length;u++)t=t[e[u]];return t}function st(t,e,u,n,r){if(t=t[r],n===u.length-1)e[r]=t;else if(t)if(t.constructor===Array)for(e=e[r]=Array(t.length),r=0;r<t.length;r++)st(t,e,u,n,r);else e=e[r]||(e[r]=p()),r=u[++n],st(t,e,u,n,r)}function lt(t,e,u,n,r,i,s,l){if(t=t[s])if(n===e.length-1){if(t.constructor===Array){if(u[n]){for(e=0;e<t.length;e++)r.add(i,t[e],!0,!0);return}t=t.join(" ")}r.add(i,t,l,!0)}else if(t.constructor===Array)for(s=0;s<t.length;s++)lt(t,e,u,n,r,i,s,l);else s=e[++n],lt(t,e,u,n,r,i,s,l)}B=G.prototype;B.add=function(t,e,u){if(R(t)&&(e=t,t=it(e,this.key)),e&&(t||t===0)){if(!u&&this.register[t])return this.update(t,e);for(let n=0,r,i;n<this.h.length;n++)i=this.h[n],r=this.K[n],x(r)&&(r=[r]),lt(e,r,this.A,0,this.index[i],t,r[0],u);if(this.I){let n=it(e,this.I),r=p();x(n)&&(n=[n]);for(let i=0,s,l;i<n.length;i++)if(s=n[i],!r[s]&&(r[s]=1,l=this.l[s]||(this.l[s]=[]),!u||!l.includes(t))&&(l[l.length]=t,this.m)){let o=this.register[t]||(this.register[t]=[]);o[o.length]=l}}if(this.store&&(!u||!this.store[t])){let n;if(this.C){n=p();for(let r=0,i;r<this.C.length;r++)i=this.C[r],x(i)?n[i]=e[i]:st(e,n,i,0,i[0])}this.store[t]=n||e}}return this};B.append=function(t,e){return this.add(t,e,!0)};B.update=function(t,e){return this.remove(t).add(t,e)};B.remove=function(t){if(R(t)&&(t=it(t,this.key)),this.register[t]){for(var e=0;e<this.h.length&&(this.index[this.h[e]].remove(t,!this.o),!this.m);e++);if(this.I&&!this.m)for(let u in this.l){e=this.l[u];let n=e.indexOf(t);n!==-1&&(1<e.length?e.splice(n,1):delete this.l[u])}this.store&&delete this.store[t],delete this.register[t]}return this};B.search=function(t,e,u,n){u||(!e&&R(t)?(u=t,t=""):R(e)&&(u=e,e=0));let r=[],i=[],s,l,o,D,h,c,f=0;if(u)if(u.constructor===Array)o=u,u=null;else{if(t=u.query||t,o=(s=u.pluck)||u.index||u.field,D=u.tag,l=this.store&&u.enrich,h=u.bool==="and",e=u.limit||e||100,c=u.offset||0,D&&(x(D)&&(D=[D]),!t)){for(let F=0,g;F<D.length;F++)(g=ie.call(this,D[F],e,c,l))&&(r[r.length]=g,f++);return f?r:[]}x(o)&&(o=[o])}o||(o=this.h),h=h&&(1<o.length||D&&1<D.length);let a=!n&&(this.o||this.async)&&[];for(let F=0,g,A,k;F<o.length;F++){let v;if(A=o[F],x(A)||(v=A,A=v.field,t=v.query||t,e=v.limit||e,l=v.enrich||l),a)a[F]=this.index[A].searchAsync(t,e,v||u);else{if(n?g=n[F]:g=this.index[A].search(t,e,v||u),k=g&&g.length,D&&k){let w=[],H=0;h&&(w[0]=[g]);for(let _=0,b,z;_<D.length;_++)b=D[_],(k=(z=this.l[b])&&z.length)&&(H++,w[w.length]=h?[z]:z);H&&(g=h?xt(w,e||100,c||0):ee(g,w),k=g.length)}if(k)i[f]=A,r[f++]=g;else if(h)return[]}}if(a){let F=this;return new Promise(function(g){Promise.all(a).then(function(A){g(F.search(t,e,u,A))})})}if(!f)return[];if(s&&(!l||!this.store))return r[0];for(let F=0,g;F<i.length;F++){if(g=r[F],g.length&&l&&(g=kt.call(this,g)),s)return g;r[F]={field:i[F],result:g}}return r};function ie(t,e,u,n){let r=this.l[t],i=r&&r.length-u;if(i&&0<i)return(i>e||u)&&(r=r.slice(u,u+e)),n&&(r=kt.call(this,r)),{tag:t,result:r}}function kt(t){let e=Array(t.length);for(let u=0,n;u<t.length;u++)n=t[u],e[u]={id:n,doc:this.store[n]};return e}B.contain=function(t){return!!this.register[t]};B.get=function(t){return this.store[t]};B.set=function(t,e){return this.store[t]=e,this};B.searchCache=vt;B.export=function(t,e,u,n,r,i){let s;if(typeof i>"u"&&(s=new Promise(l=>{i=l})),r||(r=0),n||(n=0),n<this.h.length){let l=this.h[n],o=this.index[l];e=this,setTimeout(function(){o.export(t,e,r?l:"",n,r++,i)||(n++,r=1,e.export(t,e,l,n,r,i))})}else{let l,o;switch(r){case 1:l="tag",o=this.l,u=null;break;case 2:l="store",o=this.store,u=null;break;default:i();return}Lt(t,this,u,l,n,r,o,i)}return s};B.import=function(t,e){if(e)switch(x(e)&&(e=JSON.parse(e)),t){case"tag":this.l=e;break;case"reg":this.m=!1,this.register=e;for(let n=0,r;n<this.h.length;n++)r=this.index[this.h[n]],r.register=e,r.m=!1;break;case"store":this.store=e;break;default:t=t.split(".");let u=t[0];t=t[1],u&&t&&this.index[u].import(t,e)}};wt(G.prototype);var se={encode:Tt,F:!1,G:""},le=[y("[\\xE0\\xE1\\xE2\\xE3\\xE4\\xE5]"),"a",y("[\\xE8\\xE9\\xEA\\xEB]"),"e",y("[\\xEC\\xED\\xEE\\xEF]"),"i",y("[\\xF2\\xF3\\xF4\\xF5\\xF6\\u0151]"),"o",y("[\\xF9\\xFA\\xFB\\xFC\\u0171]"),"u",y("[\\xFD\\u0177\\xFF]"),"y",y("\\xF1"),"n",y("[\\xE7c]"),"k",y("\\xDF"),"s",y(" & ")," and "];function Tt(t){var e=t=""+t;return e.normalize&&(e=e.normalize("NFD").replace(Yt,"")),pt.call(this,e.toLowerCase(),!t.normalize&&le)}var oe={encode:Mt,F:!1,G:"strict"},De=/[^a-z0-9]+/,At={b:"p",v:"f",w:"f",z:"s",x:"s",\\u00DF:"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function Mt(t){t=Tt.call(this,t).join(" ");let e=[];if(t){let u=t.split(De),n=u.length;for(let r=0,i,s=0;r<n;r++)if((t=u[r])&&(!this.filter||!this.filter[t])){i=t[0];let l=At[i]||i,o=l;for(let D=1;D<t.length;D++){i=t[D];let h=At[i]||i;h&&h!==o&&(l+=h,o=h)}e[s++]=l}}return e}var ce={encode:Ht,F:!1,G:""},Fe=[y("ae"),"a",y("oe"),"o",y("sh"),"s",y("th"),"t",y("ph"),"f",y("pf"),"f",y("(?![aeo])h(?![aeo])"),"",y("(?!^[aeo])h(?!^[aeo])"),""];function Ht(t,e){return t&&(t=Mt.call(this,t).join(" "),2<t.length&&(t=tt(t,Fe)),e||(1<t.length&&(t=mt(t)),t&&(t=t.split(" ")))),t||[]}var he={encode:ae,F:!1,G:""},fe=y("(?!\\\\b)[aeo]");function ae(t){return t&&(t=Ht.call(this,t,!0),1<t.length&&(t=t.replace(fe,"")),1<t.length&&(t=mt(t)),t&&(t=t.split(" "))),t||[]}U["latin:default"]=te;U["latin:simple"]=se;U["latin:balance"]=oe;U["latin:advanced"]=ce;U["latin:extra"]=he;var Rt={Index:P,Document:G,Worker:N,registerCharset:function(t,e){U[t]=e},registerLanguage:function(t,e){yt[t]=e}};function jt(t,e){if(!t)return;function u(r){r.target===this&&(r.preventDefault(),r.stopPropagation(),e())}function n(r){r.key.startsWith("Esc")&&(r.preventDefault(),e())}t?.addEventListener("click",u),window.addCleanup(()=>t?.removeEventListener("click",u)),document.addEventListener("keydown",n),window.addCleanup(()=>document.removeEventListener("keydown",n))}function V(t){for(;t.firstChild;)t.removeChild(t.firstChild)}var Ie=Object.hasOwnProperty;var Ut=bt(It(),1),Ne=(0,Ut.default)();function de(t){let e=Be(me(t,"index"),!0);return e.length===0?"/":e}var Pt=(t,e,u)=>{let n=new URL(t.getAttribute(e),u);t.setAttribute(e,n.pathname+n.hash)};function zt(t,e){t.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(u=>Pt(u,"href",e)),t.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(u=>Pt(u,"src",e))}function Ce(t){let e=t.split("/").filter(u=>u!=="").slice(0,-1).map(u=>"..").join("/");return e.length===0&&(e="."),e}function Wt(t,e){return Ae(Ce(t),de(e))}function Ae(...t){return t.filter(e=>e!=="").join("/").replace(/\\/\\/+/g,"/")}function pe(t,e){return t===e||t.endsWith("/"+e)}function me(t,e){return pe(t,e)&&(t=t.slice(0,-e.length)),t}function Be(t,e){return t.startsWith("/")&&(t=t.substring(1)),!e&&t.endsWith("/")&&(t=t.slice(0,-1)),t}var j="basic",S="",ye=t=>t.toLowerCase().split(/([^a-z]|[^\\x00-\\x7F])/),Z=new Rt.Document({charset:"latin:extra",encode:ye,document:{id:"id",tag:"tags",index:[{field:"title",tokenize:"forward"},{field:"content",tokenize:"forward"},{field:"tags",tokenize:"forward"}]}}),we=new DOMParser,Dt=new Map,nt=30,rt=8,xe=5,qt=t=>{let e=t.split(/\\s+/).filter(n=>n.trim()!==""),u=e.length;if(u>1)for(let n=1;n<u;n++)e.push(e.slice(0,n+1).join(" "));return e.sort((n,r)=>r.length-n.length)};function Nt(t,e,u){let n=qt(t),r=e.split(/\\s+/).filter(o=>o!==""),i=0,s=r.length-1;if(u){let o=f=>n.some(a=>f.toLowerCase().startsWith(a.toLowerCase())),D=r.map(o),h=0,c=0;for(let f=0;f<Math.max(r.length-nt,0);f++){let F=D.slice(f,f+nt).reduce((g,A)=>g+(A?1:0),0);F>=h&&(h=F,c=f)}i=Math.max(c-nt,0),s=Math.min(i+2*nt,r.length-1),r=r.slice(i,s)}let l=r.map(o=>{for(let D of n)if(o.toLowerCase().includes(D.toLowerCase())){let h=new RegExp(D.toLowerCase(),"gi");return o.replace(h,\'<span class="highlight">$&</span>\')}return o}).join(" ");return`${i===0?"":"..."}${l}${s===r.length-1?"":"..."}`}function ve(t,e){let u=new DOMParser,n=qt(t),r=u.parseFromString(e.innerHTML,"text/html"),i=l=>{let o=document.createElement("span");return o.className="highlight",o.textContent=l,o},s=(l,o)=>{if(l.nodeType===Node.TEXT_NODE){let D=l.nodeValue??"",h=new RegExp(o.toLowerCase(),"gi"),c=D.match(h);if(!c||c.length===0)return;let f=document.createElement("span"),a=0;for(let F of c){let g=D.indexOf(F,a);f.appendChild(document.createTextNode(D.slice(a,g))),f.appendChild(i(F)),a=g+F.length}f.appendChild(document.createTextNode(D.slice(a))),l.parentNode?.replaceChild(f,l)}else if(l.nodeType===Node.ELEMENT_NODE){if(l.classList.contains("highlight"))return;Array.from(l.childNodes).forEach(D=>s(D,o))}};for(let l of n)s(r.body,l);return r.body}document.addEventListener("nav",async t=>{let e=t.detail.url,u=await fetchData,n=document.getElementById("search-container"),r=n?.closest(".sidebar"),i=document.getElementById("search-button"),s=document.getElementById("search-bar"),l=document.getElementById("search-layout"),o=Object.keys(u),D=E=>{l?.querySelector(`#${E.id}`)===null&&l?.appendChild(E)},h=l?.dataset?.preview==="true",c,f,a=document.createElement("div");a.id="results-container",D(a),h&&(c=document.createElement("div"),c.id="preview-container",D(c));function F(){n?.classList.remove("active"),s&&(s.value=""),r&&(r.style.zIndex="unset"),a&&V(a),c&&V(c),l&&l.classList.remove("display-results"),j="basic",i?.focus()}function g(E){j=E,r&&(r.style.zIndex="1"),n?.classList.add("active"),s?.focus()}let A=null;async function k(E){if(E.key==="k"&&(E.ctrlKey||E.metaKey)&&!E.shiftKey){E.preventDefault(),n?.classList.contains("active")?F():g("basic");return}else if(E.shiftKey&&(E.ctrlKey||E.metaKey)&&E.key.toLowerCase()==="k"){E.preventDefault(),n?.classList.contains("active")?F():g("tags"),s&&(s.value="#");return}if(A&&A.classList.remove("focus"),!!n?.classList.contains("active")){if(E.key==="Enter")if(a?.contains(document.activeElement)){let d=document.activeElement;if(d.classList.contains("no-match"))return;await W(d),d.click()}else{let d=document.getElementsByClassName("result-card")[0];if(!d||d?.classList.contains("no-match"))return;await W(d),d.click()}else if(E.key==="ArrowUp"||E.shiftKey&&E.key==="Tab"){if(E.preventDefault(),a?.contains(document.activeElement)){let d=A||document.activeElement,C=d?.previousElementSibling;d?.classList.remove("focus"),C?.focus(),C&&(A=C),await W(C)}}else if((E.key==="ArrowDown"||E.key==="Tab")&&(E.preventDefault(),document.activeElement===s||A!==null)){let d=A||document.getElementsByClassName("result-card")[0],C=d?.nextElementSibling;d?.classList.remove("focus"),C?.focus(),C&&(A=C),await W(C)}}}let v=(E,d)=>{let C=o[d];return{id:d,slug:C,title:j==="tags"?u[C].title:Nt(E,u[C].title??""),content:Nt(E,u[C].content??"",!0),tags:w(E.substring(1),u[C].tags)}};function w(E,d){return!d||j!=="tags"?[]:d.map(C=>C.toLowerCase().includes(E.toLowerCase())?`<li><p class="match-tag">#${C}</p></li>`:`<li><p>#${C}</p></li>`).slice(0,xe)}function H(E){return new URL(Wt(e,E),location.toString())}let _=({slug:E,title:d,content:C,tags:M})=>{let T=M.length>0?`<ul class="tags">${M.join("")}</ul>`:"",m=document.createElement("a");m.classList.add("result-card"),m.id=E,m.href=H(E).toString(),m.innerHTML=`<h3>${d}</h3>${T}${h&&window.innerWidth>600?"":`<p>${C}</p>`}`,m.addEventListener("click",L=>{L.altKey||L.ctrlKey||L.metaKey||L.shiftKey||F()});let O=L=>{L.altKey||L.ctrlKey||L.metaKey||L.shiftKey||F()};async function I(L){if(!L.target)return;let _t=L.target;await W(_t)}return m.addEventListener("mouseenter",I),window.addCleanup(()=>m.removeEventListener("mouseenter",I)),m.addEventListener("click",O),window.addCleanup(()=>m.removeEventListener("click",O)),m};async function b(E){if(a)if(V(a),E.length===0?a.innerHTML=`<a class="result-card no-match">\n          <h3>No results.</h3>\n          <p>Try another search term?</p>\n      </a>`:a.append(...E.map(_)),E.length===0&&c)V(c);else{let d=a.firstElementChild;d.classList.add("focus"),A=d,await W(d)}}async function z(E){if(Dt.has(E))return Dt.get(E);let d=H(E).toString(),C=await fetch(d).then(M=>M.text()).then(M=>{if(M===void 0)throw new Error(`Could not fetch ${d}`);let T=we.parseFromString(M??"","text/html");return zt(T,d),[...T.getElementsByClassName("popover-hint")]});return Dt.set(E,C),C}async function W(E){if(!l||!h||!E||!c)return;let d=E.id,C=await z(d).then(T=>T.flatMap(m=>[...ve(S,m).children]));f=document.createElement("div"),f.classList.add("preview-inner"),f.append(...C),c.replaceChildren(f),[...c.querySelectorAll(".highlight")].sort((T,m)=>m.innerHTML.length-T.innerHTML.length)[0]?.scrollIntoView({block:"start"})}async function ct(E){if(!l||!Z)return;S=E.target.value,l.classList.toggle("display-results",S!==""),j=S.startsWith("#")?"tags":"basic";let d;if(j==="tags"){S=S.substring(1).trim();let m=S.indexOf(" ");if(m!=-1){let O=S.substring(0,m),I=S.substring(m+1).trim();d=await Z.searchAsync({query:I,limit:Math.max(rt,1e4),index:["title","content"],tag:O});for(let L of d)L.result=L.result.slice(0,rt);j="basic",S=I}else d=await Z.searchAsync({query:S,limit:rt,index:["tags"]})}else j==="basic"&&(d=await Z.searchAsync({query:S,limit:rt,index:["title","content"]}));let C=m=>{let O=d.filter(I=>I.field===m);return O.length===0?[]:[...O[0].result]},T=[...new Set([...C("title"),...C("content"),...C("tags")])].map(m=>v(S,m));await b(T)}document.addEventListener("keydown",k),window.addCleanup(()=>document.removeEventListener("keydown",k)),i?.addEventListener("click",()=>g("basic")),window.addCleanup(()=>i?.removeEventListener("click",()=>g("basic"))),s?.addEventListener("input",ct),window.addCleanup(()=>s?.removeEventListener("input",ct)),jt(n,F),await Le(u)});async function Le(t){let e=0,u=[];for(let[n,r]of Object.entries(t))u.push(Z.addAsync(e++,{id:e,slug:n,title:r.title,content:r.content,tags:r.tags}));return await Promise.all(u)}\n';import{jsx as jsx25,jsxs as jsxs14}from"preact/jsx-runtime";var defaultOptions14={enablePreview:!0},Search_default=__name(userOpts=>{let Search=__name(({displayClass,cfg})=>{let opts={...defaultOptions14,...userOpts},searchPlaceholder=i18n(cfg.locale).components.search.searchBarPlaceholder;return jsxs14("div",{class:classNames(displayClass,"search"),children:[jsxs14("button",{class:"search-button",id:"search-button",children:[jsx25("p",{children:i18n(cfg.locale).components.search.title}),jsxs14("svg",{role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19.9 19.7",children:[jsx25("title",{children:"Search"}),jsxs14("g",{class:"search-path",fill:"none",children:[jsx25("path",{"stroke-linecap":"square",d:"M18.5 18.3l-5.4-5.4"}),jsx25("circle",{cx:"8",cy:"8",r:"7"})]})]})]}),jsx25("div",{id:"search-container",children:jsxs14("div",{id:"search-space",children:[jsx25("input",{autocomplete:"off",id:"search-bar",name:"search",type:"text","aria-label":searchPlaceholder,placeholder:searchPlaceholder}),jsx25("div",{id:"search-layout","data-preview":opts.enablePreview})]})})]})},"Search");return Search.afterDOMLoaded=search_inline_default,Search.css=search_default,Search},"default");var footer_default=`footer {
  text-align: left;
  margin-bottom: 4rem;
  opacity: 0.7;
}
footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: -1rem;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbImZvb3Rlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJmb290ZXIge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBtYXJnaW4tYm90dG9tOiA0cmVtO1xuICBvcGFjaXR5OiAwLjc7XG5cbiAgJiB1bCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZ2FwOiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IC0xcmVtO1xuICB9XG59XG4iXX0= */`;import{jsx as jsx26,jsxs as jsxs15}from"preact/jsx-runtime";var Footer_default=__name(opts=>{let Footer=__name(({displayClass,cfg})=>{let year=new Date().getFullYear(),links=opts?.links??[];return jsxs15("footer",{class:`${displayClass??""}`,children:[jsx26("hr",{}),jsx26("ul",{children:Object.entries(links).map(([text,link])=>jsx26("li",{children:jsx26("a",{href:link,children:text})}))})]})},"Footer");return Footer.css=footer_default,Footer},"default");import{Fragment as Fragment6,jsx as jsx27}from"preact/jsx-runtime";var DesktopOnly_default=__name(component=>{if(component){let Component=component,DesktopOnly=__name(props=>jsx27(Component,{displayClass:"desktop-only",...props}),"DesktopOnly");return DesktopOnly.displayName=component.displayName,DesktopOnly.afterDOMLoaded=component?.afterDOMLoaded,DesktopOnly.beforeDOMLoaded=component?.beforeDOMLoaded,DesktopOnly.css=component?.css,DesktopOnly}else return()=>jsx27(Fragment6,{})},"default");import{Fragment as Fragment7,jsx as jsx28}from"preact/jsx-runtime";var MobileOnly_default=__name(component=>{if(component){let Component=component,MobileOnly=__name(props=>jsx28(Component,{displayClass:"mobile-only",...props}),"MobileOnly");return MobileOnly.displayName=component.displayName,MobileOnly.afterDOMLoaded=component?.afterDOMLoaded,MobileOnly.beforeDOMLoaded=component?.beforeDOMLoaded,MobileOnly.css=component?.css,MobileOnly}else return()=>jsx28(Fragment7,{})},"default");import{jsx as jsx29,jsxs as jsxs16}from"preact/jsx-runtime";var breadcrumbs_default=`.breadcrumb-container {
  margin: 0;
  margin-top: 0.75rem;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.breadcrumb-element {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.breadcrumb-element p {
  margin: 0;
  margin-left: 0.5rem;
  padding: 0;
  line-height: normal;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbImJyZWFkY3J1bWJzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7RUFPRTtFQUNBO0VBQ0E7RUFDQTs7QUFUQTtFQUNFO0VBQ0E7RUFDQTtFQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLmJyZWFkY3J1bWItY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xuICBtYXJnaW4tdG9wOiAwLjc1cmVtO1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMC41cmVtO1xufVxuXG4uYnJlYWRjcnVtYi1lbGVtZW50IHtcbiAgcCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG4gICAgcGFkZGluZzogMDtcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICB9XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuIl19 */`;import{Fragment as Fragment8,jsx as jsx30,jsxs as jsxs17}from"preact/jsx-runtime";var defaultOptions15={spacerSymbol:"\u276F",rootName:"Home",resolveFrontmatterTitle:!0,hideOnRoot:!0,showCurrentPage:!0};function formatCrumb(displayName,baseSlug,currentSlug){return{displayName:displayName.replaceAll("-"," "),path:resolveRelative(baseSlug,currentSlug)}}__name(formatCrumb,"formatCrumb");var Breadcrumbs_default=__name(opts=>{let options2={...defaultOptions15,...opts},folderIndex,Breadcrumbs=__name(({fileData,allFiles,displayClass})=>{if(options2.hideOnRoot&&fileData.slug==="index")return jsx30(Fragment8,{});let crumbs=[formatCrumb(options2.rootName,fileData.slug,"/")];if(!folderIndex&&options2.resolveFrontmatterTitle){folderIndex=new Map;for(let file of allFiles){let folderParts=file.slug?.split("/");folderParts?.at(-1)==="index"&&folderIndex.set(folderParts.slice(0,-1).join("/"),file)}}let slugParts=fileData.slug?.split("/");if(slugParts){let isTagPath=slugParts[0]==="tags",currentPath="";for(let i=0;i<slugParts.length-1;i++){let curPathSegment=slugParts[i],currentFile=folderIndex?.get(slugParts.slice(0,i+1).join("/"));if(currentFile){let title=currentFile.frontmatter.title;title!=="index"&&(curPathSegment=title)}currentPath=joinSegments(currentPath,slugParts[i]);let includeTrailingSlash=!isTagPath||i<1,crumb=formatCrumb(curPathSegment,fileData.slug,currentPath+(includeTrailingSlash?"/":""));crumbs.push(crumb)}options2.showCurrentPage&&slugParts.at(-1)!=="index"&&crumbs.push({displayName:fileData.frontmatter.title,path:""})}return jsx30("nav",{class:classNames(displayClass,"breadcrumb-container"),"aria-label":"breadcrumbs",children:crumbs.map((crumb,index)=>jsxs17("div",{class:"breadcrumb-element",children:[jsx30("a",{href:crumb.path,children:crumb.displayName}),index!==crumbs.length-1&&jsx30("p",{children:` ${options2.spacerSymbol} `})]}))})},"Breadcrumbs");return Breadcrumbs.css=breadcrumbs_default,Breadcrumbs},"default");import{jsx as jsx31}from"preact/jsx-runtime";var sharedPageComponents={head:Head_default(),header:[],afterBody:[],footer:Footer_default({links:{GitHub:"https://github.com/DefenderOfBasic/notebook","Open Research Institute":"https://openresearchinstitute.org/"}})},defaultContentPageLayout={beforeBody:[Breadcrumbs_default(),ArticleTitle_default(),ContentMeta_default(),TagList_default()],left:[PageTitle_default(),MobileOnly_default(Spacer_default()),Search_default(),Darkmode_default(),DesktopOnly_default(Explorer_default())],right:[DesktopOnly_default(TableOfContents_default())]},defaultListPageLayout={beforeBody:[Breadcrumbs_default(),ArticleTitle_default(),ContentMeta_default()],left:[PageTitle_default(),MobileOnly_default(Spacer_default()),Search_default(),Darkmode_default(),DesktopOnly_default(Explorer_default())],right:[]};import chalk4 from"chalk";import path6 from"path";import fs2 from"fs";var write=__name(async({ctx,slug,ext,content})=>{let pathToPage=joinSegments(ctx.argv.output,slug+ext),dir=path6.dirname(pathToPage);return await fs2.promises.mkdir(dir,{recursive:!0}),await fs2.promises.writeFile(pathToPage,content),pathToPage},"write");var DepGraph=class{static{__name(this,"DepGraph")}_graph=new Map;constructor(){this._graph=new Map}export(){return{nodes:this.nodes,edges:this.edges}}toString(){return JSON.stringify(this.export(),null,2)}get nodes(){return Array.from(this._graph.keys())}get edges(){let edges=[];return this.forEachEdge(edge=>edges.push(edge)),edges}hasNode(node){return this._graph.has(node)}addNode(node){this._graph.has(node)||this._graph.set(node,{incoming:new Set,outgoing:new Set})}removeNode(node){if(this._graph.has(node)){for(let target of this._graph.get(node).outgoing)this.removeEdge(node,target);for(let source of this._graph.get(node).incoming)this.removeEdge(source,node);this._graph.delete(node)}}forEachNode(callback){for(let node of this._graph.keys())callback(node)}hasEdge(from,to){return!!this._graph.get(from)?.outgoing.has(to)}addEdge(from,to){this.addNode(from),this.addNode(to),this._graph.get(from).outgoing.add(to),this._graph.get(to).incoming.add(from)}removeEdge(from,to){this._graph.has(from)&&this._graph.has(to)&&(this._graph.get(from).outgoing.delete(to),this._graph.get(to).incoming.delete(from))}outDegree(node){return this.hasNode(node)?this._graph.get(node).outgoing.size:-1}inDegree(node){return this.hasNode(node)?this._graph.get(node).incoming.size:-1}forEachOutNeighbor(node,callback){this._graph.get(node)?.outgoing.forEach(callback)}forEachInNeighbor(node,callback){this._graph.get(node)?.incoming.forEach(callback)}forEachEdge(callback){for(let[source,{outgoing}]of this._graph.entries())for(let target of outgoing)callback([source,target])}mergeGraph(other){other.forEachEdge(([source,target])=>{this.addNode(source),this.addNode(target),this.addEdge(source,target)})}updateIncomingEdgesForNode(other,node){this.addNode(node),other.forEachInNeighbor(node,neighbor=>{this.addEdge(neighbor,node)}),this.forEachEdge(([source,target])=>{target===node&&!other.hasEdge(source,target)&&this.removeEdge(source,target)})}removeOrphanNodes(){let orphanNodes=new Set;return this.forEachNode(node=>{this.inDegree(node)===0&&this.outDegree(node)===0&&orphanNodes.add(node)}),orphanNodes.forEach(node=>{this.removeNode(node)}),orphanNodes}getLeafNodes(node){let stack=[node],visited=new Set,leafNodes=new Set;for(;stack.length>0;){let node2=stack.pop();visited.has(node2)||(visited.add(node2),this.outDegree(node2)===0&&leafNodes.add(node2),this.forEachOutNeighbor(node2,neighbor=>{visited.has(neighbor)||stack.push(neighbor)}))}return leafNodes}getLeafNodeAncestors(node){let leafNodes=this.getLeafNodes(node),visited=new Set,upstreamNodes=new Set;return leafNodes.forEach(leafNode=>{let stack=[leafNode];for(;stack.length>0;){let node2=stack.pop();visited.has(node2)||(visited.add(node2),this.outDegree(node2)!==0&&upstreamNodes.add(node2),this.forEachInNeighbor(node2,parentNode=>{visited.has(parentNode)||stack.push(parentNode)}))}}),upstreamNodes}};var parseDependencies=__name((argv,hast,file)=>{let dependencies=[];return visit7(hast,"element",elem=>{let ref=null;if(["script","img","audio","video","source","iframe"].includes(elem.tagName)&&elem?.properties?.src?ref=elem.properties.src.toString():["a","link"].includes(elem.tagName)&&elem?.properties?.href&&(ref=elem.properties.href.toString()),ref===null||!isRelativeURL(ref))return;let fp=path7.join(file.data.filePath,path7.relative(argv.directory,ref)).replace(/\\/g,"/");fp.split("/").pop()?.includes(".")||(fp+=".md"),dependencies.push(fp)}),dependencies},"parseDependencies"),ContentPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultContentPageLayout,pageBody:Content_default(),...userOpts},{head:Head,header,beforeBody,pageBody,afterBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"ContentPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...afterBody,...left,...right,Footer]},async getDependencyGraph(ctx,content,_resources){let graph=new DepGraph;for(let[tree,file]of content){let sourcePath=file.data.filePath,slug=file.data.slug;graph.addEdge(sourcePath,joinSegments(ctx.argv.output,slug+".html")),parseDependencies(ctx.argv,tree,file).forEach(dep=>{graph.addEdge(dep,sourcePath)})}return graph},async emit(ctx,content,resources){let cfg=ctx.cfg.configuration,fps=[],allFiles=content.map(c=>c[1].data),containsIndex=!1;for(let[tree,file]of content){let slug=file.data.slug;slug==="index"&&(containsIndex=!0);let externalResources=pageResources(pathToRoot(slug),resources),componentData={ctx,fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(cfg,slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug,ext:".html"});fps.push(fp)}return!containsIndex&&!ctx.argv.fastRebuild&&console.log(chalk4.yellow(`
Warning: you seem to be missing an \`index.md\` home page file at the root of your \`${ctx.argv.directory}\` folder. This may cause errors when deploying.`)),fps}}},"ContentPage");import{VFile}from"vfile";function defaultProcessedContent(vfileData){let root={type:"root",children:[]},vfile=new VFile("");return vfile.data=vfileData,[root,vfile]}__name(defaultProcessedContent,"defaultProcessedContent");var TagPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultListPageLayout,pageBody:TagContent_default({sort:userOpts?.sort}),...userOpts},{head:Head,header,beforeBody,pageBody,afterBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"TagPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...afterBody,...left,...right,Footer]},async getDependencyGraph(ctx,content,_resources){let graph=new DepGraph;for(let[_tree,file]of content){let sourcePath=file.data.filePath,tags=(file.data.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes);tags.length>0&&tags.push("index");for(let tag of tags)graph.addEdge(sourcePath,joinSegments(ctx.argv.output,"tags",tag+".html"))}return graph},async emit(ctx,content,resources){let fps=[],allFiles=content.map(c=>c[1].data),cfg=ctx.cfg.configuration,tags=new Set(allFiles.flatMap(data=>data.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes));tags.add("index");let tagDescriptions=Object.fromEntries([...tags].map(tag=>{let title=tag==="index"?i18n(cfg.locale).pages.tagContent.tagIndex:`${i18n(cfg.locale).pages.tagContent.tag}: ${tag}`;return[tag,defaultProcessedContent({slug:joinSegments("tags",tag),frontmatter:{title,tags:[]}})]}));for(let[tree,file]of content){let slug=file.data.slug;if(slug.startsWith("tags/")){let tag=slug.slice(5);tags.has(tag)&&(tagDescriptions[tag]=[tree,file])}}for(let tag of tags){let slug=joinSegments("tags",tag),externalResources=pageResources(pathToRoot(slug),resources),[tree,file]=tagDescriptions[tag],componentData={ctx,fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(cfg,slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug:file.data.slug,ext:".html"});fps.push(fp)}return fps}}},"TagPage");import path8 from"path";var FolderPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultListPageLayout,pageBody:FolderContent_default({sort:userOpts?.sort}),...userOpts},{head:Head,header,beforeBody,pageBody,afterBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"FolderPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...afterBody,...left,...right,Footer]},async getDependencyGraph(_ctx,content,_resources){let graph=new DepGraph;return content.map(([_tree,vfile])=>{let slug=vfile.data.slug,folderName=path8.dirname(slug??"");slug&&folderName!=="."&&folderName!=="tags"&&graph.addEdge(vfile.data.filePath,joinSegments(folderName,"index.html"))}),graph},async emit(ctx,content,resources){let fps=[],allFiles=content.map(c=>c[1].data),cfg=ctx.cfg.configuration,folders=new Set(allFiles.flatMap(data=>{let slug=data.slug,folderName=path8.dirname(slug??"");return slug&&folderName!=="."&&folderName!=="tags"?[folderName]:[]})),folderDescriptions=Object.fromEntries([...folders].map(folder=>[folder,defaultProcessedContent({slug:joinSegments(folder,"index"),frontmatter:{title:`${i18n(cfg.locale).pages.folderContent.folder}: ${folder}`,tags:[]}})]));for(let[tree,file]of content){let slug=stripSlashes(simplifySlug(file.data.slug));folders.has(slug)&&(folderDescriptions[slug]=[tree,file])}for(let folder of folders){let slug=joinSegments(folder,"index"),externalResources=pageResources(pathToRoot(slug),resources),[tree,file]=folderDescriptions[folder],componentData={ctx,fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(cfg,slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug,ext:".html"});fps.push(fp)}return fps}}},"FolderPage");import{toHtml as toHtml2}from"hast-util-to-html";var defaultOptions16={enableSiteMap:!0,enableRSS:!0,rssLimit:10,rssFullHtml:!1,includeEmptyFiles:!0};function generateSiteMap(cfg,idx){let base=cfg.baseUrl??"",createURLEntry=__name((slug,content)=>`<url>
    <loc>https://${joinSegments(base,encodeURI(slug))}</loc>
    ${content.date&&`<lastmod>${content.date.toISOString()}</lastmod>`}
  </url>`,"createURLEntry");return`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${Array.from(idx).map(([slug,content])=>createURLEntry(simplifySlug(slug),content)).join("")}</urlset>`}__name(generateSiteMap,"generateSiteMap");function generateRSSFeed(cfg,idx,limit){let base=cfg.baseUrl??"",createURLEntry=__name((slug,content)=>`<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base,encodeURI(slug))}</link>
    <guid>https://${joinSegments(base,encodeURI(slug))}</guid>
    <description>${content.richContent??content.description}</description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`,"createURLEntry"),items=Array.from(idx).sort(([_,f1],[__,f2])=>f1.date&&f2.date?f2.date.getTime()-f1.date.getTime():f1.date&&!f2.date?-1:!f1.date&&f2.date?1:f1.title.localeCompare(f2.title)).map(([slug,content])=>createURLEntry(simplifySlug(slug),content)).slice(0,limit??idx.size).join("");return`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${limit?i18n(cfg.locale).pages.rss.lastFewNotes({count:limit}):i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(cfg.pageTitle)}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`}__name(generateRSSFeed,"generateRSSFeed");var ContentIndex=__name(opts=>(opts={...defaultOptions16,...opts},{name:"ContentIndex",async getDependencyGraph(ctx,content,_resources){let graph=new DepGraph;for(let[_tree,file]of content){let sourcePath=file.data.filePath;graph.addEdge(sourcePath,joinSegments(ctx.argv.output,"static/contentIndex.json")),opts?.enableSiteMap&&graph.addEdge(sourcePath,joinSegments(ctx.argv.output,"sitemap.xml")),opts?.enableRSS&&graph.addEdge(sourcePath,joinSegments(ctx.argv.output,"index.xml"))}return graph},async emit(ctx,content,_resources){let cfg=ctx.cfg.configuration,emitted=[],linkIndex=new Map;for(let[tree,file]of content){let slug=file.data.slug,date=getDate(ctx.cfg.configuration,file.data)??new Date;(opts?.includeEmptyFiles||file.data.text&&file.data.text!=="")&&linkIndex.set(slug,{title:file.data.frontmatter?.title,links:file.data.links??[],tags:file.data.frontmatter?.tags??[],content:file.data.text??"",richContent:opts?.rssFullHtml?escapeHTML(toHtml2(tree,{allowDangerousHtml:!0})):void 0,date,description:file.data.description??""})}opts?.enableSiteMap&&emitted.push(await write({ctx,content:generateSiteMap(cfg,linkIndex),slug:"sitemap",ext:".xml"})),opts?.enableRSS&&emitted.push(await write({ctx,content:generateRSSFeed(cfg,linkIndex,opts.rssLimit),slug:"index",ext:".xml"}));let fp=joinSegments("static","contentIndex"),simplifiedIndex=Object.fromEntries(Array.from(linkIndex).map(([slug,content2])=>(delete content2.description,delete content2.date,[slug,content2])));return emitted.push(await write({ctx,content:JSON.stringify(simplifiedIndex),slug:fp,ext:".json"})),emitted},getQuartzComponents:()=>[]}),"ContentIndex");import path9 from"path";var AliasRedirects=__name(()=>({name:"AliasRedirects",getQuartzComponents(){return[]},async getDependencyGraph(ctx,content,_resources){let graph=new DepGraph,{argv}=ctx;for(let[_tree,file]of content){let dir=path9.posix.relative(argv.directory,path9.dirname(file.data.filePath)),slugs=(file.data.frontmatter?.aliases??[]).map(alias=>path9.posix.join(dir,alias)),permalink=file.data.frontmatter?.permalink;typeof permalink=="string"&&slugs.push(permalink);for(let slug of slugs)slug.endsWith("/")&&(slug=joinSegments(slug,"index")),graph.addEdge(file.data.filePath,joinSegments(argv.output,slug+".html"))}return graph},async emit(ctx,content,_resources){let{argv}=ctx,fps=[];for(let[_tree,file]of content){let ogSlug=simplifySlug(file.data.slug),dir=path9.posix.relative(argv.directory,path9.dirname(file.data.filePath)),slugs=(file.data.frontmatter?.aliases??[]).map(alias=>path9.posix.join(dir,alias)),permalink=file.data.frontmatter?.permalink;typeof permalink=="string"&&slugs.push(permalink);for(let slug of slugs){slug.endsWith("/")&&(slug=joinSegments(slug,"index"));let redirUrl=resolveRelative(slug,file.data.slug),fp=await write({ctx,content:`
            <!DOCTYPE html>
            <html lang="en-us">
            <head>
            <title>${ogSlug}</title>
            <link rel="canonical" href="${redirUrl}">
            <meta name="robots" content="noindex">
            <meta charset="utf-8">
            <meta http-equiv="refresh" content="0; url=${redirUrl}">
            </head>
            </html>
            `,slug,ext:".html"});fps.push(fp)}}return fps}}),"AliasRedirects");import path11 from"path";import fs3 from"fs";import path10 from"path";import{globby}from"globby";function toPosixPath(fp){return fp.split(path10.sep).join("/")}__name(toPosixPath,"toPosixPath");async function glob(pattern,cwd,ignorePatterns){return(await globby(pattern,{cwd,ignore:ignorePatterns,gitignore:!0})).map(toPosixPath)}__name(glob,"glob");var filesToCopy=__name(async(argv,cfg)=>await glob("**",argv.directory,["**/*.md",...cfg.configuration.ignorePatterns]),"filesToCopy"),Assets=__name(()=>({name:"Assets",getQuartzComponents(){return[]},async getDependencyGraph(ctx,_content,_resources){let{argv,cfg}=ctx,graph=new DepGraph,fps=await filesToCopy(argv,cfg);for(let fp of fps){let ext=path11.extname(fp),src=joinSegments(argv.directory,fp),name=slugifyFilePath(fp,!0)+ext,dest=joinSegments(argv.output,name);graph.addEdge(src,dest)}return graph},async emit({argv,cfg},_content,_resources){let assetsPath=argv.output,fps=await filesToCopy(argv,cfg),res=[];for(let fp of fps){let ext=path11.extname(fp),src=joinSegments(argv.directory,fp),name=slugifyFilePath(fp,!0)+ext,dest=joinSegments(assetsPath,name),dir=path11.dirname(dest);await fs3.promises.mkdir(dir,{recursive:!0}),await fs3.promises.copyFile(src,dest),res.push(dest)}return res}}),"Assets");import fs4 from"fs";var Static=__name(()=>({name:"Static",getQuartzComponents(){return[]},async getDependencyGraph({argv,cfg},_content,_resources){let graph=new DepGraph,staticPath=joinSegments(QUARTZ,"static"),fps=await glob("**",staticPath,cfg.configuration.ignorePatterns);for(let fp of fps)graph.addEdge(joinSegments("static",fp),joinSegments(argv.output,"static",fp));return graph},async emit({argv,cfg},_content,_resources){let staticPath=joinSegments(QUARTZ,"static"),fps=await glob("**",staticPath,cfg.configuration.ignorePatterns);return await fs4.promises.cp(staticPath,joinSegments(argv.output,"static"),{recursive:!0,dereference:!0}),fps.map(fp=>joinSegments(argv.output,"static",fp))}}),"Static");var spa_inline_default='var $=Object.create;var R=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var _=(u,e)=>()=>(e||u((e={exports:{}}).exports,e),e.exports);var q=(u,e,t,D)=>{if(e&&typeof e=="object"||typeof e=="function")for(let F of W(e))!V.call(u,F)&&F!==t&&R(u,F,{get:()=>e[F],enumerable:!(D=H(e,F))||D.enumerable});return u};var z=(u,e,t)=>(t=u!=null?$(I(u)):{},q(e||!u||!u.__esModule?R(t,"default",{value:u,enumerable:!0}):t,u));var O=_((Cu,j)=>{"use strict";j.exports=X;function f(u){return u instanceof Buffer?Buffer.from(u):new u.constructor(u.buffer.slice(),u.byteOffset,u.length)}function X(u){if(u=u||{},u.circles)return uu(u);let e=new Map;if(e.set(Date,n=>new Date(n)),e.set(Map,(n,o)=>new Map(D(Array.from(n),o))),e.set(Set,(n,o)=>new Set(D(Array.from(n),o))),u.constructorHandlers)for(let n of u.constructorHandlers)e.set(n[0],n[1]);let t=null;return u.proto?l:F;function D(n,o){let r=Object.keys(n),i=new Array(r.length);for(let a=0;a<r.length;a++){let s=r[a],c=n[s];typeof c!="object"||c===null?i[s]=c:c.constructor!==Object&&(t=e.get(c.constructor))?i[s]=t(c,o):ArrayBuffer.isView(c)?i[s]=f(c):i[s]=o(c)}return i}function F(n){if(typeof n!="object"||n===null)return n;if(Array.isArray(n))return D(n,F);if(n.constructor!==Object&&(t=e.get(n.constructor)))return t(n,F);let o={};for(let r in n){if(Object.hasOwnProperty.call(n,r)===!1)continue;let i=n[r];typeof i!="object"||i===null?o[r]=i:i.constructor!==Object&&(t=e.get(i.constructor))?o[r]=t(i,F):ArrayBuffer.isView(i)?o[r]=f(i):o[r]=F(i)}return o}function l(n){if(typeof n!="object"||n===null)return n;if(Array.isArray(n))return D(n,l);if(n.constructor!==Object&&(t=e.get(n.constructor)))return t(n,l);let o={};for(let r in n){let i=n[r];typeof i!="object"||i===null?o[r]=i:i.constructor!==Object&&(t=e.get(i.constructor))?o[r]=t(i,l):ArrayBuffer.isView(i)?o[r]=f(i):o[r]=l(i)}return o}}function uu(u){let e=[],t=[],D=new Map;if(D.set(Date,r=>new Date(r)),D.set(Map,(r,i)=>new Map(l(Array.from(r),i))),D.set(Set,(r,i)=>new Set(l(Array.from(r),i))),u.constructorHandlers)for(let r of u.constructorHandlers)D.set(r[0],r[1]);let F=null;return u.proto?o:n;function l(r,i){let a=Object.keys(r),s=new Array(a.length);for(let c=0;c<a.length;c++){let A=a[c],E=r[A];if(typeof E!="object"||E===null)s[A]=E;else if(E.constructor!==Object&&(F=D.get(E.constructor)))s[A]=F(E,i);else if(ArrayBuffer.isView(E))s[A]=f(E);else{let v=e.indexOf(E);v!==-1?s[A]=t[v]:s[A]=i(E)}}return s}function n(r){if(typeof r!="object"||r===null)return r;if(Array.isArray(r))return l(r,n);if(r.constructor!==Object&&(F=D.get(r.constructor)))return F(r,n);let i={};e.push(r),t.push(i);for(let a in r){if(Object.hasOwnProperty.call(r,a)===!1)continue;let s=r[a];if(typeof s!="object"||s===null)i[a]=s;else if(s.constructor!==Object&&(F=D.get(s.constructor)))i[a]=F(s,n);else if(ArrayBuffer.isView(s))i[a]=f(s);else{let c=e.indexOf(s);c!==-1?i[a]=t[c]:i[a]=n(s)}}return e.pop(),t.pop(),i}function o(r){if(typeof r!="object"||r===null)return r;if(Array.isArray(r))return l(r,o);if(r.constructor!==Object&&(F=D.get(r.constructor)))return F(r,o);let i={};e.push(r),t.push(i);for(let a in r){let s=r[a];if(typeof s!="object"||s===null)i[a]=s;else if(s.constructor!==Object&&(F=D.get(s.constructor)))i[a]=F(s,o);else if(ArrayBuffer.isView(s))i[a]=f(s);else{let c=e.indexOf(s);c!==-1?i[a]=t[c]:i[a]=o(s)}}return e.pop(),t.pop(),i}}});var m=u=>(e,t)=>e[`node${u}`]===t[`node${u}`],K=m("Name"),Z=m("Type"),Q=m("Value");function L(u,e){if(u.attributes.length===0&&e.attributes.length===0)return[];let t=[],D=new Map,F=new Map;for(let l of u.attributes)D.set(l.name,l.value);for(let l of e.attributes){let n=D.get(l.name);l.value===n?D.delete(l.name):(typeof n<"u"&&D.delete(l.name),F.set(l.name,l.value))}for(let l of D.keys())t.push({type:5,name:l});for(let[l,n]of F.entries())t.push({type:4,name:l,value:n});return t}function h(u,e=!0){let t=`${u.localName}`;for(let{name:D,value:F}of u.attributes)e&&D.startsWith("data-")||(t+=`[${D}=${F}]`);return t+=u.innerHTML,t}function g(u){switch(u.tagName){case"BASE":case"TITLE":return u.localName;case"META":{if(u.hasAttribute("name"))return`meta[name="${u.getAttribute("name")}"]`;if(u.hasAttribute("property"))return`meta[name="${u.getAttribute("property")}"]`;break}case"LINK":{if(u.hasAttribute("rel")&&u.hasAttribute("href"))return`link[rel="${u.getAttribute("rel")}"][href="${u.getAttribute("href")}"]`;if(u.hasAttribute("href"))return`link[href="${u.getAttribute("href")}"]`;break}}return h(u)}function Y(u){let[e,t=""]=u.split("?");return`${e}?t=${Date.now()}&${t.replace(/t=\\d+/g,"")}`}function C(u){if(u.nodeType===1&&u.hasAttribute("data-persist"))return u;if(u.nodeType===1&&u.localName==="script"){let e=document.createElement("script");for(let{name:t,value:D}of u.attributes)t==="src"&&(D=Y(D)),e.setAttribute(t,D);return e.innerHTML=u.innerHTML,e}return u.cloneNode(!0)}function G(u,e){if(u.children.length===0&&e.children.length===0)return[];let t=[],D=new Map,F=new Map,l=new Map;for(let n of u.children)D.set(g(n),n);for(let n of e.children){let o=g(n),r=D.get(o);r?h(n,!1)!==h(r,!1)&&F.set(o,C(n)):l.set(o,C(n)),D.delete(o)}for(let n of u.childNodes){if(n.nodeType===1){let o=g(n);if(D.has(o)){t.push({type:1});continue}else if(F.has(o)){let r=F.get(o);t.push({type:3,attributes:L(n,r),children:T(n,r)});continue}}t.push(void 0)}for(let n of l.values())t.push({type:0,node:C(n)});return t}function T(u,e){let t=[],D=Math.max(u.childNodes.length,e.childNodes.length);for(let F=0;F<D;F++){let l=u.childNodes.item(F),n=e.childNodes.item(F);t[F]=d(l,n)}return t}function d(u,e){if(!u)return{type:0,node:C(e)};if(!e)return{type:1};if(Z(u,e)){if(u.nodeType===3){let t=u.nodeValue,D=e.nodeValue;if(t.trim().length===0&&D.trim().length===0)return}if(u.nodeType===1){if(K(u,e)){let t=u.tagName==="HEAD"?G:T;return{type:3,attributes:L(u,e),children:t(u,e)}}return{type:2,node:C(e)}}else return u.nodeType===9?d(u.documentElement,e.documentElement):Q(u,e)?void 0:{type:2,value:e.nodeValue}}return{type:2,node:C(e)}}function J(u,e){if(e.length!==0)for(let{type:t,name:D,value:F}of e)t===5?u.removeAttribute(D):t===4&&u.setAttribute(D,F)}async function y(u,e,t){if(!e)return;let D;switch(u.nodeType===9?(u=u.documentElement,D=u):t?D=t:D=u,e.type){case 0:{let{node:F}=e;u.appendChild(F);return}case 1:{if(!D)return;u.removeChild(D);return}case 2:{if(!D)return;let{node:F,value:l}=e;if(typeof l=="string"){D.nodeValue=l;return}D.replaceWith(F);return}case 3:{if(!D)return;let{attributes:F,children:l}=e;J(D,F);let n=Array.from(D.childNodes);await Promise.all(l.map((o,r)=>y(D,o,n[r])));return}}}function w(u,e){let t=d(u,e);return y(u,t)}var Eu=Object.hasOwnProperty;var k=z(O(),1),du=(0,k.default)();function b(u){return u.document.body.dataset.slug}var U=(u,e,t)=>{let D=new URL(u.getAttribute(e),t);u.setAttribute(e,D.pathname+D.hash)};function N(u,e){u.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(t=>U(t,"href",e)),u.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(t=>U(t,"src",e))}var eu=1,B=document.createElement("route-announcer"),tu=u=>u?.nodeType===eu,Du=u=>{try{let e=new URL(u);if(window.location.origin===e.origin)return!0}catch{}return!1},nu=u=>{let e=u.origin===window.location.origin,t=u.pathname===window.location.pathname;return e&&t},P=({target:u})=>{if(!tu(u)||u.attributes.getNamedItem("target")?.value==="_blank")return;let e=u.closest("a");if(!e||"routerIgnore"in e.dataset)return;let{href:t}=e;if(Du(t))return{url:new URL(t),scroll:"routerNoscroll"in e.dataset?!1:void 0}};function M(u){let e=new CustomEvent("nav",{detail:{url:u}});document.dispatchEvent(e)}var x=new Set;window.addCleanup=u=>x.add(u);var S;async function p(u,e=!1){S=S||new DOMParser;let t=await fetch(`${u}`).then(o=>{if(o.headers.get("content-type")?.startsWith("text/html"))return o.text();window.location.assign(u)}).catch(()=>{window.location.assign(u)});if(!t)return;x.forEach(o=>o()),x.clear();let D=S.parseFromString(t,"text/html");N(D,u);let F=D.querySelector("title")?.textContent;if(F)document.title=F;else{let o=document.querySelector("h1");F=o?.innerText??o?.textContent??u.pathname}B.textContent!==F&&(B.textContent=F),B.dataset.persist="",D.body.appendChild(B),w(document.body,D.body),e||(u.hash?document.getElementById(decodeURIComponent(u.hash.substring(1)))?.scrollIntoView():window.scrollTo({top:0})),document.head.querySelectorAll(":not([spa-preserve])").forEach(o=>o.remove()),D.head.querySelectorAll(":not([spa-preserve])").forEach(o=>document.head.appendChild(o)),e||history.pushState({},"",u),M(b(window)),delete B.dataset.persist}window.spaNavigate=p;function ru(){return typeof window<"u"&&(window.addEventListener("click",async u=>{let{url:e}=P(u)??{};if(!(!e||u.ctrlKey||u.metaKey)){if(u.preventDefault(),nu(e)&&e.hash){document.getElementById(decodeURIComponent(e.hash.substring(1)))?.scrollIntoView(),history.pushState({},"",e);return}try{p(e,!1)}catch{window.location.assign(e)}}}),window.addEventListener("popstate",u=>{let{url:e}=P(u)??{};if(!(window.location.hash&&window.location.pathname===e?.pathname))try{p(new URL(window.location.toString()),!0)}catch{window.location.reload()}})),new class{go(e){let t=new URL(e,window.location.toString());return p(t,!1)}back(){return window.history.back()}forward(){return window.history.forward()}}}ru();M(b(window));if(!customElements.get("route-announcer")){let u={"aria-live":"assertive","aria-atomic":"true",style:"position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"};customElements.define("route-announcer",class extends HTMLElement{constructor(){super()}connectedCallback(){for(let[t,D]of Object.entries(u))this.setAttribute(t,D)}})}\n';var popover_inline_default='var Jt=Object.create;var Et=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var ue=Object.getPrototypeOf,ne=Object.prototype.hasOwnProperty;var ie=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var oe=(t,e,u,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of ee(e))!ne.call(t,i)&&i!==u&&Et(t,i,{get:()=>e[i],enumerable:!(n=te(e,i))||n.enumerable});return t};var re=(t,e,u)=>(u=t!=null?Jt(ue(t)):{},oe(e||!t||!t.__esModule?Et(u,"default",{value:t,enumerable:!0}):u,t));var Xt=ie((Je,Yt)=>{"use strict";Yt.exports=ve;function K(t){return t instanceof Buffer?Buffer.from(t):new t.constructor(t.buffer.slice(),t.byteOffset,t.length)}function ve(t){if(t=t||{},t.circles)return be(t);let e=new Map;if(e.set(Date,o=>new Date(o)),e.set(Map,(o,l)=>new Map(n(Array.from(o),l))),e.set(Set,(o,l)=>new Set(n(Array.from(o),l))),t.constructorHandlers)for(let o of t.constructorHandlers)e.set(o[0],o[1]);let u=null;return t.proto?r:i;function n(o,l){let s=Object.keys(o),c=new Array(s.length);for(let a=0;a<s.length;a++){let D=s[a],F=o[D];typeof F!="object"||F===null?c[D]=F:F.constructor!==Object&&(u=e.get(F.constructor))?c[D]=u(F,l):ArrayBuffer.isView(F)?c[D]=K(F):c[D]=l(F)}return c}function i(o){if(typeof o!="object"||o===null)return o;if(Array.isArray(o))return n(o,i);if(o.constructor!==Object&&(u=e.get(o.constructor)))return u(o,i);let l={};for(let s in o){if(Object.hasOwnProperty.call(o,s)===!1)continue;let c=o[s];typeof c!="object"||c===null?l[s]=c:c.constructor!==Object&&(u=e.get(c.constructor))?l[s]=u(c,i):ArrayBuffer.isView(c)?l[s]=K(c):l[s]=i(c)}return l}function r(o){if(typeof o!="object"||o===null)return o;if(Array.isArray(o))return n(o,r);if(o.constructor!==Object&&(u=e.get(o.constructor)))return u(o,r);let l={};for(let s in o){let c=o[s];typeof c!="object"||c===null?l[s]=c:c.constructor!==Object&&(u=e.get(c.constructor))?l[s]=u(c,r):ArrayBuffer.isView(c)?l[s]=K(c):l[s]=r(c)}return l}}function be(t){let e=[],u=[],n=new Map;if(n.set(Date,s=>new Date(s)),n.set(Map,(s,c)=>new Map(r(Array.from(s),c))),n.set(Set,(s,c)=>new Set(r(Array.from(s),c))),t.constructorHandlers)for(let s of t.constructorHandlers)n.set(s[0],s[1]);let i=null;return t.proto?l:o;function r(s,c){let a=Object.keys(s),D=new Array(a.length);for(let F=0;F<a.length;F++){let f=a[F],d=s[f];if(typeof d!="object"||d===null)D[f]=d;else if(d.constructor!==Object&&(i=n.get(d.constructor)))D[f]=i(d,c);else if(ArrayBuffer.isView(d))D[f]=K(d);else{let m=e.indexOf(d);m!==-1?D[f]=u[m]:D[f]=c(d)}}return D}function o(s){if(typeof s!="object"||s===null)return s;if(Array.isArray(s))return r(s,o);if(s.constructor!==Object&&(i=n.get(s.constructor)))return i(s,o);let c={};e.push(s),u.push(c);for(let a in s){if(Object.hasOwnProperty.call(s,a)===!1)continue;let D=s[a];if(typeof D!="object"||D===null)c[a]=D;else if(D.constructor!==Object&&(i=n.get(D.constructor)))c[a]=i(D,o);else if(ArrayBuffer.isView(D))c[a]=K(D);else{let F=e.indexOf(D);F!==-1?c[a]=u[F]:c[a]=o(D)}}return e.pop(),u.pop(),c}function l(s){if(typeof s!="object"||s===null)return s;if(Array.isArray(s))return r(s,l);if(s.constructor!==Object&&(i=n.get(s.constructor)))return i(s,l);let c={};e.push(s),u.push(c);for(let a in s){let D=s[a];if(typeof D!="object"||D===null)c[a]=D;else if(D.constructor!==Object&&(i=n.get(D.constructor)))c[a]=i(D,l);else if(ArrayBuffer.isView(D))c[a]=K(D);else{let F=e.indexOf(D);F!==-1?c[a]=u[F]:c[a]=l(D)}}return e.pop(),u.pop(),c}}});var W=Math.min,v=Math.max,J=Math.round;var L=t=>({x:t,y:t}),se={left:"right",right:"left",bottom:"top",top:"bottom"},ce={start:"end",end:"start"};function ft(t,e,u){return v(t,W(e,u))}function tt(t,e){return typeof t=="function"?t(e):t}function P(t){return t.split("-")[0]}function rt(t){return t.split("-")[1]}function Ft(t){return t==="x"?"y":"x"}function dt(t){return t==="y"?"height":"width"}function $(t){return["top","bottom"].includes(P(t))?"y":"x"}function mt(t){return Ft($(t))}function Ct(t,e,u){u===void 0&&(u=!1);let n=rt(t),i=mt(t),r=dt(i),o=i==="x"?n===(u?"end":"start")?"right":"left":n==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(o=G(o)),[o,G(o)]}function xt(t){let e=G(t);return[ot(t),e,ot(e)]}function ot(t){return t.replace(/start|end/g,e=>ce[e])}function le(t,e,u){let n=["left","right"],i=["right","left"],r=["top","bottom"],o=["bottom","top"];switch(t){case"top":case"bottom":return u?e?i:n:e?n:i;case"left":case"right":return e?r:o;default:return[]}}function Bt(t,e,u,n){let i=rt(t),r=le(P(t),u==="start",n);return i&&(r=r.map(o=>o+"-"+i),e&&(r=r.concat(r.map(ot)))),r}function G(t){return t.replace(/left|right|bottom|top/g,e=>se[e])}function De(t){return{top:0,right:0,bottom:0,left:0,...t}}function gt(t){return typeof t!="number"?De(t):{top:t,right:t,bottom:t,left:t}}function T(t){let{x:e,y:u,width:n,height:i}=t;return{width:n,height:i,top:u,left:e,right:e+n,bottom:u+i,x:e,y:u}}function wt(t,e,u){let{reference:n,floating:i}=t,r=$(e),o=mt(e),l=dt(o),s=P(e),c=r==="y",a=n.x+n.width/2-i.width/2,D=n.y+n.height/2-i.height/2,F=n[l]/2-i[l]/2,f;switch(s){case"top":f={x:a,y:n.y-i.height};break;case"bottom":f={x:a,y:n.y+n.height};break;case"right":f={x:n.x+n.width,y:D};break;case"left":f={x:n.x-i.width,y:D};break;default:f={x:n.x,y:n.y}}switch(rt(e)){case"start":f[o]-=F*(u&&c?-1:1);break;case"end":f[o]+=F*(u&&c?-1:1);break}return f}var yt=async(t,e,u)=>{let{placement:n="bottom",strategy:i="absolute",middleware:r=[],platform:o}=u,l=r.filter(Boolean),s=await(o.isRTL==null?void 0:o.isRTL(e)),c=await o.getElementRects({reference:t,floating:e,strategy:i}),{x:a,y:D}=wt(c,n,s),F=n,f={},d=0;for(let m=0;m<l.length;m++){let{name:g,fn:p}=l[m],{x:A,y:h,data:x,reset:E}=await p({x:a,y:D,initialPlacement:n,placement:F,strategy:i,middlewareData:f,rects:c,platform:o,elements:{reference:t,floating:e}});a=A??a,D=h??D,f={...f,[g]:{...f[g],...x}},E&&d<=50&&(d++,typeof E=="object"&&(E.placement&&(F=E.placement),E.rects&&(c=E.rects===!0?await o.getElementRects({reference:t,floating:e,strategy:i}):E.rects),{x:a,y:D}=wt(c,F,s)),m=-1)}return{x:a,y:D,placement:F,strategy:i,middlewareData:f}};async function At(t,e){var u;e===void 0&&(e={});let{x:n,y:i,platform:r,rects:o,elements:l,strategy:s}=t,{boundary:c="clippingAncestors",rootBoundary:a="viewport",elementContext:D="floating",altBoundary:F=!1,padding:f=0}=tt(e,t),d=gt(f),g=l[F?D==="floating"?"reference":"floating":D],p=T(await r.getClippingRect({element:(u=await(r.isElement==null?void 0:r.isElement(g)))==null||u?g:g.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(l.floating)),boundary:c,rootBoundary:a,strategy:s})),A=D==="floating"?{x:n,y:i,width:o.floating.width,height:o.floating.height}:o.reference,h=await(r.getOffsetParent==null?void 0:r.getOffsetParent(l.floating)),x=await(r.isElement==null?void 0:r.isElement(h))?await(r.getScale==null?void 0:r.getScale(h))||{x:1,y:1}:{x:1,y:1},E=T(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:A,offsetParent:h,strategy:s}):A);return{top:(p.top-E.top+d.top)/x.y,bottom:(E.bottom-p.bottom+d.bottom)/x.y,left:(p.left-E.left+d.left)/x.x,right:(E.right-p.right+d.right)/x.x}}var vt=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var u,n;let{placement:i,middlewareData:r,rects:o,initialPlacement:l,platform:s,elements:c}=e,{mainAxis:a=!0,crossAxis:D=!0,fallbackPlacements:F,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:d="none",flipAlignment:m=!0,...g}=tt(t,e);if((u=r.arrow)!=null&&u.alignmentOffset)return{};let p=P(i),A=$(l),h=P(l)===l,x=await(s.isRTL==null?void 0:s.isRTL(c.floating)),E=F||(h||!m?[G(l)]:xt(l)),V=d!=="none";!F&&V&&E.push(...Bt(l,m,d,x));let it=[l,...E],Z=await At(e,g),_=[],C=((n=r.flip)==null?void 0:n.overflows)||[];if(a&&_.push(Z[p]),D){let S=Ct(i,o,x);_.push(Z[S[0]],Z[S[1]])}if(C=[...C,{placement:i,overflows:_}],!_.every(S=>S<=0)){var z,Q;let S=(((z=r.flip)==null?void 0:z.index)||0)+1,Y=it[S];if(Y)return{data:{index:S,overflows:C},reset:{placement:Y}};let j=(Q=C.filter(M=>M.overflows[0]<=0).sort((M,R)=>M.overflows[1]-R.overflows[1])[0])==null?void 0:Q.placement;if(!j)switch(f){case"bestFit":{var I;let M=(I=C.filter(R=>{if(V){let H=$(R.placement);return H===A||H==="y"}return!0}).map(R=>[R.placement,R.overflows.filter(H=>H>0).reduce((H,Gt)=>H+Gt,0)]).sort((R,H)=>R[1]-H[1])[0])==null?void 0:I[0];M&&(j=M);break}case"initialPlacement":j=l;break}if(i!==j)return{reset:{placement:j}}}return{}}}};function bt(t){let e=W(...t.map(r=>r.left)),u=W(...t.map(r=>r.top)),n=v(...t.map(r=>r.right)),i=v(...t.map(r=>r.bottom));return{x:e,y:u,width:n-e,height:i-u}}function ae(t){let e=t.slice().sort((i,r)=>i.y-r.y),u=[],n=null;for(let i=0;i<e.length;i++){let r=e[i];!n||r.y-n.y>n.height/2?u.push([r]):u[u.length-1].push(r),n=r}return u.map(i=>T(bt(i)))}var St=function(t){return t===void 0&&(t={}),{name:"inline",options:t,async fn(e){let{placement:u,elements:n,rects:i,platform:r,strategy:o}=e,{padding:l=2,x:s,y:c}=tt(t,e),a=Array.from(await(r.getClientRects==null?void 0:r.getClientRects(n.reference))||[]),D=ae(a),F=T(bt(a)),f=gt(l);function d(){if(D.length===2&&D[0].left>D[1].right&&s!=null&&c!=null)return D.find(g=>s>g.left-f.left&&s<g.right+f.right&&c>g.top-f.top&&c<g.bottom+f.bottom)||F;if(D.length>=2){if($(u)==="y"){let C=D[0],z=D[D.length-1],Q=P(u)==="top",I=C.top,S=z.bottom,Y=Q?C.left:z.left,j=Q?C.right:z.right,M=j-Y,R=S-I;return{top:I,bottom:S,left:Y,right:j,width:M,height:R,x:Y,y:I}}let g=P(u)==="left",p=v(...D.map(C=>C.right)),A=W(...D.map(C=>C.left)),h=D.filter(C=>g?C.left===A:C.right===p),x=h[0].top,E=h[h.length-1].bottom,V=A,it=p,Z=it-V,_=E-x;return{top:x,bottom:E,left:V,right:it,width:Z,height:_,x:V,y:x}}return F}let m=await r.getElementRects({reference:{getBoundingClientRect:d},floating:n.floating,strategy:o});return i.reference.x!==m.reference.x||i.reference.y!==m.reference.y||i.reference.width!==m.reference.width||i.reference.height!==m.reference.height?{reset:{rects:m}}:{}}}};var Rt=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:u,y:n,placement:i}=e,{mainAxis:r=!0,crossAxis:o=!1,limiter:l={fn:g=>{let{x:p,y:A}=g;return{x:p,y:A}}},...s}=tt(t,e),c={x:u,y:n},a=await At(e,s),D=$(P(i)),F=Ft(D),f=c[F],d=c[D];if(r){let g=F==="y"?"top":"left",p=F==="y"?"bottom":"right",A=f+a[g],h=f-a[p];f=ft(A,f,h)}if(o){let g=D==="y"?"top":"left",p=D==="y"?"bottom":"right",A=d+a[g],h=d-a[p];d=ft(A,d,h)}let m=l.fn({...e,[F]:f,[D]:d});return{...m,data:{x:m.x-u,y:m.y-n,enabled:{[F]:r,[D]:o}}}}}};function ct(){return typeof window<"u"}function N(t){return Lt(t)?(t.nodeName||"").toLowerCase():"#document"}function B(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function O(t){var e;return(e=(Lt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Lt(t){return ct()?t instanceof Node||t instanceof B(t).Node:!1}function w(t){return ct()?t instanceof Element||t instanceof B(t).Element:!1}function b(t){return ct()?t instanceof HTMLElement||t instanceof B(t).HTMLElement:!1}function Ot(t){return!ct()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof B(t).ShadowRoot}function X(t){let{overflow:e,overflowX:u,overflowY:n,display:i}=y(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+u)&&!["inline","contents"].includes(i)}function Pt(t){return["table","td","th"].includes(N(t))}function et(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function lt(t){let e=Dt(),u=w(t)?y(t):t;return u.transform!=="none"||u.perspective!=="none"||(u.containerType?u.containerType!=="normal":!1)||!e&&(u.backdropFilter?u.backdropFilter!=="none":!1)||!e&&(u.filter?u.filter!=="none":!1)||["transform","perspective","filter"].some(n=>(u.willChange||"").includes(n))||["paint","layout","strict","content"].some(n=>(u.contain||"").includes(n))}function Tt(t){let e=k(t);for(;b(e)&&!U(e);){if(lt(e))return e;if(et(e))return null;e=k(e)}return null}function Dt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function U(t){return["html","body","#document"].includes(N(t))}function y(t){return B(t).getComputedStyle(t)}function ut(t){return w(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function k(t){if(N(t)==="html")return t;let e=t.assignedSlot||t.parentNode||Ot(t)&&t.host||O(t);return Ot(e)?e.host:e}function kt(t){let e=k(t);return U(e)?t.ownerDocument?t.ownerDocument.body:t.body:b(e)&&X(e)?e:kt(e)}function st(t,e,u){var n;e===void 0&&(e=[]),u===void 0&&(u=!0);let i=kt(t),r=i===((n=t.ownerDocument)==null?void 0:n.body),o=B(i);if(r){let l=at(o);return e.concat(o,o.visualViewport||[],X(i)?i:[],l&&u?st(l):[])}return e.concat(i,st(i,[],u))}function at(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Ht(t){let e=y(t),u=parseFloat(e.width)||0,n=parseFloat(e.height)||0,i=b(t),r=i?t.offsetWidth:u,o=i?t.offsetHeight:n,l=J(u)!==r||J(n)!==o;return l&&(u=r,n=o),{width:u,height:n,$:l}}function Wt(t){return w(t)?t:t.contextElement}function q(t){let e=Wt(t);if(!b(e))return L(1);let u=e.getBoundingClientRect(),{width:n,height:i,$:r}=Ht(e),o=(r?J(u.width):u.width)/n,l=(r?J(u.height):u.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!l||!Number.isFinite(l))&&(l=1),{x:o,y:l}}var fe=L(0);function $t(t){let e=B(t);return!Dt()||!e.visualViewport?fe:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Fe(t,e,u){return e===void 0&&(e=!1),!u||e&&u!==B(t)?!1:e}function nt(t,e,u,n){e===void 0&&(e=!1),u===void 0&&(u=!1);let i=t.getBoundingClientRect(),r=Wt(t),o=L(1);e&&(n?w(n)&&(o=q(n)):o=q(t));let l=Fe(r,u,n)?$t(r):L(0),s=(i.left+l.x)/o.x,c=(i.top+l.y)/o.y,a=i.width/o.x,D=i.height/o.y;if(r){let F=B(r),f=n&&w(n)?B(n):n,d=F,m=at(d);for(;m&&n&&f!==d;){let g=q(m),p=m.getBoundingClientRect(),A=y(m),h=p.left+(m.clientLeft+parseFloat(A.paddingLeft))*g.x,x=p.top+(m.clientTop+parseFloat(A.paddingTop))*g.y;s*=g.x,c*=g.y,a*=g.x,D*=g.y,s+=h,c+=x,d=B(m),m=at(d)}}return T({width:a,height:D,x:s,y:c})}function de(t){let{elements:e,rect:u,offsetParent:n,strategy:i}=t,r=i==="fixed",o=O(n),l=e?et(e.floating):!1;if(n===o||l&&r)return u;let s={scrollLeft:0,scrollTop:0},c=L(1),a=L(0),D=b(n);if((D||!D&&!r)&&((N(n)!=="body"||X(o))&&(s=ut(n)),b(n))){let F=nt(n);c=q(n),a.x=F.x+n.clientLeft,a.y=F.y+n.clientTop}return{width:u.width*c.x,height:u.height*c.y,x:u.x*c.x-s.scrollLeft*c.x+a.x,y:u.y*c.y-s.scrollTop*c.y+a.y}}function me(t){return Array.from(t.getClientRects())}function ht(t,e){let u=ut(t).scrollLeft;return e?e.left+u:nt(O(t)).left+u}function ge(t){let e=O(t),u=ut(t),n=t.ownerDocument.body,i=v(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),r=v(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight),o=-u.scrollLeft+ht(t),l=-u.scrollTop;return y(n).direction==="rtl"&&(o+=v(e.clientWidth,n.clientWidth)-i),{width:i,height:r,x:o,y:l}}function Ae(t,e){let u=B(t),n=O(t),i=u.visualViewport,r=n.clientWidth,o=n.clientHeight,l=0,s=0;if(i){r=i.width,o=i.height;let c=Dt();(!c||c&&e==="fixed")&&(l=i.offsetLeft,s=i.offsetTop)}return{width:r,height:o,x:l,y:s}}function pe(t,e){let u=nt(t,!0,e==="fixed"),n=u.top+t.clientTop,i=u.left+t.clientLeft,r=b(t)?q(t):L(1),o=t.clientWidth*r.x,l=t.clientHeight*r.y,s=i*r.x,c=n*r.y;return{width:o,height:l,x:s,y:c}}function jt(t,e,u){let n;if(e==="viewport")n=Ae(t,u);else if(e==="document")n=ge(O(t));else if(w(e))n=pe(e,u);else{let i=$t(t);n={...e,x:e.x-i.x,y:e.y-i.y}}return T(n)}function Nt(t,e){let u=k(t);return u===e||!w(u)||U(u)?!1:y(u).position==="fixed"||Nt(u,e)}function he(t,e){let u=e.get(t);if(u)return u;let n=st(t,[],!1).filter(l=>w(l)&&N(l)!=="body"),i=null,r=y(t).position==="fixed",o=r?k(t):t;for(;w(o)&&!U(o);){let l=y(o),s=lt(o);!s&&l.position==="fixed"&&(i=null),(r?!s&&!i:!s&&l.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||X(o)&&!s&&Nt(t,o))?n=n.filter(a=>a!==o):i=l,o=k(o)}return e.set(t,n),n}function Ee(t){let{element:e,boundary:u,rootBoundary:n,strategy:i}=t,o=[...u==="clippingAncestors"?et(e)?[]:he(e,this._c):[].concat(u),n],l=o[0],s=o.reduce((c,a)=>{let D=jt(e,a,i);return c.top=v(D.top,c.top),c.right=W(D.right,c.right),c.bottom=W(D.bottom,c.bottom),c.left=v(D.left,c.left),c},jt(e,l,i));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}}function Ce(t){let{width:e,height:u}=Ht(t);return{width:e,height:u}}function xe(t,e,u){let n=b(e),i=O(e),r=u==="fixed",o=nt(t,!0,r,e),l={scrollLeft:0,scrollTop:0},s=L(0);if(n||!n&&!r)if((N(e)!=="body"||X(i))&&(l=ut(e)),n){let f=nt(e,!0,r,e);s.x=f.x+e.clientLeft,s.y=f.y+e.clientTop}else i&&(s.x=ht(i));let c=0,a=0;if(i&&!n&&!r){let f=i.getBoundingClientRect();a=f.top+l.scrollTop,c=f.left+l.scrollLeft-ht(i,f)}let D=o.left+l.scrollLeft-s.x-c,F=o.top+l.scrollTop-s.y-a;return{x:D,y:F,width:o.width,height:o.height}}function pt(t){return y(t).position==="static"}function Mt(t,e){if(!b(t)||y(t).position==="fixed")return null;if(e)return e(t);let u=t.offsetParent;return O(t)===u&&(u=u.ownerDocument.body),u}function Ut(t,e){let u=B(t);if(et(t))return u;if(!b(t)){let i=k(t);for(;i&&!U(i);){if(w(i)&&!pt(i))return i;i=k(i)}return u}let n=Mt(t,e);for(;n&&Pt(n)&&pt(n);)n=Mt(n,e);return n&&U(n)&&pt(n)&&!lt(n)?u:n||Tt(t)||u}var Be=async function(t){let e=this.getOffsetParent||Ut,u=this.getDimensions,n=await u(t.floating);return{reference:xe(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:n.width,height:n.height}}};function we(t){return y(t).direction==="rtl"}var ye={convertOffsetParentRelativeRectToViewportRelativeRect:de,getDocumentElement:O,getClippingRect:Ee,getOffsetParent:Ut,getElementRects:Be,getClientRects:me,getDimensions:Ce,getScale:q,isElement:w,isRTL:we};var Vt=Rt,_t=vt;var zt=St;var It=(t,e,u)=>{let n=new Map,i={platform:ye,...u},r={...i.platform,_c:n};return yt(t,e,{...i,platform:r})};var Qe=Object.hasOwnProperty;var Kt=re(Xt(),1),uu=(0,Kt.default)();var qt=(t,e,u)=>{let n=new URL(t.getAttribute(e),u);t.setAttribute(e,n.pathname+n.hash)};function Zt(t,e){t.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(u=>qt(u,"href",e)),t.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(u=>qt(u,"src",e))}var Se=new DOMParser;async function Qt({clientX:t,clientY:e}){let u=this;if(u.dataset.noPopover==="true")return;async function n(d){let{x:m,y:g}=await It(u,d,{middleware:[zt({x:t,y:e}),Vt(),_t()]});Object.assign(d.style,{left:`${m}px`,top:`${g}px`})}let i=()=>[...u.children].some(d=>d.classList.contains("popover"));if(i())return n(u.lastChild);let r=new URL(document.location.href);r.hash="",r.search="";let o=new URL(u.href),l=decodeURIComponent(o.hash);o.hash="",o.search="";let s=await fetch(`${o}`).catch(d=>{console.error(d)});if(i()||!s)return;let[c]=s.headers.get("Content-Type").split(";"),[a,D]=c.split("/"),F=document.createElement("div");F.classList.add("popover");let f=document.createElement("div");switch(f.classList.add("popover-inner"),F.appendChild(f),f.dataset.contentType=c??void 0,a){case"image":let d=document.createElement("img");d.src=o.toString(),d.alt=o.pathname,f.appendChild(d);break;case"application":switch(D){case"pdf":let A=document.createElement("iframe");A.src=o.toString(),f.appendChild(A);break;default:break}break;default:let m=await s.text(),g=Se.parseFromString(m,"text/html");Zt(g,o);let p=[...g.getElementsByClassName("popover-hint")];if(p.length===0)return;p.forEach(A=>f.appendChild(A))}if(n(F),u.appendChild(F),l!==""){let d=f.querySelector(l);d&&f.scroll({top:d.offsetTop-12,behavior:"instant"})}}document.addEventListener("nav",()=>{let t=[...document.getElementsByClassName("internal")];for(let e of t)e.addEventListener("mouseenter",Qt),window.addCleanup(()=>e.removeEventListener("mouseenter",Qt))});\n';var custom_default=`/**
 * Layout breakpoints
 * $mobile: screen width below this value will use mobile styles
 * $desktop: screen width above this value will use desktop styles
 * Screen width between $mobile and $desktop width will use the tablet layout.
 * assuming mobile < desktop
 */
code[data-theme*=" "] {
  color: var(--shiki-light);
  background-color: var(--shiki-light-bg);
}

code[data-theme*=" "] span {
  color: var(--shiki-light);
}

[saved-theme=dark] code[data-theme*=" "] {
  color: var(--shiki-dark);
  background-color: var(--shiki-dark-bg);
}

[saved-theme=dark] code[data-theme*=" "] span {
  color: var(--shiki-dark);
}

.callout {
  border: 1px solid var(--border);
  background-color: var(--bg);
  border-radius: 5px;
  padding: 0 1rem;
  overflow-y: hidden;
  transition: max-height 0.3s ease;
  box-sizing: border-box;
  --callout-icon-note: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="22" y2="6"></line><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path></svg>');
  --callout-icon-abstract: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>');
  --callout-icon-info: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>');
  --callout-icon-todo: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>');
  --callout-icon-tip: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> ');
  --callout-icon-success: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ');
  --callout-icon-question: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> ');
  --callout-icon-warning: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>');
  --callout-icon-failure: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> ');
  --callout-icon-danger: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> ');
  --callout-icon-bug: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="m10 4 1 2"></path><path d="m14 4-1 2"></path></svg>');
  --callout-icon-example: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> ');
  --callout-icon-quote: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>');
  --callout-icon-fold: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolyline points="6 9 12 15 18 9"%3E%3C/polyline%3E%3C/svg%3E');
}
.callout > .callout-content > :first-child {
  margin-top: 0;
}
.callout[data-callout] {
  --color: #448aff;
  --border: #448aff44;
  --bg: #448aff10;
  --callout-icon: var(--callout-icon-note);
}
.callout[data-callout=abstract] {
  --color: #00b0ff;
  --border: #00b0ff44;
  --bg: #00b0ff10;
  --callout-icon: var(--callout-icon-abstract);
}
.callout[data-callout=info], .callout[data-callout=todo] {
  --color: #00b8d4;
  --border: #00b8d444;
  --bg: #00b8d410;
  --callout-icon: var(--callout-icon-info);
}
.callout[data-callout=todo] {
  --callout-icon: var(--callout-icon-todo);
}
.callout[data-callout=tip] {
  --color: #00bfa5;
  --border: #00bfa544;
  --bg: #00bfa510;
  --callout-icon: var(--callout-icon-tip);
}
.callout[data-callout=success] {
  --color: #09ad7a;
  --border: #09ad7144;
  --bg: #09ad7110;
  --callout-icon: var(--callout-icon-success);
}
.callout[data-callout=question] {
  --color: #dba642;
  --border: #dba64244;
  --bg: #dba64210;
  --callout-icon: var(--callout-icon-question);
}
.callout[data-callout=warning] {
  --color: #db8942;
  --border: #db894244;
  --bg: #db894210;
  --callout-icon: var(--callout-icon-warning);
}
.callout[data-callout=failure], .callout[data-callout=danger], .callout[data-callout=bug] {
  --color: #db4242;
  --border: #db424244;
  --bg: #db424210;
  --callout-icon: var(--callout-icon-failure);
}
.callout[data-callout=bug] {
  --callout-icon: var(--callout-icon-bug);
}
.callout[data-callout=danger] {
  --callout-icon: var(--callout-icon-danger);
}
.callout[data-callout=example] {
  --color: #7a43b5;
  --border: #7a43b544;
  --bg: #7a43b510;
  --callout-icon: var(--callout-icon-example);
}
.callout[data-callout=quote] {
  --color: var(--secondary);
  --border: var(--lightgray);
  --callout-icon: var(--callout-icon-quote);
}
.callout.is-collapsed > .callout-title > .fold-callout-icon {
  transform: rotateZ(-90deg);
}

.callout-title {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  padding: 1rem 0;
  color: var(--color);
  --icon-size: 18px;
}
.callout-title .fold-callout-icon {
  transition: transform 0.15s ease;
  opacity: 0.8;
  cursor: pointer;
  --callout-icon: var(--callout-icon-fold);
}
.callout-title > .callout-title-inner > p {
  color: var(--color);
  margin: 0;
}
.callout-title .callout-icon, .callout-title .fold-callout-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  flex: 0 0 var(--icon-size);
  background-size: var(--icon-size) var(--icon-size);
  background-position: center;
  background-color: var(--color);
  mask-image: var(--callout-icon);
  mask-size: var(--icon-size) var(--icon-size);
  mask-position: center;
  mask-repeat: no-repeat;
  padding: 0.2rem 0;
}
.callout-title .callout-title-inner {
  font-weight: 600;
}

html {
  scroll-behavior: smooth;
  text-size-adjust: none;
  overflow-x: hidden;
  width: 100vw;
}

body,
section {
  margin: 0;
  box-sizing: border-box;
  background-color: var(--light);
  font-family: var(--bodyFont);
  color: var(--darkgray);
}

.text-highlight {
  background-color: var(--textHighlight);
  padding: 0 0.1rem;
  border-radius: 5px;
}

::selection {
  background: color-mix(in srgb, var(--tertiary) 60%, rgba(255, 255, 255, 0));
  color: var(--darkgray);
}

p,
ul,
text,
a,
tr,
td,
li,
ol,
ul,
.katex,
.math {
  color: var(--darkgray);
  fill: var(--darkgray);
  hyphens: auto;
}

p,
ul,
text,
a,
li,
ol,
ul,
.katex,
.math {
  overflow-wrap: anywhere;
  /* tr and td removed from list of selectors for overflow-wrap, allowing them to use default 'normal' property value */
}

.math.math-display {
  text-align: center;
}

strong {
  font-weight: 600;
}

a {
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
  color: var(--secondary);
}
a:hover {
  color: var(--tertiary) !important;
}
a.internal {
  text-decoration: none;
  background-color: var(--highlight);
  padding: 0 0.1rem;
  border-radius: 5px;
  line-height: 1.4rem;
}
a.internal:has(> img) {
  background-color: none;
  border-radius: 0;
  padding: 0;
}
a.internal.tag-link::before {
  content: "#";
}
a.external .external-icon {
  height: 1ex;
  margin: 0 0.15em;
}
a.external .external-icon > path {
  fill: var(--dark);
}

.desktop-only {
  display: initial;
}
@media all and ((max-width: 800px)) {
  .desktop-only {
    display: none;
  }
}

.mobile-only {
  display: none;
}
@media all and ((max-width: 800px)) {
  .mobile-only {
    display: initial;
  }
}

.page {
  max-width: calc(1200px + 300px);
  margin: 0 auto;
}
.page article > h1 {
  font-size: 2rem;
}
.page article li:has(> input[type=checkbox]) {
  list-style-type: none;
  padding-left: 0;
}
.page article li:has(> input[type=checkbox]:checked) {
  text-decoration: line-through;
  text-decoration-color: var(--gray);
  color: var(--gray);
}
.page article li > * {
  margin-top: 0;
  margin-bottom: 0;
}
.page article p > strong {
  color: var(--dark);
}
.page > #quartz-body {
  display: grid;
  grid-template-columns: 320px auto 320px;
  grid-template-rows: auto auto auto;
  column-gap: 5px;
  row-gap: 5px;
  grid-template-areas: "grid-sidebar-left grid-header grid-sidebar-right"      "grid-sidebar-left grid-center grid-sidebar-right"      "grid-sidebar-left grid-footer grid-sidebar-right";
}
@media all and ((max-width: 1200px)) {
  .page > #quartz-body {
    grid-template-columns: 320px auto;
    grid-template-rows: auto auto auto auto;
    column-gap: 5px;
    row-gap: 5px;
    grid-template-areas: "grid-sidebar-left grid-header"      "grid-sidebar-left grid-center"      "grid-sidebar-left grid-sidebar-right"      "grid-sidebar-left grid-footer";
  }
}
@media all and ((max-width: 800px)) {
  .page > #quartz-body {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto auto auto;
    column-gap: 5px;
    row-gap: 5px;
    grid-template-areas: "grid-sidebar-left"      "grid-header"      "grid-center"      "grid-sidebar-right"      "grid-footer";
  }
}
@media all and ((max-width: 1200px)) {
  .page > #quartz-body {
    padding: 0 1rem;
  }
}
@media all and ((max-width: 800px)) {
  .page > #quartz-body {
    margin: 0 auto;
  }
}
.page > #quartz-body .sidebar {
  gap: 2rem;
  top: 0;
  box-sizing: border-box;
  padding: 6rem 2rem 2rem 2rem;
  display: flex;
  height: 100vh;
  position: sticky;
}
.page > #quartz-body .sidebar.left {
  z-index: 1;
  grid-area: grid-sidebar-left;
  flex-direction: column;
}
@media all and ((max-width: 800px)) {
  .page > #quartz-body .sidebar.left {
    gap: 0;
    align-items: center;
    position: initial;
    display: flex;
    height: unset;
    flex-direction: row;
    padding: 0;
    padding-top: 2rem;
  }
}
.page > #quartz-body .sidebar.right {
  grid-area: grid-sidebar-right;
  margin-right: 0;
  flex-direction: column;
}
@media all and ((max-width: 800px)) {
  .page > #quartz-body .sidebar.right {
    margin-left: inherit;
    margin-right: inherit;
  }
}
@media all and ((max-width: 1200px)) {
  .page > #quartz-body .sidebar.right {
    position: initial;
    height: unset;
    width: 100%;
    flex-direction: row;
    padding: 0;
  }
  .page > #quartz-body .sidebar.right > * {
    flex: 1;
  }
  .page > #quartz-body .sidebar.right > .toc {
    display: none;
  }
}
.page > #quartz-body .page-header, .page > #quartz-body .page-footer {
  margin-top: 1rem;
}
.page > #quartz-body .page-header {
  grid-area: grid-header;
  margin: 6rem 0 0 0;
}
@media all and ((max-width: 800px)) {
  .page > #quartz-body .page-header {
    margin-top: 0;
    padding: 0;
  }
}
.page > #quartz-body .center > article {
  grid-area: grid-center;
}
.page > #quartz-body footer {
  grid-area: grid-footer;
}
.page > #quartz-body .center, .page > #quartz-body footer {
  max-width: 100%;
  min-width: 100%;
  margin-left: auto;
  margin-right: auto;
}
@media all and ((max-width: 1200px)) {
  .page > #quartz-body .center, .page > #quartz-body footer {
    margin-right: 0;
  }
}
@media all and ((max-width: 800px)) {
  .page > #quartz-body .center, .page > #quartz-body footer {
    margin-left: 0;
  }
}
.page > #quartz-body footer {
  margin-left: 0;
}

.footnotes {
  margin-top: 2rem;
  border-top: 1px solid var(--lightgray);
}

input[type=checkbox] {
  transform: translateY(2px);
  color: var(--secondary);
  border: 1px solid var(--lightgray);
  border-radius: 3px;
  background-color: var(--light);
  position: relative;
  margin-inline-end: 0.2rem;
  margin-inline-start: -1.4rem;
  appearance: none;
  width: 16px;
  height: 16px;
}
input[type=checkbox]:checked {
  border-color: var(--secondary);
  background-color: var(--secondary);
}
input[type=checkbox]:checked::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  display: block;
  border: solid var(--light);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

blockquote {
  margin: 1rem 0;
  border-left: 3px solid var(--secondary);
  padding-left: 1rem;
  transition: border-color 0.2s ease;
}

h1,
h2,
h3,
h4,
h5,
h6,
thead {
  font-family: var(--headerFont);
  color: var(--dark);
  font-weight: revert;
  margin-bottom: 0;
}
article > h1 > a[role=anchor],
article > h2 > a[role=anchor],
article > h3 > a[role=anchor],
article > h4 > a[role=anchor],
article > h5 > a[role=anchor],
article > h6 > a[role=anchor],
article > thead > a[role=anchor] {
  color: var(--dark);
  background-color: transparent;
}

h1[id] > a[href^="#"],
h2[id] > a[href^="#"],
h3[id] > a[href^="#"],
h4[id] > a[href^="#"],
h5[id] > a[href^="#"],
h6[id] > a[href^="#"] {
  margin: 0 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  transform: translateY(-0.1rem);
  font-family: var(--codeFont);
  user-select: none;
}
h1[id]:hover > a,
h2[id]:hover > a,
h3[id]:hover > a,
h4[id]:hover > a,
h5[id]:hover > a,
h6[id]:hover > a {
  opacity: 1;
}

h1 {
  font-size: 1.75rem;
  margin-top: 2.25rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.4rem;
  margin-top: 1.9rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.12rem;
  margin-top: 1.62rem;
  margin-bottom: 1rem;
}

h4,
h5,
h6 {
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

figure[data-rehype-pretty-code-figure] {
  margin: 0;
  position: relative;
  line-height: 1.6rem;
  position: relative;
}
figure[data-rehype-pretty-code-figure] > [data-rehype-pretty-code-title] {
  font-family: var(--codeFont);
  font-size: 0.9rem;
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--lightgray);
  width: max-content;
  border-radius: 5px;
  margin-bottom: -0.5rem;
  color: var(--darkgray);
}
figure[data-rehype-pretty-code-figure] > pre {
  padding: 0;
}

pre {
  font-family: var(--codeFont);
  padding: 0 0.5rem;
  border-radius: 5px;
  overflow-x: auto;
  border: 1px solid var(--lightgray);
  position: relative;
}
pre:has(> code.mermaid) {
  border: none;
}
pre > code {
  background: none;
  padding: 0;
  font-size: 0.85rem;
  counter-reset: line;
  counter-increment: line 0;
  display: grid;
  padding: 0.5rem 0;
  overflow-x: auto;
}
pre > code [data-highlighted-chars] {
  background-color: var(--highlight);
  border-radius: 5px;
}
pre > code > [data-line] {
  padding: 0 0.25rem;
  box-sizing: border-box;
  border-left: 3px solid transparent;
}
pre > code > [data-line][data-highlighted-line] {
  background-color: var(--highlight);
  border-left: 3px solid var(--secondary);
}
pre > code > [data-line]::before {
  content: counter(line);
  counter-increment: line;
  width: 1rem;
  margin-right: 1rem;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.6);
}
pre > code[data-line-numbers-max-digits="2"] > [data-line]::before {
  width: 2rem;
}
pre > code[data-line-numbers-max-digits="3"] > [data-line]::before {
  width: 3rem;
}

code {
  font-size: 0.9em;
  color: var(--dark);
  font-family: var(--codeFont);
  border-radius: 5px;
  padding: 0.1rem 0.2rem;
  background: var(--lightgray);
}

tbody,
li,
p {
  line-height: 1.6rem;
}

.table-container {
  overflow-x: auto;
}
.table-container > table {
  margin: 1rem;
  padding: 1.5rem;
  border-collapse: collapse;
}
.table-container > table th,
.table-container > table td {
  min-width: 75px;
}
.table-container > table > * {
  line-height: 2rem;
}

th {
  text-align: left;
  padding: 0.4rem 0.7rem;
  border-bottom: 2px solid var(--gray);
}

td {
  padding: 0.2rem 0.7rem;
}

tr {
  border-bottom: 1px solid var(--lightgray);
}
tr:last-child {
  border-bottom: none;
}

img {
  max-width: 100%;
  border-radius: 5px;
  margin: 1rem 0;
}

p > img + em {
  display: block;
  transform: translateY(-1rem);
}

hr {
  width: 100%;
  margin: 2rem auto;
  height: 1px;
  border: none;
  background-color: var(--lightgray);
}

audio,
video {
  width: 100%;
  border-radius: 5px;
}

.spacer {
  flex: 1 1 auto;
}

div:has(> .overflow) {
  display: flex;
  overflow-y: auto;
  max-height: 100%;
}

ul.overflow,
ol.overflow {
  max-height: 100%;
  overflow-y: auto;
  content: "";
  clear: both;
  /*&:after {
    pointer-events: none;
    content: "";
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 1;
    transition: opacity 0.3s ease;
    background: linear-gradient(transparent 0px, var(--light));
  }*/
}
ul.overflow > li:last-of-type,
ol.overflow > li:last-of-type {
  margin-bottom: 30px;
}

.transclude ul {
  padding-left: 1rem;
}

.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
}

.external-embed.youtube,
iframe.pdf {
  aspect-ratio: 16/9;
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovc3R5bGVzIiwic291cmNlcyI6WyJ2YXJpYWJsZXMuc2NzcyIsInN5bnRheC5zY3NzIiwiY2FsbG91dHMuc2NzcyIsImJhc2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQ0FBO0VBQ0U7RUFDQTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFDRTtFQUNBOzs7QUFHRjtFQUNFOzs7QUNaRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBTUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFqQkE7RUFDRTs7QUFrQkY7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBRUU7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBR0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTs7O0FBSUo7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7O0FBR0Y7RUFFRTtFQUNBO0VBQ0E7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0UsYUYzSWE7OztBR2hCakI7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtFQUVFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFFRjtFQUNFO0VBQ0E7OztBQUdGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFXRTtFQUNBO0VBQ0E7OztBQUdGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQVNFO0FBQ0E7OztBQUlBO0VBQ0U7OztBQUlKO0VBQ0UsYUg5Q2U7OztBR2lEakI7RUFDRSxhSGxEZTtFR21EZjtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7O0FBR0E7RUFDRTs7QUFLTjtFQUNFO0VBQ0E7O0FBRUE7RUFDRTs7O0FBS047RUFDRTs7QUFDQTtFQUZGO0lBR0k7Ozs7QUFJSjtFQUNFOztBQUNBO0VBRkY7SUFHSTs7OztBQUlKO0VBQ0U7RUFDQTs7QUFFRTtFQUNFOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFDQTtFQVBGO0lBUUk7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7O0FBRUY7RUFkRjtJQWVJO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7OztBQUdGO0VBdEJGO0lBdUJJOzs7QUFFRjtFQXpCRjtJQTBCSTs7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFDQTtFQUpGO0lBS0k7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7O0FBSUo7RUFDRTtFQUNBO0VBQ0E7O0FBQ0E7RUFKRjtJQUtJO0lBQ0E7OztBQUVGO0VBUkY7SUFTSTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztFQUNBO0lBQ0U7O0VBRUY7SUFDRTs7O0FBSU47RUFFRTs7QUFHRjtFQUNFO0VBQ0E7O0FBQ0E7RUFIRjtJQUlJO0lBQ0E7OztBQUlKO0VBQ0U7O0FBR0Y7RUFDRTs7QUFHRjtFQUVFO0VBQ0E7RUFDQTtFQUNBOztBQUNBO0VBTkY7SUFPSTs7O0FBRUY7RUFURjtJQVVJOzs7QUFHSjtFQUNFOzs7QUFLTjtFQUNFO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBS047RUFDRTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFPRTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQUNFO0VBQ0E7OztBQVVGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFDRTs7O0FBS0o7RUFDRTtFQUNBO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0VBR0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBSUo7RUFDRTs7QUFHRjtFQUNFOzs7QUFLTjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0VBR0U7OztBQUdGO0VBQ0U7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7QUFBQTtFQUVFOztBQUdGO0VBQ0U7OztBQUtOO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFOztBQUNBO0VBQ0U7OztBQUlKO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtFQUVFO0VBQ0E7OztBQUdGO0VBQ0U7OztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtBQUFBO0VBRUU7RUFDQTtFQUdBO0VBQ0E7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSEE7QUFBQTtFQUNFOzs7QUFpQkY7RUFDRTs7O0FBSUo7RUFDRTtFQUNBOzs7QUFHRjtBQUFBO0VBRUU7RUFDQTtFQUNBO0VBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIExheW91dCBicmVha3BvaW50c1xuICogJG1vYmlsZTogc2NyZWVuIHdpZHRoIGJlbG93IHRoaXMgdmFsdWUgd2lsbCB1c2UgbW9iaWxlIHN0eWxlc1xuICogJGRlc2t0b3A6IHNjcmVlbiB3aWR0aCBhYm92ZSB0aGlzIHZhbHVlIHdpbGwgdXNlIGRlc2t0b3Agc3R5bGVzXG4gKiBTY3JlZW4gd2lkdGggYmV0d2VlbiAkbW9iaWxlIGFuZCAkZGVza3RvcCB3aWR0aCB3aWxsIHVzZSB0aGUgdGFibGV0IGxheW91dC5cbiAqIGFzc3VtaW5nIG1vYmlsZSA8IGRlc2t0b3BcbiAqL1xuJGJyZWFrcG9pbnRzOiAoXG4gIG1vYmlsZTogODAwcHgsXG4gIGRlc2t0b3A6IDEyMDBweCxcbik7XG5cbiRtb2JpbGU6IFwiKG1heC13aWR0aDogI3ttYXAtZ2V0KCRicmVha3BvaW50cywgbW9iaWxlKX0pXCI7XG4kdGFibGV0OiBcIihtaW4td2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIG1vYmlsZSl9KSBhbmQgKG1heC13aWR0aDogI3ttYXAtZ2V0KCRicmVha3BvaW50cywgZGVza3RvcCl9KVwiO1xuJGRlc2t0b3A6IFwiKG1heC13aWR0aDogI3ttYXAtZ2V0KCRicmVha3BvaW50cywgZGVza3RvcCl9KVwiO1xuXG4kcGFnZVdpZHRoOiAje21hcC1nZXQoJGJyZWFrcG9pbnRzLCBtb2JpbGUpfTtcbiRzaWRlUGFuZWxXaWR0aDogMzIwcHg7IC8vMzgwcHg7XG4kdG9wU3BhY2luZzogNnJlbTtcbiRib2xkV2VpZ2h0OiA3MDA7XG4kc2VtaUJvbGRXZWlnaHQ6IDYwMDtcbiRub3JtYWxXZWlnaHQ6IDQwMDtcblxuJG1vYmlsZUdyaWQ6IChcbiAgdGVtcGxhdGVSb3dzOiBcImF1dG8gYXV0byBhdXRvIGF1dG8gYXV0b1wiLFxuICB0ZW1wbGF0ZUNvbHVtbnM6IFwiYXV0b1wiLFxuICByb3dHYXA6IFwiNXB4XCIsXG4gIGNvbHVtbkdhcDogXCI1cHhcIixcbiAgdGVtcGxhdGVBcmVhczpcbiAgICAnXCJncmlkLXNpZGViYXItbGVmdFwiXFxcbiAgICAgIFwiZ3JpZC1oZWFkZXJcIlxcXG4gICAgICBcImdyaWQtY2VudGVyXCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtZm9vdGVyXCInLFxuKTtcbiR0YWJsZXRHcmlkOiAoXG4gIHRlbXBsYXRlUm93czogXCJhdXRvIGF1dG8gYXV0byBhdXRvXCIsXG4gIHRlbXBsYXRlQ29sdW1uczogXCIjeyRzaWRlUGFuZWxXaWR0aH0gYXV0b1wiLFxuICByb3dHYXA6IFwiNXB4XCIsXG4gIGNvbHVtbkdhcDogXCI1cHhcIixcbiAgdGVtcGxhdGVBcmVhczpcbiAgICAnXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWhlYWRlclwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1jZW50ZXJcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtc2lkZWJhci1yaWdodFwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1mb290ZXJcIicsXG4pO1xuJGRlc2t0b3BHcmlkOiAoXG4gIHRlbXBsYXRlUm93czogXCJhdXRvIGF1dG8gYXV0b1wiLFxuICB0ZW1wbGF0ZUNvbHVtbnM6IFwiI3skc2lkZVBhbmVsV2lkdGh9IGF1dG8gI3skc2lkZVBhbmVsV2lkdGh9XCIsXG4gIHJvd0dhcDogXCI1cHhcIixcbiAgY29sdW1uR2FwOiBcIjVweFwiLFxuICB0ZW1wbGF0ZUFyZWFzOlxuICAgICdcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtaGVhZGVyIGdyaWQtc2lkZWJhci1yaWdodFwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1jZW50ZXIgZ3JpZC1zaWRlYmFyLXJpZ2h0XCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWZvb3RlciBncmlkLXNpZGViYXItcmlnaHRcIicsXG4pO1xuIiwiY29kZVtkYXRhLXRoZW1lKj1cIiBcIl0ge1xuICBjb2xvcjogdmFyKC0tc2hpa2ktbGlnaHQpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlraS1saWdodC1iZyk7XG59XG5cbmNvZGVbZGF0YS10aGVtZSo9XCIgXCJdIHNwYW4ge1xuICBjb2xvcjogdmFyKC0tc2hpa2ktbGlnaHQpO1xufVxuXG5bc2F2ZWQtdGhlbWU9XCJkYXJrXCJdIGNvZGVbZGF0YS10aGVtZSo9XCIgXCJdIHtcbiAgY29sb3I6IHZhcigtLXNoaWtpLWRhcmspO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlraS1kYXJrLWJnKTtcbn1cblxuW3NhdmVkLXRoZW1lPVwiZGFya1wiXSBjb2RlW2RhdGEtdGhlbWUqPVwiIFwiXSBzcGFuIHtcbiAgY29sb3I6IHZhcigtLXNoaWtpLWRhcmspO1xufVxuIiwiQHVzZSBcIi4vdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuQHVzZSBcInNhc3M6Y29sb3JcIjtcblxuLmNhbGxvdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZyk7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMCAxcmVtO1xuICBvdmVyZmxvdy15OiBoaWRkZW47XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4zcyBlYXNlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICYgPiAuY2FsbG91dC1jb250ZW50ID4gOmZpcnN0LWNoaWxkIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG5cbiAgLS1jYWxsb3V0LWljb24tbm90ZTogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PGxpbmUgeDE9XCIxOFwiIHkxPVwiMlwiIHgyPVwiMjJcIiB5Mj1cIjZcIj48L2xpbmU+PHBhdGggZD1cIk03LjUgMjAuNSAxOSA5bC00LTRMMy41IDE2LjUgMiAyMnpcIj48L3BhdGg+PC9zdmc+Jyk7XG4gIC0tY2FsbG91dC1pY29uLWFic3RyYWN0OiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCwgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cmVjdCB4PVwiOFwiIHk9XCIyXCIgd2lkdGg9XCI4XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMVwiIHJ5PVwiMVwiPjwvcmVjdD48cGF0aCBkPVwiTTE2IDRoMmEyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJINmEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMmgyXCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTIgMTFoNFwiPjwvcGF0aD48cGF0aCBkPVwiTTEyIDE2aDRcIj48L3BhdGg+PHBhdGggZD1cIk04IDExaC4wMVwiPjwvcGF0aD48cGF0aCBkPVwiTTggMTZoLjAxXCI+PC9wYXRoPjwvc3ZnPicpO1xuICAtLWNhbGxvdXQtaWNvbi1pbmZvOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCwgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjEwXCI+PC9jaXJjbGU+PGxpbmUgeDE9XCIxMlwiIHkxPVwiMTZcIiB4Mj1cIjEyXCIgeTI9XCIxMlwiPjwvbGluZT48bGluZSB4MT1cIjEyXCIgeTE9XCI4XCIgeDI9XCIxMi4wMVwiIHkyPVwiOFwiPjwvbGluZT48L3N2Zz4nKTtcbiAgLS1jYWxsb3V0LWljb24tdG9kbzogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggZD1cIk0xMiAyMmM1LjUyMyAwIDEwLTQuNDc3IDEwLTEwUzE3LjUyMyAyIDEyIDIgMiA2LjQ3NyAyIDEyczQuNDc3IDEwIDEwIDEwelwiPjwvcGF0aD48cGF0aCBkPVwibTkgMTIgMiAyIDQtNFwiPjwvcGF0aD48L3N2Zz4nKTtcbiAgLS1jYWxsb3V0LWljb24tdGlwOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCw8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNOC41IDE0LjVBMi41IDIuNSAwIDAgMCAxMSAxMmMwLTEuMzgtLjUtMi0xLTMtMS4wNzItMi4xNDMtLjIyNC00LjA1NCAyLTYgLjUgMi41IDIgNC45IDQgNi41IDIgMS42IDMgMy41IDMgNS41YTcgNyAwIDEgMS0xNCAwYzAtMS4xNTMuNDMzLTIuMjk0IDEtM2EyLjUgMi41IDAgMCAwIDIuNSAyLjV6XCI+PC9wYXRoPjwvc3ZnPiAnKTtcbiAgLS1jYWxsb3V0LWljb24tc3VjY2VzczogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cG9seWxpbmUgcG9pbnRzPVwiMjAgNiA5IDE3IDQgMTJcIj48L3BvbHlsaW5lPjwvc3ZnPiAnKTtcbiAgLS1jYWxsb3V0LWljb24tcXVlc3Rpb246IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiPjwvY2lyY2xlPjxwYXRoIGQ9XCJNOS4wOSA5YTMgMyAwIDAgMSA1LjgzIDFjMCAyLTMgMy0zIDNcIj48L3BhdGg+PGxpbmUgeDE9XCIxMlwiIHkxPVwiMTdcIiB4Mj1cIjEyLjAxXCIgeTI9XCIxN1wiPjwvbGluZT48L3N2Zz4gJyk7XG4gIC0tY2FsbG91dC1pY29uLXdhcm5pbmc6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LCA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJtMjEuNzMgMTgtOC0xNGEyIDIgMCAwIDAtMy40OCAwbC04IDE0QTIgMiAwIDAgMCA0IDIxaDE2YTIgMiAwIDAgMCAxLjczLTNaXCI+PC9wYXRoPjxsaW5lIHgxPVwiMTJcIiB5MT1cIjlcIiB4Mj1cIjEyXCIgeTI9XCIxM1wiPjwvbGluZT48bGluZSB4MT1cIjEyXCIgeTE9XCIxN1wiIHgyPVwiMTIuMDFcIiB5Mj1cIjE3XCI+PC9saW5lPjwvc3ZnPicpO1xuICAtLWNhbGxvdXQtaWNvbi1mYWlsdXJlOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCw8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxsaW5lIHgxPVwiMThcIiB5MT1cIjZcIiB4Mj1cIjZcIiB5Mj1cIjE4XCI+PC9saW5lPjxsaW5lIHgxPVwiNlwiIHkxPVwiNlwiIHgyPVwiMThcIiB5Mj1cIjE4XCI+PC9saW5lPjwvc3ZnPiAnKTtcbiAgLS1jYWxsb3V0LWljb24tZGFuZ2VyOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCw8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwb2x5Z29uIHBvaW50cz1cIjEzIDIgMyAxNCAxMiAxNCAxMSAyMiAyMSAxMCAxMiAxMCAxMyAyXCI+PC9wb2x5Z29uPjwvc3ZnPiAnKTtcbiAgLS1jYWxsb3V0LWljb24tYnVnOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCwgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cmVjdCB3aWR0aD1cIjhcIiBoZWlnaHQ9XCIxNFwiIHg9XCI4XCIgeT1cIjZcIiByeD1cIjRcIj48L3JlY3Q+PHBhdGggZD1cIm0xOSA3LTMgMlwiPjwvcGF0aD48cGF0aCBkPVwibTUgNyAzIDJcIj48L3BhdGg+PHBhdGggZD1cIm0xOSAxOS0zLTJcIj48L3BhdGg+PHBhdGggZD1cIm01IDE5IDMtMlwiPjwvcGF0aD48cGF0aCBkPVwiTTIwIDEzaC00XCI+PC9wYXRoPjxwYXRoIGQ9XCJNNCAxM2g0XCI+PC9wYXRoPjxwYXRoIGQ9XCJtMTAgNCAxIDJcIj48L3BhdGg+PHBhdGggZD1cIm0xNCA0LTEgMlwiPjwvcGF0aD48L3N2Zz4nKTtcbiAgLS1jYWxsb3V0LWljb24tZXhhbXBsZTogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48bGluZSB4MT1cIjhcIiB5MT1cIjZcIiB4Mj1cIjIxXCIgeTI9XCI2XCI+PC9saW5lPjxsaW5lIHgxPVwiOFwiIHkxPVwiMTJcIiB4Mj1cIjIxXCIgeTI9XCIxMlwiPjwvbGluZT48bGluZSB4MT1cIjhcIiB5MT1cIjE4XCIgeDI9XCIyMVwiIHkyPVwiMThcIj48L2xpbmU+PGxpbmUgeDE9XCIzXCIgeTE9XCI2XCIgeDI9XCIzLjAxXCIgeTI9XCI2XCI+PC9saW5lPjxsaW5lIHgxPVwiM1wiIHkxPVwiMTJcIiB4Mj1cIjMuMDFcIiB5Mj1cIjEyXCI+PC9saW5lPjxsaW5lIHgxPVwiM1wiIHkxPVwiMThcIiB4Mj1cIjMuMDFcIiB5Mj1cIjE4XCI+PC9saW5lPjwvc3ZnPiAnKTtcbiAgLS1jYWxsb3V0LWljb24tcXVvdGU6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LCA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNMyAyMWMzIDAgNy0xIDctOFY1YzAtMS4yNS0uNzU2LTIuMDE3LTItMkg0Yy0xLjI1IDAtMiAuNzUtMiAxLjk3MlYxMWMwIDEuMjUuNzUgMiAyIDIgMSAwIDEgMCAxIDF2MWMwIDEtMSAyLTIgMnMtMSAuMDA4LTEgMS4wMzFWMjBjMCAxIDAgMSAxIDF6XCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTUgMjFjMyAwIDctMSA3LThWNWMwLTEuMjUtLjc1Ny0yLjAxNy0yLTJoLTRjLTEuMjUgMC0yIC43NS0yIDEuOTcyVjExYzAgMS4yNS43NSAyIDIgMmguNzVjMCAyLjI1LjI1IDQtMi43NSA0djNjMCAxIDAgMSAxIDF6XCI+PC9wYXRoPjwvc3ZnPicpO1xuICAtLWNhbGxvdXQtaWNvbi1mb2xkOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiUzRSUzQ3BvbHlsaW5lIHBvaW50cz1cIjYgOSAxMiAxNSAxOCA5XCIlM0UlM0MvcG9seWxpbmUlM0UlM0Mvc3ZnJTNFJyk7XG5cbiAgJltkYXRhLWNhbGxvdXRdIHtcbiAgICAtLWNvbG9yOiAjNDQ4YWZmO1xuICAgIC0tYm9yZGVyOiAjNDQ4YWZmNDQ7XG4gICAgLS1iZzogIzQ0OGFmZjEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tbm90ZSk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cImFic3RyYWN0XCJdIHtcbiAgICAtLWNvbG9yOiAjMDBiMGZmO1xuICAgIC0tYm9yZGVyOiAjMDBiMGZmNDQ7XG4gICAgLS1iZzogIzAwYjBmZjEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tYWJzdHJhY3QpO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJpbmZvXCJdLFxuICAmW2RhdGEtY2FsbG91dD1cInRvZG9cIl0ge1xuICAgIC0tY29sb3I6ICMwMGI4ZDQ7XG4gICAgLS1ib3JkZXI6ICMwMGI4ZDQ0NDtcbiAgICAtLWJnOiAjMDBiOGQ0MTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1pbmZvKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwidG9kb1wiXSB7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi10b2RvKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwidGlwXCJdIHtcbiAgICAtLWNvbG9yOiAjMDBiZmE1O1xuICAgIC0tYm9yZGVyOiAjMDBiZmE1NDQ7XG4gICAgLS1iZzogIzAwYmZhNTEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tdGlwKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwic3VjY2Vzc1wiXSB7XG4gICAgLS1jb2xvcjogIzA5YWQ3YTtcbiAgICAtLWJvcmRlcjogIzA5YWQ3MTQ0O1xuICAgIC0tYmc6ICMwOWFkNzExMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLXN1Y2Nlc3MpO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJxdWVzdGlvblwiXSB7XG4gICAgLS1jb2xvcjogI2RiYTY0MjtcbiAgICAtLWJvcmRlcjogI2RiYTY0MjQ0O1xuICAgIC0tYmc6ICNkYmE2NDIxMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLXF1ZXN0aW9uKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwid2FybmluZ1wiXSB7XG4gICAgLS1jb2xvcjogI2RiODk0MjtcbiAgICAtLWJvcmRlcjogI2RiODk0MjQ0O1xuICAgIC0tYmc6ICNkYjg5NDIxMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLXdhcm5pbmcpO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJmYWlsdXJlXCJdLFxuICAmW2RhdGEtY2FsbG91dD1cImRhbmdlclwiXSxcbiAgJltkYXRhLWNhbGxvdXQ9XCJidWdcIl0ge1xuICAgIC0tY29sb3I6ICNkYjQyNDI7XG4gICAgLS1ib3JkZXI6ICNkYjQyNDI0NDtcbiAgICAtLWJnOiAjZGI0MjQyMTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1mYWlsdXJlKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwiYnVnXCJdIHtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLWJ1Zyk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cImRhbmdlclwiXSB7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1kYW5nZXIpO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJleGFtcGxlXCJdIHtcbiAgICAtLWNvbG9yOiAjN2E0M2I1O1xuICAgIC0tYm9yZGVyOiAjN2E0M2I1NDQ7XG4gICAgLS1iZzogIzdhNDNiNTEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tZXhhbXBsZSk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cInF1b3RlXCJdIHtcbiAgICAtLWNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuICAgIC0tYm9yZGVyOiB2YXIoLS1saWdodGdyYXkpO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tcXVvdGUpO1xuICB9XG5cbiAgJi5pcy1jb2xsYXBzZWQgPiAuY2FsbG91dC10aXRsZSA+IC5mb2xkLWNhbGxvdXQtaWNvbiB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVaKC05MGRlZyk7XG4gIH1cbn1cblxuLmNhbGxvdXQtdGl0bGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiA1cHg7XG4gIHBhZGRpbmc6IDFyZW0gMDtcbiAgY29sb3I6IHZhcigtLWNvbG9yKTtcblxuICAtLWljb24tc2l6ZTogMThweDtcblxuICAmIC5mb2xkLWNhbGxvdXQtaWNvbiB7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzIGVhc2U7XG4gICAgb3BhY2l0eTogMC44O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLWZvbGQpO1xuICB9XG5cbiAgJiA+IC5jYWxsb3V0LXRpdGxlLWlubmVyID4gcCB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yKTtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAuY2FsbG91dC1pY29uLFxuICAmIC5mb2xkLWNhbGxvdXQtaWNvbiB7XG4gICAgd2lkdGg6IHZhcigtLWljb24tc2l6ZSk7XG4gICAgaGVpZ2h0OiB2YXIoLS1pY29uLXNpemUpO1xuICAgIGZsZXg6IDAgMCB2YXIoLS1pY29uLXNpemUpO1xuXG4gICAgLy8gaWNvbiBzdXBwb3J0XG4gICAgYmFja2dyb3VuZC1zaXplOiB2YXIoLS1pY29uLXNpemUpIHZhcigtLWljb24tc2l6ZSk7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yKTtcbiAgICBtYXNrLWltYWdlOiB2YXIoLS1jYWxsb3V0LWljb24pO1xuICAgIG1hc2stc2l6ZTogdmFyKC0taWNvbi1zaXplKSB2YXIoLS1pY29uLXNpemUpO1xuICAgIG1hc2stcG9zaXRpb246IGNlbnRlcjtcbiAgICBtYXNrLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIHBhZGRpbmc6IDAuMnJlbSAwO1xuICB9XG5cbiAgLmNhbGxvdXQtdGl0bGUtaW5uZXIge1xuICAgIGZvbnQtd2VpZ2h0OiAkc2VtaUJvbGRXZWlnaHQ7XG4gIH1cbn1cbiIsIkB1c2UgXCIuL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcbkB1c2UgXCIuL3N5bnRheC5zY3NzXCI7XG5AdXNlIFwiLi9jYWxsb3V0cy5zY3NzXCI7XG5cbmh0bWwge1xuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbiAgdGV4dC1zaXplLWFkanVzdDogbm9uZTtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICB3aWR0aDogMTAwdnc7XG59XG5cbmJvZHksXG5zZWN0aW9uIHtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodCk7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1ib2R5Rm9udCk7XG4gIGNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XG59XG5cbi50ZXh0LWhpZ2hsaWdodCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRleHRIaWdobGlnaHQpO1xuICBwYWRkaW5nOiAwIDAuMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuOjpzZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0tdGVydGlhcnkpIDYwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSk7XG4gIGNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XG59XG5cbnAsXG51bCxcbnRleHQsXG5hLFxudHIsXG50ZCxcbmxpLFxub2wsXG51bCxcbi5rYXRleCxcbi5tYXRoIHtcbiAgY29sb3I6IHZhcigtLWRhcmtncmF5KTtcbiAgZmlsbDogdmFyKC0tZGFya2dyYXkpO1xuICBoeXBoZW5zOiBhdXRvO1xufVxuXG5wLFxudWwsXG50ZXh0LFxuYSxcbmxpLFxub2wsXG51bCxcbi5rYXRleCxcbi5tYXRoIHtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG4gIC8qIHRyIGFuZCB0ZCByZW1vdmVkIGZyb20gbGlzdCBvZiBzZWxlY3RvcnMgZm9yIG92ZXJmbG93LXdyYXAsIGFsbG93aW5nIHRoZW0gdG8gdXNlIGRlZmF1bHQgJ25vcm1hbCcgcHJvcGVydHkgdmFsdWUgKi9cbn1cblxuLm1hdGgge1xuICAmLm1hdGgtZGlzcGxheSB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG59XG5cbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiAkc2VtaUJvbGRXZWlnaHQ7XG59XG5cbmEge1xuICBmb250LXdlaWdodDogJHNlbWlCb2xkV2VpZ2h0O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZTtcbiAgY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRlcnRpYXJ5KSAhaW1wb3J0YW50O1xuICB9XG5cbiAgJi5pbnRlcm5hbCB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpZ2hsaWdodCk7XG4gICAgcGFkZGluZzogMCAwLjFyZW07XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjRyZW07XG5cbiAgICAmOmhhcyg+IGltZykge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbiAgICAmLnRhZy1saW5rIHtcbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IFwiI1wiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYuZXh0ZXJuYWwgLmV4dGVybmFsLWljb24ge1xuICAgIGhlaWdodDogMWV4O1xuICAgIG1hcmdpbjogMCAwLjE1ZW07XG5cbiAgICA+IHBhdGgge1xuICAgICAgZmlsbDogdmFyKC0tZGFyayk7XG4gICAgfVxuICB9XG59XG5cbi5kZXNrdG9wLW9ubHkge1xuICBkaXNwbGF5OiBpbml0aWFsO1xuICBAbWVkaWEgYWxsIGFuZCAoJG1vYmlsZSkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuLm1vYmlsZS1vbmx5IHtcbiAgZGlzcGxheTogbm9uZTtcbiAgQG1lZGlhIGFsbCBhbmQgKCRtb2JpbGUpIHtcbiAgICBkaXNwbGF5OiBpbml0aWFsO1xuICB9XG59XG5cbi5wYWdlIHtcbiAgbWF4LXdpZHRoOiBjYWxjKCN7bWFwLWdldCgkYnJlYWtwb2ludHMsIGRlc2t0b3ApfSArIDMwMHB4KTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gICYgYXJ0aWNsZSB7XG4gICAgJiA+IGgxIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICB9XG5cbiAgICAmIGxpOmhhcyg+IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSkge1xuICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgIH1cblxuICAgICYgbGk6aGFzKD4gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQpIHtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiB2YXIoLS1ncmF5KTtcbiAgICAgIGNvbG9yOiB2YXIoLS1ncmF5KTtcbiAgICB9XG5cbiAgICAmIGxpID4gKiB7XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICBwID4gc3Ryb25nIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgICB9XG4gIH1cblxuICAmID4gI3F1YXJ0ei1ib2R5IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogI3ttYXAtZ2V0KCRkZXNrdG9wR3JpZCwgdGVtcGxhdGVDb2x1bW5zKX07XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAje21hcC1nZXQoJGRlc2t0b3BHcmlkLCB0ZW1wbGF0ZVJvd3MpfTtcbiAgICBjb2x1bW4tZ2FwOiAje21hcC1nZXQoJGRlc2t0b3BHcmlkLCBjb2x1bW5HYXApfTtcbiAgICByb3ctZ2FwOiAje21hcC1nZXQoJGRlc2t0b3BHcmlkLCByb3dHYXApfTtcbiAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiAje21hcC1nZXQoJGRlc2t0b3BHcmlkLCB0ZW1wbGF0ZUFyZWFzKX07XG4gICAgQG1lZGlhIGFsbCBhbmQgKCRkZXNrdG9wKSB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICN7bWFwLWdldCgkdGFibGV0R3JpZCwgdGVtcGxhdGVDb2x1bW5zKX07XG4gICAgICBncmlkLXRlbXBsYXRlLXJvd3M6ICN7bWFwLWdldCgkdGFibGV0R3JpZCwgdGVtcGxhdGVSb3dzKX07XG4gICAgICBjb2x1bW4tZ2FwOiAje21hcC1nZXQoJHRhYmxldEdyaWQsIGNvbHVtbkdhcCl9O1xuICAgICAgcm93LWdhcDogI3ttYXAtZ2V0KCR0YWJsZXRHcmlkLCByb3dHYXApfTtcbiAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICN7bWFwLWdldCgkdGFibGV0R3JpZCwgdGVtcGxhdGVBcmVhcyl9O1xuICAgIH1cbiAgICBAbWVkaWEgYWxsIGFuZCAoJG1vYmlsZSkge1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAje21hcC1nZXQoJG1vYmlsZUdyaWQsIHRlbXBsYXRlQ29sdW1ucyl9O1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAje21hcC1nZXQoJG1vYmlsZUdyaWQsIHRlbXBsYXRlUm93cyl9O1xuICAgICAgY29sdW1uLWdhcDogI3ttYXAtZ2V0KCRtb2JpbGVHcmlkLCBjb2x1bW5HYXApfTtcbiAgICAgIHJvdy1nYXA6ICN7bWFwLWdldCgkbW9iaWxlR3JpZCwgcm93R2FwKX07XG4gICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiAje21hcC1nZXQoJG1vYmlsZUdyaWQsIHRlbXBsYXRlQXJlYXMpfTtcbiAgICB9XG5cbiAgICBAbWVkaWEgYWxsIGFuZCAoJGRlc2t0b3ApIHtcbiAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICB9XG4gICAgQG1lZGlhIGFsbCBhbmQgKCRtb2JpbGUpIHtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH1cblxuICAgICYgLnNpZGViYXIge1xuICAgICAgZ2FwOiAycmVtO1xuICAgICAgdG9wOiAwO1xuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIHBhZGRpbmc6ICR0b3BTcGFjaW5nIDJyZW0gMnJlbSAycmVtO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgIH1cblxuICAgICYgLnNpZGViYXIubGVmdCB7XG4gICAgICB6LWluZGV4OiAxO1xuICAgICAgZ3JpZC1hcmVhOiBncmlkLXNpZGViYXItbGVmdDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBAbWVkaWEgYWxsIGFuZCAoJG1vYmlsZSkge1xuICAgICAgICBnYXA6IDA7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiBpbml0aWFsO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBoZWlnaHQ6IHVuc2V0O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBwYWRkaW5nLXRvcDogMnJlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmIC5zaWRlYmFyLnJpZ2h0IHtcbiAgICAgIGdyaWQtYXJlYTogZ3JpZC1zaWRlYmFyLXJpZ2h0O1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIEBtZWRpYSBhbGwgYW5kICgkbW9iaWxlKSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBpbmhlcml0O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IGluaGVyaXQ7XG4gICAgICB9XG4gICAgICBAbWVkaWEgYWxsIGFuZCAoJGRlc2t0b3ApIHtcbiAgICAgICAgcG9zaXRpb246IGluaXRpYWw7XG4gICAgICAgIGhlaWdodDogdW5zZXQ7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAmID4gKiB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgfVxuICAgICAgICAmID4gLnRvYyB7XG4gICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAmIC5wYWdlLWhlYWRlcixcbiAgICAmIC5wYWdlLWZvb3RlciB7XG4gICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgIH1cblxuICAgICYgLnBhZ2UtaGVhZGVyIHtcbiAgICAgIGdyaWQtYXJlYTogZ3JpZC1oZWFkZXI7XG4gICAgICBtYXJnaW46ICR0b3BTcGFjaW5nIDAgMCAwO1xuICAgICAgQG1lZGlhIGFsbCBhbmQgKCRtb2JpbGUpIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmIC5jZW50ZXIgPiBhcnRpY2xlIHtcbiAgICAgIGdyaWQtYXJlYTogZ3JpZC1jZW50ZXI7XG4gICAgfVxuXG4gICAgJiBmb290ZXIge1xuICAgICAgZ3JpZC1hcmVhOiBncmlkLWZvb3RlcjtcbiAgICB9XG5cbiAgICAmIC5jZW50ZXIsXG4gICAgJiBmb290ZXIge1xuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgbWluLXdpZHRoOiAxMDAlO1xuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICBAbWVkaWEgYWxsIGFuZCAoJGRlc2t0b3ApIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgfVxuICAgICAgQG1lZGlhIGFsbCBhbmQgKCRtb2JpbGUpIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICB9XG4gICAgfVxuICAgICYgZm9vdGVyIHtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIH1cbiAgfVxufVxuXG4uZm9vdG5vdGVzIHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWxpZ2h0Z3JheSk7XG59XG5cbmlucHV0W3R5cGU9XCJjaGVja2JveFwiXSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgycHgpO1xuICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodCk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWlubGluZS1lbmQ6IDAuMnJlbTtcbiAgbWFyZ2luLWlubGluZS1zdGFydDogLTEuNHJlbTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcblxuICAmOmNoZWNrZWQge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuXG4gICAgJjo6YWZ0ZXIge1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6IDRweDtcbiAgICAgIHRvcDogMXB4O1xuICAgICAgd2lkdGg6IDRweDtcbiAgICAgIGhlaWdodDogOHB4O1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBib3JkZXI6IHNvbGlkIHZhcigtLWxpZ2h0KTtcbiAgICAgIGJvcmRlci13aWR0aDogMCAycHggMnB4IDA7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgfVxuICB9XG59XG5cbmJsb2NrcXVvdGUge1xuICBtYXJnaW46IDFyZW0gMDtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCB2YXIoLS1zZWNvbmRhcnkpO1xuICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzIGVhc2U7XG59XG5cbmgxLFxuaDIsXG5oMyxcbmg0LFxuaDUsXG5oNixcbnRoZWFkIHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWhlYWRlckZvbnQpO1xuICBjb2xvcjogdmFyKC0tZGFyayk7XG4gIGZvbnQtd2VpZ2h0OiByZXZlcnQ7XG4gIG1hcmdpbi1ib3R0b206IDA7XG5cbiAgYXJ0aWNsZSA+ICYgPiBhW3JvbGU9XCJhbmNob3JcIl0ge1xuICAgIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxufVxuXG5oMSxcbmgyLFxuaDMsXG5oNCxcbmg1LFxuaDYge1xuICAmW2lkXSA+IGFbaHJlZl49XCIjXCJdIHtcbiAgICBtYXJnaW46IDAgMC41cmVtO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjFyZW0pO1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1jb2RlRm9udCk7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIH1cblxuICAmW2lkXTpob3ZlciA+IGEge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuLy8gdHlwb2dyYXBoeSBpbXByb3ZlbWVudHNcbmgxIHtcbiAgZm9udC1zaXplOiAxLjc1cmVtO1xuICBtYXJnaW4tdG9wOiAyLjI1cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG5oMiB7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICBtYXJnaW4tdG9wOiAxLjlyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbmgzIHtcbiAgZm9udC1zaXplOiAxLjEycmVtO1xuICBtYXJnaW4tdG9wOiAxLjYycmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG5oNCxcbmg1LFxuaDYge1xuICBmb250LXNpemU6IDFyZW07XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuZmlndXJlW2RhdGEtcmVoeXBlLXByZXR0eS1jb2RlLWZpZ3VyZV0ge1xuICBtYXJnaW46IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGluZS1oZWlnaHQ6IDEuNnJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICYgPiBbZGF0YS1yZWh5cGUtcHJldHR5LWNvZGUtdGl0bGVdIHtcbiAgICBmb250LWZhbWlseTogdmFyKC0tY29kZUZvbnQpO1xuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIHBhZGRpbmc6IDAuMXJlbSAwLjVyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgICB3aWR0aDogbWF4LWNvbnRlbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IC0wLjVyZW07XG4gICAgY29sb3I6IHZhcigtLWRhcmtncmF5KTtcbiAgfVxuXG4gICYgPiBwcmUge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbn1cblxucHJlIHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWNvZGVGb250KTtcbiAgcGFkZGluZzogMCAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgb3ZlcmZsb3cteDogYXV0bztcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6aGFzKD4gY29kZS5tZXJtYWlkKSB7XG4gICAgYm9yZGVyOiBub25lO1xuICB9XG5cbiAgJiA+IGNvZGUge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgY291bnRlci1yZXNldDogbGluZTtcbiAgICBjb3VudGVyLWluY3JlbWVudDogbGluZSAwO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgcGFkZGluZzogMC41cmVtIDA7XG4gICAgb3ZlcmZsb3cteDogYXV0bztcblxuICAgICYgW2RhdGEtaGlnaGxpZ2h0ZWQtY2hhcnNdIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpZ2hsaWdodCk7XG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgfVxuXG4gICAgJiA+IFtkYXRhLWxpbmVdIHtcbiAgICAgIHBhZGRpbmc6IDAgMC4yNXJlbTtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHRyYW5zcGFyZW50O1xuXG4gICAgICAmW2RhdGEtaGlnaGxpZ2h0ZWQtbGluZV0ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaWdobGlnaHQpO1xuICAgICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHZhcigtLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IGNvdW50ZXIobGluZSk7XG4gICAgICAgIGNvdW50ZXItaW5jcmVtZW50OiBsaW5lO1xuICAgICAgICB3aWR0aDogMXJlbTtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBjb2xvcjogcmdiYSgxMTUsIDEzOCwgMTQ4LCAwLjYpO1xuICAgICAgfVxuICAgIH1cblxuICAgICZbZGF0YS1saW5lLW51bWJlcnMtbWF4LWRpZ2l0cz1cIjJcIl0gPiBbZGF0YS1saW5lXTo6YmVmb3JlIHtcbiAgICAgIHdpZHRoOiAycmVtO1xuICAgIH1cblxuICAgICZbZGF0YS1saW5lLW51bWJlcnMtbWF4LWRpZ2l0cz1cIjNcIl0gPiBbZGF0YS1saW5lXTo6YmVmb3JlIHtcbiAgICAgIHdpZHRoOiAzcmVtO1xuICAgIH1cbiAgfVxufVxuXG5jb2RlIHtcbiAgZm9udC1zaXplOiAwLjllbTtcbiAgY29sb3I6IHZhcigtLWRhcmspO1xuICBmb250LWZhbWlseTogdmFyKC0tY29kZUZvbnQpO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDAuMXJlbSAwLjJyZW07XG4gIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0Z3JheSk7XG59XG5cbnRib2R5LFxubGksXG5wIHtcbiAgbGluZS1oZWlnaHQ6IDEuNnJlbTtcbn1cblxuLnRhYmxlLWNvbnRhaW5lciB7XG4gIG92ZXJmbG93LXg6IGF1dG87XG5cbiAgJiA+IHRhYmxlIHtcbiAgICBtYXJnaW46IDFyZW07XG4gICAgcGFkZGluZzogMS41cmVtO1xuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG5cbiAgICB0aCxcbiAgICB0ZCB7XG4gICAgICBtaW4td2lkdGg6IDc1cHg7XG4gICAgfVxuXG4gICAgJiA+ICoge1xuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XG4gICAgfVxuICB9XG59XG5cbnRoIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZzogMC40cmVtIDAuN3JlbTtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWdyYXkpO1xufVxuXG50ZCB7XG4gIHBhZGRpbmc6IDAuMnJlbSAwLjdyZW07XG59XG5cbnRyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWxpZ2h0Z3JheSk7XG4gICY6bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgfVxufVxuXG5pbWcge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgbWFyZ2luOiAxcmVtIDA7XG59XG5cbnAgPiBpbWcgKyBlbSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFyZW0pO1xufVxuXG5ociB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDJyZW0gYXV0bztcbiAgaGVpZ2h0OiAxcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHRncmF5KTtcbn1cblxuYXVkaW8sXG52aWRlbyB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuZGl2Omhhcyg+IC5vdmVyZmxvdykge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xufVxuXG51bC5vdmVyZmxvdyxcbm9sLm92ZXJmbG93IHtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcblxuICAvLyBjbGVhcmZpeFxuICBjb250ZW50OiBcIlwiO1xuICBjbGVhcjogYm90aDtcblxuICAmID4gbGk6bGFzdC1vZi10eXBlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICB9XG4gIC8qJjphZnRlciB7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgY29udGVudDogXCJcIjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDBweCwgdmFyKC0tbGlnaHQpKTtcbiAgfSovXG59XG5cbi50cmFuc2NsdWRlIHtcbiAgdWwge1xuICAgIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgfVxufVxuXG4ua2F0ZXgtZGlzcGxheSB7XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcbn1cblxuLmV4dGVybmFsLWVtYmVkLnlvdXR1YmUsXG5pZnJhbWUucGRmIHtcbiAgYXNwZWN0LXJhdGlvOiAxNiAvIDk7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cbiJdfQ== */`;var popover_default=`/**
 * Layout breakpoints
 * $mobile: screen width below this value will use mobile styles
 * $desktop: screen width above this value will use desktop styles
 * Screen width between $mobile and $desktop width will use the tablet layout.
 * assuming mobile < desktop
 */
@keyframes dropin {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  1% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
.popover {
  z-index: 999;
  position: absolute;
  overflow: visible;
  padding: 1rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.popover > .popover-inner {
  position: relative;
  width: 30rem;
  max-height: 20rem;
  padding: 0 1rem 1rem 1rem;
  font-weight: initial;
  font-style: initial;
  line-height: normal;
  font-size: initial;
  font-family: var(--bodyFont);
  border: 1px solid var(--lightgray);
  background-color: var(--light);
  border-radius: 5px;
  box-shadow: 6px 6px 36px 0 rgba(0, 0, 0, 0.25);
  overflow: auto;
  white-space: normal;
}
.popover > .popover-inner[data-content-type][data-content-type*=pdf], .popover > .popover-inner[data-content-type][data-content-type*=image] {
  padding: 0;
  max-height: 100%;
}
.popover > .popover-inner[data-content-type][data-content-type*=image] img {
  margin: 0;
  border-radius: 0;
  display: block;
}
.popover > .popover-inner[data-content-type][data-content-type*=pdf] iframe {
  width: 100%;
}
.popover h1 {
  font-size: 1.5rem;
}
@media all and ((max-width: 800px)) {
  .popover {
    display: none !important;
  }
}

a:hover .popover,
.popover:hover {
  animation: dropin 0.3s ease;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL1VzZXJzL29tYXIvV29ya3NwYWNlL25vdGVib29rL3NvdXJjZS9xdWFydHovY29tcG9uZW50cy9zdHlsZXMiLCJzb3VyY2VzIjpbIi4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2NzcyIsInBvcG92ZXIuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQ0VBO0VBQ0U7SUFDRTtJQUNBOztFQUVGO0lBQ0U7O0VBRUY7SUFDRTtJQUNBOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBOENBO0VBQ0E7RUFDQSxZQUNFOztBQS9DRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFJQTtFQUVFO0VBQ0E7O0FBSUE7RUFDRTtFQUNBO0VBQ0E7O0FBS0Y7RUFDRTs7QUFLTjtFQUNFOztBQVNGO0VBeERGO0lBeURJOzs7O0FBSUo7QUFBQTtFQUVFO0VBQ0E7RUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGF5b3V0IGJyZWFrcG9pbnRzXG4gKiAkbW9iaWxlOiBzY3JlZW4gd2lkdGggYmVsb3cgdGhpcyB2YWx1ZSB3aWxsIHVzZSBtb2JpbGUgc3R5bGVzXG4gKiAkZGVza3RvcDogc2NyZWVuIHdpZHRoIGFib3ZlIHRoaXMgdmFsdWUgd2lsbCB1c2UgZGVza3RvcCBzdHlsZXNcbiAqIFNjcmVlbiB3aWR0aCBiZXR3ZWVuICRtb2JpbGUgYW5kICRkZXNrdG9wIHdpZHRoIHdpbGwgdXNlIHRoZSB0YWJsZXQgbGF5b3V0LlxuICogYXNzdW1pbmcgbW9iaWxlIDwgZGVza3RvcFxuICovXG4kYnJlYWtwb2ludHM6IChcbiAgbW9iaWxlOiA4MDBweCxcbiAgZGVza3RvcDogMTIwMHB4LFxuKTtcblxuJG1vYmlsZTogXCIobWF4LXdpZHRoOiAje21hcC1nZXQoJGJyZWFrcG9pbnRzLCBtb2JpbGUpfSlcIjtcbiR0YWJsZXQ6IFwiKG1pbi13aWR0aDogI3ttYXAtZ2V0KCRicmVha3BvaW50cywgbW9iaWxlKX0pIGFuZCAobWF4LXdpZHRoOiAje21hcC1nZXQoJGJyZWFrcG9pbnRzLCBkZXNrdG9wKX0pXCI7XG4kZGVza3RvcDogXCIobWF4LXdpZHRoOiAje21hcC1nZXQoJGJyZWFrcG9pbnRzLCBkZXNrdG9wKX0pXCI7XG5cbiRwYWdlV2lkdGg6ICN7bWFwLWdldCgkYnJlYWtwb2ludHMsIG1vYmlsZSl9O1xuJHNpZGVQYW5lbFdpZHRoOiAzMjBweDsgLy8zODBweDtcbiR0b3BTcGFjaW5nOiA2cmVtO1xuJGJvbGRXZWlnaHQ6IDcwMDtcbiRzZW1pQm9sZFdlaWdodDogNjAwO1xuJG5vcm1hbFdlaWdodDogNDAwO1xuXG4kbW9iaWxlR3JpZDogKFxuICB0ZW1wbGF0ZVJvd3M6IFwiYXV0byBhdXRvIGF1dG8gYXV0byBhdXRvXCIsXG4gIHRlbXBsYXRlQ29sdW1uczogXCJhdXRvXCIsXG4gIHJvd0dhcDogXCI1cHhcIixcbiAgY29sdW1uR2FwOiBcIjVweFwiLFxuICB0ZW1wbGF0ZUFyZWFzOlxuICAgICdcImdyaWQtc2lkZWJhci1sZWZ0XCJcXFxuICAgICAgXCJncmlkLWhlYWRlclwiXFxcbiAgICAgIFwiZ3JpZC1jZW50ZXJcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1yaWdodFwiXFxcbiAgICAgIFwiZ3JpZC1mb290ZXJcIicsXG4pO1xuJHRhYmxldEdyaWQ6IChcbiAgdGVtcGxhdGVSb3dzOiBcImF1dG8gYXV0byBhdXRvIGF1dG9cIixcbiAgdGVtcGxhdGVDb2x1bW5zOiBcIiN7JHNpZGVQYW5lbFdpZHRofSBhdXRvXCIsXG4gIHJvd0dhcDogXCI1cHhcIixcbiAgY29sdW1uR2FwOiBcIjVweFwiLFxuICB0ZW1wbGF0ZUFyZWFzOlxuICAgICdcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtaGVhZGVyXCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWNlbnRlclwiXFxcbiAgICAgIFwiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1zaWRlYmFyLXJpZ2h0XCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWZvb3RlclwiJyxcbik7XG4kZGVza3RvcEdyaWQ6IChcbiAgdGVtcGxhdGVSb3dzOiBcImF1dG8gYXV0byBhdXRvXCIsXG4gIHRlbXBsYXRlQ29sdW1uczogXCIjeyRzaWRlUGFuZWxXaWR0aH0gYXV0byAjeyRzaWRlUGFuZWxXaWR0aH1cIixcbiAgcm93R2FwOiBcIjVweFwiLFxuICBjb2x1bW5HYXA6IFwiNXB4XCIsXG4gIHRlbXBsYXRlQXJlYXM6XG4gICAgJ1wiZ3JpZC1zaWRlYmFyLWxlZnQgZ3JpZC1oZWFkZXIgZ3JpZC1zaWRlYmFyLXJpZ2h0XCJcXFxuICAgICAgXCJncmlkLXNpZGViYXItbGVmdCBncmlkLWNlbnRlciBncmlkLXNpZGViYXItcmlnaHRcIlxcXG4gICAgICBcImdyaWQtc2lkZWJhci1sZWZ0IGdyaWQtZm9vdGVyIGdyaWQtc2lkZWJhci1yaWdodFwiJyxcbik7XG4iLCJAdXNlIFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcblxuQGtleWZyYW1lcyBkcm9waW4ge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbiAgMSUge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICB9XG59XG5cbi5wb3BvdmVyIHtcbiAgei1pbmRleDogOTk5O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xuICBwYWRkaW5nOiAxcmVtO1xuXG4gICYgPiAucG9wb3Zlci1pbm5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAzMHJlbTtcbiAgICBtYXgtaGVpZ2h0OiAyMHJlbTtcbiAgICBwYWRkaW5nOiAwIDFyZW0gMXJlbSAxcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiBpbml0aWFsO1xuICAgIGZvbnQtc3R5bGU6IGluaXRpYWw7XG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgICBmb250LXNpemU6IGluaXRpYWw7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWJvZHlGb250KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgYm94LXNoYWRvdzogNnB4IDZweCAzNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICB9XG5cbiAgJiA+IC5wb3BvdmVyLWlubmVyW2RhdGEtY29udGVudC10eXBlXSB7XG4gICAgJltkYXRhLWNvbnRlbnQtdHlwZSo9XCJwZGZcIl0sXG4gICAgJltkYXRhLWNvbnRlbnQtdHlwZSo9XCJpbWFnZVwiXSB7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgbWF4LWhlaWdodDogMTAwJTtcbiAgICB9XG5cbiAgICAmW2RhdGEtY29udGVudC10eXBlKj1cImltYWdlXCJdIHtcbiAgICAgIGltZyB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJltkYXRhLWNvbnRlbnQtdHlwZSo9XCJwZGZcIl0ge1xuICAgICAgaWZyYW1lIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICB9XG5cbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOlxuICAgIG9wYWNpdHkgMC4zcyBlYXNlLFxuICAgIHZpc2liaWxpdHkgMC4zcyBlYXNlO1xuXG4gIEBtZWRpYSBhbGwgYW5kICgkbW9iaWxlKSB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICB9XG59XG5cbmE6aG92ZXIgLnBvcG92ZXIsXG4ucG9wb3Zlcjpob3ZlciB7XG4gIGFuaW1hdGlvbjogZHJvcGluIDAuM3MgZWFzZTtcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gIGFuaW1hdGlvbi1kZWxheTogMC4ycztcbn1cbiJdfQ== */`;import{Features,transform}from"lightningcss";import{transform as transpile}from"esbuild";function getComponentResources(ctx){let allComponents=new Set;for(let emitter of ctx.cfg.plugins.emitters){let components=emitter.getQuartzComponents(ctx);for(let component of components)allComponents.add(component)}let componentResources={css:new Set,beforeDOMLoaded:new Set,afterDOMLoaded:new Set};for(let component of allComponents){let{css,beforeDOMLoaded,afterDOMLoaded}=component;css&&componentResources.css.add(css),beforeDOMLoaded&&componentResources.beforeDOMLoaded.add(beforeDOMLoaded),afterDOMLoaded&&componentResources.afterDOMLoaded.add(afterDOMLoaded)}return{css:[...componentResources.css],beforeDOMLoaded:[...componentResources.beforeDOMLoaded],afterDOMLoaded:[...componentResources.afterDOMLoaded]}}__name(getComponentResources,"getComponentResources");async function joinScripts(scripts){let script=scripts.map(script2=>`(function () {${script2}})();`).join(`
`);return(await transpile(script,{minify:!0})).code}__name(joinScripts,"joinScripts");function addGlobalPageResources(ctx,componentResources){let cfg=ctx.cfg.configuration;if(cfg.enablePopovers&&(componentResources.afterDOMLoaded.push(popover_inline_default),componentResources.css.push(popover_default)),cfg.analytics?.provider==="google"){let tagId=cfg.analytics.tagId;componentResources.afterDOMLoaded.push(`
      const gtagScript = document.createElement("script")
      gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=${tagId}"
      gtagScript.async = true
      document.head.appendChild(gtagScript)

      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "${tagId}", { send_page_view: false });

      document.addEventListener("nav", () => {
        gtag("event", "page_view", {
          page_title: document.title,
          page_location: location.href,
        });
      });`)}else if(cfg.analytics?.provider==="plausible"){let plausibleHost=cfg.analytics.host??"https://plausible.io";componentResources.afterDOMLoaded.push(`
      const plausibleScript = document.createElement("script")
      plausibleScript.src = "${plausibleHost}/js/script.manual.js"
      plausibleScript.setAttribute("data-domain", location.hostname)
      plausibleScript.defer = true
      document.head.appendChild(plausibleScript)

      window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }

      document.addEventListener("nav", () => {
        plausible("pageview")
      })
    `)}else if(cfg.analytics?.provider==="umami")componentResources.afterDOMLoaded.push(`
      const umamiScript = document.createElement("script")
      umamiScript.src = "${cfg.analytics.host??"https://analytics.umami.is"}/script.js"
      umamiScript.setAttribute("data-website-id", "${cfg.analytics.websiteId}")
      umamiScript.async = true

      document.head.appendChild(umamiScript)
    `);else if(cfg.analytics?.provider==="goatcounter")componentResources.afterDOMLoaded.push(`
      const goatcounterScript = document.createElement("script")
      goatcounterScript.src = "${cfg.analytics.scriptSrc??"https://gc.zgo.at/count.js"}"
      goatcounterScript.async = true
      goatcounterScript.setAttribute("data-goatcounter",
        "https://${cfg.analytics.websiteId}.${cfg.analytics.host??"goatcounter.com"}/count")
      document.head.appendChild(goatcounterScript)
    `);else if(cfg.analytics?.provider==="posthog")componentResources.afterDOMLoaded.push(`
      const posthogScript = document.createElement("script")
      posthogScript.innerHTML= \`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('${cfg.analytics.apiKey}',{api_host:'${cfg.analytics.host??"https://app.posthog.com"}'})\`
      document.head.appendChild(posthogScript)
    `);else if(cfg.analytics?.provider==="tinylytics"){let siteId=cfg.analytics.siteId;componentResources.afterDOMLoaded.push(`
      const tinylyticsScript = document.createElement("script")
      tinylyticsScript.src = "https://tinylytics.app/embed/${siteId}.js"
      tinylyticsScript.defer = true
      document.head.appendChild(tinylyticsScript)
    `)}else cfg.analytics?.provider==="cabin"?componentResources.afterDOMLoaded.push(`
      const cabinScript = document.createElement("script")
      cabinScript.src = "${cfg.analytics.host??"https://scripts.withcabin.com"}/hello.js"
      cabinScript.defer = true
      cabinScript.async = true
      document.head.appendChild(cabinScript)
    `):cfg.analytics?.provider==="clarity"&&componentResources.afterDOMLoaded.push(`
      const clarityScript = document.createElement("script")
      clarityScript.innerHTML= \`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${cfg.analytics.projectId}");\`
      document.head.appendChild(clarityScript)
    `);cfg.enableSPA?componentResources.afterDOMLoaded.push(spa_inline_default):componentResources.afterDOMLoaded.push(`
      window.spaNavigate = (url, _) => window.location.assign(url)
      window.addCleanup = () => {}
      const event = new CustomEvent("nav", { detail: { url: document.body.dataset.slug } })
      document.dispatchEvent(event)
    `)}__name(addGlobalPageResources,"addGlobalPageResources");var ComponentResources=__name(()=>({name:"ComponentResources",getQuartzComponents(){return[]},async getDependencyGraph(_ctx,_content,_resources){return new DepGraph},async emit(ctx,_content,_resources){let promises=[],cfg=ctx.cfg.configuration,componentResources=getComponentResources(ctx),googleFontsStyleSheet="";if(cfg.theme.fontOrigin!=="local"){if(cfg.theme.fontOrigin==="googleFonts"&&!cfg.theme.cdnCaching){let match,fontSourceRegex=/url\((https:\/\/fonts.gstatic.com\/s\/[^)]+\.(woff2|ttf))\)/g;for(googleFontsStyleSheet=await(await fetch(googleFontHref(ctx.cfg.configuration.theme))).text();(match=fontSourceRegex.exec(googleFontsStyleSheet))!==null;){let url=match[1],[filename,ext]=url.split("/").pop().split(".");googleFontsStyleSheet=googleFontsStyleSheet.replace(url,`https://${cfg.baseUrl}/static/fonts/${filename}.ttf`),promises.push(fetch(url).then(res=>{if(!res.ok)throw new Error("Failed to fetch font");return res.arrayBuffer()}).then(buf=>write({ctx,slug:joinSegments("static","fonts",filename),ext:`.${ext}`,content:Buffer.from(buf)})))}}}addGlobalPageResources(ctx,componentResources);let stylesheet=joinStyles(ctx.cfg.configuration.theme,googleFontsStyleSheet,...componentResources.css,custom_default),[prescript,postscript]=await Promise.all([joinScripts(componentResources.beforeDOMLoaded),joinScripts(componentResources.afterDOMLoaded)]);return promises.push(write({ctx,slug:"index",ext:".css",content:transform({filename:"index.css",code:Buffer.from(stylesheet),minify:!0,targets:{safari:984576,ios_saf:984576,edge:7536640,firefox:6684672,chrome:7143424},include:Features.MediaQueries}).code.toString()}),write({ctx,slug:"prescript",ext:".js",content:prescript}),write({ctx,slug:"postscript",ext:".js",content:postscript})),await Promise.all(promises)}}),"ComponentResources");var NotFoundPage=__name(()=>{let opts={...sharedPageComponents,pageBody:__default(),beforeBody:[],left:[],right:[]},{head:Head,pageBody,footer:Footer}=opts,Body2=Body_default();return{name:"404Page",getQuartzComponents(){return[Head,Body2,pageBody,Footer]},async getDependencyGraph(_ctx,_content,_resources){return new DepGraph},async emit(ctx,_content,resources){let cfg=ctx.cfg.configuration,slug="404",path13=new URL(`https://${cfg.baseUrl??"example.com"}`).pathname,externalResources=pageResources(path13,resources),notFound=i18n(cfg.locale).pages.error.title,[tree,vfile]=defaultProcessedContent({slug,text:notFound,description:notFound,frontmatter:{title:notFound,tags:[]}}),componentData={ctx,fileData:vfile.data,externalResources,cfg,children:[],tree,allFiles:[]};return[await write({ctx,content:renderPage(cfg,slug,componentData,opts,externalResources),slug,ext:".html"})]}}},"NotFoundPage");import chalk5 from"chalk";function getStaticResourcesFromPlugins(ctx){let staticResources={css:[],js:[]};for(let transformer of ctx.cfg.plugins.transformers){let res=transformer.externalResources?transformer.externalResources(ctx):{};res?.js&&staticResources.js.push(...res.js),res?.css&&staticResources.css.push(...res.css)}if(ctx.argv.serve){let wsUrl=ctx.argv.remoteDevHost?`wss://${ctx.argv.remoteDevHost}:${ctx.argv.wsPort}`:`ws://localhost:${ctx.argv.wsPort}`;staticResources.js.push({loadTime:"afterDOMReady",contentType:"inline",script:`
        const socket = new WebSocket('${wsUrl}')
        // reload(true) ensures resources like images and scripts are fetched again in firefox
        socket.addEventListener('message', () => document.location.reload(true))
      `})}return staticResources}__name(getStaticResourcesFromPlugins,"getStaticResourcesFromPlugins");async function emitContent(ctx,content){let{argv,cfg}=ctx,perf=new PerfTimer,log=new QuartzLogger(ctx.argv.verbose);log.start("Emitting output files");let emittedFiles=0,staticResources=getStaticResourcesFromPlugins(ctx);for(let emitter of cfg.plugins.emitters)try{let emitted=await emitter.emit(ctx,content,staticResources);if(emittedFiles+=emitted.length,ctx.argv.verbose)for(let file of emitted)console.log(`[emit:${emitter.name}] ${file}`)}catch(err){trace(`Failed to emit from plugin \`${emitter.name}\``,err)}log.end(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince()}`)}__name(emitContent,"emitContent");var config={configuration:{pageTitle:"\u270D\uFE0F Defender's notebook",pageTitleSuffix:"",enableSPA:!0,enablePopovers:!0,analytics:{provider:"plausible"},locale:"en-US",baseUrl:"defenderofbasic.github.io/notebook/",ignorePatterns:["private","templates",".obsidian"],defaultDateType:"created",theme:{fontOrigin:"googleFonts",cdnCaching:!0,typography:{header:"Schibsted Grotesk",body:"Source Sans Pro",code:"IBM Plex Mono"},colors:{lightMode:{light:"#faf8f8",lightgray:"#e5e5e5",gray:"#b8b8b8",darkgray:"#4e4e4e",dark:"#2b2b2b",secondary:"#284b63",tertiary:"#84a59d",highlight:"rgba(143, 159, 169, 0.15)",textHighlight:"#fff23688"},darkMode:{light:"#161618",lightgray:"#393639",gray:"#646464",darkgray:"#d4d4d4",dark:"#ebebec",secondary:"#7b97aa",tertiary:"#84a59d",highlight:"rgba(143, 159, 169, 0.15)",textHighlight:"#b3aa0288"}}}},plugins:{transformers:[FrontMatter(),CreatedModifiedDate({priority:["frontmatter","filesystem"]}),SyntaxHighlighting({theme:{light:"github-light",dark:"github-dark"},keepBackground:!1}),ObsidianFlavoredMarkdown({enableInHtmlEmbed:!1}),GitHubFlavoredMarkdown(),TableOfContents(),CrawlLinks({markdownLinkResolution:"shortest"}),Description(),Latex({renderEngine:"katex"})],filters:[RemoveDrafts()],emitters:[AliasRedirects(),ComponentResources(),ContentPage(),FolderPage(),TagPage(),ContentIndex({enableSiteMap:!0,enableRSS:!0}),Assets(),Static(),NotFoundPage()]}},quartz_config_default=config;import chokidar from"chokidar";import fs5 from"fs";import{fileURLToPath}from"url";var options={retrieveSourceMap(source){if(source.includes(".quartz-cache")){let realSource=fileURLToPath(source.split("?",2)[0]+".map");return{map:fs5.readFileSync(realSource,"utf8")}}else return null}};sourceMapSupport.install(options);function newBuildId(){return Math.random().toString(36).substring(2,8)}__name(newBuildId,"newBuildId");async function buildQuartz(argv,mut,clientRefresh){let ctx={buildId:newBuildId(),argv,cfg:quartz_config_default,allSlugs:[]},perf=new PerfTimer,output=argv.output,pluginCount=Object.values(quartz_config_default.plugins).flat().length,pluginNames=__name(key=>quartz_config_default.plugins[key].map(plugin=>plugin.name),"pluginNames");argv.verbose&&(console.log(`Loaded ${pluginCount} plugins`),console.log(`  Transformers: ${pluginNames("transformers").join(", ")}`),console.log(`  Filters: ${pluginNames("filters").join(", ")}`),console.log(`  Emitters: ${pluginNames("emitters").join(", ")}`));let release=await mut.acquire();perf.addEvent("clean"),await rimraf(path12.join(output,"*"),{glob:!0}),console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince("clean")}`),perf.addEvent("glob");let allFiles=await glob("**/*.*",argv.directory,quartz_config_default.configuration.ignorePatterns),fps=allFiles.filter(fp=>fp.endsWith(".md")).sort();console.log(`Found ${fps.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`);let filePaths=fps.map(fp=>joinSegments(argv.directory,fp));ctx.allSlugs=allFiles.map(fp=>slugifyFilePath(fp));let parsedFiles=await parseMarkdown(ctx,filePaths),filteredContent=filterContent(ctx,parsedFiles),dependencies={};if(argv.fastRebuild){let staticResources=getStaticResourcesFromPlugins(ctx);for(let emitter of quartz_config_default.plugins.emitters)dependencies[emitter.name]=await emitter.getDependencyGraph?.(ctx,filteredContent,staticResources)??null}if(await emitContent(ctx,filteredContent),console.log(chalk6.green(`Done processing ${fps.length} files in ${perf.timeSince()}`)),release(),argv.serve)return startServing(ctx,mut,parsedFiles,clientRefresh,dependencies)}__name(buildQuartz,"buildQuartz");async function startServing(ctx,mut,initialContent,clientRefresh,dependencies){let{argv}=ctx,contentMap=new Map;for(let content of initialContent){let[_tree,vfile]=content;contentMap.set(vfile.data.filePath,content)}let buildData={ctx,mut,dependencies,contentMap,ignored:await isGitIgnored(),initialSlugs:ctx.allSlugs,toRebuild:new Set,toRemove:new Set,trackedAssets:new Set,lastBuildMs:0},watcher=chokidar.watch(".",{persistent:!0,cwd:argv.directory,ignoreInitial:!0}),buildFromEntry=argv.fastRebuild?partialRebuildFromEntrypoint:rebuildFromEntrypoint;return watcher.on("add",fp=>buildFromEntry(fp,"add",clientRefresh,buildData)).on("change",fp=>buildFromEntry(fp,"change",clientRefresh,buildData)).on("unlink",fp=>buildFromEntry(fp,"delete",clientRefresh,buildData)),async()=>{await watcher.close()}}__name(startServing,"startServing");async function partialRebuildFromEntrypoint(filepath,action,clientRefresh,buildData){let{ctx,ignored,dependencies,contentMap,mut,toRemove}=buildData,{argv,cfg}=ctx;if(ignored(filepath))return;let buildId=newBuildId();ctx.buildId=buildId,buildData.lastBuildMs=new Date().getTime();let release=await mut.acquire();if(ctx.buildId!==buildId){release();return}let perf=new PerfTimer;console.log(chalk6.yellow("Detected change, rebuilding..."));let fp=joinSegments(argv.directory,toPosixPath(filepath)),staticResources=getStaticResourcesFromPlugins(ctx),processedFiles=[];switch(action){case"add":processedFiles=await parseMarkdown(ctx,[fp]),processedFiles.forEach(([tree,vfile])=>contentMap.set(vfile.data.filePath,[tree,vfile]));for(let emitter of cfg.plugins.emitters){let emitterGraph=await emitter.getDependencyGraph?.(ctx,processedFiles,staticResources)??null;if(emitterGraph){let existingGraph=dependencies[emitter.name];existingGraph!==null?existingGraph.mergeGraph(emitterGraph):dependencies[emitter.name]=emitterGraph}}break;case"change":if(processedFiles=await parseMarkdown(ctx,[fp]),processedFiles.forEach(([tree,vfile])=>contentMap.set(vfile.data.filePath,[tree,vfile])),path12.extname(fp)===".md")for(let emitter of cfg.plugins.emitters){let emitterGraph=await emitter.getDependencyGraph?.(ctx,processedFiles,staticResources)??null;emitterGraph?.hasNode(fp)&&dependencies[emitter.name]?.updateIncomingEdgesForNode(emitterGraph,fp)}break;case"delete":toRemove.add(fp);break}argv.verbose&&console.log(`Updated dependency graphs in ${perf.timeSince()}`),perf.addEvent("rebuild");let emittedFiles=0;for(let emitter of cfg.plugins.emitters){let depGraph=dependencies[emitter.name];if(depGraph===null){argv.verbose&&console.log(`Emitter ${emitter.name} doesn't define a dependency graph. Calling it with all files...`);let files=[...contentMap.values()].filter(([_node,vfile])=>!toRemove.has(vfile.data.filePath)),emittedFps=await emitter.emit(ctx,files,staticResources);if(ctx.argv.verbose)for(let file of emittedFps)console.log(`[emit:${emitter.name}] ${file}`);emittedFiles+=emittedFps.length;continue}if(depGraph.hasNode(fp)){let upstreamContent=[...depGraph.getLeafNodeAncestors(fp)].filter(file=>contentMap.has(file)).filter(file=>!toRemove.has(file)).map(file=>contentMap.get(file)),emittedFps=await emitter.emit(ctx,upstreamContent,staticResources);if(ctx.argv.verbose)for(let file of emittedFps)console.log(`[emit:${emitter.name}] ${file}`);emittedFiles+=emittedFps.length}}console.log(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince("rebuild")}`);let destinationsToDelete=new Set;for(let file of toRemove)contentMap.delete(file),Object.values(dependencies).forEach(depGraph=>{depGraph?.removeNode(file),depGraph?.removeOrphanNodes()?.forEach(node=>{node.startsWith(argv.output)&&destinationsToDelete.add(node)})});await rimraf([...destinationsToDelete]),console.log(chalk6.green(`Done rebuilding in ${perf.timeSince()}`)),toRemove.clear(),release(),clientRefresh()}__name(partialRebuildFromEntrypoint,"partialRebuildFromEntrypoint");async function rebuildFromEntrypoint(fp,action,clientRefresh,buildData){let{ctx,ignored,mut,initialSlugs,contentMap,toRebuild,toRemove,trackedAssets}=buildData,{argv}=ctx;if(ignored(fp))return;fp=toPosixPath(fp);let filePath=joinSegments(argv.directory,fp);if(path12.extname(fp)!==".md"){action==="add"||action==="change"?trackedAssets.add(filePath):action==="delete"&&trackedAssets.delete(filePath),clientRefresh();return}action==="add"||action==="change"?toRebuild.add(filePath):action==="delete"&&toRemove.add(filePath);let buildId=newBuildId();ctx.buildId=buildId,buildData.lastBuildMs=new Date().getTime();let release=await mut.acquire();if(ctx.buildId!==buildId){release();return}let perf=new PerfTimer;console.log(chalk6.yellow("Detected change, rebuilding..."));try{let filesToRebuild=[...toRebuild].filter(fp2=>!toRemove.has(fp2)),parsedContent=await parseMarkdown(ctx,filesToRebuild);for(let content of parsedContent){let[_tree,vfile]=content;contentMap.set(vfile.data.filePath,content)}for(let fp2 of toRemove)contentMap.delete(fp2);let parsedFiles=[...contentMap.values()],filteredContent=filterContent(ctx,parsedFiles),trackedSlugs=[...new Set([...contentMap.keys(),...toRebuild,...trackedAssets])].filter(fp2=>!toRemove.has(fp2)).map(fp2=>slugifyFilePath(path12.posix.relative(argv.directory,fp2)));ctx.allSlugs=[...new Set([...initialSlugs,...trackedSlugs])],await rimraf(path12.join(argv.output,".*"),{glob:!0}),await emitContent(ctx,filteredContent),console.log(chalk6.green(`Done rebuilding in ${perf.timeSince()}`))}catch(err){console.log(chalk6.yellow("Rebuild failed. Waiting on a change to fix the error...")),argv.verbose&&console.log(chalk6.red(err))}clientRefresh(),toRebuild.clear(),toRemove.clear(),release()}__name(rebuildFromEntrypoint,"rebuildFromEntrypoint");var build_default=__name(async(argv,mut,clientRefresh)=>{try{return await buildQuartz(argv,mut,clientRefresh)}catch(err){trace(`
Exiting Quartz due to a fatal error`,err)}},"default");export{build_default as default};
//# sourceMappingURL=transpiled-build.mjs.map
