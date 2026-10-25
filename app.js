'use strict';
const projects = [
  {title:'讓光，說出辣椒的祕密。',category:'01 / 辣椒品質光譜分析',status:'持續研究中',image:'assets/spectrum.svg',alt:'辣椒光譜量測流程概念示意',background:'#e4e8da',description:'從「能不能用光了解辣椒的品質？」這個問題出發，結合光譜儀、電子控制與資料分析，探索量測訊號與樣品特徵的關係。',sections:[['想解決的問題','希望探索較便利的品質觀察方式，減少繁瑣的樣品前處理，並為未來可攜式量測累積經驗。這是研究方向，尚不代表已通過準確度驗證。'],['正在實作的內容','接觸 UMX280 光譜儀與 ESP32 控制，整理重複量測、標準白與校正資料，練習從原始訊號走向反射率與品質分析。'],['接下來的探索','釐清光源、量測距離與環境光對資料的影響，建立穩定流程，再用實際樣品與參考數據驗證分析方法。']],tools:['UMX280','ESP32','Python','MicroPython','量測與校正']},
  {title:'讓校園日常，少一點忙亂。',category:'02 / 校園 Discord 機器人',status:'建置中',image:'assets/community.svg',alt:'Discord 校園工具的介面概念示意',background:'#e7e2f1',description:'從校園社群的實際需求出發，讓同學在熟悉的 Discord 裡找到課表、報名與作業資訊，減少在不同地方來回查找的時間。',sections:[['想解決的問題','課業與活動資訊容易散在不同訊息裡。希望以簡單、容易管理的方式，把常用內容集中到社群中。'],['設計方向','以 GitHub 管理程式，以 Google Sheets 整理後台資料，逐步串接機器人功能，降低日後更新資訊的負擔。'],['接下來的探索','確認資料同步、指令操作與部署流程，優先把最常用的功能做穩，並持續調整讓同學容易理解的操作方式。']],tools:['Discord','GitHub','Google Sheets','社群工具']},
  {title:'在選擇裡，看見不同的未來。',category:'03 / 警察職涯模擬',status:'持續調整中',image:'assets/career.svg',alt:'警察職涯選擇與分支路徑概念示意',background:'#dce5e0',description:'把對警察工作的興趣，做成能夠互動探索的網頁。透過職務、生活與成長的選擇，思考不同決定會如何影響長期生涯。',sections:[['作品的起點','想用比閱讀文字更直觀的方式，了解一份職涯裡的工作變化，也看見薪資、休息、壓力與生活之間的取捨。'],['體驗設計','以互動模擬呈現職涯路徑與個人生活資訊，讓選擇和結果產生連結，逐步完善畫面的資訊層級與操作流程。'],['持續調整的地方','確認職務與退休資訊的呈現方式，讓模擬內容更清楚、合理。此作品為探索與學習用途，制度細節仍需依官方資料核實。']],tools:['互動網頁','職涯探索','資訊設計','體驗設計']}
];

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){ menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('open');menuButton.querySelector('.sr-only').textContent='開啟選單'; }
menuButton.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));navigation.classList.toggle('open',!expanded);menuButton.querySelector('.sr-only').textContent=expanded?'開啟選單':'關閉選單';});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
matchMedia('(min-width:601px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

const grid=document.querySelector('.project-grid');
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
  const cards=[...document.querySelectorAll('.project[data-category]')];
  cards.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;});
  const secondary=document.querySelector('.project-secondary');secondary.hidden=[...secondary.querySelectorAll('.project')].every(card=>card.hidden);
  grid.classList.toggle('filtered',filter!=='all');
  const count=cards.filter(card=>!card.hidden).length;
  document.querySelector('#filter-status').textContent=`顯示${button.textContent.trim().replace('03','')}，共 ${count} 件作品`;
}));

const projectDialog=document.querySelector('#project-dialog');
const contactDialog=document.querySelector('#contact-dialog');
let currentProject=0;
let projectTrigger=null;
function renderProject(index){
  currentProject=(index+projects.length)%projects.length;
  const project=projects[currentProject];
  document.querySelector('#dialog-title').textContent=project.title;
  document.querySelector('#dialog-category').textContent=project.category;
  document.querySelector('#dialog-status').textContent=project.status;
  document.querySelector('#dialog-description').textContent=project.description;
  const picture=document.querySelector('#dialog-image');picture.src=project.image;picture.alt=project.alt;
  document.querySelector('.dialog-art').style.background=project.background;
  const sectionContainer=document.querySelector('#dialog-sections');sectionContainer.replaceChildren();
  project.sections.forEach(([heading,content])=>{const section=document.createElement('section');section.className='detail-section';const h3=document.createElement('h3');h3.textContent=heading;const p=document.createElement('p');p.textContent=content;section.append(h3,p);sectionContainer.append(section);});
  const tools=document.querySelector('#dialog-tools');tools.replaceChildren();project.tools.forEach(tool=>{const tag=document.createElement('span');tag.textContent=tool;tools.append(tag);});
  document.querySelector('#project-index').textContent=`0${currentProject+1} / 03`;
  projectDialog.scrollTop=0;
}
function openProject(index,trigger){projectTrigger=trigger;renderProject(index);projectDialog.showModal();document.body.classList.add('modal-open');projectDialog.querySelector('[data-close-dialog]').focus();}
document.querySelector('.project-grid').addEventListener('click',event=>{const button=event.target.closest('[data-project]');if(button)openProject(Number(button.dataset.project),button);});
document.querySelectorAll('[data-open-project]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();openProject(Number(link.dataset.openProject),link);}));
document.querySelector('#project-prev').addEventListener('click',()=>renderProject(currentProject-1));
document.querySelector('#project-next').addEventListener('click',()=>renderProject(currentProject+1));
projectDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');projectTrigger?.focus({preventScroll:true});});
document.querySelector('#contact-open').addEventListener('click',()=>{document.querySelector('#copy-status').textContent='';contactDialog.showModal();document.body.classList.add('modal-open');});
contactDialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
document.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});});
document.querySelector('#copy-link').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');status.classList.remove('copy-failed');try{await navigator.clipboard.writeText(location.href.split('#')[0]);status.textContent='已複製網站連結。'}catch{status.classList.add('copy-failed');status.textContent='目前無法自動複製，請從瀏覽器網址列複製連結。';}});
document.querySelector('#year').textContent=String(new Date().getFullYear());

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('[data-section]').forEach(link=>{const current=link.dataset.section===entry.target.id;link.classList.toggle('current',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px',threshold:0});
  ['work','about','now'].forEach(id=>observer.observe(document.getElementById(id)));
}
