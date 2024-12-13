import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCreationForm from './PostCreationForm';
import './Thread.css';

const Thread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    // Simulate fetching thread and posts data
    const threads = [
      { id: 1, title: 'How to solve XYZ problem?', posts: 5, views: 120, pinned: true, locked: false, tags: ['General'], author: 'Student1', answer: 'You can solve this problem by...' },
      { id: 2, title: 'Best practices for ABC assignment', posts: 10, views: 200, pinned: false, locked: false, tags: ['Assignment'], author: 'Student2', answer: 'Best practices include...' },
      { id: parseInt(id), title: `Thread ${id}`, posts: 0, views: 0, pinned: false, locked: false, tags: [], author: 'Faculty', answer: '' }
    ];

    const posts = [
      { id: 1, content: 'Sample Answer 1', author: 'Faculty1', date: '2024-07-31', upvotes: 10 },
      { id: 2, content: 'Sample Answer 2', author: 'Faculty2', date: '2024-07-30', upvotes: 5 },
    ];

    const fetchedThread = threads.find(t => t.id === parseInt(id));
    setThread(fetchedThread);
    setPosts(posts);
  }, [id]);

  const handleCreatePost = (content) => {
    const newPost = { id: Date.now(), content, author: 'Faculty', date: new Date().toLocaleDateString(), upvotes: 0 };
    setPosts([newPost, ...posts]);
  };

  const handleUpvote = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post));
  };

  const sortedPosts = posts.sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'mostUpvoted') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container thread my-4">
      <h1 className="my-4">{thread.title}</h1>
      <div className="list-group">
        <div className={`list-group-item ${thread.pinned ? 'pinned' : ''} ${thread.locked ? 'locked' : ''}`}>
          <h5 className="mb-1">
            {thread.title} {thread.pinned && <span className="badge badge-warning">Pinned</span>}
          </h5>
          <small>{thread.posts} answers - {thread.views} views</small>
          <div className="tags">
            {thread.tags.map(tag => (
              <span key={tag} className="badge badge-info">{tag}</span>
            ))}
          </div>
          <p>{thread.answer}</p>
        </div>
      </div>

      <div className="sort-options">
        <label htmlFor="sortPosts">Sort by:</label>
        <select id="sortPosts" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="mostUpvoted">Most Upvoted</option>
        </select>
      </div>

      <PostCreationForm onCreate={handleCreatePost} />
      <div className="list-group mt-4">
        {sortedPosts.map(post => (
          <div key={post.id} className="list-group-item">
            <p>{post.content}</p>
            <small>By {post.author} on {post.date}</small>
            <div className="post-actions">
              <button onClick={() => handleUpvote(post.id)}>Upvote ({post.upvotes})</button>
              <Link to={`/forum/post/${post.id}`} className="btn btn-link">View Post</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
