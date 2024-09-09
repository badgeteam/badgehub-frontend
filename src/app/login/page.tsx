"use client"
import {SessionProvider} from "next-auth/react"
import {LoginButton} from "@/components/LoginButton";

export interface SearchParams {
  category: string;
  device: string;
}

export default function Listing(props: any) {
  console.log('props', props);

  return (
      <SessionProvider session={props.session}>
        <h1>Login</h1>
          <LoginButton/>
      </SessionProvider>
  );
}
