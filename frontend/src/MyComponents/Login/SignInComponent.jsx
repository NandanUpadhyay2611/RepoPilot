import { SignedIn,UserButton } from "@clerk/clerk-react";
import { SignIn } from "@clerk/clerk-react";

export function SignInComponent(){

    return (
        <div>
        <SignedIn>
             <UserButton />
        </SignedIn>
        
            <SignIn
            path="/signin" 
            routing="path" 
            redirectUrl="/sync-user" 
            signUpUrl="/signup"/>
            
        </div>
    )

}

