"use client";

import { logoutTask } from "@/app/Redux/actions/AuthActions";
import { logout } from "@/app/Redux/Features/AuthSlice";
import { RootState } from "@/app/Redux/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
                    <Image src={`/tailwindlogo.svg`} width={38} height={32} alt="asda"></Image>
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
                      <Link href="/contract/privacy" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Privacy</Link>
                      <Link href="/contract/kvkk" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Kvkk</Link>
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
                                  <Image className="rounded-full" width={35} height={35} src={`${auth.profilePhoto?.includes("avatars") ? auth.profilePhoto : "/profileavatar.jpg" }`} alt=""/>
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
                    <button onClick={()=>logoutOperation()} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Log out</button>
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