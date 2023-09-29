import React from "react";
import { Link } from "react-router-dom";
import { Badge, Card, Col, Row, Spinner } from "reactstrap";

function CardView({ listing }) {
  return (
    <>
      <Row>
        {listing.length > 0 ? (
          listing.map((list, index) => {
            return (
              <>
                <Col md={4}>
                  <Link
                    to={`/admin/property-detail/${list?.id}`}
                    className="text-decoration-none text-dark cursor-pointer"
                  >
                    <Card className="shadow-lg my-3">
                      <img
                        class="card-img-top rounded"
                        src={list?.image}
                        alt="Card image cap"
                      />
                      <div class="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p class="card-text mb-0">{list?.title}</p>
                          <p class="card-text mb-0">{list?.price} PKR</p>
                        </div>
                        <p>
                          {list?.isCommercial == false ? (
                            <Badge>Local</Badge>
                          ) : (
                            <Badge color="success">Commercial</Badge>
                          )}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </Col>
              </>
            );
          })
        ) : (
          <>
            <Spinner size={"xlg"} />
          </>
        )}
      </Row>
    </>
  );
}

export default CardView;
