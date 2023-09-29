import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import { getSingleProperty } from "store/actions/propertyAction";

const PropertyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { singleProperty } = useSelector((state) => state.properties);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProperty(id));
    }
  }, [id]);
  return (
    <>
      <div className="d-flex justify-content-end align-items-center p-5">
        <Button
          onClick={() => {
            history.push("/admin/index");
          }}
          className="btn btn-info"
        >
          <i className="fa fa-arrow-left mx-2"></i>
          Go back
        </Button>
      </div>
      <Container>
        {singleProperty ? (
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={
                  singleProperty?.image
                    ? singleProperty?.image
                    : "Image Not Found"
                }
                alt=""
              />
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="d-flex flex-column">
                <h2>
                  {singleProperty?.name
                    ? singleProperty?.name
                    : "Not Available"}
                </h2>
                <p>
                  Price :{" "}
                  {singleProperty?.price
                    ? singleProperty?.price
                    : "Not Available"}{" "}
                  PKR
                </p>
                <p>
                  Bedrooms :{" "}
                  {singleProperty.bed ? singleProperty?.bed : "Not Available"}
                </p>
                <p>
                  Bathrooms :{" "}
                  {singleProperty.bath ? singleProperty?.bath : "Not Available"}
                </p>
                <p>
                  IsCommercial :{" "}
                  {singleProperty.isCommercial
                    ? singleProperty?.isCommercial
                    : "Not Available"}
                </p>
                <p>
                  Total Area :{" "}
                  {singleProperty?.coveredAreaSQFT
                    ? singleProperty?.coveredAreaSQFT
                    : "Not Available"}
                </p>

                <Button className="btn btn-info">Book Meeting</Button>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col>
                <Spinner size="lg" />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default PropertyDetail;
