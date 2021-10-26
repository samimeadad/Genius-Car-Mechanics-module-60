import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import initializeFirebaseAuthentication from "../Pages/Login/Firebase/firebase.init";

initializeFirebaseAuthentication();

const useFirebase = () => {
    const [ user, setUser ] = useState( {} );
    const [ isLoading, setIsLoading ] = useState( true );

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        setIsLoading( true );
        signInWithPopup( auth, googleProvider )
            .then( result => {
                setUser( result.user );
            } )
            .finally( () => setIsLoading( false ) );
    }

    //observe user state change
    useEffect( () => {
        const unsubscribed = onAuthStateChanged( auth, user => {
            if ( user ) {
                setUser( user );
            }
            else {
                setUser( [] )
            }
            setIsLoading( false );
        } );
        return () => unsubscribed;
    }, [ auth ] );

    const logOut = () => {
        setIsLoading( true );
        signOut( auth )
            .then( () => { } )
            .finally( () => setIsLoading( false ) );
    }

    return {
        user,
        signInUsingGoogle,
        isLoading,
        logOut
    }
}

export default useFirebase;