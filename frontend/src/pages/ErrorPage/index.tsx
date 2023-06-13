export default function ErrorPage() {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <h1>404!</h1>
      <p>Desculpe, esta rota não existe.</p>
    </div>
  );
}
