import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [passwordMatchTiles, setPasswordMatchTiles] = useState([]);
  const [passwordHints, setPasswordHints] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const navigate = useNavigate();
  const { register, error, loading } = useAuth();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[!@#$%^&*]/.test(password)) strength += 12.5;
    setPasswordStrength(strength);
  };

  const checkPasswordHints = (password) => {
    setPasswordHints({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
  };

  const updatePasswordMatchTiles = (password, confirmPassword) => {
    const maxLength = Math.max(password.length, confirmPassword.length);
    const tiles = Array(maxLength).fill(false).map((_, index) => {
      if (index >= password.length || index >= confirmPassword.length) {
        return null;
      }
      return password[index] === confirmPassword[index];
    });
    setPasswordMatchTiles(tiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      checkPasswordStrength(value);
      checkPasswordHints(value);
      updatePasswordMatchTiles(value, formData.confirmPassword);
    }
    
    if (name === 'confirmPassword') {
      updatePasswordMatchTiles(formData.password, value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(formData);
        alert('Registration successful');
        navigate('/login');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block mb-2">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="relative space-y-2">
            <label className="block mb-2">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className={`h-full rounded transition-all ${
                    passwordStrength > 75 ? 'bg-green-500' :
                    passwordStrength > 50 ? 'bg-blue-500' :
                    passwordStrength > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>

            <div className="text-sm space-y-1 mt-2">
              <p className={`flex items-center ${passwordHints.length ? 'text-green-600' : 'text-gray-600'}`}>
                <span className="mr-2">{passwordHints.length ? '✓' : '○'}</span>
                At least 8 characters
              </p>
              <p className={`flex items-center ${passwordHints.uppercase ? 'text-green-600' : 'text-gray-600'}`}>
                <span className="mr-2">{passwordHints.uppercase ? '✓' : '○'}</span>
                One uppercase letter
              </p>
              <p className={`flex items-center ${passwordHints.lowercase ? 'text-green-600' : 'text-gray-600'}`}>
                <span className="mr-2">{passwordHints.lowercase ? '✓' : '○'}</span>
                One lowercase letter
              </p>
              <p className={`flex items-center ${passwordHints.number ? 'text-green-600' : 'text-gray-600'}`}>
                <span className="mr-2">{passwordHints.number ? '✓' : '○'}</span>
                One number
              </p>
              <p className={`flex items-center ${passwordHints.special ? 'text-green-600' : 'text-gray-600'}`}>
                <span className="mr-2">{passwordHints.special ? '✓' : '○'}</span>
                One special character (!@#$%^&*)
              </p>
            </div>
          </div>

          <div className="relative space-y-2">
            <label className="block mb-2">Confirm Password:</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex gap-1 mt-2">
              {passwordMatchTiles.map((matches, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    matches === null ? 'bg-gray-300' :
                    matches ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              ))}
            </div>
            
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          
          {error && <p className="text-red-500 mt-4">{error}</p>}
          
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
            </p>
          </div>
        </form>
      </div>
      <div className="flex-1 bg-cover bg-center hidden md:block" style={{ backgroundImage: 'url(/assets/hero_images/hero_2.png)' }} />
    </div>
  );
};

export default Register;