/* --- Global State --- */
let state = { requests: [], volunteers: [], donations: [], notifications: [] };

/* --- Navigation & UI Helpers --- */
function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }
function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

/* --- Form Submissions --- */
document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    state.requests.push({
        name: document.getElementById('reqName').value,
        people: document.getElementById('reqPeople').value,
        details: document.getElementById('reqDetails').value,
        status: 'Pending'
    });
    this.reset();
    document.getElementById('reqMessage').classList.remove('hidden');
    setTimeout(() => document.getElementById('reqMessage').classList.add('hidden'), 3000);
    updateAdminStats();
});

document.getElementById('volunteerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    state.volunteers.push({
        name: document.getElementById('volName').value,
        email: document.getElementById('volEmail').value,
        availability: document.getElementById('volAvailability').value
    });
    this.reset();
    document.getElementById('volMessage').classList.remove('hidden');
    setTimeout(() => document.getElementById('volMessage').classList.add('hidden'), 3000);
    updateAdminStats();
});

/* --- Donations --- */
document.querySelectorAll('.amount').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.amount').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('customAmt').value = this.dataset.amt;
    });
});

function donateMoney() {
    const amt = document.getElementById('customAmt').value;
    if (!amt) return alert("Please enter an amount");
    state.donations.push({ type: 'Money', amount: 'R' + amt });
    document.getElementById('donateMessage').classList.remove('hidden');
    document.getElementById('customAmt').value = '';
    setTimeout(() => document.getElementById('donateMessage').classList.add('hidden'), 3000);
    updateAdminStats();
}

function donateGoods() {
    const desc = document.getElementById('goodsDesc').value;
    const addr = document.getElementById('goodsAddress').value;
    if (!desc || !addr) return alert("Please fill in goods description and address");
    state.donations.push({ type: 'Goods', amount: desc });
    document.getElementById('donateMessage').classList.remove('hidden');
    document.getElementById('goodsDesc').value = '';
    document.getElementById('goodsAddress').value = '';
    setTimeout(() => document.getElementById('donateMessage').classList.add('hidden'), 3000);
    updateAdminStats();
}

/* --- Admin Dashboard --- */
function updateAdminStats() {
    document.getElementById('statRequests').innerText = state.requests.length;
    document.getElementById('statVolunteers').innerText = state.volunteers.length;
    document.getElementById('statDonations').innerText = state.donations.length;

    const notifList = document.getElementById('notifList');
    notifList.innerHTML = '';
    
    if(state.requests.length > 0) {
        let newReq = state.requests[state.requests.length - 1];
        state.notifications.unshift({ msg: `New request from ${newReq.name}`, time: 'Just now' });
    }

    state.notifications.slice(0, 5).forEach(notif => {
        let li = document.createElement('li');
        li.innerText = `${notif.msg} (${notif.time})`;
        notifList.appendChild(li);
    });
}

/* --- Login System --- */
function login() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    if (email === 'admin@mealbridge.org' && pass === 'admin123') {
        alert("Admin Login Successful! Access Granted.");
        scrollToSection('admin');
    } else if (email && pass) {
        alert("User Login Successful!");
    } else {
        alert("Please enter valid credentials.");
    }
}

/* --- AI Chatbot System --- */
function toggleChat() {
    const body = document.getElementById('chatBody');
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    const chatBody = document.getElementById('chatBody');
    
    chatBody.innerHTML += `<div class="msg user">${message}</div>`;
    input.value = '';

    setTimeout(() => {
        let botReply = "I'm not sure about that. Please contact us at +27 12 345 7543.";
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('donate') || lowerMsg.includes('money')) botReply = "To donate money, please use the 'Donate' section above or deposit to ABSA Account: 1234567. Thank you!";
        else if (lowerMsg.includes('food') || lowerMsg.includes('request')) botReply = "You can submit a food request via the 'Request Food' section above. We usually process requests within 24 hours.";
        else if (lowerMsg.includes('volunteer') || lowerMsg.includes('help')) botReply = "We'd love your help! Please fill out the 'Volunteer' section above and we will contact you.";
        else if (lowerMsg.includes('date') || lowerMsg.includes('schedule')) botReply = "Our next food scheme event is Saturday, 31 May at 9:00 AM in Pretoria North.";
        else if (lowerMsg.includes('thank')) botReply = "You're welcome! We appreciate your support.";
        else if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) botReply = "Hello! How can I assist you with MealBridge today?";

        chatBody.innerHTML += `<div class="msg bot">${botReply}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}
