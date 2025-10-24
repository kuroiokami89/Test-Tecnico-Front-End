async function getPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    
    return posts.slice(0, 10).map((post) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);
  
  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
        <p>The post you're looking for doesn't exist.</p>
        <a href="/">← Back to home</a>
      </div>
    );
  }
  
  return (
    <div>
      <a href="/">← Back to all posts</a>
      
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <hr />
        <div>
          <p><strong>Post ID:</strong> {post.id}</p>
          <p><strong>User ID:</strong> {post.userId}</p>
        </div>
      </article>
    </div>
  );
}