import {useEffect, useState} from 'react';
//import Card from './components/CardPost/index';

import style from './app.module.sass';

const loadPost = async () => {
  const allPosts = fetch('https://jsonplaceholder.typicode.com/posts');
  const allPhotos = fetch('https://jsonplaceholder.typicode.com/photos');

  const [getPosts, getPhotos] = await Promise.all([
    allPosts, allPhotos
  ]);

  const postJson = await getPosts.json();
  const photosJson = await getPhotos.json();

  const postsAndPhotos = postJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url }
  })
  
  const response = await postsAndPhotos;
  return response;

}

function App() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const allPosts = loadPost();
    allPosts.then(res => setPost(res));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.posts}>
        {posts.map(post => (
          <div key={post.id} className={style.post}>
            <img src={post.cover} alt={post.title} />
            <div className={style.postContent}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
