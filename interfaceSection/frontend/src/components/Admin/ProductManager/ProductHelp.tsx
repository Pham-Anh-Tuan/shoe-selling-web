
const ProductHelp = () => {
  return (
    <div>
      <div className='flex flex-col items-start ml-32'>

        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-orange-400 dark:hover:bg-orange-500 dark:focus:ring-orange-300" type="button">
          <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-20 dark:bg-gray-700">
          <ul className="w-20 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li className="w-20">
              <button
                type='button'
                className="hover:bg-orange-400 w-20 rounded-md block px-2 py-2 text-sm text-gray-700"
              >
                Thêm size
              </button>
            </li>
            <li className="w-20">
              <button
                type='button'
                className="hover:bg-orange-400 w-20 rounded-md block px-2 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Xóa
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col items-end mr-32'>

        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-orange-400 dark:hover:bg-orange-500 dark:focus:ring-orange-300" type="button">
          <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-20 dark:bg-gray-700">
          <ul className="w-20 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li className="w-20">
              <button
                type='button'
                className="hover:bg-orange-400 w-20 rounded-md block px-2 py-2 text-sm text-gray-700"
              >
                Thêm 34
              </button>
            </li>
            <li className="w-20">
              <button
                type='button'
                className="hover:bg-orange-400 w-20 rounded-md block px-2 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Xóa 34
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductHelp;