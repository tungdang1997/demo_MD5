import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {addBlog} from "../../../services/blogsService";
import {useState} from "react";
import {storage} from "../../../firebase";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";


export default function AddBlog(){


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const user= useSelector(state =>{
        return state.user.currentUser;
    })

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

    const handleAdd = (values)=>{
        let data = {...values,user: user.idUser};
        dispatch(addBlog(data)).then(()=>{
            navigate('/home');
        })

    }


    return (
        <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Add Blog</h1>
                <Formik initialValues={{
                    content: '',
                    status: '',
                    date: '',
                    idCategory: ''
                }} onSubmit={(values)=>{
                    values.image = urls[0];
                    handleAdd(values)

                }}>

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
                                <input type='file'  onChange={handleChange}>
                                </input>
                                <button type='button' onClick={handleUpload}>Upload</button>
                            </div>
                            {urls.map((item)=>(
                                <>
                                    <img src={item}/>
                                </>
                            ))}
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Category: </label>
                                <Field type='number' className={'form-control'} name={'idCategory'}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </Form>
                </Formik>

                {/*<>*/}
                {/*    <input type="file" multiple onChange={handleChange}/>*/}
                {/*    <button onClick={() => dispatch(handleUpload)}>Upload</button>*/}
                {/*    {urls.map(item => (*/}
                {/*        <>*/}
                {/*            <img src={item} alt=""/>*/}
                {/*        </>*/}
                {/*    ))}*/}
                {/*</>*/}
            </div>
        </div>
    )
}