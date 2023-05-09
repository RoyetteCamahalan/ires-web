<template>
  <aside
    id="sidebar"
    class="flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width" :class="!sidebarOpen && !openHoverState ? 'lg:w-16' : 'lg:w-64'"
    aria-label="Sidebar"
    @mouseenter="$emit('onSideBarEnter')"
    @mouseleave="$emit('onSideBarLeave')"
  >
    <div class="flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50 md:flex" :class="sidebarOpen ? '' : 'hidden'">
      <div class="flex overflow-y-auto flex-col flex-1 pt-4 pb-4">
        <div class="flex-1 px-3 bg-gray-50" id="sidebar-items">
          <ul class="pb-2 pt-1">
            <li>
              <form action="#" method="GET" class="lg:hidden">
                <label for="mobile-search" class="sr-only">Search</label>
                <div class="relative">
                  <div
                    class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                  >
                    <Icon name="material-symbols:search" class="w-5 h-5"></Icon>
                  </div>
                <FormTextField
                    name="topbar-search"
                    placeholder="Search"
                    class="pl-10"
                    v-model="state.searchString"
                ></FormTextField>
                </div>
              </form>
            </li>
            <li v-if="user.isappsysadmin">
              <a
                href="/surveys"
                class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 bg-white rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <Icon name="icon-park-outline:land-surveying" class="w-4 h-4"></Icon>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm"
                  >Surveys</span
                >
              </a>
            </li>
            <li v-if="user.isappsysadmin">
              <a
                href="/payments"
                class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 bg-white rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <Icon name="material-symbols:payments" class="w-4 h-4"></Icon>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm"
                  >Payments</span
                >
              </a>
            </li>
            <li v-if="user.isappsysadmin">
              <a
                href="/clients"
                class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 bg-white rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <Icon name="ph:users-three" class="w-4 h-4"></Icon>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm"
                  >Clients</span
                >
              </a>
            </li>
            <li v-if="user.isappsysadmin">
              <a
                href="/users"
                class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 bg-white rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <Icon name="material-symbols:verified-user" class="w-4 h-4"></Icon>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm"
                  >Users</span
                >
              </a>
            </li>
            <li v-if="user.isappsysadmin">
              <LayoutSidebarToggleMenu title="Finance" iconname="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance">
                <li>
                  <a
                    href="/expenses"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Expenses</span></a
                  >
                </li>
                <li>
                  <a
                    href="/accountspayable"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Accounts Payable</span></a>
                </li>
                <li>
                  <a
                    href="/pettycash"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Petty Cash</span></a
                  >
                </li>
              </LayoutSidebarToggleMenu>
            </li>
            <li v-if="user.isappsysadmin">
              <LayoutSidebarToggleMenu title="Master Files" iconname="material-symbols:file-copy-outline">
                <li>
                  <a
                    href="/masterfiles/banks"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Banks</span></a
                  >
                </li>
                <li>
                  <a
                    href="/masterfiles/bankaccounts"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Bank Accounts</span></a>
                </li>
                <li>
                  <a
                    href="/masterfiles/expensetypes"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Expense Types</span></a
                  >
                </li>
                <li>
                  <a
                    href="/masterfiles/offices"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Offices</span></a
                  >
                </li>
                <li>
                  <a
                    href="/masterfiles/vendors"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Vendors</span></a
                  >
                </li>
              </LayoutSidebarToggleMenu>
            </li>
            <!-- <li>
              <button
                type="button"
                class="w-full flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
                aria-controls="dropdown-ecommerce"
                data-collapse-toggle="dropdown-ecommerce"
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <svg
                    class="text-dark"
                    width="12px"
                    height="12px"
                    viewBox="0 0 42 44"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>basket</title>
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1869.000000, -741.000000)"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g
                            id="basket"
                            transform="translate(153.000000, 450.000000)"
                          >
                            <path
                              class="color-background"
                              d="M34.080375,13.125 L27.3748125,1.9490625 C27.1377583,1.53795093 26.6972449,1.28682264 26.222716,1.29218729 C25.748187,1.29772591 25.3135593,1.55890827 25.0860125,1.97535742 C24.8584658,2.39180657 24.8734447,2.89865282 25.1251875,3.3009375 L31.019625,13.125 L10.980375,13.125 L16.8748125,3.3009375 C17.1265553,2.89865282 17.1415342,2.39180657 16.9139875,1.97535742 C16.6864407,1.55890827 16.251813,1.29772591 15.777284,1.29218729 C15.3027551,1.28682264 14.8622417,1.53795093 14.6251875,1.9490625 L7.919625,13.125 L0,13.125 L0,18.375 L42,18.375 L42,13.125 L34.080375,13.125 Z"
                              opacity="0.595377604"
                            ></path>
                            <path
                              class="color-background"
                              d="M3.9375,21 L3.9375,38.0625 C3.9375,40.9619949 6.28800506,43.3125 9.1875,43.3125 L32.8125,43.3125 C35.7119949,43.3125 38.0625,40.9619949 38.0625,38.0625 L38.0625,21 L3.9375,21 Z M14.4375,36.75 L11.8125,36.75 L11.8125,26.25 L14.4375,26.25 L14.4375,36.75 Z M22.3125,36.75 L19.6875,36.75 L19.6875,26.25 L22.3125,26.25 L22.3125,36.75 Z M30.1875,36.75 L27.5625,36.75 L27.5625,26.25 L30.1875,26.25 L30.1875,36.75 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm font-light"
                  sidebar-toggle-item=""
                  >Finance</span
                >
                
              </button>
              <ul
                id="dropdown-ecommerce"
                sidebar-toggle-list=""
                class="pb-2 pt-1 hidden"
              >
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/e-commerce/products/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Products</span><span class="hidden">P</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/e-commerce/billing/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Billing</span><span class="hidden">B</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/e-commerce/invoice/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Invoice</span><span class="hidden">I</span></a
                  >
                </li>
              </ul>
            </li> -->
            <!-- <li>
              <a
                href="https://demos.creative-tim.com/soft-ui-flowbite-pro/kanban/"
                class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg bg-white shadow-lg shadow-gray-200 hover:!bg-white hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 bg-fuchsia-500 !text-white text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <svg
                    width="12px"
                    height="12px"
                    viewBox="0 0 40 44"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>document</title>
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1870.000000, -591.000000)"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(154.000000, 300.000000)">
                            <path
                              class="color-background"
                              d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                              opacity="0.603585379"
                            ></path>
                            <path
                              class="color-background"
                              d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm font-light"
                  sidebar-toggle-item=""
                  >Kanban</span
                >
              </a>
            </li>
            <li>
              <a
                href="https://demos.creative-tim.com/soft-ui-flowbite-pro/mailing/inbox/"
                class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <svg
                    width="12px"
                    height="12px"
                    viewBox="0 0 46 42"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>customer-support</title>
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1717.000000, -291.000000)"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(1.000000, 0.000000)">
                            <path
                              class="color-background"
                              d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
                              opacity="0.59858631"
                            ></path>
                            <path
                              class="color-foreground"
                              d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z"
                            ></path>
                            <path
                              class="color-foreground"
                              d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm font-light"
                  sidebar-toggle-item=""
                  >Inbox</span
                >
              </a>
            </li>
            <li>
              <button
                type="button"
                class="w-full flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
                aria-controls="dropdown-ecommerce"
                data-collapse-toggle="dropdown-ecommerce"
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <svg
                    class="text-dark"
                    width="12px"
                    height="12px"
                    viewBox="0 0 42 44"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>basket</title>
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1869.000000, -741.000000)"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g
                            id="basket"
                            transform="translate(153.000000, 450.000000)"
                          >
                            <path
                              class="color-background"
                              d="M34.080375,13.125 L27.3748125,1.9490625 C27.1377583,1.53795093 26.6972449,1.28682264 26.222716,1.29218729 C25.748187,1.29772591 25.3135593,1.55890827 25.0860125,1.97535742 C24.8584658,2.39180657 24.8734447,2.89865282 25.1251875,3.3009375 L31.019625,13.125 L10.980375,13.125 L16.8748125,3.3009375 C17.1265553,2.89865282 17.1415342,2.39180657 16.9139875,1.97535742 C16.6864407,1.55890827 16.251813,1.29772591 15.777284,1.29218729 C15.3027551,1.28682264 14.8622417,1.53795093 14.6251875,1.9490625 L7.919625,13.125 L0,13.125 L0,18.375 L42,18.375 L42,13.125 L34.080375,13.125 Z"
                              opacity="0.595377604"
                            ></path>
                            <path
                              class="color-background"
                              d="M3.9375,21 L3.9375,38.0625 C3.9375,40.9619949 6.28800506,43.3125 9.1875,43.3125 L32.8125,43.3125 C35.7119949,43.3125 38.0625,40.9619949 38.0625,38.0625 L38.0625,21 L3.9375,21 Z M14.4375,36.75 L11.8125,36.75 L11.8125,26.25 L14.4375,26.25 L14.4375,36.75 Z M22.3125,36.75 L19.6875,36.75 L19.6875,26.25 L22.3125,26.25 L22.3125,36.75 Z M30.1875,36.75 L27.5625,36.75 L27.5625,26.25 L30.1875,26.25 L30.1875,36.75 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm font-light"
                  sidebar-toggle-item=""
                  >E-commerce</span
                >
                <svg
                  sidebar-toggle-item=""
                  class="w-4 h-4 ml-auto text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-ecommerce"
                sidebar-toggle-list=""
                class="pb-2 pt-1 hidden"
              >
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/e-commerce/products/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Products</span><span class="hidden">P</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/e-commerce/billing/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Billing</span><span class="hidden">B</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/e-commerce/invoice/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Invoice</span><span class="hidden">I</span></a
                  >
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                class="w-full flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
                aria-controls="dropdown-users"
                data-collapse-toggle="dropdown-users"
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <svg
                    width="12px"
                    height="12px"
                    viewBox="0 0 42 42"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>office</title>
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1869.000000, -293.000000)"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g
                            id="office"
                            transform="translate(153.000000, 2.000000)"
                          >
                            <path
                              class="color-background"
                              d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                              opacity="0.6"
                            ></path>
                            <path
                              class="color-background"
                              d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm font-light"
                  sidebar-toggle-item=""
                  >Users</span
                >
                <svg
                  sidebar-toggle-item=""
                  class="w-4 h-4 ml-auto text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-users"
                sidebar-toggle-list=""
                class="pb-2 pt-1 hidden"
              >
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/users/list/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Users list</span><span class="hidden">U</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/users/profile/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Profile</span><span class="hidden">P</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/users/settings/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Settings</span><span class="hidden">S</span></a
                  >
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                class="w-full flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <svg
                    width="12px"
                    height="12px"
                    viewBox="0 0 40 40"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>spaceship</title>
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1720.000000, -592.000000)"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(4.000000, 301.000000)">
                            <path
                              class="color-background"
                              d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z"
                            ></path>
                            <path
                              class="color-background"
                              d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z"
                            ></path>
                            <path
                              class="color-background"
                              d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"
                              opacity="0.598539807"
                            ></path>
                            <path
                              class="color-background"
                              d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"
                              opacity="0.598539807"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm font-light"
                  sidebar-toggle-item=""
                  >Pages</span
                >
                <svg
                  sidebar-toggle-item=""
                  class="w-4 h-4 ml-auto text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-pages"
                sidebar-toggle-list=""
                class="pb-2 pt-1 hidden"
              >
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/pages/pricing/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Pricing</span><span class="hidden">P</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/pages/maintenance/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Maintenance</span><span class="hidden">M</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/pages/404/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>404 not found</span><span class="hidden">4</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/pages/500/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>500 server error</span
                    ><span class="hidden">5</span></a
                  >
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                class="w-full flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
                sidebar-toggle-collapse=""
                aria-controls="dropdown-auth"
                data-collapse-toggle="dropdown-auth"
              >
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <svg
                    width="12px"
                    height="12px"
                    viewBox="0 0 40 40"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>settings</title>
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-2020.000000, -442.000000)"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(304.000000, 151.000000)">
                            <polygon
                              class="color-background"
                              opacity="0.596981957"
                              points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"
                            ></polygon>
                            <path
                              class="color-background"
                              d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                              opacity="0.596981957"
                            ></path>
                            <path
                              class="color-background"
                              d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm font-light"
                  sidebar-toggle-item=""
                  >Authentication</span
                >
                <svg
                  sidebar-toggle-item=""
                  class="w-4 h-4 ml-auto text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-auth"
                sidebar-toggle-list=""
                class="pb-2 pt-1 hidden"
              >
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/authentication/sign-in/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Sign in</span><span class="hidden">S</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/authentication/sign-up/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Sign up</span><span class="hidden">S</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/authentication/forgot-password/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Forgot password</span
                    ><span class="hidden">F</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/authentication/reset-password/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Reset password</span><span class="hidden">R</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://demos.creative-tim.com/soft-ui-flowbite-pro/authentication/profile-lock/"
                    class="text-sm text-dark-500 font-light rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Profile lock</span><span class="hidden">P</span></a
                  >
                </li>
              </ul>
            </li> -->
          </ul>
          <!-- <hr
            class="border-0 h-px bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100"
          />
          <div class="pt-2">
            <a
              href="https://creative-tim.com/product/soft-ui-flowbite-pro"
              target="_blank"
              class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
              sidebar-toggle-collapse=""
            >
              <div
                class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
              >
                <svg
                  class="text-dark mb-1"
                  width="12px"
                  height="12px"
                  viewBox="0 0 42 42"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>box-3d-50</title>
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(-2319.000000, -291.000000)"
                      fill="currentColor"
                      fill-rule="nonzero"
                    >
                      <g transform="translate(1716.000000, 291.000000)">
                        <g transform="translate(603.000000, 0.000000)">
                          <path
                            class="color-background"
                            d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z"
                          ></path>
                          <path
                            class="color-background"
                            d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                            opacity="0.7"
                          ></path>
                          <path
                            class="color-background"
                            d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                            opacity="0.7"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span
                class="ml-3 text-dark-500 text-sm font-light"
                sidebar-toggle-item=""
                >Buy now</span
              >
            </a>
            <a
              href="https://www.creative-tim.com/learning-lab/flowbite/introduction/soft-ui-dashboard/"
              target="_blank"
              class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
              sidebar-toggle-collapse=""
            >
              <div
                class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
              >
                <svg
                  class="text-dark mb-1"
                  width="12px"
                  height="12px"
                  viewBox="0 0 40 44"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>document</title>
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(-1870.000000, -591.000000)"
                      fill="currentColor"
                      fill-rule="nonzero"
                    >
                      <g transform="translate(1716.000000, 291.000000)">
                        <g transform="translate(154.000000, 300.000000)">
                          <path
                            class="color-background"
                            d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                            opacity="0.603585379"
                          ></path>
                          <path
                            class="color-background"
                            d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span
                class="ml-3 text-dark-500 text-sm font-light"
                sidebar-toggle-item=""
                >Docs</span
              >
            </a>
            <a
              href="https://creative-tim.com/learning-lab/flowbite/alerts/soft-ui-dashboard/"
              target="_blank"
              class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
              sidebar-toggle-collapse=""
            >
              <div
                class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
              >
                <svg
                  class="text-dark mb-1"
                  width="12px"
                  height="12px"
                  viewBox="0 0 40 44"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>switches</title>
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(-1870.000000, -440.000000)"
                      fill="currentColor"
                      fill-rule="nonzero"
                    >
                      <g transform="translate(1716.000000, 291.000000)">
                        <g transform="translate(154.000000, 149.000000)">
                          <path
                            class="color-background"
                            d="M10,20 L30,20 C35.4545455,20 40,15.4545455 40,10 C40,4.54545455 35.4545455,0 30,0 L10,0 C4.54545455,0 0,4.54545455 0,10 C0,15.4545455 4.54545455,20 10,20 Z M10,3.63636364 C13.4545455,3.63636364 16.3636364,6.54545455 16.3636364,10 C16.3636364,13.4545455 13.4545455,16.3636364 10,16.3636364 C6.54545455,16.3636364 3.63636364,13.4545455 3.63636364,10 C3.63636364,6.54545455 6.54545455,3.63636364 10,3.63636364 Z"
                            opacity="0.6"
                          ></path>
                          <path
                            class="color-background"
                            d="M30,23.6363636 L10,23.6363636 C4.54545455,23.6363636 0,28.1818182 0,33.6363636 C0,39.0909091 4.54545455,43.6363636 10,43.6363636 L30,43.6363636 C35.4545455,43.6363636 40,39.0909091 40,33.6363636 C40,28.1818182 35.4545455,23.6363636 30,23.6363636 Z M30,40 C26.5454545,40 23.6363636,37.0909091 23.6363636,33.6363636 C23.6363636,30.1818182 26.5454545,27.2727273 30,27.2727273 C33.4545455,27.2727273 36.3636364,30.1818182 36.3636364,33.6363636 C36.3636364,37.0909091 33.4545455,40 30,40 Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span
                class="ml-3 text-dark-500 text-sm font-light"
                sidebar-toggle-item=""
                >Components</span
              >
            </a>
            <a
              href="https://creative-tim.com/contact-us"
              target="_blank"
              class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
              sidebar-toggle-collapse=""
            >
              <div
                class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"
              >
                <svg
                  class="text-dark mb-1"
                  width="12px"
                  height="12px"
                  viewBox="0 0 44 43"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>megaphone</title>
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(-2168.000000, -591.000000)"
                      fill="currentColor"
                      fill-rule="nonzero"
                    >
                      <g transform="translate(1716.000000, 291.000000)">
                        <g transform="translate(452.000000, 300.000000)">
                          <path
                            class="color-background"
                            d="M35.7958333,0.273166667 C35.2558424,-0.0603712374 34.5817509,-0.0908856664 34.0138333,0.1925 L19.734,7.33333333 L9.16666667,7.33333333 C4.10405646,7.33333333 0,11.4373898 0,16.5 C0,21.5626102 4.10405646,25.6666667 9.16666667,25.6666667 L19.734,25.6666667 L34.0138333,32.8166667 C34.5837412,33.1014624 35.2606401,33.0699651 35.8016385,32.7334768 C36.3426368,32.3969885 36.6701539,31.8037627 36.6666942,31.1666667 L36.6666942,1.83333333 C36.6666942,1.19744715 36.3370375,0.607006911 35.7958333,0.273166667 Z"
                          ></path>
                          <path
                            class="color-background"
                            d="M38.5,11 L38.5,22 C41.5375661,22 44,19.5375661 44,16.5 C44,13.4624339 41.5375661,11 38.5,11 Z"
                            opacity="0.601050967"
                          ></path>
                          <path
                            class="color-background"
                            d="M18.5936667,29.3333333 L10.6571667,29.3333333 L14.9361667,39.864 C15.7423448,41.6604248 17.8234451,42.4993948 19.6501416,41.764381 C21.4768381,41.0293672 22.3968823,38.982817 21.7341667,37.1286667 L18.5936667,29.3333333 Z"
                            opacity="0.601050967"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span
                class="ml-3 text-dark-500 text-sm font-light"
                sidebar-toggle-item=""
                >Help</span
              >
            </a>
          </div> -->
        </div>
      </div>
    </div>
  </aside>
</template>


<script>
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { usePrefStore } from '@/store/pref'

export default {
    props: ['sidebarOpen','openHoverState'],
    emits: ['toggleSidebar','onSideBarEnter','onSideBarLeave'],
    setup() {
        const user = useUserStore().getUser
        const prefStore = usePrefStore()

        const state = reactive({
            searchString: ''
        })
    
        watch(() => state.searchString, (data)=>{
          prefStore.setSearchString(data)
        })

        return {
          state,
          user
        }
    },
}
</script>