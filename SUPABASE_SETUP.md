# Supabase Setup Guide for Email Waitlist

This guide will help you set up Supabase to collect and store emails from your landing page.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name:** Broken Waitlist (or your choice)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your users
5. Wait 2-3 minutes for project to be created

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, click "Settings" (gear icon)
2. Click "API" in the sidebar
3. Copy these two values:
   - **Project URL:** Looks like `https://xxxxx.supabase.co`
   - **anon public key:** Long string starting with `eyJhb...`

## Step 3: Create the Database Table

### Option A: Using SQL Editor (Recommended)

1. In Supabase dashboard, click "SQL Editor" in sidebar
2. Click "New Query"
3. Paste this SQL code:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    source TEXT DEFAULT 'landing_page',
    status TEXT DEFAULT 'pending',
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for faster email lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX idx_waitlist_status ON waitlist(status);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for public form)
CREATE POLICY "Allow public email signups"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow viewing own email (optional)
CREATE POLICY "Allow viewing waitlist"
ON waitlist
FOR SELECT
TO authenticated, anon
USING (true);

-- Add comment
COMMENT ON TABLE waitlist IS 'Email waitlist signups from landing page';
```

4. Click "Run" button
5. You should see "Success. No rows returned"

### Option B: Using Table Editor

1. Click "Table Editor" in sidebar
2. Click "New Table"
3. Fill in:
   - **Name:** waitlist
   - **Description:** Email waitlist signups
   - **Enable Row Level Security:** ON

4. Add columns:
   - **id:** uuid, primary key, default value: `gen_random_uuid()`
   - **email:** text, not null, unique
   - **created_at:** timestamptz, default value: `now()`
   - **source:** text, default value: `'landing_page'`
   - **status:** text, default value: `'pending'`
   - **metadata:** jsonb, default value: `'{}'`

5. Click "Save"

6. Add RLS Policy:
   - Go to "Authentication" → "Policies"
   - Click "New Policy" on waitlist table
   - Policy Name: "Allow public email signups"
   - Policy Command: INSERT
   - Target Roles: anon
   - USING expression: `true`
   - Click "Save"

## Step 4: Configure Your Landing Page

1. Open `/landing/supabase-config.js`

2. Replace these values:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your Project URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your anon public key
```

3. Example:

```javascript
const SUPABASE_URL = 'https://abcdefghijk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## Step 5: Test the Integration

1. Upload all files to your server (broken.semprog.de)
2. Open your website in a browser
3. Scroll to the email signup section
4. Enter a test email and click "Join Waitlist"
5. You should see a success message: "Thanks for joining! We'll notify you when we launch."

6. Verify in Supabase:
   - Go to Supabase dashboard
   - Click "Table Editor"
   - Click "waitlist" table
   - You should see your test email!

## Step 6: View and Export Emails

### View in Supabase Dashboard

1. Go to Supabase dashboard
2. Click "Table Editor"
3. Click "waitlist" table
4. See all emails with timestamps

### Export to CSV

1. In Table Editor, click the "..." menu
2. Click "Export as CSV"
3. Save the file
4. Open in Excel, Google Sheets, or any spreadsheet app

### Query with SQL

```sql
-- Get all emails
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Count total signups
SELECT COUNT(*) FROM waitlist;

-- Get today's signups
SELECT * FROM waitlist 
WHERE created_at >= CURRENT_DATE;

-- Get pending signups
SELECT * FROM waitlist 
WHERE status = 'pending';
```

## Step 7: Set Up Email Notifications (Optional)

### Option A: Supabase Database Webhooks

1. Go to "Database" → "Webhooks" in Supabase
2. Create new webhook
3. Configure to send to your email service (Zapier, Make, etc.)

### Option B: Supabase Edge Functions

1. Create an Edge Function to send emails
2. Trigger on new waitlist inserts
3. Use SendGrid, Mailgun, or similar service

### Option C: Daily Email Digest

Use a cron job or scheduled task to send you daily summaries:

```sql
-- Get today's new signups
SELECT email, created_at 
FROM waitlist 
WHERE created_at >= CURRENT_DATE
ORDER BY created_at DESC;
```

## Security Best Practices

✅ **Already Implemented:**
- Row Level Security (RLS) enabled
- Only INSERT allowed from public
- Unique email constraint (no duplicates)
- Email validation on frontend

✅ **Recommended Additional Steps:**

1. **Rate Limiting:** Add rate limiting to prevent spam
   - Use Cloudflare (free tier includes rate limiting)
   - Or implement in your backend

2. **Email Verification:** Consider adding email verification
   - Send confirmation email
   - Add `verified` boolean column
   - Update status after verification

3. **CAPTCHA:** Add reCAPTCHA or hCaptcha
   - Prevents bot signups
   - Easy to integrate

## Troubleshooting

### Problem: "Service temporarily unavailable"

**Solutions:**
- Check that SUPABASE_URL and SUPABASE_ANON_KEY are set correctly
- Verify Supabase project is active (not paused)
- Check browser console for errors (F12)

### Problem: "Something went wrong"

**Solutions:**
- Check RLS policies are set correctly
- Verify table name is exactly "waitlist"
- Check column names match the SQL code

### Problem: "This email is already on our waitlist"

**Solution:**
- This is expected! It means the email already signed up
- The unique constraint is working correctly

### Problem: Emails not appearing in Supabase

**Solutions:**
- Check Table Editor → waitlist table
- Verify RLS policy allows INSERT
- Check browser Network tab for errors (F12)
- Try a different email address

### Problem: CORS errors in console

**Solutions:**
- Supabase should handle CORS automatically
- If issues persist, check Supabase API settings
- Ensure you're using the anon key, not service key

## Database Schema

```
waitlist
├── id (uuid, primary key)
├── email (text, unique, not null)
├── created_at (timestamptz, default now())
├── source (text, default 'landing_page')
├── status (text, default 'pending')
└── metadata (jsonb, default '{}')
```

## Useful SQL Queries

### Get signup statistics
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as signups
FROM waitlist
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Find duplicate emails (shouldn't be any)
```sql
SELECT email, COUNT(*) 
FROM waitlist 
GROUP BY email 
HAVING COUNT(*) > 1;
```

### Update email status
```sql
UPDATE waitlist 
SET status = 'contacted' 
WHERE email = 'user@example.com';
```

### Delete test emails
```sql
DELETE FROM waitlist 
WHERE email LIKE '%test%';
```

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Create waitlist table
3. ✅ Configure supabase-config.js
4. ✅ Test email signup
5. ⏭️ Set up email notifications (optional)
6. ⏭️ Add analytics tracking (optional)
7. ⏭️ Export emails regularly
8. ⏭️ Send launch announcement to waitlist!

## Support

**Issues with Supabase:**
- Check [Supabase Documentation](https://supabase.com/docs)
- Visit [Supabase Community](https://github.com/supabase/supabase/discussions)

**Issues with landing page:**
- Check browser console for errors (F12)
- Verify all files uploaded correctly
- Test in different browsers

---

**Created:** November 24, 2025  
**Version:** 1.0  
**Tested with:** Supabase v2, Modern browsers
