# Contact Form Setup Instructions

## EmailJS Integration

To make the contact form work and actually send emails, follow these steps:

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account

### 2. Set up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use these template variables in your email content:
   ```
   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```

### 4. Get Your Credentials
1. Go to "Account" → "General" to get your **Public Key**
2. Note your **Service ID** from the Email Services page
3. Note your **Template ID** from the Email Templates page

### 5. Update the Code
In `js/script.js`, replace these placeholders:

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your Public Key

// In the handleFormSubmission function:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
```

### Example Configuration
```javascript
emailjs.init("user_1234567890abcdef"); // Your Public Key
emailjs.send('service_gmail123', 'template_abc456', emailParams)
```

## Fallback Method

If EmailJS is not set up, the form will automatically fall back to opening the user's default email client with a pre-filled message.

## Features Added

✅ **Fixed input field spacing** - Icons no longer overlap with text
✅ **Real-time form validation** - Shows errors as users type
✅ **Visual feedback** - Success/error states for form fields
✅ **Email integration** - Actual email sending capability
✅ **Loading states** - Shows progress while sending
✅ **Notifications** - Toast messages for success/error feedback
✅ **Fallback support** - mailto: link if EmailJS fails
✅ **User-friendly design** - Better visual cues and interactions

## Testing

1. Fill out the form with valid information
2. If EmailJS is configured, emails will be sent directly
3. If not configured, it will open your email client
4. Check for validation errors on invalid inputs
