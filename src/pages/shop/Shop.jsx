import { useNavigate } from "react-router-dom";
import useShopProducts from "../../hooks/useShopProducts";
import ShopView from "./ShopView";

export default function Shop() {
  const navigate = useNavigate();
  const shop = useShopProducts();

  return (
    <ShopView
      loading={shop.loading}
      err={shop.err}
      categories={shop.categories}
      pageItems={shop.pageItems}
      total={shop.total}
      totalPages={shop.totalPages}
      page={shop.page}
      search={shop.search}
      categoryId={shop.categoryId}
      minPrice={shop.minPrice}
      maxPrice={shop.maxPrice}
      sortBy={shop.sortBy}
      sortDir={shop.sortDir}
      onSearch={shop.setSearch}
      onCategory={shop.setCategoryId}
      onMinPrice={shop.setMinPrice}
      onMaxPrice={shop.setMaxPrice}
      onSortBy={shop.setSortBy}
      onSortDir={shop.setSortDir}
      onGoPage={shop.go}
      onOpenProduct={(id) => navigate(`/products/${id}`)}
    />
  );
}