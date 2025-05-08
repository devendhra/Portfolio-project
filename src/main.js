import { createClient } from "@supabase/supabase-js";
import * as emailjs from '@emailjs/browser';
import './styles/tailwind.css';

const SUPABASE_URL = "https://uzhdlfqtajjjbywjctfu.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6aGRsZnF0YWpqamJ5d2pjdGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1ODc4NjksImV4cCI6MjA2MjE2Mzg2OX0.OoAIVMuQRsWdR17gRc-dD8ueiCGy3vtVZ1AO5tKJiOk";

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

emailjs.init("GyyNr5F7em_VxFkMw");


//Form submission Logic
document.addEventListener('submit', async function(e){
    e.preventDefault();     

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const now = new Date().toLocaleString();

    // Show loading spinner
    btn.disabled = true;
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');


    //1.Save user into database
    const { error } = await supabase.from('contact_messages').insert([{name, email, message}]);
    if(error){
        alert("Error saving in database");
        return;
    }


    //2.Sends response mail to you
    try {
    await emailjs.send('service_0waodaw', 'template_5b6jjnh', {
        from_name: name,
        from_email: email,
        message,
        time: now
    });
    } catch (error) {
        console.error('Error sending email to you:', error);
        alert('Error sending email to you');
        resetButton();
        return;
    }


    //3.Reply to user 
    try {
    await emailjs.send('service_0waodaw', 'template_9dxtvmr', {
        to_name: name,
        to_email: email,
    })
    } catch (error) {
        console.error('Error sending email to user:', error);
        alert('Error sending email to user');
        resetButton();
        return;
    }

     // Reset button state
    resetButton();
    e.target.reset();

    function resetButton(){
        btn.disabled= false;
        btnText.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
    }


});