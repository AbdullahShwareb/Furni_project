import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import { addToCartApi } from "../../api/cartApi";
import { Rating, TextField, Button } from "@mui/material";
import useAddReview from "../../hooks/useAddReview";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetails(id);

  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState("");

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const {
    mutate: addReview,
    isPending: sendingReview,
    isError: reviewIsError,
    error: reviewError,
  } = useAddReview(id);

  const isLoggedIn = !!localStorage.getItem("token");

  if (isLoading) {
    return (
      <div style={{ padding: 24 }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Error</h2>
        <p>{error?.message || "Failed to load product"}</p>
      </div>
    );
  }

  const {
    name,
    description,
    price,
    rate,
    quantity,
    image,
    subImages,
    reviews,
  } = product;

  const mainImage =
    image ||
    (Array.isArray(subImages) && subImages.length > 0 ? subImages[0] : "");

  const avgRate = rate ?? 0;
  const reviewsCount = Array.isArray(reviews) ? reviews.length : 0;

  const renderStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      stars.push(
        <span key={i} style={{ color: i <= value ? "#f5b50a" : "#ddd" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  async function handleAddToCart() {
    try {
      setAdding(true);
      setMsg("");

      await addToCartApi(product.id, 1);

      setMsg("تم إضافة المنتج إلى السلة");
    } catch (e) {
      console.error(e);
      setMsg("فشل في إضافة المنتج إلى السلة");
    } finally {
      setAdding(false);
    }
  }

  function goToCart() {
    navigate("/cart");
  }

  function goToCheckout() {
    navigate("/checkout");
  }

  function goBack() {
    navigate(-1);
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    if (!reviewRating || !reviewComment.trim()) return;

    addReview(
      { rating: reviewRating, comment: reviewComment },
      {
        onSuccess: () => {
          setReviewRating(0);
          setReviewComment("");
        },
      }
    );
  }

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "40px 0" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <button
          onClick={goBack}
          style={{
            marginBottom: 16,
            borderRadius: 999,
            border: "1px solid #ddd",
            background: "#fff",
            padding: "6px 14px",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 420px) minmax(0, 1fr)",
            gap: 32,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 16,
              border: "1px solid #e3e3e3",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingBottom: "100%",
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                background: "#f0f0f0",
              }}
            >
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                    fontSize: 14,
                  }}
                >
                  No Image
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 24,
              border: "1px solid #e3e3e3",
            }}
          >
            <h1
              style={{
                margin: 0,
                marginBottom: 8,
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              {name}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 8,
              }}
            >
              <span>{renderStars(avgRate)}</span>
              <span style={{ fontSize: 14, color: "#666" }}>
                ({reviewsCount} reviews)
              </span>
            </div>

            <div
              style={{
                marginBottom: 16,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Price: {Number(price || 0).toFixed(2)} ₪
            </div>

            <div style={{ marginBottom: 16, fontSize: 14, color: "#555" }}>
              Available Quantity:{" "}
              <span style={{ fontWeight: 600 }}>{quantity}</span>
            </div>

            <div
              style={{
                marginBottom: 20,
                maxHeight: 220,
                overflowY: "auto",
                fontSize: 15,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            >
              {description}
            </div>

            {msg && (
              <div
                style={{
                  marginBottom: 12,
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: msg.includes("فشل") ? "#ffecec" : "#e8f7ef",
                  color: msg.includes("فشل") ? "#b32020" : "#0f6b3c",
                  fontSize: 14,
                }}
              >
                {msg}
              </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "none",
                  background: "#111827",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: adding ? 0.8 : 1,
                }}
              >
                {adding ? "Adding..." : "ADD TO CART"}
              </button>

              <button
                onClick={goToCart}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid #111827",
                  background: "#fff",
                  color: "#111827",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                GO TO CART
              </button>

              <button
                onClick={goToCheckout}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid #111827",
                  background: "#111827",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Reviews + Form */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ marginBottom: 12, fontSize: 20 }}>Reviews</h2>

          {(!reviews || reviews.length === 0) && (
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: 16,
                border: "1px solid #e3e3e3",
              }}
            >
              No reviews yet.
            </div>
          )}

          {Array.isArray(reviews) &&
            reviews.map((rev, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 16,
                  border: "1px solid #e3e3e3",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <strong>{rev.userName}</strong>
                  <span>{renderStars(rev.rating || 0)}</span>
                </div>
                <p style={{ margin: 0, marginBottom: 4, fontSize: 14 }}>
                  {rev.comment}
                </p>
                {rev.createdAt && (
                  <div style={{ fontSize: 12, color: "#777" }}>
                    {new Date(rev.createdAt).toLocaleString()}
                  </div>
                )}
              </div>
            ))}

          <div
            style={{
              marginTop: 24,
              background: "#fff",
              borderRadius: 14,
              padding: 16,
              border: "1px solid #e3e3e3",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Add your review</h3>

            {isLoggedIn ? (
              <form onSubmit={handleSubmitReview}>
                <div style={{ marginBottom: 12 }}>
                  <Rating
                    name="product-rating"
                    value={reviewRating}
                    onChange={(_, newValue) => setReviewRating(newValue)}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <TextField
                    label="Your comment"
                    multiline
                    minRows={3}
                    fullWidth
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                  />
                </div>

                {reviewIsError && (
                  <div style={{ color: "red", marginBottom: 8, fontSize: 14 }}>
                    {reviewError?.response?.data?.message ||
                      "Failed to submit review"}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    sendingReview || !reviewRating || !reviewComment.trim()
                  }
                >
                  {sendingReview ? "Sending..." : "Submit review"}
                </Button>
              </form>
            ) : (
              <p style={{ margin: 0, color: "#555" }}>
                لتستطيع إضافة تقييم، قم بتسجيل الدخول أولاً.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
