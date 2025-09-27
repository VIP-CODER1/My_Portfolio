# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your email provider
5. **Copy the Service ID** (starts with "service_")

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. **Copy the Template ID** (starts with "template_")

## Step 4: Get Public Key
1. Go to "Account" in your dashboard
2. Find "Public Key" section
3. **Copy the Public Key**

## Step 5: Update Your Code
Replace these values in `src/components/Contact.jsx`:

```javascript
const serviceId = 'YOUR_SERVICE_ID_HERE'; // Replace with your actual service ID
const templateId = 'YOUR_TEMPLATE_ID_HERE'; // Replace with your actual template ID  
const publicKey = 'YOUR_PUBLIC_KEY_HERE'; // Replace with your actual public key
```

## Step 6: Test the Form
1. Fill out the contact form
2. Submit the form
3. Check your email (vipulmth1@gmail.com)
4. You should receive the message

## Troubleshooting
- Make sure all IDs are correct
- Check browser console for errors
- Verify your email service is properly connected
- Test with a simple message first

## Free Tier Limits
- 200 emails per month
- Perfect for portfolio contact forms
- No credit card required