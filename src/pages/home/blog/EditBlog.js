import {Field, Form, Formik} from "formik";
import PreviewImage from "../../PreviewImage";
import {addBlog, editBlog, findByIdBlog} from "../../../services/blogsService";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../firebase";

export default function EditBlog() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams()
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const user = useSelector(state => {
        return state.user.currentUser;
    })
    const blog = useSelector(state => {

        return state.blogs.blogs;
    })
    console.log(blog,1111111111111)


    useEffect(() => {
        dispatch(findByIdBlog(id)).then((value) => {
            setUrls([value.payload.image])
        })
    }, [])

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls([])
                            setUrls(prevState => [...prevState, downloadURLs])
                            console.log("File available at", downloadURLs);
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => alert("All images uploaded"))
            .catch((err) => console.log(err));
    };

    const handleEdit = (values) => {
        let data = {...values};
         dispatch(editBlog(data)).then(()=>{
            navigate('/home')
         })
    }


    return (
        <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Edit Blog</h1>
                <Formik initialValues={{
                    id: id.id,
                    content: blog.content,
                    status: blog.status,
                    date: blog.date,
                }} onSubmit={(values) => {
                    values.image = urls[0];
                    handleEdit(values);

                }}
                        enableReinitialize={true}
                >

                    <Form>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputUsername">Content: </label>
                            <Field type='text' className={'form-control'} name={'content'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Status: </label>
                            <Field type='text' className={'form-control'} name={'status'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Date: </label>
                            <Field type='text' className={'form-control'} name={'date'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Image: </label>
                            <input type='file' onChange={handleChange}>
                            </input>
                            <button type='button' onClick={handleUpload}>Upload</button>

                        </div>
                        {urls.map((item) => (
                        <>
                            <img src={item}/>
                        </>
                    ))}
                        {/*<div className="ml-3 form-group">*/}
                        {/*    <label htmlFor="exampleInputPassword">Category: </label>*/}
                        {/*    <Field type='number' className={'form-control'} name={'idCategory'}/>*/}
                        {/*</div>*/}
                        <button type="submit" className="btn btn-primary">Save</button>
                    </Form>
                </Formik>

            </div>
        </div>
    )
}