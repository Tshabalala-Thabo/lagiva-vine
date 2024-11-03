TODO
- When deleting a category, remove it's id form array of all products
- Only admin tokens should expire after 1 hour
- make sure on update user the userController should never set a user as admin

BUG LIST
- Products form doesnt validate empty input

COMMANDS
- Add component: npx shadcn add
- Create mongo migration file: npx migrate-mongo create add-published-field-to-products -f migrate-mongo-wrapper.cjs
- Run mongo migration: npx migrate-mongo up

BUSINESS RULES
- Names are optional on registration
- Orders should always require a profile with all details (names, phone)
- Admin can only change users role to staff, admin role should only be assigned directly on the database
