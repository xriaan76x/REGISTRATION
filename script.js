const SUPABASE_URL = "https://lamsoakrxxiehbqjxhxr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhbXNvYWtyeHhpZWhicWp4aHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMDQ1MjAsImV4cCI6MjA5MDg4MDUyMH0.rlqAY_gLtNYO2DpgGQvxSUri5MXIChdASYJVfAuV4XA";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("appForm");
const submitBtn = form.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('span');
const statusMessage = document.getElementById("status-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // UI state loading
    const originalText = btnText.innerText;
    btnText.innerText = "Submitting...";
    submitBtn.disabled = true;
    
    // reset status
    statusMessage.className = 'status-message';
    statusMessage.innerText = '';

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        ku_id: document.getElementById("ku_id").value,
        event_choice: document.getElementById("event_choice").value,
    };

    const { error } = await client
        .from("applications")
        .insert([data]);

    // Restore UI state
    btnText.innerText = originalText;
    submitBtn.disabled = false;

    if (error) {
        statusMessage.classList.add('error');
        statusMessage.innerText = "Error: " + error.message;
    } else {
        statusMessage.classList.add('success');
        statusMessage.innerText = "Application submitted successfully 🚀";
        form.reset();
        
        // Remove success message safely after a few seconds
        setTimeout(() => {
            statusMessage.style.opacity = '0';
            setTimeout(() => {
                statusMessage.className = 'status-message';
                statusMessage.innerText = '';
                statusMessage.style.opacity = '';
            }, 300);
        }, 4000);
    }
});
