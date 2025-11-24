# 🚀 Deployment Guide for Broken Landing Page

## Quick Deployment Steps

### 1. Prepare Your Files

Download all files from the `/landing` folder:
- index.html
- privacy.html
- terms.html
- support.html
- styles.css
- script.js
- robots.txt
- sitemap.xml
- .htaccess
- README.md

### 2. Add Required Images

Create and add these images to your `/landing` folder:

**favicon.png** (32x32 or 64x64)
- Simple PNG icon of your app logo
- Shows in browser tabs

**app-icon-180.png** (180x180)
- Apple Touch Icon for iOS devices
- Used when saving website to home screen

**og-image.png** (1200x630)
- Social media preview image
- Shows when sharing on Facebook, Twitter, LinkedIn
- Should include app logo and tagline

### 3. Update App Store Links

Open `index.html` and replace:

```html
<!-- Line 24 -->
<meta name="apple-itunes-app" content="app-id=YOUR_APP_ID">
<!-- Replace YOUR_APP_ID with your actual Apple App Store ID -->

<!-- Line 208 -->
<a href="https://apps.apple.com/app/broken" ...>
<!-- Replace with your actual App Store URL -->

<!-- Line 219 -->
<a href="https://play.google.com/store/apps/details?id=com.broken.app" ...>
<!-- Replace with your actual Google Play URL -->
```

### 4. Upload to Your Server

#### Option A: FTP/SFTP (Most Common)

1. Open your FTP client (FileZilla, Cyberduck, etc.)
2. Connect to broken.semprog.de
   - Host: broken.semprog.de (or provided IP)
   - Username: [your FTP username]
   - Password: [your FTP password]
   - Port: 21 (FTP) or 22 (SFTP)

3. Navigate to your public directory:
   - Usually: `/public_html/` or `/www/` or `/htdocs/`

4. Upload ALL files from `/landing` folder

5. Set correct permissions:
   - Files: 644
   - Folders: 755

#### Option B: cPanel File Manager

1. Log into your cPanel at broken.semprog.de/cpanel
2. Open "File Manager"
3. Navigate to `public_html`
4. Click "Upload"
5. Select all files from `/landing` folder
6. Upload and extract if zipped

#### Option C: Git Deployment (Advanced)

```bash
# In your /landing folder
cd landing
git init
git add .
git commit -m "Initial landing page deployment"

# Add your remote (if using Git hosting)
git remote add origin [your-git-url]
git push origin main

# Then pull on your server
ssh user@broken.semprog.de
cd /var/www/html/
git pull origin main
```

### 5. Configure DNS (if needed)

Make sure your domain points to your hosting:

**DNS A Record:**
- Host: @ or broken.semprog.de
- Type: A
- Value: [Your Server IP]
- TTL: 3600

**DNS CNAME (if using www):**
- Host: www
- Type: CNAME
- Value: broken.semprog.de
- TTL: 3600

### 6. Enable SSL Certificate

**Most hosts provide free SSL via Let's Encrypt:**

1. Log into cPanel
2. Find "SSL/TLS Status" or "Let's Encrypt SSL"
3. Enable SSL for broken.semprog.de
4. Force HTTPS (already configured in .htaccess)

**Or via command line:**
```bash
# Using Certbot
sudo certbot --nginx -d broken.semprog.de -d www.broken.semprog.de
```

### 7. Test Your Website

Visit these URLs and verify they work:

✅ https://broken.semprog.de/
✅ https://broken.semprog.de/privacy
✅ https://broken.semprog.de/terms
✅ https://broken.semprog.de/support
✅ https://broken.semprog.de/robots.txt
✅ https://broken.semprog.de/sitemap.xml

