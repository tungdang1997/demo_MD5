import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import ListBlog from "./pages/home/blog/ListBlog";
import AddBlog from "./pages/home/blog/AddBlog";
import EditBlog from "./pages/home/blog/EditBlog";
import UpLoad from "./pages/Upload";

function App() {

  return (
      <>
        <div className='container-fluid'>
            <Routes>
                <Route path={''} element={<Login/>}></Route>
                <Route path={'register'} element={<Register/>}></Route>
                <Route path={'home'} element={<Home/>}>
                    <Route path={''} element={<ListBlog/>}></Route>
                    <Route path={'add-blog'} element={<AddBlog/>}>
                        <Route path={'upload'} element={<UpLoad/>}/>
                    </Route>
                    <Route path={'edit-blog/:id'} element={<EditBlog/>}></Route>
                    <Route path={'delete-blog/:id'}></Route>
                </Route>
            </Routes>
        </div>
      </>
  );
}

export default App;
