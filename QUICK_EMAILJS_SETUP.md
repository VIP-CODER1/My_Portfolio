# 🚀 Quick EmailJS Setup for Your Portfolio

## Why You're Not Getting Emails
Your form is working perfectly, but it's currently just showing success messages without actually sending emails. We need to connect it to EmailJS to send real emails to vipulmth1@gmail.com.

## Step 1: Create EmailJS Account (2 minutes)
1. Go to: https://www.emailjs.com/
2. Click "Sign Up" (it's free)
3. Use your email: vipulmth1@gmail.com
4. Verify your email address

## Step 2: Add Email Service (3 minutes)
1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended)
4. Click "Connect Account"
5. Sign in with vipulmth1@gmail.com
6. Allow permissions
7. **Copy the Service ID** (looks like: service_abc123)

## Step 3: Create Email Template (2 minutes)
1. Click "Email Templates"
2. Click "Create New Template"
3. Use this exact template:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Hello Vipul,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from your portfolio website.
Reply directly to: {{reply_to}}
```

4. Click "Save"
5. **Copy the Template ID** (looks like: template_xyz789)

## Step 4: Get Public Key (1 minute)
1. Click "Account" in the sidebar
2. Find "Public Key" section
3. **Copy the Public Key** (looks like: user_abc123def456)

## Step 5: Update Your Code (1 minute)
Open `src/components/Contact.jsx` and find these lines:

```javascript
const serviceId = 'service_1234567'; // Replace with your actual service ID
const templateId = 'template_1234567'; // Replace with your actual template ID  
const publicKey = 'your_public_key_here'; // Replace with your actual public key
```

Replace them with your real values:

```javascript
const serviceId = 'service_abc123'; // Your actual service ID
const templateId = 'template_xyz789'; // Your actual template ID
const publicKey = 'user_abc123def456'; // Your actual public key
```

## Step 6: Test It! (1 minute)
1. Save the file
2. Refresh your website
3. Fill out the contact form
4. Submit it
5. Check vipulmth1@gmail.com inbox
6. You should receive the email!

## Troubleshooting
- **No email received?** Check spam folder
- **Error in console?** Double-check your IDs
- **Still not working?** Make sure you saved the file and refreshed

## Free Tier Benefits
- ✅ 200 emails per month
- ✅ No credit card required
- ✅ Perfect for portfolio websites
- ✅ Easy to set up

Total setup time: ~10 minutes
