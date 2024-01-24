import axios from "axios";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import Styles from './styles.module.css';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function PostEdit(){
    const [queryRan,setQueryRan]=useState(false);
  const [loading,setLoading]=useState(true);
    const id=useParams();

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    imageLink: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    body: "",
    imageLink: "",
  });

  async function RunQuery(){
    axios.get(`http://127.0.0.1:8000/posts/${id?.id}`).then((data)=>{
        console.log(data);
        setFormData(data?.data);
        setQueryRan(true);
        setLoading(false);
    }).catch((e)=>{
      toast.error(e?.response?.data?.detail)
      navigate('/')
    })
    
}

if(!queryRan){
    RunQuery();
}

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate required fields
    setFormErrors({
      ...formErrors,
      [name]: value.trim() === "" ? "This field is required" : "",
    });
  };

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();

    // Validate all fields before submitting
    const newFormErrors = {
      title: formData.title.trim() === "" ? "This field is required" : "",
      body: formData.body.trim() === "" ? "This field is required" : "",
      imageLink:
        formData.imageLink.trim() === "" ? "This field is required" : "",
    };

    setFormErrors(newFormErrors);

    // If there are no errors, you can proceed with submitting the form
    if (!Object.values(newFormErrors).some((error) => error !== "")) {
      // Handle form submission here
      await axios.put(`http://127.0.0.1:8000/posts/${id?.id}`, formData);
      toast.success('Poast Updated Successfully');
      navigate('/');
    }
    setLoading(false)
  };

  if(loading){
    return(
      <div style={{position:'relative',left:'50vw',top:'45vh'}}>
        <Spinner/>
      </div>
    )
  }else{
    return (
      <Row
        className="d-flex justify-content-between"
        style={{ position:'relative',textAlign: "left",width:'90vw' ,left:'5vw' ,top:'5vh' }}
      >
          <h3 style={{position:'relative',left:'35vw'}}>Edit Post</h3>
        <Col md={2} style={{paddingLeft:'10vh',paddingTop:'4vh'}}>
          <img
            src={formData?.imageLink}
            alt="...loading"
            width={"300px"}
            style={{ marginLeft: "10px", borderRadius: "10px" }}
            className={Styles.image}
          />
  
          
        </Col>
        <Col md={7} className="mx-4" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <Form.Text className="text-danger">{formErrors.title}</Form.Text>
            </Form.Group>
  
            <Form.Group controlId="formContent" className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter content"
                name="body"
                value={formData.body}
                onChange={handleChange}
              />
              <Form.Text className="text-danger">{formErrors.body}</Form.Text>
            </Form.Group>
  
            <Form.Group controlId="formImageLink" style={{marginBottom:'20px'}}>
              <Form.Label>Image Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image link"
                name="imageLink"
                value={formData.imageLink}
                onChange={handleChange}
              />
              <Form.Text className="text-danger">
                {formErrors.imageLink}
              </Form.Text>
            </Form.Group>
  
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }

}