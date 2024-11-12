// src/components/PostsTable.jsx
import React, { useEffect, useState } from 'react';

const PostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL da API para buscar os posts
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Erro ao buscar posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Lista de Posts</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Conteúdo</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostsTable;
