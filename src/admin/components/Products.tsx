import { useParams } from "react-router-dom";
const Products = () => {
  const routeParams = useParams();
  console.log(routeParams);
  return (
    <>
      <div className="text-primary">This is the product page</div>;
      <div className="text-popover-foreground">This is the product page</div>;
    </>
  );
};

export default Products;
