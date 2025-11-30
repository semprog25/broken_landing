# Broken App Landing Page Package

This folder contains two versions of the landing page:

1. **Standalone HTML (Easy Copy-Paste)**
   - `index.html`: A fully functional, single-file landing page. You can open this file in your browser or upload it to any web host. It includes the Day Theme, bubble animations, and backend connection.
   - `admin.html`: A standalone dashboard to view waitlist signups.

2. **React Components (For App Integration)**
   - `LandingPage.tsx`: The React version for use inside the main application.
   - `WaitlistForm.tsx`: The form component.
   - `BubblesBackground.tsx`: The animation component.
   - `WaitlistAdmin.tsx`: The admin component.

## How to Use (Standalone)

simply download the `components/landing_page_package` folder.

- To launch the landing page: Open `index.html` in any browser.
- To check signups: Open `admin.html` in any browser.

## Backend Setup

Both versions connect to the same Supabase backend endpoint:
- `POST https://[project-id].supabase.co/functions/v1/make-server-bf0073c5/waitlist`

## Styling

The standalone files use Tailwind CSS via CDN, making them portable and easy to edit without a build process.
