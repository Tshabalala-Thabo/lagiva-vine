import bcrypt from 'bcrypt';

export const up = async (db, client) => {
  const adminEmail = 'admin@example.com'; // Set the admin email
  const adminPassword = 'adminPassword'; // Set a secure password for the admin

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = {
    email: adminEmail,
    password: hashedPassword,
    role: 'admin', // Set the role to admin
  };

  // Insert the admin user into the users collection
  await db.collection('users').insertOne(adminUser);
};

export const down = async (db, client) => {
  // Remove the admin user by email
  await db.collection('users').deleteOne({ email: 'admin@example.com' });
};