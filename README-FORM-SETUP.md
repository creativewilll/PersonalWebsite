# Contact Form Setup Instructions

## Form Submission System Overview

The contact form on this website submits data directly to an n8n webhook:
`https://n8n.spurlocksolutions.ai/webhook-test/spurlockformsubmissions`

## How It Works

1. When a user submits the form, the data is sent directly to the n8n webhook
2. The webhook can be configured in n8n to:
   - Send email notifications
   - Store data in a database
   - Trigger automation workflows
   - Connect with other services (CRM, etc.)

## Form Data Structure

The form submissions include:
- name
- email
- phone
- projectType
- budget
- message
- timestamp (automatically added)

## Testing the Form

To ensure everything is working:

1. Submit a test form on your website
2. Check the n8n workflow execution history to confirm the data was received

## Troubleshooting

If form submissions aren't working:

1. Check if the n8n instance is running at `n8n.spurlocksolutions.ai`
2. Verify the webhook endpoint is still active in n8n
3. Check browser console for any JavaScript errors or CORS issues 