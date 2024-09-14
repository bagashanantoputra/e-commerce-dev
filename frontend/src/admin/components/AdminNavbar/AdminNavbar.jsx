import { Fragment, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { UserContext } from '../../../context/userContext';
import { API, setAuthToken } from '../../../config/api';
import Swal from 'sweetalert2';

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const checkUser = useCallback(async () => {
    try {
      const response = await API.get('/check-auth');
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    }
  }, [checkUser]);

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'LOGOUT',
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout Success',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      }
    });
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Users', href: '/users', current: false },
    { name: 'Products', href: '/products', current: false },
    { name: 'Orders', href: '/orders', current: false },
  ];

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <div className={`lg:hidden fixed top-4 left-4 z-30 p-2 pb-0 bg-white shadow-md ${sidebarOpen ? 'hidden' : 'block'}`}>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={() => setSidebarOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white p-4">
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex-1 space-y-2">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`block py-2 px-4 rounded-md text-base font-medium ${
                        item.current
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-600'
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
                <div className="mt-auto">
                  {state.isLogin && (
                    <button
                      onClick={logout}
                      className="w-full py-2 px-4 bg-red-600 text-sm text-white rounded-md hover:bg-red-500"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static Sidebar for large screens */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:shadow-lg lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          </div>
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block py-2 px-4 mx-4 rounded-md text-sm font-medium ${
                  item.current
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-600'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="p-4">
            {state.isLogin && (
              <button
                onClick={logout}
                className="w-full text-sm py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
