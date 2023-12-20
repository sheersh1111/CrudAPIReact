import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { StoryCard } from "./StoryCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
const link = "https://cryptodire.kontinentalist.com/api/v1/stories";
function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page,setPage]=useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(link);
        console.log(response)
        setStories([...stories, ...response?.data?.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();// eslint-disable-next-line
  }, []); 

  async function handleLoadMore(){
    setLoading(true);
    const response=await axios.get(link+`?page=${page+1}`);
    setStories([...stories,...response?.data?.data]);
    setPage(page+1);
    setLoading(false);
  }


    return (
      <div className="App">
        <h2>Task 1</h2>
        {stories?.map((story) => {
          return (
            <StoryCard
              title={story?.title}
              dek={story?.dek}
              image={story?.hero_image}
            />
          );
        })}
        {page > 11 ? (
        <span style={{color:'rgba(0,0,0,0.6)'}}>No more data to load</span>
      ) : (
        !loading && (
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
