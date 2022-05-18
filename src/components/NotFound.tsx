import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main style={{ padding: "1rem" }}>
      <p>404 Not found!</p>
      <Link to="/">
        Go to home
      </Link>
    </main>
  );
}