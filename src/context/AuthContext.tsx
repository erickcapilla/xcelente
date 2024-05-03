import { useEffect, useState, createContext } from "react";
import { auth } from "@services/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  UserCredential,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

type UserAuth = {
  userAuthed: User;
  isAuth: boolean;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => void;
  logout: () => void;
  resetPassword: (email: string) => void;
  changePassword: (password: string, newPassword: string) => void;
  loading: boolean;
};

export const AuthContext = createContext<UserAuth>({
  userAuthed: {} as User,
  isAuth: false,
  signup: () => {
    return Promise.resolve({} as UserCredential);
  },
  login: () => Promise<void>,
  logout: () => Promise<void>,
  resetPassword: () => Promise<void>,
  changePassword: () => Promise<void>,
  loading: false,
});

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [userAuthed, setUserAuthed] = useState({} as User);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const changePassword = async (password: string, newPassword: string) => {
    const credential = EmailAuthProvider.credential(userAuthed.email || "", password)
    reauthenticateWithCredential(userAuthed, credential)
      .then(() => updatePassword(userAuthed, newPassword))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAuthed(currentUser ? currentUser : {} as User);
      setIsAuth(!(currentUser?.uid === undefined))
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        userAuthed,
        isAuth,
        signup,
        login,
        logout,
        resetPassword,
        changePassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
