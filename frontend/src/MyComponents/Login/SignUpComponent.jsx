import { SignInButton,SignedOut,SignUp } from "@clerk/clerk-react"


export function SignUpComponent() {

    return(
        <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      
           <SignUp 
        path="/signup" 
        routing="path" 
        redirectUrl="/sync-user" 
        signInUrl="/signin"
          />
        </header>
    )
}

