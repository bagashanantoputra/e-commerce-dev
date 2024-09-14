import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { useMutation } from 'react-query';
import { API } from '../../../config/api';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [formRegister, setFormRegister] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [passwordError, setPasswordError] = useState('');

  const { first_name, last_name, email, password } = formRegister;

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }

    if (!hasLetter || !hasNumber) {
      return 'Password must include both letters and numbers';
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
      if (name === 'password') {
        const error = validatePassword(value);
        setPasswordError(error);
      }
  };

  const { mutate: handleSubmit } = useMutation(async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    try {
      await API.post('/register', formRegister);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Register Success',
        showConfirmButton: false,
        timer: 1500,
      });

      setFormRegister({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'user',
      });

      navigate('/signin');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Register Failed';

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <Link to="/" className="absolute top-4 left-4 text-gray-600 hover:text-gray-800">
        <FaArrowLeft className="h-6 w-6" />
      </Link>

      <div className="relative bg-white shadow-xl rounded-lg w-full max-w-md px-8 py-10">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create your Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={first_name}
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={last_name}
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              className="block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              autoComplete="new-password"
              className="block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <Switch.Group as="div" className="flex items-center justify-between">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={classNames(
                agreed ? 'bg-indigo-600' : 'bg-gray-200',
                'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              )}
            >
              <span className="sr-only">Agree to policies</span>
              <span
                aria-hidden="true"
                className={classNames(
                  agreed ? 'translate-x-3.5' : 'translate-x-0',
                  'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="/" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>
          <button
            type="submit"
            disabled={!agreed}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Let's go
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