Test that:
- [ ] All navigation links work
- [ ] All email links open mail client
- [ ] Mobile responsive design works
- [ ] HTTPS is forced (try http:// and see if it redirects)
- [ ] Images load correctly
- [ ] Smooth scrolling works
- [ ] Contact forms work (if added)

### 8. Set Up Email Addresses

Create these email addresses in your hosting control panel:

**support@broken.semprog.de**
- Use for: General inquiries, bug reports, feedback
- Set up: Auto-responder acknowledging receipt
- Forward to: Your main email

**privacy@broken.semprog.de**
- Use for: Privacy requests, data deletion, GDPR/CCPA
- Set up: Priority inbox, quick response required
- Forward to: Your main email + privacy team

**Example Auto-Responder:**
```
Thank you for contacting Broken Support!

We've received your message and will respond within 24-48 hours.

If you're experiencing a mental health crisis, please don't wait for our response. Contact:
- Emergency Services: 911
- Suicide & Crisis Lifeline: 988
- Crisis Text Line: Text HOME to 741741

Best regards,
Broken Support Team
```

### 9. Submit to App Stores

#### Apple App Store Submission

In App Store Connect:
1. **Support URL:** https://broken.semprog.de/support
2. **Privacy Policy URL:** https://broken.semprog.de/privacy
3. **Marketing URL:** https://broken.semprog.de

#### Google Play Store Submission

In Google Play Console:
1. **Website:** https://broken.semprog.de
2. **Email:** support@broken.semprog.de
3. **Privacy Policy:** https://broken.semprog.de/privacy
4. **Terms of Service:** https://broken.semprog.de/terms

### 10. Add Analytics (Optional)

**Google Analytics:**

1. Create GA4 property at analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Simple Analytics (Privacy-Friendly Alternative):**
- Sign up at simpleanalytics.com
- Add their script tag

### 11. SEO Setup

**Submit to Search Engines:**

1. **Google Search Console**
   - Add property: https://broken.semprog.de
   - Submit sitemap: https://broken.semprog.de/sitemap.xml
   - Request indexing

2. **Bing Webmaster Tools**
   - Add site
   - Submit sitemap

**Optional - Create Social Media Cards:**

Test your social media previews:
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### 12. Performance Optimization

**Already included in .htaccess:**
- ✅ Gzip compression
- ✅ Browser caching
- ✅ Image optimization headers

**Additional optimizations:**

1. Compress images before upload (use TinyPNG.com)
2. Use WebP format for images (convert PNGs)
3. Enable CDN (Cloudflare free tier)

### 13. Monitor Uptime

Set up monitoring:
- **UptimeRobot** (free): Monitor website uptime
- **Google Search Console**: Monitor SEO issues
- **Browser Console**: Check for JavaScript errors

## Troubleshooting

### Problem: Website shows "404 Not Found"

**Solutions:**
- Verify files are in correct directory (`public_html` or `www`)
- Check file permissions (644 for files)
- Ensure index.html is present
- Clear browser cache

### Problem: CSS/JS not loading

**Solutions:**
- Check file paths in HTML are correct
- Verify styles.css and script.js uploaded
- Check file permissions
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

### Problem: HTTPS not working

**Solutions:**
- Install SSL certificate in cPanel
- Update .htaccess RewriteRule
- Contact hosting support
- Wait 24-48 hours for DNS propagation

### Problem: Emails not sending from contact form

**Solutions:**
- Verify email addresses exist in cPanel
- Check SPF and DKIM records
- Test with a simple mail() PHP script
- Use SMTP instead of mail()

### Problem: App Store links not working

**Solutions:**
- Replace placeholder URLs with actual store URLs
- Wait until apps are approved and published
- Use universal links for better iOS integration

## Post-Deployment Checklist

Before announcing your website:

- [ ] All pages load without errors
- [ ] All links work correctly
- [ ] All images display properly
- [ ] Mobile responsive on all devices
- [ ] HTTPS is working and forced
- [ ] Email addresses are set up and working
- [ ] Privacy policy matches app behavior
- [ ] Terms of service reviewed by legal (if possible)
- [ ] Crisis hotlines verified and up-to-date
- [ ] App store links point to correct apps
- [ ] SEO meta tags filled in
- [ ] Social media preview images working
- [ ] Analytics tracking (if added)
- [ ] Sitemap submitted to search engines
- [ ] Speed test passed (use GTmetrix or PageSpeed Insights)

## Maintenance

**Monthly:**
- Check all external links (crisis hotlines, resources)
- Review analytics for popular pages
- Update statistics if needed
- Check for broken links

**Quarterly:**
- Review and update privacy policy if app changes
- Update terms of service if needed
- Refresh testimonials
- Update app screenshots

**Yearly:**
- Review all legal pages
- Update crisis hotline numbers
- Refresh design if needed
- Update copyright year

## Support

If you need help with deployment:
- **Hosting Support:** Contact your hosting provider
- **Technical Questions:** Email support@broken.semprog.de
- **DNS Issues:** Contact your domain registrar

## Success! 🎉

Your landing page is now live at https://broken.semprog.de

**Share it:**
- Add to app store listings
- Include in app (about section)
- Share on social media
- Include in marketing materials

---

**Deployed:** [Date]
**Last Updated:** November 24, 2025
**Version:** 1.0
