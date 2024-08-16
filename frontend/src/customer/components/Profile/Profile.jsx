import { useState } from 'react';
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import Swal from "sweetalert2";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [state] = useContext(UserContext);

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      console.log(file);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Upload Failed',
        showConfirmButton: false,
        timer: 1500,
      });
      event.target.value = '';
    }
  };

  return (
    <div className="relative isolate px-6 pt-24 pb-20 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-bold leading-7 text-gray-900">Account Information</h3>
          <p className="mt-3 text-base leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="mt-10 border-t border-gray-200">
          <dl className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Profile Picture
              </dt>
              <dd className="mt-2 flex items-center gap-x-3 sm:col-span-2 sm:mt-0">
                {selectedFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected File"
                      className="h-12 w-12 rounded-full"
                    />
                    <p className="text-sm leading-6 text-gray-700 mt-2">
                      {selectedFile.name}
                    </p>
                  </div>
                ) : (
                  <svg
                    className="h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={handleToggleEdit}
                >
                  {isEditing ? 'Save' : 'Change'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="ml-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </dd>
            </div>

            {isEditing && (
              <div className="pt-8">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="py-8 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {capitalizeFirstLetter(state.user.first_name)}{' '}
                {capitalizeFirstLetter(state.user.last_name)}
              </dd>
            </div>
            <div className="py-8 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {state.user.email}
              </dd>
            </div>
            <div className="py-8 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Number Phone
              </dt>
              <dd className="mt-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                081211367526
              </dd>
            </div>
            <div className="py-8 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd className="mt-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
            <div className="py-8 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Recent Transactions
              </dt>
              <dd className="mt-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {/* Add recent transactions here */}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}