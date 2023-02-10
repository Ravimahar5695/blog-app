import {Link} from "react-router-dom";
import parse from 'html-react-parser';

const PostCard = ({imageurl, post, index, url}) => {
    return (
        // <div>
        //     <div className="card mb-3">
        //     <img src={imageurl} className="card-img-top" alt="img"/>
        //         <div class="card-body">
        //             <Link to={url} className="text-decoration-none"><h5 className="card-title text-dark">{post.title}</h5></Link>
        //             <p className="card-text text-muted">{post.description.replace(/<[^>]+>/g, '').substring(0, 100)}...</p>
        //             <p className="card-text"><small className="text-muted badge bg-light">{post.category.name}</small></p>
        //             <Link className="btn btn-dark text-light" style={{border: "none"}} to={url}>Read more</Link>
        //         </div>
        //     </div>
        // </div>
        <div className="col">
            <div className="card shadow">
                <img src={imageurl} className="card-img-top"/>
                <div className="card-body">
                    <Link to={url} className="text-decoration-none"><h5 className="card-title text-dark">{post.title}</h5></Link>
                    <p className="card-text text-muted">{post.description.replace(/<[^>]+>/g, '').substring(0, 100)}...</p>
                    <p className="card-text"><small className="text-muted badge bg-light">{post.category.name}</small></p>
                    <Link className="btn btn-dark text-light" style={{border: "none"}} to={url}>Read more</Link>
                </div>
            </div>
        </div>
    );
}

export default PostCard;