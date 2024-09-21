import { Fragment, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon, HomeIcon, UserGroupIcon, CubeIcon, ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { UserContext } from '../../../context/userContext';
import { API, setAuthToken } from '../../../config/api';
import Swal from 'sweetalert2';

const AdminNavbar = ({ onMinimizeChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          dispatch({
            type: 'LOGOUT',
          });
          navigate('/');
        });
      } else {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    }
  }, [dispatch, navigate]);

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

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    onMinimizeChange(!isMinimized); // Pass the minimized state to the parent component (dashboard)
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Users', href: '/users', icon: UserGroupIcon },
    { name: 'Products', href: '/products', icon: CubeIcon },
    { name: 'Orders', href: '/orders', icon: ShoppingCartIcon },
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
                      className="flex items-center py-2 px-4 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                    >
                      <item.icon className="h-6 w-6 mr-3" />
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
      <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:bg-white lg:shadow-lg transition-all duration-300 ease-in-out ${isMinimized ? 'lg:w-20' : 'lg:w-64'}`}>
        <div className="flex flex-col flex-1">
          <div className={`p-4 flex items-center ${isMinimized ? 'justify-center' : 'justify-between'}`}>
            {/* Text Admin Panel on the left */}
            {!isMinimized && <h2 className="ms-5 text-lg font-bold text-gray-900">Admin Panel</h2>}
            
            {/* Minimize button on the right */}
            <button
              onClick={handleMinimize}
              className="text-gray-400 hover:text-gray-600"
            >
              {isMinimized ? (
                <ChevronRightIcon className="h-6 w-6" />
              ) : (
                <ChevronLeftIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 ${isMinimized ? 'justify-center mx-2' : 'mx-4'}`}
                title={isMinimized ? item.name : ''}
              >
                <item.icon className={`h-6 w-6 ${isMinimized ? '' : 'mr-3'}`} />
                {!isMinimized && <span>{item.name}</span>}
              </a>
            ))}
          </nav>
          <div className={`p-4 ${isMinimized ? 'flex justify-center' : ''}`}>
            {state.isLogin && (
              <button
                onClick={logout}
                className={`text-sm py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-500 ${isMinimized ? 'w-10 h-10 flex items-center justify-center' : 'w-full'}`}
                title={isMinimized ? 'Logout' : ''}
              >
                {isMinimized ? <XMarkIcon className="h-5 w-5" /> : 'Logout'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
