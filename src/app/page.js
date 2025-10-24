import Link from "next/link";
import style from "./styles/style.css";
import mediaquery from "./styles/mediaquery.css";

async function getPosts() { 
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const posts = await res.json();
  return posts.slice(0, 10);
}

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <div id="home">
      <h1>BLOG APP</h1>
      <div className="post-container">
      {posts.map(post => (
        <div className="card" key={post.id}>
          <h3>{post.id}. {post.title}</h3>
          <p>{post.body}</p>
          <Link href={`/posts/${post.id}`}>READ MORE</Link>
        </div>
      ))}
      </div>
    </div>
  );
}