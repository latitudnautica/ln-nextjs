import React from "react";
import styled from "styled-components";
import Link from "next/link";

const ProductCardStyled = styled.div`
  width: 230px;
  margin: 3px;
  padding: 5px;
  border: solid thin #ccc;
  /* box-shadow: 0px 0px 14px -5px gray; */
  transition: all 0.2s ease;

  img {
    width: 100%;
  }

  header {
    font-size: 1.5em;
  }
  :hover {
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.4);
  }
`;

export default function ProductCard(props) {
  const { item } = props;

  return (
    <ProductCardStyled key={item.id}>
      <img src={item.imageUrl ? item.imageUrl : "/images/logo_test.jpg"} />
      <div>id:{item.id}</div>
      <div>catId:{item.categoryId}</div>
      <div>subCat:{item.subCategoryId}</div>
      <div>{item.name}</div>
      <div>{item.price}</div>
      <div>
        <Link href={`/detalle/${item.name}/${item.id}`}>
          <a>ver detalles</a>
        </Link>
      </div>
    </ProductCardStyled>
  );
}