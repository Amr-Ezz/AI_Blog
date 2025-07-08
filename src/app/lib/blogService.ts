import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  date: string;
  userId?: string;
}
export const saveBlogPost = async (
  userId: string,
  blogPost: Omit<BlogPost, "userId">
) => {
  try {
    const docRef = await addDoc(collection(db, "Blogs"), {
      userId,
      title: blogPost.title,
      content: blogPost.content,
      date: blogPost.date,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error: any) {
    console.log("error saving blog posts", error);
    throw error;
  }
};
export const getUserBlogPosts = async (userId: string) => {
  try {
    const q = query(collection(db, "blogs"), where("userId", "==", userId));
    const querySnapShot = await getDocs(q);
    const blogs: BlogPost[] = [];
    querySnapShot.forEach((doc) => {
      blogs.push({
        id: doc.id,
        ...(doc.data() as Omit<BlogPost, "id">),
      });
    });
    return blogs;
  } catch (error: any) {
    console.error("Error getting blog posts:", error);
  }
};
export const deleteBlogPost = async (blogId: string) => {
  try {
    await deleteDoc(doc(db, "blogs", blogId));
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};
