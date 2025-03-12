import ProductList from "./components/ProductList";
import SearchBox from "./components/SearchBox";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Ecommerce Product Search
      </h1>
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBox />
      </div>
      <ProductList />
    </div>
  );
}
