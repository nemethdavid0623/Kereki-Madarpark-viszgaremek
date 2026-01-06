function ContentCards({ imageLeft }) {
  return (
    <section className="content-section">
      {imageLeft && <div className="image-box">kép</div>}

      <div className="text-box">szöveg</div>

      {!imageLeft && <div className="image-box">kép</div>}
    </section>
  );
}

export default ContentCards;
