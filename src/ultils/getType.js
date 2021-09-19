const getTypeFilm = (genres) => {
  const result = genres.map((item, index) => {
    return item.name;
  });
  return result.toString().replaceAll(",", ", ");
};

export default getTypeFilm;
