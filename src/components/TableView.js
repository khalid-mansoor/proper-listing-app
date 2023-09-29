// src/components/DataTable.js

import React from "react";
import ListView from "./ListView";
import { Badge, Button, Card, Spinner, Table } from "reactstrap";
import { Link } from "react-router-dom";

function TableView({ listing }) {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Area</th>
            <th>Bed</th>
            <th>Bathrooms</th>
            <th>Commercial</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listing.length > 0 ? (
            listing?.map((list, index) => {
              return (
                <tr>
                  <th scope="row">
                    <img
                      src={list?.image}
                      className="rounded"
                      height={75}
                      width={75}
                      alt=""
                    />
                  </th>
                  <td>{list?.title}</td>
                  <td>{list?.coveredAreaSQFT}</td>
                  <td>{list?.bed}</td>
                  <td>{list?.bath}</td>
                  <td>
                    {list?.isCommercial == false ? (
                      <Badge>Local</Badge>
                    ) : (
                      <Badge color="success">Commercial</Badge>
                    )}
                  </td>
                  <td>{list?.price}</td>
                  <td>
                    <Link to={`/admin/property-detail/${list?.id}`}>
                      <Button size="sm" color="primary">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <>
              <h3 className="text-center mt-5">....loading</h3>
            </>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default TableView;
