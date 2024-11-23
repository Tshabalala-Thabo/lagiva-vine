TODO
- When deleting a category, remove it's id form array of all products
- Only admin tokens should expire after 1 hour
- make sure on update user the userController should never set a user as admin
- iclude the stock stats for all products

TODO FROM CHAT
1. Logout Button Placement
Current Position: The logout button on the sidebar is a common placement in admin panels, especially if it’s a dedicated link at the bottom.
Alternative Suggestion: Another option is to place it within a dropdown menu under the profile avatar at the top right. This would be more consistent with many modern applications, where users expect profile and account-related actions to be grouped under their avatar.
2. Profile Menu Dropdown
When a user clicks on the profile (avatar or name), you can implement a dropdown with the following options:

View Profile: Opens a page or modal with user details such as name, email, and other relevant information.
Edit Profile: Allows the admin to update their personal information, like name, contact details, and possibly their password.
Logout: This option can also be placed here instead of the sidebar.
This dropdown can provide a streamlined user experience by grouping all personal account actions in one place.

3. Organizing the Settings Page
Here’s a suggestion for organizing the Settings section:

A. General Settings
Site Name & Logo: Allow admins to customize the site name and logo.
Contact Information: Add fields for contact information such as email and phone number.
Theme Customization: Options for light/dark mode or primary color selection for the UI.
B. User Management Settings
Roles & Permissions: If your application has different roles (e.g., admin, user), allow admins to set permissions or access control levels for each role.
Password Policy: Settings to define password strength and reset policies.
C. Notifications Settings
Email Notifications: Enable or disable email notifications for specific actions (e.g., new user registration, product updates).
Push Notifications: If applicable, allow configuration for push notifications or in-app alerts.
D. Security Settings
Two-Factor Authentication (2FA): Allow admins to enable or disable 2FA for added security.
Session Timeout: Define how long an admin session lasts before automatically logging out.
IP Whitelisting: Optional, depending on the sensitivity of your application, to restrict access from certain IP addresses.
4. Additional Features to Consider
Analytics Dashboard: In addition to user and revenue stats, you could add key performance indicators relevant to your admin panel, like traffic or site activity.
Activity Logs: Track admin actions to keep a record of important activities for security and auditing.
Help or Support Section: A place where admins can find resources, documentation, or contact support for assistance.

Some additional recommendations:

Rate Limiting:

javascriptCopyimport rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to auth routes
router.use('/api/auth', authLimiter);

Consider adding token expiration checking:

javascriptCopyif (decoded.exp && Date.now() >= decoded.exp * 1000) {
  return res.status(401).json({ message: 'Token has expired' });
}

BUG LIST
- Products form doesnt validate empty input
- when making a cart item to have 10 quantity, it cant be changed to 10+

COMMANDS
- Add component: npx shadcn add
- Create mongo migration file: npx migrate-mongo create add-published-field-to-products -f migrate-mongo-wrapper.cjs
- Run mongo migration: npx migrate-mongo up
- Start backend with nodemon: npm run start:dev


BUSINESS RULES
- Names are optional on registration
- Orders should always require a profile with all details (names, phone)
- Admin can only change users role to staff, admin role should only be assigned directly on the database
