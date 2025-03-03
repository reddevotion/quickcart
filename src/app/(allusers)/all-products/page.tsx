import ProductList from "@/componets/ProductList"

const page = () => {
  return (
    <div className="section">
        <ProductList home={false} title="All products"/>
    </div>
  )
}

export default page