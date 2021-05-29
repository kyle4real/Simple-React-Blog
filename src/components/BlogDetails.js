import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import capitalize from "../utilities/capitalize";
import LoadingSpinner from "./LoadingSpinner";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory();

    const handleClick = () => {
        fetch(`http://localhost:8000/blogs/${blog.id}`, {
            method: "DELETE",
        }).then(() => {
            history.push("/");
        });
    };

    return (
        <div className="blog-details">
            {isPending && <LoadingSpinner />}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {capitalize(blog.author)}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
