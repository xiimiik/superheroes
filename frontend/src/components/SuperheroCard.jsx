import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";

const SuperheroCard = ({ superhero }) => {
  return (
    <Card
      style={{
        width: "18rem",
      }}
      className='bg-light'
    >
      <Link to={`/${superhero.id}`} className='d-flex h-100 flex-column'>
        <img
          alt='Movie poster'
          src={`http://localhost:8080/images/${superhero.images[0]}`}
          className='object-fit-cover'
          style={{
            height: "350px",
          }}
        />
        <CardBody>
          <CardTitle tag='h5'>{superhero.nickname}</CardTitle>
        </CardBody>
      </Link>
    </Card>
  );
};

export default SuperheroCard;
