import { useEffect, useContext } from "react";
import Context from "../context";
import { auth, signInWithGoogle, signOut } from "../firebase";

const UserComponent = () => {
    const { state: { user }, setState } = useContext(Context);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) =>
            setState(state => ({ ...state, user: user?.multiFactor.user }))
        );

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