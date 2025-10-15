/* ---------------- horizontal scrolling for rows ---------------- */ 
document.querySelectorAll('.row-posters').forEach(row=>{
  row.addEventListener('wheel', e=>{
    e.preventDefault();
    row.scrollLeft += e.deltaY;
  });
});

/* ---------------- modal logic ---------------- */
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText  = document.getElementById('modal-text');
const modalCloseBtns = document.querySelectorAll('.modal-close');
const modalContent = {
  "AI-ML":"Learn and collaborate in AI & Machine Learning projects, workshops, and hackathons.",
  "WebDev":"Build and improve websites using HTML, CSS, JS and frameworks like React.",
  "DataScience":"Work on datasets, visualize insights, and implement ML models.",
  "CyberSecurity":"Learn ethical hacking, penetration testing and security best practices.",
  "DSA":"Sharpen problem-solving using data structures & algorithms.",
  "Cloud":"Explore cloud technologies and deploy applications on AWS, Azure or GCP.",
  "Other":"Explore other exciting tech domains and community projects.",
  "WebChallenge":"Participate in web development challenges and showcase your skills.",
  "AIChallenge":"Solve ML problems and improve modeling skills.",
  "GameChallenge":"Develop interactive games and prototypes.",
  "DataChallenge":"Analyze datasets and generate actionable insights.",
  "TechManthan":"Annual coding & innovation event to showcase club talent.",
  "Portfolio":"Create personal portfolio websites to showcase projects.",
  "GameDev":"Develop games and interactive experiences.",
  "DataViz":"Create interactive visualizations using modern JS libraries."
};

/* open general modal when clicking buttons with data-modal */
document.querySelectorAll('.modal-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const key = btn.getAttribute('data-modal');
    const title = btn.parentElement.querySelector('h3') ? btn.parentElement.querySelector('h3').innerText : btn.parentElement.parentElement.querySelector('h2')?.innerText || key;
    modalTitle.innerText = title;
    modalText.innerText = modalContent[key] || "More info coming soon!";
    modal.style.display = 'flex';
  });
});

/* close modal buttons */
modalCloseBtns.forEach(b=>b.addEventListener('click', ()=>{ 
  b.closest('.modal').style.display = 'none';
}));

/* click outside to close */
window.addEventListener('click', (e)=>{
  document.querySelectorAll('.modal').forEach(m=>{
    if(e.target === m) m.style.display = 'none';
  });
});

/* ---------------- header scroll shadow + fade-in sections ---------------- */
const header = document.querySelector('header');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled');

  document.querySelectorAll('.row, .hero, .featured-slider').forEach(section=>{
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
  });
});

/* ---------------- featured slider ---------------- */
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIndex = 0;
function showSlide(i){
  currentIndex = (i + slides.length) % slides.length;
  document.querySelector('.slider').style.transform = `translateX(-${currentIndex * 100}%)`;
}
next?.addEventListener('click', ()=> showSlide(currentIndex + 1));
prev?.addEventListener('click', ()=> showSlide(currentIndex - 1));
setInterval(()=> showSlide(currentIndex + 1), 6000);

/* ---------------- simple in-page AI chatbot (no external API) ---------------- */
const chatbotModal = document.getElementById('chatbot-modal');
const chatWindow = document.getElementById('chat-window');
const chatInput  = document.getElementById('chat-input');
const chatSend   = document.getElementById('chat-send');

function openChat(){
  chatbotModal.style.display = 'flex';
  chatWindow.innerHTML = `<p><em>Chatbot: Hello! I am Meta Coders' assistant. Ask about the club, events or projects.</em></p>`;
  chatInput.value = '';
  chatInput.focus();
}

function closeChat(){
  chatbotModal.style.display = 'none';
}

chatSend?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') sendMessage(); });

function sendMessage(){
  const txt = chatInput.value.trim();
  if(!txt) return;
  chatWindow.innerHTML += `<p><strong>You:</strong> ${escapeHtml(txt)}</p>`;
  chatInput.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;

  const msg = txt.toLowerCase();
  let bot = "I am still learning — try asking about 'events', 'projects' or 'communities'.";

  if(msg.includes('hello') || msg.includes('hi')) bot = "Hello! How can I help you today?";
  else if(msg.includes('meta coders') || msg.includes('club')) bot = "Meta Coders Club organises workshops, hackathons and projects. Join to learn and build!";
  else if(msg.includes('events')) bot = "Our main event is Tech Manthan — an annual coding & innovation festival.";
  else if(msg.includes('chatbot') || msg.includes('ai')) bot = "This chatbot is a demo. You can extend it with APIs for smarter replies.";
  else if(msg.includes('projects')) bot = "Featured projects: AI Chatbot, Portfolio Website, Game Dev, Data Visualizer.";
  else if(msg.includes('communities')) bot = "Communities include AI&ML, Web Dev, Data Science, Cyber Security, DSA, Cloud and Other.";

  setTimeout(()=> {
    chatWindow.innerHTML += `<p><em>Chatbot: ${escapeHtml(bot)}</em></p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 500);
}

/* small helper to avoid html injection in chat */
function escapeHtml(unsafe){
  return unsafe.replace(/[&<"'>]/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]; });
}

/* ---------------- community modal ---------------- */
function openCommunityModal(title, link){
  document.getElementById('communityTitle').innerText = title;
  const btn = document.getElementById('joinCommunityBtn');
  btn.href = link;
  document.getElementById('communityModal').style.display = 'flex';
}
function closeCommunityModal(){ document.getElementById('communityModal').style.display = 'none'; }

// Coming Soon alert for Slider Explore button
document.querySelectorAll('.slide-content button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    alert('🚀 Coming Soon!');
  });
});

// Coming Soon alert for Coding Challenges Join button
document.querySelectorAll('.coding-challenges .join-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    alert('🚀 Coming Soon!');
  });
});



