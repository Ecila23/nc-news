import axios from 'axios';

const url = 'https://ecila-nc-news-api.herokuapp.com/api/';

const fetchTopics = async () => {
  const { data } = await axios.get(`${url}topics/`);
  return data.topics;
};

const fetchArticles = async (topic, sortBy, order) => {
  let articlesUrl = `${url}articles/`;
  if (sortBy) articlesUrl += `?sort_by=${sortBy}`;
  if (order) articlesUrl += `&order=${order}`;

  const {
    data: { articles }
  } = await axios.get(articlesUrl);

  if (topic) return articles.filter(article => article.topic === topic);

  return articles;
};

const fetchArticleById = async article_id => {
  const {
    data: { article }
  } = await axios.get(`${url}articles/${article_id}`);
  return article;
};

const fetchComments = async article_id => {
  const {
    data: { comments }
  } = await axios.get(`${url}articles/${article_id}/comments`);
  return comments;
};

const postComment = async (comment, article_id) => {
  const { newComment } = await axios.post(
    `${url}articles/${article_id}/comments`,
    comment
  );
  return newComment;
};

const deleteComment = async commentId => {
  const { data } = await axios.delete(`${url}comments/${commentId}`);
  return data;
};

const patchVotesById = async (inc_votes, id, path) => {
  const { data } = await axios.patch(`${url}${path}/${id}`, { inc_votes });
  return data.article || data.comment;
};

export default {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  fetchComments,
  postComment,
  deleteComment,
  patchVotesById
};
