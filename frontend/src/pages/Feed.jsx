import Navbar from "../components/Navbar";

const Feed = () => {
    return (
        <div className="feed">
            <div className="feed__header">
                <h1 className="feed__title">Feed</h1>
            </div>
            <div className="feed__content">
                <p>Welcome to the feed!</p>
            </div>
            <div className="feed__footer">
                <p>Footer content goes here</p>
            </div>
            <footer>
                <Navbar />
            </footer>
        </div>
    )
}

export default Feed;