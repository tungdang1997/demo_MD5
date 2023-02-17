import {Link, useNavigate} from "react-router-dom";
import Register from "./Register";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBlogs} from "../services/blogsService";
import {login} from "../services/userService";
import {Field, Form, Formik} from "formik";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return (
        <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={(values)=>{
                        dispatch(login(values))
                    navigate('/home')
                }}>
                <Form>
                    <div className="ml-3 form-group">
                        <label htmlFor="exampleInputUsername">User Name: </label>
                        <Field type='text' className={'form-control'} name={'username'}/>
                    </div>
                    <div className="ml-3 form-group">
                        <label htmlFor="exampleInputPassword">Password: </label>
                        <Field type='text' className={'form-control'} name={'password'}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="submit" className="btn btn-primary" style={{marginLeft: 10}}>
                        Register
                    </button>
                </Form>
                </Formik>
            </div>
        </div>
    )
}