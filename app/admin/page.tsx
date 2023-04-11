"use client"
import Image from "next/image"
import Link from "next/link"
import Nav from "../(public)/components/Nav"
import { initFirebase } from "../api/firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

export default function admin(){
    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, loading] = useAuthState(auth);
    console.log(user);
    
    
    return (
        <div className="min-h-screen">
            <Nav />
            <div className="align-center w-full p-5 bg-primary-bg dark:bg-[#0F172A]">
                {user ?                 
                <div>
                    <div>Hello, {user.displayName}</div>
                    <button className="p-2 bg-primary rounded-lg text-white mr-2" onClick={() => {auth.signOut()}}>Sign Out</button>
                    <Link href="/admin/new">
                        <button className="p-2 bg-primary rounded-lg text-white">New post</button>
                    </Link>
                    <div>View all your posts</div>
                </div> :                 
                <div>
                    <button className="p-2 bg-primary rounded-lg text-white mr-2" onClick={signIn}>Sign In</button>
                    to Create new post
                </div>}
            </div>
        </div>
    )
}