'use strict';
// Public content only. No API keys, passwords or private Sheets credentials.
const CONTENT_SHEET_ID='1SkYEZfk11xIRQTR6RdRk0q-ih3-wT3KdlSOQ8BrMvzc';
function contentURL(value,image=false){
  if(!value)return '';
  try{const url=new URL(String(value),location.href);if(url.protocol!=='https:'&&url.origin!==location.origin)return '';if(image&&url.origin===location.origin&&!String(value).startsWith('assets/'))return '';return url.href;}catch{return '';}
}
function sheetRows(sheet){return new Promise((resolve,reject)=>{
  const cb='sheetResponse_'+Math.random().toString(36).slice(2);const script=document.createElement('script');let timer;
  const clean=()=>{clearTimeout(timer);script.remove();delete window[cb];};
  window[cb]=result=>{clean();if(result.status!=='ok'||!result.table){reject(new Error('Sheet is not published'));return;}const headers=result.table.cols.map(c=>c.label);resolve(result.table.rows.map(row=>Object.fromEntries(headers.map((header,i)=>[header,row.c[i]?.v??'']))));};
  script.src=`https://docs.google.com/spreadsheets/d/${CONTENT_SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(sheet)}&headers=1&tqx=${encodeURIComponent('out:json;responseHandler:'+cb)}`;
  script.onerror=()=>{clean();reject(new Error('Content unavailable'));};timer=setTimeout(()=>{clean();reject(new Error('Content timeout'));},12000);document.head.append(script);
});}
function contentNode(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=String(text);return el;}
function visibleRow(row){return row['顯示']===true||String(row['顯示']).toUpperCase()==='TRUE';}
function orderedRows(rows){return rows.filter(visibleRow).sort((a,b)=>(Number(a['排序'])||0)-(Number(b['排序'])||0));}
function applyProfile(rows){
 const values=Object.fromEntries(rows.map(r=>[r['欄位'],String(r['內容']??'')]));
 const mapping={'首頁標題':'#hero-title','簡介':'.hero-intro','關於我':'.about-right>p:nth-child(2)','補充介紹':'.about-right>p:nth-child(3)'};
 Object.entries(mapping).forEach(([key,selector])=>{if(values[key]){const el=document.querySelector(selector);el.textContent=values[key];el.style.whiteSpace='pre-line';}});
 if(values['網站名稱'])document.title=values['網站名稱'];
 if(values['英文標誌']){document.querySelector('.brand-name').firstChild.textContent=values['英文標誌'];document.querySelector('.footer-logo').firstChild.textContent=values['英文標誌'];}
 if(values['顯示名稱'])document.querySelector('.about-id>span:last-child').firstChild.textContent=values['顯示名稱'];
 if(values['身分介紹'])document.querySelector('.about-id>span:last-child>span').textContent=values['身分介紹'];
 if(values['工具與領域'])document.querySelector('.tool-tags').replaceChildren(...values['工具與領域'].split(/[,，]/).map(s=>contentNode('span','',s.trim())).filter(s=>s.textContent));
 if(contentURL(values['個人照片'],true)){let photo=document.querySelector('.profile-photo');if(!photo){photo=contentNode('img','profile-photo');photo.alt='個人照片';document.querySelector('.about-left').append(photo);}photo.src=contentURL(values['個人照片'],true);}
 const contact=contactDialog.querySelector('p:not(.eyebrow):not(.copy-status)');const links=[];
 if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.Email||'')){const a=contentNode('a','button button-dark','寄信給我 ↗');a.href='mailto:'+values.Email;links.push(a);}
 for(const key of ['GitHub','Instagram']){const url=contentURL(values[key]);if(url){const a=contentNode('a','button button-dark',key+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';links.push(a);}}
 if(links.length){contact.textContent='歡迎透過以下方式與我交流。';let container=document.querySelector('.contact-real-links');if(!container){container=contentNode('div','contact-real-links');contact.after(container);}container.replaceChildren(...links);document.querySelector('.contact-pending').textContent='歡迎交流';}
}
function applyProjects(rows){
 const selected=orderedRows(rows).filter(r=>r['標題']);
 const updated=selected.map((r,i)=>({title:String(r['標題']),category:`${String(i+1).padStart(2,'0')} / ${r['分類']||'作品'}`,status:String(r['狀態']||''),image:contentURL(r['圖片網址'],true)||'assets/spectrum.svg',alt:String(r['標題']),background:'#e4e8da',description:String(r['摘要']||''),sections:r['內容']?[['作品介紹',String(r['內容'])]]:[],tools:String(r['標籤']||'').split(/[,，]/).map(v=>v.trim()).filter(Boolean),live:contentURL(r['作品網址']),code:contentURL(r['程式碼網址'])}));
 projects.splice(0,projects.length,...updated);const secondary=contentNode('div','project-secondary');grid.replaceChildren();
 updated.forEach((p,i)=>{const category=/硬體|研究/.test(selected[i]['分類'])?'research':'software';const article=contentNode('article','project '+(i===0?'project-featured':'project-small'));article.dataset.category=category;
 const button=contentNode('button','project-open');button.type='button';button.dataset.project=String(i);button.setAttribute('aria-label','查看'+p.title);
 const image=contentNode('div','project-image '+(i===0?'spectrum-image':'career-image'));const img=contentNode('img');img.src=p.image;img.alt=p.alt;img.loading='lazy';img.onerror=()=>{img.onerror=null;img.src='assets/spectrum.svg';};image.append(img,contentNode('span','project-number',String(i+1).padStart(2,'0')),contentNode('span','round-arrow','↗'));
 const body=contentNode('div','project-body');const tags=contentNode('div','project-tags');tags.append(contentNode('span','',selected[i]['分類']||'作品'),contentNode('span','project-status',p.status));const title=contentNode('div','project-title-line');title.append(contentNode('h3','',p.title),contentNode('span','','↗'));body.append(tags,title,contentNode('p','',p.description),contentNode('span','project-meta',p.tools.join(' · ')));button.append(image,body);article.append(button);if(i===0)grid.append(article);else secondary.append(article);
 });grid.append(secondary);if(!updated.length)grid.append(contentNode('p','','作品準備中。'));
 document.querySelector('.filter[data-filter="all"]>span').textContent=String(updated.length).padStart(2,'0');document.querySelector('.filter[data-filter="all"]').click();
}
function applyNews(rows){const list=document.querySelector('.now-list');list.replaceChildren();orderedRows(rows).filter(r=>r['標題']).forEach(r=>{const url=contentURL(r['連結']);const row=contentNode(url?'a':'div','now-item');if(url){row.href=url;row.target='_blank';row.rel='noopener noreferrer';}row.append(contentNode('span','now-state','近況更新'));const text=contentNode('div');text.append(contentNode('h3','',r['標題']),contentNode('p','',r['內容']));row.append(text);if(url)row.append(contentNode('span','now-arrow','↗'));list.append(row);});if(!list.children.length)list.append(contentNode('p','','近況整理中。'));}
Promise.allSettled([sheetRows('個人資料').then(applyProfile),sheetRows('作品').then(applyProjects),sheetRows('最新消息').then(applyNews)]).then(results=>{document.documentElement.dataset.contentStatus=results.every(r=>r.status==='fulfilled')?'synced':'fallback';if(results.some(r=>r.status==='rejected'))console.info('Using initial content. Publish the content spreadsheet to enable updates.');});
// Add optional real project links after the existing detail renderer.
const renderProjectDetail=renderProject;
renderProject=function(index){if(!projects.length)return;renderProjectDetail(index);document.querySelector('#project-index').textContent=`${currentProject+1} / ${projects.length}`;const p=projects[currentProject];let actions=document.querySelector('.project-real-links');if(!actions){actions=contentNode('div','project-real-links');document.querySelector('.dialog-tools').after(actions);}actions.replaceChildren();for(const [url,label] of [[p.live,'開啟作品 ↗'],[p.code,'查看程式碼 ↗']])if(url){const a=contentNode('a','button button-dark',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';actions.append(a);}};
