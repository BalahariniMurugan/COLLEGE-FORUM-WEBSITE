import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaCommentAlt, FaShare, FaEye, FaUser, FaQuoteLeft, FaEdit, FaTrash } from 'react-icons/fa';
import './Post.css';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    // Simulated fetching post data
    setPost({
      id,
      title: 'Sample Post Title',
      content: 'Sample Post Content',
      author: 'JohnDoe',
      date: new Date().toLocaleDateString(),
      avatar: 'https://via.placeholder.com/40',
    });
    setLikes(0);
    setShares(0);
    setViews(1); // Simulate view increment
    setComments([]);
  }, [id]);

  const handleLike = () => setLikes(likes + 1);
  const handleShare = () => setShares(shares + 1);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment) {
      setComments([...comments, { id: Date.now(), content: newComment }]);
      setNewComment('');
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedContent(post.content);
  };

  const handleUpdate = () => {
    if (editedContent) {
      setPost(prevPost => ({ ...prevPost, content: editedContent }));
      setEditMode(false);
    }
  };

  const handleDelete = () => {
    // Implement post deletion logic here
  };

  const handleQuote = () => {
    setNewComment(`> ${post.content}\n\n`);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={post.avatar} alt={`${post.author}'s avatar`} className="post-avatar" />
        <div className="post-info">
          <h2>{post.author}</h2>
          <p>{post.date}</p>
        </div>
      </div>
      {editMode ? (
        <div className="edit-form">
          <textarea
            className="form-control"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <p className="post-content">{post.content}</p>
      )}
      <div className="post-metrics">
        <div className="metric-item">
          <FaThumbsUp /> {likes} Likes
        </div>
        <div className="metric-item">
          <FaShare /> {shares} Shares
        </div>
        <div className="metric-item">
          <FaEye /> {views} Views
        </div>
      </div>
      <div className="post-actions">
        <button className="btn btn-primary" onClick={handleLike}>
          <FaThumbsUp /> Like ({likes})
        </button>
        <button className="btn btn-secondary" onClick={handleShare}>
          <FaShare /> Share ({shares})
        </button>
        <button className="btn btn-quote" onClick={handleQuote}>
          <FaQuoteLeft /> Quote
        </button>
        <button className="btn btn-edit" onClick={handleEdit}>
          <FaEdit /> Edit
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          <FaTrash /> Delete
        </button>
      </div>
      <div className="comments my-4">
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-avatar">
              <FaUser />
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <div className="form-group">
            <label htmlFor="newComment">Add Comment</label>
            <textarea
              className="form-control"
              id="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-submit">
            <FaCommentAlt /> Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
