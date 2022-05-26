import React, {useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {

    const [posts, setPosts] = React.useState([
        {id: 1, title: 'Привет', body: 'это я'},
        {id: 2, title: 'Здравствуй', body: 'я приветствую'},
        {id: 3, title: 'Хеллоу ', body: 'итс ми'},
        {id: 4, title: 'Куку ', body: 'гык'}
    ])

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortedPosts = React.useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts

    }, [filter.sort, posts])

    const sortedAndSearchPosts = React.useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))

    }, [filter.query, sortedPosts])


    return (
        <div className="App">
            <MyButton
                style={{marginTop: '30px'}}
                onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchPosts} title='Список постов'/>
        </div>
    );
}

export default App;
