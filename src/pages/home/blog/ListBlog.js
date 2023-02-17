import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBlogs} from "../../../services/blogsService";
import {login} from "../../../services/userService";

export default function ListBlog(){
    const dispatch = useDispatch();
    const blogs = useSelector(state =>{
        return state.blogs.blogs;
    })
    const user= useSelector(state =>{
        return state.user.currentUser;
    })
    useEffect(()=>{
        dispatch(getBlogs())
    },[])
    return (
        <div className={"row"}>
            <div className="offset-center">
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Content</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Username</th>
                        <th scope="col">Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        blogs.map((item,index)=> {

                        if (item.user.username == user.username){
                            return(
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.content}</td>
                                    <td>{item.status}</td>
                                    <td>{item.date}</td>
                                    <td>{item.username}</td>
                                    <td>{item.image}</td>
                                </tr>
                            )
                        }else return (<></>)
                        })
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}