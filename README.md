# Broken Landing Page

Complete landing page website for the Broken app - a social wellness application for breakup recovery.

## 📁 Files Included

- **index.html** - Main landing page with features, testimonials, and download links
- **privacy.html** - Comprehensive privacy policy (GDPR & CCPA compliant)
- **terms.html** - Terms of Service with legal disclaimers
- **support.html** - Support center with FAQ, crisis resources, and contact info
- **styles.css** - Complete styling with dark theme and responsive design
- **script.js** - Interactive features and smooth scrolling

## 🚀 Quick Start

1. **Upload all files** to your web hosting (broken.semprog.de)
2. **Add your app store links** in index.html (lines with "YOUR_APP_ID" and app store URLs)
3. **Add favicon and logo images** (see requirements below)
4. **Test all links** before launching

## 📋 Required Images

You need to add these images to the `/landing` folder:

### Required Files:
- **favicon.png** - 32x32 or 64x64 favicon
- **app-icon-180.png** - 180x180 Apple Touch Icon
- **og-image.png** - 1200x630 social media preview image (shows when shared on Facebook/Twitter)

### Optional (recommended):
- App screenshots for the hero section
- Logo variations if needed

## ⚙️ Customization

### Update App Store Links

In **index.html**, replace these placeholders:

```html
<!-- Line ~24: Apple App Store ID -->
<meta name="apple-itunes-app" content="app-id=YOUR_APP_ID">

<!-- Line ~208: App Store Link -->
<a href="https://apps.apple.com/app/broken" class="store-button">

<!-- Line ~219: Google Play Link -->
<a href="https://play.google.com/store/apps/details?id=com.broken.app" class="store-button">
```

### Update Contact Information

Emails are already set to:
- support@broken.semprog.de
- privacy@broken.semprog.de

### Update Statistics (Optional)

In **index.html** around line 75, you can update these numbers:
- 50K+ Active Healers
- 1M+ Support Messages
- 4.8★ App Rating

## 🌐 iOS & Android Launch Requirements

### ✅ This package includes:

**For Apple App Store:**
- [x] Privacy Policy (required)
- [x] Terms of Service (required)
- [x] Support URL (required)
- [x] App icon meta tags
- [x] Legal disclaimers about not being a medical service
- [x] Data collection transparency
- [x] User rights (CCPA/GDPR)

**For Google Play Store:**
- [x] Privacy Policy (required)
- [x] Terms of Service (required)
- [x] Support contact info
- [x] Content rating disclosures
- [x] Data safety information

## 📱 Deployment to broken.semprog.de

### Option 1: FTP/SFTP Upload
1. Connect to your hosting via FTP
2. Upload all files to the public_html or www directory
3. Ensure permissions are set correctly (644 for files, 755 for directories)

### Option 2: Git Deployment
```bash
cd landing
git init
git add .
git commit -m "Initial landing page"
git push origin main
```

### Option 3: Copy/Paste
Simply copy all files to your web server using your hosting control panel file manager.

## 🔍 SEO Optimization

The landing page includes:
- Meta descriptions and keywords
- Open Graph tags for social media
- Twitter card tags
- Semantic HTML structure
- Fast loading times
- Mobile responsive design

## 📊 Analytics (Optional)

To add Google Analytics, insert this code before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎨 Design Features

- **Cyberpunk Dark Theme** - Matches app design
- **Purple/Blue Gradient** - Brand colors throughout
- **Smooth Animations** - Scroll effects and transitions
- **Mobile Responsive** - Works on all screen sizes
- **Fast Loading** - No heavy frameworks, pure CSS/JS

## 📞 Contact URLs

All contact links point to:
- **General Support:** support@broken.semprog.de
- **Privacy Inquiries:** privacy@broken.semprog.de
- **Website:** broken.semprog.de

## ⚖️ Legal Compliance

### Included Legal Pages:

1. **Privacy Policy** - Covers:
   - Data collection practices
   - GDPR compliance (European users)
   - CCPA compliance (California users)
   - User rights and data deletion
   - Security measures
   - Legal disclaimers

2. **Terms of Service** - Covers:
   - User conduct rules
   - Subscription terms
   - Intellectual property
   - Limitation of liability
   - Dispute resolution
   - Crisis disclaimers

3. **Support Page** - Includes:
   - Crisis hotlines (updated for 2025)
   - FAQ section
   - Contact methods
   - Community guidelines
   - Mental health resources

### Important Disclaimers Included:
✅ "Not a mental health service provider"
✅ "Not a substitute for therapy"
✅ "Contact emergency services in crisis"
✅ "Not for collecting sensitive PII"
✅ "User content is not professional advice"

## 🔒 Privacy & Security Notes

- No tracking scripts included (add your own analytics if needed)
- No cookies used (unless you add them)
- No external dependencies for core functionality
- All links use `rel="noopener"` for security
- Forms can be added for newsletter signup if desired

## 🌍 Multi-Language Support

The current version is in English. To add more languages:

1. Create language-specific versions: `index-de.html`, `index-es.html`, etc.
2. Add language selector in navigation
3. Update meta tags for each language
4. Consider using `hreflang` tags for SEO

## 📧 Email Configuration

Make sure these email addresses are set up on your domain:
- support@broken.semprog.de
- privacy@broken.semprog.de

Set up auto-responders to acknowledge receipt of emails.

## ✅ Pre-Launch Checklist

Before going live:

- [ ] Upload all HTML, CSS, and JS files
- [ ] Add favicon.png and app-icon-180.png
- [ ] Add og-image.png for social media
- [ ] Replace "YOUR_APP_ID" with real Apple App Store ID
- [ ] Update app store URLs when apps are published
- [ ] Test all navigation links
- [ ] Test on mobile devices
- [ ] Test contact email links
- [ ] Verify privacy policy matches app practices
- [ ] Check loading speed
- [ ] Verify SSL certificate is active (https)
- [ ] Submit to Apple App Store review with support URL
- [ ] Submit to Google Play Store with privacy policy URL

## 🆘 Troubleshooting

**Problem:** Pages not displaying correctly
- **Solution:** Check file permissions (644 for files)
- **Solution:** Ensure all files are in the same directory

**Problem:** CSS not loading
- **Solution:** Verify `styles.css` path in HTML files
- **Solution:** Clear browser cache

**Problem:** Links not working
- **Solution:** Check that href paths are relative
- **Solution:** Ensure file names match exactly (case-sensitive)

## 📞 Support

For questions about this landing page package:
- Email: support@broken.semprog.de

## 📄 License

This landing page was created specifically for the Broken app.
© 2025 Broken. All rights reserved.

---

**Last Updated:** November 24, 2025
**Version:** 1.0
**Compatible with:** iOS App Store & Google Play Store requirements
