
import React, { useState } from 'react';
import Header from '@/components/Header';
import PostCreate from '@/components/PostCreate';
import Post from '@/components/Post';
import CommentList, { CommentData } from '@/components/CommentList';
import CommentBox from '@/components/CommentBox';

const Index: React.FC = () => {
  const [post, setPost] = useState<{
    title: string;
    content: string;
    upvotes: number;
    timestamp: string;
  } | null>(null);
  
  const [comments, setComments] = useState<CommentData[]>([]);
  
  const handleCreatePost = (title: string, content: string) => {
    setPost({
      title,
      content,
      upvotes: 1, // Start with 1 upvote (self-upvote)
      timestamp: 'just now',
    });
    // Add initial AI response
    handleAIResponse();
  };
  
  const handleUpvotePost = () => {
    if (post) {
      setPost({
        ...post,
        upvotes: post.upvotes + 1,
      });
    }
  };
  
  const handleDownvotePost = () => {
    if (post) {
      setPost({
        ...post,
        upvotes: post.upvotes - 1,
      });
    }
  };
  
  const handleCommentSubmit = (content: string) => {
    const newComment: CommentData = {
      id: Date.now().toString(),
      author: 'u/User',
      content,
      timestamp: 'just now',
      upvotes: 1,
    };
    
    setComments([...comments, newComment]);
    
    // Simulate AI response
    handleAIResponse();
  };
  
  const handleAIResponse = () => {
    // Simple delay to simulate AI thinking
    setTimeout(() => {
      const aiResponses = [
        "That's a really interesting question. I think the key factors to consider are context, relevance, and personal experience.",
        "I see your point. From my perspective, this is a complex issue with multiple angles to consider.",
        "Great question! I believe the answer lies in finding a balance between innovation and tradition.",
        "I appreciate your thoughts on this. Let me offer a different perspective that might be helpful.",
        "This reminds me of a similar situation where the outcome was quite surprising. Let me explain..."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiComment: CommentData = {
        id: `ai-${Date.now()}`,
        author: 'u/AI_Assistant',
        content: randomResponse,
        timestamp: 'just now',
        upvotes: 1,
        isAI: true,
      };
      
      setComments([...comments, aiComment]);
    }, 800);
  };
  
  const handleUpvoteComment = (id: string) => {
    setComments(
      comments.map(comment => 
        comment.id === id ? { ...comment, upvotes: comment.upvotes + 1 } : comment
      )
    );
  };
  
  const handleDownvoteComment = (id: string) => {
    setComments(
      comments.map(comment => 
        comment.id === id ? { ...comment, upvotes: comment.upvotes - 1 } : comment
      )
    );
  };
  
  const handleReplyToComment = (content: string) => {
    handleCommentSubmit(content);
  };

  return (
    <div className="bg-reddit-gray min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-6">
        {!post ? (
          <PostCreate onCreatePost={handleCreatePost} />
        ) : (
          <div>
            <Post
              title={post.title}
              content={post.content}
              upvotes={post.upvotes}
              onUpvote={handleUpvotePost}
              onDownvote={handleDownvotePost}
              timestamp={post.timestamp}
            />
            
            <div className="bg-white rounded-md border border-gray-200 p-4">
              <CommentBox onSubmit={handleCommentSubmit} />
              
              <div className="border-t border-gray-200 pt-4">
                <CommentList
                  comments={comments}
                  onUpvote={handleUpvoteComment}
                  onDownvote={handleDownvoteComment}
                  onReply={handleReplyToComment}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
