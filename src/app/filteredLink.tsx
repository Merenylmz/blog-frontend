"use client";

import { logoutTask } from "@/Redux/actions/AuthActions";
import { logout } from "@/Redux/Features/AuthSlice";
import { RootState } from "@/Redux/store";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {} from 

const FilteredLink = () => {

    const [profilePanelStatus, setProfilePanelStatus] = useState(false);
    const profilePanel = () =>{profilePanelStatus ? setProfilePanelStatus(false):setProfilePanelStatus(true);};
    const auth = useSelector((state:RootState)=>state.auth.value);
    const dispatch = useDispatch();
    const logoutOperation = async() =>{
      await logoutTask(auth.token);
      dispatch(logout());
    };
    return (
        <div>
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                
                {/* <button className="text-black bg-white p-2 rounded ">Close</button> */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" aria-current="page">Home</Link>
                      {
                        auth.isAuth ? <>
                          <button onClick={()=>logoutOperation()} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Log out</button>
                        </> : <>
                          <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</Link>
                          <Link href="/register" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</Link>
                        </>
                      }
                      <Link href="/policies" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Policies</Link>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                 
                   {
                    auth.isAuth &&
                    <>
                        <div className="relative ml-3">
                            <div>
                                <button type="button" onClick={()=>profilePanel()} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                  <span className="absolute -inset-1.5"></span>
                                  <span className="sr-only">Open user menu</span>
                                  <img className="h-8 w-8 rounded-full" src={`${auth.profilePhoto ? auth.profilePhoto : "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg" }`} alt=""/>
                                </button>
                            </div>
                            <div className={`${profilePanelStatus ? "":"hidden"} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                              <button onClick={()=>logoutOperation()} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Log out</button>
                            </div>
                        </div>
                    </>
                   }
                </div>
              </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Link href="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Home</Link>
                {
                    auth.isAuth ? <>
                        <button onClick={()=>logoutOperation()} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Log out
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2 h-2" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#E2E2E2"></stop><stop offset=".3" stop-color="#E2E2E2" stop-opacity=".9"></stop><stop offset=".6" stop-color="#E2E2E2" stop-opacity=".6"></stop><stop offset=".8" stop-color="#E2E2E2" stop-opacity=".3"></stop><stop offset="1" stop-color="#E2E2E2" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="13" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#E2E2E2" stroke-width="13" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
                        </button>
                    </> : <>
                        <Link href="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</Link>
                        <Link href="/register" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</Link>
                    </>
                }
                <Link href="/policies" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Policies</Link>
                
            </div>
            </div>
          </nav>
        </div>
    );
}

export default FilteredLink;