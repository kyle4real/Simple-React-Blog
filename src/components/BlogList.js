import { useState } from "react";
import { Link } from "react-router-dom";
import capitalize from "../utilities/capitalize";

const BlogList = ({ blogs, title }) => {
    const [sortType, setSortType] = useState("Newest");

    return (
        <div className="blog-list">
            <h2>{title}</h2>
            <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
            {blogs
                .sort((a, b) => {
                    switch (sortType) {
                        case "oldest":
                            return a.id - b.id;
                        // Newest
                        default:
                            return b.id - a.id;
                    }
                })
                .map((blog) => (
                    <div className="blog-preview" key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <h2>{blog.title}</h2>
                            <p>Written by {capitalize(blog.author)}</p>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default BlogList;
