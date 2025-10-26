async function getPost(id) {
  console.log(`Fetching post with ID: ${id}`);
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: 'no-cache'
    });
    console.log(`Fetch response status: ${res.status}`);
    
    if (!res.ok) {
      console.log('Response not ok, returning null');
      return null;
    }
    
    const post = await res.json();
    console.log('Fetched post:', post);
    return post;
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
  const resolvedParams = await params;
  console.log('PostPage params:', resolvedParams);
  const post = await getPost(resolvedParams.id);
  console.log('Fetched post:', post);
  
  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1>Post not found</h1>
          <p>The post you're looking for doesn't exist.</p>
          <a href="/" style={{ marginTop: '20px', display: 'inline-block' }}>← Back to home</a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="post-detail-container">
      <article className="card">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <hr />
        <div>
          <p><strong>Post ID:</strong> {post.id}</p>
          <p><strong>User ID:</strong> {post.userId}</p>
        </div>
      </article>
      <a href="/" style={{ marginTop: '20px', display: 'inline-block' }}>← Back to all posts</a>
    </div>
  );
}