import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {addBlog} from "../../../services/blogsService";

export default function AddBlog(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => {
        return state.user.user
    })
    const handleAdd = (values)=>{
        let data = {...values,user: {id: user.id}};
        console.log(data)
        dispatch(addBlog(data))
        navigate('/home')
    }
    return (
        <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Add Blog</h1>
                <Formik initialValues={{content: '', status: ''}} onSubmit={(values)=>{
                    handleAdd(values);
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

                        <button type="submit" className="btn btn-primary">Login</button>

                    </Form>
                </Formik>
            </div>
        </div>
    )
}