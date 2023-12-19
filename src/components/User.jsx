import { useEffect, useContext } from "react";
import Context from "../context";
import { auth, signInWithGoogle, signOut } from "../firebase";

const UserComponent = () => {
    // Destructuring user and setState from the context
    const { state: { user }, setState } = useContext(Context);

    // useEffect to subscribe to changes in the user's authentication state
    useEffect(() => {
        // Setting up an authentication state change listener
        const unsubscribe = auth.onAuthStateChanged((user) =>
            // Updating the user state in the context
            setState(state => ({ ...state, user: user?.multiFactor.user }))
        );

        // Unsubscribe from the authentication state change listener when the component unmounts
        return unsubscribe
    }, [])

    return (
        <div>
            {/* Sign out */}
            {user && (
                <div className="user-profile">
                    <img alt="user profile pic" src={user.photoURL}></img>
                    <h3>{user.displayName}</h3>
                    <button id="signOut" onClick={signOut}>Sign out</button>
                </div>
            )}

            {/* Sign in  */}
            {!user && (
                <div className="sign-in-container">
                    <p>Please sign in</p>
                    <button id="signIn" onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
            )}
        </div>
    )
}

export default UserComponent;