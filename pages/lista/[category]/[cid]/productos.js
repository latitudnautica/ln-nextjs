import { useState } from "react";
import MainLayout from "../../../../layouts/MainLayout";
import { useRouter } from "next/router";
import CategoryMenuProps from "../../../../components/categoryMenuProps";
// import SideBarMenu from "../../../../components/SideBarMenu";
import SideBarMenuClient from "../../../../components/SideBarMenuClient";
import styled from "styled-components";
import ListProducts from "../../../../components/ListProducts";

const ListSection = styled.section`
  display: flex;
`;

const fetcher = (...args) =>
  axios(...args).then((res) => {
    return res;
  });

const Product = (props) => {
  const router = useRouter();
  const { categories } = props;
  const subCategories = categories[router.query.cid - 1].SubCategories;
  const [catSelected, setCatSelected] = useState(0);

  const handleCatSelected = (e) => {
    const id = e.target.dataset.cid;
    setCatSelected(id);
  };

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>prod</h1>
      <CategoryMenuProps categories={categories} /> */}
      <ListSection>
        <SideBarMenuClient
          subCategories={subCategories}
          catHandler={handleCatSelected}
        />
        <ListProducts catSelected={catSelected} />
      </ListSection>
    </div>
  );
};

Product.Layout = MainLayout;

export default Product;

// This function gets called at build time
export async function getStaticPaths() {
  const cat = await fetch(`http://localhost:5000/api/category/all`);
  const categories = await cat.json();

  const paths = categories.map((e) => {
    const idS = e.id.toString();
    return { params: { cid: idS, category: e.name } };
  });

  return {
    paths,
    fallback: true
  };
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  console.log(params);

  const cat = await fetch(`http://localhost:5000/api/category/all`);
  const categories = await cat.json();

  return { props: { categories } };
}
