import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { useMutation } from 'react-query';
import { API } from '../../../config/api';
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

  const handleSubmit = useMutation(async (e) => {
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

      navigate('/');
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Register Failed',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
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
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your Account</h2>
      </div>
      <form onSubmit={(e) => handleSubmit.mutate(e)} className="mx-auto mt-5 max-w-xl sm:mt-7">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={first_name}
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={last_name}
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                autoComplete="new-password"
                className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">
                  {passwordError}
                </p>
              )}
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
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
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="/" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={!agreed}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's go
          </button>
        </div>
      </form>
    </div>
  );
}
