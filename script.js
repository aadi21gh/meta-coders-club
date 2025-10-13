// Horizontal scroll for rows
document.querySelectorAll('.row-posters').forEach(row=>{
  row.addEventListener('wheel', e=>{
    e.preventDefault();
    row.scrollLeft += e.deltaY;
  });
});

// Modal functionality
const modal=document.getElementById("modal");
const modalTitle=document.getElementById("modal-title");
const modalText=document.getElementById("modal-text");
const closeBtn=document.querySelector(".close");
const modalContent={
  "AI-ML":"Learn and collaborate in AI & Machine Learning projects, workshops, and hackathons.",
  "WebDev":"Build and improve websites using HTML, CSS, JS, and frameworks like React.",
  "DataScience":"Work on datasets, visualize insights, and implement ML models.",
  "CyberSecurity":"Learn ethical hacking, penetration testing, and security best practices.",
  "DSA":"Sharpen your problem-solving skills with data structures and algorithms.",
  "Cloud":"Explore cloud technologies and deploy applications on AWS, Azure, or GCP.",
  "Other":"Explore other exciting tech domains and community projects.",
  "WebChallenge":"Participate in web development challenges and showcase your skills.",
  "AIChallenge":"Solve AI/ML problems and improve your data modeling skills.",
  "GameChallenge":"Develop fun and interactive games using your programming skills.",
  "DataChallenge":"Analyze data and generate actionable insights.",
  "TechManthan":"Annual coding and innovation event to showcase talent and creativity.",
  "Portfolio":"Create personal portfolio websites to showcase projects.",
  "Chatbot":"Interact with the AI Chatbot demo in the Projects section.",
  "GameDev":"Develop 2D/3D games and interactive experiences.",
  "DataViz":"Create interactive data visualizations using modern JS libraries."
};
document.querySelectorAll('.card button[data-modal]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const key=btn.getAttribute('data-modal');
    modalTitle.innerText=btn.parentElement.querySelector('h3').innerText;
    modalText.innerText=modalContent[key]||"More info coming soon!";
    modal.style.display="block";
  });
});
closeBtn.addEventListener('click', ()=>{modal.style.display="none";});
window.addEventListener('click', e=>{if(e.target==modal)modal.style.display="none";});

// Scroll header shadow & fade-in
const header=document.querySelector('header');
window.addEventListener('scroll', ()=>{
  if(window.scrollY>50) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  document.querySelectorAll('.row,.hero').forEach(section=>{
    const rect=section.getBoundingClientRect();
    if(rect.top<window.innerHeight-100){section.style.opacity=1;section.style.transform='translateY(0)';}
  });
});

// Featured slider
const slides=document.querySelectorAll('.slide');
const prev=document.querySelector('.prev');
const next=document.querySelector('.next');
let currentIndex=0;
function showSlide(index){
  slides.forEach(slide=>slide.classList.remove('active'));
  slides[index].classList.add('active');
  document.querySelector('.slider').style.transform=`translateX(-${index*100}%)`;
}
next.addEventListener('click', ()=>{currentIndex=(currentIndex+1)%slides.length;showSlide(currentIndex);});
prev.addEventListener('click', ()=>{currentIndex=(currentIndex-1+slides.length)%slides.length;showSlide(currentIndex);});
setInterval(()=>{currentIndex=(currentIndex+1)%slides.length;showSlide(currentIndex);},6000);

// Chatbot functionality
const chatbotModal = document.getElementById('chatbot-modal');
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');

function openChat(){
  chatbotModal.style.display = 'block';
  chatWindow.innerHTML = "<p><em>Chatbot: Hello! I am your Meta Coders AI assistant. Ask me anything about coding or the club.</em></p>";
}

function closeChat(){
  chatbotModal.style.display = 'none';
}

function sendMessage(){
  const userMsg = chatInput.value.trim();
  if(userMsg === "") return;
  chatWindow.innerHTML += `<p><strong>You:</strong> ${userMsg}</p>`;
  chatInput.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  let botMsg = "I am still learning to respond better!";
  const msg = userMsg.toLowerCase();
  if(msg.includes("hello") || msg.includes("hi")) botMsg = "Hello! How can I assist you today?";
  else if(msg.includes("meta coders") || msg.includes("club")) botMsg = "Meta Coders Club is a community for learning, building projects, and coding challenges!";
  else if(msg.includes("ai") || msg.includes("chatbot")) botMsg = "This chatbot is a simple JS demo. You can enhance it using AI APIs!";
  else if(msg.includes("projects")) botMsg = "We have AI Chatbot, Portfolio Website, Game Dev, and Data Visualizer projects!";
  else if(msg.includes("events")) botMsg = "Our main event is Tech Manthan, the annual coding and innovation event!";
  
  setTimeout(()=>{
    chatWindow.innerHTML += `<p><em>Chatbot: ${botMsg}</em></p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  },500);
}

window.addEventListener('click', (e)=>{
  if(e.target == chatbotModal) closeChat();
});
