import { useEffect, useState } from 'react';

const ReportComments = ({ reportId, onAddComment }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentType, setCommentType] = useState('internal'); // internal, public

  // Mock comments data - replace with API call
  useEffect(() => {
    const mockComments = [
      {
        id: 1,
        author: 'Admin 1',
        authorRole: 'Administrator',
        content: 'Laporan sudah diterima dan akan segera ditindaklanjuti.',
        timestamp: '2024-01-15T10:00:00Z',
        type: 'public',
        isSystemComment: false
      },
      {
        id: 2,
        author: 'System',
        authorRole: 'System',
        content: 'Status laporan diubah dari "Menunggu Review" ke "Sedang Ditangani"',
        timestamp: '2024-01-15T11:30:00Z',
        type: 'internal',
        isSystemComment: true
      }
    ];
    setComments(mockComments);
  }, [reportId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const comment = {
        id: Date.now(), // In real app, this would be from API
        author: 'Current Admin', // Get from auth context
        authorRole: 'Administrator',
        content: newComment,
        timestamp: new Date().toISOString(),
        type: commentType,
        isSystemComment: false
      };

      // Add to local state (in real app, call API first)
      setComments(prev => [...prev, comment]);
      
      // Call parent callback
      if (onAddComment) {
        await onAddComment(comment);
      }
      
      // Reset form
      setNewComment('');
      
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Gagal menambahkan komentar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} menit yang lalu`;
    } else if (diffHours < 24) {
      return `${diffHours} jam yang lalu`;
    } else if (diffDays < 7) {
      return `${diffDays} hari yang lalu`;
    } else {
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getCommentIcon = (comment) => {
    if (comment.isSystemComment) return '🤖';
    if (comment.type === 'public') return '💬';
    return '🔒';
  };

  const getCommentClass = (comment) => {
    let className = 'comment-item';
    if (comment.isSystemComment) className += ' system-comment';
    if (comment.type === 'internal') className += ' internal-comment';
    return className;
  };

  return (
    <div className="report-comments">
      <h3>Komentar & Catatan</h3>
      
      <div className="comments-section">
        {/* Add Comment Form */}
        <div className="add-comment">
          <h4>Tambah Komentar</h4>
          <form onSubmit={handleSubmitComment} className="comment-form">
            <div className="form-group">
              <label>Jenis Komentar</label>
              <div className="comment-type-selector">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="public"
                    checked={commentType === 'public'}
                    onChange={(e) => setCommentType(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  💬 Publik (Terlihat oleh pelapor)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="internal"
                    checked={commentType === 'internal'}
                    onChange={(e) => setCommentType(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  🔒 Internal (Hanya admin)
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Komentar</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar atau catatan..."
                className="comment-textarea"
                rows="4"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="submit-comment-btn"
              >
                {isSubmitting ? '⏳ Mengirim...' : '💾 Tambah Komentar'}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setNewComment('');
                  setCommentType('internal');
                }}
                className="clear-comment-btn"
                disabled={isSubmitting}
              >
                🗑️ Bersihkan
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="comments-list">
          <div className="comments-header">
            <h4>Riwayat Komentar ({comments.length})</h4>
            <div className="comments-filter">
              <button className="filter-btn active">Semua</button>
              <button className="filter-btn">Publik</button>
              <button className="filter-btn">Internal</button>
            </div>
          </div>
          
          {comments.length === 0 ? (
            <div className="no-comments">
              <span>💬</span>
              <p>Belum ada komentar</p>
              <small>Tambahkan komentar pertama untuk laporan ini</small>
            </div>
          ) : (
            <div className="comments-timeline">
              {comments
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((comment) => (
                  <div key={comment.id} className={getCommentClass(comment)}>
                    <div className="comment-header">
                      <div className="comment-author">
                        <span className="author-icon">{getCommentIcon(comment)}</span>
                        <span className="author-name">{comment.author}</span>
                        <span className="author-role">({comment.authorRole})</span>
                        {comment.type === 'internal' && (
                          <span className="internal-badge">Internal</span>
                        )}
                      </div>
                      <span className="comment-timestamp">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    
                    <div className="comment-content">
                      <p>{comment.content}</p>
                    </div>
                    
                    {!comment.isSystemComment && (
                      <div className="comment-actions">
                        <button 
                          className="comment-action-btn reply"
                          onClick={() => {
                            setNewComment(`@${comment.author} `);
                            document.querySelector('.comment-textarea')?.focus();
                          }}
                        >
                          ↩️ Balas
                        </button>
                        
                        <button 
                          className="comment-action-btn edit"
                          onClick={() => {
                            // TODO: Implement edit functionality
                            alert('Fitur edit komentar akan segera tersedia');
                          }}
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportComments;