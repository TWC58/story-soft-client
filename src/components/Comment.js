export default function Comment(props) {

    const {comment} = props;

    return (
        <div className="comment-card">
            <div className="comment-user">
                {comment.creator}
            </div>
            <div className="comment-message">
                {comment.message}
            </div>
        </div>
    )
}