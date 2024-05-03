import { useState, createContext, useEffect, useCallback } from "react";
import {
  saveUser,
  deleteUser,
  updateUser,
  getUsers,
  getUser,
} from "@src/services/firebase/api";
import { DocumentData } from "firebase/firestore";
import { useAuth } from "@src/hooks";

type User = {
  users: DocumentData[];
  user: DocumentData;
  setUser: (user: DocumentData) => void;
  handleAddUser: (email: string, user: DocumentData) => void;
  handleDeleteUser: (email: string) => void;
  handleUpdateUser: (email: string, updatedUser: DocumentData) => void;
  handleGetUsers: () => void;
  handleGetUser: (email: string) => void;
  loading: boolean;
}

export const UserContext = createContext<User>({
  users: [],
  user: {},
  setUser: () => {},
  handleAddUser: () => Promise<void>,
  handleDeleteUser: () => Promise<void>,
  handleUpdateUser: () => Promise<void>,
  handleGetUsers: () => Promise<void>,
  handleGetUser: () => Promise<void>,
  loading: false,
});

interface Props {
  children?: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<DocumentData>({})
  const { userAuthed } = useAuth();

  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const usersData: DocumentData[] = [];
      await getUsers().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docData = { id: doc.id, ...doc.data() };
          usersData.push(docData);
        });
      });
      setUsers(usersData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (email: string, user: DocumentData) => {
    try {
      await saveUser(email, user);
      setUsers([...users, user]);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      await deleteUser(email);
      setUsers(users.filter((user: DocumentData) => user.email !== email));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleUpdateUser = async (email: string, updatedUser: DocumentData) => {
    try {
      await updateUser(email, updatedUser);
      const userIndex = users.findIndex((user: DocumentData) => user.email === email);
      if (userIndex !== -1) {
        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...updatedUser };
        setUsers(updatedUsers);
        console.log("User successfully updated!");
      } else {
        console.error("User with email", email, "not found for update.");
      }
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  const handleGetUser = useCallback(async (email: string) => {
    try {
      const res = await getUser(email)
      setUser(res.data() || {})
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    try {
      getUser(userAuthed.email || '')
        .then(res => res?.data())
        .then(data => setUser(data || {}))
    } catch (error) {
      console.error(error)
    }
  }, [userAuthed])

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        setUser,
        handleAddUser,
        handleDeleteUser,
        handleUpdateUser,
        handleGetUsers,
        handleGetUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};