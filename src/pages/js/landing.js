/* landing.js — small interactions: CTA navigation, rotating quotes, demo greeting */
const quotes = [
  "“The secret of getting ahead is getting started.” — Mark Twain",
  "“Simplicity is the ultimate sophistication.” — Leonardo da Vinci",
  "“It’s not about ideas. It’s about making ideas happen.” — Scott Belsky",
  "“Data beats emotions.” — Unknown"
];

let qIndex = 0;
function rotateQuote() {
  const el = document.getElementById('quoteText');
  if(!el) return;
  el.style.opacity = 0;
  setTimeout(()=>{ el.textContent = quotes[qIndex]; el.style.opacity = 1; qIndex = (qIndex+1) % quotes.length; }, 300);
}
setInterval(rotateQuote, 4500);
document.addEventListener('DOMContentLoaded', ()=> {
  rotateQuote();

  // CTA navigation (local file links)
  document.getElementById('heroSignup').addEventListener('click', ()=> {
    // open signup page (create file src/pages/signup.html later)
    window.location.href = './signup.html';
  });
  document.getElementById('heroDemo').addEventListener('click', ()=> {
    // go to demo dashboard (create src/pages/app/dashboard.html later)
    window.location.href = './app/dashboard.html';
  });
  document.getElementById('btnLogin').addEventListener('click', ()=> {
    window.location.href = './login.html';
  });
  document.getElementById('btnGetStarted').addEventListener('click', ()=> {
    window.location.href = './signup.html';
  });

  // small animated greeting (mock)
  const g = document.getElementById('heroGreeting');
  if(g){
    const lines = [
      "Hey Aryan — good to see you.",
      "Revenue ₹82,400 (+12%) • Low stock: 3",
      "2 invoices overdue • Want me to send reminders?"
    ];
    let i = 0;
    setInterval(()=>{ g.style.opacity=0; setTimeout(()=>{ g.textContent = lines[i]; g.style.opacity=1; i=(i+1)%lines.length; },250); }, 3600);
  }
});
