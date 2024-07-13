"use client";
import { login } from "@/Redux/Features/AuthSlice";
import { RootState } from "@/Redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const auth = useSelector((state:RootState)=>state.auth.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={()=>dispatch(login("sadasdasdasd"))}>
        Deneme
      </button>

      <br />
      <button onClick={()=>console.log(auth)}>
        getir
      </button>
    </div>
  );
}
