export default function ShopView({
  loading,
  err,

  categories = [],      
  pageItems = [],       

  total = 0,
  totalPages = 1,
  page = 1,

  search = "",
  categoryId = "all",
  minPrice = "",
  maxPrice = "",
  sortBy = "name",
  sortDir = "asc",

  onSearch = () => {},
  onCategory = () => {},
  onMinPrice = () => {},
  onMaxPrice = () => {},
  onSortBy = () => {},
  onSortDir = () => {},

  onOpenProduct = () => {},
  onGoPage = () => {},
}) {

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (err) return <p style={{ padding: 20, color: "red" }}>{err}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Shop</h2>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          padding: 12,
          border: "1px solid #eee",
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by name..."
          style={{ padding: 10, minWidth: 220 }}
        />

        <select value={categoryId} onChange={(e) => onCategory(e.target.value)} style={{ padding: 10 }}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          value={minPrice}
          onChange={(e) => onMinPrice(e.target.value)}
          placeholder="Min price"
          type="number"
          style={{ padding: 10, width: 130 }}
        />

        <input
          value={maxPrice}
          onChange={(e) => onMaxPrice(e.target.value)}
          placeholder="Max price"
          type="number"
          style={{ padding: 10, width: 130 }}
        />

        <select value={sortBy} onChange={(e) => onSortBy(e.target.value)} style={{ padding: 10 }}>
          <option value="name">Sort: Name</option>
          <option value="price">Sort: Price</option>
          <option value="rate">Sort: Rate</option>
        </select>

        <select value={sortDir} onChange={(e) => onSortDir(e.target.value)} style={{ padding: 10 }}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <div style={{ marginLeft: "auto", padding: 10 }}>
          Results: <b>{total}</b>
        </div>
      </div>

      {pageItems.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
          {pageItems.map((p) => (
            <div
              key={p.id}
              onClick={() => onOpenProduct(p.id)}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                cursor: "pointer",
              }}
            >
              <h3 style={{ margin: 0 }}>{p.name ?? p.productName}</h3>
              <p style={{ margin: "8px 0 0" }}>{Number(p.price ?? 0)} ₪</p>
              {"rate" in p || "rating" in p ? (
                <p style={{ margin: "8px 0 0" }}>Rate: {p.rate ?? p.rating}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 18 }}>
        <button onClick={() => onGoPage(1)} disabled={page === 1}>
          {"<<"}
        </button>
        <button onClick={() => onGoPage(page - 1)} disabled={page === 1}>
          {"<"}
        </button>

        <span style={{ padding: "0 8px" }}>
          Page <b>{page}</b> / {totalPages}
        </span>

        <button onClick={() => onGoPage(page + 1)} disabled={page === totalPages}>
          {">"}
        </button>
        <button onClick={() => onGoPage(totalPages)} disabled={page === totalPages}>
          {">>"}
        </button>
      </div>
    </div>
  );
}