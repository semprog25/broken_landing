// Supabase Configuration for Landing Page
// Replace these with your actual Supabase project credentials

const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // e.g., https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Your anon/public key

// Initialize Supabase client
let supabase;

// Load Supabase from CDN and initialize
function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase initialized successfully');
    } else {
        console.error('Supabase library not loaded');
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle email signup
async function handleEmailSignup(email) {
    // Validate email
    if (!email || email.trim() === '') {
        return {
            success: false,
            message: 'Please enter your email address'
        };
    }

    if (!isValidEmail(email)) {
        return {
            success: false,
            message: 'Please enter a valid email address'
        };
    }

    // Check if Supabase is initialized
    if (!supabase) {
        console.error('Supabase not initialized');
        return {
            success: false,
            message: 'Service temporarily unavailable. Please try again later.'
        };
    }

    try {
        // Insert email into waitlist table
        const { data, error } = await supabase
            .from('waitlist')
            .insert([
                {
                    email: email.toLowerCase().trim(),
                    created_at: new Date().toISOString(),
                    source: 'landing_page',
                    status: 'pending'
                }
            ])
            .select();

        if (error) {
            // Check if email already exists
            if (error.code === '23505') {
                return {
                    success: false,
                    message: 'This email is already on our waitlist!'
                };
            }
            
            console.error('Supabase error:', error);
            return {
                success: false,
                message: 'Something went wrong. Please try again.'
            };
        }

        // Success!
        return {
            success: true,
            message: 'Thanks for joining! We\'ll notify you when we launch.',
            data: data
        };

    } catch (err) {
        console.error('Error submitting email:', err);
        return {
            success: false,
            message: 'Network error. Please check your connection and try again.'
        };
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('email-notification');
    if (!notification) return;

    notification.textContent = message;
    notification.className = `email-notification ${type}`;
    notification.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase
    initSupabase();

    const emailForm = document.getElementById('email-signup-form');
    const emailInput = document.getElementById('signup-email');
    const submitButton = document.getElementById('signup-submit');

    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = emailInput.value;

            // Disable button and show loading
            submitButton.disabled = true;
            submitButton.textContent = 'Joining...';

            // Submit email
            const result = await handleEmailSignup(email);

            // Show notification
            if (result.success) {
                showNotification(result.message, 'success');
                emailInput.value = ''; // Clear input
                submitButton.textContent = '✓ Joined!';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitButton.textContent = 'Join Waitlist';
                    submitButton.disabled = false;
                }, 2000);
            } else {
                showNotification(result.message, 'error');
                submitButton.textContent = 'Join Waitlist';
                submitButton.disabled = false;
            }
        });

        // Real-time validation
        emailInput.addEventListener('blur', function() {
            const email = emailInput.value.trim();
            if (email && !isValidEmail(email)) {
                emailInput.classList.add('invalid');
            } else {
                emailInput.classList.remove('invalid');
            }
        });

        emailInput.addEventListener('input', function() {
            emailInput.classList.remove('invalid');
        });
    }
});
