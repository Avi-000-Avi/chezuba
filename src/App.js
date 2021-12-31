import React, { useState, useEffect} from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { FcSearch } from 'react-icons/fc';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';


const App = () => {
  const [posts, setPosts] = useState();
  const [originals, setOriginals] = useState();

  const [searchItem,setSearchItem] = useState("");

  const [toggleState, setToggleState] = useState('');

  const toggleTab = (categories) => {
    setToggleState(categories);
  };


  async function getData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let items = await response.json();

    items = items.map(item => {
      if (item.id %3=== 0) {
         item.category = 'thirds';
      }
      else if (item.id %5=== 0) {
        item.category = 'fifths';
      }if (item.id %3=== 0 && item.id%5===0) {
        item.category = 'magic';
     }
      return item;
   });
    setOriginals(items);
    setPosts(items);
  }

  const search = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = posts.filter((post) => {
        return post.title.startsWith(keyword);
      });
      setPosts(results);
    } else {
      setPosts(posts);
    }
  };
  
  const handleRemove = (id) => {
    const newList = posts.filter((item) => item.id !== id);
    setPosts(newList);
  };

  const handleReset = () => {
    setPosts(originals);
    setToggleState('');
   };

  useEffect(() => {
    getData();
  }, [])
  

  useEffect(() => {
    if (searchItem !== '') {
      const results = posts.filter((post) => {
        return post.title.includes(searchItem);
      });
      setPosts(results);
    } else {
      setPosts(originals);
    }
    
  }, [searchItem])
  
  useEffect(() => {
    originals && setPosts(originals.filter((item) => item.category === toggleState));
    if(toggleState === ''){
      setPosts(originals);
    }
  }, [toggleState])
  
  return (
    <div className="app-container">
     {posts?(posts && posts !== undefined && (
     <>
        <div style={{padding:"20px"}}> 
       <input type="search"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        className="input"
        placeholder="Search"/> <FcSearch /></div>

        <div className="bloc-tabs">
        <button
          className={toggleState === 'thirds' ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab('thirds')}
          style={{padding:"10px 25px","border":"1px solid grey"}}
        >
         thirds
        </button>
        <button
          className={toggleState === 'fifths' ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab('fifths')}
          style={{padding:"10px 25px","border":"1px solid grey"}}
        >
          fifths
        </button>
        <button
          className={toggleState === 'magic' ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab('magic')}
          style={{padding:"10px 25px","border":"1px solid grey"}}
        >
          magic
        </button><button className="reset" onClick={() => handleReset()} style={{backgroundColor:'#FDFDFD',padding:"10px 25px","border":"1px solid black"}}>Reset<BiReset/></button>
      </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>UserId</th>
              <th>Title </th>
              <th>Body </th>
              <th></th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key = {post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td><button onClick={() => handleRemove(post.id)}><AiTwotoneDelete/></button></td>
              <td></td>
              </tr>
            ))
          } 
          </tbody>
        </table>
        </>)):(<div>Loading...</div>)}
    </div>
  );
};



export default App;
