import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const link = "http://127.0.0.1:8000/posts";

function App() {

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page,setPage]=useState(1);
  const [moreDate,setMoreData]=useState(true);

  const navigate=useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(link);
        console.log(response?.data)
        setStories([...stories, ...response?.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();// eslint-disable-next-line
  }, []); 


  async function handleLoadMore(){
    setLoading(true);
    const response=await axios.get(link+`?skip=${(page)*10}`);
    console.log(response)
    setStories([...stories,...response?.data]);
    if(response?.data?.length===0){
      setMoreData(false);
    }
    setPage(page+1);
    setLoading(false);
  }
  

    return (
      <div className="App">
        <h2>Posts</h2>
        <Button variant="outline-secondary" style={{position:'relative',left:'37vw'}} onClick={()=>navigate('/create-post')}>Add New Post</Button>
        {stories?.map((story) => {
          return (
            <PostCard
              index={story.id}
              title={story?.title}
              body={story?.body}
              image={story?.imageLink}
            />
          );
        })}
        {!moreDate ? (
        <span style={{color:'rgba(0,0,0,0.6)'}}>No more data to load</span>
      ) : (
        !loading && stories.length>0 && (
          <Button
            variant="outline-secondary"
            style={{ position: "absolute", right: "8vw" }}
            onClick={handleLoadMore}
          >
            Load More...
          </Button>
        )
      )}
        {loading && (
      <div>
        <Spinner />
      </div>
    )}
      </div>
    );
  
}

export default App;
