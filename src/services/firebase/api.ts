import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  DocumentData,
  setDoc,
} from "firebase/firestore";
import { db } from './config'

const collectionProducts = 'products';
const collectionCategories = 'categories';
const collectionUsers = 'users';

/* PRODUCTS */

export const saveProduct = (product: DocumentData) => 
  addDoc(collection(db, collectionProducts), product);

export const updateProduct = (id: string, product: DocumentData) => 
  updateDoc(doc(db, collectionProducts, id), product);

export const getProducts = () => getDocs(collection(db, collectionProducts));

export const deleteProduct = (id: string) => deleteDoc(doc(db, collectionProducts, id));

export const getProduct = (id: string) => getDoc(doc(db, collectionProducts, id));

/* CATEGORIES */

export const saveCategory = (category: DocumentData) => 
  addDoc(collection(db, collectionCategories), category);

export const updateCategory = (id: string, category: DocumentData) => 
  updateDoc(doc(db, collectionCategories, id), category);

export const getCategories = () => getDocs(collection(db, collectionCategories));

export const deleteCategory = (id: string) => deleteDoc(doc(db, collectionCategories, id));

export const getCategory = (id: string) => getDoc(doc(db, collectionCategories, id));

/* USERS */

export const saveUser = (email: string, user: DocumentData) => 
  setDoc(doc(db, collectionUsers, email), user);

export const updateUser = (email: string, user: DocumentData) => 
  updateDoc(doc(db, collectionUsers, email), user);

export const getUsers = () => getDocs(collection(db, collectionUsers));

export const deleteUser= (email: string) => deleteDoc(doc(db, collectionUsers, email));

export const getUser = (email: string) => getDoc(doc(db, collectionUsers, email));