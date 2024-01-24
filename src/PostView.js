import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import Styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export function PostView() {

  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [queryRan, setQueryRan] = useState(false);
  const [loading,setLoading] = useState(true);
  
  const id = useParams();

  async function RunQuery() {
    try{
      
      const data =await axios.get(`http://127.0.0.1:8000/posts/${id?.id}`)
    console.log(data)
      setPost(data?.data);
      setQueryRan(true);
      setLoading(false)
    }catch(e){
      toast.error(e?.response?.data?.detail);
      navigate('/');
    }
  }

  if (!queryRan) {
    RunQuery();
  }
if(loading){
  return(
    <div style={{position:'relative',left:'50vw',top:'45vh'}}>
      <Spinner/>
    </div>
  )
}else{
  return (
    <div className="m-3" style={{ fontFamily: "Roboto, sans-serif" }}>
      <Card
        style={{
          width: "80vw",
          left: "10vw",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Header
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", textAlign: "center" }}
        >
          <b style={{ color: "#333" }}>{post?.title}</b>
        </Card.Header>
        <Card.Body>
          <Row
            className="d-flex justify-content-between"
            style={{ position: "relative" }}
          >
            <Col md={2}>
              <img
                src={post?.imageLink}
                alt={""}
                width={"200px"}
                style={{ marginLeft: "10px", borderRadius: "10px" }}
                className={Styles.image}
              />
            </Col>
            <Col
              md={7}
              className="mx-4 d-flex flex-column justify-content-between"
              style={{ color: "rgba(0, 0, 0, 0.6)" }}
            >
              <div>
                <span>{post?.body}</span>
              </div>
              <div style={{ textAlign: "end" }}>
                <Button
                  style={{ backgroundColor: "rgb(102, 153, 153)" }}
                  onClick={() => {
                    navigate(`/post/${id?.id}/edit`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  className="mx-2"
                  onClick={async () => {
                    setLoading(true)
                    await axios.delete(`http://127.0.0.1:8000/posts/${id?.id}`);
                    setLoading(false)
                    toast.success("Post Deleted Successfully");
                    navigate("/");
                  }}
                >
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
  
}
