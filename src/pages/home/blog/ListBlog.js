import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBlogs, removeBlog} from "../../../services/blogsService";
import {Link, useNavigate} from "react-router-dom";
import swal from 'sweetalert';

export default function ListBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const blogs = useSelector(state => {
        if (state.blogs.blogs !== undefined){
            return state.blogs.blogs;
        }

    })
    const user = useSelector(state => {
        if (state.user.currentUser !== undefined){
            return state.user.currentUser;
        }

    })
    useEffect(() => {
        dispatch(getBlogs())
    }, [])
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
                        <th scope="col" colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        blogs.map((item, index) => {

                            if (user !== undefined && item.username === user.username) {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.content}</td>
                                        <td>{item.status}</td>
                                        <td>{item.date}</td>
                                        <td>{item.username}</td>
                                        <td><img src={item.image} alt="" width={200} height={200}/></td>
                                        <td><Link to={`edit-blog/${item.id}`}>
                                            <button>Edit</button>
                                        </Link></td>
                                        <td><Link to={`delete-blog/${item.id}`}>
                                            <button onClick={() => {
                                                dispatch(removeBlog(item.id)).then(() => {
                                                    dispatch(getBlogs()).then(() => {
                                                        navigate('/home')
                                                    })
                                                })
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "!!!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            swal("Xoa thanh cong!", {
                                                                icon: "success",
                                                            });
                                                        } else {
                                                            swal("Khong xoa thanh cong!");
                                                        }
                                                    });
                                            }}>Delete
                                            </button>
                                        </Link></td>
                                    </tr>
                                )
                            } else return (<></>)
                        })
                    })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}