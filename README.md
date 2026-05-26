# KiddyKode Web Portal

This is the Next.js web application and backend management portal for **KiddyKode**.

## Features

- **Program Registrations**: Forms and backend actions for cohort-based and holiday bootcamp programs.
- **Internationalization (i18n)**: Multi-locale routing supporting custom locale contexts.
- **WhatsApp Automation**: Serverless/Vercel compatible messaging integration communicating with a remote `open-wa` Easy API instance on Render.
- **Job & Reminders Engine**: Database-backed cron processing for scheduled alerts (capped payment reminders, class sessions, retries, and error backoffs).
- **FAQ Auto-Replies**: Rule-based keyword matching algorithm responding immediately to incoming WhatsApp inquiries with anti-loop protection.
- **Admin Dashboard**: A secure portal to manage FAQ templates, settings, message logs, queue retries, class scheduling, and manual message dispatching.

---

## Technical Stack

- **Framework**: Next.js 16.2 (App Router)
- **UI Components**: React 19, Vanilla CSS styled with custom design tokens matching the General Sans/Inter theme
- **Database / Backend**: Supabase (PostgreSQL client)
- **Email Service**: Nodemailer (SMTP transport)
- **WhatsApp engine**: `open-wa` Easy API running on a persistent host (Render)
- **Tests**: Node.js native test runner executed via `tsx`

---

## Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and define the following variables:
```env
# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Email SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-smtp-email@gmail.com
SMTP_PASS=your-smtp-password
EMAIL_FROM=your-smtp-email@gmail.com
CONTACT_EMAIL=your-smtp-email@gmail.com

# Admin Authentication
ADMIN_PASSWORD=your-secret-admin-password

# WhatsApp Automation Integration
WHATSAPP_API_URL=https://your-open-wa-render-instance.com
WHATSAPP_API_KEY=your-api-key-here
CRON_SECRET=optional-cron-validation-secret
```

### 3. Database Migration
To set up the database tables, indices, and row-level security policies, copy the contents of [whatsapp_migration.sql](file:///C:/kiddykode-web/lib/supabase/whatsapp_migration.sql) and run them inside your **Supabase Dashboard SQL Editor**.

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser. The administrative hub is accessible at `/en/admin` (or `/fr/admin`).

---

## Deploying open-wa on Render

To set up the persistent WhatsApp connection, you need to deploy the `open-wa` Easy API server on Render. Follow these instructions:

### 1. Create a Render Web Service
1. Log in to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Web Service**.
3. Choose the **Deploy an existing image** option.
4. Enter the official `open-wa` Docker image: `docker.io/openwa/wa-automate:latest` and click **Next**.

### 2. Configure Service Details
- **Name**: e.g., `kiddykode-whatsapp-api`
- **Region**: Select the region closest to your target audience.
- **Instance Type**: Select **Starter** or higher.
  > [!IMPORTANT]
  > Puppeteer/Chromium requires significant RAM and CPU to run the headless browser. Using the Free instance type is **not recommended** as it will frequently crash due to memory limits, and the automatic spin-down after 15 minutes of inactivity will cause timeouts and lost connections.
- **Environment Variables**:
  - `PORT`: `8080` (This instructs the container to bind to port 8080. Render will automatically route traffic to this port).

### 3. Configure Docker Command (Advanced)
In the **Advanced** section of the Render configuration, set the **Docker Command** to specify your API security key and webhook callback. This ensures the WhatsApp client can forward incoming messages back to your Next.js application:
```bash
-k "YOUR_SECURE_API_KEY_HERE" --webhook "https://your-nextjs-app.vercel.app/api/webhooks/open-wa?secret=YOUR_SECURE_API_KEY_HERE"
```
> [!NOTE]
> Make sure `YOUR_SECURE_API_KEY_HERE` matches the `WHATSAPP_API_KEY` defined in your Next.js environment variables.

### 4. Persist the WhatsApp Session
To prevent having to re-scan the QR code every time the Render service restarts or redeploys:
1. Go to the **Disk** section of your Web Service settings in Render.
2. Click **Add Disk**.
3. Configure the disk:
   - **Name**: e.g., `whatsapp-session-disk`
   - **Mount Path**: `/sessions`
   - **Size**: `1 GiB` (minimum is sufficient)
4. Save changes.

### 5. Scan the QR Code
Once deployed:
1. Go to the **Logs** tab of your Render Web Service.
2. After a minute or two, a QR code will be rendered in the logs.
3. Open WhatsApp on your phone, go to **Linked Devices**, tap **Link a Device**, and scan the QR code.
4. The service will save the authenticated session to the persistent disk at `/sessions` so it remains logged in across restarts.

---

## Testing

The project uses Node.js's built-in test runner to execute TypeScript tests on the fly using `tsx`. Run the unit tests using:
```bash
npm run test
```

---

## WhatsApp Automation Architecture

```
                                    +----------------------------------+
                                    |     Next.js Web Portal (Vercel)  |
                                    +----------------+-----------------+
                                                     |
             Inbound Webhooks                        | Outbound HTTP Requests
       (e.g., /api/webhooks/open-wa)                 | (e.g., /sendText)
                                                     v
                                    +----------------+-----------------+
                                    |     open-wa Easy API (Render)    |
                                    +----------------------------------+
```

### Inbound Events
Incoming WhatsApp messages hit the Next.js API route `/api/webhooks/open-wa?secret=WHATSAPP_API_KEY`. The handler:
1. Validates the secret token.
2. Logs the message in the `whatsapp_message_logs` table.
3. Queries enabled templates in `faq_templates`.
4. Executes matched responses with loop suppression (caps same auto-reply to once per 5 minutes to prevent infinity loops).

### Scheduled & Retry Crons
Instead of a persistent background worker, Vercel Crons run scheduled tasks:
- **Reminder Cron** (`/api/cron/process-reminders?secret=CRON_SECRET`): Runs daily or hourly. Searches unpaid cohort registrations to trigger payment reminders (caps at 2 reminders total, asks user to ignore if payment has been made) and scans classes starting in < 24 hours to alert parents.
- **Retry Cron** (`/api/cron/process-retries?secret=CRON_SECRET`): Scans `whatsapp_jobs` for pending failed messages. Retries the dispatch with exponential backoff (`attempts * 2` minutes). Safe database locking is guaranteed using `FOR UPDATE SKIP LOCKED` during job claims.
