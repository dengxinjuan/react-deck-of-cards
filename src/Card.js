const Card = ({
  image = "https://i.pinimg.com/564x/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.jpg",
  value,
}) => {
  return (
    <div>
      <p>{value}</p>
      <img src={image} alt="cards"></img>
    </div>
  );
};

export default Card;
